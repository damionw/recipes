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
