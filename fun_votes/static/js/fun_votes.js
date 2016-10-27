/* Project specific Javascript goes here. */
$(function () {
  var socket = new WebSocket("ws://" + window.location.host + "/info/"),
    $votesList = $('#votes-counter');

  socket.onmessage = function (e) {
    var cleanedData = JSON.parse(e.data), $li;
    for (var key in cleanedData) {
      if (cleanedData.hasOwnProperty(key)) {
        $li = $votesList.find('.' + key);
        if ($li.length == 0) {
          $li = $('<li/>').addClass(key);
          $votesList.append($li);
        }
        $li.text(key + ': ' + cleanedData[key])
      }
    }
  };
  $.get('/votes-info').done(function (data) {
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        $votesList.append($('<li/>').addClass(key).text(key + ': ' + data[key]));
      }
    }

    setInterval(function () {
      socket.send("Give me updates");
    }, 1000);
  });

});