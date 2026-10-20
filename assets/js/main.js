// ---------------------------------------------------------------
// Project data — to add a project, add an object to this list.
// `video` is a YouTube ID (optional). `featured` spans the full row.
// `archived: true` moves a project out of the card grid into the compact
// "More projects" index — still visible and clickable, but one line tall.
// `links` are extra buttons in the modal; `repo` overrides the GitHub button.
// ---------------------------------------------------------------
const PROJECTS = [
  {
    id: "pipebrains",
    featured: true,
    title: "PipeBrains",
    tagline: "ML-powered hydrate prediction for gas pipelines",
    award: "1st Place · EOG Resources Challenge",
    meta: "HackUTD XI · Team of 4",
    image: "assets/projects/pipebrains.jpg",
    summary:
      "A monitoring platform that predicts the likelihood of hydrate formation in pipelines from sensor data, then alerts operators before a blockage becomes a burst.",
    highlights: [
      "Trained a random-forest regressor with scikit-learn on EOG's dataset — R² of 0.94 with a low mean error.",
      "Built a Flask API that cleans raw sensor data and connects the Python model to the JavaScript frontend.",
      "Real-time Chart.js dashboards, plus support for uploading custom datasets to analyze.",
      "Alerts page for readings above 50% risk, with personalized email notifications when users are away.",
    ],
    story:
      "At HackUTD XI — which became the largest 24-hour hackathon in the US — we chose EOG Resources' challenge because pipe bursts are genuinely dangerous and the problem had real ML potential. It was my first hackathon win.",
    stack: ["Python", "Flask", "scikit-learn", "Pandas", "NumPy", "JavaScript", "Tailwind CSS", "Chart.js"],
    role: "Flask API & data pipeline",
    video: "A-HWoCepzhw",
  },
  {
    id: "aignosis",
    title: "AIgnosis",
    tagline: "AI-assisted diagnostics from photos and biometric data",
    award: "3rd Place Overall · Axxess Hackathon 2025",
    meta: "Axxess Hackathon 2025 · Team of 4",
    image: "https://i.ytimg.com/vi/N0e8Bw3HkNI/maxresdefault.jpg",
    imagePosition: "center",
    summary:
      "A healthcare web app for hospice and home-care patients that uses five specialized ML models to flag potential health concerns early — with every AI insight paired with the option to consult a doctor.",
    highlights: [
      "Skin-lesion classification (malignant vs. benign) from an uploaded photo.",
      "Diabetes risk assessment based on blood-glucose fluctuations.",
      "Preliminary analysis from images of nails and urine samples.",
      "Five models trained with TensorFlow and scikit-learn, with data augmentation and cleaning to improve accuracy.",
      "Flask backend connecting the models to a vanilla JS frontend, with Firebase authentication.",
    ],
    story:
      "People in hospice and home healthcare often don't have constant assistance, and some conditions need more attention than is available. We wanted to get timely, preliminary insight into patients' hands — while keeping human doctors in the loop.",
    stack: ["Python", "TensorFlow", "scikit-learn", "Pandas", "NumPy", "Flask", "Firebase", "JavaScript", "HTML", "CSS"],
    video: "N0e8Bw3HkNI",
    repo: "https://github.com/lightningbolt7/AxxessHack",
    links: [{ label: "Devpost", href: "https://devpost.com/software/aignosis" }],
  },
  {
    id: "vision-learning",
    title: "Vision Learning",
    tagline: "An AI interview coach that reads confidence and eye contact",
    award: "3rd Place · AWS Challenge, TAMUhack 2025",
    meta: "TAMUhack 2025 · Team of 4",
    image: "https://i.ytimg.com/vi/iw4E_pIcd_4/maxresdefault.jpg",
    imagePosition: "center",
    summary:
      "A personalized interview-prep platform that evaluates confidence, knowledge and eye contact, gives tailored feedback, then lets users practice explaining their answers to a conversational AI.",
    highlights: [
      "Facial analysis with AWS Rekognition and OpenCV to gauge eye contact and confidence.",
      "Natural voice responses with Amazon Polly and conversational practice via the OpenAI API.",
      "Real-time problem-solving practice with step-by-step guidance and personalized feedback.",
      "Python/Flask backend — including untangling port and resource conflicts between services.",
    ],
    story:
      "As students heading into the professional world, we found most career-prep resources too generic. We wanted something that gives each person specific, human-feeling feedback on how they actually come across.",
    stack: ["Python", "Flask", "AWS Rekognition", "Amazon Polly", "OpenAI API", "OpenCV", "JavaScript", "HTML", "CSS"],
    video: "iw4E_pIcd_4",
    repo: "https://github.com/MuditUpadhyay04/TAMUHack",
    links: [{ label: "Devpost", href: "https://devpost.com/software/vision-learning" }],
  },
  {
    id: "safedrive",
    title: "SafeDrive",
    tagline: "Turns a phone's camera into a crash-detection sensor",
    meta: "ACM Projects, UTD · Team of 5",
    image: "assets/projects/safedrive.jpg",
    summary:
      "A Flutter mobile app that uses the rear camera to detect collision risks for drivers whose cars don't have built-in crash sensors.",
    highlights: [
      "Object detection with YOLOv5 and Google ML Kit to flag collision warnings in real time.",
      "PostgreSQL stores collision warnings, hard brakes and average speed, visualized as driving-history graphs.",
      "Accident-report flow that guides the user step by step after a crash.",
      "Firebase authentication.",
    ],
    story:
      "ACM Projects is a semester-long, selective program at UT Dallas. I didn't make it in on my first try — this project exists because I made it on the second. I worked as a full-stack developer on a team of five.",
    stack: ["Flutter", "Dart", "YOLOv5", "Google ML Kit", "PostgreSQL", "Firebase"],
    role: "Full-stack developer",
  },
  {
    id: "zeus",
    title: "Zeus",
    tagline: "A Discord bot for an 800+ member CS community",
    meta: "Personal project",
    image: "assets/projects/zeus.jpg",
    imagePosition: "center 25%",
    summary:
      "A Discord bot that automates role assignment for course channels and answers class questions using a custom Flask API and UTD's Nebula API.",
    highlights: [
      "Auto-roles students into professor and course channels each semester — replacing paid third-party bots.",
      "Custom Flask API plus the Nebula API to surface class details and locations on demand.",
      "Interactive commands, including letting students personalize their role colors.",
    ],
    story:
      "I'm an admin of a Discord server for 800+ UTD CS students. Every semester we add new courses and professors, and the bots that handle large-scale auto-roling are subscription-based — so I built my own. Zeus watches over the server from the clouds.",
    stack: ["Python", "discord.py", "Flask", "Nebula API"],
    role: "Solo developer",
    video: "kh8zzxQx8KE",
  },
  {
    id: "medcare",
    archived: true,
    title: "MedCare",
    tagline: "Patient-rotation tracking with drug-interaction checks",
    meta: "HackUTD X · Team of 4",
    image: "assets/projects/medcare.jpg",
    summary:
      "A web app built in 24 hours for PHRI's challenge that tracks patient rotations and status, with a built-in drug-to-drug interaction checker.",
    highlights: [
      "Patient dashboard tracking rotations and status.",
      "Drug-to-drug interaction tracker powered by an external medical API.",
      "Shipped a working, demoed product within the 24-hour window.",
    ],
    story:
      "My first hackathon project. A year earlier I'd attended HackUTD without knowing web development and couldn't ship anything — so I spent the summer learning it and came back prepared.",
    stack: ["HTML", "CSS", "JavaScript", "Drug Interaction API"],
    video: "BCFlopmgvlY",
  },
  {
    id: "recime",
    archived: true,
    title: "Recime",
    tagline: "AI recipe generator built on the OpenAI API",
    meta: "Personal project",
    image: "assets/projects/recime.jpg",
    summary:
      "Generates ingredients and step-by-step recipes for any dish, and saves them to a history tab, organized for later reference.",
    highlights: [
      "Prompt engineering to keep model output consistent and parseable.",
      "Token-usage management to stay within a small API budget.",
      "Persistent recipe history with clean separation of ingredients and steps.",
    ],
    story:
      "OpenAI's API was taking off and I wanted to learn it while leveling up in web development. Maybe now I can finally cook without my mom nearby.",
    stack: ["JavaScript", "HTML", "CSS", "OpenAI API"],
    role: "Solo developer",
  },
  {
    id: "leword",
    archived: true,
    title: "Lé Word",
    tagline: "A four-letter Wordle with performance analytics",
    meta: "Personal project",
    image: "assets/projects/leword.jpg",
    summary:
      "Wordle's little brother: guess a four-letter word, validated live against a dictionary API, with an analysis screen tracking your accuracy over time.",
    highlights: [
      "Word validation and end-of-game definitions via a dictionary API.",
      "Point-analysis system for accuracy and game statistics.",
      "Game state and history persisted with localStorage.",
    ],
    story:
      "After Recime and WebTrack I wanted to build a game — something challenging but achievable at my level then. It's fun and a little educational.",
    stack: ["JavaScript", "HTML", "CSS", "Dictionary API"],
    role: "Solo developer",
    video: "HfIkWP_6yXQ",
  },
  {
    id: "webtrack",
    archived: true,
    title: "WebTrack",
    tagline: "A Chrome extension for saving links in a flash",
    meta: "Personal project",
    image: "assets/projects/webtrack.jpg",
    summary:
      "A lightweight Chrome extension that saves the current tab's URL in one click, or any link you paste in, for quick reference later.",
    highlights: [
      "Uses Chrome's extension APIs to read the active tab.",
      "Saved links persisted with localStorage.",
    ],
    story:
      "My first hands-on HTML/CSS/JS project and the first time I used an API. This is where it all began.",
    stack: ["JavaScript", "HTML", "CSS", "Chrome APIs"],
    role: "Solo developer",
    video: "Et2OoSGLOXQ",
  },
];

