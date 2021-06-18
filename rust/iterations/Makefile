executable := $(notdir $(CURDIR))

all: $(executable)

.PHONY := clean

$(executable): main.rs
	rustc $< -o $@

clean:
	rm $(executable)
