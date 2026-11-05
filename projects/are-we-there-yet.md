# Are We There Yet?

**GMTK Game Jam 2026 · Godot · GDScript · Team of Four**

*A raindrop-racing game about passing the time by watching raindrops race.*

[Play Are We There Yet?](https://thejackxbl.itch.io/are-we-there-yet)

![Are We There Yet? game title card]({{ '/assets/images/are-we-there-yet.jpg' | relative_url }})

---

## Overview

*Are We There Yet?* was developed for GMTK Game Jam 2026 by a four-person team consisting of two programmers and two artists.

As one of the programmers, I was responsible for implementing several of the game's core systems, including day progression, obstacle management, environmental effects, scoring, player interactions, and game flow. I also adapted two existing Godot addons to create our character-by-character dialogue audio.

I was the only team member with prior experience using Godot and GitHub, so I also took the lead on our technical workflow. This included helping plan implementation, coordinating tasks to reduce conflicts, reviewing incoming changes, and integrating work through GitHub pull requests.

- [My Contributions](#my-contributions)
- [Recognition](#recognition)
- [Takeaways](#takeaways)

---

## My Contributions

- [Gameplay Systems and Day Progression](#gameplay-systems-and-day-progression)
  - [Coordinating the Day Lifecycle](#coordinating-the-day-lifecycle)
  - [Data-Driven Day Configuration](#data-driven-day-configuration)
  - [Randomized Obstacle Management](#randomized-obstacle-management)
  - [Race and Day-End Synchronization](#race-and-day-end-synchronization)

- [Environmental Effects and Visual Progression](#environmental-effects-and-visual-progression)
  - [Window Frost Shader](#window-frost-shader)
  - [World Layers and Parallax Background](#world-layers-and-parallax-background)
  - [Raindrop Simulation](#raindrop-simulation)
    - [Raindrop Trails and Streak Riding](#raindrop-trails-and-streak-riding)

- [Godot Addon Integration](#integrating-existing-godot-addons)
- [Technical Collaboration and Workflow](#technical-collaboration-and-workflow)

### Gameplay Systems and Day Progression

I implemented systems that connect the game's day timer to its environment, obstacles, dialogue, and race flow. Rather than having each feature manage its own independent timer, the game controller calculates a shared progress value and passes it to the systems that need to respond to the passage of time.

#### Coordinating the Day Lifecycle

The game controller acts as the central coordinator for the day lifecycle. It manages the timer, tracks whether the day has started or finished, and calculates normalized progress from the timer's remaining time.

That progress value is distributed to the `world`, `window`, and `obstacle_manager`. Each system can then respond to the same point in the day without maintaining a separate timer or duplicating the overall progression logic.

The `day_manager` keeps track of the current day and returns its corresponding `DayData` resource. When the day ends, the game controller handles the transition: it fades to black, clears the previous day's obstacles, advances the day, initializes the new configuration, and fades back in.

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

![Different randomized obstacles appearing on the window]({{ '/assets/video/awty-obstacle-spawning.gif' | relative_url }})

#### Race and Day-End Synchronization

After the initial build was complete, a significant part of bugfixing involved tracking down edge cases. One notable example was deciding how the game should handle the day timer expiring while a race was still underway.

When the timer runs out, the game marks the day as finished, but doesn't immediately interrupt anything (the timer doesn't even head into the negatives!). If no race is in progress, the day-end sequence can begin right away. However, if a race *is* active, the game lets it finish first.

After processing the race results, the `race_manager` checks whether the day has ended. If it has, it will then start the day-end sequence rather than preparing another set of raindrops.

Essentially, the game trusts that the `race_manager` will clean up after itself if one of its races is ongoing as the timer ends.

It's a relatively small detail that most players probably won't consciously notice. However, interrupting a race just because the timer ran out would feel abrupt, especially if the player was watching the final moments of a close race. Accounting for this interaction made the transition between days feel much more natural and polished.

![Race finishing as the day timer expires]({{ '/assets/video/awty-race-day-end.gif' | relative_url }})

### Environmental Effects and Visual Progression

I implemented several visual systems that respond to the passage of time. The game controller distributes the same normalized day progress to the `world`, `window`, and `obstacle_manager`, while each effect uses its own progression curve.

#### Window Frost Shader

The window shader simulates frost using randomized screen-space distortion, multiple screen texture samples for a subtle blur, and a white tint.

A `frostAmount` uniform controls the strength of all three effects. As the day progresses, the window script reduces this value using a cubic curve to simulate it melting away as the sun *dries up all the rain*:

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

A cubic curve was my function of choice because it keeps the frost more prominent earlier in the day, then clears it more noticeably as the sun appears and the day approaches completion.

Obstacles use a separate, much simpler frost shader. Rather than sampling the screen or introducing distortion, it blends each obstacle's original color toward a subtle gray tint. The tint strength is controlled by the same frostAmount concept, allowing obstacles to visually match the frosted environment without obscuring their artwork.

Their frost also decreases at a different rate, using a quadratic curve rather than the cubic curve applied to the window. This allows both effects to respond to the same shared day progress value while maintaining their own visual progression.

The frost on obstacles is purely visual and does not affect their gameplay behavior.

![Window frost changing over the course of a day]({{ '/assets/video/awty-frost.gif' | relative_url }})

#### World Layers and Parallax Background

The world controller uses day progress to animate environmental layers. Sunlit background elements fade in while fog fades out, gradually changing the atmosphere as the day advances. The active `DayData` resource also determines which sky, background, and foreground textures are loaded.

The parallax background adds depth and movement to the environment, independently of the day-state changes.

![Parallax background movement]({{ '/assets/video/awty-parallax-bg.gif' | relative_url }})

#### Raindrop Simulation

Both programmers collaborated heavily on the raindrop movement system, discussing and refining different strategies. We wanted the drops to feel like they were moving across a window rather than simply falling in a straight line, with individual drops able to behave differently and interact with one another. It felt vital to the nostalgic childhood wonder we wanted to bring to the game that the raindrops felt a bit unpredictable and lifelike. We implemented the resulting movement simulation using Godot's `RigidBody2D` physics system, combining custom forces and behaviors to create that variation.

Gravity pulls raindrops down the window, while drag opposes their velocity to limit acceleration. To make movement less uniform, we used `FastNoiseLite` to introduce gradual sideways variation. Each raindrop receives its own noise seed, giving it a slightly different path as it travels down the window.

The movement simulation combines these forces during each physics update. Noise gradually changes the direction of the sideways force, while an acceleration ramp lets raindrops build up speed over time.

```gdscript
#Simplified excerpt from _integrate_forces()

var downward_force = Vector2.DOWN * gravity_force * mass \
    * (size_factor / 1.5) * acceleration_multiplier * acceleration_ramp

var horizontal_force = Vector2.RIGHT * sideways_direction \
    * sideways_force * mass

var drag_force = -state.linear_velocity * drag_strength \
    * mass * acceleration_multiplier

var total_force = downward_force + horizontal_force + drag_force
apply_central_force(total_force)
```

Raindrop properties also influence their movement. Size affects mass and gravitational pull, while generated stats modify acceleration and maximum speed. As raindrops accelerate, their sprites stretch vertically to visually communicate their speed without changing their collision shapes.

```gdscript
#Sprite stretch based on current speed

var speed_ratio = clampf(
    linear_velocity.length() / (get_weight_multiplier() * maximum_speed),
    0.0,
    1.0
)

var stretch_amount = speed_ratio * maximum_stretch

var target_scale = Vector2(
    1.0 - stretch_amount * 0.5,
    1.0 + stretch_amount
)
```

We also wanted raindrops to be able to interact and grow as they traveled. I implemented collision-based merging, where the larger raindrop absorbs the smaller one, combining their mass, size, movement, and stats. This means that merging can change how a raindrop behaves as it continues down the window.

```gdscript
#Simplified excerpt from absorb_drop()

var combined_velocity = (
    linear_velocity * mass
    + other.linear_velocity * other.mass
) / (mass + other.mass)

radius = sqrt(radius * radius + other.radius * other.radius)

for stat in stats:
    stats[stat] = max(stats[stat], other.stats[stat]) \
        + roundi(min(stats[stat], other.stats[stat]) * 0.5)

linear_velocity = combined_velocity
update_drop_size()
```

![GMTK Game Jam ratings showing our rankings across different categories]({{ '/assets/images/awty-raindrop-stats.png' | relative_url }})

##### Raindrop Trails and Streak Riding

I implemented the raindrop trail effect using a `Line2D` created for each raindrop. During physics updates, the script samples the raindrop's position and appends points to the trail after it has moved far enough. The trail is added to a shared streak container, with each sampled point converted into that container's local coordinate space.

The line uses a width curve that tapers toward its end, rounded caps and joints, partial transparency, and a shader that adds a subtle highlight. Together, these details make the trail read as a thin water streak rather than a uniform line.

```gdscript
#Adding a point to a raindrop's trail

func add_streak_point():
    if streak.get_point_count() == 0:
        streak.add_point(streak.to_local(global_position))
        return

    var last_point = streak.get_point_position(
        streak.get_point_count() - 1
    )

    var current_point = streak.to_local(global_position)

    if last_point.distance_to(current_point) >= streak_minDistance:
        streak.add_point(current_point)
```

We also discussed how raindrops could interact with the trails left behind by other drops. I implemented a system that allows raindrops to detect and travel along existing trails. When a raindrop comes close enough to another raindrop's streak, it can attach to the trail and follow its path instead of continuing its normal physics-driven movement.

While riding a streak, raindrops periodically attempt to break away. Their escape probability increases over time, with the friendliness statthe friendliness stat, which was later renamed "magnetism" in the player-facing UI, influencing how quickly that chance grows. Once they escape, they resume sliding with momentum in the direction of the trail, potentially creating new branching paths for other raindrops to follow.

```gdscript
#Simplified excerpt from attempt_streak_escape()

if randf() <= current_escape_chance:
    stop_streak_riding(true)
else:
    current_escape_chance = minf(
        current_escape_chance
            + escape_chance_increase / get_friendliness_multiplier(),
        maximum_escape_chance
    )
```

![Raindrop close-up showing the visual trail effect]({{ '/assets/video/awty-raindropzoom.gif' | relative_url }})

### Integrating Existing Godot Addons

One of the more technically challenging parts of the project was adapting two existing Godot addons to work together:

- [Godot Dialogue Manager](https://github.com/nathanhoad/godot_dialogue_manager)
- [ACVoicebox](https://github.com/mattmarch/ACVoicebox)

We wanted dialogue to have the character-by-character audio style associated with *Animal Crossing*, rather than playing a single sound for an entire dialogue line. Neither addon supported this integration out of the box.

I investigated how each addon handled dialogue and audio, then modified both systems to connect them. I adapted `ACVoiceBox` to parse complete dialogue strings into individual characters and queue their corresponding sounds for sequential playback. I also modified the Dialogue Manager balloon to pass each dialogue line to the voice system, adjust the voice's base pitch according to the speaking character, and coordinate audio playback with the dialogue's typewriter effect.

This allowed us to keep Dialogue Manager's existing dialogue flow while adding the character-specific voice playback we wanted. Rather than replacing either addon, I extended their existing functionality to support a feature they weren't originally designed to provide.

This was the final feature I squeezed into the jam as a last-minute "Stretch Goal!" I was especially happy with how it turned out, and thrilled by the positive feedback we received. It really helped tie together the cozy, nostalgic atmosphere we were going for.

<div style="max-width: 800px; margin: 1.5rem auto;">
  <video controls width="100%" style="border-radius: 12px;">
    <source src="{{ '/assets/video/awty-dialogue-voice.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video element.
  </video>
</div>

### Technical Collaboration and Workflow

I was the only team member with prior experience using Godot and GitHub, so I took the lead on maintaining the team's technical workflow.

We met daily to discuss progress, plan upcoming tasks, and divide work in a way that minimized conflicts and overlapping implementation. I reviewed and merged teammates' pull requests into the main project, keeping everyone's work integrated as development progressed.

Being on a team with two programmers and two artists also meant keeping technical implementation and creative work aligned. I gained experience communicating implementation needs, integrating teammates' work, and keeping development moving under a short deadline.

---

## Recognition

Our game received strong rankings in the GMTK Game Jam 2026 community ratings.

![GMTK Game Jam ratings showing our rankings across different categories]({{ '/assets/images/GMTK-all-ratings.png' | relative_url }})

![GMTK Game Jam overall rating]({{ '/assets/images/GMTK-overall.png' | relative_url }})

*Rating badges generated using the [GMTK Badge Maker](https://deadrockgames.itch.io/gmtk-badge-maker) by DeadRockGames.*

- **Top 1%:** Creativity, Artwork, and Narrative
- **Top 2%:** Audio
- **Top 5%:** Enjoyment

---

## Takeaways

A huge goal of mine for this jam was putting myself out there and meeting other developers to collaborate with. I knew from past experiences in team environments that I'm at my best when I feel that others are relying on me. Having teammates who were counting on my contributions gave me a sense of responsibility and motivation that I had genuinely missed.

One of my favorite parts of the jam was our initial brainstorming session. Ideas flowed so naturally, and we were able to build on each other's suggestions until we settled on the absolutely adorable concept of racing raindrops on a car window. I particularly enjoyed how different the experience was from working independently. Rather than becoming attached to one half-baked idea and struggling to abandon it because of the time already invested, we were able to explore possibilities, build on the strongest ones, and make decisions together.

I also came away with a greater appreciation for the balance between creative collaboration and technical coordination. Being the only team member with prior Godot and GitHub experience meant I had to take responsibility for keeping the technical side organized while still making room for everyone else's contributions. I enjoyed being able to support the team in that capacity, and seeing how our different skills came together in the finished game reinforced just how much I enjoy collaborative development.

Ultimately, this jam reminded me that I don't just enjoy making games; I really enjoy making games *with other people*. It made me want to seek out more opportunities to collaborate, meet other developers, and be part of teams working toward a shared creative goal.

