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

document.addEventListener(
    'DOMContentLoaded',

    function() {
        settings.components = [
            Vue.component("my-folder", my_folder),
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
