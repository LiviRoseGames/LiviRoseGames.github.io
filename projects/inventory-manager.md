# Creative ArtReach Inventory Manager

**C# · Windows Forms · CSV Data · Individual Project**

*A desktop application designed to simplify supply management and project planning across Creative ArtReach's educational sites.*

## Overview

The Creative ArtReach Inventory Manager began as a sketch on a sheet of printer paper during a break at my job. At the time, I was already working as the Robotics and Science Enrichment Lead, and I had firsthand experience with some of the organizational challenges the application was intended to address.

Keeping track of supplies across different sites could be difficult. Materials were sometimes misplaced or forgotten, supplies could be overstocked or reordered unnecessarily, and planning activities around the materials available at each location took time.

I started thinking about how a small application could bring these processes together. What began as a rough doodle eventually became a working C# Windows Forms application that I was able to introduce at my local Creative ArtReach site.

## The Problem

I identified two major areas where the existing workflow could be improved:

**Supply Management**
- Supplies could be misplaced or forgotten.
- Overstocking and unnecessary reordering happened too often.
- Tracking quantities across different sites was difficult.

**Project Planning**
- Planning activities at the last minute was stressful and inefficient.
- Coming up with new project ideas every day took time.
- It wasn't always easy to identify projects that could be completed using supplies already available at a particular site.

## Project Objectives

I designed the application around three main objectives:

1. **Efficient Supply Tracking:** Keep an organized record of supply quantities at different sites.
2. **Supply-Based Project Recommendations:** Help staff find projects that could be completed using the supplies available at their location.
3. **A Database of Past Projects:** Make previously developed activities easier to find and reuse when planning future projects.

## From Sketch to Application

The first version of this project wasn't designed in an IDE. It started with a pen, regular printer paper, and a rough idea of how the different pages might fit together.

I sketched out the interface and planned how someone would navigate between supply management and project planning. Once I had a clearer idea of the workflow, I began turning those sketches into a functional Windows Forms application.

<figure>
    <img src="{{ '/assets/images/Inventory-Manager/IM_hp_draft.png' | relative_url }}" alt="Original hand-drawn sketch of the Inventory Manager home page">
    <figcaption>My original home page sketch, mapping out the application's main navigation.</figcaption>
</figure>

<figure>
    <img src="{{ '/assets/images/Inventory-Manager/IM hp.png' | relative_url }}" alt="Finished Inventory Manager home page">
    <figcaption>The implemented home page, translated from the original sketch into Windows Forms.</figcaption>
</figure>

The finished program was still a prototype, and its interface was far from polished, but it accomplished what I had set out to do: it brought several useful workflows into one place.
## Application Features

### Home Page

The home page acts as the application's main navigation screen. From here, users can choose which part of the program they want to access or exit the application.

<figure>
    <img src="{{ '/assets/images/Inventory-Manager/IM_hp_draft.png' | relative_url }}" alt="Home page design sketch">
    <figcaption>Original interface concept.</figcaption>
</figure>

<figure>
    <img src="{{ '/assets/images/Inventory-Manager/IM hp.png' | relative_url }}" alt="Implemented home page">
    <figcaption>Implemented Windows Forms interface.</figcaption>
</figure>

### Manage Supplies

This page provides a way to view and update supply quantities across different Creative ArtReach sites.

The supply information is stored in a CSV file, with quantities recorded for each site. Users can edit the available amounts and save their changes, allowing the inventory information to be updated as supplies are used or replenished.

<figure>
    <img src="{{ '/assets/images/Inventory-Manager/IM_ms_draft.png' | relative_url }}" alt="Manage Supplies page design sketch">
    <figcaption>Original Manage Supplies layout.</figcaption>
</figure>

<figure>
    <img src="{{ '/assets/images/Inventory-Manager/IM_ms.png' | relative_url }}" alt="Implemented Manage Supplies page">
    <figcaption>Implemented inventory editor.</figcaption>
</figure>

### Find a Project

This page connects supply tracking with day-to-day activity planning.

