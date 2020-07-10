describe('balloonDancer', function() {

  var balloon, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    balloonDancer = new BalloonDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(balloonDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should have a step function that call mouseover function', function() {
    sinon.spy(balloonDancer.$node, 'mouseover');
    balloonDancer.step();
    expect(balloonDancer.$node.mouseover.called).to.be.true;
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(balloonDancer, 'step');
      expect(balloonDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(balloonDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(balloonDancer.step.callCount).to.be.equal(2);
    });
  });
});
