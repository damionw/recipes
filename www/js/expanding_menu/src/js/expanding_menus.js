var _Expanding = window.Expanding = function(selector) {
    var style_class = "_expanding";

    var style_rules = [
        "." + style_class + ` {
            text-align: center;
            border-style: ridge;
            border-color: white;
            border-width: 0px 0px 2px 0px;
            margin: 5px 0px 5px 0px;
            cursor: pointer;
        }`,

        "." + style_class + `:hover {
            color: #ffffff;
        }`
    ];

    var div_filter = function(d, i) {
        return this.nodeName == "DIV";
    };

    var first_filter = function(d, i) {
        return i == 0;
    };

    var format_element = function() {
    };

    var add_style = function() {
        // Create a new style tag
        var style = document.createElement("style");

        // WebKit hack
        style.appendChild(document.createTextNode(""));

        // Append the style tag to head
        document.head.appendChild(style);

        // Grab the stylesheet object
        var sheet = style.sheet;

        // Use addRule or insertRule to inject styles
        for (var i = 0; i < style_rules.length; ++i) {
            sheet.insertRule(style_rules[i], i);
        }
    };

    var format_container = function() {
        var children = d3.selectAll(d3.select(this).node().childNodes).filter(div_filter);

        children
            .classed(style_class, true)
            .each(format_element)
        ;

        children
            .filter(first_filter)
            .style("border-width", "2px 0px 2px 0px")
        ;
    };

    add_style();

    d3.selectAll(selector)
        .each(format_container);
    ;
}
