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

function tabbed_panel_handler(topic, payload) {
    [].slice.call(this.parentElement.children).forEach(
        function(element) {
            if (element.hide) {
                element.hide();
            }
        }
    );

    this.show();
}

function tabbed_button_handler(topic, payload) {
    const normal_color = this.getConfigAttribute("normal_background", "application_background");

    const highlight_color = this.alterRGB(
        window.getComputedStyle(this.parentElement).backgroundColor,
        parseInt(this.getAttribute("highlight"))
    );

    [].slice.call(this.parentElement.children).forEach(
        function(element) {
            if (element.getAttribute("normal_background")) {
                element.setAttribute("normal_background", normal_color);
            }
        }
    );

    if (this.getAttribute("normal_background")) {
        this.setAttribute("normal_background", highlight_color);
    }
}
