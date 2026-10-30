---
layout: default
title: Are We There Yet?
description: A technical breakdown of my contributions to Are We There Yet?, a raindrop racing game made for GMTK Game Jam 2026.
---

<div class="case-study-hero">
  <p class="eyebrow">GMTK GAME JAM 2026 · GAME DEVELOPMENT</p>
  <h1>Are We <span class="text-blue">There Yet?</span></h1>
  <p class="case-study-tagline">
    A little rain. A long ride. A race across the window.
  </p>
  <img
    class="case-study-cover"
    src="{{ '/assets/images/are-we-there-yet.jpg' | relative_url }}"
    alt="Are We There Yet? game title artwork"
  >
  <div class="case-study-facts">
    <div><span>ENGINE</span><strong>Godot</strong></div>
    <div><span>LANGUAGE</span><strong>GDScript</strong></div>
    <div><span>TEAM</span><strong>4 people</strong></div>
    <div><span>ROLE</span><strong>Programmer</strong></div>
  </div>
  <div class="project-links">
    <a href="https://thejackxbl.itch.io/are-we-there-yet" target="_blank" rel="noopener">Play the game ↗</a>
    <a href="{{ '/games/' | relative_url }}">Back to games →</a>
  </div>
</div>

<section class="case-study-section">
  <p class="eyebrow">01 / OVERVIEW</p>
  <h2>A race between raindrops.</h2>
  <p>
    Are We There Yet? is a raindrop-racing game created for GMTK Game Jam
    2026. Players follow a race across a rainy window, with characters,
    obstacles, and interactions bringing the experience to life.
  </p>
  <p>
    I worked on a team of four: two programmers and two artists. As the
    programmer with prior experience using Godot and GitHub, I also helped
    establish our technical workflow and coordinate development.
  </p>
</section>

<section class="case-study-section">
  <p class="eyebrow">02 / MY CONTRIBUTIONS</p>
  <h2>Turning the concept into a playable experience.</h2>
  <p>
    My work covered several parts of the game, from core gameplay systems
    to presentation and player feedback.
  </p>

  <div class="case-study-feature-grid">
    <article class="case-study-feature">
      <span class="feature-number">01</span>
      <h3>Gameplay & progression</h3>
      <p>
        Developed gameplay and progression systems, including day timers,
        variable setups, scoring, and boost droplets.
      </p>
    </article>
    <article class="case-study-feature">
      <span class="feature-number">02</span>
      <h3>Player interactions</h3>
      <p>
        Implemented player interactions, including the hand-knock ability
        and its animation.
      </p>
    </article>
    <article class="case-study-feature">
      <span class="feature-number">03</span>
      <h3>Obstacles & effects</h3>
      <p>
        Built obstacle spawning and cleanup, along with related effects
        and visual feedback.
      </p>
    </article>
    <article class="case-study-feature">
      <span class="feature-number">04</span>
      <h3>Presentation & flow</h3>
      <p>
        Worked on cutscenes, transitions, and the end screen to connect
        gameplay into a complete experience.
      </p>
    </article>
  </div>
</section>

<section class="case-study-section">
  <p class="eyebrow">03 / TECHNICAL HIGHLIGHT</p>
  <h2>Connecting dialogue to character-specific audio.</h2>
  <p>
    One of the more interesting technical challenges was adapting
    Godot Dialogue Manager to work with ACVoicebox.
  </p>
  <p>
    Rather than having dialogue trigger audio for an entire line at once,
    I adapted the integration so Dialogue Manager could feed text to
    ACVoicebox character by character. This allowed dialogue to produce
    the kind of sequential, character-specific sound associated with
    Animal Crossing-style conversations.
  </p>
  <p>
    This involved working across two existing tools and connecting their
    behavior to achieve a presentation style that neither integration
    provided in exactly the form we needed.
  </p>
</section>

<section class="case-study-section">
  <p class="eyebrow">04 / TEAMWORK & WORKFLOW</p>
  <h2>Keeping a small team moving.</h2>
  <p>
    With four people working across programming and art, communication
    and integration mattered just as much as implementation.
  </p>
  <ul class="case-study-list">
    <li>Helped establish the team's Godot and GitHub workflow.</li>
    <li>Organized daily planning around tasks and areas of overlap.</li>
    <li>Reviewed and merged teammates' pull requests.</li>
    <li>Coordinated technical work to reduce conflicts and keep features integrating.</li>
  </ul>
  <p>
    Having previous experience with the engine and version control meant
    I could help teammates navigate the development process while
    continuing to build the game.
  </p>
</section>

<section class="case-study-section case-study-results">
  <p class="eyebrow">05 / RESULTS</p>
  <h2>Recognized across multiple categories.</h2>
  <p>
    Are We There Yet? received strong recognition in the GMTK Game Jam
    ratings, particularly for its creative direction and presentation.
  </p>
  <div class="recognition-grid">
    <div><strong>Top 1%</strong><span>Creativity</span></div>
    <div><strong>Top 1%</strong><span>Artwork</span></div>
    <div><strong>Top 1%</strong><span>Narrative</span></div>
    <div><strong>Top 2%</strong><span>Audio</span></div>
    <div><strong>Top 5%</strong><span>Enjoyment</span></div>
  </div>
</section>

<section class="case-study-next">
  <p class="eyebrow">EXPLORE ANOTHER PROJECT</p>
  <h2>Next up: Wild Derby Carnival.</h2>
  <p>
    Another game jam project, this time exploring physics-driven gameplay
    and collaboration in a two-person team.
  </p>
  <a class="text-link" href="{{ '/projects/wild-derby-carnival/' | relative_url }}">View Wild Derby Carnival →</a>
</section>