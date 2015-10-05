define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');
    var JoyrideView = require('extensions/adapt-joyride/js/adapt-joyrideView');

  function setupJoyride(joyrideModel, joyrideItems) {

    var joyrideCollection = new Backbone.Collection(joyrideItems);
    var joyrideModel = new Backbone.Model(joyrideModel);

    new JoyrideView({ model: joyrideModel, collection: joyrideCollection });
  }

  Adapt.once('app:dataReady', function() {

    var courseJoyride = Adapt.course.get('_joyride');

    if (courseJoyride._isEnabled) {
      setupJoyride(courseJoyride, courseJoyride._joyrideItems);
    } else {
      return console.log('Sorry, no joyride object is set on the course.json file');
    }

  });
});