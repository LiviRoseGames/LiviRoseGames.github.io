---
layout: default
title: Wild Derby Carnival — Case Study
---

# Wild Derby Carnival

**Wholesome Games Game Jam 2026 · Godot · GDScript · Team of Two**

*A horse-racing game inspired by the classic carnival game, where players flick a ball into scoring holes to advance their chosen horse toward the finish line.*

[Play Wild Derby Carnival](https://livirosegames.itch.io/wild-derby-carnival)

![Wild Derby Carnival game title card]({{ '/assets/images/wild-derby-carnival.jpg' | relative_url }})

## Overview

*Wild Derby Carnival* was developed for Wholesome Games Game Jam 2026 in collaboration with an artist. Inspired by tabletop carnival horse-racing games, the project started as a simple ball-and-scoring prototype and grew into a multi-level racing game featuring horse selection, AI opponents, moving obstacles, animated interfaces, and a complete game flow.

I handled the programming in Godot using GDScript, while my teammate, Bosco, created the artwork. We built the initial version during the 48-hour jam, then used the additional editing week to expand the game and refine its architecture, controls, presentation, and audio.

## My Contributions

- [Physics-Based Gameplay and Controls](#physics-based-gameplay-and-controls)
- [Race Progression and AI Opponents](#race-progression-and-ai-opponents)
- [Modular Levels and Game Flow](#modular-levels-and-game-flow)
- [Horse Selection and Presentation](#horse-selection-and-presentation)
- [Audio and Interface Polish](#audio-and-interface-polish)

### Physics-Based Gameplay and Controls

I implemented the core ball-and-scoring system that connects player input to race progression.

- **Flick-based controls:** Detected mouse movement while holding the ball and translated the flick's speed into launch power.
- **Physics and collisions:** Implemented ball movement, table boundaries, and interactions with scoring holes.
- **Scoring system:** Configured holes with different score values and matched their ring colors to their types.
- **Ball lifecycle:** Managed ball states, missed shots, scoring animations, and the return of the ball to the player's holding area.
- **Gameplay feedback:** Added motion lines, a rotating highlight, a fading shadow, and spin effects to make the ball's movement easier to read.

The challenge was making these pieces work together. A shot needed to feel responsive, but its outcome also had to be communicated clearly to the player and translated consistently into race progress.

![The player flicking to launch a ball]({{ '/assets/images/wdc-ThrowBall.gif' | relative_url }})

### Race Progression and AI Opponents

I developed the race system that turns individual scoring shots into a competition between the player's horse and several AI opponents.

- **Player race movement:** Advanced the selected horse according to the score earned from each shot.
- **AI opponents:** Gave computer-controlled horses independent scoring timers and randomized movement so that all horses could race simultaneously.
- **Difficulty-based behavior:** Adjusted AI success rates and movement checks according to hole difficulty.
- **Race completion:** Detected when a horse crossed the finish line, stopped the race, and displayed an animated winner announcement.
- **Race presentation:** Built the track layout, animated background bushes, and coordinated horse movement with the finish line.

This required coordinating separate systems for player scoring, AI behavior, horse movement, and victory detection. Each horse needed to progress independently while still participating in the same race.

![The race results animation]({{ '/assets/images/wdc-Win.gif' | relative_url }})

### Modular Levels and Game Flow

As the game expanded beyond its initial prototype, I reworked the project structure to support multiple levels and a more complete gameplay loop.

- **Dynamic level loading:** Built a persistent level manager that loads level-specific table scenes and coordinates level progression, restarting, and transitions.
- **Reusable obstacles:** Created configurable moving-block and cycling-piston obstacles with adjustable movement, timing, and direction.
- **Ball state management:** Replaced loosely connected ball-state flags with a state machine, making ball behavior and transitions more predictable.
- **Scene transitions:** Separated the intro, gameplay, and ending into distinct scenes, with animated curtain transitions between them.
- **Replay flow:** Implemented progression between levels, restarting after a loss, and replaying from the beginning after completing the final level.

The transition from a single prototype to a multi-level game meant that the original structure needed to change. Separating level management, ball behavior, and scene flow made it easier to introduce new gameplay without continually adding more responsibilities to the same scripts.

### Horse Selection and Presentation

I implemented the interactive horse-selection system and several visual details that helped give the game the feel of a carnival attraction.

- Detected mouse hover and clicks on individual horses.
- Animated horse heads and highlighted hovered or selected horses.
- Displayed horse names during selection, with randomized animated text styling.
- Randomized horse appearances while preserving compatible body, head, and face variants.
- Animated the title, buttons, winner display, and other interface elements.

I also consolidated button animations into a reusable component with configurable hover, glow, drop-in, and pop-in effects. This allowed the same animation behavior to be reused throughout the interface without duplicating the implementation for every button.

![The player selecing a horse]({{ '/assets/images/wdc-HorseSelect.gif' | relative_url }})

### Audio and Interface Polish

Following the original game jam submission, I continued improving the player experience and addressing issues that became apparent as the game grew.

- Integrated sound effects into the updated game architecture.
- Added collision sounds with randomized pitch and volume to give repeated impacts more variation.
- Refined tutorial layout, button behavior, and the final tutorial step.
- Coordinated intro animations with game loading and scene transitions.
- Fixed gameplay edge cases involving ball states, missed shots, and level loading.

These changes helped bring the different parts of the game together, making the experience more consistent from the opening screen through the final race.

## Collaboration and Development Workflow

This was a two-person project, with Bosco handling the artwork and me handling the programming. I used Git and GitHub to organize development through feature branches and pull requests, keeping changes manageable as the project expanded.

Working with an artist I had met through the *Are We There Yet?* team also gave me an opportunity to apply what I had learned in my digital illustration courses. Having a better understanding of visual design helped me communicate implementation needs, discuss how artwork would fit into the game, and collaborate on the presentation of the finished experience.

As the project grew beyond its original game jam scope, I continued refining the codebase to support new features while keeping the game's systems organized and reusable.