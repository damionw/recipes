.PHONY: clean

all: build/static build/modules build/static/d3.min.js build/bin/webserve build/bin/runner
	-@cp src/js/* build/static/.
	-@cp src/modules/* build/modules/.
	-@cp src/html/* build/static/.
	-@cp src/css/* build/static/.

demo: all
	build/bin/runner "make; trap exit 1 2 3; exec build/bin/webserve --static=build/static --module=build/modules/main --port=10007" src

build/%:
	@install -d $@

checkouts:
	@mkdir checkouts

build/bin/runner: build/bin checkouts/recipes
	@cp checkouts/recipes/bash/monitored_runner $@

build/bin/webserve: build/bin checkouts/webserve
	@cp checkouts/webserve/src/$(notdir $@) $@

build/static/d3.min.js: build/static
	@curl -q -s https://d3js.org/d3.v4.min.js -o $@

checkouts/webserve: checkouts
	@git clone https://github.com/damionw/webserve.git $@
	@touch checkouts/*

checkouts/recipes: checkouts
	@git clone https://github.com/damionw/recipes.git $@
	@touch checkouts/*

clean:
	-@rm -rf build checkouts
