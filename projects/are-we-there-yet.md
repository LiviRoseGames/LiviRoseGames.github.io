# Are We There Yet?

**GMTK Game Jam 2026 · Godot · GDScript · Team of Four**

*A raindrop-racing game about passing the time by watching raindrops race.*

[Play Are We There Yet?](https://thejackxbl.itch.io/are-we-there-yet)

![Are We There Yet? game title card]({{ '/assets/images/are-we-there-yet.jpg' | relative_url }})

## Overview

*Are We There Yet?* was developed for GMTK Game Jam 2026 by a four-person team consisting of two programmers and two artists.

As one of the programmers, I was responsible for implementing several of the game's core systems, including day progression, obstacle management, environmental effects, scoring, player interactions, and game flow. I also adapted two existing Godot addons to create our character-by-character dialogue audio system.

I was the only team member with prior experience using Godot and GitHub, so I also took the lead on our technical workflow. This included helping plan implementation, coordinating tasks to reduce conflicts, reviewing incoming changes, and integrating work through GitHub pull requests.

## My Contributions

### Gameplay Systems and Day Progression

I implemented systems that connect the game's day timer to its environment, obstacles, dialogue, and race flow. Rather than having each feature manage its own independent timer, the game controller calculates a shared progress value and passes it to the systems that need to respond to the passage of time.

My work in this area included:

- **Day lifecycle:** Managing day initialization, timer state, completion, and transitions between days.
- **Day configuration:** Using custom `DayData` resources to define environmental themes and obstacle spawn probabilities.
- **Obstacle management:** Selecting obstacle scenes, generating randomized spawn positions, handling spawn chances, and clearing obstacles between days.
- **Environmental progression:** Driving visual changes across the window, obstacles, and world using normalized timer progress.
- **Race synchronization:** Allowing an active race to finish before starting the day-end sequence.

#### Coordinating the Day Lifecycle

The game controller acts as the central coordinator for the day lifecycle. It starts and pauses the timer, tracks whether the day has begun or finished, and calculates normalized progress from the timer's remaining time.

That progress value is distributed to the world, window, and obstacle manager. Each system can then respond to the same point in the day without maintaining a separate timer or duplicating the overall progression logic.

The `DayManager` keeps track of the current day and returns its corresponding `DayData` resource. When the day ends, the game controller handles the transition: it fades the screen in, clears the previous day's obstacles, advances the day, initializes the new configuration, and fades back out.

```gdscript
func set_timerProgress():
    if dayFinished:
        return 1.0
    elif dayStarted:
        return 1.0 - (timer.time_left / dayLength)
    else:
        return 0.0
```

I used a normalized value from `0.0` to `1.0` so the receiving systems could interpret progression consistently, regardless of the timer's actual duration.

![Day progression showing the transition between different days]({{ '/assets/images/awty-day-progression.gif' | relative_url }})

#### Data-Driven Day Configuration

I used a custom `DayData` resource to keep day-specific configuration separate from the systems that consume it.

Each resource stores properties such as the background theme, obstacle spawn probability, and ranges intended for raindrop attributes. In the current implementation, the background theme is used to select environmental textures and determine which obstacle type can spawn, while the obstacle manager reads the configured spawn probability.

This makes day setup editable through Godot's Inspector rather than requiring each day's configuration to be hardcoded into the game logic. The resource also provides a place to extend day-specific behavior as the project grows.

One distinction worth noting is that the raindrop attribute ranges are defined in `DayData`, but the raindrop stat generator does not currently read those ranges. The implemented day-specific behavior is the environment selection and obstacle probability.

![Godot Inspector showing a DayData resource and its exported properties]({{ '/assets/images/awty-daydata-inspector.png' | relative_url }})

#### Randomized Obstacle Management

I implemented the obstacle manager to handle obstacle selection, spawning, and cleanup.

The manager checks the current day's background theme to select an appropriate obstacle scene. For example, a field-themed day can spawn leaves, while a sea-themed day can spawn bird-dropping obstacles. It then chooses a random position inside a defined rectangular spawn area and initializes the obstacle with a randomized scale and rotation.

Obstacle spawning is controlled by the probability stored in the active `DayData` resource. The manager works through a configured number of obstacle slots. When a chance check fails, it records the failure and increases the number of checks available for subsequent slots. This gives later slots additional opportunities to spawn an obstacle, while still allowing the final count to vary.

At the end of a day, the manager clears existing obstacles before the next day's setup. Individual obstacles fade their sprites out with a short tween before being freed.

![Different randomized obstacles appearing on the window]({{ '/assets/images/awty-obstacle-spawning.gif' | relative_url }})

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

### Race and Day-End Synchronization

An important part of the progression system was deciding what should happen if the day timer expires while a race is still active.

When the timer times out, the game marks the day as finished. If no race is underway, it can immediately begin the day-end dialogue and fade the remaining raindrops. If a race is active, the timer does not interrupt it.

Instead, the race manager finishes processing the race results. After the winner is determined and the selected raindrop's result has been handled, the race manager checks the game's day state. If the day has already finished, it starts the day-end dialogue rather than preparing another set of raindrops.

This keeps the flow predictable: the player can watch the current race finish, but the game will not begin another race after the day has ended.

![Race finishing as the day timer expires]({{ '/assets/images/awty-race-day-end.gif' | relative_url }})

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