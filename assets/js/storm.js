// ---------------------------------------------------------------
// Storm front: the hand-off from Projects into Power Tools. The band
// pins while the camera flies through a veil of particles (still in
// the reel's last color) and comes out under a thundercloud; a strike
// lands on the title as it decodes. After that the pointer calls the
// lightning: below the cloud it strikes down toward the cursor, inside
// the cloud it crawls sideways through it. A tap strikes on touch.
//
// Cloud, veil, rain and dust are one WebGL point cloud. Bolts are drawn
// on a 2D canvas above it and also handed to the shader as segments, so
// the particles around a bolt light up with it. With reduced motion (or
// no WebGL) the band stays a still night sky with the title.
// ---------------------------------------------------------------
(() => {
  const storm = document.getElementById("storm");
  if (!storm) return;
  const stage = storm.querySelector(".storm__stage");
  const glCanvas = document.getElementById("storm-gl");
  const boltCanvas = document.getElementById("storm-bolts");
  const titleEl = document.getElementById("storm-title");
  const countEl = document.getElementById("storm-count");

  const gl = matchMedia("(prefers-reduced-motion: reduce)").matches
    ? null
    : glCanvas.getContext("webgl", { antialias: false, premultipliedAlpha: true });
  if (!gl) {
    glCanvas.remove();
    boltCanvas.remove();
    return;
  }
  const ctx = boltCanvas.getContext("2d");

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const pad = (n) => String(n).padStart(2, "0");

  const BASE_Y = 0.55; // cloud base, world units (y up)
  const MAX_SEG = 24; // bolt segments the shader lights particles from

  // ---------- particles ----------
  const VERT = `
    attribute vec3 aPos;
    attribute vec4 aSeed;   // phase, size, variety, flicker phase
    attribute float aKind;  // 0 cloud puff, 1 cloud grain, 2 veil, 3 rain, 4 dust
    uniform vec2 uView, uPtr;           // stage size; pointer in px from mid-stage (y down)
    uniform float uFocal, uTime, uCamZ, uCamY, uDpr, uFly, uPtrOn, uFlash;
    uniform vec4 uSeg[${MAX_SEG}];     // the latest bolt, as segments in the same px space
    uniform int uSegs;
    uniform vec4 uGlow;     // light inside the cloud: x, y, radius (px), strength
    uniform vec3 uFrom;     // veil color on the way in
    varying vec3 vColor;
    varying float vAlpha, vRain;

    float segDist(vec2 p, vec4 s) {
      vec2 ab = s.zw - s.xy;
      float h = clamp(dot(p - s.xy, ab) / max(dot(ab, ab), 0.001), 0.0, 1.0);
      return length(p - s.xy - ab * h);
    }

    void main() {
      float puff = step(aKind, 0.5);
      float grain = step(0.5, aKind) * step(aKind, 1.5);
      float veil = step(1.5, aKind) * step(aKind, 2.5);
      float rain = step(2.5, aKind) * step(aKind, 3.5);
      float dust = step(3.5, aKind);
      float cloud = puff + grain;
      float t = uTime, ph = aSeed.x * 6.2831;

      // the cloud billows and the whole front drifts; rain falls on a slant and wraps under the base
      vec3 p = aPos;
      p += cloud * vec3(sin(t * 0.21 + ph + p.y * 1.7), sin(t * 0.17 + ph * 1.3 + p.x * 1.3), sin(t * 0.13 + ph + p.x)) * 0.06;
      p.x += cloud * sin(t * 0.05) * 0.18;
      float fall = mod(0.55 - aPos.y + t * (2.0 + aSeed.y * 1.5), 3.4);
      p.y = mix(p.y, 0.55 - fall, rain);
      p.x += rain * fall * 0.12;
      p += dust * vec3(sin(t * 0.3 + ph), cos(t * 0.23 + ph), 0.0) * 0.12;

      // camera at (0, uCamY, uCamZ) looking down -z; particles fade out as they pass it
      float depth = uCamZ - p.z;
      float vis = smoothstep(0.12, 0.7, depth);
      depth = max(depth, 0.12);
      vec2 px = vec2(p.x, uCamY - p.y) * uFocal / depth;

      // light from the bolt, from inside the cloud, and a faint charge around the pointer
      float light = 0.0;
      for (int i = 0; i < ${MAX_SEG}; i++) {
        if (i >= uSegs) break;
        light = max(light, exp(-segDist(px, uSeg[i]) / 60.0));
      }
      light = light * uFlash + uGlow.w * exp(-length(px - uGlow.xy) / uGlow.z);
      light = clamp(light + uPtrOn * 0.22 * cloud * exp(-length(px - uPtr) / 120.0), 0.0, 1.0);

      gl_Position = vec4(px.x / (uView.x * 0.5), -px.y / (uView.y * 0.5), 0.0, 1.0);
      float size = puff * (16.0 + aSeed.y * 30.0) + grain * (1.2 + aSeed.y * 2.0) + veil * (2.0 + aSeed.y * aSeed.y * 16.0)
                 + rain * (9.0 + aSeed.y * 9.0) + dust * (1.0 + aSeed.y * 1.5);
      gl_PointSize = min(size * 4.0 / depth, 140.0) * uDpr;

      float top = clamp((p.y - 0.55) / 1.5, 0.0, 1.0);
      vec3 body = mix(vec3(0.13, 0.16, 0.28), vec3(0.42, 0.40, 0.78), top * 0.55 + aSeed.z * 0.2);
      vec3 veilColor = mix(mix(uFrom, vec3(0.8, 0.85, 1.0), 0.45), vec3(0.55, 0.62, 0.95), uFly);
      vec3 color = body * cloud + veilColor * veil + vec3(0.6, 0.7, 0.95) * (rain + dust);
      vColor = mix(color, vec3(1.0, 0.92, 0.6), light);
      float alpha = puff * 0.08 + grain * 0.4 + veil * 0.26 + rain * 0.07 + dust * 0.3;
      alpha += light * (puff * 0.3 + grain * 0.5 + rain * 0.5 + dust * 0.4);
      alpha *= mix(1.0, 0.55 + 0.45 * sin(t * 2.2 + aSeed.w * 40.0), grain + dust);
      vAlpha = alpha * vis;
      vRain = rain;
    }`;

  const FRAG = `
    precision mediump float;
    varying vec3 vColor;
    varying float vAlpha, vRain;
    void main() {
      vec2 c = gl_PointCoord - 0.5;
      float disc = smoothstep(0.5, 0.0, length(c));
      float streak = smoothstep(0.08, 0.0, abs(c.x)) * smoothstep(0.5, 0.1, abs(c.y));
      float a = mix(disc, streak, vRain) * vAlpha;
      gl_FragColor = vec4(vColor * a, a);
    }`;

  const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) * 1.15;

  // A cumulonimbus: overlapping blobs cut flat at the base, a few towering heads.
  // Written back to front (cloud, rain, dust, then the veil nearest the camera).
  function particles(counts) {
    const blobs = [];
    for (let i = 0; i < 16; i++)
      blobs.push([-3.6 + (7.2 * (i + Math.random() * 0.6)) / 16, 0.75 + Math.random() * 0.5, (Math.random() - 0.5) * 1.2, 0.55 + Math.random() * 0.5]);
    for (let i = 0; i < 4; i++)
      blobs.push([(Math.random() - 0.5) * 4, 1.5 + Math.random() * 0.5, -0.4 + Math.random() * 0.4, 0.7 + Math.random() * 0.4]);

    const total = Object.values(counts).reduce((s, n) => s + n, 0);
    const data = new Float32Array(total * 8);
    let k = 0;
    const put = (kind, n, at) => {
      for (let i = 0; i < n; i++, k++) data.set([...at(), Math.random(), Math.random(), Math.random(), Math.random(), kind], k * 8);
    };
    const inCloud = () => {
      const b = blobs[(Math.random() * blobs.length) | 0];
      let x, y, z;
      do {
        x = b[0] + gauss() * b[3] * 0.55;
        y = b[1] + gauss() * b[3] * 0.45;
        z = b[2] + gauss() * b[3] * 0.5;
      } while (y < BASE_Y + (Math.random() - 0.5) * 0.08);
      return [x, y, z];
    };
    put(0, counts.puff, inCloud);
    put(1, counts.grain, inCloud);
    put(3, counts.rain, () => [(Math.random() - 0.5) * 8, BASE_Y - Math.random() * 3.2, (Math.random() - 0.5) * 2.5]);
    put(4, counts.dust, () => [(Math.random() - 0.5) * 9, (Math.random() - 0.5) * 5, Math.random() * 4 - 2.5]);
    put(2, counts.veil, () => [(Math.random() - 0.5) * 9, (Math.random() - 0.5) * 6, 4.6 + Math.random() * 5]);
    return data;
  }

  // A shader program plus its vertex buffer; `layout` is [attribute, size, offset] in floats
  function program(vert, frag, data, layout) {
    const prog = gl.createProgram();
    for (const [type, src] of [[gl.VERTEX_SHADER, vert], [gl.FRAGMENT_SHADER, frag]]) {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(sh));
      gl.attachShader(prog, sh);
    }
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    const stride = layout.reduce((s, [, size]) => s + size, 0);
    return {
      prog, buf, uni: {}, count: data.length / stride,
      attrs: layout.map(([name, size, offset]) => [gl.getAttribLocation(prog, name), size, offset * 4, stride * 4]),
    };
  }
  // uniform location, looked up once per program
  const u = (p, name) => (name in p.uni ? p.uni[name] : (p.uni[name] = gl.getUniformLocation(p.prog, name)));

  function use(p) {
    gl.useProgram(p.prog);
    for (let i = 0; i < 4; i++) gl.disableVertexAttribArray(i);
    gl.bindBuffer(gl.ARRAY_BUFFER, p.buf);
    for (const [loc, size, offset, stride] of p.attrs) {
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, stride, offset);
    }
  }

  const narrow = matchMedia("(max-width: 760px)").matches;
  const counts = narrow ? { puff: 2600, grain: 3600, rain: 700, dust: 400, veil: 1400 } : { puff: 5000, grain: 7000, rain: 1500, dust: 800, veil: 2600 };
  const cloud = program(VERT, FRAG, particles(counts), [["aPos", 3, 0], ["aSeed", 4, 3], ["aKind", 1, 7]]);
  if (!cloud) {
    glCanvas.remove();
    boltCanvas.remove();
    return;
  }
  // Premultiplied "over": the cloud reads as a soft mass rather than a pile of light
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  // ---------- layout & camera ----------
  let vw = 0, vh = 0, span = 1, focal = 1, dpr = 1;
  let fly = 0, camZ = 9.5, camY = -0.5;

  function measure() {
    vw = stage.clientWidth;
    vh = stage.clientHeight;
    span = Math.max(1, storm.offsetHeight - vh);
    focal = Math.max(vw / 2, vh * 0.55) * 1.25;
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    for (const c of [glCanvas, boltCanvas]) {
      c.width = Math.round(vw * dpr);
      c.height = Math.round(vh * dpr);
    }
    gl.viewport(0, 0, glCanvas.width, glCanvas.height);
  }

  // Scroll → flight: a little while the band slides into view, the rest while pinned
  function target() {
    const top = storm.getBoundingClientRect().top;
    const enter = clamp(1 - top / vh, 0, 1);
    const pin = clamp(-top / span, 0, 1);
    return smooth(0, 1, enter * 0.3 + Math.min(pin / 0.6, 1) * 0.7);
  }

  const baseOnScreen = () => ((camY - BASE_Y) * focal) / camZ; // px from mid-stage, y down

  // ---------- lightning ----------
  // A strike's brightness over time: leader, a dip, the return stroke, then the fade
  const env = (a) => (a < 0 ? 0 : a < 0.05 ? 1 : a < 0.1 ? 0.4 : a < 0.16 ? 0.9 : 0.9 * Math.exp(-(a - 0.16) * 6));

  // Jagged path by midpoint displacement (65 points)
  function boltPath(x0, y0, x1, y1, rough) {
    let pts = [[x0, y0], [x1, y1]];
    let off = Math.hypot(x1 - x0, y1 - y0) * rough;
    for (let it = 0; it < 6; it++) {
      const next = [pts[0]];
      for (let i = 1; i < pts.length; i++) {
        const [ax, ay] = pts[i - 1], [bx, by] = pts[i];
        const nx = ay - by, ny = bx - ax, len = Math.hypot(nx, ny) || 1;
        const o = (Math.random() - 0.5) * off;
        next.push([(ax + bx) / 2 + (nx / len) * o, (ay + by) / 2 + (ny / len) * o], pts[i]);
      }
      pts = next;
      off *= 0.5;
    }
    return pts;
  }

  function fork(main) {
    const i = 8 + ((Math.random() * (main.length - 20)) | 0);
    const [sx, sy] = main[i], [nx, ny] = main[i + 6];
    const ang = Math.atan2(ny - sy, nx - sx) + (Math.random() < 0.5 ? -1 : 1) * (0.35 + Math.random() * 0.7);
    const len = 50 + Math.random() * 110;
    return boltPath(sx, sy, sx + Math.cos(ang) * len, sy + Math.sin(ang) * len, 0.28);
  }

  function segments(pts) {
    const out = new Float32Array(MAX_SEG * 4);
    const n = (pts.length - 1) / MAX_SEG;
    for (let s = 0; s < MAX_SEG; s++) {
      const a = pts[Math.round(s * n)], b = pts[Math.round((s + 1) * n)];
      out.set([a[0], a[1], b[0], b[1]], s * 4);
    }
    return out;
  }

  let bolts = [], lit = null, glow = null, strikes = 0, lastStrike = -9, dirty = false;

  // Below the cloud: strike down to (x, y). Inside it: crawl sideways through it.
  function strikeAt(x, y, now, big = false) {
    const base = baseOnScreen();
    let main, origin;
    if (y < base + 30) {
      const half = 110 + Math.random() * 90, tilt = (Math.random() - 0.5) * 60;
      main = boltPath(x - half, y - tilt, x + half, y + tilt, 0.22);
      origin = [x, y];
    } else {
      const x0 = x + (Math.random() - 0.5) * 180;
      main = boltPath(x0, base - 20, x, y, 0.3);
      origin = [x0, base - 50];
    }
    bolts.push({ main, forks: Array.from({ length: big ? 4 : 2 }, () => fork(main)), born: now });
    if (bolts.length > 4) bolts.shift();
    lit = { segs: segments(main), born: now };
    glow = { x: origin[0], y: origin[1], r: 260, k: 0.9, born: now };
    lastStrike = now;
    ptr.travel = 0;
    countEl.textContent = pad(++strikes);
  }

  function line(pts, width, color) {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  function drawBolts(now) {
    if (!bolts.length && !dirty) return;
    ctx.setTransform(dpr, 0, 0, dpr, (vw / 2) * dpr, (vh / 2) * dpr);
    ctx.clearRect(-vw / 2, -vh / 2, vw, vh);
    dirty = false;
    bolts = bolts.filter((b) => now - b.born < 0.9);
    ctx.globalCompositeOperation = "lighter";
    ctx.lineJoin = ctx.lineCap = "round";
    for (const b of bolts) {
      const e = env(now - b.born);
      if (e < 0.01) continue;
      dirty = true;
      const paths = [[b.main, 1], ...b.forks.map((f) => [f, 0.55])];
      ctx.shadowColor = "rgba(250, 204, 21, .9)";
      ctx.shadowBlur = 22;
      for (const [pts, w] of paths) line(pts, 5 * w, `rgba(250, 214, 90, ${(0.32 * e).toFixed(3)})`);
      ctx.shadowBlur = 0;
      for (const [pts, w] of paths) line(pts, 1.7 * w, `rgba(255, 251, 235, ${(e * (0.5 + w / 2)).toFixed(3)})`);
    }
  }

  // ---------- input ----------
  const ptr = { x: 0, y: 0, on: 0, ton: 0, travel: 0 };
  const local = (e) => {
    const r = stage.getBoundingClientRect();
    return [e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2];
  };
  stage.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const [x, y] = local(e);
    ptr.travel += Math.hypot(x - ptr.x, y - ptr.y);
    Object.assign(ptr, { x, y, ton: 1 });
    const now = performance.now() / 1000;
    if (fly > 0.6 && ptr.travel > 140 && now - lastStrike > 0.7) strikeAt(x, y, now);
  });
  stage.addEventListener("pointerleave", () => (ptr.ton = 0));
  stage.addEventListener("pointerdown", (e) => {
    const now = performance.now() / 1000;
    if (fly > 0.6 && now - lastStrike > 0.3) strikeAt(...local(e), now);
  });

  // ---------- loop (runs only while the band is on screen) ----------
  const reelStage = document.querySelector(".reel__stage");
  const reelTint = () => (reelStage && getComputedStyle(reelStage).getPropertyValue("--tint").trim()) || "250 204 21";
  let from = [0.98, 0.8, 0.08], arrived = false, lastArrival = -9, nextIdle = 0, flyCss = "";
  let visible = false, raf = 0, last = 0;

  function frame(ms) {
    raf = visible ? requestAnimationFrame(frame) : 0;
    const now = ms / 1000;
    const dt = Math.min(0.05, now - (last || now));
    last = now;
    const k = 1 - Math.exp(-dt * 6);
    fly += (target() - fly) * k;
    ptr.on += (ptr.ton - ptr.on) * k;
    camZ = 9.5 - 5.5 * fly;
    camY = -0.5 * (1 - fly);
    const css = fly.toFixed(3);
    if (css !== flyCss) stage.style.setProperty("--fly", (flyCss = css));

    // Arrival: the title decodes and a strike lands on it
    if ((fly > 0.86) !== arrived) {
      arrived = !arrived;
      storm.classList.toggle("is-arrived", arrived);
      if (arrived) {
        scramble(titleEl, "Power Tools", 700);
        if (now - lastArrival > 4) {
          lastArrival = now;
          const t = titleEl.getBoundingClientRect(), s = stage.getBoundingClientRect();
          strikeAt(t.left + Math.min(t.width * 0.18, 90) - s.left - vw / 2, t.top + 6 - s.top - vh / 2, now, true);
          titleEl.classList.add("is-struck");
          setTimeout(() => titleEl.classList.remove("is-struck"), 700);
        }
      }
    }
    // Between strikes the cloud flickers from inside now and then
    if (arrived && now > nextIdle) {
      if (now - lastStrike > 2) glow = { x: (Math.random() - 0.5) * vw * 0.8, y: baseOnScreen() - 40 - Math.random() * 120, r: 200, k: 0.5, born: now };
      nextIdle = now + 3 + Math.random() * 4;
    }

    const flash = lit ? env(now - lit.born) : 0;
    const glowK = glow ? env(now - glow.born) * glow.k : 0;

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    use(cloud);
    gl.uniform2f(u(cloud, "uView"), vw, vh);
    gl.uniform2f(u(cloud, "uPtr"), ptr.x, ptr.y);
    gl.uniform1f(u(cloud, "uFocal"), focal);
    gl.uniform1f(u(cloud, "uTime"), now);
    gl.uniform1f(u(cloud, "uCamZ"), camZ);
    gl.uniform1f(u(cloud, "uCamY"), camY);
    gl.uniform1f(u(cloud, "uDpr"), dpr);
    gl.uniform1f(u(cloud, "uFly"), fly);
    gl.uniform1f(u(cloud, "uPtrOn"), ptr.on);
    gl.uniform1f(u(cloud, "uFlash"), flash);
    gl.uniform1i(u(cloud, "uSegs"), flash > 0.01 ? MAX_SEG : 0);
    if (lit) gl.uniform4fv(u(cloud, "uSeg"), lit.segs);
    gl.uniform4f(u(cloud, "uGlow"), glow ? glow.x : 0, glow ? glow.y : 0, glow ? glow.r : 1, glowK);
    gl.uniform3fv(u(cloud, "uFrom"), from);
    gl.drawArrays(gl.POINTS, 0, cloud.count);
    drawBolts(now);
  }

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (!visible) return;
    // The veil arrives in whatever color the reel was showing last
    const tint = reelTint();
    from = tint.split(/\s+/).map((c) => c / 255);
    stage.style.setProperty("--veil", tint);
    if (!raf) {
      last = 0;
      raf = requestAnimationFrame(frame);
    }
  }).observe(storm);

  storm.classList.add("is-live");
  measure();
  fly = target();
  addEventListener("resize", measure);
})();
