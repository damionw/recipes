.PHONY: clean

TABULATOR_MODE := bootstrap5
FONTAWESOME_VERSION := 6.4.2
CHARTS_VERSION := 3.8.2
FONTAWESOME_URL := https://cdnjs.cloudflare.com/ajax/libs/font-awesome/$(FONTAWESOME_VERSION)
WGET_OPTIONS := --no-check-certificate --quiet

SERVICE_PORT ?= 17002
SERVICE_ADDRESS ?= 127.0.0.1

all: 	font-awesome.css \
	Chart.js \
	pureknob.js \
	quill.min.js \
	quill.snow.css \
	tabulator.css \
	tabulator.js \
	youeye.js

run-server: all
	@echo "Running http service on $(SERVICE_ADDRESS):$(SERVICE_PORT)" >&2
	@busybox httpd \
                -f \
                -p "$(SERVICE_ADDRESS):$(SERVICE_PORT)" \
                -h "$(realpath .)" \

youeye.js: checkouts/youeye.js/build/static/youeye.js
	@cp $< $@

font-awesome.css: all.min.css
	@sed -e 's/url/\nurl/g' < $< | \
	grep '^url' | \
	sed -e 's/[\)][\ ]*.*$$//g' \
		-e "s/^url[\(][\']*//g" \
		-e 's/[\?].*$$//g' \
		-e "s|^\.\.\/|$(FONTAWESOME_URL)/|g" | \
 		while read url; do wget $(WGET_OPTIONS) $$url -O $(dir $@)/$$(basename $$url); done

	@sed -e "s|\(url[\(][\']*\)\.\.\/webfonts\/\([^\/)]*\)\([\']*[\)]\)|\1\2\3|g" \
		< $< \
		> $@

	-@rm $<

all.min.css:
	@curl -q -s $(FONTAWESOME_URL)/css/all.min.css -o $@

# See: https://www.chartjs.org/docs/latest/getting-started/
Chart.js:
	@curl -q -s https://cdnjs.cloudflare.com/ajax/libs/Chart.js/$(CHARTS_VERSION)/chart.min.js -o $@

# See: https://quilljs.com/
quill.min.js quill.snow.css: checkouts/quill
	@cp $</$(notdir $@) $@

# See: https://tabulator.info/
tabulator.js:
	@wget $(WGET_OPTIONS) -nd -nH -O $@ https://unpkg.com/tabulator-tables@5.5.2/dist/js/tabulator.min.js

# See: https://tabulator.info/
# NOTE: See TABULATOR_MODE
tabulator.css:
	@wget $(WGET_OPTIONS) -nd -nH -O $@ https://unpkg.com/tabulator-tables@5.5.2/dist/css/tabulator$(if $(TABULATOR_MODE),_,)$(TABULATOR_MODE).min.css

# See: https://github.com/andrepxx/pure-knob
pureknob.js: checkouts/pureknob
	@install $</$(notdir $@) $@

checkouts/youeye.js/build/static/youeye.js: checkouts/youeye.js
	@make -C $<

checkouts/pubber/build/static/pubber.js: checkouts/pubber
	@make -C $<

checkouts/youeye.js: | checkouts
	@(cd "$@" >/dev/null 2>&1 && git pull) || git clone https://github.com/damionw/youeye.js.git $@

checkouts/pubber: | checkouts
	@(cd "$@" >/dev/null 2>&1 && git pull) || git clone https://github.com/damionw/pubber.git $@

checkouts/pureknob: | checkouts
	@(cd "$@" >/dev/null 2>&1 && git pull) || git clone https://github.com/andrepxx/pure-knob $@

checkouts/quill: | checkouts
	@(cd "$|" && wget $(WGET_OPTIONS) -nc -nd -nH -O - https://github.com/quilljs/quill/releases/download/v0.20.1/quill.tar.gz | tar xfz -)

checkouts:
	@install -d $@

clean:
	-@rm -rf checkouts
