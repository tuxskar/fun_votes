/* Project specific Javascript goes here. */
$(function () {
  var webSocketServerLocation = "ws://" + window.location.host + "/info/",
    $votesList = $('#votes-counter');

  function start(webSocketServerLocation) {
    var socket = new WebSocket(webSocketServerLocation);
    socket.onmessage = function (e) {
      var cleanedData = JSON.parse(e.data);
      appendOrUpdateValue(cleanedData)
    };
    socket.onclose = function () {
      //try to reconnect in 5 seconds
      setTimeout(function () {
        start(webSocketServerLocation)
      }, 5000);
    };
    initializeApp(socket)
  }

  var valueKeys = [], chartData = [], chart = c3.generate({
    bindto: '#chart',
    data: {
      rows: []
    }
  });

  function appendOrUpdateValue(values) {
    // Checks for the missed keys in values and add the new objects identified by key using
    // the value of values[key]
    if (valueKeys.length == 0) {
      for (var key in values)
        valueKeys.push(key)
      valueKeys.sort();
      chartData.push(valueKeys);
    }
    var newValuesList = [];
    valueKeys.forEach(function (key) {
      newValuesList.push(values[key])
    });
    chartData.push(newValuesList);

    if (chartData.length > 10 + 1 + 1) { // max values plus key values plus the extra
      chartData = chartData.slice(2);
      chartData.unshift(valueKeys);
    }
    chart.load({
      rows: chartData
    });

    var $li;
    for (var key in values) {
      if (values.hasOwnProperty(key)) {
        $li = $votesList.find('.' + key);
        if ($li.length == 0) {
          $li = $('<li/>').addClass(key);
          $votesList.append($li);
        }
        $li.text(key + ': ' + values[key])
      }
    }
  }

  function initializeApp(socket) {
    // Initialize app getting the first values of the Votes via ajax request
    $.get('/votes-info').done(function (data) {
      appendOrUpdateValue(data);

      setInterval(function () {
        socket.send("Give me updates");
      }, 1000);
    });
  }

  start(webSocketServerLocation);

});