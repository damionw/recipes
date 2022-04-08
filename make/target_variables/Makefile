all: one = $(shell ls)
any: one = whatever

any:
	echo THERE $(one)

all:
	test -n "$(one)"
	echo HERE $(one)
