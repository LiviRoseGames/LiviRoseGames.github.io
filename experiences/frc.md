---
layout: default
title: FIRST Robotics Competition
---

# FIRST Robotics Competition

**FRC Team 701 · The RoboVikes · 2015–2017**

I spent three years as a member of **FRC Team 701, the RoboVikes**, based at Vanden High School in Fairfield, California. Our team competed in the FIRST Robotics Competition while also reaching out to students and communities throughout Fairfield, Vacaville, and Suisun City.

I've always thought of FRC as a sport for robots. Each January, teams receive a new game challenge and have to design, build, and program a robot capable of competing against other teams. The games change every season, so each year brings an entirely new set of mechanical, programming, and strategic challenges.

Our robot code was written in C++, while we used Python for vision processing. During my time on the team, I went from being one of the programming students to leading the programming committee in my final year.

During my time on the team, I went from being one of the programming students to leading the programming committee in my final year. Being part of a competitive robotics team gave me some of my earliest experiences with collaborative software development, technical problem-solving, and engineering under pressure.

---

## My Role on the Team

I joined the programming committee during my first year and remained involved throughout my three years with the team. Because our programming group was relatively small, there were plenty of opportunities to take on responsibility early.

By my second year, I was already helping teach younger programmers and sharing what I had learned. I enjoyed helping newer members get comfortable with the programming side of robotics, especially when they were encountering concepts and tools for the first time.

In my final year, I became **Programming Head**, taking on a leadership role within the committee. This meant helping guide the programming team while continuing to work alongside the other groups responsible for designing, building, and operating our robot.

## Working With the Drive Team

One of my favorite parts of programming was collaborating with the drive team. The software wasn't something that existed separately from the people operating the robot; it needed to support how they actually wanted to control it.

We experimented with different control setups, including custom controllers, Xbox controllers, and buttons integrated into the driver station laptop's dashboard.

I especially enjoyed working with the drivers to figure out what controls felt intuitive and how we could make the robot easier to operate during competition. It was a very practical form of problem-solving: listen to what the drivers needed, work together on a solution, and see how it performed when the robot was actually on the field.

There is a lot of pressure during a competition match, and I always felt it was the programmers' responsibility to make the drivers' jobs as easy as possible. The more predictable and intuitive the controls were, the more attention they could give to strategy and the match itself.

That collaboration helped me appreciate how much good software depends on understanding the people who use it.

---

## Our Robots

Each season brought a new FIRST Robotics Competition game, a new set of engineering challenges, and a completely different robot to design and build.

### 2015 — Recycle Rush

**Robot: Heimdall**

Recycle Rush was a cooperative stacking challenge focused on collecting and organizing materials. Robots picked up gray plastic totes, stacked them on top of one another, and placed green recycling containers on top of completed stacks to increase their scoring value.

Our robot, Heimdall, was designed to collect and stack totes, building towers up to six totes high.

<div class="robot-showcase">
    <img
        src="{{ '/assets/images/frc/2015/heimdall-final-photo.png' | relative_url }}"
        alt="Heimdall, Team 701's 2015 robot"
    >

    <iframe
        src="https://www.youtube.com/embed/CYAH38uazxg"
        title="Team 701 Heimdall 2015 Robot Video"
        allowfullscreen>
    </iframe>
</div>

#### From Prototype to Competition Robot

Before building our final competition robot, we constructed a full prototype. This gave us an opportunity to test mechanical designs and begin programming before the final robot was ready.

One particularly useful part of this process was that we could continue working with the prototype after the competition robot had to be bagged at the end of the six-week build period. That meant programming and testing could continue without needing access to the competition robot.

The prototype also gave us an opportunity to experiment with mechanisms before committing to the final design.

