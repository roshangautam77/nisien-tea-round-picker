<!--
  browser: architecture-decision-record
  version: 1.0.0
  updated: 2025-02-05
  contact: Roshan Gautam
  options: commentable
  summary: Documentation for Nisien Tea Round Picker app
-->

# Architecture decision record (ADR)

An architecture decision record (ADR) for The Nisien Tea Round Picker app which helps manage tea and coffee orders in a workplace. Users can add themselves, assign drink preferences, and initiate a tea round to randomly select a tea maker.

Contents:

- [Overview](#overview)
- [Features](#features)
- [Thought Process and Decisions](#thought-process-decisions)
- [API Integration](#api-integration)
- [Future Improvements](#future-improvements)
- [Local Setup](#local-setup)

[Translations into more languages](locales/)

<div class="include" data-path="locales/en/overview">

## Overview

The Tea Round Picker app is designed to fairly assign a tea maker for a team by randomly selecting a participant with an assigned drink order. Users can add themselves, assign a drink preference, and initiate a tea round, ensuring an efficient and fair selection process.

</div>

<div class="include" data-path="locales/en/features">

## Features

  * User Management: Add users dynamically.

  * Drink Assignment: Users can assign a drink (e.g., Tea, Coffee).

  * Random Selection: A fair system to pick a tea maker.

  * Order List View: View assigned drinks per user.
  
  * Optimized Performance: React.memo.

</div>

<div class="include" data-path="locales/en/thought-process-decisions">

## Thought Process & Decisions

### Decision 1: Why Use Bootstrap Instead of Tailwind CSS?
Initially, we considered Tailwind CSS for styling, but due to issues with installation and compatibility on some systems, we decided to use Bootstrap for easier integration, built-in responsiveness, and a robust component library.

### Decision 2: How to Optimize Rendering?
To avoid unnecessary re-renders of components (like <UserList> getting called multiple times), we used:
  * React.memo() to prevent unnecessary UI updates.

### Decision 3: How to Enhance User Experience?
  * We implemented responsive design to ensure the app looks great on various devices.
  * Displayed user-friendly messages with Bootstrap alerts.
  * Included loading indicators to improve feedback during API calls.

</div>

<div class="include" data-path="locales/en/api-integration">

## API Integration

The app integrates with a backend API using Axios (api.js).
  * GET /Users – Fetches the list of users.
  * POST /Users – Adds a new user.
  * GET /DrinkOrder – Fetches assigned drink orders.
  * POST /DrinkOrder – Assigns a drink to a user.
  * POST /DrinkRun – Randomly selects a tea maker.

</div>

<div class="import" data-path="locales/en/future-improvements">

## Future Improvements

  * Admin Controls: Allow manual overrides for tea maker selection.
  * User Preferences: Let users set their drink preferences once instead of reassigning.
  * Edit User: Allow editing user details.
  * Edit Drink Order: Allow editing assigned drinks.
  * Delete Drink Order: Allow deleting assigned drinks.
  * Dark Mode: Add theme support for better accessibility.
  * Pagination: Implement pagination for large user lists.
  * Analytics: Integrate with Google Analytics for insights on user behavior.
  * Virtualization (react-window) for efficiently rendering large lists.

</div>

<div class="import" data-path="locales/en/local-setup">

## Local Setup

  [Clone the project code from github repository (https://github.com/roshangautam77/nisien-tea-round-picker)](https://github.com/roshangautam77/nisien-tea-round-picker). 
  
  In the project directory, run:

### `npm install`

This will install all the required dependencies in local environment.


### `npm start`
This runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

</div>