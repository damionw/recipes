var EntryForm = window.EntryForm = function(selector, data_format) {
    /* data_format:
    [{"label": <label>, "name": <name>, "value": <value>}, ...]
    */

    function initialize(element, data_format, _collection) {
        function format_row(element, data_descriptor) {
            var d3_row = d3.select(element);

            d3_row
                .append("div")
                .classed("entryform_label", true)
                .text(data_descriptor.label)
            ;

            d3_row
                .append("div")
                .classed("entryform_value", true)
                .text(data_descriptor.value)
            ;
        }

        _collection.push(element);

        d3.select(element)
            .html("")
            .selectAll("div")
            .data(data_format)
            .enter()
                .append("div")
                .classed("entryform_row", true)
                .each(function(d) {format_row(this, d);})
            ;

        d3.select(element)
            .append("div")
            .append("div")
            .classed("entryform_button", true)
            .text("Done")
        ;
    }

    var targets = this.targets = [];

    d3.selectAll(selector)
        .each(function(d,i) {initialize(this, data_format, targets);})
    ;
};
