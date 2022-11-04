export PATH := /usr/lib/qt5/bin:$(PATH)
export LD_LIBRARY_PATH := /usr/lib/qt5/lib:$(LD_LIBRARY_PATH)

.PHONY: clean

all:
	cargo build --color never

run: all
	cargo run

clean:
	cargo clean