<div class="photo-carousel" data-carousel>
    <div class="carousel-images">

        <figure class="carousel-slide active">
            <img src="{{ '/assets/images/frc/2015/heimdall-early-prototype.png' | relative_url }}"
                 alt="Early wooden prototype of Heimdall's tote elevator">
            <figcaption>
                An early wooden prototype used to test the elevator mechanism. The acrylic teeth developed here became part of the final design.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2015/heimdall-full-prototype.png' | relative_url }}"
                 alt="Full prototype of Heimdall">
            <figcaption>
                The completed prototype let the programming team begin developing and testing software before the competition robot was finished.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2015/heimdall-assembling.png' | relative_url }}"
                 alt="Heimdall during assembly">
            <figcaption>
                Heimdall taking shape during the build process.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2015/heimdall-early-wiring.png' | relative_url }}"
                 alt="Early wiring on Heimdall">
            <figcaption>
                An early look at the robot's electrical layout.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2015/heimdall-final-wiring.png' | relative_url }}"
                 alt="Completed wiring on Heimdall">
            <figcaption>
                The wiring after the robot's electrical components were installed.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2015/heimdall-final-photo.png' | relative_url }}"
                 alt="Completed Heimdall competition robot">
            <figcaption>
                The finished Heimdall, ready for competition!
            </figcaption>
        </figure>

    </div>

    <div class="carousel-controls">
        <button class="carousel-prev" type="button" aria-label="Previous image">❮</button>
        <span class="carousel-counter">1 / 6</span>
        <button class="carousel-next" type="button" aria-label="Next image">❯</button>
    </div>
</div>


#### The Tote Elevator

One of my favorite aspects of Heimdall was its tote elevator.

The elevator used flexible acrylic teeth to pick up totes. The teeth could bend enough to slide underneath a tote's lip without immediately breaking, then spring back into position to catch and lift it.

By repeating this process, Heimdall could collect totes one at a time and stack them on top of each other. Building stacks as high as six totes was important to our scoring strategy.

I particularly enjoyed working with encoders to create preset elevator positions. Instead of requiring the drive team to manually estimate every position, we programmed consistent targets that made it easier to move the elevator between different heights.

The presets handled the larger movements, while the drivers could still use joystick controls for precise adjustments. This gave them a more predictable way to operate the mechanism without taking away their ability to make corrections.

**Keeping the Elevator Calibrated**

Of course, the real world isn't always as predictable as a program expects. We quickly realized that the elevator's encoder readings could drift away from its actual position during repeated movement. Even small inaccuracies could make the preset positions less reliable over time.

To address this, we added sensors and buttons at key points along the elevator's travel: the midpoint, the top, and the bottom. Whenever the elevator passed one of these reference points, the corresponding input could reset the encoder's recorded position to a known value. This allowed the elevator to periodically re-zero itself instead of letting positioning errors accumulate throughout a match.

Competition matches were intense, and there was already plenty for the drive team to think about. I always felt that one of the programmers' responsibilities was to make operating the robot as straightforward and reliable as possible. Building in ways to account for real-world inconsistencies was just as important as making the controls convenient in the first place.

#### Programming and Driver Controls

Our driver station used a laptop connected to a custom controller that the team designed and wired.

We experimented with different input methods and worked with the drive team to find control arrangements that made sense for the robot's mechanisms. This included custom controller inputs, Xbox controllers, and dashboard buttons.

I enjoyed this part of the process because it connected programming directly to the experience of operating the robot. A control could work technically, but that didn't necessarily mean it was comfortable or intuitive to use during a match.

I paid particular attention to feedback from the drivers. They were the ones making decisions under pressure, so I wanted the controls to feel natural and make the robot's behavior as predictable as possible. Sometimes that meant changing how an action was triggered or reconsidering where a function belonged.

Ultimately, I saw the programming team's job as making the drive team's job easier. The less they had to think about the controls themselves, the more attention they could give to the match.

<div class="photo-grid">
    <figure>
        <img
            src="{{ '/assets/images/frc/2015/drive-station.png' | relative_url }}"
            alt="Team 701's driver station laptop and custom wired controller"
        >
        <figcaption>
            Our driver station, with the custom controller connected to the laptop.
        </figcaption>
    </figure>

    <figure>
        <img
            src="{{ '/assets/images/frc/2015/learning-programming.png' | relative_url }}"
            alt="Team members learning and working on robot programming"
        >
        <figcaption>
            Learning and collaborating on the programming side of the robot.
        </figcaption>
    </figure>
