var _Expanding = window.Expanding = function(selector) {
    var format_element = function() {
    }

    var format_container = function() {
        var container = this;

        var children = d3.selectAll(d3.select(container).node().childNodes)
            .filter(
                function() {
                    return this.nodeName == "DIV";
                }
            )
        ;

        children
            .style("text-align", "center")
            .style("border-style", "ridge")
            .style("border-color", "white")
            .style("border-width", "0px 0px 2px 0px")
            .each(format_element)
        ;

        d3.select(children[0])
            .style("border-width", "2px 0px 2px 0px")
        ;
    };

    d3.selectAll(selector)
        .each(format_container);
    ;
}
