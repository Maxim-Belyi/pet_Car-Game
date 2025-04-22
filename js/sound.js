export const CoinSound = {
    sounds: {},
  
    init() {
      this.sounds.coin = new Audio('https://raw.githubusercontent.com/Maxim-Belyi/pet_Car-Game/main/media/coin.mp3');
      this.sounds.coin.volume = 0.4;
    },
  
    play(name) {
      if (!this.sounds[name]) return;
      this.sounds[name].currentTime = 0; 
      this.sounds[name].play();
    }
  };
  CoinSound.init();

  export const ArrowSound = {
    sounds: {},

    init() {
      this.sounds.arrow = new Audio('https://github.com/Maxim-Belyi/pet_Car-Game/raw/refs/heads/main/media/engine-force.mp3');
      this.sounds.arrow.volume = 0.05;
    },

    play(name) {
      if (!this.sounds[name]) return;
      this.sounds[name].currentTime = 0;
      this.sounds[name].play();
    }
  };
  ArrowSound.init();

 
export const MusicManager = {
    audio: null,
    isPlaying: null,
    onChange: null,
  
    init() {
      this.audio = new Audio('https://github.com/Maxim-Belyi/pet_Car-Game/raw/refs/heads/main/media/background-music.mp3');
      this.audio.volume = 0.3; 
      this.audio.loop = true; 
    },
  
    toggle() {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    },
  
    play() {
      this.audio.play()
        .then(() => this.isPlaying = true)
    },
  
    pause() {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
    }
  };
  
  MusicManager.init();
  document.addEventListener('click', () => {
    MusicManager.play();
  }, { once: true });