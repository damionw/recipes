#! /usr/bin/env python

from inspect import getargspec
from collections import OrderedDict
from itertools import izip

class prototype(object):
    _registry = {}

    def __init__(self, **prototype):
        self._prototype = prototype

    @staticmethod
    def get_type_spec(prototype):
        for _key, _type in prototype.iteritems():
            if type(_type) == type:
                yield _key, _type
            elif type(_type) == tuple:
                yield _key, _type[0]
            else:
                raise Exception("Type specification '%s' must be either a single type or a tuple" % (_key))

    @staticmethod
    def get_value_spec(prototype):
        for _key, _type in prototype.iteritems():
            if type(_type) == type:
                yield _key, None
            else:
                yield _key, _type[1]

    def __call__(self, fn):
        function_key = (fn.__module__, fn.__name__)

        collection = self._registry.setdefault(function_key, [])

        signature_definition = [
            fn,
            getargspec(fn),
            dict(self.get_type_spec(self._prototype)),
            dict(self.get_value_spec(self._prototype)),
        ]

        collection.append(signature_definition)

        return lambda *args, **kwargs: self.handler(function_key, args, kwargs)

    @staticmethod
    def handler(function_key, args, kwargs):
        for fn, spec, _prototype, _permissible_values in prototype._registry[function_key]:
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
                _key: type(_value) for _key, _value in instance_parameters.iteritems()
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

        raise NotImplementedError("Function '%s' cannot be found with the expressed signature" % (":".join(function_key)))

@prototype(one=int, two=int, x=str)
def mine(x, one=1, two=0):
    print "THERE", x, one, two

@prototype(a=float)
def mine(a):
    print "NOT", a

print
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
