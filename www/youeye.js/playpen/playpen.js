function main_menu_handler(topic, payload) {
    this.setAttribute(
        "show", (
            topic == "menu_hide" || (
                topic == "menu_toggle" && this.getAttribute("show") == "true"
            ) ?
            "false" :
            "true"
        )
    );
}

function tabular_event(topic, payload) {
    switch(topic) {
        case "reload_data":
            get_process_info(this);
            break;
    }
}

function dialog_event_handler(topic, payload) {
    var visible = (this.style.display != "none");
    const off = "none";
    const on = "inline";

    switch(topic) {
        case "suppress_dialog_visibility":
            this.style.display = off;

            pubsubMessageRouter.singleton.emit(
                "save_process_info",
                null
            );

            break;

        case "express_dialog_visibility":
            this.style.display = on;
            break;

        case "toggle_dialog_visibility":
            this.style.display = (visible ? off : on);
            break;
    }
}

function process_form_handler(topic, payload) {
    switch(topic) {
        case "save_process_info":
            console.log(this.value); // FIXME: Update the table row data
            break;

        case "table_row_selected":
            var output_html = "<tr><td>Name</td><td>Value</td></tr>";

            const column_labels = Object.keys(payload);

            for (const [key, value] of Object.entries(payload)) {
                const value_spec = '<td><textarea form-name="' + key + '" form-attribute="value">' + value + '</textarea></td>';
                const key_spec = "<td>" + key + "</td>";
                output_html += "<tr>" + key_spec + value_spec + "</tr>";
            }

            this.innerHTML = "<table>" + output_html + "</table>";

            pubsubMessageRouter.singleton.emit(
                "express_dialog_visibility",
                null
            );

            break;
    }
}

async function get_process_info(target_element) {
    const url = "/cgi-bin/api/processes";

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();

    load_table_data(target_element, data);
}

function load_table_data(target_element, data) {
    const process_info = data.processes;

    if (process_info == null || 0 == process_info.length) {
        return;
    }

    const column_labels = Object.keys(process_info[0]);

    const column_definitions = column_labels.map(
        function(_key) {
            return {
                title: _key,
                field: _key,
                sorter:"alphanum",
                hozAlign: "left"
            };
        }
    );

    var tabulator = target_element._tabulator = new Tabulator(
        target_element, {
            initialSort:[
                {column:"pid", dir:"asc"},
            ],

            data: [], //assign data to table
            layout: "fitDataStretch", //"fitDataStretch"
            //                 responsiveLayout: "collapse",
            selectable: 1, //make 1 row selectable at a time
            columns: column_definitions
        }
    );

    tabulator.on(
        "rowSelected", // "rowSelectionChanged",

        function(row_object){
            pubsubMessageRouter.singleton.emit(
                "table_row_selected",
                row_object.getData()
            );
        }
    );

    tabulator.on(
        "tableBuilt",

        function(){
            tabulator.replaceData(process_info);
        }
    );
}