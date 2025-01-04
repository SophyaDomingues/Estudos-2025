const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

const songs = ['xxx', 'yyy', 'zzz'];
let songIndex = 0;

function loadSong(song) {
    title.innerText = song;
    audio.src = `musics/${song}.mp3`;
    cover.src = `images/${song}.jpeg`;
    audio.load();
}

function togglePlayPause() {
    const isPlaying = musicContainer.classList.contains('play');
    musicContainer.classList.toggle('play');
    playBtn.querySelector('i.fas').classList.toggle('fa-play');
    playBtn.querySelector('i.fas').classList.toggle('fa-pause');
    isPlaying ? audio.pause() : audio.play();
}

function changeSong(next = true) {
    songIndex = next ? (songIndex + 1) % songs.length : (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
}

function updateProgress({ srcElement: { duration, currentTime } }) {
    progress.style.width = `${(currentTime / duration) * 100}%`;
    updateTimeDisplay(currentTime, duration);
}

function setProgress(e) {
    audio.currentTime = (e.offsetX / this.clientWidth) * audio.duration;
}

function updateTimeDisplay(currentTime, duration) {
    const formatTime = time => `${Math.floor(time / 60).toString().padStart(2, '0')}:${Math.floor(time % 60).toString().padStart(2, '0')}`;
    currTime.textContent = formatTime(currentTime);
    durTime.textContent = formatTime(isNaN(duration) ? 0 : duration);
}

playBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', () => changeSong(false));
nextBtn.addEventListener('click', () => changeSong(true));
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => changeSong(true));

audio.addEventListener('loadedmetadata', () => updateTimeDisplay(0, audio.duration));

loadSong(songs[songIndex]);
