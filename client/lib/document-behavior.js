/**
 * Created by fegemo on 3/13/15.
 */

Behave = function(docElement, position, dimension, fullWidth, lapTime) {
  var pos = {
        x: fullWidth,
        y: position.y
      };

  this.tween = new TWEEN.Tween(pos)
      .to({ x: -dimension.width }, lapTime)
      .repeat(Infinity)
      .onUpdate(function() {
        docElement.style.transform = 'translate3d(' + pos.x + 'px, ' + pos.y + 'px, 0)';
      });
  this.tween.start(-(position.x/fullWidth) * lapTime);

  var oldResume = this.tween.resume;
  this.tween.resume = function() {
    retrieveCurrentPosition(docElement, pos);
    oldResume.call(this, [])
  }
};


function retrieveCurrentPosition(docElement, pos) {
  var retrieve = /translate3d\((-?\d+\.?\d*)px,\s*(-?\d+\.?\d*)px,\s*0px\)/i.exec(docElement.style.transform);
  if (retrieve && retrieve.length > 2) {
    pos.x = retrieve[1]
    pos.y = retrieve[2];
  }
}

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}

animate();
