import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X,
  Cpu, ShieldCheck, Network, Activity, Database, Code2, Terminal,
  Workflow, Layers3, ExternalLink, ChevronRight, Sparkles, Download,
  Radio, Zap, GitBranch, Server, BrainCircuit
} from "lucide-react";

const projects = [
  {
    id: "identity-gateway",
    number: "01",
    name: "Agent Identity Gateway",
    category: "AI Security · IAM · Agentic Systems",
    summary: "A security-focused gateway that gives AI workloads distinct identities and enforces human-to-agent delegated access to protected tools.",
    problem: "AI agents often access enterprise tools through shared API keys or long-lived credentials. Those credentials blur the distinction between the human authorizing an action and the workload executing it, making least-privilege access and auditability difficult.",
    approach: "A FastAPI gateway integrates Keycloak OAuth 2.0/OIDC identity and delegation with a protected MCP tool server. OPA/Rego evaluates default-deny authorization, while agent lifecycle checks and correlated SQLite audit events provide additional governance and traceability. Z3 checks selected authorization invariants.",
    highlights: ["Separate human and workload identity validation", "Audience-, scope- and lifetime-restricted delegated access", "Default-deny OPA/Rego authorization for MCP tools", "Agent lifecycle governance and credential-free audit logging", "Defensive regression tests and Z3 authorization checks"],
    stack: ["Python", "FastAPI", "Keycloak", "OAuth 2.0/OIDC", "MCP", "OPA/Rego", "Z3", "SQLite", "Docker", "GitHub Actions"],
    github: "https://github.com/sravasti12/agent-identity-gateway",
    release: "https://github.com/sravasti12/agent-identity-gateway/releases/tag/v1.0.0",
    accent: "cyan",
    icon: ShieldCheck,
    status: "v1.0.0 · Demo release"
  },
  {
    id: "ota",
    number: "02",
    name: "OTA Campaign Verifier",
    category: "Automotive · Safety Engineering",
    summary: "A deterministic planning and verification system for safer over-the-air ECU update campaigns.",
    problem: "Updating a fleet of vehicle ECUs is not simply a matter of choosing an order. Dependencies, conflicts, time budgets and failure states can make a campaign unsafe or infeasible.",
    approach: "A constraint-based planner uses Z3 to find valid update sequences and checks intermediate states. Fault-injection scenarios exercise recovery and rollback behavior. LangGraph coordinates release-note constraint extraction and review; safety-critical planning and invariants remain deterministic.",
    highlights: ["Z3 constraint-based campaign planning", "Dependency and conflict validation", "Fault injection and rollback simulation", "LLM-assisted constraint extraction and explanation"],
    stack: ["Python", "Z3", "LangGraph", "Pydantic", "Streamlit", "Pytest"],
    github: "https://github.com/sravasti12/OTA-Campaign-Verifier",
    accent: "cyan",
    icon: ShieldCheck,
    status: "Public repository"
  },
  {
    id: "plm",
    number: "03",
    name: "AutoPLM Twin",
    category: "Automotive · Agentic AI · Digital Twin",
    summary: "An engineering intelligence platform for validating PLM migrations and exploring product-configuration impact.",
    problem: "When engineering data moves between Product Lifecycle Management systems, important information can be lost or transformed incorrectly: hardware attributes, BOM components, relationships and configuration details may no longer agree.",
    approach: "A schema-driven pipeline normalizes source records, proposes semantic mappings, and verifies the result against deterministic engineering rules. A graph-backed digital-twin layer helps inspect configuration relationships and reason about downstream impact.",
    highlights: ["Schema-driven migration and normalization", "Agentic semantic mapping workflow", "Deterministic engineering verification", "Graph-based product configuration and impact analysis"],
    stack: ["Python", "FastAPI", "MongoDB", "NetworkX", "LangGraph", "Pydantic", "Pytest"],
    github: "https://github.com/sravasti12/AutoPLM-Twin",
    accent: "violet",
    icon: Network,
    status: "Public repository"
  },
  {
    id: "reliability",
    number: "04",
    name: "Equipment Reliability Intelligence",
    category: "Industrial AI · MLOps · RAG",
    summary: "An end-to-end reliability analytics platform combining predictive maintenance, operational monitoring and knowledge retrieval.",
    problem: "Industrial teams need more than a prediction score. They need to understand equipment risk, investigate sensor and maintenance evidence, and evaluate how a model behaves when operating data changes or becomes incomplete.",
    approach: "The platform is designed around a reproducible ML workflow: sensor and maintenance data ingestion, feature engineering, model evaluation, stress scenarios, monitoring and a retrieval-augmented knowledge layer for manuals and work orders.",
    highlights: ["Predictive-maintenance modelling workflow", "Sensor-loss and robustness scenarios", "Monitoring and model-performance evidence", "RAG over maintenance and equipment knowledge"],
    stack: ["Python", "Scikit-learn", "RAG", "FastAPI", "MLOps", "Streamlit", "Pytest"],
    github: "https://github.com/sravasti12/Equipment-Reliability-Intelligence-MLOps-Platform",
    accent: "lime",
    icon: Activity,
    status: "Public repository"
  }
];

