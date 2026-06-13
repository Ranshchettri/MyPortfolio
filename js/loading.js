const shaderLoader = document.getElementById("shader-loading");
const canvas = document.getElementById("gl-canvas");
const ctx = canvas && canvas.getContext("2d");

let loaderFrame = 0;
let loaderInterval = 0;

function resizeLoaderCanvas() {
  if (!canvas) return;
  canvas.width  = Math.floor(window.innerWidth);
  canvas.height = Math.floor(window.innerHeight);
  canvas.style.width  = "100vw";
  canvas.style.height = "100dvh";
}

resizeLoaderCanvas();
window.addEventListener("resize", resizeLoaderCanvas);

           /* Ken-Burns loader  —  image slowly breathes / drifts */
           
function initAnimation() {
  if (!ctx) return;

  const img = new Image();
  img.src = "image/loader-bg.png";

  let t0 = 0;

  function drawFrame() {
    loaderFrame = requestAnimationFrame(drawFrame);

    const t = (performance.now() - t0) * 0.001;   // seconds
    const W = canvas.width;
    const H = canvas.height;

    /* ── Cover-fit image size ── */
    const imgAspect    = img.naturalWidth  / img.naturalHeight;
    const canvasAspect = W / H;
    let dw, dh;
    if (imgAspect > canvasAspect) {
      dh = H;
      dw = H * imgAspect;
    } else {
      dw = W;
      dh = W / imgAspect;
    }

    /* ── Very slow Ken-Burns: gentle scale + drift ─────────────
       scale oscillates  1.00 → 1.06  over ~25 s
       x drifts ±2%   y drifts ±1.5%  independent speeds        */
    const scale = 1 + 0.03 + Math.sin(t * 0.04 * Math.PI) * 0.03; // 1.00 – 1.06
    const ox    = Math.sin(t * 0.028 * Math.PI) * W * 0.02;
    const oy    = Math.cos(t * 0.022 * Math.PI) * H * 0.015;

    /* ── Draw ── */
    ctx.save();
    ctx.translate(W / 2 + ox, H / 2 + oy);
    ctx.scale(scale, scale);
    ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
    ctx.restore();

    /* Optional: very subtle dark overlay so loader text pops */
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    ctx.fillRect(0, 0, W, H);

    /* FPS */
    const fpsEl = document.getElementById("fps-el");
    if (fpsEl) {
      if (!drawFrame._fc) { drawFrame._fc = 0; drawFrame._ft = performance.now(); }
      drawFrame._fc++;
      const now = performance.now();
      if (now - drawFrame._ft >= 1000) {
        fpsEl.textContent = "fps " + drawFrame._fc;
        drawFrame._fc = 0;
        drawFrame._ft = now;
      }
    }
  }

  img.onload = () => {
    t0 = performance.now();
    drawFrame();
  };

  /* Fallback: if image fails, plain dark background */
  img.onerror = () => {
    ctx.fillStyle = "#03010d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
}

initAnimation();

/* ── Loader progress bar ── */
const loadDuration = 2500;
let startTime = 0;

function startLoader() {
  window.clearInterval(loaderInterval);
  startTime = performance.now();

  loaderInterval = window.setInterval(() => {
    const elapsed = performance.now() - startTime;
    const p       = Math.min(100, Math.round((elapsed / loadDuration) * 100));
    const fillEl  = document.getElementById("fill-el");
    const pctEl   = document.getElementById("pct-el");

    if (fillEl) fillEl.style.width  = p + "%";
    if (pctEl)  pctEl.textContent   = "Loading";

    if (p >= 100) {
      window.clearInterval(loaderInterval);
      window.setTimeout(enter, 900);
    }
  }, 32);
}

function restart() {
  document.getElementById("fill-el").style.width = "0%";
  document.getElementById("pct-el").textContent  = "Loading";
  document.getElementById("done-screen").classList.remove("show");
  startLoader();
}

function enter() {
  if (!shaderLoader) return;
  shaderLoader.classList.add("hide");
  document.body.classList.remove("loading-page-active");
  window.clearInterval(loaderInterval);

  window.setTimeout(() => {
    shaderLoader.remove();
    window.cancelAnimationFrame(loaderFrame);
    window.removeEventListener("resize", resizeLoaderCanvas);
  }, 1500);
}

if (shaderLoader) {
  startLoader();
}
