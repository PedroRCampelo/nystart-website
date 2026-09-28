// Hero background: the "ny" block running and jumping over obstacles.
(function () {
  const cv = document.getElementById("runner");
  if (!cv || !cv.getContext) return;
  const ctx = cv.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ink = "#1E1C1A", bg = "#FAF6F1";

  let W = 0, H = 0;
  const fit = () => {
    const r = cv.getBoundingClientRect(), d = window.devicePixelRatio || 1;
    W = r.width; H = r.height;
    cv.width = W * d; cv.height = H * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
  };
  new ResizeObserver(fit).observe(cv);
  fit();

  const S = 34, g = 0.0032, v = 0.32;
  const p = { y: 0, vy: 0 };
  let obs = [], nextGap = 400, dist = 0, t0 = performance.now(), legT = 0, visible = true, raf = 0;
  const clouds = [0.2, 0.55, 0.85].map((f, i) => ({ x: f, y: 0.2 + i * 0.09, w: 40 + i * 18 }));

  const spawn = () => {
    const n = Math.random() < 0.3 ? 2 : 1, x = W + 20;
    for (let i = 0; i < n; i++) obs.push({ x: x + i * 22, w: 10 + Math.random() * 8, h: 18 + Math.random() * 30 });
    nextGap = 280 + Math.random() * 420;
  };

  const roundRect = (x, y, w, h, r) => {
    ctx.beginPath();
    if (ctx.roundRect) { ctx.roundRect(x, y, w, h, r); return; }
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  };

  const loop = (now) => {
    const dt = Math.min(40, now - t0); t0 = now;
    const gy = H - 67, px = Math.max(40, W * 0.08);
    if (!reduce) {
      dist += v * dt; legT += dt;
      if (dist > nextGap) { dist = 0; spawn(); }
      obs.forEach(o => o.x -= v * dt);
      obs = obs.filter(o => o.x + o.w > -20);
      clouds.forEach(c => { c.x -= 0.00002 * dt; if (c.x < -0.1) c.x = 1.1; });
      const ahead = obs.find(o => o.x > px && o.x - (px + S) < 46);
      if (p.y === 0 && ahead) p.vy = 0.95;
      p.vy -= g * dt; p.y = Math.max(0, p.y + p.vy * dt); if (p.y === 0) p.vy = 0;
    }
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = ink;
    clouds.forEach(c => { ctx.fillRect(c.x * W, c.y * H, c.w, 2); ctx.fillRect(c.x * W + 10, c.y * H - 6, c.w * 0.5, 2); });
    for (let x = -((reduce ? 0 : now * v) % 24); x < W; x += 24) ctx.fillRect(x, gy + 8, 6, 1.5);
    obs.forEach(o => ctx.fillRect(o.x, gy - o.h, o.w, o.h));
    const ry = gy - S - 8 - p.y;
    roundRect(px, ry, S, S, 7); ctx.fill();
    ctx.fillStyle = bg; ctx.font = "800 17px Outfit, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("ny", px + S / 2, ry + S / 2 + 1);
    ctx.fillStyle = ink;
    const step = p.y > 0 ? 0 : Math.floor(legT / 110) % 2;
    ctx.fillRect(px + 7, ry + S, 5, step ? 8 : 5);
    ctx.fillRect(px + S - 12, ry + S, 5, step ? 5 : 8);
    raf = visible && !reduce ? requestAnimationFrame(loop) : 0;
  };

  // Pause while the hero is off-screen.
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) { t0 = performance.now(); raf = requestAnimationFrame(loop); }
  }).observe(cv);

  // Redraw once fonts load so the "ny" label uses Outfit.
  if (document.fonts) document.fonts.ready.then(() => { if (!raf) requestAnimationFrame(loop); });
  raf = requestAnimationFrame(loop);
})();

document.getElementById("year").textContent = new Date().getFullYear();
