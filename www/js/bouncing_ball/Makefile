.PHONY: clean

all: build build/static/d3.min.js build/bin/webserve build/bin/runner
	@cp src/js/* src/html/* build/static/.
	@cp src/bin/* build/bin/.

demo: all
	build/bin/runner "make; exec build/bin/webserve --static=build/static --port=10007" src

build:
	@install -d build/bin build/static

checkouts:
	@mkdir checkouts

build/bin/runner: build checkouts/recipes
	@cp checkouts/recipes/bash/monitored_runner $@

build/bin/webserve: build checkouts/recipes
	@cp checkouts/recipes/bash/$(notdir $@) $@

build/static/d3.min.js: build
	@curl -q -s https://d3js.org/d3.v4.min.js -o $@

checkouts/recipes: checkouts
	@git clone https://github.com/damionw/recipes.git $@
	@touch checkouts/*

clean:
	-@rm -rf build checkouts