const skills = [
  { group: "AI & Intelligent Systems", items: ["Machine Learning", "Generative AI", "RAG", "Agentic AI", "LangGraph", "PyTorch", "Scikit-learn"], icon: BrainCircuit },
  { group: "AI Security & IAM", items: ["OAuth 2.0", "OpenID Connect", "Workload Identity", "MCP", "OPA / Rego", "JWT"], icon: ShieldCheck },
  { group: "Backend & Data", items: ["Python", "FastAPI", "REST APIs", "MongoDB", "SQL", "Pydantic", "NetworkX"], icon: Database },
  { group: "Engineering & Delivery", items: ["Docker", "Git", "GitHub Actions", "CI/CD", "Pytest", "Linux", "Z3"], icon: Workflow }
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
};

function SectionHeading({ eyebrow, title, note }) {
  return <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="section-heading">
    <span className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</span>
    <h2>{title}</h2>
    {note && <p>{note}</p>}
  </motion.div>;
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const Icon = project.icon;
  return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <motion.div className={`project-modal ${project.accent}`} initial={{ opacity: 0, y: 28, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .98 }} transition={{ duration: .25 }}>
      <button className="modal-close" onClick={onClose} aria-label="Close project details"><X size={19}/></button>
      <div className="modal-kicker"><span>{project.number} / PROJECT FILE</span><span className="status"><i />{project.status}</span></div>
      <div className="modal-title-row"><div className="project-icon large"><Icon size={28}/></div><div><p className="project-category">{project.category}</p><h2>{project.name}</h2></div></div>
      <p className="modal-summary">{project.summary}</p>
      <div className="modal-content-grid">
        <div><h3>THE PROBLEM</h3><p>{project.problem}</p></div>
        <div><h3>ENGINEERING APPROACH</h3><p>{project.approach}</p></div>
      </div>
      <h3 className="modal-section-label">KEY CAPABILITIES</h3>
      <ul className="highlight-list">{project.highlights.map((item) => <li key={item}><ChevronRight size={15}/>{item}</li>)}</ul>
      <h3 className="modal-section-label">TECH STACK</h3>
      <div className="tag-list">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <div className="hero-actions"><a className="button button-primary modal-cta" href={project.github} target="_blank" rel="noreferrer">Explore repository <ArrowUpRight size={16}/></a>{project.release && <a className="button button-ghost modal-cta" href={project.release} target="_blank" rel="noreferrer">View v1.0.0 release <ExternalLink size={15}/></a>}</div>
    </motion.div>
  </motion.div>;
}

