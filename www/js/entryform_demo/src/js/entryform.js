var EntryForm = window.EntryForm = function(selector, data_format) {
    function initialize(element, data_format) {
        function format_row(data_descriptor) {
            var d3_row = d3.select(this);
            
            d3_row
                .append("div")
                .classed("entryform_label")
            ;

            d3_row
                .append("div")
                .classed("entryform_value")
            ;
        }

        var d3_element = d3.select(element);

        /* data_format:
        [{"label": <label>, "name": <name>, "value": <value>}, ...]
        */
        d3_element.html("");
        
        d3_element
            .selectAll("div")
            .data(data_format)
            .enter
                .append("div")
                .classed("entryform_row")
                .each(function(d) {format_row(d);})
            ;
    }

    var self = this;

    this.targets = [];

    d3.selectAll(selector)
        .each(function(d,i) {initialize(this, data_format);})
    ;
};
