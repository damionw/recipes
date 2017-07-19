SUBDIRS = $(shell find * -mindepth 1 -maxdepth 1 -name Makefile -printf '%h\n')
MAKE = make

all:
	@for dir in $(SUBDIRS); do $(MAKE) -C $$dir || exit 255; done

clean:
	@for dir in $(SUBDIRS); do $(MAKE) -C $$dir clean || exit 255; done
