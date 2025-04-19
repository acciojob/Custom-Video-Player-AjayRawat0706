const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// 1. Toggle play/pause
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

// 2. Update play/pause button icon
function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// 3. Skip video
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// 4. Handle volume and playback rate change
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// 5. Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// 6. Scrub on progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// 7. Handle video error
video.addEventListener('error', () => {
  alert('⚠️ Failed to load video. Please check if "download.mp4" exists.');
});

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
  range.addEventListener('mousemove', handleRangeUpdate);
});

// Progress bar scrubbing
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);