</div>

#### Heimdall in Competition

Heimdall took us through the 2015 Recycle Rush season, from regional competitions all the way to the FIRST Championship.

Competition was where all the planning, building, and programming came together. We had to adapt to unfamiliar fields, work alongside alliance partners, and make decisions under the pressure of a match. It was also one of my favorite parts of being on the team: getting to see something we'd spent months building finally compete.

The photos below capture some of our experiences throughout the season, including our time at competitions, team traditions, and our trip to the FIRST Championship.

<div class="photo-carousel" data-carousel>
    <div class="carousel-images">

        <figure class="carousel-slide active">
            <img src="{{ '/assets/images/frc/2015/heimdall-competition-01.png' | relative_url }}"
                 alt="Heimdall competing during the 2015 Recycle Rush season">
            <figcaption>
                Heimdall competing in Recycle Rush.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2015/heimdall-competition-02.png' | relative_url }}"
                 alt="Heimdall competing during the 2015 Recycle Rush season">
            <figcaption>
                Another moment from our competition season.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2015/heimdall-competition-03.png' | relative_url }}"
                 alt="Pictures of our team's tote stacks">
            <figcaption>
                Pictures of our team's tote stacks.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2015/robovikes-group-photo.png' | relative_url }}"
                 alt="Team 701 RoboVikes at the 2015 FIRST Championship">
            <figcaption>
                Team 701 at the FIRST Championship in 2015.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2015/team-spirit.png' | relative_url }}"
                 alt="RoboVikes team spirit at the first competition">
            <figcaption>
                A little team spirit at my first competition!
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2015/frc-champ-welcome-banner.png' | relative_url }}"
                 alt="Welcome banner at the FIRST Championship">
            <figcaption>
                Arriving at the FIRST Championship.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2015/livi-dean-standee.png' | relative_url }}"
                 alt="Photo with a cardboard standee of the founder of FIRST">
            <figcaption>
                A photo with standee of FIRST's founder!
            </figcaption>
        </figure>

    </div>

    <div class="carousel-controls">
        <button class="carousel-prev" type="button" aria-label="Previous image">❮</button>
        <span class="carousel-counter">1 / 7</span>
        <button class="carousel-next" type="button" aria-label="Next image">❯</button>
    </div>
</div>

### 2016 — Stronghold

**Robot: Loki**

Stronghold brought a different set of challenges from the previous year's Recycle Rush. The game had a medieval castle theme, with robots working to breach the opposing alliance's defenses, launch foam boulders into their tower, and eventually capture it.

Our robot, Loki, was built around a shooting mechanism. Rather than stacking totes, we needed to accurately launch balls toward the opposing tower, which meant developing a reliable shooter and controls that the drive team could operate under match pressure.

<div class="robot-showcase">
    <img
        src="{{ '/assets/images/frc/2016/loki-final-glam.png' | relative_url }}"
        alt="Loki, Team 701's 2016 robot"
    >

    <iframe
        src="https://www.youtube.com/embed/2pkX6uhW1X0"
        title="Team 701 Loki 2016 Robot Video"
        allowfullscreen>
    </iframe>
</div>

#### Designing and Planning Loki

Before construction began, we spent time exploring different designs and planning how Loki's mechanisms would work together. We used Autodesk software to develop the robot's design, sketched ideas on whiteboards, and kept track of tasks as the build progressed.

Planning the controls was another important part of the process. We discussed how the drive team would interact with the robot and mapped out ideas before implementing them. I enjoyed seeing how mechanical design and programming had to inform each other from the beginning.

