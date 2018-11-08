class Dfa {
  constructor(alphabet, states, initialStates, func, finalStates, canvasHeight, canvasWidth) {
    this.currentStates = initialStates;
    this.func = func;
    this.finalStates = finalStates;
    this.states = [];
    this.alphabet = alphabet;
    this.lines = [];
    var i = 1;
    var newState;
    states.forEach((state) => {
      newState = new State(state,70 + Math.random() * (canvasWidth-70), 70 +  Math.random() * (canvasHeight - 70));
      if (finalStates.includes(state)) newState.setFinal(true);
      if (initialStates.includes(state)) newState.setInitial(true);
      this.states.push(newState);
      i++;
    });
    var newLine;
    var toState;
    var isAlreadyConnected;
    this.states.forEach((state) =>{
      alphabet.forEach((letter) =>{
        toState = this.states.find((e) => {return e.name === func[state.name][letter]});
        isAlreadyConnected = state.link.to.find((s) => {return s.name === toState.name});
        if (isAlreadyConnected == null){
          newLine = new Line(state, toState, [letter]);
          this.lines.push(newLine);
          state.link.to.push({name: toState.name, line: newLine});
        } else {
          isAlreadyConnected.line.letters.push(letter);
        }
      });
    });
  }

  advanceStep(symbol) {
    // console.log(this.func, this.currentState, );
    this.currentState = this.func[this.currentState][symbol];
  }
  checkAcceptance(){
    return this.finalStates.includes(this.currentState);
  }

  draw(ctx){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.lines.forEach((line)=>line.draw(ctx));
    this.states.forEach((state)=>state.draw(ctx));
  }
}
