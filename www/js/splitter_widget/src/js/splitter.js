var Split = function(selector) {
    var boundary = 97;

    var onMouseDown = function(){
        var slider = d3.select(this).classed("_active", true);
        var left_element = slider.node().previousElementSibling;
        var right_element = slider.node().nextElementSibling;

        var state = {
            width: parseInt(d3.select(left_element).style("width"), 10)
        };

        d3.select(right_element).style("width", "calc(" + boundary + "% - " + state.width + "px)");

        var w = d3.select(window)
            .on("mousemove", mousemove)
            .on("mouseup", mouseup);

        d3.event.preventDefault(); // disable text dragging

        function mousemove() {
            var coordinates = d3.mouse(slider.node());
            var width_spec = Math.round(state.width + coordinates[0]) + "px";

            d3.select(left_element).style("width", width_spec);
            state.width = parseInt(d3.select(left_element).style("width"), 10);
            d3.select(right_element).style("width", "calc(" + boundary + "% - " + width_spec + ")");
        }

        function mouseup() {
            slider.classed("_active", false);
            w.on("mousemove", null).on("mouseup", null);
        }
    };

    var insert_splitter = function(d,i) {
        var splitter_element = document.createElement("div");
        var right_element = document.createElement("div");
        var container_element = this.parentNode;
        var left_element = this;

        d3.selectAll(d3.select(container_element).node().childNodes)
            .filter(
                function() {
                    return (this != left_element);
                }
             )
            .each(
                function() {
                    container_element.removeChild(this);
                    right_element.appendChild(this);
                }
            );

        container_element.appendChild(splitter_element);
        container_element.appendChild(right_element);

        d3.select(container_element)
            .selectAll("*")
            .style("display", "inline-block")
            .style("height", "100%")
            .style("float", "left")
        ;

        d3.select(left_element)
            .style("margin-right", 0)
        ;

        var background_color = d3.select(left_element).style("background");

        d3.select(splitter_element)
            .style("width", "4px")
            .style("margin-left", 0)
            .style("margin-right", 0)
            .style("cursor", "ew-resize")
            .style("background", background_color)
            .style("border-style", "raised")
            .on("mousedown", onMouseDown)
            .on("mouseover", function() {d3.select(this).style("background", "blue");})
            .on("mouseout", function() {d3.select(this).style("background", background_color);})
        ;

        d3.select(right_element)
            .style("width", "calc(" + boundary + "% - " + parseInt(d3.select(left_element).style("width"), 10) + "px)")
            .style("margin-left", 0)
        ;
    }

    d3.selectAll(selector)
        .each(insert_splitter);
    ;
}

window.Split = Split;
