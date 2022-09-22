executable := $(notdir $(CURDIR))

all: $(executable)

.PHONY := clean

demo: all
	./$(executable)

$(executable): main.rs
	rustc $< -o $@

clean:
	rm $(executable)
