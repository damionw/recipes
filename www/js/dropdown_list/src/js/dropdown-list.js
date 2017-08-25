function refresh() {
    ajaxFunction(
        "/api/testdata",

        function(ajax_result) {
            d3.select(".selection")
                .selectAll("div")
                .data(ajax_result)
                .enter()
                    .append("div")
                    .classed("option", true)
                    .classed("dropdown-option", true)
                    .text(function(d,i) {return d;})
                    .on("click", function(d) {select(d);})
            ;
        },

        function(ajax_exception) {
            console.log("Cannot retrieve values");
        },

        "GET",

        null
    );
}

function select(name) {
    console.log(name);

    d3.select(".name")
        .text(name)
    ;
}