const GITHUB = "https://github.com/lightningbolt7?tab=repositories";

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const boltIcon = '<svg aria-hidden="true"><use href="#bolt" /></svg>';
const arrowIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>';

// ---------- render projects ----------
const imgPos = (p) => (p.imagePosition ? `style="object-position:${p.imagePosition}"` : "");

function cardHTML(p) {
  return `
    <button class="card ${p.featured ? "card--featured" : ""} reveal" type="button" data-project="${p.id}" aria-haspopup="dialog">
      <span class="card__orb" aria-hidden="true"></span>
      <div class="card__media">
        <img src="${p.image}" alt="" loading="lazy" ${imgPos(p)} />
      </div>
      <div class="card__body">
        ${p.award ? `<span class="badge">${boltIcon}${esc(p.award)}</span>` : ""}
        <span class="card__meta">${esc(p.meta)}</span>
        <h3 class="card__title">${esc(p.title)} ${arrowIcon}</h3>
        <p class="card__desc">${esc(p.featured ? p.summary : p.tagline)}</p>
        <ul class="card__stack">${p.stack
          .slice(0, p.featured ? 8 : 4)
          .map((s) => `<li>${esc(s)}</li>`)
          .join("")}</ul>
      </div>
    </button>`;
}

function rowHTML(p, i) {
  return `
    <li class="reveal">
      <button class="index-row" type="button" data-project="${p.id}" data-image="${p.image}" aria-haspopup="dialog">
        <span class="index-row__num">${String(i + 1).padStart(2, "0")}</span>
        <img class="index-row__thumb" src="${p.image}" alt="" loading="lazy" ${imgPos(p)} />
        <span class="index-row__title">${esc(p.title)}</span>
        <span class="index-row__tagline">${esc(p.tagline)}</span>
        <span class="index-row__meta">${esc(p.meta.split(" · ")[0])}</span>
        <span class="index-row__go">${arrowIcon}</span>
      </button>
    </li>`;
}

function renderProjects() {
  const top = PROJECTS.filter((p) => !p.archived);
  const featured = top.filter((p) => p.featured);
  const grid = top.filter((p) => !p.featured);
  const archived = PROJECTS.filter((p) => p.archived);

  document.getElementById("project-list").innerHTML =
    featured.map(cardHTML).join("") + `<div class="projects__grid">${grid.map(cardHTML).join("")}</div>`;

  const archive = document.getElementById("project-archive");
  archive.hidden = archived.length === 0;
  document.getElementById("archive-count").textContent = archived.length;
  document.getElementById("archive-list").innerHTML = archived.map(rowHTML).join("");
}

// Floating preview that follows the cursor over the compact index (mouse only)
function initPeek() {
  const list = document.getElementById("archive-list");
  const peek = document.getElementById("peek");
  const peekImg = peek.querySelector("img");
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  let x = 0, y = 0, raf = 0;
  const place = () => {
    raf = 0;
    peek.style.transform = `translate3d(${x + 24}px, ${y - 90}px, 0)`;
  };
  list.addEventListener("pointermove", (e) => {
    x = e.clientX; y = e.clientY;
    if (!raf) raf = requestAnimationFrame(place);
  });
  list.addEventListener("pointerover", (e) => {
    const row = e.target.closest(".index-row");
    if (!row) return;
    if (peekImg.getAttribute("src") !== row.dataset.image) {
      peekImg.src = row.dataset.image;
      peekImg.style.objectPosition = row.querySelector("img").style.objectPosition || "";
    }
    peek.classList.add("is-on");
  });
  list.addEventListener("pointerleave", () => peek.classList.remove("is-on"));
}

