// ---------------------------------------------------------------
// Projects reel: the featured projects orbit a particle lightning
// bolt while the section is pinned. Scrolling swings the next card in
// along a helix; between projects the bolt bursts into a swirl and
// re-forms, tinted for the project in front.
//
// Cards are real buttons (CSS 3D), so they stay clickable, focusable
// and crisp; the bolt is a WebGL point cloud drawn behind them.
// With reduced motion the reel stays hidden and main.js's card grid
// is shown instead. Without WebGL the cards still orbit, minus the bolt.
// ---------------------------------------------------------------
(() => {
  const reel = document.getElementById("reel");
  if (!reel || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const items = PROJECTS.filter((p) => !p.archived);
  const N = items.length;
  if (N < 2) return;

  // Storm color per project, in order; a project's `tint` overrides it
  const PALETTE = ["#facc15", "#38bdf8", "#a78bfa", "#fb923c", "#4ade80", "#f472b6"];
  const hexRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const tints = items.map((p, i) => hexRgb(p.tint || PALETTE[i % PALETTE.length]));

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const pad = (n) => String(n).padStart(2, "0");

  const stage = reel.querySelector(".reel__stage");
  const track = document.getElementById("reel-track");
  const rail = document.getElementById("reel-rail");
  const caption = document.getElementById("reel-caption");
  const titleEl = document.getElementById("reel-title");
  const awardEl = document.getElementById("reel-award");
  const taglineEl = document.getElementById("reel-tagline");
  const countEl = document.getElementById("reel-count");
  const bar = document.getElementById("reel-bar");
  const stepBtns = [...reel.querySelectorAll("[data-step]")];

  track.innerHTML = items
    .map(
      (p, i) => `
      <button class="reel-card" type="button" data-reel="${i}" aria-haspopup="dialog" aria-label="${esc(p.title)}: ${esc(p.tagline)}"
        style="--card-tint:${tints[i].map((c) => Math.round(c * 255)).join(" ")}">
        <span class="reel-card__media"><img src="${p.image}" alt="" ${imgPos(p)} /></span>
        <span class="reel-card__hatch"></span>
        <span class="reel-card__sheen"></span>
        <span class="reel-card__top" aria-hidden="true"><span>${pad(i + 1)}</span><span>${esc(p.meta.split(" · ")[0])}</span></span>
        <span class="reel-card__name" aria-hidden="true">${esc(p.title)}</span>
        <span class="reel-card__view" aria-hidden="true">View project ${arrowIcon}</span>
      </button>`
    )
    .join("");
  rail.innerHTML = items
    .map((p, i) => `<li><button type="button" tabindex="-1" data-go="${i}"><span>${esc(p.title)}</span></button></li>`)
    .join("");
  const cards = [...track.children];
  const ticks = [...rail.querySelectorAll("button")];

  reel.style.setProperty("--reel-steps", N - 1);
  reel.hidden = false;
  document.getElementById("project-list").hidden = true;

  // ---------- layout ----------
  // Fractions of the stage: where the bolt sits (axis, boltY, bolt = half-height
  // of vh) and the helix the cards ride (radius of vw, rise of vh per card,
  // a0/step in radians around the bolt).
  const LAYOUTS = {
    wide: { axis: -0.13, boltY: 0, bolt: 0.29, cardY: -0.03, a0: 0.42, step: 0.85, radius: 0.66, rise: 0.42 },
    narrow: { axis: 0, boltY: -0.12, bolt: 0.2, cardY: 0.03, a0: 0, step: 0.95, radius: 0.95, rise: 0.4 },
  };
  const narrowMq = matchMedia("(max-width: 760px)");
  let L = LAYOUTS.wide, vw = 0, vh = 0, span = 1;

  function measure() {
    vw = stage.clientWidth;
    vh = stage.clientHeight;
    L = narrowMq.matches ? LAYOUTS.narrow : LAYOUTS.wide;
    span = Math.max(1, reel.offsetHeight - vh);
    const cardW = narrowMq.matches ? Math.min(vw * 0.78, 420) : clamp(vw * 0.4, 380, 600);
    stage.style.setProperty("--card-w", `${Math.round(cardW)}px`);
    if (gl) sizeCanvas();
  }

  // Scroll → position (0 … N-1). Each step holds still near its ends, so a
  // card dwells at the front before the next one swings in.
  function target() {
    const r = clamp(-reel.getBoundingClientRect().top / span, 0, 1) * (N - 1);
    const i = Math.min(Math.floor(r), N - 2);
    return i + smooth(0.2, 0.8, r - i);
  }

  const goTo = (i) =>
    scrollTo({ top: reel.getBoundingClientRect().top + scrollY + (clamp(i, 0, N - 1) / (N - 1)) * span, behavior: "smooth" });

  function placeCards(pos, tiltX, tiltY) {
    const R = L.radius * vw, ax = L.axis * vw, rise = L.rise * vh, cy = L.cardY * vh;
    cards.forEach((el, i) => {
      const d = i - pos;
      const a = L.a0 + d * L.step;
      const x = ax + Math.sin(a) * R;
      const z = (Math.cos(a) - 1) * R;
      const y = cy + d * rise;
      // passed cards fade fast as they sweep up; upcoming ones linger in the haze
      const o = d < 0 ? 1 - smooth(0.25, 0.9, -d) : 1 - smooth(0.5, 2.1, d);
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${(a * 0.5).toFixed(4)}rad)`;
      el.style.opacity = o.toFixed(3);
      el.style.pointerEvents = o < 0.35 ? "none" : "";
    });
    track.style.transform = `rotateX(${(tiltY * -3).toFixed(2)}deg) rotateY(${(tiltX * 4).toFixed(2)}deg)`;
  }

  // ---------- caption ----------
  let active = -1;
  function setActive(i) {
    active = i;
    const p = items[i];
    cards.forEach((c, k) => c.classList.toggle("is-active", k === i));
    ticks.forEach((t, k) => t.classList.toggle("is-on", k === i));
    countEl.textContent = `${pad(i + 1)} / ${pad(N)}`;
    awardEl.innerHTML = p.award ? `${boltIcon}${esc(p.award)}` : esc(p.meta);
    taglineEl.textContent = p.tagline;
    scramble(titleEl, p.title);
    caption.classList.remove("is-swap");
    void caption.offsetWidth; // restart the fade-in
    caption.classList.add("is-swap");
    stepBtns.forEach((b) => (b.disabled = i + +b.dataset.step < 0 || i + +b.dataset.step > N - 1));
  }

  // ---------- input ----------
  track.addEventListener("click", (e) => {
    const card = e.target.closest(".reel-card");
    if (!card) return;
    const i = +card.dataset.reel;
    i === active ? openProject(items[i].id) : goTo(i);
  });
  // Tabbing onto a card brings it to the front
  track.addEventListener("focusin", (e) => {
    const card = e.target.closest(".reel-card");
    if (card && card.matches(":focus-visible") && +card.dataset.reel !== active) goTo(+card.dataset.reel);
  });
  stepBtns.forEach((b) => b.addEventListener("click", () => goTo(active + +b.dataset.step)));
  rail.addEventListener("click", (e) => {
    const t = e.target.closest("[data-go]");
    if (t) goTo(+t.dataset.go);
  });

  // Pointer: tilts the orbit, lights a sheen on the card under it, and stirs the
  // bolt's particles (see stir() below). px/py are px from mid-stage, vx/vy px/s.
  const ptr = { x: 0, y: 0, tx: 0, ty: 0, px: 0, py: 0, vx: 0, vy: 0, t: 0, in: false };
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    stage.addEventListener("pointermove", (e) => {
      const r = stage.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
      const now = performance.now() / 1000, dt = now - ptr.t;
      // velocity, smoothed so one jumpy event can't fling the whole bolt
      if (ptr.in && dt > 0 && dt < 0.1) {
        const k = Math.min(1, dt * 20);
        ptr.vx += ((x - ptr.px) / dt - ptr.vx) * k;
        ptr.vy += ((y - ptr.py) / dt - ptr.vy) * k;
      }
      Object.assign(ptr, { px: x, py: y, t: now, in: true, tx: x / (r.width / 2), ty: y / (r.height / 2) });
      const card = e.target.closest(".reel-card");
      if (card) {
        const cr = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${(((e.clientX - cr.left) / cr.width) * 100).toFixed(1)}%`);
        card.style.setProperty("--my", `${(((e.clientY - cr.top) / cr.height) * 100).toFixed(1)}%`);
      }
    });
    stage.addEventListener("pointerleave", () => Object.assign(ptr, { tx: 0, ty: 0, vx: 0, vy: 0, in: false }));
  }

  // ---------- the bolt: a WebGL point cloud ----------
  const canvas = document.getElementById("reel-gl");
  let gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: true, powerPreference: "high-performance" });
  let uni = {}, count = 0, dpr = 1, home, off, vel, dirs, stirBuf;

  const VERT = `
    attribute vec3 aPos;
    attribute vec4 aSeed;   // phase, size, burst direction (two angles)
    attribute float aKind;  // 0 bolt body, 1 bolt edge, 2 ambient dust
    attribute vec2 aStir;   // spring offset from the pointer, CSS px (see stir())
    uniform vec2 uView, uCenter;  // CSS px; center measured from mid-stage
    uniform float uScale, uTime, uSpin, uBurst, uDpr;
    uniform vec3 uTint;
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      float dust = step(1.5, aKind);
      float edge = step(0.5, aKind) * (1.0 - dust);
      float size = aSeed.y * aSeed.y * aSeed.y;  // mostly fine grains, a few big motes
      vec3 p = aPos;

      // drift: layered sines stand in for curl noise; dust also rises slowly
      float t = uTime * 0.5 + aSeed.x * 6.2831;
      p += vec3(sin(t + p.y * 2.7), cos(t * 0.9 + p.x * 2.3), sin(t * 0.7 + p.z * 3.1)) * mix(0.012, 0.07, dust);
      p.y = mix(p.y, mod(p.y + 2.0 + uTime * 0.025 * (0.4 + aSeed.y), 4.0) - 2.0, dust);

      // burst: bolt particles fly out along their own direction, then re-form
      float th = aSeed.z * 6.2831, ph = acos(aSeed.w * 2.0 - 1.0);
      vec3 dir = vec3(sin(ph) * cos(th), cos(ph), sin(ph) * sin(th));
      p += dir * uBurst * (1.0 - dust) * (0.45 + aSeed.y * 1.5);

      // spin around the vertical axis; bursting particles shear into a swirl
      // (stir() repeats this projection on the CPU; keep the two in step)
      float a = uSpin * mix(1.0, 0.2, dust) + uBurst * (1.0 - dust) * (aSeed.y - 0.5) * 2.4;
      float c = cos(a), s = sin(a);
      p = vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
      p.z = min(p.z, 2.4);

      float persp = 3.2 / (3.2 - p.z);
      vec2 px = uCenter + vec2(p.x, -p.y) * uScale * persp + aStir;
      float energy = clamp(length(aStir) / 120.0, 0.0, 1.0);  // stirred particles flare

      gl_Position = vec4(px / (uView * 0.5) * vec2(1.0, -1.0), 0.0, 1.0);
      gl_PointSize = (1.3 + size * 4.5 + edge * 0.7) * persp * uDpr * (1.0 + energy * aSeed.y * 1.2);
      float twinkle = 0.65 + 0.35 * sin(uTime * 2.4 + aSeed.x * 37.0);
      vec3 hot = vec3(1.0, 0.96, 0.84);
      vColor = mix(mix(mix(hot, uTint, 0.2 + aSeed.w * 0.65), uTint, dust * 0.5), hot, energy * 0.5);
      vAlpha = twinkle * mix(0.22 + edge * 0.5, 0.3, dust) * clamp(persp, 0.4, 1.5) * (1.0 + energy * 0.8);
    }`;

  const FRAG = `
    precision mediump float;
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
      float a = smoothstep(0.5, 0.05, length(gl_PointCoord - 0.5)) * vAlpha;
      gl_FragColor = vec4(vColor * a, a);
    }`;

  // The bolt from the site's sprite, centered; LENGTH and WIDTH reshape it (1 = the logo's proportions)
  const LENGTH = 1.25, WIDTH = 0.78;
  const BOLT = [[13.5, 2], [4.5, 13.5], [10.75, 13.5], [9.5, 22], [18.5, 10.5], [12.25, 10.5]].map(([x, y]) => [
    ((x - 11.5) / 10) * WIDTH,
    ((12 - y) / 10) * LENGTH,
  ]);
  const inBolt = (x, y) => {
    let hit = false;
    for (let i = 0, j = BOLT.length - 1; i < BOLT.length; j = i++) {
      const [xi, yi] = BOLT[i], [xj, yj] = BOLT[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
    }
    return hit;
  };

  function particles(n) {
    const data = new Float32Array(n * 8);
    const segs = BOLT.map((a, i) => [a, BOLT[(i + 1) % BOLT.length]]);
    const lens = segs.map(([a, b]) => Math.hypot(b[0] - a[0], b[1] - a[1]));
    const perimeter = lens.reduce((s, l) => s + l, 0);
    for (let k = 0; k < n; k++) {
      const r = Math.random();
      const kind = r < 0.55 ? 0 : r < 0.75 ? 1 : 2;
      let x, y, z;
      if (kind === 0) {
        do { x = (Math.random() * 1.4 - 0.7) * WIDTH; y = (Math.random() * 2 - 1) * LENGTH; } while (!inBolt(x, y));
        z = (Math.random() - 0.5) * 0.22;
      } else if (kind === 1) {
        let d = Math.random() * perimeter, s = 0;
        while (s < lens.length - 1 && d > lens[s]) d -= lens[s++];
        const [a, b] = segs[s], t = d / lens[s];
        x = a[0] + (b[0] - a[0]) * t;
        y = a[1] + (b[1] - a[1]) * t;
        z = (Math.random() - 0.5) * 0.16;
      } else {
        x = (Math.random() - 0.5) * 7;
        y = (Math.random() - 0.5) * 4;
        z = Math.random() * 3.4 - 2;
      }
      data.set([x, y, z, Math.random(), Math.random(), Math.random(), Math.random(), kind], k * 8);
    }
    return data;
  }

  function initGL() {
    const prog = gl.createProgram();
    for (const [type, src] of [[gl.VERTEX_SHADER, VERT], [gl.FRAGMENT_SHADER, FRAG]]) {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(sh));
      gl.attachShader(prog, sh);
    }
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false;
    gl.useProgram(prog);

    count = narrowMq.matches ? 7000 : 16000;
    home = particles(count);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, home, gl.STATIC_DRAW);
    [["aPos", 3, 0], ["aSeed", 4, 3], ["aKind", 1, 7]].forEach(([name, size, offset]) => {
      const loc = gl.getAttribLocation(prog, name);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 32, offset * 4);
    });

    // Spring state for stir(), plus each particle's burst direction (as in the shader)
    off = new Float32Array(count * 2);
    vel = new Float32Array(count * 2);
    dirs = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const th = home[i * 8 + 5] * Math.PI * 2, ph = Math.acos(home[i * 8 + 6] * 2 - 1);
      dirs.set([Math.sin(ph) * Math.cos(th), Math.cos(ph), Math.sin(ph) * Math.sin(th)], i * 3);
    }
    stirBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, stirBuf);
    gl.bufferData(gl.ARRAY_BUFFER, off, gl.DYNAMIC_DRAW);
    const stirLoc = gl.getAttribLocation(prog, "aStir");
    gl.enableVertexAttribArray(stirLoc);
    gl.vertexAttribPointer(stirLoc, 2, gl.FLOAT, false, 0, 0);

    ["uView", "uCenter", "uScale", "uTime", "uSpin", "uBurst", "uDpr", "uTint"].forEach(
      (name) => (uni[name] = gl.getUniformLocation(prog, name))
    );
    // Additive light; colors stay premultiplied so overlaps glow instead of clipping oddly
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    return true;
  }

  function sizeCanvas() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(vw * dpr);
    canvas.height = Math.round(vh * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function draw(time, burst, spin, tint) {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(uni.uView, vw, vh);
    gl.uniform2f(uni.uCenter, L.axis * vw, L.boltY * vh);
    gl.uniform1f(uni.uScale, Math.min(L.bolt * vh, vw * 0.42));
    gl.uniform1f(uni.uTime, time);
    gl.uniform1f(uni.uSpin, spin);
    gl.uniform1f(uni.uBurst, burst);
    gl.uniform1f(uni.uDpr, dpr);
    gl.uniform3fv(uni.uTint, tint);
    gl.drawArrays(gl.POINTS, 0, count);
  }

  // ---------- stirring: each particle rides a damped spring (offset in px) ----------
  // The pointer pushes particles near it outward and drags them along its path,
  // harder the faster it moves; the spring pulls each one home. A slow pass parts
  // the bolt like a hand through sand, a flick scatters it, and both flow back.
  const REACH = 140, SPRING = 10, DAMP = 4.6;
  let stirring = false;

  function stir(dt, time, burst, spin) {
    if (!ptr.in && !stirring) return;
    stirring = false;
    const scale = Math.min(L.bolt * vh, vw * 0.42), ox = L.axis * vw, oy = L.boltY * vh;
    const speed = Math.hypot(ptr.vx, ptr.vy), push = 400 + speed * 2.1, swirl = speed * 0.7;
    for (let i = 0, j = 0; i < count; i++, j += 2) {
      let ax = -SPRING * off[j] - DAMP * vel[j];
      let ay = -SPRING * off[j + 1] - DAMP * vel[j + 1];
      if (ptr.in) {
        // where the shader puts this particle (minus its tiny drift)
        const b = i * 8, size = home[b + 4], dust = home[b + 7] > 1.5;
        let x = home[b], y = home[b + 1], z = home[b + 2];
        if (dust) y = ((((y + 2 + time * 0.025 * (0.4 + size)) % 4) + 4) % 4) - 2;
        else {
          const k = burst * (0.45 + size * 1.5);
          x += dirs[i * 3] * k;
          y += dirs[i * 3 + 1] * k;
          z += dirs[i * 3 + 2] * k;
        }
        const a = dust ? spin * 0.2 : spin + burst * (size - 0.5) * 2.4;
        const c = Math.cos(a), s = Math.sin(a);
        const persp = 3.2 / (3.2 - Math.min(-s * x + c * z, 2.4));
        const dx = ox + (c * x + s * z) * scale * persp + off[j] - ptr.px;
        const dy = oy - y * scale * persp + off[j + 1] - ptr.py;
        const d2 = dx * dx + dy * dy;
        if (d2 < REACH * REACH) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / REACH) ** 2 * (0.6 + size * 0.8) * (dust ? 0.5 : 1);
          const turn = home[b + 6] > 0.5 ? swirl : -swirl; // half curl each way
          ax += f * ((dx / d) * push - (dy / d) * turn + ptr.vx * 7);
          ay += f * ((dy / d) * push + (dx / d) * turn + ptr.vy * 7);
        }
      }
      vel[j] += ax * dt;
      vel[j + 1] += ay * dt;
      off[j] += vel[j] * dt;
      off[j + 1] += vel[j + 1] * dt;
      if (!stirring && Math.abs(off[j]) + Math.abs(off[j + 1]) + Math.abs(vel[j]) + Math.abs(vel[j + 1]) > 0.05) stirring = true;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, stirBuf);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, off);
  }

  if (gl && !initGL()) gl = null;
  if (!gl) canvas.remove();
  canvas.addEventListener("webglcontextlost", () => {
    gl = null;
    canvas.remove();
  });

  // ---------- loop (runs only while the reel is on screen) ----------
  let pos = target(), visible = false, raf = 0, last = 0, introAt = 0, tintCss = "";

  function frame(now) {
    raf = visible ? requestAnimationFrame(frame) : 0;
    const dt = Math.min(0.05, (now - (last || now)) / 1000);
    last = now;
    const k = 1 - Math.exp(-dt * 7);
    pos += (target() - pos) * k;
    ptr.x += (ptr.tx - ptr.x) * k;
    ptr.y += (ptr.ty - ptr.y) * k;
    // a pointer resting in place stops dragging particles along
    if (now / 1000 - ptr.t > 0.05) {
      ptr.vx *= Math.exp(-dt * 12);
      ptr.vy *= Math.exp(-dt * 12);
    }

    const near = Math.round(pos);
    if (near !== active) setActive(near);
    placeCards(pos, ptr.x, ptr.y);
    bar.style.transform = `scaleX(${(pos / (N - 1)).toFixed(4)})`;

    // Between two projects: blend their tints, burst the bolt, and spin a full turn
    const i = Math.min(Math.floor(pos), N - 2), f = pos - i;
    const tint = tints[i].map((c, ch) => c + (tints[i + 1][ch] - c) * smooth(0.25, 0.75, f));
    const css = tint.map((c) => Math.round(c * 255)).join(" ");
    if (css !== tintCss) stage.style.setProperty("--tint", (tintCss = css));

    if (gl) {
      const intro = introAt ? 1 - smooth(0, 1, (now - introAt) / 2200) : 1;
      const burst = Math.max(Math.sin(Math.PI * clamp(pos - Math.floor(pos), 0, 1)), intro);
      const t = now / 1000;
      const spin = pos * Math.PI * 2 + ptr.x * 0.35 + Math.sin(t * 0.4) * 0.12;
      stir(dt, t, burst, spin);
      draw(t, burst, spin, tint);
    }
  }

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) {
      last = 0;
      raf = requestAnimationFrame(frame);
    }
  }).observe(reel);
  // The bolt gathers itself the first time the stage is mostly in view
  new IntersectionObserver(([e]) => e.isIntersecting && !introAt && (introAt = performance.now()), { threshold: 0.5 }).observe(stage);

  measure();
  setActive(Math.round(pos));
  placeCards(pos, 0, 0);
  addEventListener("resize", measure);
})();
