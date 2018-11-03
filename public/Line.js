class Line {
  constructor(from,to,letters) {
    this.from = from;
    this.to = to;
    this.letters = letters;
  }

  draw(ctx){
    var fromX = this.from.center.x;
    var fromY = this.from.center.y;
    var toX = this.to.center.x;
    var toY = this.to.center.y;

    function   drawSelfConnection(){
      // var circleX = this.node.x + 1.5 * nodeRadius * Math.cos(this.anchorAngle);
      // var circleY = this.node.y + 1.5 * nodeRadius * Math.sin(this.anchorAngle);
      // var circleRadius = 0.75 * nodeRadius;
      // var startAngle = this.anchorAngle - Math.PI * 0.8;
      // var endAngle = this.anchorAngle + Math.PI * 0.8;
      // var startX = circleX + circleRadius * Math.cos(startAngle);
      // var startY = circleY + circleRadius * Math.sin(startAngle);
      // var endX = circleX + circleRadius * Math.cos(endAngle);
      // var endY = circleY + circleRadius * Math.sin(endAngle);
    }

    function drawArrow(x, y, angle) {
      var dx = Math.cos(angle);
      var dy = Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 8 * dx + 5 * dy, y - 8 * dy - 5 * dx);
      ctx.lineTo(x - 8 * dx - 5 * dy, y - 8 * dy + 5 * dx);
      ctx.fill();
    }

    if (this.to === this.from) drawSelfConnection();
    else {
      ctx.beginPath();
      ctx.moveTo(fromX,fromY);
      var ctpHeight = Math.pow(Math.abs(toX - fromX), 3/4);
      var ctpDirection = fromX < toX ? 1 : -1;
      var ctp = {x: (toX + fromX)/2, y: (toY+fromY)/2+ctpDirection*ctpHeight}
      ctx.quadraticCurveTo(ctp.x,ctp.y,toX,toY);
      ctx.stroke();
    }
  }
}
