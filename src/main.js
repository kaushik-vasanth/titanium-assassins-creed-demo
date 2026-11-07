import { AnimusCursor } from './cursor.js';
import { EmberAtmosphere } from './canvas-embers.js';
import { sound } from './sound.js';

// Import All 7 Animus Event Cards for Vite Bundling
import card01 from '../assets/event_cards/01_technical_events.png';
import card02 from '../assets/event_cards/02_hackathons.png';
import card03 from '../assets/event_cards/03_non_technical_events.png';
import card04 from '../assets/event_cards/04_workshops.png';
import card05 from '../assets/event_cards/05_fpv_drone_racing.png';
import card06 from '../assets/event_cards/06_robowars.png';
import card07 from '../assets/event_cards/07_main_stage.png';

// Preload card images for instantaneous 3D display
[card01, card02, card03, card04, card05, card06, card07].forEach((src) => {
  const img = new Image();
  img.src = src;
});

// 1. Initialize Animus Crosshair Cursor
const cursor = new AnimusCursor();

// 2. Initialize Canvas Embers
new EmberAtmosphere('embers-canvas');

// 3. Multi-Plane 3D Parallax Tracking
const heroArtLayer = document.getElementById('hero-art-layer');
const mainTitleBox = document.getElementById('main-title-box');
const counterBox = document.getElementById('assassins-counter-box');

if (heroArtLayer || mainTitleBox || counterBox) {
  window.addEventListener('mousemove', (e) => {
    const xPct = (e.clientX / window.innerWidth - 0.5) * 2;
    const yPct = (e.clientY / window.innerHeight - 0.5) * 2;

    if (heroArtLayer) {
      heroArtLayer.style.transform = `translate3d(${-xPct * 6}px, ${-yPct * 6}px, 0)`;
    }

    if (mainTitleBox) {
      mainTitleBox.style.transform = `translateX(-50%) translate3d(${-xPct * 16}px, ${-yPct * 12}px, 0) rotateY(${xPct * 4}deg) rotateX(${-yPct * 4}deg)`;
    }

    if (counterBox) {
      counterBox.style.transform = `translateX(-50%) translate3d(${-xPct * 8}px, ${-yPct * 4}px, 0)`;
    }
  });
}

// 4. Eagle Vision Mode Toggle (Button & Hotkey: V)
let eagleVisionActive = false;
const dockEagleBtn = document.getElementById('dock-eagle');

function toggleEagleVision() {
  eagleVisionActive = !eagleVisionActive;
  document.body.classList.toggle('eagle-vision-active', eagleVisionActive);
  if (dockEagleBtn) {
    dockEagleBtn.classList.toggle('active', eagleVisionActive);
  }
  sound.playEagleVision(eagleVisionActive);
}

if (dockEagleBtn) dockEagleBtn.addEventListener('click', toggleEagleVision);

window.addEventListener('keydown', (e) => {
  if (e.key === 'v' || e.key === 'V') {
    if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'SELECT') {
      toggleEagleVision();
    }
  }
  if (e.key === 'Escape') {
    closeDossier();
    closeForge();
    closeMap();
  }
});

// 5. Audio SFX Dock Button with Vector SVGs (Zero Emojis)
const dockAudio = document.getElementById('dock-audio');
const dockAudioIconWrap = document.getElementById('dock-audio-icon-wrap');
const dockAudioTooltip = document.getElementById('dock-audio-tooltip');

const soundOnSVG = `
  <svg class="dock-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
`;

const soundOffSVG = `
  <svg class="dock-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
`;

if (dockAudio) {
  dockAudio.addEventListener('click', () => {
    const isMuted = sound.toggleMute();
    if (dockAudioIconWrap) {
      dockAudioIconWrap.innerHTML = isMuted ? soundOffSVG : soundOnSVG;
    }
    dockAudioTooltip.textContent = isMuted ? 'Sound Effects: OFF' : 'Sound Effects: ON';
    dockAudio.classList.toggle('active', !isMuted);
    if (!isMuted) sound.playSync();
  });
}

// 6. REC Campus Map Modal
const campusMapOverlay = document.getElementById('campus-map-overlay');
const dockMapBtn = document.getElementById('dock-map');
const closeMapBtn = document.getElementById('close-map');

function openMap() {
  if (campusMapOverlay) {
    campusMapOverlay.classList.add('open');
    sound.playSync();
  }
}

