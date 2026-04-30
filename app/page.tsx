// @ts-nocheck
'use client';
import { useEffect, useState } from 'react';
import { siteData } from '@/lib/site-data';

const css = `
  :root {
    --gr-bg: #111111;
    --gr-surface: #181818;
    --gr-card: #1E1E1E;
    --gr-primary: #CC2200;
    --gr-primary-dark: #A81B00;
    --gr-accent: #FF4422;
    --gr-text: #F4F0EC;
    --gr-muted: rgba(244,240,236,0.55);
    --gr-border: rgba(204,34,0,0.15);
    --font-display: var(--font-oswald), 'Oswald', sans-serif;
    --font-body: var(--font-source-sans), 'Source Sans 3', sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); background: var(--gr-bg); color: var(--gr-text); overflow-x: hidden; }

  /* NAV */
  .gr-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2.5rem; height: 66px;
    transition: background 0.3s, box-shadow 0.3s;
  }
  .gr-nav.scrolled {
    background: rgba(17,17,17,0.97);
    box-shadow: 0 1px 20px rgba(0,0,0,0.5);
    backdrop-filter: blur(10px);
  }
  .gr-nav-logo {
    font-family: var(--font-display);
    font-size: 1.8rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--gr-text); text-decoration: none;
  }
  .gr-nav-logo span { color: var(--gr-primary); }
  .gr-nav-links { display: flex; gap: 2rem; align-items: center; }
  .gr-nav-links a {
    font-size: 0.8rem; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase;
    color: var(--gr-muted); text-decoration: none; transition: color 0.2s;
  }
  .gr-nav-links a:hover { color: var(--gr-primary); }
  .gr-btn-nav {
    background: var(--gr-primary); color: #fff;
    padding: 0.5rem 1.4rem;
    font-family: var(--font-display);
    font-size: 0.85rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    text-decoration: none; transition: background 0.2s;
  }
  .gr-btn-nav:hover { background: var(--gr-accent); }

  /* INSET/CARD HERO — full bg photo + contained video card */
  .gr-hero {
    min-height: 100vh;
    position: relative;
    display: flex; align-items: center;
    overflow: hidden;
  }
  .gr-hero-bg {
    position: absolute; inset: 0;
    background-image: url('https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=1800&q=80');
    background-size: cover; background-position: center;
    filter: brightness(0.25) saturate(0.6);
  }
  .gr-hero-bg-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(17,17,17,0.5) 0%, rgba(204,34,0,0.1) 100%);
  }
  .gr-hero-inner {
    position: relative; z-index: 2;
    max-width: 1200px; margin: 0 auto; padding: 8rem 2.5rem 5rem;
    display: grid; grid-template-columns: 1fr 440px; gap: 4rem; align-items: center;
  }
  .gr-hero-copy {}
  .gr-hero-tag {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-family: var(--font-display);
    font-size: 0.78rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--gr-primary);
    margin-bottom: 1.5rem;
  }
  .gr-hero-tag::before { content: ''; display: inline-block; width: 18px; height: 2px; background: var(--gr-primary); }
  .gr-hero-title {
    font-family: var(--font-display);
    font-size: clamp(3.5rem, 6vw, 6.5rem);
    font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
    color: var(--gr-text); line-height: 0.95;
    margin-bottom: 1.5rem;
  }
  .gr-hero-title span { color: var(--gr-primary); display: block; }
  .gr-hero-sub { font-size: 1rem; line-height: 1.75; color: var(--gr-muted); max-width: 420px; margin-bottom: 2.5rem; }
  .gr-hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
  .gr-btn-primary {
    background: var(--gr-primary); color: #fff;
    padding: 0.9rem 2rem;
    font-family: var(--font-display);
    font-weight: 700; font-size: 1rem; letter-spacing: 0.08em; text-transform: uppercase;
    text-decoration: none; transition: background 0.2s, transform 0.2s;
  }
  .gr-btn-primary:hover { background: var(--gr-accent); transform: translateY(-2px); }
  .gr-btn-ghost {
    border: 2px solid rgba(244,240,236,0.2); color: var(--gr-muted);
    padding: 0.9rem 2rem;
    font-family: var(--font-display);
    font-weight: 600; font-size: 1rem; letter-spacing: 0.08em; text-transform: uppercase;
    text-decoration: none; transition: border-color 0.2s, color 0.2s;
  }
  .gr-btn-ghost:hover { border-color: var(--gr-primary); color: var(--gr-primary); }

  /* INSET VIDEO CARD */
  .gr-video-card {
    background: rgba(255,255,255,0.05);
    border: 1.5px solid rgba(255,255,255,0.12);
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 24px 64px rgba(0,0,0,0.5);
    aspect-ratio: 9/16;
    max-height: 520px;
    position: relative;
  }
  .gr-video-card video {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
  }
  .gr-video-label {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: var(--gr-primary);
    padding: 0.75rem 1.25rem;
    display: flex; align-items: center; gap: 0.75rem;
  }
  .gr-video-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #fff;
    animation: gr-pulse 1.5s infinite;
  }
  @keyframes gr-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }
  .gr-video-label-text {
    font-family: var(--font-display);
    font-size: 0.88rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: #fff;
  }

  /* STATS */
  .gr-stats-strip { background: var(--gr-primary); padding: 2rem; }
  .gr-stats-inner {
    max-width: 900px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(4, 1fr); text-align: center;
  }
  .gr-stat-value {
    font-family: var(--font-display);
    font-size: 2.4rem; font-weight: 700; color: #fff; margin-bottom: 0.2rem;
  }
  .gr-stat-label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.65); }

  /* SECTIONS */
  section { padding: 6rem 2rem; }
  .gr-section-tag {
    font-family: var(--font-display);
    font-size: 0.8rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--gr-primary); margin-bottom: 0.5rem; display: inline-block;
  }
  .gr-section-title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 4vw, 4rem);
    font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
    color: var(--gr-text); line-height: 0.95; margin-bottom: 1rem;
  }
  .gr-section-sub { font-size: 1rem; line-height: 1.75; color: var(--gr-muted); max-width: 540px; }

  /* PILLARS */
  .gr-pillars-section { background: var(--gr-surface); }
  .gr-pillars-inner { max-width: 1200px; margin: 0 auto; }
  .gr-pillars-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; flex-wrap: wrap; gap: 2rem; }
  .gr-pillars-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(204,34,0,0.08); border: 1px solid rgba(204,34,0,0.08); }
  .gr-pillar-cell {
    background: var(--gr-card); padding: 2.5rem 2rem;
    transition: background 0.2s;
  }
  .gr-pillar-cell:hover { background: #222; }
  .gr-pillar-icon { font-size: 1.8rem; margin-bottom: 1rem; }
  .gr-pillar-name {
    font-family: var(--font-display);
    font-size: 1.15rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
    color: var(--gr-text); margin-bottom: 0.6rem;
  }
  .gr-pillar-desc { font-size: 0.88rem; line-height: 1.65; color: var(--gr-muted); }

  /* CLASSES */
  .gr-classes-section { background: var(--gr-bg); }
  .gr-classes-inner { max-width: 1200px; margin: 0 auto; }
  .gr-classes-header { margin-bottom: 3rem; }
  .gr-classes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(204,34,0,0.08); border: 1px solid rgba(204,34,0,0.08); }
  .gr-class-cell {
    background: var(--gr-card); padding: 2rem;
    position: relative; overflow: hidden;
    transition: background 0.2s;
  }
  .gr-class-cell:hover { background: #1F1F1F; }
  .gr-class-cell::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--gr-primary);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s;
  }
  .gr-class-cell:hover::before { transform: scaleX(1); }
  .gr-class-badges { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
  .gr-badge {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    padding: 0.25rem 0.65rem;
  }
  .gr-badge-level { background: rgba(204,34,0,0.12); color: var(--gr-primary); }
  .gr-badge-dur { background: rgba(244,240,236,0.06); color: var(--gr-muted); }
  .gr-class-name {
    font-family: var(--font-display);
    font-size: 1.2rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
    color: var(--gr-text); margin-bottom: 0.75rem;
  }
  .gr-class-desc { font-size: 0.88rem; line-height: 1.65; color: var(--gr-muted); }

  /* PRICING */
  .gr-pricing-section { background: var(--gr-surface); }
  .gr-pricing-inner { max-width: 1100px; margin: 0 auto; }
  .gr-pricing-header { text-align: center; margin-bottom: 3.5rem; }
  .gr-pricing-header .gr-section-sub { margin: 0 auto; }
  .gr-pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(204,34,0,0.08); border: 1px solid rgba(204,34,0,0.08); }
  .gr-price-card { background: var(--gr-card); padding: 2.5rem 2rem; position: relative; }
  .gr-price-card.highlight { background: #1A0500; border-top: 2px solid var(--gr-primary); }
  .gr-popular-badge {
    position: absolute; top: 0; left: 0; right: 0;
    background: var(--gr-primary);
    font-family: var(--font-display);
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: #fff; text-align: center; padding: 0.3rem;
  }
  .gr-price-name {
    font-family: var(--font-display);
    font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--gr-muted); margin-bottom: 0.75rem; margin-top: 0.5rem;
  }
  .gr-price-card.highlight .gr-price-name { margin-top: 2rem; }
  .gr-price-amount { font-family: var(--font-display); font-size: 3rem; font-weight: 700; color: var(--gr-primary); line-height: 1; margin-bottom: 0.2rem; }
  .gr-price-period { font-size: 0.82rem; color: var(--gr-muted); margin-bottom: 1.75rem; }
  .gr-price-features { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; margin-bottom: 2rem; }
  .gr-price-features li { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.88rem; color: var(--gr-muted); }
  .gr-check { color: var(--gr-primary); flex-shrink: 0; font-weight: 700; }
  .gr-price-cta {
    display: block; text-align: center; padding: 0.9rem;
    font-family: var(--font-display);
    font-weight: 700; font-size: 0.9rem; letter-spacing: 0.1em; text-transform: uppercase;
    text-decoration: none; transition: all 0.2s;
  }
  .gr-price-card.highlight .gr-price-cta { background: var(--gr-primary); color: #fff; }
  .gr-price-card.highlight .gr-price-cta:hover { background: var(--gr-accent); }
  .gr-price-card:not(.highlight) .gr-price-cta { border: 1px solid rgba(244,240,236,0.12); color: var(--gr-muted); }
  .gr-price-card:not(.highlight) .gr-price-cta:hover { border-color: var(--gr-primary); color: var(--gr-primary); }

  /* CTA */
  .gr-cta-section { background: var(--gr-bg); text-align: center; padding: 7rem 2rem; position: relative; overflow: hidden; }
  .gr-cta-section::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(204,34,0,0.07) 0%, transparent 100%);
  }
  .gr-cta-inner { max-width: 620px; margin: 0 auto; position: relative; }
  .gr-cta-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 6vw, 6rem);
    font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
    color: var(--gr-text); line-height: 0.95; margin-bottom: 1.25rem;
  }
  .gr-cta-title span { color: var(--gr-primary); display: block; }
  .gr-cta-sub { font-size: 1rem; color: var(--gr-muted); margin-bottom: 2.5rem; line-height: 1.75; }
  .gr-btn-cta {
    background: var(--gr-primary); color: #fff;
    padding: 1.1rem 3rem;
    font-family: var(--font-display);
    font-weight: 700; font-size: 1rem; letter-spacing: 0.1em; text-transform: uppercase;
    text-decoration: none; display: inline-block;
    transition: background 0.2s, transform 0.2s;
  }
  .gr-btn-cta:hover { background: var(--gr-accent); transform: translateY(-2px); }

  /* FOOTER */
  .gr-footer { background: #0A0A0A; padding: 4rem 2rem 2rem; }
  .gr-footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; }
  .gr-footer-logo { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--gr-text); margin-bottom: 0.75rem; }
  .gr-footer-logo span { color: var(--gr-primary); }
  .gr-footer-desc { font-size: 0.88rem; line-height: 1.6; color: var(--gr-muted); max-width: 280px; }
  .gr-footer-h { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(244,240,236,0.28); margin-bottom: 1rem; }
  .gr-footer-links { list-style: none; display: flex; flex-direction: column; gap: 0.65rem; }
  .gr-footer-links a { color: var(--gr-muted); text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
  .gr-footer-links a:hover { color: var(--gr-primary); }
  .gr-footer-bottom {
    max-width: 1200px; margin: 2.5rem auto 0;
    padding-top: 2rem; border-top: 1px solid rgba(244,240,236,0.06);
    display: flex; justify-content: space-between; align-items: center;
    font-size: 0.78rem; color: var(--gr-muted); flex-wrap: wrap; gap: 0.5rem;
  }
  .gr-footer-brand { color: var(--gr-primary); text-decoration: none; font-weight: 700; }

  /* REVEAL */
  .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .reveal.visible { opacity: 1; transform: none; }

  @media (max-width: 900px) {
    .gr-hero-inner { grid-template-columns: 1fr; }
    .gr-video-card { max-height: 240px; aspect-ratio: 16/9; }
    .gr-pillars-grid { grid-template-columns: repeat(2, 1fr); }
    .gr-classes-grid { grid-template-columns: 1fr; }
    .gr-pricing-grid { grid-template-columns: 1fr; }
    .gr-stats-inner { grid-template-columns: repeat(2, 1fr); }
    .gr-footer-inner { grid-template-columns: 1fr; }
    .gr-nav-links { display: none; }
  }
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.10 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function GritPage() {
  const [scrolled, setScrolled] = useState(false);
  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* NAV */}
      <nav className={`gr-nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="gr-nav-logo"><span>GRIT</span> Bootcamp</a>
        <div className="gr-nav-links">
          <a href="#classes">Classes</a>
          <a href="#pillars">Training</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
          <a href="#rookie" className="gr-btn-nav">Join Rookie Camp</a>
        </div>
      </nav>

      {/* INSET/CARD HERO */}
      <section id="rookie" className="gr-hero">
        <div className="gr-hero-bg" />
        <div className="gr-hero-bg-overlay" />
        <div className="gr-hero-inner">
          <div className="gr-hero-copy">
            <div className="gr-hero-tag">Nashville, TN — Est. 2018</div>
            <h1 className="gr-hero-title">
              No<br /><span>Shortcuts.</span>
            </h1>
            <p className="gr-hero-sub">
              Military-inspired bootcamp training that builds more than muscle. Strength, conditioning, and the kind of mental toughness that changes everything outside the gym too.
            </p>
            <div className="gr-hero-actions">
              <a href="#pricing" className="gr-btn-primary">Join Rookie Camp</a>
              <a href="#classes" className="gr-btn-ghost">View Schedule</a>
            </div>
          </div>

          {/* INSET VIDEO CARD */}
          <div className="gr-video-card">
            <video autoPlay muted loop playsInline
              poster="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&q=80"
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-soldiers-doing-exercises-in-a-gym-39969-large.mp4"
                type="video/mp4"
              />
            </video>
            <div className="gr-video-label">
              <span className="gr-video-dot" />
              <span className="gr-video-label-text">AM Formation 6:00 AM Daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="gr-stats-strip">
        <div className="gr-stats-inner">
          {siteData.stats.map((s, i) => (
            <div key={s.label} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="gr-stat-value">{s.value}</div>
              <div className="gr-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PILLARS */}
      <section id="pillars" className="gr-pillars-section">
        <div className="gr-pillars-inner">
          <div className="gr-pillars-header reveal">
            <div>
              <span className="gr-section-tag">The GRIT Method</span>
              <h2 className="gr-section-title">Four<br />Pillars</h2>
            </div>
            <p className="gr-section-sub">
              Bootcamp isn&apos;t just fitness — it&apos;s a system for building people who don&apos;t quit. These are the four principles we operate by.
            </p>
          </div>
          <div className="gr-pillars-grid">
            {siteData.pillars.map((p, i) => (
              <div key={p.name} className="gr-pillar-cell reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="gr-pillar-icon">{p.icon}</div>
                <div className="gr-pillar-name">{p.name}</div>
                <p className="gr-pillar-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLASSES */}
      <section id="classes" className="gr-classes-section">
        <div className="gr-classes-inner">
          <div className="gr-classes-header reveal">
            <span className="gr-section-tag">Training Programs</span>
            <h2 className="gr-section-title">Choose<br />Your Mission</h2>
            <p className="gr-section-sub">
              Every class is coached. Every class is different. Every class will test you in ways you didn&apos;t expect.
            </p>
          </div>
          <div className="gr-classes-grid">
            {siteData.classes.map((c, i) => (
              <div key={c.name} className="gr-class-cell reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="gr-class-badges">
                  <span className="gr-badge gr-badge-level">{c.level}</span>
                  <span className="gr-badge gr-badge-dur">{c.duration}</span>
                </div>
                <div className="gr-class-name">{c.name}</div>
                <p className="gr-class-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="gr-pricing-section">
        <div className="gr-pricing-inner">
          <div className="gr-pricing-header reveal">
            <span className="gr-section-tag">Membership</span>
            <h2 className="gr-section-title">Enlist<br />Today</h2>
            <p className="gr-section-sub">
              No contracts. No excuses. Choose the plan that matches your commitment level — then show up.
            </p>
          </div>
          <div className="gr-pricing-grid">
            {siteData.pricing.map((p, i) => (
              <div key={p.name} className={`gr-price-card reveal${p.highlight ? ' highlight' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                {p.highlight && <span className="gr-popular-badge">Most Popular</span>}
                <div className="gr-price-name">{p.name}</div>
                <div className="gr-price-amount">{p.price}</div>
                <div className="gr-price-period">{p.period}</div>
                <ul className="gr-price-features">
                  {p.features.map((f) => (
                    <li key={f}><span className="gr-check">✓</span>{f}</li>
                  ))}
                </ul>
                <a href="#rookie" className="gr-price-cta">Enlist Now</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gr-cta-section">
        <div className="gr-cta-inner">
          <h2 className="gr-cta-title reveal">
            Show<br /><span>Up.</span>
          </h2>
          <p className="gr-cta-sub reveal">
            Join Rookie Camp for $149. Four weeks of structured training, movement coaching, and a team that holds you accountable from day one.
          </p>
          <a href="#pricing" className="gr-btn-cta reveal">Start Rookie Camp</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="gr-footer">
        <div className="gr-footer-inner">
          <div>
            <div className="gr-footer-logo"><span>GRIT</span> Bootcamp</div>
            <p className="gr-footer-desc">
              {siteData.gym.address}<br />
              {siteData.gym.phone}<br />
              {siteData.gym.email}
            </p>
          </div>
          <div>
            <div className="gr-footer-h">Train</div>
            <ul className="gr-footer-links">
              <li><a href="#classes">Schedule</a></li>
              <li><a href="#pillars">Our Method</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#">Spartan Prep</a></li>
            </ul>
          </div>
          <div>
            <div className="gr-footer-h">Info</div>
            <ul className="gr-footer-links">
              <li><a href="#">New Members</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Corporate Groups</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="gr-footer-bottom">
          <span>© {new Date().getFullYear()} GRIT Bootcamp. All rights reserved.</span>
          <span>Powered by <a href="https://koriva.com" className="gr-footer-brand">Koriva</a></span>
        </div>
      </footer>
    </>
  );
}
