// Canvas Atmospheric Golden Embers & Animus Fragments
export class EmberAtmosphere {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -1000, y: -1000, vx: 0, vy: 0 };
    this.lastMouse = { x: -1000, y: -1000 };
    this.maxParticles = window.innerWidth < 768 ? 40 : 85;

    this.resize();
    this.initParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle(fromBottom = false) {
    const isFragment = Math.random() < 0.2; // 20% are geometric Animus shards
    return {
      x: Math.random() * this.width,
      y: fromBottom ? this.height + Math.random() * 20 : Math.random() * this.height,
      size: isFragment ? Math.random() * 4 + 2 : Math.random() * 2.5 + 0.8,
      isFragment,
      vx: (Math.random() - 0.5) * 0.6 + 0.2, // slight drift to the right
      vy: -(Math.random() * 0.8 + 0.4), // upward drift
      alpha: Math.random() * 0.7 + 0.2,
      maxAlpha: Math.random() * 0.8 + 0.3,
      pulseSpeed: Math.random() * 0.03 + 0.01,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.04,
      hue: Math.random() < 0.65 ? 38 + Math.random() * 12 : 350 + Math.random() * 15 // Gold or Crimson
    };
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.initParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.vx = (e.clientX - this.lastMouse.x) * 0.05;
      this.mouse.vy = (e.clientY - this.lastMouse.y) * 0.05;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.lastMouse.x = e.clientX;
      this.lastMouse.y = e.clientY;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Interaction with mouse wind
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        p.x += (dx / dist) * force * 2;
        p.y += (dy / dist) * force * 2;
      }

      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.angularSpeed;
      p.alpha += Math.sin(p.angle) * p.pulseSpeed;

      // Wrap around
      if (p.y < -20 || p.x > this.width + 20 || p.x < -20) {
        this.particles[i] = this.createParticle(true);
      }

      const clampedAlpha = Math.max(0.1, Math.min(p.alpha, p.maxAlpha));

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.angle);

      if (p.isFragment) {
        // Render triangular / rhombic Animus shard
        this.ctx.strokeStyle = `hsla(${p.hue}, 90%, 65%, ${clampedAlpha})`;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -p.size);
        this.ctx.lineTo(p.size, p.size);
        this.ctx.lineTo(-p.size, p.size);
        this.ctx.closePath();
        this.ctx.stroke();
      } else {
        // Glowing ember
        const grad = this.ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 75%, ${clampedAlpha})`);
        grad.addColorStop(0.5, `hsla(${p.hue}, 90%, 55%, ${clampedAlpha * 0.6})`);
        grad.addColorStop(1, `hsla(${p.hue}, 80%, 40%, 0)`);

        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }
}
