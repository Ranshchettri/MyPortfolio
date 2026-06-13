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
const loadDuration = 2400;
let startTime = 0;

function startLoader() {
  window.clearInterval(loaderInterval);
  startTime = performance.now();

  const boxes = document.querySelectorAll(".loader-flip-front .loader-box");
  const pctEl = document.getElementById("box-loader-pct");
  const card = document.getElementById("loader-flip-card");
  const title = document.getElementById("loader-title");

  loaderInterval = window.setInterval(() => {
    const elapsed = performance.now() - startTime;
    const p       = Math.min(100, Math.round((elapsed / loadDuration) * 100));

    if (pctEl) pctEl.textContent = p + "%";

    // Activate appropriate number of boxes (1 box per 10% progress)
    const activeCount = Math.floor(p / 10);
    boxes.forEach((box, index) => {
      if (index < activeCount) {
        box.classList.add("active");
      } else {
        box.classList.remove("active");
      }
    });

    if (p >= 100) {
      window.clearInterval(loaderInterval);

      // Timeline after loading finishes:
      // 1. Flip the card to show "Make it real"
      window.setTimeout(() => {
        if (card) card.classList.add("flipped");
      }, 200);

      // 2. Dissolve / erase the text after flip completes
      window.setTimeout(() => {
        if (title) {
          title.classList.add("erase");
          const displaceAnim = document.getElementById("displace-anim");
          const fadeAnim = document.getElementById("fade-anim");
          if (displaceAnim) displaceAnim.beginElement();
          if (fadeAnim) fadeAnim.beginElement();
        }
      }, 1200);

      // 3. Slide up / fade out loading screen and enter website
      window.setTimeout(() => {
        enter();
      }, 2700);
    }
  }, 32);
}

function restart() {
  const boxes = document.querySelectorAll(".loader-flip-front .loader-box");
  boxes.forEach(box => box.classList.remove("active"));
  document.getElementById("box-loader-pct").textContent = "0%";
  
  const card = document.getElementById("loader-flip-card");
  if (card) card.classList.remove("flipped");
  
  const title = document.getElementById("loader-title");
  if (title) {
    title.classList.remove("erase");
  }

  startLoader();
}

function enter() {
  if (!shaderLoader) return;
  shaderLoader.classList.add("hide");
  document.body.classList.remove("loading-page-active");
  sessionStorage.setItem("loader-seen", "true");
  window.clearInterval(loaderInterval);

  window.setTimeout(() => {
    shaderLoader.remove();
    window.cancelAnimationFrame(loaderFrame);
    window.removeEventListener("resize", resizeLoaderCanvas);
  }, 1500);
}

// Check if we should skip the loader page
const isReload = performance.getEntriesByType("navigation")[0]?.type === "reload";
const hasSeenLoader = sessionStorage.getItem("loader-seen") === "true";

if (hasSeenLoader && !isReload) {
  if (shaderLoader) shaderLoader.remove();
  document.body.classList.remove("loading-page-active");
} else {
  if (shaderLoader) {
    startLoader();
  }
}
