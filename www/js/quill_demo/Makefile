.PHONY: clean

all: build/static build/modules build/static/d3.min.js build/bin/webserve build/bin/runner \
	build/static/quill.min.js build/static/quill.snow.css
	-@cp src/html/* src/js/* src/css/* build/static/.
	-@cp src/modules/* build/modules/.

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

build/static/quill.min.js: build/static checkouts/quill
	@cp checkouts/quill/quill.min.js $@

build/static/quill.snow.css: build/static checkouts/quill
	@cp checkouts/quill/quill.snow.css $@

checkouts/recipes: checkouts
	@git clone https://github.com/damionw/recipes.git $@ || (cd $@ && git pull)
	@touch checkouts/*

checkouts/webserve: checkouts
	git clone https://github.com/damionw/webserve.git $@ || (cd $@ && git pull)
	@touch checkouts/*

checkouts/quill: checkouts
	@LD_LIBRARY_PATH= /usr/bin/wget --quiet -O - --no-check-certificate https://github.com/quilljs/quill/releases/download/v1.3.0/quill.tar.gz | (cd checkouts && tar xfz -)

clean:
	-@rm -rf build checkouts
