---

# Are We There Yet?

**GMTK Game Jam 2026 · Godot · GDScript · Team of Four**

A raindrop-racing game about passing the time by watching raindrops race.

[Play Are We There Yet?](https://thejackxbl.itch.io/are-we-there-yet)

![Are We There Yet? game title card]({{ '/assets/images/are-we-there-yet.jpg' | relative_url }})

## Overview

_Are We There Yet?_ was a team project developed for GMTK Game Jam 2026. Our four-person team consisted of two programmers and two artists.

As one of the programmers, I worked across gameplay systems, game progression, visual effects, and player interactions. I also helped guide technical development and integrate our team's work using GitHub.

## My Contributions

### Gameplay Systems

I implemented several systems that supported the game's core loop, including:

- **Day progression:** Day timers, day switching, and variable day setups.
    
- **Obstacle management:** Obstacle spawning, cleanup between days, and obstacle effects.
    
- **Scoring:** A scoring system to track gameplay results.
    
- **Player interactions:** A hand-knock ability with an accompanying animation.
    
- **Game flow:** Cutscene functionality, fade-in and fade-out transitions, and the end screen.
    
- **Gameplay effects:** Randomly spawning boost droplets and visual effects for the window and obstacles.

### Integrating Existing Godot Addons

One of my most challenging contributions was adapting two existing Godot addons to work together:

- [Godot Dialogue Manager](https://github.com/nathanhoad/godot_dialogue_manager)
- [ACVoicebox](https://github.com/mattmarch/ACVoicebox)

The addons weren't initially compatible with the way our game needed to handle dialogue. I modified Dialogue Manager's scripts to feed dialogue into ACVoicebox and adapted the data being passed between them to support character-by-character speech playback, recreating the style of Animal Crossing's dialogue sounds rather than treating each line as one complete string.

This required me to understand how both addons handled dialogue and audio, identify where their approaches differed, and modify the existing code so the systems could work together. I completed this integration within the limited timeline of a game jam.

This experience strengthened my ability to navigate unfamiliar code, adapt existing tools, and solve integration problems under time constraints—without having to build both systems from scratch.

### Technical Leadership and Collaboration

I was the only team member with prior experience using Godot and GitHub, so I took the lead on technical workflow and helped integrate the team's work.

We met daily to discuss our plans and divide tasks, aiming to minimize overlapping work. I also merged pull requests from teammates' branches into the main project.

This gave me experience coordinating technical work, integrating contributions from multiple developers, and helping a team maintain momentum during a short development cycle.

## Recognition

Our game received strong rankings in the GMTK Game Jam 2026 community ratings.

![GMTK Game Jam ratings showing our rankings across different categories]({{ '/assets/images/GMTK-all-ratings.png' | relative_url }})

![GMTK Game Jam overall rating]({{ '/assets/images/GMTK-overall.png' | relative_url }})

*Rating badges generated using the [GMTK Badge Maker](https://deadrockgames.itch.io/gmtk-badge-maker) by DeadRockGames.*

- **Top 1%:** Creativity, Artwork, and Narrative
- **Top 2%:** Audio
- **Top 5%:** Enjoyment

## What I Learned

This project gave me experience working across multiple gameplay systems while collaborating with a team under a tight deadline. Adapting existing addons was particularly valuable because it required me to understand code I hadn't written and make changes that allowed separate systems to work together.

I also gained experience supporting a team's technical workflow, from planning tasks together to integrating contributions through GitHub pull requests.

## Technologies

Godot · GDScript · Git · GitHub · Godot Dialogue Manager · ACVoicebox