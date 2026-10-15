---

layout: default

title: Wild Derby Carnival — Case Study

---



# Wild Derby Carnival



**Wholesome Games Game Jam 2026 · Godot · GDScript · Team of Two**



A horse-racing game inspired by the classic carnival game, where players flick a ball into scoring holes to advance their chosen horse toward the finish line.



[Play Wild Derby Carnival](https://livirosegames.itch.io/wild-derby-carnival)



![Wild Derby Carnival game title card]({{ '/assets/images/wild-derby-carnival.jpg' | relative_url }})



## Overview



*Wild Derby Carnival* was developed for Wholesome Games Game Jam 2026 in collaboration with an artist. What began as a tabletop-inspired prototype grew into a multi-level racing game featuring horse selection, AI opponents, animated interfaces, and a complete game flow.



I handled the programming in Godot using GDScript. We built the initial version during the 48-hour jam, then used the additional week available for editing submissions to refine the game's architecture, controls, presentation, and audio.



## My Contributions



### Physics-Based Gameplay and Controls



I implemented the core ball-and-scoring system that connects player input to horse racing.



- **Flick-based controls:** Detected mouse flicks and translated their speed into ball-launch power.

- **Physics and collisions:** Implemented ball movement, table boundaries, and interactions with scoring holes.

- **Scoring system:** Configured hole types with different score values and automatically matched their ring colors to their types.

- **Ball lifecycle:** Managed ball states, missed shots, scoring animations, and the return of the ball to the player's hold area.

- **Gameplay feedback:** Added motion lines, a rotating highlight, a fading shadow, and spin effects to make ball movement more readable and satisfying.



These systems needed to work together so that each shot felt responsive while keeping scoring and ball behavior consistent.



### Race Progression and AI Opponents



I developed the race system that turns individual scoring shots into progress toward winning.



- **Player race movement:** Advance the selected horse according to the player's score.

- **AI opponents:** Give computer-controlled horses independent scoring timers and randomized movement, allowing all horses to race simultaneously.

- **Difficulty-based behavior:** Adjust AI success rates and movement checks according to hole difficulty.

- **Race completion:** Detect the first horse to cross the finish line, stop the race, and display an animated winner announcement.

- **Race presentation:** Build the track layout, animate background bushes, and coordinate horse movement with the finish line.



This required coordinating separate gameplay systems so that player scoring, AI behavior, race movement, and victory detection could operate together.



### Modular Levels and Game Flow



As the game expanded beyond its initial prototype, I reworked the project structure to support a more complete game.



- **Dynamic level loading:** Built a level manager that loads level-specific table scenes and coordinates level progression, restarting, and transitions.

- **Reusable obstacles:** Created configurable moving-block and cycling-piston obstacles with adjustable movement, timing, and direction.

- **State management:** Replaced loosely connected ball-state flags with a state machine to make ball behavior and transitions more predictable.

- **Scene transitions:** Separated the intro, gameplay, and ending into distinct scenes, with animated curtain transitions between them.

- **Replay flow:** Implemented progression between levels, restarting after a loss, and replaying from the beginning after completing the final level.



This refactoring helped separate responsibilities and made it easier to add new levels and gameplay behavior without continually building on the original prototype structure.



### Horse Selection and Presentation



I implemented the interactive horse-selection system and several visual details that help the game feel like a carnival attraction.



- Detect mouse hover and clicks on individual horses.

- Animate horse heads and highlight hovered or selected horses.

- Display horse names during selection and style them with randomized animated text.

- Randomize horse appearances while preserving compatible body, head, and face variants.

- Animate the title, buttons, winner display, and other interface elements.



I also consolidated button animations into a reusable component with configurable hover, glow, drop-in, and pop-in effects.



### Audio and Interface Polish



Following the original game jam submission, I continued improving the player experience.



- Integrated sound effects into the updated game architecture.

- Added collision sounds and varied the pitch and volume of repeated impacts.

- Refined tutorial layout, button behavior, and the final tutorial step.

- Coordinated intro animations with game loading and scene transitions.

- Fixed gameplay edge cases involving ball states, missed shots, and level loading.



These updates helped make the game more consistent and polished beyond its initial jam submission.



## Collaboration and Development Workflow



This was a two-person project, with Bosco handling the art and me handling the programming. I used Git and GitHub to organize development, work with feature branches, and integrate changes through pull requests.



As the project grew beyond its initial game jam scope, I continued refining the codebase to support new features while keeping the game's systems organized and maintainable.



## What I Learned



This project gave me experience taking a small game prototype through several stages of development: establishing core mechanics, building interconnected gameplay systems, expanding the game with AI and level progression, and improving the architecture as requirements grew.



It also reinforced the importance of state management, reusable components, and testing interactions between systems. A feature such as ball movement affects more than the ball itself—it can influence scoring, race progress, sound effects, and level transitions. Keeping those relationships organized became increasingly important as the game expanded.



## Technologies



Godot · GDScript · Git · GitHub · Physics and collision systems · State machines · AI behavior · Reusable UI components

