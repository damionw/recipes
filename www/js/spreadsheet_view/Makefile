.PHONY: clean

all: build build/static/d3.min.js \
	build/static/Grid.js build/static/Grid.css \
	build/bin/webserve build/static/ajax.js \
	build/bin/runner
	@cp src/js/* build/static/.
	@cp src/html/* build/static/.
	@cp src/api/* build/bin/.

demo: all
	build/bin/runner "make; exec build/bin/webserve --static=build/static --api=build/bin --port=10007" src

build:
	@install -d build/bin build/static

checkouts:
	@mkdir checkouts

build/static/Grid.js: build checkouts/Grid
	@cp checkouts/Grid/src/$(notdir $@) $@

build/static/Grid.css: build checkouts/Grid
	@cp checkouts/Grid/src/$(notdir $@) $@

build/static/ajax.js: build checkouts/recipes
	@cp checkouts/recipes/www/js/ajax/$(notdir $@) $@

build/bin/runner: build checkouts/recipes
	@cp checkouts/recipes/bash/monitored_runner $@

build/bin/webserve: build checkouts/recipes
	@cp checkouts/recipes/bash/$(notdir $@) $@

build/static/d3.min.js: build
	@curl -q -s https://d3js.org/d3.v4.min.js -o $@

checkouts/Grid: checkouts
	@git clone https://github.com/damionw/Grid.git $@
	@touch checkouts/*

checkouts/recipes: checkouts
	@git clone https://github.com/damionw/recipes.git $@
	@touch checkouts/*

clean:
	-@rm -rf build checkouts
