.PHONY: clean

all: build build/static/d3.min.js build/bin/webserve build/bin/runner \
	build/static/quill.min.js build/static/quill.snow.css
	@cp src/html/* build/static/.
#	@cp src/js/* build/static/.

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

build/static/quill.min.js: build checkouts/quill
	@cp checkouts/quill/quill.min.js $@

build/static/quill.snow.css: build checkouts/quill
	@cp checkouts/quill/quill.snow.css $@

checkouts/recipes: checkouts
	@git clone https://github.com/damionw/recipes.git $@
	@touch checkouts/*

checkouts/quill: checkouts
	wget --quiet -O - https://github.com/quilljs/quill/releases/download/v1.3.0/quill.tar.gz | (cd checkouts && tar xfz -)

clean:
	-@rm -rf build checkouts