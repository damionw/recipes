"use strict";

function SpreadSheet(selector) {
    this.d3element = d3.select(selector);
    this.refresh();
}

SpreadSheet.prototype.onSelect = function(toSelect, toRemove, undefined) {
    alert("Clicked " + toSelect);
}

SpreadSheet.prototype.refresh = function() {
    var handle_selection = this.onSelect;
    var self = this;

    ajaxFunction(
        "/api/getdata",

        function(ajax_result) {
            var descriptors = ajax_result.result;
            var rows = [];

            var columns = [
                "name",
                "value",
            ];

            for (var i = 0; i < descriptors.length; ++i) {
                var descriptor = descriptors[i];
                var row = [];

                row.push(descriptor.name);
                row.push(descriptor.value);
                rows.push(row);
            }

            var grid_contents = {
                Head: [columns],
                Body: rows
            };

            var grid_reference = new Grid(
                self.d3element.node(), {
                    srcType: "json", 
                    srcData: grid_contents, 
                    allowGridResize: true, 
                    allowColumnResize: true, 
                    allowClientSideSorting: true, 
                    allowSelections: true, 
                    allowMultipleSelections: false, 
                    showSelectionColumn: false, 
                    fixedCols: 0,
                    onRowSelect: handle_selection,
                }
            );
        },

        function(ajax_exception) {
        },

        "GET",
        null
    );
}

window.SpreadSheet = SpreadSheet;
