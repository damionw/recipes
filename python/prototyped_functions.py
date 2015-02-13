#! /usr/bin/env python

#! /usr/bin/env python

from inspect import getargspec, stack
from collections import OrderedDict
from itertools import izip
from functools import wraps

class prototype(object):
    _registry_collection = {}

    def __init__(self, **prototype):
        self._prototype = prototype

    @classmethod
    def format_specification_elements(cls, prototype):
        for parameter_name, parameter_spec in prototype.iteritems():
            parameter_type = type(parameter_spec)

            if parameter_type == type:
                parameter_spec = (parameter_spec, None)
            elif parameter_type in {tuple, list}:
                pass
            else:
                raise Exception("Type specification for '%s' must be either a single type or a tuple, not %s" % (parameter_name, parameter_type))

            yield parameter_name, parameter_spec

    @classmethod
    def get_type_spec(cls, prototype):
        return (
            (_name, _type) for _name, (_type, _values) in cls.format_specification_elements(prototype)
        )

    @classmethod
    def get_value_spec(cls, prototype):
        return (
            (_name, _values) for _name, (_type, _values) in cls.format_specification_elements(prototype)
        )

    def __call__(self, fn):
        def get_scope_key_elements(stack_info):
            filename = stack_info[1][1]

            for row in stack_info[1:]:
                if row[1] != filename:
                    break

                yield row[3]

            yield filename

        def get_scope_key_characters(stack_info):
            for element in reversed(map(str, get_scope_key_elements(stack_info))):
                for character in element:
                    yield "%x" % ord(character)

        # Determine the function scope
        scope_key = "".join(get_scope_key_characters(stack()))

        # Determine the function key
        function_key = (fn.__module__, fn.__name__)

        # The function registry used is dependent on the scope
        registry = self._registry_collection.setdefault(scope_key, {})

        registry.setdefault(function_key, []).append(
            (
                fn,
                getargspec(fn),
                dict(self.get_type_spec(self._prototype)),
                dict(self.get_value_spec(self._prototype)),
            )
        )

        return wraps(fn)(
            lambda *args, **kwargs: self.handler(function_key, registry, args, kwargs)
        )

    @staticmethod
    def handler(function_key, registry, args, kwargs):
        for fn, spec, _prototype, _permissible_values in registry[function_key]:
            parameter_names = spec.args

            # Capture the parameters and their defaults
            instance_parameters = OrderedDict(
                izip(
                    parameter_names,
                    [] if spec.defaults is None else spec.defaults,
                )
            )

            # Merge in the positional parameter values
            instance_parameters.update(
                izip(
                    parameter_names,
                    args,
                )
            )

            # Add in the keyword argument values
            instance_parameters.update(kwargs)

            if len(instance_parameters) < len(args):
                continue
            elif set(kwargs.keys()).difference(instance_parameters.keys()):
                continue

            # Get the types of each parameter
            instance_prototype = {
                _key: _value if type(_value) == type else type(_value)
                for _key, _value
                in instance_parameters.iteritems()
            }

            # Not a candidate if the type signatures don't match
            if _prototype != instance_prototype:
                continue

            # Check the values for permissibility
            for parameter_name, parameter_value in instance_parameters.iteritems():
                permitted_values = _permissible_values.get(parameter_name)

                if permitted_values is None:
                    continue
                elif parameter_value in permitted_values:
                    continue

                # Found non permissible value
                break
            else:
                # All values were found to be permissible, so call the function
                return fn(**instance_parameters)

        raise NotImplementedError(
            "Function '%s' cannot be found with the expressed signature (%s, %s)" % (
                ":".join(function_key),
                args,
                kwargs,
            )
        )

@prototype(one=int, two=int, x=str)
def mine(x, one=1, two=0):
    print "THERE", x, one, two

@prototype(a=float)
def mine(a):
    print "NOT", a

print
print "=============="
print "Mixed type specifications ..."

mine(2.2) # a is a float

try:
    mine(a="us") # 'x' is not a str
except NotImplementedError, _exception:
    print repr(_exception)

mine(two=1, one=2, x="you")
mine("1", two=12) # 'x' is a str

try:
    mine(1, two=12) # 'x' is not an int
except NotImplementedError, _exception:
    print repr(_exception)

print
print "=============="
print "We do value checking too ..."

@prototype(value=(int, {1,2,3}))
def ranges(value):
    print "RANGE (1,2,3)", value

@prototype(value=(int, {4, 7}))
def ranges(value):
    print "RANGE (4, 7)", value

@prototype(value=(int, {3, 5}), name=str)
def ranges(value, name):
    print "RANGE (%s)" % (name), value

@prototype(value=int)
def ranges(value):
    print "RANGE (ALL)", value

for i in xrange(10):
    ranges(i)

ranges(5, name="BOB")


print
print "=============="
print "Cascading calls ..."

@prototype(name=str)
def start_service(name):
    print "Calling start service with %s and %s" % (name, [])
    return start_service(name, [])

@prototype(name=str, args=list)
def start_service(name, args):
    print "Calling start service as tag %s with %s and %s" % (name, name, args)
    return start_service(name, name, args)

@prototype(service_tag=str, name=str, args=list)
def start_service(service_tag, name, args):
    print "Starting service as %s with module %s and parameters %s" % (service_tag, name, args)

start_service("fred")

print

start_service("fred", args=[1,2,3])

print
print "=============="
print "Nested functions"

def outer():
    def middle():
        @prototype(value=(int, [1,6,2]))
        def two(value):
            print "Value", value, "is an integer in range"

        @prototype(value=int)
        def two(value):
            print "Value", value, "is an integer"

        @prototype(value=str)
        def two(value):
            print "Value", value, "is a string"

        map(two, range(6) + ["whee"])

    return middle()

outer()
