const shaderLoader = document.getElementById("shader-loading");
const canvas = document.getElementById("gl-canvas");
const gl =
  canvas &&
  (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));

let loaderFrame = 0;
let loaderInterval = 0;

function resizeLoaderCanvas() {
  if (!canvas) return;

  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  canvas.style.width = "100vw";
  canvas.style.height = "100dvh";
  if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
}

window.addEventListener("resize", resizeLoaderCanvas);
resizeLoaderCanvas();

const vsSource = `
  attribute vec2 p;
  void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const fsSource = `
  precision highp float;
  uniform vec2 res;
  uniform float time;

  float rnd(float x) { return fract(sin(x)*1e4); }
  float rnd2(vec2 s) { return fract(sin(dot(s, vec2(12.9898,78.233)))*43758.5453); }

  void main(void) {
    vec2 uv = (gl_FragCoord.xy * 2.0 - res) / min(res.x, res.y);
    vec2 ms = vec2(4.0, 2.0), ss = vec2(256.0, 256.0);
    uv.x = floor(uv.x * ss.x / ms.x) / (ss.x / ms.x);
    uv.y = floor(uv.y * ss.y / ms.y) / (ss.y / ms.y);
    float t = time * 0.06 + rnd2(vec2(uv.x)) * 0.4;
    float lw = 0.0008;
    vec3 c = vec3(0.0);
    for(int j = 0; j < 3; j++){
      for(int i = 0; i < 5; i++){
        c[j] += lw * float(i*i) / abs(fract(t - 0.01*float(j) + float(i)*0.01) - length(uv));
      }
    }
    gl_FragColor = vec4(c[2], c[1], c[0], 1.0);
  }
`;

function mkShader(type, src) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("Shader compile failed:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function initShader() {
  if (!gl) return;

  const vertexShader = mkShader(gl.VERTEX_SHADER, vsSource);
  const fragmentShader = mkShader(gl.FRAGMENT_SHADER, fsSource);
  if (!vertexShader || !fragmentShader) return;

  const prog = gl.createProgram();
  gl.attachShader(prog, vertexShader);
  gl.attachShader(prog, fragmentShader);
  gl.linkProgram(prog);

  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn("Shader link failed:", gl.getProgramInfoLog(prog));
    return;
  }

  const pa = gl.getAttribLocation(prog, "p");
  const uTime = gl.getUniformLocation(prog, "time");
  const uRes = gl.getUniformLocation(prog, "res");

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );
  gl.enableVertexAttribArray(pa);
  gl.vertexAttribPointer(pa, 2, gl.FLOAT, false, 0, 0);

  let t0 = performance.now();
  let fc = 0;
  let ft = 0;

  function draw() {
    loaderFrame = requestAnimationFrame(draw);
    const now = performance.now();
    const t = (now - t0) / 1000;
    fc++;

    if (now - ft >= 1000) {
      const fpsEl = document.getElementById("fps-el");
      if (fpsEl) fpsEl.textContent = "fps " + fc;
      fc = 0;
      ft = now;
    }

    gl.useProgram(prog);
    gl.uniform1f(uTime, t * 7);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  draw();
}

initShader();

const loadDuration = 2500;
let pct = 0;
let startTime = 0;

function startLoader() {
  window.clearInterval(loaderInterval);
  startTime = performance.now();

  loaderInterval = window.setInterval(() => {
    const elapsed = performance.now() - startTime;
    const p = Math.min(100, Math.round((elapsed / loadDuration) * 100));
    const fillEl = document.getElementById("fill-el");
    const pctEl = document.getElementById("pct-el");

    if (fillEl) fillEl.style.width = p + "%";
    if (pctEl) pctEl.textContent = "Loading";

    if (p >= 100) {
      window.clearInterval(loaderInterval);
      window.setTimeout(enter, 900);
    }
  }, 32);
}

function restart() {
  document.getElementById("fill-el").style.width = "0%";
  document.getElementById("pct-el").textContent = "Loading";
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
