var HSplit = window.HSplit = function(selector) {
    var onMouseDown = function(){
        var slider = d3.select(this).classed("_active", true);
        var container = slider.node().parentNode;
        var first_element = slider.node().previousElementSibling;
        var second_element = slider.node().nextElementSibling;

        var state = {
            width: parseInt(d3.select(first_element).style("width"), 10)
        };

        var w = d3.select(window)
            .on("mousemove", mousemove)
            .on("mouseup", mouseup);

        d3.event.preventDefault(); // disable text dragging

        function mousemove() {
            var coordinates = d3.mouse(slider.node());
            var width_spec = Math.round(state.width + coordinates[0]) + "px";

            d3.select(first_element).style("width", width_spec);
            state.width = parseInt(d3.select(first_element).style("width"), 10);
        }

        function mouseup() {
            slider.classed("_active", false);
            w.on("mousemove", null).on("mouseup", null);
        }
    };

    var format_split = function() {
        var container = this;

        var first_element = container.firstElementChild;
        var splitter_element = document.createElement("div");
        var second_element = document.createElement("div");

        // Place all the rightward elements inside a new div
        d3.selectAll(d3.select(container).node().childNodes)
            .filter(
                function() {
                    return (this != first_element);
                }
             )
            .each(
                function() {
                    container.removeChild(this);
                    second_element.appendChild(this);
                }
            );

        // Reconstruct the container to have 3 elements (left, splitter, right)
        container.appendChild(splitter_element);
        container.appendChild(second_element);

        d3.select(container)
            .style("display", "table")
            .style("width", "100%")
        ;

        d3.selectAll(d3.select(container).node().childNodes)
            .style("display", "table-cell")
            .style("height", "100%")
        ;
        
        var background_color = d3.select(first_element).style("background");

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
        .each(format_split);
    ;
}

var VSplit = window.VSplit = function(selector) {
    var onMouseDown = function(){
        var slider = d3.select(this).classed("_active", true);
        var container = slider.node().parentNode;
        var first_element = slider.node().previousElementSibling;
        var second_element = slider.node().nextElementSibling;

        var state = {
            width: parseInt(d3.select(first_element).style("height"), 10)
        };

        var w = d3.select(window)
            .on("mousemove", mousemove)
            .on("mouseup", mouseup);

        d3.event.preventDefault(); // disable text dragging

        function mousemove() {
            var coordinates = d3.mouse(slider.node());
            var height_spec = Math.round(state.height + coordinates[1]) + "px";

            d3.select(first_element).style("height", height_spec);
            state.width = parseInt(d3.select(first_element).style("height"), 10);
        }

        function mouseup() {
            slider.classed("_active", false);
            w.on("mousemove", null).on("mouseup", null);
        }
    };

    var format_split = function() {
        var container = this;

        var first_element = container.firstElementChild;
        var splitter_element = document.createElement("div");
        var second_element = document.createElement("div");

        // Place all the rightward elements inside a new div
        d3.selectAll(d3.select(container).node().childNodes)
            .filter(
                function() {
                    return (this != first_element);
                }
             )
            .each(
                function() {
                    container.removeChild(this);
                    second_element.appendChild(this);
                }
            );

        // Reconstruct the container to have 3 elements (left, splitter, right)
        container.appendChild(splitter_element);
        container.appendChild(second_element);

        d3.select(container)
            .style("display", "table")
            .style("height", "100%")
        ;

        d3.selectAll(d3.select(container).node().childNodes)
            .style("display", "table-row")
            .style("width", "100%")
        ;

        var background_color = d3.select(first_element).style("background");

        d3.select(splitter_element)
            .style("height", "24px")
            .style("margin-top", 0)
            .style("margin-bottom", 0)
            .style("cursor", "ew-resize")
            .style("background", background_color)
            .style("border-style", "raised")
            .on("mousedown", onMouseDown)
            .on("mouseover", function() {d3.select(this).style("background", "blue");})
            .on("mouseout", function() {d3.select(this).style("background", background_color);})
        ;
    }

    d3.selectAll(selector)
        .each(format_split);
    ;
}
