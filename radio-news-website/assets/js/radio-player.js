// Radio Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Audio context and elements
    const audioPlayers = document.querySelectorAll('.radio-player');
    const playButtons = document.querySelectorAll('.play-button');
    const volumeSliders = document.querySelectorAll('.volume-slider');
    const timeDisplays = document.querySelectorAll('.time-display');
    const nowPlayingDisplays = document.querySelectorAll('.now-playing');
    
    // Radio stream URL (replace with actual stream URL)
    const streamUrl = 'https://example.com/radio-stream.mp3';
    
    // Create audio context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    let audioSource;
    let isPlaying = false;

    // Initialize all players
    audioPlayers.forEach((player, index) => {
        const audio = new Audio();
        audio.crossOrigin = 'anonymous';
        audio.src = streamUrl;
        
        // Connect to audio context when first played
        audio.addEventListener('play', () => {
            if (!audioSource) {
                audioSource = audioContext.createMediaElementSource(audio);
                audioSource.connect(audioContext.destination);
            }
        });

        // Play/Pause functionality
        playButtons[index].addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
                this.innerHTML = '<i class="fas fa-play"></i>';
                nowPlayingDisplays[index].textContent = 'Paused';
            } else {
                audio.play()
                    .then(() => {
                        this.innerHTML = '<i class="fas fa-pause"></i>';
                        nowPlayingDisplays[index].textContent = 'Now Playing: Community Radio 98.5 FM';
                        isPlaying = true;
                    })
                    .catch(error => {
                        console.error('Error playing audio:', error);
                        alert('Error starting playback. Please try again.');
                    });
            }
            isPlaying = !isPlaying;
        });

        // Volume control
        volumeSliders[index].addEventListener('input', function() {
            audio.volume = this.value / 100;
        });

        // Update time display
        audio.addEventListener('timeupdate', function() {
            const minutes = Math.floor(audio.currentTime / 60);
            const seconds = Math.floor(audio.currentTime % 60);
            timeDisplays[index].textContent = 
                `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        });

        // Error handling
        audio.addEventListener('error', function() {
            console.error('Audio error:', audio.error);
            nowPlayingDisplays[index].textContent = 'Error: Stream unavailable';
            playButtons[index].innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        });
    });

    // Synchronize players across the site
    function syncPlayers() {
        // Implementation for keeping multiple players in sync
        // Would require more complex state management
    }
});