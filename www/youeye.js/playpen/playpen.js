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
        case "initialize_table":
            const column_definitions = [
                {title:"Name", field: "name"},
                {title:"Phone", field: "phone", hozAlign:"left"}
            ];

            var tabulator = this._tabulator = new Tabulator(
                this, {
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

//  DEBUG

            // Must delay until the table is "ready" to accept data
            setTimeout(
                () => {
                    pubsubMessageRouter.singleton.emit(
                        "load_table", [
                            {
                                "name": "Me",
                                "phone": "123-4567"
                            },
                            {
                                "name": "Them",
                                "phone": "234-7777"
                            },
                            {
                                "name": "You",
                                "phone": "999-9999"
                            }
                        ]
                    );
                },

                500
            );
//  DEBUG

            break;

        case "load_table":
            var tabulator = this._tabulator;

            if (tabulator != null) {
                tabulator.replaceData(payload);
            }

            break;
    }
}

// async function get_process_info() {
//     const url = "/cgi-bin/api/processes"
// ;
//     try {
//         const response = await fetch(url);
//
//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//         }
//
//         const json = await response.json();
//         console.log(json);
//     } catch (error) {
//         console.error(error.message);
//     }
}
