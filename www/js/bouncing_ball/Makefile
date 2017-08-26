.PHONY: clean

all: build/static build/modules build/static/d3.min.js build/bin/webserve build/bin/runner
	-@cp src/modules/* build/modules/.
	-@cp src/js/* build/static/.
	-@cp src/html/* build/static/.

demo: all
	build/bin/runner "make; exec build/bin/webserve --static=build/static --module=build/modules/main --port=10007" src

build/%:
	@install -d $@

checkouts:
	@mkdir checkouts

build/bin/runner: build/bon checkouts/recipes
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
