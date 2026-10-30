---
layout: default
title: Home
---

<div class="home-hero">
  <p class="eyebrow">SOFTWARE DEVELOPMENT · GAME DEVELOPMENT · CREATIVE TECHNOLOGY</p>

  <h1>Building things<br>that <span class="text-blue">work</span> and<br><span class="text-coral">feel good.</span></h1>

  <p class="hero-description">
    I'm Livi Rose, a Computer Science student and developer who enjoys bringing
    technical systems and creative ideas together — from gameplay mechanics to
    practical software tools.
  </p>

  <div class="hero-actions">
    <a class="button button-primary" href="#featured-projects">Explore my work <span aria-hidden="true">↓</span></a>
    <a class="button button-secondary" href="{{ '/assets/documents/resume.pdf' | relative_url }}">View résumé <span aria-hidden="true">↗</span></a>
  </div>

  <div class="hero-note">
    <span class="hero-note-mark" aria-hidden="true">✳</span>
    <span>Programmer by training. Artist by practice. Problem-solver by nature.</span>
  </div>
</div>

<section class="proof-strip" aria-label="Highlights">
  <div class="proof-item">
    <span class="proof-number">Top 1%</span>
    <span class="proof-label">GMTK Jam — Creativity, Artwork & Narrative</span>
  </div>
  <div class="proof-item">
    <span class="proof-number">C# + Godot</span>
    <span class="proof-label">Practical apps and interactive games</span>
  </div>
  <div class="proof-item">
    <span class="proof-number">Art + Code</span>
    <span class="proof-label">Creative and technical collaboration</span>
  </div>
</section>

<section id="featured-projects" class="home-section">
  <div class="section-heading">
    <div>
      <p class="eyebrow">SELECTED WORK / 01</p>
      <h2>Made with purpose.<br>Built with curiosity.</h2>
    </div>
    <p class="section-intro">
      A selection of projects where I explored game systems, collaborative
      development, and software designed to solve real problems.
    </p>
  </div>

  <article class="project-feature project-feature-blue">
    <div class="project-media">
      <img src="{{ '/assets/images/are-we-there-yet.jpg' | relative_url }}" alt="Are We There Yet? game title card">
      <span class="media-index">01 / GAME JAM</span>
    </div>

    <div class="project-copy">
      <p class="eyebrow">GMTK GAME JAM 2026 · GODOT</p>
      <h3>Are We There Yet?</h3>
      <p class="project-tagline">A little rain. A long ride. A race across the window.</p>
      <p>
        A raindrop-racing game made by a four-person team. I worked across
        gameplay, progression, effects, player interactions, and presentation,
        while helping coordinate our technical workflow.
      </p>
      <ul class="project-facts">
        <li><strong>Team</strong><span>2 programmers, 2 artists</span></li>
        <li><strong>My focus</strong><span>Gameplay systems and integration</span></li>
        <li><strong>Recognition</strong><span>Top 1% in three categories</span></li>
      </ul>
      <div class="project-links">
        <a href="https://thejackxbl.itch.io/are-we-there-yet/" target="_blank" rel="noopener">Play the game ↗</a>
        <a href="{{ '/projects/are-we-there-yet/' | relative_url }}">Read the case study →</a>
      </div>
    </div>
  </article>

  <article class="project-feature project-feature-coral">
    <div class="project-media">
      <img src="{{ '/assets/images/wild-derby-carnival.jpg' | relative_url }}" alt="Wild Derby Carnival game title card">
      <span class="media-index">02 / GAME JAM</span>
    </div>

    <div class="project-copy">
      <p class="eyebrow">WHOLESOME GAMES JAM 2026 · GODOT</p>
      <h3>Wild Derby Carnival</h3>
      <p class="project-tagline">A tiny horse. A flick of the finger. A race to the finish.</p>
      <p>
        A carnival-inspired horse-racing game created with an artist. I built
        the ball controls, scoring systems, race logic, and supporting game
        features, balancing physics-driven play with an approachable feel.
      </p>
      <ul class="project-facts">
        <li><strong>Team</strong><span>Programmer + artist</span></li>
        <li><strong>My focus</strong><span>Controls, physics, and game systems</span></li>
        <li><strong>Tools</strong><span>Godot and GDScript</span></li>
      </ul>
      <div class="project-links">
        <a href="https://livirosegames.itch.io/wild-derby-carnival" target="_blank" rel="noopener">Play the game ↗</a>
        <a href="{{ '/projects/wild-derby-carnival/' | relative_url }}">Read the case study →</a>
      </div>
    </div>
  </article>

  <article class="project-feature project-feature-neutral">
    <div class="project-media project-placeholder">
      <span class="placeholder-symbol" aria-hidden="true">{ }</span>
      <span class="media-index">03 / SOFTWARE</span>
    </div>

    <div class="project-copy">
      <p class="eyebrow">C# · WINDOWS FORMS · CSV</p>
      <h3>Inventory Manager</h3>
      <p class="project-tagline">Less searching. Better-organized supplies.</p>
      <p>
        A desktop application built to support supply management and lesson-plan
        lookup at an educational enrichment program, turning a real workplace
        need into a practical software tool.
      </p>
      <ul class="project-facts">
        <li><strong>Purpose</strong><span>Real-world workflow support</span></li>
        <li><strong>Features</strong><span>Supply tracking and project lookup</span></li>
        <li><strong>Tools</strong><span>C# and Windows Forms</span></li>
      </ul>
      <div class="project-links">
        <a href="{{ '/projects/inventory-manager/' | relative_url }}">Read the case study →</a>
      </div>
    </div>
  </article>