// Glowing orb behind each project card's text that trails the cursor.
// The featured card's orb rests in its top-right corner and drifts back there.
function initOrbs() {
  const list = document.getElementById("project-list");
  const live = matchMedia("(hover: hover) and (pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  const states = new WeakMap();
  const REST_SCALE = 1.5;

  // Resting spot: top-right corner of the text area (beside or below the screenshot)
  const restOf = (card) => ({ x: card.clientWidth, y: card.querySelector(".card__body").offsetTop, s: REST_SCALE });
  const place = (st) => (st.orb.style.transform = `translate3d(${st.x.toFixed(1)}px, ${st.y.toFixed(1)}px, 0) scale(${st.s.toFixed(3)})`);

  function stateOf(card) {
    let st = states.get(card);
    if (!st) {
      const featured = card.classList.contains("card--featured");
      const r = featured ? restOf(card) : { x: 0, y: 0, s: 0.6 };
      st = { orb: card.querySelector(".card__orb"), featured, x: r.x, y: r.y, s: r.s, tx: r.x, ty: r.y, ts: r.s, raf: 0, inside: false };
      states.set(card, st);
      place(st);
    }
    return st;
  }

  // Ease toward the target each frame for a soft, trailing follow
  function animate(st) {
    if (st.raf) return;
    const step = () => {
      st.x += (st.tx - st.x) * 0.14;
      st.y += (st.ty - st.y) * 0.14;
      st.s += (st.ts - st.s) * 0.14;
      place(st);
      const settled = Math.abs(st.tx - st.x) < 0.3 && Math.abs(st.ty - st.y) < 0.3 && Math.abs(st.ts - st.s) < 0.002;
      st.raf = settled ? 0 : requestAnimationFrame(step);
    };
    st.raf = requestAnimationFrame(step);
  }

  // Featured orbs start (and stay, without a mouse) in their resting corner
  list.querySelectorAll(".card--featured").forEach((card) => stateOf(card).orb.classList.add("is-lit"));
  addEventListener("resize", () =>
    list.querySelectorAll(".card--featured").forEach((card) => {
      const st = stateOf(card);
      if (st.inside) return;
      Object.assign(st, (({ x, y, s }) => ({ x, y, s, tx: x, ty: y, ts: s }))(restOf(card)));
      place(st);
    })
  );
  if (!live) return;

  list.addEventListener("pointermove", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const st = stateOf(card);
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    if (!st.inside) {
      st.inside = true;
      if (!st.featured) Object.assign(st, { x, y, s: 0.6 }); // appear right under the cursor
      st.orb.classList.add("is-lit");
    }
    Object.assign(st, { tx: x, ty: y, ts: 1 });
    animate(st);
  });

  list.addEventListener("pointerout", (e) => {
    const card = e.target.closest(".card");
    if (!card || card.contains(e.relatedTarget)) return;
    const st = stateOf(card);
    st.inside = false;
    if (st.featured) {
      const r = restOf(card);
      Object.assign(st, { tx: r.x, ty: r.y, ts: r.s });
      animate(st);
    } else {
      st.orb.classList.remove("is-lit");
      st.ts = 0.6;
      animate(st);
    }
  });
}

// ---------- project modal ----------
const modal = document.getElementById("project-modal");
const modalBody = document.getElementById("modal-body");

function openProject(id) {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return;

  const media = p.video
    ? `<button class="video-btn" type="button" data-video="${p.video}" aria-label="Play ${esc(p.title)} demo video">
         <img src="https://i.ytimg.com/vi/${p.video}/maxresdefault.jpg" alt="" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${p.video}/hqdefault.jpg'" />
         <span class="video-btn__play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>Watch demo</span>
       </button>`
    : `<img src="${p.image}" alt="${esc(p.title)} screenshot" />`;

  modalBody.innerHTML = `
    ${p.award ? `<span class="badge">${boltIcon}${esc(p.award)}</span>` : ""}
    <h2 id="modal-title">${esc(p.title)}</h2>
    <p class="modal__tagline">${esc(p.tagline)}</p>
    <div class="modal__media">${media}</div>
    <div class="modal__grid">
      <div>
        <div class="modal__section"><h3>Overview</h3><p>${esc(p.summary)}</p></div>
        <div class="modal__section"><h3>Highlights</h3>
          <ul class="bullets">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
        </div>
        <div class="modal__section"><h3>Backstory</h3><p>${esc(p.story)}</p></div>
      </div>
      <aside>
        <dl>
          <div><dt>Context</dt><dd>${esc(p.meta)}</dd></div>
          ${p.role ? `<div><dt>Role</dt><dd>${esc(p.role)}</dd></div>` : ""}
          <div><dt>Stack</dt><dd><ul class="tags">${p.stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></dd></div>
        </dl>
        <div class="modal__links">
          <a class="btn btn--ghost btn--small" href="${p.repo || GITHUB}" target="_blank" rel="noopener">
            ${p.repo ? "View source" : "GitHub"} ${arrowIcon}
          </a>
          ${(p.links || [])
            .map((l) => `<a class="btn btn--ghost btn--small" href="${l.href}" target="_blank" rel="noopener">${esc(l.label)} ${arrowIcon}</a>`)
            .join("")}
        </div>
      </aside>
    </div>`;

  modal.showModal();
  modal.scrollTop = 0;
  history.replaceState(null, "", `#${p.id}`);
}

function closeModal() {
  modal.close();
}

modal.addEventListener("close", () => {
  modalBody.innerHTML = ""; // stops any playing video
  history.replaceState(null, "", location.pathname + location.search);
});

modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target.closest("[data-close]")) return closeModal();

  const vid = e.target.closest("[data-video]");
  if (vid) {
    const id = vid.dataset.video;
    vid.outerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="Demo video"
      allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  }
});

document.addEventListener("click", (e) => {
  const card = e.target.closest("[data-project]");
  if (card) openProject(card.dataset.project);
});

// ---------- theme ----------
document.getElementById("theme-toggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// ---------- nav: scrolled state, mobile menu, active link ----------
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const menuBtn = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const setMenu = (open) => {
  navLinks.classList.toggle("is-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
};
menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("is-open")));
navLinks.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));

const sectionLinks = [...navLinks.querySelectorAll("a")];
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((a) => a.classList.toggle("is-active", a.hash === `#${entry.target.id}`));
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
["about", "projects", "games", "journey", "contact"].forEach((id) => spy.observe(document.getElementById(id)));

