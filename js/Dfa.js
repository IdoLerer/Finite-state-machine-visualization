class Dfa {
  constructor(initialState, func, finalStates) {
    this.currentState = initialState;
    this.func = func;
    this.finalStates = finalStates;
  }
  advanceStep(symbol) {
    // console.log(this.func, this.currentState, );
    this.currentState = this.func[this.currentState][symbol];
  }
  checkAcceptance(){
    return this.finalStates.includes(this.currentState);
  }
}

var dfa = new Dfa('S1', {S1: {0: 'S2', 1:'S1'}, S2: {0: 'S1', 1:'S2'}}, ['S1']);
console.log(dfa.currentState);
console.log(dfa.checkAcceptance());
dfa.advanceStep('0');
console.log(dfa.currentState);
console.log(dfa.checkAcceptance());
