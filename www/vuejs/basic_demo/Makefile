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
	$(BUILD_STATIC)/vuetify.css \
	$(BUILD_STATIC)/material.css \
	$(BUILD_STATIC)/font-awesome.css

MODULE_COMPONENTS := $(addprefix $(BUILD_MODULES)/, $(notdir $(wildcard src/modules/*)))

FREE_PORT := $(shell netstat -ln --tcp -4 | awk '{if (NR > 2) {print $$4;}}' | awk -F: '{print $$2;}' | sort -un | awk '{for (i=a + 1; i < $$1; ++i) {if (i >= start && i <= finish) {print i;}} a=$$1;}' a=0 start=7000 finish=7200 | head -1)
WEBSERVE := $(BUILD_TOOLS)/webserve
MONITORED_RUNNER := $(BUILD_BIN)/monitored_runner

.PHONY: clean help

all: $(WEBSERVE) $(RUN_DEMO) $(MODULE_COMPONENTS) $(STATIC_COMPONENTS)

help:
	@echo "Usage: make [all|run_demo|clean]"

_run_demo: clean all
	@$(WEBSERVE) \
		--static='$(BUILD_STATIC)' \
		--allow=127.0.0.1 \
		--module='$(BUILD_MODULES)/$(PACKAGE_NAME)' \
		--port=$(FREE_PORT)

run_demo: $(MONITORED_RUNNER)
	@$(MONITORED_RUNNER) "make _run_demo" src Makefile

$(WEBSERVE): checkouts/webserve $(DIR_COMPONENTS)
	@install $</build/bin/$(notdir $@) $@

$(MONITORED_RUNNER): checkouts/recipes $(DIR_COMPONENTS)
	@install $</bash/$(notdir $@) $@

$(BUILD_STATIC)/vue.js: checkouts/vuejs $(DIR_COMPONENTS)
	@install -D $</dist/vue.min.js $@

$(BUILD_STATIC)/vuetify.js: $(DIR_COMPONENTS)
	@curl -q -s https://cdn.jsdelivr.net/npm/vuetify@1.5.14/dist/vuetify.min.js -o $@

$(BUILD_STATIC)/vuetify.css: $(DIR_COMPONENTS)
	@curl -q -s https://cdn.jsdelivr.net/npm/vuetify@1.5.14/dist/vuetify.min.css -o $@

$(BUILD_STATIC)/material.css: $(DIR_COMPONENTS)
	@curl -q -s 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' -o $@

$(BUILD_STATIC)/font-awesome.css: build
	@curl -q -s "https://use.fontawesome.com/releases/v5.0.13/css/all.css" -o $@

$(BUILD_STATIC)/%: $(DIR_COMPONENTS)
	@install -m 744 src/static/$(notdir $@) $@

$(BUILD_MODULES)/%: $(DIR_COMPONENTS)
	@install -m 744 src/modules/$(notdir $@) $@

checkouts/webserve: | $(@D)
	@(cd $@ >/dev/null 2>&1 && git pull || git clone https://github.com/damionw/webserve.git $@)
	@$(MAKE) -C $@ clean tests

checkouts/recipes: | $(@D)
	@git clone https://github.com/damionw/recipes.git $@

checkouts/vuejs: | $(@D)
	@git clone --branch v2.6.10 https://github.com/vuejs/vue $@

$(DIR_COMPONENTS):
	@install -d $@

realclean: clean
	-@rm -rf checkouts

clean:
	-@rm -rf $(BUILD_ROOT)
