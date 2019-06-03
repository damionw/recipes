var settings = {
    el: '#app',
};

document.addEventListener(
    'DOMContentLoaded',

    function() {
        new Vue(
            settings,
        );
        
        Vue.use(Vuetify);
    },

    false
);