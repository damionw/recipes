var settings = {
    el: '#app',
    
    data: {
        drawer: false,

        application: {
            description: "Basic Demo",
        },
    },
};

var my_folder = {
    template: "#my-folder",

    props: [
    ],

    data(){
        return {
        }
    },

    methods: {
        handle_folder_event: function() {
        }
    },

    watch: {
    }
};

var my_form = {
    template: "#my-form",

    props: [
    ],

    data(){
        return {
            name: null,
            age: null,
        }
    },

    methods: {
    },

    watch: {
    }
};

document.addEventListener(
    'DOMContentLoaded',

    function() {
        settings.components = [
            Vue.component("my-folder", my_folder),
            Vue.component("my-form", my_form),
        ];

        Vue.use(
            Vuetify, {
                iconfont: 'mdi',
            }
        );

        new Vue(
            settings,
        );
    }
);
