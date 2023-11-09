export PATH := /usr/lib/qt5/bin:$(PATH)
export LD_LIBRARY_PATH := /usr/lib/qt5/lib:$(LD_LIBRARY_PATH)

.PHONY: clean

all:
	cargo build --color never

run demo: all
	cargo run --color never

clean:
	cargo clean --color never
