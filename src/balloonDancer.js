var BalloonDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  // select individual dancer class and give it an imagevr
  this.$node.addClass('balloon');
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
};

BalloonDancer.prototype = Object.create(Dancer.prototype);
BalloonDancer.prototype.constructor = BalloonDancer;

BalloonDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);
  this.$node.mouseover(function() {
    $( this ).css('content', 'url(src/Image/Burst.gif)');
  });
  this.$node.mouseleave(function() {
    $( this ).css('content', 'url(src/Image/Sleep.gif)');
  });
};