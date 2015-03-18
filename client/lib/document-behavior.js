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
        docElement.style.transform = 'translate3d(' + pos.x + 'px, ' + pos.y + 'px, 0)'; //'translateX(' + pos.x + 'px' + ')';
      });
  this.tween.start(-(position.x/fullWidth) * lapTime);
};


function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}

animate();
