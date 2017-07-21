var Supervisor = {
    refresh: function() {
        var supervisor_reference = this;

        ajaxFunction(
            "/api/status",

            function(ajax_result){
                supervisor_reference.formatData(ajax_result);
                supervisor_reference.onDataReceived();
            },

            function(ajax_exception){
            }
        );
    },

    formatData: function(data) {
        this.tasks = new Object();

        for (var index = 0; index < data.tasks.length; ++index) {
            this.tasks[data.tasks[index].name] = data.tasks[index];
        }

        this.dependencies = data.dependencies;
        this.name = data.name;
        this.pid = data.supervisor;
        this.folder = data.suite;
    },

    onDataReceived: function() {
        console.log("RECEIVED: " + Object.keys(this.tasks).join(", "));
        this.updateTasks();
    },

    refreshTasks() {
    }
};