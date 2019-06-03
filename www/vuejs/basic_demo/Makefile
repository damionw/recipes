PACKAGE_NAME := $(notdir $(shell pwd))
INSTALL_PATH := $(shell python -c 'import sys; print sys.prefix if hasattr(sys, "real_prefix") else exit(255)' 2>/dev/null || echo "/usr/local")

BUILD_ROOT := build
BUILD_LIB := $(BUILD_ROOT)/lib
BUILD_BIN := $(BUILD_ROOT)/bin
BUILD_SHARE := $(BUILD_LIB)/share/$(PACKAGE_NAME)
BUILD_STATIC := $(BUILD_SHARE)/static
BUILD_MODULES := $(BUILD_SHARE)/plugins
BUILD_TOOLS := $(BUILD_SHARE)/tools

DIR_COMPONENTS := $(BUILD_TOOLS) $(BUILD_MODULES) $(BUILD_STATIC) $(BUILD_BIN) $(BUILD_LIB) checkouts

STATIC_COMPONENTS := $(addprefix $(BUILD_STATIC)/, $(notdir $(wildcard src/static/*))) \
	$(BUILD_STATIC)/vue.js \
	$(BUILD_STATIC)/vuetify.js \
	$(BUILD_STATIC)/vuetify.css

MODULE_COMPONENTS := $(addprefix $(BUILD_MODULES)/, $(notdir $(wildcard src/modules/*)))

RUN_DEMO := $(BUILD_BIN)/run_$(PACKAGE_NAME)
WEBSERVE := $(BUILD_TOOLS)/webserve

.PHONY: clean help

all: $(WEBSERVE) $(RUN_DEMO) $(MODULE_COMPONENTS) $(STATIC_COMPONENTS)

help:
	@echo "Usage: make [all|run_demo|clean]"

run_demo: all
	@$(RUN_DEMO)

$(WEBSERVE): checkouts/webserve $(DIR_COMPONENTS)
	@install $</build/bin/$(notdir $@) $@

$(RUN_DEMO): $(DIR_COMPONENTS) $(WEBSERVE)
	@echo "#!/usr/bin/env bash" > $@
	@echo "$(WEBSERVE) --static='$(BUILD_STATIC)' --allow=127.0.0.1 --module='$(BUILD_MODULES)/$(PACKAGE_NAME)' --port=11112" >> $@
	@chmod ugo+rx $@

$(BUILD_STATIC)/vue.js: $(DIR_COMPONENTS)
	@curl -q -s https://cdn.jsdelivr.net/npm/vue/dist/vue.js -o $@

$(BUILD_STATIC)/vuetify.js: $(DIR_COMPONENTS)
	@curl -q -s https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.js -o $@

$(BUILD_STATIC)/vuetify.css: $(DIR_COMPONENTS)
	@curl -q -s https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css -o $@

$(BUILD_STATIC)/material.css: $(DIR_COMPONENTS)
	@curl -q -s 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' -o $@

$(BUILD_STATIC)/%: $(DIR_COMPONENTS)
	@install -m 744 src/static/$(notdir $@) $@

$(BUILD_MODULES)/%: $(DIR_COMPONENTS)
	@install -m 744 src/modules/$(notdir $@) $@

checkouts/webserve: $(DIR_COMPONENTS)
	@(cd $@ >/dev/null 2>&1 && git pull || git clone https://github.com/damionw/webserve.git $@)
	@$(MAKE) -C $@ clean tests

$(DIR_COMPONENTS):
	@install -d $@

realclean: clean
	-@rm -rf checkouts

clean:
	-@rm -rf $(BUILD_ROOT)
