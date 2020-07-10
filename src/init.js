$(document).ready(function() {
  window.dancers = [];

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');
    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position
    var dancer = new dancerMakerFunction(
      $('body').height() * Math.random(),
      $('body').width() * Math.random(),
      Math.random() * 1000 + 4000
    );
    $('body').append(dancer.$node);
    // holds values of all created dancers
    window.dancers.push(dancer);
  });

  // we should create a line up button
  $('.lineUpButton').on('click', function(event) {
    // iterate over the created dancers
    var container = window.dancers;
    for (var i = 0; i < container.length; i++) {
      // function to line up the individual icons
      container[i].lineUp();

    }
  });

  // create a pair button where these pair enacts an animation.
  $('.pairButton').on('click', function(event) {
    // Find the random Index number of window.dancer array;
    var randomIndexNum = Math.floor(Math.random() * window.dancers.length);
    // randomly selects a dancer of window.dancer array as the lead
    var lead = window.dancers[randomIndexNum];
    // find the top distance of Lead
    var leadTop = lead.top;
    // find the left distance of Lead
    var leadLeft = lead.left;
    // declare a variable call smallest
    var smallest;
    // declare a variable call closestDancer
    var closestDancer = null;
    // iterate over window.dancers
    for (var i = 0; i < window.dancers.length; i++) {
      // if the current element is not the lead dancer
      if (lead !== window.dancers[i]) {
        // find the top distance of Current Dnacer
        var currentDancerTop = window.dancers[i].top;
        // find the left distance of Current Dnacer
        var currentDancerLeft = window.dancers[i].left;
        // find the top distance between Lead and Current Dancer
        var topDifference = Math.abs(leadTop - currentDancerTop);
        // find the left distance between Lead and Current Dancer
        var leftDifference = Math.abs(leadLeft - currentDancerLeft);
        // find the hypotenuse between Lead and Current Dancer
        var hypotenuse = Math.sqrt(topDifference * topDifference + leftDifference * leftDifference);
        // if the hypotenuse is less than smallest or closestDancer is undefined yet
        if (hypotenuse < smallest || closestDancer === null) {
          // then hypotenuse will be assign to the variables smallest
          smallest = hypotenuse;
          // and also the Current dancer will be assign to the variable closestDancer
          closestDancer = window.dancers[i];
        }
      }
    }
    // increase size of closestDancer and lead
    closestDancer.$node.animate({'width': '250px', 'height': '250px'}, 1500 );
    lead.$node.animate({'width': '250px', 'height': '250px'}, 1500 );
  });
});