function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const terminalText = "building intelligent systems with purpose.";
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => { i++; setTyped(terminalText.slice(0, i)); if (i >= terminalText.length) clearInterval(timer); }, 48);
    return () => clearInterval(timer);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const nav = [["About", "#about"], ["Projects", "#projects"], ["Skills", "#skills"], ["Contact", "#contact"]];

  return <div className="site-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <div className="grid-overlay" />
    <header className="topbar">
      <a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark">SB<span>.</span></span><span className="brand-label">PORTFOLIO <i> / 2026</i></span></a>
      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        {nav.map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}</a>)}
        <a className="nav-contact" href="#contact" onClick={closeMenu}>Let's connect <ArrowUpRight size={14}/></a>
      </nav>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <motion.div className="availability" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}><span className="pulse-dot"/> OPEN TO OPPORTUNITIES <span className="availability-line"/></motion.div>
          <motion.p className="hero-pretitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }}>HELLO, I'M</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .28, duration: .7 }}>Sravasti<br/><span>Bose<span className="hero-period">.</span></span></motion.h1>
          <motion.div className="hero-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55 }}>
            <span className="role-bracket">[</span> SOFTWARE ENGINEERING <span className="role-separator">×</span> AI SYSTEMS <span className="role-bracket">]</span>
          </motion.div>
          <motion.p className="hero-description" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7 }}>
            I build practical, intelligent software at the intersection of <strong>AI, data and engineering</strong> — turning complex industry problems into systems that can be tested, understood and trusted.
          </motion.p>
          <motion.div className="hero-terminal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9 }}>
            <Terminal size={15}/><span className="terminal-prefix">~/sravasti $</span><span>{typed}</span><span className="cursor">▋</span>
          </motion.div>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}>
            <a className="button button-primary" href="#projects">Explore my work <ArrowRight size={16}/></a>
            <a className="button button-ghost" href="#contact">Get in touch <ArrowUpRight size={16}/></a>
          </motion.div>
          <motion.div className="social-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
            <a href="https://github.com/sravasti12" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a>
            <a href="https://www.linkedin.com/in/sravasti-bose-56725a279/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a>
            <span className="social-caption">FIND ME ONLINE</span>
          </motion.div>
        </div>

        <motion.div className="hero-visual" initial={{ opacity: 0, scale: .92, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, delay: .35 }}>
          <div className="visual-topline"><span>FIG. 01 — SYSTEMS THINKING</span><span>LIVE / 001</span></div>
          <div className="orbit orbit-outer"/><div className="orbit orbit-mid"/><div className="orbit orbit-inner"/>
          <div className="core-glow"><div className="core-symbol"><Cpu size={48} strokeWidth={1}/></div></div>
          <div className="orbit-node node-a"><BrainCircuit size={18}/></div><div className="orbit-node node-b"><Database size={18}/></div><div className="orbit-node node-c"><ShieldCheck size={18}/></div>
          <div className="visual-coordinates">22°34' N<br/>88°22' E</div>
          <div className="visual-label label-top">INTELLIGENCE <span>01</span></div><div className="visual-label label-bottom">ENGINEERING <span>02</span></div>
          <div className="visual-footer"><span><i/> SYSTEMS ONLINE</span><span>AI / DATA / SOFTWARE</span></div>
          <div className="crosshair crosshair-one"/><div className="crosshair crosshair-two"/>
        </motion.div>
        <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={14}/></a>
      </section>

      <section className="ticker" aria-label="Areas of focus"><div className="ticker-track">{Array(2).fill(["AGENTIC AI","·","AI SECURITY","·","IDENTITY & ACCESS","·","ENGINEERING SYSTEMS","·","MACHINE LEARNING","·","AUTOMOTIVE TECHNOLOGY","·","MLOPS","·","RAG"]).flat().map((item, i) => <span key={i} className={item === "·" ? "ticker-dot" : ""}>{item}</span>)}</div></section>

      <section className="section-wrap about-section" id="about">
        <SectionHeading eyebrow="01 / THE PERSON BEHIND THE CODE" title={<>Curiosity meets<br/><span className="gradient-text">engineering discipline.</span></>} />
        <div className="about-grid">
          <motion.div className="about-lead" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="big-quote">“</span>
            <p>I’m an engineer interested in building software that solves <em>real problems</em> — especially where intelligent systems meet complex engineering workflows.</p>
          </motion.div>
          <motion.div className="about-detail" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p>My work spans agentic AI workflows, machine learning, backend development and engineering-focused platforms. I enjoy understanding a problem from the ground up, designing a system around it, and making its behavior observable through tests and evidence.</p>
            <p>I’m particularly interested in automotive technology, industrial intelligence and applied AI — domains where reliability, traceability and thoughtful engineering matter.</p>
            <div className="about-facts"><div><span className="fact-number">04</span><span>FEATURED PROJECTS</span></div><div><span className="fact-number">AI +</span><span>ENGINEERING FOCUS</span></div><div><span className="fact-number">∞</span><span>ROOM TO EXPLORE</span></div></div>
          </motion.div>
        </div>
      </section>

      <section className="section-wrap projects-section" id="projects">
        <SectionHeading eyebrow="02 / SELECTED WORK" title={<>Projects built to<br/><span className="gradient-text">solve meaningful problems.</span></>} note="A selection of engineering projects exploring AI security, safety, product data intelligence and industrial reliability."/>
        <div className="project-list">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return <motion.article key={project.id} className={`project-card ${project.accent}`} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} transition={{ delay: index * .08 }}>
              <div className="project-index"><span>{project.number}</span><span className="index-line"/></div>
              <div className="project-main">
                <div className="project-meta"><span>{project.category}</span><span className="project-status"><i/>{project.status}</span></div>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <div className="tag-list">{project.stack.slice(0, 5).map((tag) => <span key={tag}>{tag}</span>)}</div>
                <button className="text-link" onClick={() => setActiveProject(project)}>Explore project <ArrowUpRight size={16}/></button>
              </div>
              <div className="project-art">
                <div className="art-grid"/>
                <div className="art-orbit art-orbit-one"/><div className="art-orbit art-orbit-two"/>
                <div className="art-center"><Icon size={42} strokeWidth={1.15}/></div>
                <span className="art-code">SYS_{project.number}</span><span className="art-coordinate">0{index + 1} / 04</span>
                <div className="art-bars"><i/><i/><i/><i/><i/><i/><i/></div>
              </div>
              <a className="project-github" href={project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} GitHub repository`}><Github size={18}/></a>
            </motion.article>;
          })}
        </div>
      </section>

      <section className="section-wrap skills-section" id="skills">
        <SectionHeading eyebrow="03 / MY TOOLKIT" title={<>Tools are useful.<br/><span className="gradient-text">How you think is the edge.</span></>} note="Technologies I use across my projects and continue to develop through hands-on engineering."/>
        <div className="skills-grid">
          {skills.map((group, i) => { const Icon = group.icon; return <motion.div className="skill-card" key={group.group} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * .1 }}>
            <div className="skill-card-top"><div className="skill-icon"><Icon size={20}/></div><span>0{i + 1}</span></div>
            <h3>{group.group}</h3>
            <div className="skill-tags">{group.items.map(item => <span key={item}>{item}</span>)}</div>
          </motion.div>; })}
        </div>
        <div className="learning-note"><Sparkles size={16}/><span>Always learning. Always building. Focused on depth, not just a list of tools.</span></div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-noise"/>
        <div className="section-wrap contact-inner">
          <SectionHeading eyebrow="04 / START A CONVERSATION" title={<>Have a problem<br/>worth <span className="gradient-text">solving?</span></>} note="I’m open to opportunities in software engineering, AI/ML and engineering technology."/>
          <div className="contact-bottom">
            <a className="contact-email" href="mailto:bosesravasti8@example.com">Let's build something <ArrowUpRight size={22}/></a>
            <div className="contact-links">
              <a href="https://github.com/sravasti12" target="_blank" rel="noreferrer"><Github size={17}/> GitHub <ArrowUpRight size={13}/></a>
              <a href="https://www.linkedin.com/in/sravasti-bose-56725a279/" target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn <ArrowUpRight size={13}/></a>
              <a href="mailto:bosesravasti8@example.com"><Mail size={17}/> Email <ArrowUpRight size={13}/></a>
            </div>
          </div>
          <footer><a className="brand" href="#home"><span className="brand-mark">SB<span>.</span></span></a><span>DESIGNED & BUILT BY SRAVASTI BOSE</span><span>© 2026 — ALL SYSTEMS GO</span></footer>
        </div>
      </section>
    </main>
    <AnimatePresence>{activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)}/>}</AnimatePresence>
    <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ArrowUpRight size={18}/></button>
  </div>;
}

export default App;
