// Bespoke Animus Crosshair & Reticle Cursor with Physics
export class AnimusCursor {
  constructor() {
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.targetScale = 1;
    this.currentScale = 1;
    this.activeType = 'default';
    this.labelText = '';

    this.createElements();
    this.bindEvents();
    this.render();
  }

  createElements() {
    this.container = document.createElement('div');
    this.container.className = 'animus-cursor-container';
    this.container.innerHTML = `
      <div class="cursor-dot"></div>
      <div class="cursor-ring">
        <span class="corner c-tl"></span>
        <span class="corner c-tr"></span>
        <span class="corner c-bl"></span>
        <span class="corner c-br"></span>
        <div class="cursor-cross"></div>
      </div>
      <div class="cursor-label"></div>
    `;
    document.body.appendChild(this.container);

    this.dot = this.container.querySelector('.cursor-dot');
    this.ring = this.container.querySelector('.cursor-ring');
    this.label = this.container.querySelector('.cursor-label');
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mousedown', () => {
      this.targetScale = 0.75;
      this.ring.classList.add('cursor-click');
      this.createSpark(this.mouse.x, this.mouse.y);
    });

    window.addEventListener('mouseup', () => {
      this.targetScale = 1;
      this.ring.classList.remove('cursor-click');
    });

    // Delegate hover states
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('[data-cursor], a, button, .interactive-card');
      if (target) {
        const type = target.getAttribute('data-cursor') || 'hover';
        this.setMode(type, target.getAttribute('data-cursor-label') || '');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('[data-cursor], a, button, .interactive-card');
      if (target) {
        this.resetMode();
      }
    });
  }

  setMode(type, text = '') {
    this.activeType = type;
    this.container.setAttribute('data-mode', type);
    if (text) {
      this.label.textContent = text;
      this.label.style.opacity = '1';
    } else {
      this.label.style.opacity = '0';
    }
  }

  resetMode() {
    this.activeType = 'default';
    this.container.removeAttribute('data-mode');
    this.label.style.opacity = '0';
  }

  createSpark(x, y) {
    const spark = document.createElement('div');
    spark.className = 'cursor-spark';
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 400);
  }

  render() {
    // Smooth lerp
    this.pos.x += (this.mouse.x - this.pos.x) * 0.18;
    this.pos.y += (this.mouse.y - this.pos.y) * 0.18;
    this.currentScale += (this.targetScale - this.currentScale) * 0.2;

    // Direct transform for 60fps performance
    this.dot.style.transform = `translate3d(${this.mouse.x}px, ${this.mouse.y}px, 0)`;
    this.ring.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0) scale(${this.currentScale})`;
    this.label.style.transform = `translate3d(${this.pos.x + 18}px, ${this.pos.y - 18}px, 0)`;

    requestAnimationFrame(() => this.render());
  }
}
