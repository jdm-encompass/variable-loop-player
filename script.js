
document.addEventListener('DOMContentLoaded', function() {
    const audioFileInput = document.querySelector('.audio-file');
    const delayInput = document.querySelector('.delay-input');
    const playButton = document.querySelector('.play-pause-button');
    const stopButton = document.querySelector('.stop-button');
    const progressBar = document.querySelector('.progress');

    let delayTimer;
    let audio = new Audio();

    // Update the progress bar as the audio plays
    audio.addEventListener('timeupdate', function() {
        let percentage = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percentage + '%';
    });

    // When the audio ends, start it again after the delay
    audio.addEventListener('ended', function() {
        playAudioAfterDelay();
    });

    audioFileInput.addEventListener('change', function() {
        const files = audioFileInput.files;
        if (files.length > 0) {
            const file = files[0];
            audio.src = URL.createObjectURL(file);
            progressBar.style.width = '0%'; // Reset progress bar
        }
    });

    function playAudioAfterDelay() {
        clearTimeout(delayTimer); // Clear any existing timers
        delayTimer = setTimeout(() => {
            audio.currentTime = 0; // Reset the audio to start
            audio.play();
            playButton.textContent = 'Pause'; // Change to pause symbol
        }, delayInput.value * 1000); // Delay in milliseconds
    }

    playButton.addEventListener('click', function() {
        if (audio.paused) {
            playAudioAfterDelay();
        } else {
            audio.pause();
            playButton.textContent = 'Play'; // Change to play symbol
        }
    });

    stopButton.addEventListener('click', function() {
        clearTimeout(delayTimer);
        audio.pause();
        audio.currentTime = 0; // Reset the audio to start
        progressBar.style.width = '0%'; // Reset progress bar
        playButton.textContent = 'Play'; // Change to play symbol
    });
});
