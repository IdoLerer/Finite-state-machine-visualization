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
    var letters = this.letters;

    function drawArrow(x, y, angle) {
      var dx = Math.cos(angle);
      var dy = Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 8 * dx + 5 * dy, y - 8 * dy - 5 * dx);
      ctx.lineTo(x - 8 * dx - 5 * dy, y - 8 * dy + 5 * dx);
      ctx.fill();
    }

    function drawText(x,y){
      ctx.textAlign = "center";
      ctx.textBaseline="middle";
      ctx.fillStyle = 'black';
      ctx.font = "15px Arial"
      var s = "";
      for (var i = 0; i < letters.length; i++) {
        s += (i == 0 ? "" : ",") + letters[i];
      }
      ctx.fillText(s,x,y);
    };

    function   drawSelfConnection(){
      var circleX = fromX;
      var circleY = fromY - 38;
      var circleRadius = 22.5;
      var startAngle = Math.PI * 0.8;
      var endAngle = Math.PI * 0.2;
      var startX = circleX + circleRadius * Math.cos(startAngle);
      var startY = circleY + circleRadius * Math.sin(startAngle);
      var endX = circleX + circleRadius * Math.cos(endAngle);
      var endY = circleY + circleRadius * Math.sin(endAngle);
      ctx.beginPath();
      ctx.arc(circleX, circleY, circleRadius, startAngle, endAngle, false);
      ctx.stroke();

      drawText(circleX, circleY - circleRadius - 10);
      //      var textX = stuff.circleX + stuff.circleRadius * Math.cos(this.anchorAngle);
      // var textY = stuff.circleY + stuff.circleRadius * Math.sin(this.anchorAngle);
      // drawText(c, this.text, textX, textY, this.anchorAngle, selectedObject == this);

      drawArrow(endX, endY, endAngle + Math.PI * 0.4);
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

      var closestPointOnEdge = this.to.closestPointOnEdge(ctp.x,ctp.y);
      drawArrow(closestPointOnEdge.x, closestPointOnEdge.y, Math.atan2(toY - fromY, toX - fromX));

      var offset = Math.pow(Math.abs(toX - fromX), 1/2) < 45 ? Math.pow(Math.abs(toX - fromX), 1/2) : 45;
      drawText(ctp.x, ctp.y - ctpDirection*(offset));
    }
  }
}
