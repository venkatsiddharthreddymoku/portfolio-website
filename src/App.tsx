import { useEffect, useRef, useState } from 'react';
import { Mail, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from './data';
import './index.css';
import './App.css';

/* ── Custom SVG Icons ── */
const Github = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/* ── Scroll Reveal Hook ── */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    // Only hide element if JS/observer is confirmed to work
    ref.current.classList.add('js-reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.querySelectorAll('.skill-progress').forEach((bar) => {
              const level = bar.getAttribute('data-level');
              if (level) (bar as HTMLElement).style.width = level + '%';
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ── App ── */
function App() {
  const introRef = useReveal();
  const aboutRef = useReveal();
  const projectsRef = useReveal();
  const servicesRef = useReveal();
  const contactRef = useReveal();
  const [menuOpen, setMenuOpen] = useState(false);

  // Theme toggle with localStorage persistence
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <>
      <div className="bg-texture" />

      <div className="app-wrapper">
        {/* ── Navbar ── */}
        <nav className="navbar">
          <div className="nav-brand">Siddharth.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
            <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
              <a href="#intro" onClick={() => setMenuOpen(false)}>Intro</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
              <a href="#projects" onClick={() => setMenuOpen(false)}>Work</a>
              <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            </div>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <span /><span /><span />
            </button>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="hero container">
          <div className="hero-top anim-fade d1">
            <span className="hero-label">Portfolio — 2026</span>
            <span className="hero-year">B.Tech CS IT · KLH</span>
          </div>

          <h1 className="hero-name">
            <span className="line anim-slide-up d1">Venkat Siddharth</span>
            <span className="line outline anim-slide-up d2">Reddy Moku</span>
          </h1>

          <div className="hero-bottom anim-fade d3">
            <p className="hero-desc">
              First-year Computer Science student at <strong>KL University</strong>. 
              I build full-stack systems, experiment with AI integrations, and believe 
              in shipping real software — not just assignments.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn">View Work</a>
              <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="btn btn-filled">LinkedIn</a>
            </div>
          </div>

          <div className="scroll-indicator anim-fade d4">
            <span>Scroll</span>
            <div className="scroll-line" />
          </div>
        </section>

        {/* ── Intro — Self Introduction ── */}
        <section id="intro" className="intro-section container reveal" ref={introRef}>
          <div className="intro-header">
            <h2 className="section-title">Who Am I</h2>
            <span className="section-num">00</span>
          </div>
          <div className="intro-content">
            <div className="intro-left">
              <h3>I'm Siddharth — a builder, not just a student.</h3>
              <p>
                Most people my age are still figuring out what to do with code. I'm already 
                shipping it. From writing my first Java program to architecting full-stack 
                platforms with real-time sync and AI tutors — I've compressed years of 
                learning into months of obsessive building.
              </p>
              <p>
                I don't wait for coursework to teach me things. When I wanted to understand 
                auctions, I built an entire bidding system. When I wanted to learn AI 
                integration, I built an educational platform with Google Gemini. That's 
                just how I operate — learn by shipping.
              </p>
              <p>
                Outside of code, I'm someone who stays curious, takes on challenges that 
                feel slightly impossible, and genuinely believes that a well-built system 
                can change how people experience technology.
              </p>
            </div>
            <div className="intro-right">
              <div className="intro-detail">
                <div className="intro-detail-label">Full Name</div>
                <div className="intro-detail-value">Venkat Siddharth Reddy Moku</div>
              </div>
              <div className="intro-detail">
                <div className="intro-detail-label">Currently</div>
                <div className="intro-detail-value">B.Tech 1st Year — CS & IT</div>
              </div>
              <div className="intro-detail">
                <div className="intro-detail-label">University</div>
                <div className="intro-detail-value">KL University (KLH)</div>
              </div>
              <div className="intro-detail">
                <div className="intro-detail-label">Based In</div>
                <div className="intro-detail-value">India</div>
              </div>
              <div className="intro-detail">
                <div className="intro-detail-label">Interests</div>
                <div className="intro-interests">
                  <span>Full-Stack Dev</span>
                  <span>AI / ML</span>
                  <span>System Design</span>
                  <span>Open Source</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="about-section container reveal" ref={aboutRef}>
          <div className="about-header">
            <h2 className="section-title">Skills & Tech</h2>
            <span className="section-num">01</span>
          </div>
          <div className="about-grid">
            <div className="about-text">
              {PORTFOLIO_DATA.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="skills-wrap">
              <span className="skills-wrap-label">Technologies</span>
              {PORTFOLIO_DATA.skills.map((skill, i) => (
                <div className="skill-row" key={i}>
                  <div className="skill-row-top">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="skill-track">
                    <div className="skill-progress" data-level={skill.level} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="projects-section container reveal" ref={projectsRef}>
          <div className="projects-header">
            <h2 className="section-title">Selected Work</h2>
            <span className="section-num">02</span>
          </div>
          <p className="projects-tagline">"Ship it before it's perfect. Perfect it after it ships."</p>

          {PORTFOLIO_DATA.projects.map((project, index) => (
            <div className="project-item" key={project.id}>
              <span className="project-num">0{index + 1}</span>
              <div className="project-body">
                <div className="project-title-row">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-status">{project.status}</span>
                </div>
                <p className="project-desc">{project.description}</p>
                <ul className="project-tech-list">
                  {project.tech.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noreferrer" aria-label="Source code">
                  <Github size={16} />
                </a>
                {project.live !== '#' && (
                  <a href={project.live} target="_blank" rel="noreferrer" aria-label="Live demo">
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* ── Services ── */}
        <section id="services" className="services-section container reveal" ref={servicesRef}>
          <div className="services-header">
            <h2 className="section-title">What I Can Do For You</h2>
            <span className="section-num">03</span>
          </div>
          <p className="services-subtitle">
            Need something built, designed, or polished? I offer freelance services
            that blend clean code with sharp visuals. Let's make it happen.
          </p>

          <div className="services-grid">
            {/* Web Development */}
            <div className="service-card">
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                  <polyline points="7 8 5 10 7 12" />
                  <polyline points="17 8 19 10 17 12" />
                  <line x1="14" y1="7" x2="10" y2="13" />
                </svg>
              </div>
              <h3 className="service-title">Website Development</h3>
              <p className="service-desc">
                From landing pages to full-stack web apps — I design and develop fast,
                responsive, and visually stunning websites tailored to your needs.
              </p>
              <ul className="service-tags">
                <li>Landing Pages</li>
                <li>Portfolios</li>
                <li>Web Apps</li>
                <li>Dashboards</li>
              </ul>
              <a href="#contact" className="service-cta">Get a Quote →</a>
            </div>

            {/* Logo & Branding */}
            <div className="service-card">
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 className="service-title">Logo & Branding</h3>
              <p className="service-desc">
                Your brand deserves an identity that stands out. I create modern logos
                and cohesive brand kits that leave a lasting impression.
              </p>
              <ul className="service-tags">
                <li>Logo Design</li>
                <li>Brand Identity</li>
                <li>Style Guides</li>
                <li>Social Kits</li>
              </ul>
              <a href="#contact" className="service-cta">Get a Quote →</a>
            </div>

            {/* Photo & Graphics */}
            <div className="service-card">
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <h3 className="service-title">Photo & Graphics</h3>
              <p className="service-desc">
                Need photo editing, social media graphics, or promotional material?
                I deliver pixel-perfect visuals that elevate your content.
              </p>
              <ul className="service-tags">
                <li>Photo Editing</li>
                <li>Thumbnails</li>
                <li>Banners</li>
                <li>Posters</li>
              </ul>
              <a href="#contact" className="service-cta">Get a Quote →</a>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="contact-section container reveal" ref={contactRef}>
          <h2 className="contact-title">Let's Talk</h2>
          <p className="contact-desc">
            Got a project idea, want to collaborate, or just want to connect — 
            I'm always up for a conversation.
          </p>
          <div className="contact-btns">
            <a href={`mailto:${PORTFOLIO_DATA.socials.email.replace('mailto:', '')}`} className="btn btn-filled">
              <Mail size={16} /> Email Me
            </a>
            <a href={PORTFOLIO_DATA.socials.github} target="_blank" rel="noreferrer" className="btn">
              <Github size={16} /> GitHub
            </a>
            <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="btn">
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="footer container">
          <span className="footer-left">
            © 2026 — {PORTFOLIO_DATA.name}
          </span>
          <div className="footer-links">
            <a href={PORTFOLIO_DATA.socials.github} target="_blank" rel="noreferrer"><Github size={18} /></a>
            <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /></a>
            <a href={`mailto:${PORTFOLIO_DATA.socials.email.replace('mailto:', '')}`}><Mail size={18} /></a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
