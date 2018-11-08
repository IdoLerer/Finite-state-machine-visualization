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
    var initialStates = [];
    //update function
    $('.stateCard').find('select').each((index, s) =>{
      var selected = {fromState: s.getAttribute("data-fromState"),
      letter: s.getAttribute("data-letter"),
      toState: s.options[s.selectedIndex].value};
      if (func[selected.fromState] == null) func[selected.fromState] = {};
      func[selected.fromState][selected.letter] = selected.toState;
    });

    //update final states
    $('.btn-final').each((index,s) => {
      if (s.classList.contains("active")) finalStates.push(s.getAttribute("data-state"));
    });
    //update initial states
    $('.btn-inital').each((index,s) => {
      if (s.classList.contains("active")) initialStates.push(s.getAttribute("data-state"));
    });
    $.ajax({
      type: 'POST',
      url: '/updateStates',
      data: {func: JSON.stringify(func), initialStates: JSON.stringify(initialStates), finalStates: JSON.stringify(finalStates)},
      success: function(data){
        location.reload();
      }
    });
    return false;
  };
});
