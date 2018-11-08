$(document).ready(function(){
var canvas = document.querySelector('canvas');
canvas.style.width ='100%';
canvas.style.height='100%';
canvas.style.border = "1px solid black";
canvas.width  = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

var ctx = canvas.getContext('2d');
var dfa = new Dfa(data.alphabet, data.states, data.initialStates, data.func, data.finalStates, canvas.height, canvas.width);

var offset = {};
var draggedState;
dfa.draw(ctx);

canvas.addEventListener("mousedown", function(event) {
  var mousePosition = getMousePos(canvas, event);
  for(var i = 0; i < dfa.states.length; i += 1) {
    var state = dfa.states[i];
    if(state.isColliding(mousePosition.x, mousePosition.y)) {
      state.isDragged = true;
      document.body.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener("mouseup", onMouseUp);
      draggedState = state;
      offset.x = mousePosition.x - state.center.x;
      offset.y = mousePosition.y - state.center.y;
      dfa.draw(ctx);
    }
  }
});

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function onMouseMove(event) {
  var mousePosition = getMousePos(canvas, event);
  var x = mousePosition.x - offset.x;
  var y = mousePosition.y - offset.y;
  if (x < canvas.width - 30 && x > 30 && y < canvas.height - 30 && y > 30){
  draggedState.center.x = x;
  draggedState.center.y = y;
  dfa.draw(ctx);
}
}

function onMouseUp(event) {
  document.body.removeEventListener("mousemove", onMouseMove);
  document.body.removeEventListener("mouseup", onMouseUp);
  draggedState.isDragged = false;
  dfa.draw(ctx);
}

});
