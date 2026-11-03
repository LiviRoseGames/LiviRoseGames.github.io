# Are We There Yet?

**GMTK Game Jam 2026 · Godot · GDScript · Team of Four**

*A raindrop-racing game about passing the time by watching raindrops race.*

[Play Are We There Yet?](https://thejackxbl.itch.io/are-we-there-yet)

![Are We There Yet? game title card]({{ '/assets/images/are-we-there-yet.jpg' | relative_url }})

## Overview

*Are We There Yet?* was developed for GMTK Game Jam 2026 by a four-person team consisting of two programmers and two artists.

As one of the programmers, I was responsible for implementing several of the game's core systems, including day progression, obstacle management, environmental effects, scoring, player interactions, and game flow. I also adapted two existing Godot addons to create our character-by-character dialogue audio.

I was the only team member with prior experience using Godot and GitHub, so I also took the lead on our technical workflow. This included helping plan implementation, coordinating tasks to reduce conflicts, reviewing incoming changes, and integrating work through GitHub pull requests.

## My Contributions

- [Gameplay Systems and Day Progression](#gameplay-systems-and-day-progression)
  - [Coordinating the Day Lifecycle](#coordinating-the-day-lifecycle)
  - [Data-Driven Day Configuration](#data-driven-day-configuration)
  - [Randomized Obstacle Management](#randomized-obstacle-management)
  - [Race and Day-End Synchronization](#race-and-day-end-synchronization)

- [Environmental Effects and Visual Progression](#environmental-effects-and-visual-progression)
  - [Window Frost Shader](#window-frost-shader)
  - [Obstacle Visual Effects](#obstacle-visual-effects)
  - [World Layers and Parallax Background](#world-layers-and-parallax-background)
  - [Raindrop Simulation](#raindrop-simulation)
    - [Raindrop Physics and Movement](#raindrop-physics-and-movement)
    - [Raindrop Trails and Streak Riding](#raindrop-trails-and-streak-riding)

- [Player Interactions and Game Flow](#player-interactions-and-game-flow)
- [Player Interactions and Game Flow](#player-interactions-and-game-flow)
- [Godot Addon Integration](#integrating-existing-godot-addons)
- [Technical Collaboration and Workflow](#technical-collaboration-and-workflow)

### Gameplay Systems and Day Progression

I implemented systems that connect the game's day timer to its environment, obstacles, dialogue, and race flow. Rather than having each feature manage its own independent timer, the game controller calculates a shared progress value and passes it to the systems that need to respond to the passage of time.

#### Coordinating the Day Lifecycle

The game controller acts as the central coordinator for the day lifecycle. It manages the timer, tracks whether the day has started or finished, and calculates normalized progress from the timer's remaining time.

That progress value is distributed to the `world`, `window`, and `obstacle_manager`. Each system can then respond to the same point in the day without maintaining a separate timer or duplicating the overall progression logic.

The `day_manager` keeps track of the current day and returns its corresponding `DayData` resource. When the day ends, the game controller handles the transition: it fades the screen in a black screen, clears the previous day's obstacles, advances the day, initializes the new configuration, and fades the black screen back out.

```gdscript
func set_timerProgress():
    if dayFinished:
        return 1.0
    elif dayStarted:
        return 1.0 - (timer.time_left / dayLength)
    else:
        return 0.0
```

The normalized `0.0` to `1.0` value gives each receiving system a consistent measure of day progress, independent of the timer's duration.

![Day progression showing the transition between different days]({{ '/assets/images/awty-day-progression.gif' | relative_url }})

#### Data-Driven Day Configuration

I created the custom `DayData` resource to keep day-specific configuration separate from the systems that use it.

Each resource stores properties such as the background theme, obstacle spawn probability, and ranges intended for raindrop attributes. The background theme determines which environmental textures are used and which obstacle type can spawn (leaves in the forest and bird poop at sea), while the obstacle manager reads the configured spawn probability.

This approach makes level setup editable through Godot's Inspector rather than requiring each day's configuration to be hardcoded into the game logic. It also makes future game design easier to delegate to another team member unfamiliar with the code, freeing up development time for other features.

I also included more configuration variables than we initially needed. Some became what we affectionately called **"Stretch Goals!"** or features only for if we had an abundance of time, but keeping them in the resource gives the system room to grow. The raindrop attribute ranges, for example, are defined in `DayData` but were not connected
to the stat generator during the jam's development time.

![Godot Inspector showing a DayData resource and its exported properties]({{ '/assets/images/awty-daydata-inspector.png' | relative_url }})

#### Randomized Obstacle Management

I implemented the obstacle manager to handle obstacle selection, spawning, and cleanup.

The manager checks the current day's background theme to select appropriate obstacles. Each obstacle is built around a shared `window_obstacle` base scene. For the sea levels, I was given multiple bird poop variations, which I organized into an array and randomized during selection. The manager then chooses a random position within a defined rectangular spawn area, instantiates the selected obstacle, and adds it to the scene. Each obstacle handles its own initialization through a `setup()` function, randomizing its scale and rotation within configurable ranges before applying its initial frost effect.

Obstacle spawning is controlled by the probability stored in the active `DayData` resource. The manager works through a configured number of obstacle slots, with each slot initially receiving one chance to spawn. I wanted to experiment with how failed spawn attempts could influence the overall distribution of obstacles, particularly making completely obstacle-free days relatively rare.

To achieve this, each failed chance check increases a shared failure counter, giving subsequent slots additional opportunities to spawn an obstacle. This allows the final obstacle count to vary while making empty days less likely, even when the configured spawn probability is low.

The manager also handles obstacle cleanup between days, calling each obstacle's `clear()` method before the next day's setup. Rather than implementing a separate removal animation for day transitions, I reused the existing cleanup behavior from the smack ability. Each obstacle manages its own removal, fading out its sprite with a short tween before freeing itself.

![Different randomized obstacles appearing on the window]({{ '/assets/videos/awty-obstacle-spawning.gif' | relative_url }})

#### Race and Day-End Synchronization

After the initial build was complete, a significant part of bugfixing involved tracking down edge cases. One noteable example was deciding how the game should handle the day timer expiring while a race was still underway.

When the timer runs out, the game marks the day as finished, but doesn't immediately interrupt anything (the timer doesn't even head into the negatives!). If no race is in progress, the day-end sequence can begin right away. However, if a race *is* active, the game lets it finish first.

After processing the race results, the `race_manager` checks whether the day has ended. If it has, it will then start the day-end sequence rather than preparing another set of raindrops.

Essentially, the game trusts that the `race_manager` will clean up after itself if one of its races is ongoing as the timer ends.

It's a relatively small detail that most players probably won't consciously notice. However, interrupting a race just because the timer ran out would feel abrupt, especially if the player was watching the final moments of a close race. Accounting for this interaction made the transition between days feel much more natural and polished.

![Race finishing as the day timer expires]({{ '/assets/images/awty-race-day-end.gif' | relative_url }})

### Environmental Effects and Visual Progression

I implemented several visual systems that respond to the passage of time. The game controller calculates normalized day progress and passes it to the world, window, and obstacle manager.

Although these systems share one progress value, each effect uses its own progression curve. This lets the environment change in a coordinated way without making every visual effect fade at the same rate.

#### Window Frost Shader

The window shader simulates frost by combining randomized screen-space distortion, multiple screen texture samples for a subtle blur, and a white tint.

The shader exposes a `frostAmount` uniform that scales the strength of all three effects. As the day progresses, the window script reduces this value using a cubic curve:

```gdscript
func set_dayProgress(progress):
    progress = clamp(progress, 0.0, 1.0)

    var adjustedProgress = pow(progress, 3.0)
    var frostAmount = maxFrost * (1.0 - adjustedProgress)

    shader_material.set_shader_parameter(
        "frostAmount",
        frostAmount
    )
```

Using a cubic curve means the frost does not clear at a constant rate. It remains more prominent earlier in the day, then clears more noticeably as the day approaches completion.

![Window frost changing over the course of a day]({{ '/assets/video/awty-frost.gif' | relative_url }})

#### Obstacle Visual Effects

Obstacles have their own frost shader and progression logic. Their frost amount decreases using a quadratic curve, so they visually clear at a different rate from the main window.

I also implemented randomized obstacle scale and rotation to make repeated instances feel less uniform. When an obstacle is cleared, its sprite fades out through a short tween before the node is freed.

The frost on these obstacles is a visual effect; it does not change their gameplay behavior.

![Obstacle frost and fade-out effects]({{ '/assets/images/awty-obstacle-effects.gif' | relative_url }})

#### World Layers and Parallax Background

The world controller updates several environmental layers using the shared day progress value. Sunlit background elements fade in while fog fades out, gradually changing the atmosphere as the day advances. The active `DayData` resource also determines which sky, background, and foreground textures are loaded.

The project also uses a parallax background to give the environment a sense of depth. This separates the background presentation from the day-state logic: the world can change its theme and lighting while the layered background adds movement.

![Parallax background movement]({{ '/assets/video/awty-parallax-bg.gif' | relative_url }})

#### Raindrop Trails

I implemented the raindrop trail effect using a `Line2D` created for each raindrop. During physics updates, the script samples the raindrop's position and appends points to the trail after it has moved far enough. The trail is added to a shared streak container, with each sampled point converted into that container's local coordinate space.

The line uses a width curve that tapers toward its end, rounded caps and joints, partial transparency, and a shader that adds a subtle highlight. Together, these details make the trail read as a thin water streak rather than a uniform line.

![Raindrop close-up showing the visual trail effect]({{ '/assets/video/awty-raindropzoom.gif' | relative_url }})


### Player Interactions and Game Flow

I also implemented player-facing systems that connect moment-to-moment interactions with the larger game flow.

- **Hand-knock ability:** Implemented the interaction, animation, and visual feedback.
- **Scoring:** Implemented the score handling for race results, awarding points according to the selected raindrop's finishing position.
- **Boost droplets:** Worked on randomly spawned gameplay pickups and their associated effects.
- **Dialogue and cutscenes:** Connected dialogue playback to day progression, including day-start and day-end sequences.
- **Screen transitions:** Used fade-in and fade-out transitions between gameplay states and days.
- **End-game flow:** Connected the final day and score handling to the end screen.

![Hand-knock interaction in action]({{ '/assets/images/awty-hand-knock.gif' | relative_url }})

## Integrating Existing Godot Addons

One of the more technically challenging parts of the project was adapting two existing Godot addons to work together:

- [Godot Dialogue Manager](https://github.com/nathanhoad/godot_dialogue_manager)
- [ACVoicebox](https://github.com/mattmarch/ACVoicebox)

We wanted dialogue to have the character-by-character audio style associated with *Animal Crossing*, rather than playing one complete sound for an entire dialogue line. The addons did not provide this integration out of the box.

I investigated how each addon handled dialogue and audio, then modified the Dialogue Manager scripts and the data passed between the systems so dialogue could trigger ACVoicebox playback character by character.

This required tracing behavior through an existing codebase, understanding how two separate tools represented and processed their data, and adapting their interaction without replacing either addon.

![Dialogue with character-by-character voice playback]({{ '/assets/images/awty-dialogue-voice.gif' | relative_url }})

This was more than configuring two plugins. I had to identify where their existing interfaces did not meet our requirements and modify the integration to support the experience we wanted within a game jam's limited development time.

## Technical Collaboration and Workflow

I was the only team member with prior experience using Godot and GitHub, so I took the lead on maintaining the team's technical workflow.

We met daily to discuss progress, plan upcoming tasks, and divide work in a way that minimized conflicts and overlapping implementation. I reviewed and merged teammates' pull requests from their branches into the main project, helping keep the shared project integrated as work progressed.

Working with two programmers and two artists meant that technical implementation and creative work needed to stay coordinated. I gained experience communicating implementation needs, integrating work produced by other team members, and keeping development moving under a short deadline.

## Recognition

Our game received strong rankings in the GMTK Game Jam 2026 community ratings.

![GMTK Game Jam ratings showing our rankings across different categories]({{ '/assets/images/GMTK-all-ratings.png' | relative_url }})

![GMTK Game Jam overall rating]({{ '/assets/images/GMTK-overall.png' | relative_url }})

*Rating badges generated using the [GMTK Badge Maker](https://deadrockgames.itch.io/gmtk-badge-maker) by DeadRockGames.*

- **Top 1%:** Creativity, Artwork, and Narrative
- **Top 2%:** Audio
- **Top 5%:** Enjoyment

## What I Learned

This project gave me experience designing and implementing connected gameplay systems as part of a collaborative team. I worked across progression, obstacle management, environmental effects, player interactions, and game flow, which meant considering how changes in one system affected the others.

The day progression system was especially useful experience in coordinating shared state. A single normalized progress value could drive multiple visual effects, while the day manager and race manager coordinated changes to the broader game lifecycle.

Integrating Dialogue Manager with ACVoicebox strengthened my ability to navigate unfamiliar code, understand existing APIs, and adapt third-party tools to meet a project's requirements.

Beyond implementation, I gained experience coordinating technical work, reviewing and integrating pull requests, and collaborating with artists and another programmer to deliver a complete game within a game jam deadline.

## Technologies

Godot · GDScript · Git · GitHub · Godot Dialogue Manager · ACVoicebox