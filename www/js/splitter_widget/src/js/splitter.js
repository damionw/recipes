var Split = function(selector) {
    var onMouseDown = function(){
        var slider = d3.select(this).classed("_active", true);

        // We only change the width of the preceding element
        var prev = slider.select(
            function() {return this.previousElementSibling;}
        );

        var next = slider.select(
            function() {return this.nextElementSibling;}
        );

        var state = {
            width: parseInt(prev.style("width"), 10)
        };

        var w = d3.select(window)
            .on("mousemove", mousemove)
            .on("mouseup", mouseup);

        d3.event.preventDefault(); // disable text dragging

        function mousemove() {
            var coordinates = d3.mouse(slider.node());

            var bounding_box = slider.select(
                function() {return this.parentNode.getBoundingClientRect();}
            )

            prev.style("width", (state.width + coordinates[0]) + "px");
            state.width = parseInt(prev.style("width"), 10);
            // next.style("width", (bounding_box.width - state.width) + "px");
            // console.log(bounding_box[0][0]);
        }

        function mouseup() {
            slider.classed("_active", false);
            w.on("mousemove", null).on("mouseup", null);
        }
    };

    var insert_splitter = function(d,i) {
        var div = document.createElement('div');
        this.parentNode.insertBefore(div, this.nextSibling);

        d3.select(div)
            .classed("vsplitter", true)
            .on("mousedown", onMouseDown)
        ;
    }

    d3.selectAll(selector)
        .each(insert_splitter);
    ;
}

window.Split = Split;