<div class="photo-carousel" data-carousel>
    <div class="carousel-images">

        <figure class="carousel-slide active">
            <img src="{{ '/assets/images/frc/2016/loki-design-process-whiteboard.png' | relative_url }}"
                 alt="Whiteboard sketches of possible Loki designs">
            <figcaption>
                Early sketches and ideas for Loki's design.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2016/loki-design-process.png' | relative_url }}"
                 alt="Loki's work-in-progress design in Autodesk software">
            <figcaption>
                Developing Loki's design in Autodesk software.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2016/loki-todo-lists.png' | relative_url }}"
                 alt="Team task lists during Loki's development">
            <figcaption>
                Keeping track of everything that needed to get done.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2016/planning-and-practicing.png' | relative_url }}"
                 alt="Team meeting in the physics room with control sketches on the whiteboard">
            <figcaption>
                Planning and practicing our controls, with our ideas mapped out on the whiteboard.
            </figcaption>
        </figure>

    </div>

    <div class="carousel-controls">
        <button class="carousel-prev" type="button" aria-label="Previous image">❮</button>
        <span class="carousel-counter">1 / 4</span>
        <button class="carousel-next" type="button" aria-label="Next image">❯</button>
    </div>
</div>

#### From Prototype to Competition Robot

As with Heimdall, we built a prototype that let us test our designs and begin programming before the final competition robot was ready. Having a practice robot was especially useful for a mechanism as involved as Loki's shooter. We could experiment, identify problems, and refine the controls without having to wait for the final build.

<div class="photo-carousel" data-carousel>
    <div class="carousel-images">

        <figure class="carousel-slide active">
            <img src="{{ '/assets/images/frc/2016/loki-prototype-inside.png' | relative_url }}"
                 alt="Early internal construction of Loki's prototype">
            <figcaption>
                An early look inside the prototype.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2016/loki-prototype-assembling.png' | relative_url }}"
                 alt="Loki's prototype being assembled">
            <figcaption>
                Putting the prototype together.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2016/loki-prototype-wiring.png' | relative_url }}"
                 alt="Wiring on Loki's prototype">
            <figcaption>
                Working through the prototype's wiring.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2016/loki-prototype-wiring-02.png' | relative_url }}"
                 alt="Another view of the prototype wiring">
            <figcaption>
                Another look at the prototype's electrical setup.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2016/loki-prototype-full.png' | relative_url }}"
                 alt="Completed Loki prototype">
            <figcaption>
                The completed prototype, ready for testing.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2016/loki-prototype-full-02.png' | relative_url }}"
                 alt="Second view of the completed Loki prototype">
            <figcaption>
                Another view of the finished practice robot.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2016/loki-prototype-testing.png' | relative_url }}"
                 alt="Driving Loki's completed prototype during testing">
            <figcaption>
                Testing the prototype on the practice field.
            </figcaption>
        </figure>

    </div>

    <div class="carousel-controls">
        <button class="carousel-prev" type="button" aria-label="Previous image">❮</button>
        <span class="carousel-counter">1 / 7</span>
        <button class="carousel-next" type="button" aria-label="Next image">❯</button>
    </div>
</div>

#### Vision-Assisted Shooting

One of my favorite parts of Loki was the vision system we developed to help control the shooter.

We used a Raspberry Pi connected to a camera surrounded by a bright green ring light. The light illuminated the reflective green vision tape on the opposing tower, making it easier for the camera to distinguish the target from the rest of the field.

The camera software applied multiple color filters to isolate the bright green pixels, ignoring pixels that didn't meet the specified color criteria. From the resulting image, we could examine two important characteristics of the target: the shape of the U-shaped vision tape around the bottom of the tower and the number of green pixels detected.

However, recognizing the target was only the first step. We wanted to use that visual information to estimate how fast our shooter needed to spin to make a successful shot.

To develop that relationship, we tested the camera at multiple distances and angles from the target, collecting measurements under different conditions. We used the resulting data to develop mathematical functions that related the visual measurements to an estimated shooter RPM.

This allowed Loki to use information from its surroundings to help determine the appropriate shooter speed, rather than relying on a single fixed setting. It was one of the most interesting systems I worked with because it combined image processing, data collection, mathematical modeling, and physical robot control.

<div class="photo-grid">
    <figure>
        <img
            src="{{ '/assets/images/frc/2016/target-diagram.webp' | relative_url }}"
            alt="Diagram of the vision target and high goal on the Stronghold tower"
        >
        <figcaption>
            The reflective vision target used to help Loki line up its shots.
        </figcaption>
    </figure>

    <figure>
        <img
            src="{{ '/assets/images/frc/2016/target-output.webp' | relative_url }}"
            alt="Processed camera output isolating the green vision target"
        >
        <figcaption>
            Processed camera output highlighting the detected green pixels.
        </figcaption>
    </figure>