After selecting a site and entering the number of children participating, the application checks the available supply information and displays possible projects that the site has the materials to complete.

Rather than requiring staff to browse through every project and manually check its supply requirements, this feature helps narrow down the options based on what is already available.

<figure>
    <img src="{{ '/assets/images/Inventory-Manager/IM_fap_draft.png' | relative_url }}" alt="Find a Project page design sketch">
    <figcaption>Original Find a Project layout.</figcaption>
</figure>

<figure>
    <img src="{{ '/assets/images/Inventory-Manager/IM_fap.png' | relative_url }}" alt="Implemented Find a Project page">
    <figcaption>Implemented project recommendation interface.</figcaption>
</figure>

### View All Projects

This page provides access to the full collection of projects in the application's database.

Users can enter the number of children they are planning for, and the application adjusts the project's supply requirements accordingly. This feature is particularly useful for planning ahead and determining what needs to be ordered before an activity takes place.

<figure>
    <img src="{{ '/assets/images/Inventory-Manager/IM_vap_draft.png' | relative_url }}" alt="View All Projects page design sketch">
    <figcaption>Original View All Projects layout.</figcaption>
</figure>

<figure>
    <img src="{{ '/assets/images/Inventory-Manager/IM_vap.png' | relative_url }}" alt="Implemented View All Projects page">
    <figcaption>Implemented project database and supply calculator.</figcaption>
</figure>

## Implementation

I built the application in C# using Windows Forms, with CSV files serving as the data source for inventory and project information.

Rather than keeping supply quantities and project requirements directly in the code, I separated them into two files: `supplies.csv` and `projects.csv`. This allowed the application to load and update its data independently of the interface.

### CSV-Based Inventory

The inventory file stores supply names alongside their quantities at each Creative ArtReach site. Each site occupies its own column, making it possible to maintain multiple locations within a single inventory file.

When the Find a Project page loads, it reads the CSV header to populate the site-selection dropdown. Once a site is selected, the application identifies its corresponding column and loads the available quantities into a C# `Dictionary<string, int>`.

This dictionary provides a convenient way to look up the available quantity of a particular supply by name.

### Supply-Based Project Recommendations

The project database stores each project alongside its required supplies and their base quantities per child.

When generating recommendations, the application reads through the project records and checks whether the selected site's inventory can satisfy the requirements for each project.

The required quantity is calculated using the number of children entered by the user:

`Required Quantity = Quantity Per Child × Number of Children`

Projects that meet their supply requirements are added to the Possible Projects list.

This connects the inventory system directly to activity planning, allowing staff to identify projects they can run using materials already available at their site.

### Dynamic Project Requirements

The View All Projects page provides access to the complete project database, regardless of current inventory.

When a user selects a project and enters the number of children participating, the application calculates the corresponding supply requirements. This makes the page useful for planning future activities and estimating what materials need to be ordered.

### Editing and Saving Inventory

The Manage Supplies page uses a Windows Forms `DataGridView` backed by a `DataTable` to display the inventory in an editable format.

When the page loads, the application reads the CSV headers to create the table's columns, then populates its rows with the existing inventory data. Users can edit quantities directly in the grid and save their changes back to the CSV file.

This allowed staff to maintain the inventory through the application instead of manually editing the data file.
## Deployment and Results

I was able to roll out the application at my local Creative ArtReach site, where it could be used as part of the existing supply-management and project-planning workflow.

My original goal was to expand the application to all Creative ArtReach sites. I had plans for a broader rollout, but unfortunately moved out of state before I could reach that stage.

Even so, taking the project from a paper sketch to a working application used at my own site was a meaningful accomplishment. The feedback I received when presenting the project was also very encouraging.

## What I Learned

[To be expanded: lessons from identifying a real workplace problem, translating an idea into software, working with CSV data, designing for actual users, and developing a project beyond a classroom assignment.]

## Technologies

- C#
- Windows Forms
- CSV Data
- Visual Studio
- Git and GitHub

**[View the source code on GitHub](https://github.com/LiviRoseGames/CreativeArtReach_InventoryManagement/tree/main)**