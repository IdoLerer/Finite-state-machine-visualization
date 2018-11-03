class Dfa {
  constructor(alphabet, states, initialState, func, finalStates, canvasHeight, canvasWidth) {
    this.currentState = initialState;
    this.func = func;
    this.finalStates = finalStates;
    this.states = [];
    this.alphabet = alphabet;
    this.lines = [];
    var i = 1;
    var newState;
    states.forEach((state) => {
      newState = new State(state, Math.random() * canvasWidth, Math.random() * canvasHeight);
      this.states.push(newState);
      i++;
    });
    var newLine;
    this.states.forEach((state) =>{
      alphabet.forEach((letter) =>{
        newLine = new Line(state, this.states.find((e) =>{
           return e.name === func[state.name][letter]}), letter);
        this.lines.push(newLine);
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
    this.lines.forEach((line)=>line.draw(ctx));
    this.states.forEach((state)=>state.draw(ctx));
  }
}
