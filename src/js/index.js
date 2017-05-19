$(function () {

  var socket;
  var username = '';

  $('#name-form').submit(function(){
    username = $('#n').val();
    $('#n').val('');
    connectUser(username);
    $(this).hide();
    $('#add-point').show();
    return false;
  });

  $('#add-point').click(() => {
    socket.emit('point:add', username);
  });

  function connectUser(username) {
    socket = io();

    socket.emit('join', username);
  }

});
