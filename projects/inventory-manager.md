# Creative ArtReach Inventory Manager

**C# · Windows Forms · CSV Data · Individual Project**

*A desktop application designed to simplify inventory management and activity planning across Creative ArtReach's educational sites.*

[View the source code on GitHub](https://github.com/LiviRoseGames/CreativeArtReach_InventoryManagement/tree/main)

![Finished Inventory Manager home page]({{ '/assets/images/Inventory-Manager/IM_hp.png' | relative_url }})

## Overview

The Creative ArtReach Inventory Manager started as a sketch on a sheet of printer paper during a break at work. At the time, I was working as the Science and Robotics Enrichment Lead at Creative ArtReach, where I experienced firsthand some of the organizational challenges I wanted to address.

Keeping track of supplies across multiple sites was difficult. Materials could be misplaced or forgotten, supplies were sometimes overstocked or reordered unnecessarily, and planning activities around the materials available at each location took time.

I began thinking about how a small application could bring these processes together and doodled a rough framework during one of my breaks between classes. Eventually that doodle became a working C# Windows Forms application that I introduced at my local Creative ArtReach site.

## **Full Demo Video:**

<div style="max-width: 800px; margin: 1.5rem auto;">
  <video controls width="100%" style="border-radius: 12px;">
    <source src="{{ '/assets/video/Inventory Manager Demo.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video element.
  </video>
</div>

## Table of Contents

- [The Problem](#the-problem)
- [Project Objectives](#project-objectives)
- [From Sketch to Application](#from-sketch-to-application)
- [Application Features](#application-features)
- [Implementation](#implementation)
- [Deployment and Results](#deployment-and-results)
- [What I Learned](#what-i-learned)
- [Technologies](#technologies)

## The Problem

I identified two interconnected areas where the existing workflow could be improved.

**Supply Management**

- Supplies could be misplaced or forgotten.
- Overstocking and unnecessary reordering made inventory management less efficient.
- Tracking quantities across multiple sites was difficult.

**Project Planning**

- Planning activities at the last minute was stressful and inefficient.
- Coming up with new project ideas every day took time.
- Identifying projects that could be completed using the supplies already available at a particular site wasn't always straightforward.

These challenges were closely related. Staff needed to know what materials were available, but they also needed an efficient way to turn that information into practical activity plans.

## Project Objectives

I designed the application around three primary objectives:

1. **Efficient Supply Tracking:** Maintain an organized record of supply quantities across different sites.
2. **Supply-Based Project Recommendations:** Help staff identify activities they could complete using the materials available at their location.
3. **A Reusable Project Database:** Make previously developed activities easier to find, revisit, and incorporate into future lesson plans.

The goal was to bring these workflows together in one application without adding unnecessary steps to the staff's existing routines.

## From Sketch to Application

The first version of this project wasn't designed in an IDE. It started with a pen, regular printer paper, and a rough idea of how the different pages might fit together.

I sketched out the interface and planned how users would navigate between supply management and project planning. Once I had a clearer idea of the overall workflow, I began translating those sketches into a functional Windows Forms application.

![Original hand-drawn sketch of the Inventory Manager home page]({{ '/assets/images/Inventory-Manager/IM_fulldraft.png' | relative_url }})

*My original interface sketch, mapping out the application's main navigation.*

The finished application retained much of the original layout and organization. Although the interface was still a prototype rather than a polished commercial product, it accomplished what I had set out to do: bring several useful workflows together in one place and make my coworkers' (and admittedly, my own) lives a little easier!

---

## Application Features

### Home Page

The home page serves as the application's main navigation screen. Users can access the different inventory and project-planning features or exit the application.

![Original hand-drawn Home Page design]({{ '/assets/images/Inventory-Manager/IM_hp_draft.png' | relative_url }})

*Original Home Page layout.*

![Implemented Home Page]({{ '/assets/images/Inventory-Manager/IM_hp.png' | relative_url }})

*Implemented first page of the application.*

### Manage Supplies

This page allows users to view and update supply quantities across different Creative ArtReach sites.

Inventory information is stored in a CSV file, with a separate column for each site. Users can edit quantities directly in the application and save their changes, keeping the inventory up to date as supplies are used or replenished.

![Manage Supplies page design sketch]({{ '/assets/images/Inventory-Manager/IM_ms_draft.png' | relative_url }})

*Original Manage Supplies layout.*

![Implemented Manage Supplies page]({{ '/assets/images/Inventory-Manager/IM_ms.png' | relative_url }})

*Implemented inventory editor.*

### Find a Project

This page connects inventory management with day-to-day activity planning.

After selecting a site and entering the number of participating children, the application checks the available inventory and displays projects that can be completed using the supplies at that location.

Instead of requiring staff to browse every project and manually compare its requirements against their inventory, this feature automatically narrows down the available options.

![Find a Project page design sketch]({{ '/assets/images/Inventory-Manager/IM_fap_draft.png' | relative_url }})

*Original Find a Project layout.*

![Implemented Find a Project page]({{ '/assets/images/Inventory-Manager/IM_fap.png' | relative_url }})

*Implemented project recommendation interface.*

### View All Projects

This page provides access to the complete project database, regardless of current inventory.

Users can select a project and enter the number of participating children. The application calculates the corresponding supply requirements, making it easier to plan future activities and identify materials that need to be ordered in advance.

Unlike Find a Project, this page doesn't filter projects based on available inventory. It allows staff to explore the full collection of activities and plan beyond what they currently have in stock.

![View All Projects page design sketch]({{ '/assets/images/Inventory-Manager/IM_vap_draft.png' | relative_url }})

*Original View All Projects layout.*

![Implemented View All Projects page]({{ '/assets/images/Inventory-Manager/IM_vap.png' | relative_url }})

*Implemented project database and supply calculator.*

---

## Implementation

I built the application in C# using Windows Forms, with two CSV files serving as the data source for inventory and project information.

Rather than storing supply quantities and project requirements directly in the application code, I separated the data from the interface. This allowed inventory and project information to be maintained independently of the application's functionality.

### CSV Data Structure

I organized the information into two files:

- `supplies.csv` stores supply names and their quantities at each Creative ArtReach site.
- `projects.csv` stores project names and the supplies required to complete each project.

The inventory file uses a separate column for each site, allowing the application to manage multiple locations using the same data structure.

For example, a simplified version of `supplies.csv` might look like this:

| Supply | Site A | Site B | Site C |
|---|---:|---:|---:|
| Construction Paper | 100 | 50 | 25 |
| Glue Sticks | 30 | 12 | 8 |
| Scissors | 15 | 10 | 5 |

Rather than hardcoding site names into the application, I used the first row of the CSV file to populate the site-selection dropdown.

```csharp
string[] lines = File.ReadAllLines(suppliesFilePath);
string[] headers = lines[0].Split(',');

for (int i = 1; i < headers.Length; i++)
{
    combobxSite.Items.Add(headers[i]);
}
```

`File.ReadAllLines()` reads the file into an array of strings, with each line representing a row. I then used `Split(',')` to separate the individual values.

Starting at index `1` skips the `Supply` header, leaving only the site names to populate the dropdown.

This made site selection dynamic: adding another site to the CSV header would make it available in the application without requiring changes to the code.

### Parsing Inventory Data

Once a site is selected, the application needs to retrieve the quantities associated with that location.

I used `Array.IndexOf()` to find the selected site's position in the CSV header. This index could then be used to retrieve the corresponding quantity from each supply row.

```csharp
string[] headers = lines[0].Split(',');
int siteIndex = Array.IndexOf(headers, selectedSite);
```

The application then reads the remaining rows, extracting the supply name and its quantity for the selected site.

```csharp
foreach (var line in lines.Skip(1))
{
    var data = line.Split(',');
    string supplyName = data[0];
    int quantity = int.Parse(data[siteIndex]);

    availableSupplies[supplyName] = quantity;
}
```

I stored the resulting inventory in a `Dictionary<string, int>`, using each supply name as a key and its available quantity as the value.

For example, looking up `availableSupplies["Glue Sticks"]` would return the available quantity of glue sticks at the selected site.

Using a dictionary gave the application a straightforward way to retrieve inventory by supply name without repeatedly searching through the original CSV data.

### Supply-Based Project Recommendations

The next challenge was connecting the inventory data to the separate project requirements file.

When the Find a Project page loads, the application reads the project records and checks each project's requirements against the selected site's available inventory. Projects that meet all their requirements are added to the Possible Projects list.

Each project's supply requirements are stored as quantities per child. The application first calculates the total quantity needed based on the number of participating children:

```csharp
int requiredQuantity = baseQuantity * numberOfKids;
```

It then checks whether the selected site has enough of that supply:

```csharp
if (!availableSupplies.ContainsKey(supplyName) ||
    availableSupplies[supplyName] < requiredQuantity)
{
    return false;
}
```

If a required supply is missing or its available quantity is insufficient, the project is excluded. Otherwise, the application continues checking the remaining requirements.

This connects inventory management directly to activity planning, allowing staff to identify projects they can run using materials already available at their site.

### Dynamic Project Requirements

The View All Projects page provides access to the complete project database, regardless of whether a project can currently be completed with the available inventory.

When a user selects a project and enters the number of participating children, the application calculates the corresponding supply requirements using the same per-child quantity calculation.

Unlike the Find a Project page, this feature doesn't filter projects based on inventory. Instead, it helps staff plan future activities, estimate material requirements, and identify supplies that may need to be ordered.

### Editing and Saving Inventory

The Manage Supplies page uses a Windows Forms `DataGridView` backed by a `DataTable` to display inventory in an editable format.

When the page loads, the application reads the CSV file and uses its headers to define the table's columns. The remaining rows are then added to the `DataTable`, which serves as the data source for the grid.

**Loading CSV Data into the DataGridView**

```csharp
string[] lines = File.ReadAllLines(filePath);
string[] headers = lines[0].Split(',');

foreach (string header in headers)
    suppliesTable.Columns.Add(header);

for (int i = 1; i < lines.Length; i++)
    suppliesTable.Rows.Add(lines[i].Split(','));

dataGridView1.DataSource = suppliesTable;
```

Rather than manually defining the columns and rows in the application, I generated the table structure directly from the CSV file. Assigning the `DataTable` to the `DataGridView.DataSource` property automatically displays the inventory in an editable grid.

**Saving Changes Back to the CSV**

To save inventory updates, I used `StringBuilder` to reconstruct the CSV file from the modified `DataTable`.

```csharp
var sb = new StringBuilder();
var headers = suppliesTable.Columns.Cast<DataColumn>();

sb.AppendLine(string.Join(",", headers.Select(column => column.ColumnName)));

foreach (DataRow row in suppliesTable.Rows)
    sb.AppendLine(string.Join(",", row.ItemArray));

File.WriteAllText(filePath, sb.ToString());
```

The application first retrieves the column names and writes them as the CSV header. It then iterates through each `DataRow`, joining its values into a comma-separated string.

Finally, `File.WriteAllText()` writes the reconstructed data back to the original file, replacing its previous contents with the updated inventory.

This allowed staff to edit supply quantities directly through the application and save their changes without needing to open or manually modify the CSV files.

---

## Deployment and Results

I introduced the application at my local Creative ArtReach site, where it could be incorporated into the existing supply-management and project-planning workflow.

My original goal was to expand the application to all Creative ArtReach sites. I had plans for a broader rollout, but moved out of state before I could reach that stage.

Even so, taking the project from a paper sketch to a working application introduced to its intended users was a meaningful accomplishment. It was especially rewarding to develop a solution to a problem I had experienced firsthand and receive encouraging feedback from the people it was designed to help.

---

## What I Learned

This project gave me experience taking a problem from a real working environment and turning it into a practical software solution.

One of my biggest learning experiences was working with CSV data. I had to figure out how to read, interpret, and manipulate information stored outside the application, then translate it into C# data structures that different parts of the program could use. Connecting inventory and project data also pushed me to think more carefully about how information should be organized, accessed, and shared.

I also gained experience designing an application around the needs of its actual users. Rather than building a complicated management system, I needed to create something straightforward enough for staff to incorporate into their existing routines.

Ultimately, this project helped me see how software development can extend beyond programming exercises and personal projects. I identified a need, designed an interface, worked through the technical challenges, and produced an application with a practical purpose for the people I worked with.

---

## Technologies

- C#
- Windows Forms
- CSV Data
- `DataGridView` and `DataTable`
- `Dictionary<string, int>`
- Visual Studio
- Git and GitHub

[View the source code on GitHub](https://github.com/LiviRoseGames/CreativeArtReach_InventoryManagement/tree/main)