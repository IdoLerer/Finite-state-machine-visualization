$(document).ready(function(){
  var canvas = document.querySelector('canvas');
  canvas.style.width ='100%';
  canvas.style.height='100%';

  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  var ctx = canvas.getContext('2d');
  var dfa = new Dfa(["0","1"], ['S1', 'S2'], 'S1', {S1: {0: 'S2', 1:'S1'}, S2: {0: 'S1', 1:'S2'}}, ['S1'], canvas.height, canvas.width);

  dfa.draw(ctx);
});
