var videoContainers = document.getElementsByClassName('video');
var videoElements = document.getElementsByTagName('video');
var current = 0;


var updateInterval = 15;

function loadVideo(which, callback) {
  $.ajax({
    url: "https://loop.moeoverflow.org/api/rand"
  }).done(function (data) {
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
}

loadVideo(current, () => {
  displayVideo();
  loadVideo(current ^ 1);
});

setInterval(() => {
  current ^= 1;
  displayVideo();

  setTimeout(() => {
    loadVideo(current ^ 1)
  }, 2000);
}, updateInterval * 1000);