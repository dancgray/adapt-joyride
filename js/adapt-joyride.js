define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');
    var JoyrideView = require('extensions/adapt-joyride/js/adapt-joyrideView');

  function setupJoyride(joyrideModel, joyrideItems) {

    var joyrideCollection = new Backbone.Collection(joyrideItems);

    new JoyrideView({ model: joyrideModel, collection: joyrideCollection });
  }

  Adapt.on('router:page', function(pageModel) {

    //var courseJoyride = Adapt.course.get('_joyride');
    var courseJoyride = pageModel.get('_joyride');

    if (courseJoyride && courseJoyride._isEnabled) {
      setupJoyride(pageModel, courseJoyride._joyrideItems);
    } else {
      return console.log('Sorry, no joyride object is set on the course.json file');
    }

  });
});