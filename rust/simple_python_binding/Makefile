all: venv packages
	venv/bin/maturin build --out packages

install: all
	venv/bin/pip install pyo3_demo --find-links packages --ignore-installed

venv:
	python -m venv venv --system-site-packages
	venv/bin/pip install --upgrade maturin pip

packages:
	@install -d $@

clean:
	rm -rf venv packages
