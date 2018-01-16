let timer, pauseTime, audioPlay;
let audio = document.getElementById("myAudio");
let pauseTrue = false;
let restTime = false;
let workOrRest = ".workTime";

function sec2Time(secs) {
  let hours = Math.floor(secs / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);
  minutes =
    String(minutes).length < 2 ? "0" + String(minutes) : String(minutes);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);
  seconds =
    String(seconds).length < 2 ? "0" + String(seconds) : String(seconds);

  return String(minutes) + " : " + seconds;
}

function timerFn(sec) {
  timer = setInterval(function() {
    sec--;
    pauseTime = sec;
    $(".timerTimeShow").text(sec2Time(sec));
    if (sec === 0) {
      clearInterval(timer);
      if (restTime) {
        workOrRest = ".restTime";
        restTime = false;
        $(".timesReady").show();
        playAudio();
      } else {
        workOrRest = ".workTime";
        restTime = true;
        $(".timesUp").show();
        playAudio();
      }
      $(".timerTimeShow").text(sec2Time(parseInt($(workOrRest).val()) * 60));
    }
  }, 1000);
}

function playAudio(){
  audio.volume = 0.1;
  audioPlay = setInterval(function(){
    console.log(audio.volume);
    audio.play(); 
    if (audio.volume < 1) {
      audio.volume = audio.volume + 0.1; 
    }
  }, 2000);
}

function play(){
  audio.volume = 0.8;
  audio.play();
}

$(document).ready(function() {
  $(".timerPause").hide();
  $(".timerReset").hide();
  $(".timesUp").hide();
  $(".timesReady").hide();
});

$(".workTime").change(function() {
  $(".timerTimeShow").text(sec2Time(parseInt($(".workTime").val()) * 60));
});

$(".startButton").click(function() {
  $(".startButton").hide();
  $(".timerTimeSet").hide();
  $(".timerPause").show();
  $(".timerReset").show();
  let sec = parseInt($(".workTime").val()) * 60;
  pauseTime = sec;
  timerFn(sec);
});

$(".timerPause").click(function() {
  if (pauseTrue) {
    let sec = pauseTime;
    pauseTrue = false;
    $(".pauseButton").text("PAUSE");
    timerFn(sec);
  } else {
    clearInterval(timer);
    pauseTrue = true;
    $(".pauseButton").text("RESUME");
  }
});

$(".timerReset").click(function() {
  clearInterval(timer);
  $(".timerTimeShow").text(sec2Time(parseInt($(".workTime").val()) * 60));
  $(".startButton").show();
  $(".timerTimeSet").show();
  $(".timerPause").hide();
  $(".timerReset").hide();
});

$(".startRestTime").click(function() {
  clearInterval(audioPlay);
  $(".timesUp").hide();
  let sec = parseInt($(".restTime").val()) * 60;
  pauseTime = sec;
  timerFn(sec);
});

$(".startWorkTime").click(function() {
  clearInterval(audioPlay);
  $(".timesReady").hide();
  let sec = parseInt($(".workTime").val()) * 60;
  pauseTime = sec;
  timerFn(sec);
});