// ---------- copy email ----------
document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = "Copied";
      btn.classList.add("is-done");
      setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("is-done"); }, 1800);
    } catch (e) {}
  });
});

// ---------------------------------------------------------------
// Games — newest first. Each one becomes a cartridge on the shelf;
// the selected one loads into the console.
//
// `embed` is itch.io's embed URL (itch page → Embed → "embed the game";
// itch blocks the raw build when framed elsewhere). `frame` is the Unity
// build's fixed canvas size plus the height of Unity's default footer.
// The console sizes the iframe so the canvas lands exactly in a clip window
// (cropping itch's border/footer bar and Unity's footer), then scales that
// window to fit the screen — so the whole game is always visible.
// ---------------------------------------------------------------
const GAMES = [
  {
    id: "kings-path",
    title: "The King's Path",
    level: "01",
    year: "2026",
    tagline: "A lost king, a long road, and 10,000 gold to collect.",
    description:
      "A path a king would take is not always sunshine and glory. My first game starts with a lost king — how did he end up here, and why? Dodge obstacles and collect 10k gold, but watch out: thrown items can snatch your coins away.",
    cover: "https://img.itch.zone/aW1nLzIzOTQyMDMwLnBuZw==/original/FkhNsj.png",
    coverFallback: "assets/games/kings-path.png",
    embed: "https://itch.io/embed-upload/15448028?color=0a0a0b",
    frame: { width: 960, height: 600, footer: 42 },
    url: "https://lightningboltdev.itch.io/the-kings-path",
    goal: 10000,
    stats: [
      ["Engine", "Unity"],
      ["Genre", "Adventure · Survival"],
      ["Platform", "Browser (HTML5)"],
      ["Goal", "Collect 10,000 gold"],
    ],
    note: "1s of immunity after each hit. No generative AI was used.",
  },
];

function initGames() {
  const arcade = document.getElementById("arcade");
  const screen = document.getElementById("screen");
  const info = document.getElementById("game-info");
  const shelf = document.getElementById("game-shelf");
  const consoleEl = document.getElementById("console");
  const status = document.getElementById("console-status");
  const hint = document.getElementById("console-hint");
  const fsBtn = document.getElementById("console-fullscreen");
  const exitBtn = document.getElementById("console-exit");
  const canEmbed = matchMedia("(hover: hover) and (pointer: fine)").matches; // keyboard game → desktop only
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, reduceMotion ? 0 : ms));
  let current = GAMES[0];
  let counted = false;
  let busy = false;

  const keycaps = `
    <div class="keys" aria-label="Move with W, A, S and D">
      <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>
    </div>`;

  function renderScreen() {
    const g = current;
    screen.innerHTML = `
      <img class="screen__cover" src="${g.cover}" alt="${esc(g.title)} gameplay"
        onerror="this.onerror=null;this.src='${g.coverFallback}'" />
      <div class="screen__fx" aria-hidden="true"></div>
      <span class="hud hud--tl">LVL ${esc(g.level)}</span>
      <span class="hud hud--tr"><span class="coin" aria-hidden="true"></span><span id="gold">${counted ? g.goal.toLocaleString() : "0"}</span></span>
      <a class="press-start" href="${g.url}" target="_blank" rel="noopener" id="press-start">
        <span class="press-start__tri" aria-hidden="true"></span>${canEmbed ? "Press start" : "Play on itch.io"}
      </a>
      <span class="hud hud--bl">${esc(g.title)}</span>`;
  }

  function renderInfo() {
    const g = current;
    info.innerHTML = `
      <div class="cart-label__head">
        <span class="cart-label__level">Level ${esc(g.level)} · ${esc(g.year)}</span>
        <h3 class="cart-label__title">${esc(g.title)}</h3>
      </div>
      <div class="cart-label__body">
        <p class="cart-label__tagline">${esc(g.tagline)}</p>
        <p class="cart-label__desc">${esc(g.description)}</p>
      </div>
      <dl class="cart-label__stats">
        ${g.stats.map(([k, v]) => `<div data-stat="${esc(k.toLowerCase())}"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}
        <div class="cart-label__controls"><dt>Controls</dt><dd>${keycaps}</dd></div>
      </dl>
      <p class="cart-label__note">${esc(g.note)}</p>
      <div class="cart-label__ctas">
        <a class="btn btn--primary btn--small" href="${g.url}" target="_blank" rel="noopener" data-start>
          ${canEmbed ? "Play now" : "Play on itch.io"}
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
        <a class="btn btn--ghost btn--small" href="${g.url}" target="_blank" rel="noopener">itch.io page ${arrowIcon}</a>
      </div>`;
  }

  function renderShelf() {
    shelf.innerHTML = `
      <span class="shelf__label">Cartridges · ${GAMES.length}</span>
      <ul class="shelf__list">
        ${GAMES.map(
          (x) => `<li><button class="cart ${x.id === current.id ? "is-inserted" : ""}" type="button" data-game="${x.id}" aria-pressed="${x.id === current.id}" aria-label="Load ${esc(x.title)}">
            <img src="${x.cover}" alt="" loading="lazy" onerror="this.onerror=null;this.src='${x.coverFallback}'" />
            <span>${esc(x.title)}</span></button></li>`
        ).join("")}
        <li><div class="cart cart--empty" aria-label="Next level in development"><span>LVL ${String(GAMES.length + 1).padStart(2, "0")}</span><small>Loading<i>.</i><i>.</i><i>.</i></small></div></li>
      </ul>`;
  }

  function setBar(playing) {
    fsBtn.hidden = exitBtn.hidden = !playing;
    status.textContent = playing ? `Now playing · ${current.title}` : "Player 1 · Ready";
    hint.textContent = playing ? "Click the game, then use W A S D" : "Controls: W A S D";
  }

  // Gold counter rolls up to the goal the first time the console is on screen
  function countGold() {
    if (counted || !document.getElementById("gold")) return;
    counted = true;
    const goal = current.goal;
    if (reduceMotion) return (document.getElementById("gold").textContent = goal.toLocaleString());
    const t0 = performance.now(), dur = 1600;
    const tick = (now) => {
      const k = Math.min((now - t0) / dur, 1);
      const live = document.getElementById("gold");
      if (live) live.textContent = Math.round(goal * (1 - Math.pow(1 - k, 3))).toLocaleString();
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) { countGold(); obs.disconnect(); }
  }, { threshold: 0.5 }).observe(consoleEl);

  // Keep the game's native-size frame scaled to fill the screen (incl. fullscreen)
  function fitFrame() {
    const frame = screen.querySelector(".game-frame");
    if (!frame) return;
    const { width, height } = current.frame;
    const s = Math.min(screen.clientWidth / width, screen.clientHeight / height);
    frame.style.setProperty("--s", s.toFixed(4));
  }
  new ResizeObserver(fitFrame).observe(screen);

  // Plays a one-shot CSS animation class and resolves when it ends
  const play = (el, cls, ms) => {
    el.classList.add(cls);
    return wait(ms).then(() => el.classList.remove(cls));
  };

  // Press start: side panel squashes away → console grows full-width →
  // game boots in, and the info returns as a compact strip underneath.
  async function start() {
    if (busy) return;
    busy = true;
    counted = true;
    consoleEl.style.transform = "";
    screen.querySelector(".press-start")?.classList.add("is-pressed");

    await Promise.all([play(info, "is-leaving", 280), play(shelf, "is-leaving", 280)]);
    info.hidden = shelf.hidden = true;

    arcade.classList.add("is-playing");
    consoleEl.classList.add("is-playing");
    setBar(true);
    const top = consoleEl.getBoundingClientRect().top + scrollY - parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop || 0);
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    await wait(620);

    // itch's embed page wraps the game in a 1px border with a 20px bar below it
    const { width, height, footer } = current.frame;
    const ITCH_BORDER = 1, ITCH_BAR = 20;
    screen.innerHTML = `
      <div class="game-frame" style="width:${width}px;height:${height}px">
        <iframe src="${current.embed}" title="${esc(current.title)} — playable game" style="width:${width + ITCH_BORDER * 2}px;height:${height + footer + ITCH_BORDER + ITCH_BAR}px;margin:-${ITCH_BORDER}px 0 0 -${ITCH_BORDER}px"
          allow="autoplay; fullscreen *; gamepad"></iframe>
      </div>`;
    fitFrame();
    play(consoleEl, "is-booting", 650);

    info.hidden = false;
    await play(info, "is-entering", 450);
    busy = false;
  }

  async function quit() {
    if (busy) return;
    busy = true;
    if (document.fullscreenElement) await document.exitFullscreen().catch(() => {});
    renderScreen(); // drops the iframe, which stops the game and its audio
    setBar(false);

    await play(info, "is-leaving", 220);
    info.hidden = true;
    arcade.classList.remove("is-playing");
    consoleEl.classList.remove("is-playing");
    await wait(620);

    info.hidden = shelf.hidden = false;
    await Promise.all([play(info, "is-entering", 450), play(shelf, "is-entering", 450)]);
    busy = false;
  }

  document.getElementById("games").addEventListener("click", (e) => {
    if (e.target.closest("#press-start, [data-start]") && canEmbed) {
      e.preventDefault();
      return start();
    }
    const cart = e.target.closest("[data-game]");
    if (cart && cart.dataset.game !== current.id && !busy) {
      current = GAMES.find((x) => x.id === cart.dataset.game);
      renderScreen();
      renderInfo();
      renderShelf();
    }
  });
  exitBtn.addEventListener("click", quit);
  fsBtn.addEventListener("click", () => screen.requestFullscreen?.());

  // Subtle 3D tilt on the idle console
  if (canEmbed && !reduceMotion) {
    consoleEl.addEventListener("pointermove", (e) => {
      if (consoleEl.classList.contains("is-playing") || busy) return;
      const r = consoleEl.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      consoleEl.style.transform = `perspective(1200px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
    });
    consoleEl.addEventListener("pointerleave", () => (consoleEl.style.transform = ""));
  }

  // Pressing W/A/S/D anywhere lights up the matching keycap
  const setKey = (e, down) => {
    if (e.target.closest?.("input, textarea") || e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key.toUpperCase();
    if (!"WASD".includes(k) || k.length !== 1) return;
    info.querySelectorAll(".keys kbd").forEach((kbd) => kbd.textContent === k && kbd.classList.toggle("is-down", down));
  };
  document.addEventListener("keydown", (e) => setKey(e, true));
  document.addEventListener("keyup", (e) => setKey(e, false));

  renderScreen();
  renderInfo();
  renderShelf();
}

