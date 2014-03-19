// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_self
//= require_tree .
//= require twitter/bootstrap





var changeButtons = {
  hideYesandNo: function () {
    var start = $('#start');
    $('#yes').fadeToggle( "slow", "linear" );
    $('#no').fadeToggle( "slow", "linear" );
    start.prop("disabled",false);
  },
  showStartHideYesNo: function(button) {
    button.no.css("display", "none")
    button.yes.css("display", "none")
    button.starts.fadeToggle( "slow", "linear")
    button.starts.css("display", "inline")
    button.starts.prop("disabled", false)
  }
}
var startClicked = (function (button) {
  counter = 0;
  counter1 = 0;
  var triggerCountdown = function (event, button){
    button.starts.prop("disabled",true)
    var string = $('#countdown').text().replace(':00','')
    var string = Number(string)
    countdown("countdown", 0, 02);
  };
  var countdown = function (element, minutes, seconds) {
    var time = minutes*60 + seconds;
    var countdown = $('#countdown');
    var interval = setInterval(function() {
    var el = document.getElementById(element);
      if(time == -1) {
        var audio = new Audio('/assets/ambiance.wav');
        audio.play();
        countdown.text('Done?')
        $('#start').fadeToggle( "slow", "linear" )
        $('#start').css("display", "none")
        changeButtons.hideYesandNo()

        clearInterval(interval);
        return;
      }
      var minutes = Math.floor( time / 60 );
      if (minutes < 10) minutes = "0" + minutes;
      var seconds = time % 60;
      if (seconds < 10) seconds = "0" + seconds;
      var text = minutes + ':' + seconds;
      el.innerHTML = text;
      time--;
    }, 1000);
  };

  var bindFunctions = function (button) {
    button.starts.on("click", function (event){
      triggerCountdown(event, button);
    });
  };

  var init = function (button) {
    bindFunctions(button);
  };

  return {
    init: init,
    startClicked: startClicked
  };
}) ();

var buttonClicked = (function (button) {
  var id = 0;
  var noButton = function(event, button) {
    button.countdown.text("25:00")
    changeButtons.hideYesandNo();
    changeButtons.showStartHideYesNo(button);
  };
  var yesButton = function(event, button) {
    if ($('#pomodoroCountertext').text() == '0') {
      $('.primary-content').css('display', 'none');
      $('.signup-content').fadeToggle( "slow", "linear")
      $('#login-partial').click(function() {
        $('.signup-content').css('display', 'none');
        $('#login-content').fadeToggle( "slow", "linear")
      })
      $('.submit-button').on("click", function() {
        $('.signup-content').css('display', 'none')
        $('#login-partial').css('display', 'none')
        $('.primary-content').fadeToggle( "slow", "linear" );
      })
    }

    var textbox = $('#textbox')
    var facebook = $('#facebook')
    if (textbox.text().length >= 3 && facebook.text().length > 1 ) {
      var inputstring =  $('#facebook').text() + " ~ " + textbox.text()
      var index = Newsfeed.counterDisplay + 1
      NewsFeed.texts.splice(index,0, inputstring)
    }

     if ($('#textbox').val().length > 1){ //Also add check for if the user is logged in
      var newsfeed =  $('#textbox').val().split()
      NewsFeed.texts.push(newsfeed)
    }

    button.countdown.text("25:00")
    changeButtons.hideYesandNo();
    changeButtons.showStartHideYesNo(button)
    counter1++
    if (counter1 == 3) {
       login_page()
    }
    id +=10
    $('.progressBar').attr("id", "max" + id)
    function progress(percent, element) {
      var progressBarWidth = percent * element.width() / 100;
      buttonClicked.progressBarCheck(progressBarWidth, element)
    };

    $('.progressBar').each(function() {
      var bar = $(this);
      var max = $(this).attr('id');
      max = max.substring(3);
          console.log("max" + max)
      progress(max, bar);
    });

    var correctPomodoros = function () {
    $('#pomodoroCountertext').text(counter1)
    }
    correctPomodoros()
  }

  var progressBarCheck = function (progressBarWidth, element) {
    if (progressBarWidth <= 500) {
      element.find('div').animate({ width: progressBarWidth }, 500);
    }
  }

  var bindFunctions = function (button) {
    button.no.on("click",  function (event) {
      noButton(event, button);
    })
    button.yes.on("click",  function (event) {
      yesButton(event, button);
    })
  };

  var init = function (button) {
    bindFunctions(button);
  };

  return {
    noButton: noButton,
    init: init,
    progressBarCheck: progressBarCheck
  }
}) ();

var NewsFeed = {
  init: function () {
    NewsFeed.displays()
  },
  texts: [["Jenna ~ Read two chapters"], ["Mary ~ Write a Cover Letter"], ["Dave ~ Practice Designing"], ["Alex ~ Outline Blog Post"],["Jamie ~ finish reading the news"]],
  textdisplay: document.getElementById('newsfeed'),
  counterDisplay: 0,
  displays: function () {
    var feed = document.getElementById('newsfeed')
      setInterval(function(){
        $('#newsfeed').css("display", "none")
        feed.innerHTML = NewsFeed.texts[NewsFeed.counterDisplay][0]
        $('#newsfeed').show( 1500, function() {});
        NewsFeed.counterDisplay++
        if (NewsFeed.counterDisplay == NewsFeed.texts.length) {
            NewsFeed.counterDisplay = 0;
          }
        },11000)
      }
    }

var timerSetting = (function (button) {
  var setTimer = function (event, button, length) {
    var countdown = $('#countdown');
    switch (length)
    {
      case 3:
        countdown.text("25:00");
        break;
      case 2:
        countdown.text("10:00");
      break;
      case 1:
        countdown.text("5:00");
      break;
    }

  }

  var bindFunctions = function (button) {
    button.longPomodoro.on("click",  function (event) {
      setTimer(event, button, 3)
    });

    button.medPomodoro.on("click", function (event) {
      setTimer(event, button, 2)
    });

    button.shortPomodoro.on("click", function (event) {
      setTimer(event, button, 1)
    });
  };

  var init = function (button) {
    bindFunctions(button);
  };

  return {
    init: init
  }

  }) ();

$(function (){
  var button = {
    no: $('#no'),
    yes: $('#yes'),
    starts: $('#start'),
    countdown: $('#countdown'),
    longPomodoro: $('.twenty-five'),
    shortPomodoro: $('.five'),
    medPomodoro: $('.ten')
  };
  startClicked.init(button);
  timerSetting.init(button);
  NewsFeed.init(button);
  buttonClicked.init(button);
$('#login-partial').click(function() {
  $('#login-form').css("display", "inline-block")
  })
});

