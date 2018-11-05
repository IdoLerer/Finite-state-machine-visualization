$(document).ready(function(){

  $('#alphabetForm').on('submit', function(){
    var res = {newAlphabet: $('#alphabetForm input').val()};

    $.ajax({
      type: 'POST',
      url: '/alphabet',
      data: res,
      success: function(data){
        location.reload();
      }
    });

    return false;

  });

  $('#stateForm').on('submit', function(){

    var res = {newState: $('#stateForm input').val()};

    $.ajax({
      type: 'POST',
      url: '/newState',
      data: res,
      success: function(data){
        location.reload();
      }
    });

    return false;

  });

  $('.delete-btn').on('click', function(){
    var item = $(this).attr("data-state");
    $.ajax({
      type: 'DELETE',
      url: '/states/' + item,
      success: function(data){
        location.reload();
      }
    });
  });

  $('#update-function-btn').on( "click", updateFunc);

  function updateFunc(){
    var func = {};
    var finalStates = [];
    var states = $('.stateCard').find('select').each((index, s) =>{
      // if
      var selected = {fromState: s.getAttribute("data-fromState"),
      letter: s.getAttribute("data-letter"),
      toState: s.options[s.selectedIndex].value};
      if (func[selected.fromState] == null) func[selected.fromState] = {};
      func[selected.fromState][selected.letter] = selected.toState;
    });
    $.ajax({
      type: 'POST',
      url: '/updateStates',
      data: {func: JSON.stringify(func)},
      success: function(data){
        location.reload();
      }
    });
    return false;
  };
});