</section>

<section class="explore-section">
  <p class="eyebrow">MORE TO EXPLORE / 02</p>
  <h2>Different projects.<br><span class="text-blue">Same curiosity.</span></h2>

  <div class="explore-grid">
    <a class="explore-card explore-games" href="{{ '/games/' | relative_url }}">
      <span class="explore-number">01</span>
      <span class="explore-symbol" aria-hidden="true">✳</span>
      <h3>Game Jams</h3>
      <p>Gameplay experiments, creative collaborations, and the systems that bring games to life.</p>
      <span class="explore-link">Explore games →</span>
    </a>

    <a class="explore-card explore-software" href="{{ '/software/' | relative_url }}">
      <span class="explore-number">02</span>
      <span class="explore-symbol" aria-hidden="true">{ }</span>
      <h3>Helpful Programs</h3>
      <p>Tools and applications built to make creative and everyday work easier.</p>
      <span class="explore-link">Explore software →</span>
    </a>

    <a class="explore-card explore-experience" href="{{ '/experience/' | relative_url }}">
      <span class="explore-number">03</span>
      <span class="explore-symbol" aria-hidden="true">↗</span>
      <h3>Experience</h3>
      <p>Technical leadership, education, and the people-focused skills behind the code.</p>
      <span class="explore-link">Explore experience →</span>
    </a>
  </div>
</section>

<section class="home-about">
  <div class="about-mark" aria-hidden="true">LR<span>.</span></div>
  <div>
    <p class="eyebrow">A LITTLE ABOUT ME / 03</p>
    <h2>Technical thinking.<br>Creative perspective.</h2>
    <p>
      My background spans computer science, digital illustration, and STEM
      education. Working across those fields has shaped how I approach
      development: understand the problem, consider the person using the result,
      and make the experience feel clear and intentional.
    </p>
    <a class="text-link" href="{{ '/about/' | relative_url }}">More about me →</a>
  </div>
</section>

<section class="contact-banner">
  <p class="eyebrow">HAVE A PROJECT IN MIND?</p>
  <h2>Let's make<br>something useful.</h2>
  <p>I'm interested in software and game development opportunities where I can learn, contribute, and build thoughtful experiences.</p>
  <a class="button button-primary" href="{{ '/about/' | relative_url }}">Get in touch →</a>
</section>
