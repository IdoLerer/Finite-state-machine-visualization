const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {

  var data = {alphabet: ['0','1'],
              states: ['S1', 'S2'],
              initialState: 'S1',
              func: {S1: {0: 'S2', 1:'S2'}, S2: {0: 'S1', 1:'S2'}},
              finalStates: ['S1']};

  app.get('/', (req, res) => {
    res.render('index', {data});
  });

  app.post('/alphabet', urlencodedParser, (req, res) => {
    data.alphabet = req.body.newAlphabet.split(",");
    updateFunc();
    res.json(data);
  });

  app.post('/newState', urlencodedParser, (req, res) => {
    var newState = req.body.newState;
    data.func[newState] = {};
    data.states.push(newState);
    for (var i = 0; i < data.alphabet.length; i++) {
      data.func[newState][data.alphabet[i]] = newState;
    }
    res.json(data);
  });

  app.post('/updateStates', urlencodedParser, (req, res) => {
    data.func = JSON.parse(req.body.func);
    res.json(data);
  });

  app.delete('/states/:item', function(req, res){
    data.states = data.states.filter(function(state){
      return state !== req.params.item;
    });
    updateFunc();
    res.json(data);
  });

  function updateFunc(){
    data.func = {};
    for (var i = 0; i < data.states.length; i++) {
      var state = data.states[i];
      data.func[state] = {};
      for (var j = 0; j < data.alphabet.length; j++) {
        data.func[state][data.alphabet[j]] = state;
      }
    }
  }
  return data;
};
