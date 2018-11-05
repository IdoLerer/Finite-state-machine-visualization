class State {
  constructor(name,x,y) {
    this.name = name;
    this.center = {x:x,y:y}
    this.radius = 30;
    this.isInitial = false;
    this.isFinal = false;
    this.link = {to:[],from:[]};
    this.color = {r:0,g:0,b:0};
    this.fill = {r:255,g:255,b:255};
    this.isDragged = false;
  }
  isColliding(x,y){
    return Math.sqrt(Math.pow((x - this.center.x),2) + Math.pow((y - this.center.y),2)) < this.radius;
  }
  addLinkTo(link) {
    this.link.to.push(link);
  }
  addLinkFrom(link) {
    this.link.from.push(link);
  }

  hasLinkFrom(state) {
    let link  = this.link.from;

    let has = link.find(item => {
      return item.state == state;
    });

    if(has)
    return has;
    else
    return false;
  }

  hasLinkTo(state) {
    let link  = this.link.to;

    let has = link.find(item => {
      return item.state == state;
    });

    if(has)
    return has;
    else
    return false;
  }

  drawCircle(ctx){
    if(this.isDragged) {
      ctx.shadowColor = "grey";
      ctx.shadowOffsetX = 4;
      ctx.shadowOffsetY = 4;
      ctx.shadowBlur = 12;
    }
    ctx.beginPath();
    ctx.arc(this.center.x,this.center.y,this.radius,0,2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.shadowColor = null;
    ctx.shadowOffsetX = null;
    ctx.shadowOffsetY = null;
    ctx.shadowBlur = null;
    // ctx.lineWidth = 2;
    ctx.stroke();

  }

  drawFinal(ctx){
    ctx.beginPath();
    ctx.arc(this.center.x,this.center.y,this.radius - 5,0,2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.lineWidth = 1;
    if(!this.isInitial) ctx.stroke();
  }

  drawInitial(ctx){
    ctx.moveTo(this.center.x-this.radius*2.5,this.center.y);
    ctx.lineTo(this.center.x-this.radius,this.center.y);
    ctx.stroke();
    this.drawArrow(this.center.x-this.radius,this.center.y,0,ctx);
  }

  writeText(ctx){
    ctx.textAlign = "center";
    ctx.textBaseline="middle";
    ctx.fillStyle = 'black';
    ctx.fillText(this.name,this.center.x,this.center.y);
  }

  drawArrow(x, y, angle, ctx) {
    var dx = Math.cos(angle);
    var dy = Math.sin(angle);
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 8 * dx + 5 * dy, y - 8 * dy - 5 * dx);
    ctx.lineTo(x - 8 * dx - 5 * dy, y - 8 * dy + 5 * dx);
    ctx.fill();
  }

  closestPointOnEdge(x, y) {
    var dx = x - this.center.x;
    var dy = y - this.center.y;
    var scale = Math.sqrt(dx * dx + dy * dy);
    return {
      x: this.center.x + dx * 30 / scale,
      y: this.center.y + dy * 30 / scale,
    };
  }

  draw(ctx) {
    this.drawCircle(ctx);
    if(this.isFinal) this.drawFinal(ctx);
    if(this.isInitial) this.drawInitial(ctx);
    this.writeText(ctx);
  }

  setPos(x,y) {
    this.center.x = x + this.dragedPoint.x;
    this.center.y = y + this.dragedPoint.y;
  }

  setFinal(isFinal) {
    this.isFinal = isFinal;
  }
  setInitial(isInitial) {
    this.isInitial = isInitial;
  }

}
