define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');
    var JoyrideView = require('extensions/adapt-joyride/js/adapt-joyrideView');

  function setupJoyride(joyrideModel, joyrideItems) {

    var joyrideCollection = new Backbone.Collection(joyrideItems);

    // check if we can run joyride
    if (checkReplayStatus(joyrideModel)) {
      new JoyrideView({ model: joyrideModel, collection: joyrideCollection });
    }
  }

  // don't pay if: page/menu _isVisited and _playOnRevisit === false : or 
  function checkReplayStatus(model) {
    var joyrideModel = model.get('_joyride')
    if (joyrideModel._isVisited && !joyrideModel._playOnRevisit) {
      return false;
    } else {
      return true;
    }

  }

  Adapt.on('pageView:postRender', function(pageView) {

    //var courseJoyride = Adapt.course.get('_joyride');
    var pageModel = pageView.model;
    console.log(pageModel);
    var courseJoyride = pageView.model.get('_joyride');
/*
    var joyrideDefaults = {
      "_isVisited": false
    }
    //courseJoyride.set('_isVisited', false);
*/
    if (courseJoyride && courseJoyride._isEnabled) {
      setupJoyride(pageModel, courseJoyride._joyrideItems);
    } else {
      // remove this after testing
      return console.log('Sorry, no joyride object is set on the course.json file');
    }

  });
});