function closeMap() {
  if (campusMapOverlay) {
    campusMapOverlay.classList.remove('open');
    sound.playClick();
  }
}

if (dockMapBtn) dockMapBtn.addEventListener('click', openMap);
if (closeMapBtn) closeMapBtn.addEventListener('click', closeMap);

if (campusMapOverlay) {
  campusMapOverlay.addEventListener('click', (e) => {
    if (e.target === campusMapOverlay) closeMap();
  });
}

// 7. Memory Dossier Database with Clean Vertical Collectible Cards
const memoryData = {
  technical: {
    img: card01,
    cat: 'FLAGSHIP CODING & ALGORITHMS',
    title: '01 // Technical Events',
    bounty: 'BOUNTY: ₹5,00,000 INR',
    desc: 'National coding championships, algorithmic duels, autonomous agent development, micro-mouse maze navigation, and zero-knowledge protocol challenges testing core engineering precision.',
    specs: [
      { lbl: 'ELIGIBILITY', val: 'Undergrad & Postgrad' },
      { lbl: 'TEAM CAPACITY', val: 'Solos & Teams of 2-4' },
      { lbl: 'CERTIFICATION', val: 'IIT & RECTECH Validated' }
    ]
  },
  hackathons: {
    img: card02,
    cat: '36-HOUR SOVEREIGN SPRINT',
    title: '02 // Hackathons',
    bounty: 'BOUNTY: ₹6,00,000 INR',
    desc: 'An intense non-stop 36-hour sprint building full-stack AI swarms, decentralized protocols, and enterprise software architectures. Evaluated by Silicon Valley engineers and tech founders.',
    specs: [
      { lbl: 'SPRINT DURATION', val: '36 Continuous Hours' },
      { lbl: 'GUILD SIZE', val: '3 - 4 Infiltrators' },
      { lbl: 'CORE TRACKS', val: 'AI Agents, ZK, Web3' }
    ]
  },
  nontechnical: {
    img: card03,
    cat: 'STRATEGY, MEDIA & GAMING',
    title: '03 // Non-Technical Events',
    bounty: 'BOUNTY: ₹3,00,000 INR',
    desc: 'Strategic case study competitions, creative UI/UX design gauntlets, product management simulations, tech debates, and LAN gaming tournaments across PC and mobile titles.',
    specs: [
      { lbl: 'TRACKS', val: 'Strategy, Design, Esports' },
      { lbl: 'PARTICIPATION', val: 'Open to All Disciplines' },
      { lbl: 'AWARDS', val: 'Trophies & Cash Bounty' }
    ]
  },
  workshops: {
    img: card04,
    cat: 'CERTIFIED MASTER ARCHITECTS',
    title: '04 // Master Workshops',
    bounty: 'CREDENTIAL: CERTIFIED GUILDS',
    desc: 'Direct hands-on transmission from senior industry leads. Specialize in Autonomous Drone Avionics (PX4 Autopilot), Multi-Agent LLM Orchestration, and Unreal Engine 5 AAA Nanite & Lumen development.',
    specs: [
      { lbl: 'CREDENTIAL', val: 'Autonomous Certificate' },
      { lbl: 'DURATION', val: '12 - 16 Guided Hours' },
      { lbl: 'HARDWARE', val: 'Kits & Workstations Provided' }
    ]
  },
  drones: {
    img: card05,
    cat: 'HIGH-VELOCITY AERIAL PURSUIT',
    title: '05 // FPV Drone Racing',
    bounty: 'BOUNTY: ₹3,50,000 INR',
    desc: 'Sub-250g brushless quadcopters clocking upwards of 140km/h through neon laser gates, smoke rings, and vertical dive tunnels under floodlights in an arena of high-adrenaline telemetry.',
    specs: [
      { lbl: 'FRAME CLASS', val: '5-inch & Whoop FPV' },
      { lbl: 'SPEED THRESHOLD', val: '140+ KM/H' },
      { lbl: 'CIRCUIT FORMAT', val: 'Multi-Gate Time Attack' }
    ]
  },
  robowars: {
    img: card06,
    cat: 'HEAVY COMBAT ROBOTICS ARENA',
    title: '06 // Robowars Cage Siege',
    bounty: 'BOUNTY: ₹6,00,000 INR',
    desc: "Enter the bulletproof steel cage. Battle against the country's most brutal 60kg heavyweight and 15kg featherweight combat robots equipped with high-pressure pneumatic flippers, hardened AR400 spinning drums, and titanium chassis.",
    specs: [
      { lbl: 'WEIGHT CLASS', val: '60kg & 15kg Bots' },
      { lbl: 'PILOT CREW', val: '2 - 6 Engineers' },
      { lbl: 'SECTOR ARENA', val: 'Titanium Colosseum' }
    ]
  },
  mainstage: {
    img: card07,
    cat: 'PRO-NIGHT GRAND FINALE',
    title: '07 // Main Stage Pro-Nights',
    bounty: 'ACCESS: FESTIVAL WRISTBAND',
    desc: 'When night falls, 500 autonomous synchronized drones draw the sacred Assassin Insignia over the skies of the campus, followed by an international EDM headliner, visual lasers, and 100,000 Watts of bass.',
    specs: [
      { lbl: 'DRONE SWARM', val: '500 Synchronized UAVs' },
      { lbl: 'AUDIO SPEC', val: '100,000W Line Array' },
      { lbl: 'ADMISSION', val: 'Wristband Required' }
    ]
  }
};

