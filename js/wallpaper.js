var videoContainers = document.getElementsByClassName('video');
var videoElements = document.getElementsByTagName('video');
var current = 0;


var updateInterval = 20;
var showInfo = false;

function loadVideo(which, callback) {
  $.ajax({
    url: "https://loop.moeoverflow.org/api/rand"
  }).done(function (data) {
    videoContainers[which].getElementsByClassName('episode')[0].innerHTML = `《${data.episode}》`;
    videoContainers[which].getElementsByClassName('period')[0].innerHTML = data.period.begin + ' ~ ' + data.period.end;

    let sources = videoElements[which].getElementsByTagName('source');
    sources[0].src = data.files.mp4_1080p;
    sources[1].src = data.files.webm_1080p;
    videoElements[which].load();
    if (callback) {
      callback();
    }
  });
}

function displayVideo() {
  $(videoContainers[current]).removeClass('hide');
  $(videoContainers[current ^ 1]).addClass('hide');

  if (showInfo) {
    $(videoContainers[current].getElementsByClassName('info')).removeClass('hide');
  } else {
    $(videoContainers[current].getElementsByClassName('info')).addClass('hide');
  }
}


function loopRun(interval) {
  setTimeout(() => {
    current ^= 1;
    displayVideo();

    setTimeout(() => {
      loadVideo(current ^ 1)
    }, 2000);

    loopRun(updateInterval);
  }, interval * 1000);
}

loadVideo(current, () => {
  displayVideo();
  loadVideo(current ^ 1);
  loopRun();
});


window.wallpaperPropertyListener = {
  applyUserProperties: (properties) => {
    if (properties.updateinterval) {
      updateInterval = properties.updateInterval;
    }
    if (properties.showinfo) {
      showInfo = properties.showinfo;
    }
  }
};