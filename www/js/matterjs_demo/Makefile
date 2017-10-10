.PHONY: clean

all: build/static build/static/d3.min.js \
	build/static/matter.js \
	build/bin/webserve \
	build/bin/runner
	@cp src/js/* build/static/.
	@cp src/html/* build/static/.
	@cp src/api/* build/bin/.

demo: all
	build/bin/runner "make; exec build/bin/webserve --static=build/static --api=build/bin --port=10019" src

build/%:
	@install -d $@

checkouts:
	@mkdir checkouts

build/static/matter.js: build/static checkouts/Matter
	@cp checkouts/Matter/build/$(notdir $@) $@

build/static/ajax.js: build/static checkouts/recipes
	@cp checkouts/recipes/www/js/ajax/$(notdir $@) $@

build/bin/webserve: build/bin checkouts/webserve
	@cp checkouts/webserve/src/$(notdir $@) $@

build/bin/runner: build checkouts/recipes
	@cp checkouts/recipes/bash/monitored_runner $@

build/static/d3.min.js: build/static
	@curl -q -s https://d3js.org/d3.v4.min.js -o $@

checkouts/Matter: checkouts
	-@git clone https://github.com/liabru/matter-js.git $@
	@(cd $@ && git checkout tags/0.10.0 -b latest)
	@touch checkouts/*

checkouts/webserve: checkouts
	@git clone https://github.com/damionw/webserve.git $@
	@touch checkouts/*

checkouts/recipes: checkouts
	@git clone https://github.com/damionw/recipes.git $@
	@touch checkouts/*

clean:
	-@rm -rf build checkouts