// 8. Dossier Overlay Modal Management
const dossierOverlay = document.getElementById('dossier-overlay');
const closeDossierBtn = document.getElementById('close-dossier');
const dockDossierBtn = document.getElementById('dock-dossier');
const railItems = document.querySelectorAll('.rail-item');

const dossierCardImg = document.getElementById('dossier-card-img');
const collectibleCardWrap = document.getElementById('collectible-card-wrap');
const cardFoilSheen = document.getElementById('card-foil-sheen');

const dossierCat = document.getElementById('dossier-cat');
const dossierTitle = document.getElementById('dossier-title');
const dossierBounty = document.getElementById('dossier-bounty');
const dossierDesc = document.getElementById('dossier-desc');
const dossierSpecs = document.getElementById('dossier-specs');
const btnDossierEnter = document.getElementById('btn-dossier-enter');

function openDossier(seqKey = 'technical') {
  loadMemory(seqKey);
  if (dossierOverlay) dossierOverlay.classList.add('open');
  sound.playBlade();
}

function closeDossier() {
  if (dossierOverlay) dossierOverlay.classList.remove('open');
  sound.playClick();
}

function loadMemory(seqKey) {
  const data = memoryData[seqKey] || memoryData['technical'];
  if (!data) return;

  railItems.forEach((item) => {
    item.classList.toggle('active', item.getAttribute('data-seq') === seqKey);
  });

  if (dossierCardImg) {
    dossierCardImg.style.opacity = '0.3';
    dossierCardImg.style.transform = 'scale(0.95)';
    setTimeout(() => {
      dossierCardImg.src = data.img;
      dossierCardImg.style.opacity = '1';
      dossierCardImg.style.transform = 'scale(1)';
    }, 120);
  }

  if (dossierCat) dossierCat.textContent = data.cat;
  if (dossierTitle) dossierTitle.textContent = data.title;
  if (dossierBounty) dossierBounty.textContent = data.bounty;
  if (dossierDesc) dossierDesc.textContent = data.desc;

  if (dossierSpecs) {
    dossierSpecs.innerHTML = data.specs
      .map(
        (s) => `
      <div>
        <div class="spec-box-lbl">${s.lbl}</div>
        <div class="spec-box-val">${s.val}</div>
      </div>
    `
      )
      .join('');
  }
}

// Initialize default Sequence 01 memory
loadMemory('technical');

if (dockDossierBtn) dockDossierBtn.addEventListener('click', () => openDossier('technical'));
if (closeDossierBtn) closeDossierBtn.addEventListener('click', closeDossier);

railItems.forEach((item) => {
  item.addEventListener('click', () => {
    const seq = item.getAttribute('data-seq');
    loadMemory(seq);
    sound.playClick();
  });
});

if (btnDossierEnter) {
  btnDossierEnter.addEventListener('click', () => {
    closeDossier();
    openForge();
  });
}

