$(document).ready(function(){

  $('#alphabetForm').on('submit', function(){
    var res = {newAlphabet: $('#alphabetForm input').val()};

      $.ajax({
        type: 'POST',
        url: '/alphabet',
        data: res,
        success: function(data){
          //do something with the data via front-end framework
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
          //do something with the data via front-end framework
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
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