</div>

#### Shooter Controls and Safeguards

Getting the shooter to work was only part of the challenge. We also needed to make sure its different mechanisms operated in the correct sequence.

When the co-driver commanded a shot, the shooter arm would raise into position. However, the wheel that fed the ball into the spinning shooter wheels needed to wait until those wheels had reached the appropriate RPM. Only then could the ball be fed through and launched.

These checks helped prevent the robot from attempting to shoot before the mechanism was ready. They also made the process more predictable for the drive team, who needed to focus on positioning and timing during a match rather than manually coordinating every part of the shooter.

We polished the programming as much as possible using our prototype and practice robot. However, the final competition robot still required quick adjustments once we arrived at events. Even with extensive testing, differences between the practice and competition robots meant we had to be ready to troubleshoot and adapt.

#### The Finished Loki

After all the planning, prototyping, and testing, we finally had our competition robot. Loki's arm could raise high above the chassis, giving the shooter the range of motion needed for its role in Stronghold.

<div class="photo-carousel" data-carousel>
    <div class="carousel-images">

        <figure class="carousel-slide active">
            <img src="{{ '/assets/images/frc/2016/loki-final-assembling.png' | relative_url }}"
                 alt="Loki during final robot assembly">
            <figcaption>
                Loki coming together during final assembly.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2016/loki-final-wiring.png' | relative_url }}"
                 alt="Work in progress on Loki's final wiring">
            <figcaption>
                Final wiring work on the competition robot.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2016/loki-final-arm-up.png' | relative_url }}"
                 alt="Loki's completed arm raised to its full height">
            <figcaption>
                The completed arm raised to show its full reach.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2016/loki-final-glam.png' | relative_url }}"
                 alt="Finished Loki competition robot">
            <figcaption>
                Loki, ready for competition!
            </figcaption>
        </figure>

    </div>

    <div class="carousel-controls">
        <button class="carousel-prev" type="button" aria-label="Previous image">❮</button>
        <span class="carousel-counter">1 / 4</span>
        <button class="carousel-next" type="button" aria
        <button class="carousel-next" type="button" aria-label="Next image">❯</button>
    </div>
</div>

### 2017 — Steamworks

**Robot: Ragnarok**

Steamworks had a steampunk theme, with robots working to deliver gears to their alliance's airship, shoot fuel (small wiffle balls) into a boiler, and climb ropes at the end of the match.

Our robot, Ragnarok, needed to handle several different tasks. We continued developing vision-assisted shooting, but much of my focus shifted toward the autonomous period at the beginning of each match.

<div class="robot-showcase">
    <img
        src="{{ '/assets/images/frc/2017/final-loaded-up.png' | relative_url }}"
        alt="Ragnarok, Team 701's 2017 robot"
    >

    <iframe
        src="https://www.youtube.com/embed/54CVrqjwk4I"
        title="Team 701 Ragnarok 2017 Robot Video"
        allowfullscreen>
    </iframe>
</div>

#### Vision-Assisted Shooting

We continued using vision processing to help the robot aim and shoot fuel into the boiler. Building on the work we'd done with Loki, we used vision information to help the shooter respond to the target rather than relying entirely on fixed settings.

#### Autonomous Gear Scoring

One of my main focuses with Ragnarok was the autonomous period. During this part of a match, the robot had to perform programmed actions without direct driver control.

One of our goals was to score a gear by placing it onto a peg on the opposing airship's mechanism. The human players, called pilots, would then pull the gear into position to help assemble the airship.

To help Ragnarok accomplish this autonomously, we used vision tape surrounding the peg as a reference point. The vision system could detect the target and provide information that helped us develop an autonomous routine for approaching and lining up with it.

This was an interesting challenge because autonomous programming required us to account for the robot's position and the field around it without relying on a driver to make corrections. We wanted Ragnarok to be able to recognize the target and execute its scoring routine as consistently as possible.

