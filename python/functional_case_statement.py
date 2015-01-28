#! /usr/bin/env python

from sys import argv

class default(object):
    pass

def case(value, *clauses):
    default_action = lambda *args: None

    for conditional, action in clauses:
        if conditional is default:
            default_action = action
            continue
        elif not hasattr(conditional, "__call__"):
            comparison = lambda _v: not cmp(conditional, _v)
        else:
            comparison = conditional

        if comparison(value):
            return action()

    return default_action()

def one():
    print "ONE"
    return 1

def two():
    print "TWO"
    return 2

def three():
    print "THREE"
    return 3

# Simple case
value = int((argv[1:] + [0])[0])

result = case(
    value,
    (1, one),
    (2, two),
    (default, three),
)

print "Result =", result

# Use in a filter expression
items = filter(
    lambda _value: _value is not None, (
        case(
            _value,
            (lambda _v: not _v % 2, lambda: _value * 3),
            (default, lambda: -1),
        ) for _value in xrange(19)
    )
)

print "Items = ", items