// ---------- piano recording ----------
(() => {
  const btn = document.getElementById("piano-btn");
  const audio = document.getElementById("piano-audio");
  const label = document.getElementById("piano-label");
  const fmt = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

  const sync = () => {
    const playing = !audio.paused;
    btn.classList.toggle("is-playing", playing);
    btn.setAttribute("aria-pressed", String(playing));
    btn.setAttribute("aria-label", playing ? "Pause my piano recording" : "Play my piano recording");
  };

  btn.addEventListener("click", () => {
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  });
  audio.addEventListener("play", sync);
  audio.addEventListener("pause", sync);
  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    btn.style.setProperty("--p", `${(audio.currentTime / audio.duration) * 100}%`);
    label.textContent = `-${fmt(audio.duration - audio.currentTime)}`;
  });
  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    btn.style.setProperty("--p", "0%");
    label.textContent = "Listen";
  });
})();

// ---------- bolt cursor: click the logo to summon (or dismiss) it ----------
// A random spot on screen charges up, lightning strikes the cursor, and the
// cursor becomes a bolt. Clicking again sends the bolt back out. Every visit
// starts charged (normal cursor, orbiting ring). Touch devices get a quick flash.
(() => {
  const brand = document.querySelector(".brand");
  const root = document.documentElement;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let busy = false;

  const setTitle = () =>
    (brand.title = root.classList.contains("bolt-cursor") ? "Back to the regular cursor" : "Summon the bolt cursor");
  try { localStorage.removeItem("boltCursor"); } catch (e) {} // clear the setting older versions saved
  if (fine) setTitle();

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const svgNS = "http://www.w3.org/2000/svg";
  const el = (tag, cls, parent) => {
    const n = tag === "div" ? document.createElement("div") : document.createElementNS(svgNS, tag);
    if (cls) n.setAttribute("class", cls);
    parent.appendChild(n);
    return n;
  };

  // Jagged lightning between two points (midpoint displacement)
  function lightning(a, b, roughness = 0.2, depth = 6) {
    let pts = [a, b];
    let off = Math.hypot(b.x - a.x, b.y - a.y) * roughness;
    for (let i = 0; i < depth; i++) {
      const next = [pts[0]];
      for (let j = 0; j < pts.length - 1; j++) {
        const p = pts[j], q = pts[j + 1];
        const dx = q.x - p.x, dy = q.y - p.y, len = Math.hypot(dx, dy) || 1;
        const o = (Math.random() * 2 - 1) * off;
        next.push({ x: (p.x + q.x) / 2 - (dy / len) * o, y: (p.y + q.y) / 2 + (dx / len) * o }, q);
      }
      pts = next;
      off /= 2;
    }
    return pts;
  }
  const toD = (pts) => "M" + pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join("L");

  // Main bolt plus a couple of forks peeling off it
  function boltD(a, b) {
    const main = lightning(a, b);
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    const ang = Math.atan2(b.y - a.y, b.x - a.x);
    const forks = [0, 1].map(() => {
      const s = main[8 + Math.floor(Math.random() * (main.length - 24))];
      const t = ang + (Math.random() < 0.5 ? -1 : 1) * (0.35 + Math.random() * 0.45);
      const l = len * (0.12 + Math.random() * 0.16);
      return toD(lightning(s, { x: s.x + Math.cos(t) * l, y: s.y + Math.sin(t) * l }, 0.25, 4));
    });
    return { main: toD(main), forks: forks.join("") };
  }

  // Little arcs crackling around a point while it charges
  const crackleD = (c) =>
    [0, 1, 2]
      .map(() => {
        const t = Math.random() * Math.PI * 2, r1 = 14 + Math.random() * 10, r2 = 38 + Math.random() * 30;
        return toD(lightning({ x: c.x + Math.cos(t) * r1, y: c.y + Math.sin(t) * r1 }, { x: c.x + Math.cos(t + 0.4) * r2, y: c.y + Math.sin(t + 0.4) * r2 }, 0.3, 3));
      })
      .join("");

  // A random spot far enough from the cursor for a satisfying strike
  function randomSpot(c) {
    const w = innerWidth, h = innerHeight;
    let best = null;
    for (let i = 0; i < 24; i++) {
      const p = { x: w * (0.12 + Math.random() * 0.76), y: h * (0.18 + Math.random() * 0.68) };
      const d = Math.hypot(p.x - c.x, p.y - c.y);
      if (!best || d > best.d) best = { ...p, d };
      if (d > Math.min(w, h) * 0.55) break;
    }
    return best;
  }

  async function strike(on, cursor) {
    busy = true;
    const spot = randomSpot(cursor);
    const from = on ? spot : cursor;
    const to = on ? cursor : spot;

    const fx = el("div", "zap", document.body);
    const orb = el("div", "zap__orb", fx);
    orb.style.left = `${from.x}px`;
    orb.style.top = `${from.y}px`;
    const svg = el("svg", "zap__svg", fx);
    svg.setAttribute("viewBox", `0 0 ${innerWidth} ${innerHeight}`);
    const crackle = el("path", "zap__crackle", svg);
    const glow = el("path", "zap__glow", svg);
    const core = el("path", "zap__core", svg);
    const forks = el("path", "zap__fork", svg);
    for (const p of [glow, core, forks]) p.setAttribute("pathLength", "1");

    // 1. The storm gathers: screen dims, the spot charges with crackling arcs
    fx.classList.add("is-charging");
    const crackler = setInterval(() => crackle.setAttribute("d", crackleD(from)), 60);
    await sleep(on ? 520 : 320);
    clearInterval(crackler);
    crackle.remove();

    // 2. Strike: the bolt races to its target, re-forming a few times as it flickers
    const draw = () => {
      const d = boltD(from, to);
      glow.setAttribute("d", d.main);
      core.setAttribute("d", d.main);
      forks.setAttribute("d", d.forks);
    };
    draw();
    fx.classList.add("is-striking");
    await sleep(90);

    // 3. Impact: burst + sparks where it lands; the cursor changes on contact
    root.classList.toggle("bolt-cursor", on);
    if (!on) brand.classList.remove("is-spent"); // ring recharges as the bolt leaves
    setTitle();
    const burst = el("div", "zap__burst", fx);
    burst.style.left = `${to.x}px`;
    burst.style.top = `${to.y}px`;
    for (let i = 0; i < 12; i++) {
      const s = el("div", "zap__spark", burst);
      const t = (i / 12) * Math.PI * 2 + Math.random() * 0.4;
      const r = 26 + Math.random() * 34;
      s.style.setProperty("--dx", `${Math.cos(t) * r}px`);
      s.style.setProperty("--dy", `${Math.sin(t) * r}px`);
      s.style.setProperty("--rot", `${t}rad`);
    }
    for (const wait of [70, 60, 80]) {
      await sleep(wait);
      draw();
    }

    // 4. Fade out
    fx.classList.add("is-done");
    await sleep(450);
    fx.remove();
    busy = false;
  }

  brand.addEventListener("click", (e) => {
    if (!fine || reduce) {
      if (fine) {
        root.classList.toggle("bolt-cursor");
        setTitle();
      }
      if (reduce) return;
      const f = document.createElement("div");
      f.className = "flash";
      document.body.appendChild(f);
      f.addEventListener("animationend", () => f.remove());
      return;
    }
    if (busy) return;
    const on = !root.classList.contains("bolt-cursor");
    let cursor = { x: e.clientX, y: e.clientY };
    if (!e.detail) {
      // keyboard activation: strike the logo itself
      const r = brand.querySelector(".brand__mark").getBoundingClientRect();
      cursor = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
    if (on) brand.classList.add("is-spent"); // the charged ring discharges into the strike
    strike(on, cursor);
  });
})();

// ---------- bench press: hover to press the bar up, leave to lower it ----------
(() => {
  const item = document.getElementById("lift");
  if (!item) return;
  const upper = document.getElementById("lift-upper");
  const fore = document.getElementById("lift-fore");
  const bar = document.getElementById("lift-bar");
  const hint = document.getElementById("lift-hint");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = matchMedia("(hover: hover)").matches;
  const restHint = canHover ? "Hover to spot me" : "Tap to spot me";

  const SHOULDER = { x: 38, y: 33.5 };
  const UPPER = 10, FORE = 14; // arm segment lengths
  const CHEST = { x: 42, y: 26.5 }; // bar touching the chest
  const LOCKOUT = { x: 39, y: 10.5 }; // arms extended
  const UP_MS = 750, DOWN_MS = 520; // pressing is a grind; lowering is controlled

  let p = 0, target = 0, raf = 0, last = 0;
  const waiters = [];

  // Two-bone IK: put the hand on the bar and bend the elbow toward the feet
  function pose(t) {
    const k = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // ease in-out
    const hx = CHEST.x + (LOCKOUT.x - CHEST.x) * k;
    const hy = CHEST.y + (LOCKOUT.y - CHEST.y) * k;
    const dx = hx - SHOULDER.x, dy = hy - SHOULDER.y;
    const d = Math.min(Math.hypot(dx, dy), UPPER + FORE - 0.01);
    const bend = Math.acos((UPPER * UPPER + d * d - FORE * FORE) / (2 * UPPER * d));
    const a = Math.atan2(dy, dx) + bend;
    const ex = SHOULDER.x + Math.cos(a) * UPPER, ey = SHOULDER.y + Math.sin(a) * UPPER;
    upper.setAttribute("x2", ex.toFixed(2));
    upper.setAttribute("y2", ey.toFixed(2));
    fore.setAttribute("x1", ex.toFixed(2));
    fore.setAttribute("y1", ey.toFixed(2));
    fore.setAttribute("x2", hx.toFixed(2));
    fore.setAttribute("y2", hy.toFixed(2));
    bar.setAttribute("transform", `translate(${hx.toFixed(2)} ${hy.toFixed(2)})`);
  }

  function settle() {
    const locked = p === 1;
    item.classList.toggle("is-locked", locked);
    item.classList.remove("is-pushing");
    hint.textContent = locked ? "Lockout ✓ 225 lb" : restHint;
    while (waiters.length) waiters.shift()();
  }

  function step(now) {
    const dt = now - last;
    last = now;
    const dir = Math.sign(target - p);
    p = Math.min(1, Math.max(0, p + dir * dt / (dir > 0 ? UP_MS : DOWN_MS)));
    item.classList.toggle("is-pushing", dir > 0 && p > 0.15 && p < 0.92);
    pose(p);
    if (p === target) {
      raf = 0;
      settle();
    } else {
      raf = requestAnimationFrame(step);
    }
  }

  // Move toward up (1) or down (0); resolves when the bar gets there
  function go(to) {
    target = to;
    if (reduce) {
      p = to;
      pose(p);
      settle();
      return Promise.resolve();
    }
    const done = new Promise((r) => waiters.push(r));
    if (!raf && p !== target) {
      last = performance.now();
      raf = requestAnimationFrame(step);
    } else if (p === target) {
      settle();
    }
    return done;
  }

  item.addEventListener("pointerenter", (e) => e.pointerType === "mouse" && go(1));
  item.addEventListener("pointerleave", (e) => e.pointerType === "mouse" && go(0));
  // keyboard focus presses it (a tap also focuses, but that's handled by click)
  item.addEventListener("focus", () => item.matches(":focus-visible") && go(1));
  item.addEventListener("blur", () => go(0));
  // touch screens: tap to press / tap to lower
  item.addEventListener("click", () => !canHover && go(target === 1 ? 0 : 1));

  // The hero's "225 lb Bench PR" line calls for a couple of reps
  item.addEventListener("beckon", async () => {
    await new Promise((r) => setTimeout(r, 650)); // let the scroll land
    for (let rep = 0; rep < 2; rep++) {
      await go(1);
      await new Promise((r) => setTimeout(r, 260));
      await go(0);
      await new Promise((r) => setTimeout(r, 180));
    }
  });

  hint.textContent = restHint;
  pose(0);
})();

// ---------- hero chip: rotating specialities ----------
// Each line swaps in every few seconds (the bar along the bottom shows when).
// Hover pauses it; clicking jumps to the proof (a section, a project modal,
// or another page via `href`). Add or reorder lines here.
const SPECIALITIES = [
  { icon: "trophy", title: "1st Place", sub: "EOG Resources · HackUTD XI", project: "pipebrains" },
  { icon: "gamepad", title: "Game Developer", sub: "The King's Path — playable here", scroll: "#games" },
  { icon: "barbell", title: "225 lb Bench PR", sub: "Two plates a side — watch a rep ↓", scroll: ".beyond", beckon: "#lift" },
  { icon: "network", title: "Applied ML", sub: "Five models, one diagnosis app", project: "aignosis" },
  {
    icon: "book", title: "Sci-fi Bookworm", href: "books.html",
    sub: window.BOOKS?.length ? `${window.BOOKS.length} books rated & reviewed — see the shelf` : "Rated & reviewed — see the shelf",
  },
  { icon: "music", title: "Piano Connoisseur", sub: "Hear me play ↓", scroll: ".beyond", beckon: "#piano-btn" },
  { icon: "bot", title: "Bot Builder", sub: "Zeus serves 800+ CS students", project: "zeus" },
  { icon: "medal", title: "3× Hackathon Podium", sub: "HackUTD · TAMUhack · Axxess", scroll: "#journey" },
  { icon: "code", title: "Self-taught Full-Stack", sub: "Zero to shipped in one summer", scroll: "#projects" },
  { icon: "coin", title: "Coin Collector", sub: "Numismatics — old is gold", scroll: ".beyond" },
  { icon: "pen", title: "Novelist in Progress", sub: "Writing Golden Amulet", scroll: ".beyond" },
];

const CHIP_ICONS = {
  trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3"/>',
  gamepad: '<rect x="2" y="7" width="20" height="11" rx="4"/><path d="M7 10.5v4M5 12.5h4"/><circle cx="15.5" cy="11" r=".6"/><circle cx="18" cy="14" r=".6"/>',
  network: '<circle cx="5" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><path d="m6.6 7.3 3.8 3.4M6.6 16.7l3.8-3.4M14 12h3"/>',
  music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4v4M9 13v1M15 13v1M9.5 17h5"/><circle cx="12" cy="3.5" r="1"/>',
  medal: '<circle cx="12" cy="15" r="6"/><path d="M8.5 9.8 6 2h4l2 5 2-5h4l-2.5 7.8"/><path d="m12 12.6.8 1.5 1.6.3-1.1 1.1.2 1.6-1.5-.7-1.5.7.2-1.6-1.1-1.1 1.6-.3Z"/>',
  code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  barbell: '<path d="M2 12h20M6 7v10M9 5.5v13M18 7v10M15 5.5v13"/>',
  coin: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/><path d="M12 9.5v5"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/><path d="M9 7h7"/>',
};

(() => {
  const chip = document.getElementById("hero-chip");
  if (!chip) return;
  const icon = chip.querySelector(".award-chip__icon svg");
  const text = chip.querySelector(".award-chip__text");
  const bar = chip.querySelector(".award-chip__progress");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let i = 0;
  let swapping = false;

  const lines = (item) => `<strong>${esc(item.title)}</strong><small>${esc(item.sub)}</small>`;
  const fill = (item) => {
    icon.innerHTML = CHIP_ICONS[item.icon];
    text.innerHTML = lines(item);
    chip.setAttribute("aria-label", `${item.title} — ${item.sub}`);
    chip.setAttribute("href", item.href || "#projects"); // a real link while a page line shows
  };

  // Natural width of the chip with a given line, measured on an invisible copy
  const widthFor = (item) => {
    const ghost = chip.cloneNode(true);
    ghost.removeAttribute("id");
    ghost.querySelector(".award-chip__text").innerHTML = lines(item);
    Object.assign(ghost.style, { width: "auto", visibility: "hidden", pointerEvents: "none" });
    ghost.setAttribute("aria-hidden", "true");
    chip.after(ghost);
    const w = ghost.offsetWidth;
    ghost.remove();
    return w;
  };

  // Resize smoothly so the chip is already the right size when the new line lands
  const resizeTo = (to) => {
    chip.style.width = `${chip.offsetWidth}px`;
    chip.offsetWidth; // commit the starting width
    chip.style.width = `${to}px`;
  };

  async function next() {
    if (swapping) return;
    swapping = true;
    i = (i + 1) % SPECIALITIES.length;
    resizeTo(widthFor(SPECIALITIES[i]));
    if (!reduce) {
      chip.classList.add("is-out");
      await new Promise((r) => setTimeout(r, 260));
      chip.classList.remove("is-out");
    }
    fill(SPECIALITIES[i]);
    if (!reduce) {
      chip.classList.add("is-in");
      setTimeout(() => chip.classList.remove("is-in"), 520);
    }
    // restart the countdown bar
    bar.style.animation = "none";
    bar.offsetWidth;
    bar.style.animation = "";
    swapping = false;
  }

  // The countdown bar's animation drives the rotation, so hovering
  // (which pauses the bar) pauses the swaps too
  if (reduce) {
    setInterval(() => !chip.matches(":hover, :focus-visible, .is-paused") && next(), 5000);
  } else {
    bar.addEventListener("animationend", next);
  }

  // Don't spin while the hero is off screen
  new IntersectionObserver(([e]) => chip.classList.toggle("is-paused", !e.isIntersecting)).observe(chip);

  chip.addEventListener("click", (e) => {
    const item = SPECIALITIES[i];
    if (item.href) return; // let the link navigate (keeps Ctrl/middle-click behaviour)
    e.preventDefault();
    if (item.project) return openProject(item.project);
    const target = document.querySelector(item.scroll);
    target?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: item.beckon ? "center" : "start" });
    if (item.beckon) {
      const el = document.querySelector(item.beckon);
      el?.classList.remove("is-beckoning");
      el?.offsetWidth;
      el?.classList.add("is-beckoning");
      el?.dispatchEvent(new CustomEvent("beckon"));
      setTimeout(() => el?.classList.remove("is-beckoning"), 2600);
    }
  });

  // hand width back to the content once a resize finishes
  chip.addEventListener("transitionend", (e) => e.propertyName === "width" && (chip.style.width = ""));
  fill(SPECIALITIES[0]);
})();

