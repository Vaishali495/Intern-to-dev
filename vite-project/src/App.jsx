import { useRef, useState } from "react";
import "./App.css";
import myImage from "./assets/image.jpg";
import confetti from "canvas-confetti";

function App() {
  const snippets = [
    'function upgrade(role){\n  return role.replace("Intern","Software Developer");\n}',
    'const skills = ["JS","Node","MongoDB","React"];',
    'if(growth >= 100){ status = "Promoted" }',
    'git commit -m "From intern to dev"',
    '<div class="success">Career Update</div>',
    "Array.prototype.map.call(progress, step => step+1)",
  ];

  // Refs for DOM elements
  const codeLayerRef = useRef(null);
  const fillRef = useRef(null);
  const pctRef = useRef(null);
  const switchRef = useRef(null);
  const dotRef = useRef(null);

  // State to re-render scattered code
  const [scatter, setScatter] = useState([]);

  const scatterCode = () => {
    const W = 1080, H = 1080;
    const nodes = [];
    for (let i = 0; i < 18; i++) {
      nodes.push({
        text: snippets[i % snippets.length],
        left: Math.random() * (W - 300),
        top: Math.random() * (H - 100),
        rotate: Math.random() * 8 - 4,
        opacity: (Math.random() * 0.25 + 0.05).toFixed(2),
      });
    }
    setScatter(nodes);
  };

  const run = () => {
    scatterCode();
    if (!switchRef.current || !dotRef.current || !fillRef.current || !pctRef.current) return;

    switchRef.current.classList.remove("on");
    dotRef.current.style.background = "var(--warn)";
    dotRef.current.style.boxShadow = "0 0 0 4px #f59e0b22";

    let p = 0;
    pctRef.current.textContent = "0%";
    fillRef.current.style.width = "0%";

    const t = setInterval(() => {
      p += Math.random() * 9 + 3; // 3 - 12 per tick
      if (p >= 100) {
        p = 100;
        clearInterval(t);
        setTimeout(() => {
          switchRef.current.classList.add("on");
          dotRef.current.style.background = "var(--ok)";
          dotRef.current.style.boxShadow = "0 0 0 4px #10b98122";
          handleClick();
        }, 300);
      }
      pctRef.current.textContent = Math.round(p) + "%";
      fillRef.current.style.width = p + "%";
    }, 180);
  };

  const handleClick = () => {
      const end = Date.now() + 3 * 1000; // 3 seconds
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
  
      const frame = () => {
        if (Date.now() > end) return;
  
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });
  
        requestAnimationFrame(frame);
      };
  
      frame();
    };

  // Run once on load
  // useEffect(() => {
  //   run();
  // }, []);

  return (
    <div className="frame" id="post">
      <div className="grid"></div>
       <div className="code" id="codeLayer" ref={codeLayerRef}>
      </div>

      <div className="card">
        {/* Left section */}
        <div>
          <div className="heading">
            <span className="kicker">CAREER UPDATE</span>
            <h1>
              From <span style={{ color: "var(--brand)" }}>Intern</span> to{" "}
              <span style={{ color: "var(--accent-2)" }}>Software Developer</span>
            </h1>
          </div>

          {/* Status + Switcher */}
          <div className="role">
            <span className="pill">
              <span className="dot" ref={dotRef}></span> Status: Upgrading
            </span>
            <div className="switch" ref={switchRef}>
              <div className="face intern">
                <span className="tag">v1.0</span>Software Developer Intern
              </div>
              <div className="face dev">
                <span className="tag">v2.0</span>Software Developer Executive
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="progress">
            <span className="label left">0%</span>
            <div className="bar">
              <div className="fill" ref={fillRef}>
                <span ref={pctRef}>0%</span>
              </div>
            </div>
            <span className="label right">100%</span>
          </div>

          {/* Upgrade Button */}
          <div className="upgrade-btn">
            <button onClick={run}>Click to Upgrade</button>
          </div>
        </div>

        {/* Right section */}
        <div className="panel">
          <div className="avatar">
            <img className="myImage" src={myImage} alt="my image" />
            <div className="badge">Promoted ✨</div>
          </div>
          <div className="name">Vaishali Sharma</div>
          <div className="sub">
            Building with JavaScript • React • Typescript • Node • Express • MongoDB
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <div className="tags">
            <span className="chip">#CareerUpdate</span>
            <span className="chip">#SoftwareDeveloper</span>
            <span className="chip">#FromInternToDev</span>
            <span className="chip">#WomenInTech</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
