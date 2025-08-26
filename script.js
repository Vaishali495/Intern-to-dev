// --- Floating code snippets ---
const snippets = [
  'function upgrade(role){\n  return role.replace("Intern","Software Developer");\n}',
  'const skills = ["JS","Node","MongoDB","React"];',
  'if(growth >= 100){ status = "Promoted" }',
  'git commit -m "From intern to dev"',
  '<div class="success">Career Update</div>',
  "Array.prototype.map.call(progress, step => step+1)",
];
const codeLayer = document.getElementById("codeLayer");
function scatterCode() {
  codeLayer.innerHTML = "";
  const W = 1080,
    H = 1080;
  for (let i = 0; i < 18; i++) {
    const s = document.createElement("span");
    s.textContent = snippets[i % snippets.length];
    s.style.left = Math.random() * (W - 300) + "px";
    s.style.top = Math.random() * (H - 100) + "px";
    s.style.transform = `rotate(${Math.random() * 8 - 4}deg)`;
    s.style.opacity = (Math.random() * 0.25 + 0.05).toFixed(2);
    codeLayer.appendChild(s);
  }
}

// --- Progress animation + role flip ---
const fill = document.getElementById("fill");
const pct = document.getElementById("pct");
const sw = document.getElementById("switch");
const dot = document.getElementById("statusDot");

function run() {
  scatterCode();
  sw.classList.remove("on");
  dot.style.background = "var(--warn)";
  dot.style.boxShadow = "0 0 0 4px #f59e0b22";
  let p = 0;
  pct.textContent = "0%";
  fill.style.width = "0%";
  const t = setInterval(() => {
    p += Math.random() * 9 + 3; // 3 - 12 per tick
    if (p >= 100) {
      p = 100;
      clearInterval(t);
      setTimeout(() => {
        sw.classList.add("on");
        dot.style.background = "var(--ok)";
        dot.style.boxShadow = "0 0 0 4px #10b98122";
        burst();
      }, 300);
    }
    pct.textContent = Math.round(p) + "%";
    fill.style.width = p + "%";
  }, 180);
}

// --- Confetti ---
const confetti = document.getElementById("confetti");
function burst() {
  confetti.innerHTML = "";
  const colors = ["#7c5cff", "#22d3ee", "#10b981", "#f59e0b", "#e879f9", "#60a5fa"];
  const N = 120;
  for (let i = 0; i < N; i++) {
    const piece = document.createElement("div");
    piece.className = "piece";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.left = 50 + (Math.random() * 40 - 20) + "%";
    piece.style.top = "45%";
    piece.style.opacity = "1";
    piece.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
    const dx = (Math.random() * 2 - 1) * 520;
    const dy = Math.random() * -1 * (400 + Math.random() * 500);
    const rot = Math.random() * 720 - 360;
    piece.animate([{ transform: piece.style.transform }, { transform: `translate(${dx}%, ${dy}%) rotate(${rot}deg)`, opacity: 0.0 }], {
      duration: 1500 + Math.random() * 900,
      easing: "cubic-bezier(.2,.8,.2,1)",
      fill: "forwards",
    });
    confetti.appendChild(piece);
  }
}

// Replay button
document.getElementById("replay").addEventListener("click", () => run());

// Kick off on load
// run();