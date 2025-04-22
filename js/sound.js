export const SoundManager = {
    sounds: {},
  
    init() {
      this.sounds.coin = new Audio('../sounds/coin.wav');
      this.sounds.coin.volume = 0.3;
    },
  
    play(name) {
      if (!this.sounds[name]) return;
      this.sounds[name].currentTime = 0; 
      this.sounds[name].play();
    }
  };
  
  SoundManager.init();

 
export const MusicManager = {
    audio: null,
    isPlaying: false,
  
    init() {
      this.audio = new Audio('../sounds/background-music.wav');
      this.audio.volume = 0.2; 
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
        .catch(e => console.log("Автовоспроизведение заблокировано:", e));
    },
  
    pause() {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
    }
  };
  
  MusicManager.init();