// ---------- journey: fold entries older than the last 4 years ----------
(() => {
  const list = document.getElementById("timeline");
  if (!list) return;
  const cutoff = new Date().getFullYear() - 3;
  const yearOf = (li) => parseInt(li.querySelector(".timeline__year").textContent, 10);
  const older = [...list.children].filter((li) => yearOf(li) < cutoff);
  if (!older.length) return;

  const years = older.map(yearOf);
  const range = `${Math.min(...years)}–${String(Math.max(...years)).slice(-2)}`;
  const closedSub = `${older.length} more milestones · ${years.join(" · ")}`;
  const more = document.createElement("div");
  more.className = "timeline-more";
  more.innerHTML = `
    <button class="timeline-toggle" type="button" aria-expanded="false" aria-controls="timeline-older">
      <span class="timeline-toggle__range">${range}</span>
      <span class="timeline-toggle__arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg></span>
      <span class="timeline-toggle__text"><strong>Earlier years</strong><small>${closedSub}</small></span>
    </button>
    <div class="timeline-older-wrap"><ol class="timeline timeline--older" id="timeline-older" inert></ol></div>`;
  const olderList = more.querySelector("ol");
  older.forEach((li) => olderList.appendChild(li));
  list.after(more);

  const btn = more.querySelector("button");
  const title = more.querySelector(".timeline-toggle__text strong");
  const sub = more.querySelector(".timeline-toggle__text small");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  btn.addEventListener("click", () => {
    const open = more.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
    olderList.inert = !open;
    title.textContent = open ? "Fold earlier years" : "Earlier years";
    sub.textContent = open ? "Back to the last four" : closedSub;
    // glide down so the past scrolls into view as it unfolds
    if (open) window.scrollBy({ top: Math.min(olderList.scrollHeight, innerHeight * 0.55), behavior: reduce ? "auto" : "smooth" });
  });
})();

