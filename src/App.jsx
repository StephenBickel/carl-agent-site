import { useEffect, useState } from "react";

const INSTALL_COMMAND = "git clone https://github.com/StephenBickel/carl-agent.git";
const GITHUB_URL = "https://github.com/StephenBickel/carl-agent";
const DOCS_URL = `${GITHUB_URL}/tree/main/docs`;
const CHANGELOG_URL = `${GITHUB_URL}/blob/main/CHANGELOG.md`;
const DESIGN_URL = `${GITHUB_URL}/blob/main/docs/superpowers/specs/2026-07-23-carl-top-tier-harness-design.md`;

const processRows = [
  {
    number: "01",
    label: "Plan the turn",
    transcript: ["> Frame the next turn", "✓ Context recalled", "→ Plan recorded"],
  },
  {
    number: "02",
    label: "Check the boundary",
    transcript: ["> Evaluate the policy", "✓ Budget checked", "→ Boundary clear"],
  },
  {
    number: "03",
    label: "Act within bounds",
    transcript: ["> Prepare the patch", "✓ Budget checked", "✓ Approval recorded", "✓ Workspace bounded", "→ Event log appended"],
  },
  {
    number: "04",
    label: "Replay the record",
    transcript: ["> Rebuild the session", "✓ Checksums verified", "→ Record replayed"],
  },
];

const taskStates = ["PLAN", "APPROVE", "REPLAY"];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="icon-arrow">
      <path d="M4 12 12 4M5 4h7v7" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="icon-copy">
      <path d="M7 6h9v10H7z" />
      <path d="M4 3h9v3M4 3v10h3" />
    </svg>
  );
}

function PixelWordmark({ footer = false }) {
  return (
    <span className={`wordmark ${footer ? "wordmark--footer" : ""}`}>
      CARL<span aria-hidden="true">.</span>
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <a href="#top" className="brand-link" aria-label="Carl home" onClick={closeMenu}>
        <PixelWordmark />
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
      </button>
      <nav className={`site-nav ${open ? "site-nav--open" : ""}`} aria-label="Primary navigation">
        <a href="#workflow" onClick={closeMenu}>Architecture</a>
        <a href="#control" onClick={closeMenu}>Guardrails</a>
        <a href="#install" onClick={closeMenu}>Build</a>
      </nav>
      <a className="github-link" href={GITHUB_URL} target="_blank" rel="noreferrer">
        GitHub
        <ArrowIcon />
      </a>
    </header>
  );
}

function TaskRail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % taskStates.length);
    }, 1600);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <ol className="task-rail" aria-label="Carl task state">
      {taskStates.map((state, index) => (
        <li className={active === index ? "is-active" : ""} key={state}>
          <span className="task-square" aria-hidden="true" />
          <span>{state}</span>
        </li>
      ))}
    </ol>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <Header />
      <div className="hero-grid">
        <div className="hero-copy">
          <h1>AN AGENT<br /><span className="wide-line">WITH PROOF.</span></h1>
          <p>
            Carl is a local-first Rust agent built around replayable events, explicit approvals, and interchangeable models.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href={GITHUB_URL} target="_blank" rel="noreferrer">
              <span aria-hidden="true">&gt;_</span>
              Explore the code
            </a>
            <a className="button button--ghost" href={DESIGN_URL} target="_blank" rel="noreferrer">
              <span aria-hidden="true">&gt;_</span>
              Read the design
            </a>
          </div>
        </div>

        <div className="hero-art" aria-label="Carl pixel agent logo">
          <div className="pixel-debris pixel-debris--top" aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
          </div>
          <div className="logo-art">
            <img src="/assets/carl-logo.png" alt="Carl, a red-orange pixel agent" />
          </div>
          <div className="pixel-debris pixel-debris--bottom" aria-hidden="true">
            {Array.from({ length: 15 }, (_, index) => <i key={index} />)}
          </div>
          <TaskRail />
        </div>
      </div>
      <div className="hero-tail" aria-hidden="true">
        <span>&gt;_ PRE-ALPHA / BUILT IN PUBLIC</span>
        <i />
        <div className="tail-pixels"><b /><b /><b /><b /></div>
      </div>
    </section>
  );
}

