define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');
    var JoyrideView = Backbone.View.extend({

        tagName: 'div',

        className: "joyrideView",

        initialize: function () {
            // Listen to Adapt 'remove' event which is called
            // when navigating through the router
            // This cleans up zombie views and prevents memory leaks
            this.listenTo(Adapt, 'remove', this.remove);
            // On initialize start the render process
            //this.preRender();
            this.render();
        },

        events: {},

        preRender: function() {

        },

        render: function () {
console.log('render joyride');
            var collectionData = this.collection.toJSON();
            var modelData = this.model.toJSON();
            var template = Handlebars.templates["joyride"];

            $('.navigation-drawer-toggle-button').after(this.$el.html(template(collectionData)));
            debugger
            return this;
        },

        postRender: function() {}

    });

    return JoyrideView;

});