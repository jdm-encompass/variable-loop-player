// Select elements from the DOM
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const audio = document.getElementById('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const audioFileInput = document.getElementById('audio-file');
const delayInput = document.getElementById('delay-input');

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('svg').innerHTML = '<path d="M5.5 3.5v9h1v-9h-1zm4 0v9h1v-9h-1z"/>'; // Pause icon
  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('svg').innerHTML = '<path d="M11.596 8.697l-6.363 3.692V4.005l6.363 3.692z"/>'; // Play icon
  audio.pause();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
audioFileInput.addEventListener('change', function() {
  const files = audioFileInput.files;
  if (files.length > 0) {
    const file = files[0];
    audio.src = URL.createObjectURL(file);
    playSong();
  }
});

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', function() {
  let delay = parseInt(delayInput.value, 10);
  setTimeout(function() {
    playSong();
  }, delay * 1000);
});
