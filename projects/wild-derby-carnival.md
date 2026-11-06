# Wild Derby Carnival

**Wholesome Games Game Jam 2026 · Godot · GDScript · Team of Two**

*A horse-racing game inspired by the classic carnival game, where players flick a ball into scoring holes to advance their chosen horse toward the finish line.*

[Play Wild Derby Carnival](https://livirosegames.itch.io/wild-derby-carnival)

![Wild Derby Carnival game title card]({{ '/assets/images/wild-derby-carnival.jpg' | relative_url }})

---

## Overview

*Wild Derby Carnival* was developed for Wholesome Games Game Jam 2026 in collaboration with an artist. Inspired by tabletop carnival horse-racing games, the project started as a simple ball-and-scoring prototype and grew into a multi-level racing game featuring horse selection, AI opponents, moving obstacles, animated interfaces, and a complete game flow.

I handled the programming in Godot using GDScript, while my teammate, Bosco, created the artwork. We built the initial version during the 48-hour jam, then used the additional editing week to expand the game and refine its architecture, controls, presentation, and audio.

- [My Contributions](#my-contributions)
- [Collaboration and Development Workflow](#collaboration-and-development-workflow)
- [Takeaways](#takeaways)

---

## My Contributions

- [Code Architecture](#code-architecture)
  - [Modular Level Design and Game Flow](#modular-level-design-and-game-flow)
  - [Reusable Button Component](#reusable-button-component)
  - [Shared Animation Library](#shared-animation-library)
  - [Refining the Player Experience](#refining-the-player-experience)
- [Physics-Based Gameplay and Controls](#physics-based-gameplay-and-controls)
  - [Flick-Based Controls](#flick-based-controls)
  - [Ball Physics and Spin](#ball-physics-and-spin)
  - [Ball State Management](#ball-state-management)
  - [Procedural Motion Trails](#procedural-motion-trails)
  - [Additional Gameplay Feedback](#additional-gameplay-feedback)
- [Race Progression and AI Opponents](#race-progression-and-ai-opponents)
  - [Horse Movement and Race Progression](#horse-movement-and-race-progression)
  - [AI Opponents and Difficulty](#ai-opponents-and-difficulty)
  - [Race Setup and Completion](#race-setup-and-completion)
  - [Victory Animation](#victory-animation)
- [Horse Selection and Presentation](#horse-selection-and-presentation)

### Code Architecture

After the original game jam submission, I continued refining the project beyond its initial prototype. As the number of scenes, menus, and interactions grew, I focused on making the codebase more consistent and reducing duplicated logic.

#### Modular Level Design and Game Flow

One of the architectural decisions I'm particularly proud of was designing the level system around reusable, configurable building pieces. Rather than hardcoding individual levels, I created components that could be assembled and customized directly in the Godot editor.

- **Scoring holes:** Exported variables allowed their colors and corresponding point values to be configured in the Inspector.
- **Obstacle pieces:** Reusable obstacle scenes exposed configuration options, including dropdowns for selecting their movement behavior and direction.
- **Level composition:** These pieces could be arranged and configured independently, making it easier to create different layouts without changing the underlying gameplay code.

This approach also made collaboration much easier! Because the building pieces exposed the options needed for level design, Bosco could take the lead on creating and arranging levels without having to work directly with the gameplay implementation. That freed me to focus on other systems while we worked on different parts of the game in parallel.

The result was a more flexible level architecture and a workflow that allowed both of us to contribute independently.

![Different level pieces in the Inspector]({{ '/assets/video/wdc-LevelPieces.gif' | relative_url }})

#### Reusable Button Component

I created a custom `CustomButton` class extending Godot's `TextureButton`. Instead of implementing hover and entrance animations separately for every button, I built a reusable component with exported settings that allow each instance to enable and configure its own effects.

Supported behaviors include:

- Hover scaling with configurable size and duration.
- Shader-based hover glow with adjustable color and intensity.
- Drop-in entrance animations.
- Pop-in entrance animations.
- Optional hidden initial states and controlled visibility.

The component also centralizes button hover and click sound effects. By exposing these behaviors as configurable properties, I could reuse the same class throughout the interface while allowing individual buttons to have different presentation styles.

#### Shared Animation Library

To further reduce duplicated animation logic, I created `GameAnimations`, a static utility library built around Godot's Tween system.

Rather than recreating common tween configurations throughout the project, I centralized reusable operations such as scaling, movement, fading, and entrance animations. Each method accepts configurable durations and, where appropriate, transition and easing types.

The custom button component uses this library for its scale, drop-in, and pop-in effects. This separates the definition of common animation behavior from the controls that use it, making the presentation easier to maintain and adjust consistently.

#### Refining the Player Experience

Alongside these architectural improvements, I continued refining the overall experience:

- Integrated sound effects throughout the updated game architecture.
- Added variation to repeated collision sounds through randomized pitch and volume.
- Refined tutorial layouts, button behavior, and the final tutorial step.
- Coordinated introductory animations with game loading and scene transitions.
- Addressed gameplay edge cases involving ball states, missed shots, and level loading.

These changes helped bring the different parts of the project together, improving both the consistency of the player experience and the maintainability of the underlying code.

### Physics-Based Gameplay and Controls

I implemented the core ball-and-scoring system that connects player input to race progression. The ball uses Godot's `RigidBody2D` physics system, allowing it to interact naturally with the table boundaries, obstacles, and scoring holes.

#### Flick-Based Controls

I separated the player's input handling from the ball's physics by using a dedicated `player_controller`. This script manages ball pickup, cursor interaction, aiming, and launch calculations, while the ball handles its own physical response.

When the player hovers over the ball, the controller checks whether it can be picked up. The ball must be in an available state and overlap its designated holding area before aiming can begin. I also implemented circular mouse hit detection using the ball's `CircleShape2D`, so the player interacts with the actual ball rather than its rectangular sprite bounds.

While aiming, the ball follows the cursor smoothly using linear interpolation. Its position is clamped to the holding area's rectangular boundaries, preventing the player from dragging it outside the designated launch area.

To determine launch strength, I track the mouse position between frames and calculate the resulting displacement. Once the movement exceeds a configurable threshold, the controller checks its direction and calculates launch power:

```gdscript
var mouse_delta := mouse_position - previous_mouse_position

if mouse_delta.length() >= flick_threshold:
    var direction := mouse_delta.normalized()

    if direction.y < 0.0:
        var power := mouse_delta.length() * power_multiplier
        power = min(power, max_shot_power)

        ball.launch(direction, power)
```

This approach makes launch power proportional to the distance the mouse travels between frames, with a maximum power limit to keep shots manageable. Restricting valid launches to the intended upward direction on screen also prevents accidental flicks in other directions.

Once the controller calculates the direction and power, it passes both to the ball's `launch()` method. This keeps the input system responsible for interpreting player actions while leaving the physics system responsible for applying the resulting impulse.

#### Ball Physics and Spin

When launched, the ball receives a central impulse based on the flick's direction and calculated force. I also used the launch direction to determine its angular velocity, introducing spin that made each shot feel more dynamic.

```gdscript
func launch(direction: Vector2, force: float) -> void:
    set_state(State.IN_PLAY, "ball launched")

    freeze = false
    gravity_scale = 1.0

    linear_velocity = Vector2.ZERO
    angular_velocity = 0.0

    apply_central_impulse(direction.normalized() * force)

    var spin_direction: float = -sign(direction.x)
    angular_velocity = spin_direction * force * 0.01
```

I also managed collision behavior through the ball's state. The obstacle collision layer is enabled in the ball's collision mask while it is in play and disabled in other states. This prevents the ball from interacting with moving obstacles while it is being held or otherwise unavailable.

#### Ball State Management

As the ball gained more behaviors, I moved away from loosely connected state flags and introduced an explicit state system. This gave the ball one clearly defined state at a time:

- `READY`: Available to be picked up or dropped into play.
- `HELD`: Attached to the player's input and ready to launch.
- `IN_PLAY`: Actively moving and interacting with the table.
- `SCORING`: Entered a scoring hole and is being processed.
- `RESPAWNING`: Being returned after an unsuccessful shot or other gameplay event.
- `SPAWNING`: Being positioned and initialized for play.

I centralized state changes in `set_state()`, which also updates obstacle collision behavior when the ball enters or leaves `IN_PLAY`. Helper functions such as `is_held()` and `is_scoring()` allow other gameplay systems to check the ball's state without directly depending on its internal implementation.

This made it easier to coordinate ball behavior with scoring, player input, and level progression as the game grew.

#### Procedural Motion Trails

To make fast-moving shots easier to follow, I implemented a motion trail system using dynamically generated `Line2D` nodes.

Rather than continuously drawing a line behind the ball, I periodically generate short streaks while the ball is moving above a configurable speed threshold. Each streak receives randomized properties, including its length, width, position, angle, and transparency.

I used a width curve to taper each line toward its endpoint, then animated its opacity and width until it disappeared. A configurable limit also prevents too many motion lines from accumulating at once.

This created a more energetic visual response to powerful shots without requiring a pre-made animation for every possible ball movement.

#### Additional Gameplay Feedback

I also coordinated several visual and audio effects with the ball's physics:

- Animated the shadow as the ball entered play.
- Kept the shadow and highlight aligned with the ball's rotation.
- Added collision sounds for table boundaries and obstacles.
- Varied the volume and pitch of repeated impacts against the bottom boundary to make consecutive collisions less repetitive.

Together, these systems helped communicate the ball's movement and made the central flicking mechanic feel more responsive.

![The player flicking to launch a ball]({{ '/assets/video/wdc-ThrowBall.gif' | relative_url }})

### Race Progression and AI Opponents

I developed the race system that connects scoring to horse movement and coordinates the competition between the player and six AI opponents. I separated the responsibilities between `race_layout`, which manages the overall race, and `RaceHorse`, which handles each horse's individual movement and presentation.

#### Horse Movement and Race Progression

Each horse maintains its own target position. When a horse earns points, its `advance()` method converts those points into a movement distance and updates its horizontal target:

```gdscript
func advance(points: int) -> void:
    target_x -= points * distance_per_point
```

Rather than moving immediately, each horse gradually approaches its target using `move_toward()` and its configurable movement speed. This separates scoring from movement presentation: the race system determines how far a horse should advance, while the horse handles the actual movement.

In `race_layout`, I connected the player's scoring signal to the selected horse. Whenever the player scores, the race manager checks that the race is active and advances the player's horse by the awarded points.

#### AI Opponents and Difficulty

I implemented the AI opponents directly in `race_layout`. Each horse receives an independently randomized difficulty level and scoring-check interval when the race is initialized.

The AI periodically simulates an attempt to score. At each check, it selects a random hole, generates a random roll, and compares that result against a success threshold calculated from the opponent's difficulty level and the selected hole.

```gdscript
var base_threshold := 40 + (ai_level * 6)

match hole:
    1:
        return base_threshold
    3:
        return base_threshold - 10
    5:
        return base_threshold - 20
```

Higher-level opponents receive better success chances, while more difficult holes reduce the threshold. This gives each opponent a different difficulty without requiring separate behavior scripts.

I also added a guaranteed-success mechanic after a failed attempt. Instead of allowing an opponent to fail indefinitely, the system records the failure and guarantees an advance on that horse's next scoring check. This helps keep the race moving and prevents unlucky opponents from falling too far behind.

![The beginning of a race, showing the horse AI]({{ '/assets/video/wdc-AIProgress.gif' | relative_url }})

#### Race Setup and Completion

`race_layout` handles the initial setup of the track, including spawning the horses and background bushes from reusable scenes. Exported layout values control the number of horses and bushes, their starting positions, and the spacing between them.

When a horse is selected, the race manager records it as the player's horse, updates the selection visuals, and starts the race. The remaining horses are managed as AI opponents.

During the race, the manager checks each horse's position against the finish-line boundary. Once a horse crosses it, the race is marked as finished, all horses are stopped, and the winning horse performs its celebration animation. The manager also emits a `race_finished` signal containing the winning horse and whether the player won, allowing the rest of the game to respond to the result.

#### Victory Animation

I implemented the horse's victory animation as a sequence of coordinated tweens. The winning horse squashes before jumping upward and rotating out of view. It then re-enters above the race, grows into its final size, and finishes with a looping bounce.

I also included a reset method to restore each horse's position, rotation, scale, and animation state when preparing for another race.

Together, these systems turn individual scoring attempts into one shared race, with independently progressing opponents and a distinct presentation for the winner.

![The race results animation]({{ '/assets/video/wdc-Win.gif' | relative_url }})

### Horse Selection and Presentation

I wanted horse selection to feel like part of the carnival experience rather than a simple menu. I implemented interactive feedback and randomized presentation to give each horse its own personality.

Each horse independently detects mouse hover and selection through its `SelectionArea`. Hovering over a horse animates its head and face, displays its name, and plays a sound effect. Clicking emits a selection signal that allows the race manager to identify the player's chosen horse.

I also implemented randomized horse appearances using compatible body and head texture variants, along with independently randomized face textures and tarp colors. To make the selection screen more playful, I created a collection of animated name styles using `RichTextLabel` effects. Names and text styles are tracked to reduce repetition between horses.

![The player selecting a horse]({{ '/assets/video/wdc-HorseSelect.gif' | relative_url }})

---

## Collaboration and Development Workflow

This was a two-person project, with Bosco handling the artwork and me handling the programming. I used Git and GitHub to organize development through feature branches and pull requests, keeping changes manageable as the project expanded.

Working with an artist I had met through the *Are We There Yet?* team also gave me an opportunity to apply what I had learned in the art courses I took. Having a better understanding of visual design helped me communicate implementation needs, discuss how artwork would fit into the game, and collaborate on the presentation of the finished experience.

As the project grew beyond its original game jam scope, I continued refining the codebase to support new features while keeping the game's systems organized and reusable.

---

## Takeaways

One of my big goals for this jam was pushing myself to think more about modular design and building with future development in mind. I wanted to get better at creating reusable building blocks rather than just implementing whatever was needed to get the current feature working. That meant avoiding repeated code, separating responsibilities between systems, and exposing configurable properties so I could adjust behavior without constantly revisiting the underlying implementation.

I got to put that into practice in several parts of the project. Creating reusable level pieces made it possible for Bosco to build and arrange levels independently of the gameplay code. The custom button component and shared animation library also gave me a foundation I could reuse throughout the interface instead of recreating similar behaviors for every new screen or interaction.

I particularly enjoyed seeing how these decisions became more valuable as the project grew beyond the original 48-hour jam. Features that might have required more work if everything had been hardcoded could instead build on systems I had already established. It reinforced for me that good architecture isn't just about making code look organized; it's about making future changes and additions easier.

Overall, this project gave me a chance to practice thinking beyond the immediate feature and considering how the pieces of a game fit together. I want to continue developing that skill, especially as I work on larger projects where maintainability and flexibility become increasingly important.