function Workflow() {
  const [activeRow, setActiveRow] = useState(2);
  const activeTranscript = processRows[activeRow].transcript;

  return (
    <section className="workflow" id="workflow">
      <div className="corner-pixels corner-pixels--top" aria-hidden="true"><i /><i /><i /></div>
      <div className="workflow-layout">
        <div className="workflow-copy">
          <p className="section-label">// EVENT-SOURCED BY DESIGN</p>
          <h2>EVERY TURN<br /><span className="wide-line">IS REPLAYABLE.</span></h2>
          <p className="section-intro">
            Plans, approvals, tool calls, and outcomes belong to one replayable event stream. You can inspect how Carl reached the result.
          </p>
          <div className="process-list" role="list" aria-label="How Carl works">
            {processRows.map((row, index) => (
              <button
                className={`process-row ${activeRow === index ? "is-active" : ""}`}
                type="button"
                key={row.number}
                onClick={() => setActiveRow(index)}
                aria-pressed={activeRow === index}
              >
                <span className="process-number">{row.number}</span>
                <span className="process-node" aria-hidden="true" />
                <span>{row.label}</span>
              </button>
            ))}
          </div>
          <a className="text-link" href="#control">
            Explore capabilities
            <ArrowIcon />
          </a>
        </div>

        <div className="transcript" aria-live="polite">
          <div className="tape-edge tape-edge--left" aria-hidden="true">
            {Array.from({ length: 9 }, (_, index) => <i key={index} />)}
          </div>
          <div className="transcript-lines" key={activeRow}>
            {activeTranscript.map((line, index) => (
              <p className={index === activeTranscript.length - 1 ? "transcript-final" : ""} key={line}>
                {line}
                {index === activeTranscript.length - 1 && <span className="cursor" aria-hidden="true" />}
              </p>
            ))}
          </div>
          <div className="tape-edge tape-edge--right" aria-hidden="true">
            {Array.from({ length: 9 }, (_, index) => <i key={index} />)}
          </div>
        </div>
      </div>
      <div className="corner-pixels corner-pixels--bottom" aria-hidden="true"><i /><i /><i /></div>
    </section>
  );
}

function PermissionRail({ label, items, caution = false }) {
  return (
    <div className={`permission-rail ${caution ? "permission-rail--caution" : ""}`}>
      <div className="rail-heading">
        <span>{label}</span>
        <i aria-hidden="true" />
      </div>
      <div className="rail-items">
        {items.map((item) => <span key={item}>{item}</span>)}
      </div>
      {caution && <b className="rail-runner" aria-hidden="true" />}
    </div>
  );
}

function ControlAndInstall() {
  const [copyState, setCopyState] = useState("Copy command");

  const copyInstall = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopyState("Copied");
      window.setTimeout(() => setCopyState("Copy command"), 1800);
    } catch {
      setCopyState("Select command");
    }
  };

  return (
    <>
      <section className="control" id="control">
        <div className="ghost-c" aria-hidden="true">C</div>
        <div className="control-heading">
          <h2>THE FINAL CALL<br />STAYS YOURS.</h2>
          <p>Carl can draft and prepare.<br />Consequential actions cross an explicit approval boundary.</p>
        </div>
        <div className="permission-list">
          <PermissionRail
            label="MOVES FAST"
            items={["Read the workspace", "Recall context", "Draft changes"]}
          />
          <PermissionRail
            label="STOPS & ASKS"
            items={["Run commands", "Send messages", "Publish changes"]}
            caution
          />
        </div>
      </section>

      <section className="install" id="install">
        <div className="install-command">
          <p>PRE-ALPHA — BUILD FROM SOURCE</p>
          <code>{INSTALL_COMMAND}<span className="cursor" aria-hidden="true" /></code>
        </div>
        <div className="install-actions">
          <button type="button" className="install-button" onClick={copyInstall}>
            <CopyIcon />
            {copyState}
          </button>
          <a className="install-button" href={GITHUB_URL} target="_blank" rel="noreferrer">
            <span className="github-glyph" aria-hidden="true">●</span>
            View on GitHub
            <ArrowIcon />
          </a>
        </div>
      </section>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <PixelWordmark footer />
      <nav aria-label="Footer navigation">
        <a href={DOCS_URL} target="_blank" rel="noreferrer">Docs</a>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
        <a href={CHANGELOG_URL} target="_blank" rel="noreferrer">Changelog</a>
      </nav>
      <p>Rust core. Replayable state. Built in public.</p>
    </footer>
  );
}

export default function App() {
  return (
    <main>
      <Hero />
      <Workflow />
      <ControlAndInstall />
      <Footer />
    </main>
  );
}
