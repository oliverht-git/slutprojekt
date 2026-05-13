# Code Comments Summary

## Overview
All code files in this Self-Improvement App have been thoroughly commented to explain what each section does.

## script.js - JavaScript Logic Comments Added

### Header Comments
- **File Overview**: Comprehensive header explaining the app's purpose and all main features

### Major Sections Commented
1. **Translations Object**: Explains bilingual UI text (Swedish/English)
2. **DOM Initialization**: DOMContentLoaded event handler with app setup
3. **Sidebar & Navigation**: 
   - `showSidebar()` / `hideSidebar()` - Toggle sidebar visibility
   - `toggleSidebar()` - Collapse/expand sidebar
   - `updateSidebarButtons()` - Show/hide button text based on state
   - `showSection()` - Navigate between app sections

4. **Goals Management**:
   - `addGoal()` - Create new goal
   - `loadGoals()` - Display all goals
   - `toggleGoal()` - Mark goal as complete
   - `editGoal()` - Modify existing goal
   - `deleteGoal()` - Remove goal

5. **Bad Habits Tracking**:
   - `addHabit()` - Add habit to track
   - `loadHabits()` - Display habits with streaks
   - `checkHabit()` - Increment habit streak
   - `editHabit()` - Change habit name
   - `removeHabit()` - Stop tracking habit

6. **Authentication**:
   - `login()` - User login with validation
   - `register()` - New account creation with password validation
   - `logout()` - Clear session and return to login

7. **Preferences & Settings**:
   - `loadPreferences()` - Load user customization settings
   - `applyPreferences()` - Apply theme/font/style to UI
   - `updateSettingsUI()` - Sync dropdown values with stored preferences
   - `getCurrentLanguage()` - Get active language
   - `translateUI()` - Update all text to selected language
   - `savePreferences()` - Store user settings
   - `resetPreferences()` - Restore default settings

8. **Challenges & Goals Generation**:
   - `generateGoal()` - AI-generate goal suggestions by category
   - `addGeneratedGoal()` - Add suggested goal to goals list
   - `joinChallenge()` - Join pre-made challenge
   - `loadChallenges()` - Display active challenges with progress

9. **Achievements & XP**:
   - `addXP()` - Award points to user
   - `checkAchievements()` - Unlock achievements based on progress
   - `loadAchievements()` - Display badges (earned and locked)

10. **Account Management**:
    - `loadAccountInfo()` - Display user profile details
    - `deleteAccount()` - Permanently remove account

11. **Statistics & Overview**:
    - `loadStats()` - Create charts with Chart.js library
    - `updateOverview()` - Update home page statistics display

12. **Notifications**:
    - `scheduleNotifications()` - Set up daily reminder notifications
    - `showNotification()` - Display browser notification

13. **Utility Functions**:
    - `getUserData()` - Retrieve stored user data by key
    - `setUserData()` - Save user data to localStorage
    - `updateUserDisplay()` - Show username and level in header

14. **Daily Reflections**:
    - `saveReflection()` - Save daily reflection with rating
    - `loadReflections()` - Display past reflections
    - `switchReflectionTab()` - Toggle between daily/weekly views
    - `saveWeeklyReflection()` - Save weekly summary
    - `loadWeeklyReflections()` - Display weekly summaries

15. **Programs & Routines**:
    - `showProgramSection()` - Switch between pre-made and custom
    - `joinProgram()` - Start a program
    - `getProgramData()` - Get program details
    - `loadPrograms()` - Display active programs
    - `completeDay()` - Mark program day as complete
    - `addTask()` - Add custom task
    - `removeTask()` - Delete custom task
    - `saveCustomProgram()` - Create new custom program

16. **Strategies**:
    - `loadStrategies()` - Display self-improvement tips

---

## index.html - HTML Structure Comments Added

### Section Comments
- **Header**: App title, sidebar toggle, user info display
- **Sidebar**: Navigation menu with all main sections
- **Main Content Area**: Placeholder for dynamic sections

### Page Sections Documented
1. **Start Screen** - Welcome page with login/register buttons
2. **Login Section** - User authentication form
3. **Register Section** - New account creation form
4. **Home Page** - Dashboard with statistics overview
5. **Goals Section** - Create and track goals
6. **Habits Section** - Track and break bad habits
7. **Challenges Section** - AI generator and pre-made challenges
8. **Daily Section** - Daily and weekly reflections
9. **Study Section** - Study tools (Pomodoro, goals, notes)
10. **Achievements Section** - Earned badges and achievements
11. **Strategies Section** - Self-improvement tips
12. **Programs Section** - Pre-made and custom routines
13. **Statistics Section** - Charts and analytics
14. **Settings Section** - Customization options
15. **Account Section** - User profile and account management

---

## style.css - Styling Comments Added

### CSS Sections Organized
1. **Main Styles & Layout** - Global body and container styles
2. **Header Styles** - Top navigation bar styling
3. **User Info Display** - Profile section styling
4. **Main Layout** - App container and flex layout
5. **Sidebar Navigation** - Left menu styling
6. **Sidebar Toggle Button** - Collapse/expand button
7. **Theme Variations** - Dark and colorful themes
8. **Font Size Variants** - Small, medium, large text options
9. **Card Style Variants** - Soft and minimal card styles

---

## Key Features Explained

### Data Storage
- Uses browser's `localStorage` for persistent data
- User data stored under key `user_{username}`
- Preferences stored under `preferences` key
- Registered users stored under `users` key

### User Systems
- **XP & Levels**: Gain XP by completing goals, habits, and challenges
- **Achievements**: Unlock badges for milestones
- **Streaks**: Track consecutive days of breaking habits
- **Progress Tracking**: Visual progress bars and statistics

### Customization
- **Themes**: Light, Dark, Colorful
- **Font Sizes**: Small, Medium, Large
- **Card Styles**: Standard, Soft, Minimal
- **Languages**: Swedish, English

### Notifications
- Daily reminder at 8 PM (can be customized)
- Browser notifications for achievements
- Challenge/program completion notifications