// ---------- reading hobby: live count + latest read from the bookshelf data ----------
(() => {
  const books = window.BOOKS;
  if (!books?.length) return;
  document.getElementById("reading-count").textContent = `${books.length} books`;
  const latest = [...books].sort((a, b) => (b.dateRead || "").localeCompare(a.dateRead || ""))[0];
  document.getElementById("reading-latest").innerHTML = `, latest: <em>${esc(latest.title)}</em>`;

  // Fanned stack of the latest covers inside the "Open my bookshelf" pill, plus "+N more"
  const recent = [...books].sort((a, b) => (b.dateRead || "").localeCompare(a.dateRead || "")).filter((b) => b.cover).slice(0, 4);
  const tilt = [-10, -4, 3, 9];
  const small = (url) => url.replace(/-L\.jpg$/, "-M.jpg"); // Open Library's medium size is plenty here
  document.getElementById("reading-covers").innerHTML =
    recent.map((b, i) => `<img src="${small(b.cover)}" alt="" loading="lazy" style="--i:${i};--r:${tilt[i]}deg" />`).join("") +
    (books.length > recent.length ? `<span class="reading__more" style="--i:${recent.length};--r:0deg">+${books.length - recent.length}</span>` : "");

  // First time it's on screen: deal the covers in and let the book peek open; glint while visible
  const item = document.querySelector(".reading");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let seen = false;
  new IntersectionObserver(([e]) => {
    item.classList.toggle("is-live", e.isIntersecting);
    if (!e.isIntersecting || seen) return;
    seen = true;
    item.classList.add("is-dealt");
    if (reduce) return;
    setTimeout(() => item.classList.add("is-peeking"), 500);
    setTimeout(() => item.classList.remove("is-peeking"), 2300);
  }, { threshold: 0.6 }).observe(item);
})();

// ---------- init ----------
renderProjects();
initOrbs();
initPeek();
initGames();
document.getElementById("year").textContent = new Date().getFullYear();

const revealer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        revealer.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "0px 0px -8% 0px" }
);
document.querySelectorAll("main > section:not(.hero) .reveal").forEach((el, i) => {
  // light stagger for elements revealed together (e.g. hero, card grid)
  el.style.transitionDelay = `${Math.min(i % 4, 3) * 60}ms`;
  revealer.observe(el);
});

// Deep link: arvindh.dev/#pipebrains opens that project
const deep = location.hash.slice(1);
if (PROJECTS.some((p) => p.id === deep)) openProject(deep);
