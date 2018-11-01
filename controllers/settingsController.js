var data = {states: ['S1', 'S2'], alphabet: ['0','1']};
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {

  app.get('/', (req, res) => {
    res.render('index', data);
  });

  app.post('/alphabet', urlencodedParser, (req, res) => {
    console.log("hi" + JSON.stringify(req.body));
    data.alphabet = req.body.newAlphabet.split(",");
    res.json(data);
  });

  app.post('/newState', urlencodedParser, (req, res) => {
    console.log("hi" + JSON.stringify(req.body));
    data.states.push(req.body.newState);
    res.json(data);
  });

  app.delete('/states/:item', function(req, res){
    data.states = data.states.filter(function(state){
      return state !== req.params.item;
    });
    res.json(data);
  });
};