// 9. 3D Tilt & Holographic Foil Reflection on Collectible Card
if (collectibleCardWrap) {
  collectibleCardWrap.addEventListener('mousemove', (e) => {
    const rect = collectibleCardWrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -18;
    const rotY = ((x - centerX) / centerX) * 18;

    collectibleCardWrap.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04, 1.04, 1.04)`;

    if (cardFoilSheen) {
      cardFoilSheen.style.opacity = '1';
      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;
      cardFoilSheen.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255,255,255,0.4) 10%, rgba(212,175,55,0.3) 40%, transparent 75%)`;
    }
  });

  collectibleCardWrap.addEventListener('mouseleave', () => {
    collectibleCardWrap.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (cardFoilSheen) {
      cardFoilSheen.style.opacity = '0';
    }
  });
}

// 10. Interactive Game World Hotspots Click Handling
const hotspots = document.querySelectorAll('.game-hotspot');
hotspots.forEach((spot) => {
  spot.addEventListener('click', () => {
    const mem = spot.getAttribute('data-memory');
    if (mem === 'pass') {
      openForge();
    } else {
      openDossier(mem);
    }
  });
});

// 11. Pass Forge Modal Management
const forgeOverlay = document.getElementById('forge-overlay');
const closeForgeBtn = document.getElementById('close-forge');
const dockPassBtn = document.getElementById('dock-pass');
const btnConfirmPass = document.getElementById('btn-confirm-pass');

const forgeName = document.getElementById('forge-name');
const forgeCollege = document.getElementById('forge-college');
const forgeRole = document.getElementById('forge-role');

const dispName = document.getElementById('disp-name');
const dispCollege = document.getElementById('disp-college');
const dispRole = document.getElementById('disp-role');
const previewPassCard = document.getElementById('preview-pass-card');

function openForge() {
  if (forgeOverlay) forgeOverlay.classList.add('open');
  sound.playSync();
}

function closeForge() {
  if (forgeOverlay) forgeOverlay.classList.remove('open');
  sound.playClick();
}

if (dockPassBtn) dockPassBtn.addEventListener('click', openForge);
if (closeForgeBtn) closeForgeBtn.addEventListener('click', closeForge);

if (forgeName && dispName) {
  forgeName.addEventListener('input', (e) => {
    dispName.textContent = e.target.value.trim() || 'Operative';
  });
}

if (forgeCollege && dispCollege) {
  forgeCollege.addEventListener('input', (e) => {
    dispCollege.textContent = e.target.value.trim() || 'Rajalakshmi Engineering College';
  });
}

if (forgeRole && dispRole) {
  forgeRole.addEventListener('change', (e) => {
    dispRole.textContent = e.target.value;
    sound.playClick();
  });
}

// 3D Tilt on Pass Card
if (previewPassCard) {
  previewPassCard.addEventListener('mousemove', (e) => {
    const rect = previewPassCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -14;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 14;
    previewPassCard.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  });

  previewPassCard.addEventListener('mouseleave', () => {
    previewPassCard.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  });
}

if (btnConfirmPass) {
  btnConfirmPass.addEventListener('click', () => {
    sound.playBlade();
    btnConfirmPass.textContent = 'SYNCHRONIZING WITH GUILD VAULT...';
    btnConfirmPass.style.background = '#d4af37';
    btnConfirmPass.style.color = '#000';

    setTimeout(() => {
      btnConfirmPass.textContent = 'CREDENTIAL SYNCHRONIZED & READY!';
      btnConfirmPass.style.background = '#10b981';
      btnConfirmPass.style.color = '#fff';
      setTimeout(() => {
        closeForge();
        btnConfirmPass.textContent = 'CONFIRM & DOWNLOAD PASS';
        btnConfirmPass.style.background = '';
        btnConfirmPass.style.color = '';
      }, 1200);
    }, 1000);
  });
}

// 12. Live Synchronized Countdown Timer (Into Ornate Counter Frame)
const hudDays = document.getElementById('hud-days');
const hudHours = document.getElementById('hud-hours');
const hudMinutes = document.getElementById('hud-minutes');
const hudSeconds = document.getElementById('hud-seconds');

const targetDate = new Date(Date.now() + 42 * 24 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000);

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  if (hudDays) hudDays.textContent = String(days).padStart(2, '0');
  if (hudHours) hudHours.textContent = String(hours).padStart(2, '0');
  if (hudMinutes) hudMinutes.textContent = String(minutes).padStart(2, '0');
  if (hudSeconds) hudSeconds.textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();
