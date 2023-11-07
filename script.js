document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('play-btn');
    const audioFileInput = document.getElementById('audio-file');
    const delaySlider = document.getElementById('delay-slider');
    const sliderValue = document.getElementById('slider-value');

    // Update slider value display
    delaySlider.oninput = function() {
        sliderValue.textContent = this.value + 's';
    };

    // Play or pause the audio
    playBtn.onclick = function() {
        if (audio.paused) {
            audio.play();
            // Change icon to pause
            this.innerHTML = '<svg viewBox="0 0 16 16" class="bi bi-pause-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 3.5v9h1v-9h-1zm4 0v9h1v-9h-1z"/></svg>';
        } else {
            audio.pause();
            // Change icon to play
            this.innerHTML = '<svg viewBox="0 0 16 16" class="bi bi-play-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11.596 8.697l-6.363 3.692V4.005l6.363 3.692z"/></svg>';
        }
    };

    // Load audio file
    audioFileInput.onchange = function() {
        if (this.files && this.files[0]) {
            audio.src = URL.createObjectURL(this.files[0]);
            audio.load();
            playBtn.disabled = false; // Enable the play button
        }
    };

    // Loop the audio based on the delay input
    audio.onended = function() {
        setTimeout(function() {
            audio.play();
        }, parseFloat(delaySlider.value) * 1000);
    };
});
