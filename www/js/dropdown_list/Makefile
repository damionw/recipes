.PHONY: clean

all: build build/static/d3.min.js build/static/ajax.js build/bin/webserve build/bin/runner
	@cp src/js/* build/static/.
	@cp src/modules/* build/modules/.
	@cp src/html/* build/static/.
	@cp src/css/* build/static/.

demo: all
	build/bin/runner "make; trap exit 1 2 3; exec build/bin/webserve --static=build/static --module=build/modules/data --port=10007" src

build:
	@install -d build/bin build/static build/modules

checkouts:
	@mkdir checkouts

build/bin/runner: build checkouts/recipes
	@cp checkouts/recipes/bash/monitored_runner $@

build/bin/webserve: build checkouts/webserve
	@cp checkouts/webserve/src/$(notdir $@) $@

build/static/ajax.js: checkouts/recipes
	@cp checkouts/recipes/www/js/ajax/$(notdir $@) $@

build/static/d3.min.js: build
	@curl -q -s https://d3js.org/d3.v4.min.js -o $@

checkouts/webserve: checkouts
	@git clone https://github.com/damionw/webserve.git $@
	@touch checkouts/*

checkouts/recipes: checkouts
	@git clone https://github.com/damionw/recipes.git $@
	@touch checkouts/*

clean:
	-@rm -rf build checkouts
