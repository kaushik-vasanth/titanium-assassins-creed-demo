// Procedural Web Audio API sound designer - No external broken links
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.initOnInteraction = this.initOnInteraction.bind(this);
    window.addEventListener('click', this.initOnInteraction, { once: true });
    window.addEventListener('keydown', this.initOnInteraction, { once: true });
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initOnInteraction() {
    this.init();
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  // Blade unsheathe / metal swoosh
  playBlade() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Metallic harmonic oscillators
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(1200, t);
    osc1.frequency.exponentialRampToValueAtTime(3200, t + 0.12);
    osc1.frequency.exponentialRampToValueAtTime(450, t + 0.28);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(2400, t);
    osc2.frequency.exponentialRampToValueAtTime(4800, t + 0.08);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2200, t);
    filter.Q.setValueAtTime(5, t);

    gainNode.gain.setValueAtTime(0.001, t);
    gainNode.gain.linearRampToValueAtTime(0.15, t + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.32);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.33);
    osc2.stop(t + 0.33);
  }

  // Eagle Vision / Animus pulse
  playEagleVision(isActive) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isActive ? 600 : 300, t);
    filter.frequency.exponentialRampToValueAtTime(isActive ? 2800 : 150, t + 0.5);

    osc.type = isActive ? 'sawtooth' : 'triangle';
    osc.frequency.setValueAtTime(isActive ? 180 : 360, t);
    osc.frequency.exponentialRampToValueAtTime(isActive ? 520 : 110, t + 0.6);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.2, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.65);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.68);
  }

  // Subtle mechanical UI click
  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.04);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.045);
  }

  // Animus Sync chime
  playSync() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [440, 554.37, 659.25, 880]; // A Major Animus chord
    notes.forEach((freq, idx) => {
      const t = this.ctx.currentTime + idx * 0.06;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.48);
    });
  }
}

export const sound = new SoundEngine();