#### Ragnarok in Competition

Our practice setup included a wooden replica of the competition field, which gave us a way to test the robot and its mechanisms before taking them to an actual event.

<div class="photo-carousel" data-carousel>
    <div class="carousel-images">

        <figure class="carousel-slide active">
            <img src="{{ '/assets/images/frc/2017/final-loaded-up.png' | relative_url }}"
                 alt="Ragnarok positioned beneath the wooden practice field loader">
            <figcaption>
                Ragnarok under our wooden replica of the competition field's loading station.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2017/ball-carrier.png' | relative_url }}"
                 alt="Rear view of Ragnarok showing its ball carrying mechanism">
            <figcaption>
                A look at Ragnarok's ball-carrying mechanism from the back.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2017/competition.png' | relative_url }}"
                 alt="Ragnarok lined up before the start of a match with a gear loaded">
            <figcaption>
                Ragnarok lined up before a match, with a gear already loaded for autonomous.
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2017/competition-climbed-up.png' | relative_url }}"
                 alt="Ragnarok climbing the endgame rope during a competition">
            <figcaption>
                Climbing during the endgame for bonus points!
            </figcaption>
        </figure>

        <figure class="carousel-slide">
            <img src="{{ '/assets/images/frc/2017/group-picture.png' | relative_url }}"
                 alt="Team 701 RoboVikes at the Sacramento Regional">
            <figcaption>
                Team 701 at the Sacramento Regional.
            </figcaption>
        </figure>

    </div>

    <div class="carousel-controls">
        <button class="carousel-prev" type="button" aria-label="Previous image">❮</button>
        <span class="carousel-counter">1 / 5</span>
        <button class="carousel-next" type="button" aria-label="Next image">❯</button>
    </div>
</div>

#### A Little Team Spirit

Vision tape was an important part of our robots' targeting systems, but apparently it also made a pretty good headband.

<img
    src="{{ '/assets/images/frc/2017/vision-tape.png' | relative_url }}"
    alt="A teammate and me wearing reflective vision tape as headbands"
    style="display:block; max-width:700px; width:100%; margin:2rem auto; border-radius:12px;"
>

## Competition Results and Recognition

Over my three years with Team 701, I got to be part of a team that competed at regional events across California, Idaho, and Texas, eventually advancing to the FIRST Championship.

Some of the team's highlights included:

### 2015 Season

- **Central Valley Regional:** Regional Finalists
- **Sacramento Regional:** Regional Engineering Inspiration Award and Regional Finalists
- **Lone Star Regional:** Regional Finalists and Quality Award
- **Curie Division — FIRST Championship:** Gracious Professionalism Award

![2015 season medal]({{ '/assets/images/frc/2015/frc-medal.png' | relative_url }})

### 2016 Season

- **Central Valley Regional:** Judges' Award
- **Sacramento Regional:** Gracious Professionalism Award
- **Idaho Regional:** Innovation in Control Award

![2016 Stronghold season awards]({{ '/assets/images/frc/2016/stronghold-awards.png' | relative_url }})

### 2017 Season

- **Sacramento Regional:** Regional Finalists, Gracious Professionalism Award, and Wildcard
- **Idaho Regional:** Ranked 3rd and competed as Captain of Alliance 2
- **Galileo Division — FIRST Championship:** Ranked 13th and competed as the first pick of Alliance 8

These results represent the work of the entire team, from programming and mechanical design to fabrication, strategy, and driving. I was proud to contribute to that work and to see what we accomplished together.

---

## Looking Back

FRC was one of my first opportunities to experience engineering as a collaborative process. Building a robot required much more than writing code: it meant communicating across different groups, understanding the needs of other team members, teaching what I knew, and adapting when something didn't work as expected.

My favorite memories are still the ones involving collaboration with the drive team and helping younger programmers find their footing. I enjoyed seeing how programming decisions could make a tangible difference to the people operating the robot, especially when those decisions helped make a stressful competition match a little easier to manage.

Those experiences helped shape the way I approach development today. I enjoy working through technical challenges, but I also value the communication and teamwork that turn an individual solution into something a whole team can use.