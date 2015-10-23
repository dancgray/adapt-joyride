define(function(require) {
    var jqueryJoyride = require('extensions/adapt-joyride/js/jquery.joyride-2.1');
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
            this.listenTo(Adapt, 'popup:opened', this.toggleJoyrideStatus(false));
            this.listenTo(Adapt, 'notify:closed', this.toggleJoyrideStatus(true)); notify:closed
            // delay joyride starting
            _.delay(_.bind(function() {
                this.render();
            }, this), 1000);
        },
/*
        preRender: function() {

        },

        postRender: function() {
            
        },
*/
        render: function () {
            var collectionData = this.collection.toJSON();
            var modelData = this.model.toJSON();
            var template = Handlebars.templates["joyride"];
            $('.navigation-drawer-toggle-button').after(this.$el.html(template({model: modelData, joyrides:collectionData})));
            this.startJoyride();
            return this;
        },

        startJoyride: function() {
            console.log('startJoyride');
            $('#joyRideTipContent').joyride({
              autoStart : true,
              "cookieMonster": true,
              "cookieName": "JoyRide",
              "cookieDomain": false,
              postStepCallback : function (index, tip) {
              if (index == 2) {
                $(this).joyride('set_li', false, 1);
              }
            },
            modal:true,
            expose: true
            });
        },

        stopJoyride: function() {
            console.log('stopJoyride');
        }

    });

    return JoyrideView;

});