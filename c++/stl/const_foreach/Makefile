PROJECT_NAME ?= $(shell basename $(shell pwd))
SOURCES := $(wildcard *.c *.cpp)
HEADERFILES := $(wildcard *.h includes/*)
INCLUDES := -I.
CCFLAGS := -O2
LDFLAGS := -lstdc++
LIBS :=
FLAGS :=
CC := g++
LD := g++
ARCH := $(shell uname -s)-$(shell uname -r)
BINNAME := bin
LIBNAME := lib
BINDIR := $(BINNAME)/$(ARCH)
LIBDIR := $(LIBNAME)/$(ARCH)
MKDIR := mkdir
RM := rm

SUBDIRS  := $(shell find * -xdev \( -type d -o -type l \) -prune -exec test -f {}/Makefile \; -print)
OBJECTS := $(foreach pattern, $(addsuffix .o, $(basename $(SOURCES))), $(addprefix $(LIBDIR)/, $(pattern)))
TARGET_BASE := $(addprefix $(BINDIR)/, $(PROJECT_NAME))
BINARY_TARGET := $(TARGET_BASE)

all: arch $(BINARY_TARGET) # subdirs docs

tests: all
	@echo executing test $(BINARY_TARGET)
	$(BINARY_TARGET)

subdirs: $(SUBDIRS)

docs:
	-@test -f Doxyfile && (sed -e 's/^\(PROJECT_NAME[ ]*=[ ]*\)[A-Za-z0-9]*/\1 '"$(basename $(pwd))/" < Doxyfile | doxygen - >/dev/null 2>&1)

clean:
	@$(RM) -rf $(BINNAME) $(LIBNAME) *.d | true

arch:
	@$(MKDIR) -p "$(BINDIR)" "$(LIBDIR)" || true

$(BINARY_TARGET): $(OBJECTS)
	$(LD) $(OBJECTS) $(LDFLAGS) -o "$@"

$(LIBDIR)/%.o: %.cpp $(HEADERFILES)
	$(CC) $(CCFLAGS) $(INCLUDES) $(FLAGS) -c -o $@ $<

$(SUBDIRS): forced
	@$(MAKE) -C "$@" $(MAKECMDGOALS)

forced:
	@true
