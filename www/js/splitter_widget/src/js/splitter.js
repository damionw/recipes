var HSplit = window.HSplit = function(selector) {
    var onMouseDown = function(){
        var slider = d3.select(this).classed("_active", true);
        var container = slider.node().parentNode;
        var left_element = slider.node().previousElementSibling;
        var right_element = slider.node().nextElementSibling;

        var state = {
            width: parseInt(d3.select(left_element).style("width"), 10)
        };

        var w = d3.select(window)
            .on("mousemove", mousemove)
            .on("mouseup", mouseup);

        d3.event.preventDefault(); // disable text dragging

        function mousemove() {
            var coordinates = d3.mouse(slider.node());
            var width_spec = Math.round(state.width + coordinates[0]) + "px";

            d3.select(left_element).style("width", width_spec);
            state.width = parseInt(d3.select(left_element).style("width"), 10);
        }

        function mouseup() {
            slider.classed("_active", false);
            w.on("mousemove", null).on("mouseup", null);
        }
    };

    var split_element = function() {
        var container = this;

        var left_element = container.firstElementChild;
        var splitter_element = document.createElement("div");
        var right_element = document.createElement("div");

        // Place all the rightward elements inside a new div
        d3.selectAll(d3.select(container).node().childNodes)
            .filter(
                function() {
                    return (this != left_element);
                }
             )
            .each(
                function() {
                    container.removeChild(this);
                    right_element.appendChild(this);
                }
            );

        // Reconstruct the container to have 3 elements (left, splitter, right)
        container.appendChild(splitter_element);
        container.appendChild(right_element);

        d3.select(container)
            .style("display", "table")
            .style("width", "100%")
        ;

        d3.selectAll(d3.select(container).node().childNodes)
            .style("display", "table-cell")
            .style("height", "100%")
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
    }

    d3.selectAll(selector)
        .each(split_element);
    ;
}
