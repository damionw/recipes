.PHONY: all build

all: build/static/d3.min.js build/bin/webserve

demo: 
	build/bin/webserve --static=build/static

build:
	@install -d build/bin build/static
	@cp src/* build/static

build/static/d3.min.js: build
	@curl -q -s https://d3js.org/d3.v4.min.js -o $@

build/bin/webserve: checkouts/recipes
	@cp checkouts/recipes/bash/webserve $@

checkouts/recipes: checkouts
	@git clone https://github.com/damionw/recipes.git $@

checkouts:
	@mkdir checkouts

clean:
	-@rm -rf build checkouts
