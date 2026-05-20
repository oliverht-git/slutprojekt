/**
 * SELF-IMPROVEMENT APP - JavaScript Logic
 * 
 * This application helps users track and improve their personal development through:
 * - Goal setting and tracking
 * - Breaking bad habits with streak tracking
 * - Taking on challenges
 * - Daily and weekly reflections
 * - Study tools (Pomodoro timer, note-taking)
 * - Achievement system with XP and levels
 * - Customizable settings (theme, language, appearance)
 * 
 * All user data is stored in browser's localStorage
 */

// Current logged-in user (null if not logged in)
let currentUser = null;

// Study timer state
let studyTimerInterval = null;
let studyRemaining = 25 * 60; // seconds
let studyRunning = false;
let studyMode = 'focus'; // 'focus' or 'break'
// Chart instances
let goalsChartInstance = null;
let habitsChartInstance = null;

// Object containing all UI text translations for Swedish (sv) and English (en)
// Each language has keys for all buttons, labels, messages, and content
const translations = {
    sv: {
        appTitle: 'Förbättra vanor',
        homeBtn: '🏠 Start',
        goalsBtn: '🎯 Mål',
        habitsBtn: '🚫 Dåliga vanor',
        challengesBtn: '⚡ Utmaningar',
        dailyBtn: '📝 Dagliga',
        studyBtn: '📖 Plugga',
        strategiesBtn: '💡 Strategier',
        programsBtn: '📚 Scheman',
        achievementsBtn: '🏆 Prestationer',
        statsBtn: '📊 Statistik',
        settingsBtn: '⚙️ Inställningar',
        accountBtn: '👤 Konto',
        startTitle: 'Välkommen till Self-Improvement App',
        startText: 'Förbättra dina vanor och nå dina mål!',
        loginStartBtn: 'Logga in',
        registerStartBtn: 'Skapa konto',
        loginTitle: 'Logga in',
        usernamePlaceholder: 'Användarnamn',
        passwordPlaceholder: 'Lösenord',
        loginBtn: 'Logga in',
        backToStartBtn: 'Tillbaka',
        registerTitle: 'Skapa konto',
        regUsernamePlaceholder: 'Användarnamn',
        regPasswordPlaceholder: 'Lösenord',
        regConfirmPasswordPlaceholder: 'Bekräfta lösenord',
        registerBtn: 'Skapa konto',
        backToStartFromRegBtn: 'Tillbaka',
        homeHeading: 'Välkommen tillbaka!',
        homeText: 'Varje steg räkns litet som stort. Skapa vanor som kan förbättra dig själv. Fortsätt kämpa!',
        overviewTitle: 'Din prestanda',
        goalsHeading: 'Mål & Bra vanor',
        goalInputPlaceholder: 'Enter a goal (t.ex., Träna 3 gånger/vecka)',
        addGoalBtn: 'Skapa mål',
        habitsHeading: 'Bry dåliga vanor',
        habitInputPlaceholder: 'Vanor som ska brytas (t.ex., Sluta röka)',
        addHabitBtn: 'Lägg till vanor som ska brytas',
        challengesHeading: 'Utmaningar',
        aiGoalGeneratorTitle: 'AI mål generator',
        goalCategoryPlaceholder: 'Välj kategori',
        generateGoalBtn: 'Skapa personliga mål',
        addGeneratedGoalBtn: 'Lägg till målen',
        premadeChallengesHeading: 'Färdig gjorda utmaningar',
        joinChallengeBtn: 'Gå med i utmaningen',
        dailyHeading: 'Dagliga',
        dailyTabBtn: '📝 Daglig reflektion',
        weeklyTabBtn: '📅 Veckoreflektion',
        dailyReflectionHeading: 'Hur var din dag?',
        reflectionTextPlaceholder: 'Reflektera över hur din dag var.',
        saveReflectionBtn: 'Spara dina reflektioner',
        weeklyReflectionHeading: 'Hur var din vecka?',
        weeklyReflectionTextPlaceholder: 'Reflektera över hur din vecka var. Vilka höjdpunkter och utmaningar hade du?',
        saveWeeklyReflectionBtn: 'Spara veckoreflektion',
        studyHeading: 'Plugga',
        studyTimerTitle: 'Studietimer',
        startTimerBtn: 'Starta timer',
        pauseTimerBtn: 'Pausa',
        resetTimerBtn: 'Återställ',
        studyGoalsTitle: 'Studiemål',
        studyGoalInputPlaceholder: 'Ange ett studiemål (t.ex., Läs kapitel 5)',
        addStudyGoalBtn: 'Lägg till mål',
        studyNotesTitle: 'Studieanteckningar',
        studyNoteInputPlaceholder: 'Skriv dina studieanteckningar här...',
        saveStudyNoteBtn: 'Spara anteckning',
        studySubjectsTitle: 'Ämnen',
        subjectInputPlaceholder: 'Lägg till ett nytt ämne (t.ex., Matematik)',
        addSubjectBtn: 'Lägg till ämne',
        selectSubjectOption: 'Välj ämne',
        pomodoroTimerTitle: 'Pomodoro Timer',
        focusTimeMode: 'Fokustid',
        breakTimeMode: 'Paus',
        pomodoroMessage: '25 minuter fokus, 5 minuter paus',
        studyRemindersTitle: 'Påminnelser',
        reminderInputPlaceholder: 'Vad behöver du komma ihåg?',
        addReminderBtn: 'Lägg till påminnelse',
        achievementsHeading: 'prestationer & emblem',
        strategiesHeading: 'strategier',
        programsHeading: 'rutiner',
        premadeBtn: 'färdiggjorda rutiner',
        customBtn: 'Skapa egna rutiner',
        customProgramHeading: 'Skapa egna rutiner',
        programNamePlaceholder: 'Program Name',
        programDescriptionPlaceholder: 'Description',
        taskInputPlaceholder: 'Lägg till uppgifter (t.ex., ta ut soporna varje måndag)',
        addTaskBtn: 'Lägg till uppgift',
        saveProgramBtn: 'Spara program',
        statsHeading: 'Statistik',
        settingsHeading: 'Inställningar',
        themeLabel: 'Tema',
        fontSizeLabel: 'Textstorlek',
        cardStyleLabel: 'Boxstil',
        languageLabel: 'Språk',
        saveSettingsBtn: 'Spara inställningar',
        resetSettingsBtn: 'Återställ standard',
        settingsSaved: 'Inställningarna sparade!',
        settingsReset: 'Standardinställningar återställda.',
        accountHeading: 'Konto inställningar',
        accountUsernameLabel: 'Användarnamn:',
        accountLevelLabel: 'Level:',
        accountXPLabel: 'XP:',
        accountCreatedLabel: 'Medlem sedan:',
        logoutBtn: '🚪 Logga ut',
        deleteAccountBtn: '🗑️ Radera konto',
        deleteConfirmText1: '⚠️ Är du säker på att du vill radera ditt konto? Du kan inte ändra dig efter det är gjort!',
        deleteConfirmText2: 'All din data (Mål, vanor, prestationer, etc.) vill försvinna permanent.',
        confirmDeleteBtn: 'Ja, Radera kontot',
        cancelDeleteBtn: 'Avbryt',
        loginErrorEmpty: 'Vänligen ange både användarnamn och lösenord',
        loginErrorInvalid: 'Fel användarnamn eller lösenord',
        registerErrorFields: 'Fyll i alla fält',
        registerErrorMatch: 'Lösenorden matchar inte',
        registerErrorShortPass: 'Lösenordet måste vara minst 4 tecken långt',
        registerErrorUserExists: 'Användarnamnet finns redan',
        registerSuccess: 'Registrering lyckades! Välkommen!',
        loginSuccess: 'Inloggning lyckades! Välkommen tillbaka!',
        welcomeUser: 'Välkommen, {user}!',
        levelDisplay: 'Level {level} - {xp} XP'
    },
    en: {
        appTitle: 'Improve habits',
        levelDisplay: 'Level {level} - {xp} XP',
        homeBtn: '🏠 Home',
        goalsBtn: '🎯 Goals',
        habitsBtn: '🚫 Bad habits',
        challengesBtn: '⚡ Challenges',
        dailyBtn: '📝 Daily',
        studyBtn: '📖 Study',
        strategiesBtn: '💡 Strategies',
        programsBtn: '📚 Plans',
        achievementsBtn: '🏆 Achievements',
        statsBtn: '📊 Stats',
        settingsBtn: '⚙️ Settings',
        accountBtn: '👤 Account',
        startTitle: 'Welcome to the Self-Improvement App',
        startText: 'Improve your habits and reach your goals!',
        loginStartBtn: 'Login',
        registerStartBtn: 'Create account',
        loginTitle: 'Login',
        usernamePlaceholder: 'Username',
        passwordPlaceholder: 'Password',
        loginBtn: 'Login',
        backToStartBtn: 'Back',
        registerTitle: 'Create account',
        regUsernamePlaceholder: 'Username',
        regPasswordPlaceholder: 'Password',
        regConfirmPasswordPlaceholder: 'Confirm password',
        registerBtn: 'Create account',
        backToStartFromRegBtn: 'Back',
        homeHeading: 'Welcome back!',
        homeText: 'Every step matters. Build habits that improve you. Keep going!',
        overviewTitle: 'Your performance',
        goalsHeading: 'Goals & Good habits',
        goalInputPlaceholder: 'Enter a goal (e.g., Work out 3 times/week)',
        addGoalBtn: 'Create goal',
        habitsHeading: 'Break bad habits',
        habitInputPlaceholder: 'Habits to break (e.g., Quit smoking)',
        addHabitBtn: 'Add habits to break',
        challengesHeading: 'Challenges',
        aiGoalGeneratorTitle: 'AI goal generator',
        goalCategoryPlaceholder: 'Choose category',
        generateGoalBtn: 'Create personalized goals',
        addGeneratedGoalBtn: 'Add goals',
        premadeChallengesHeading: 'Pre-made challenges',
        joinChallengeBtn: 'Join challenge',
        dailyHeading: 'Daily',
        dailyTabBtn: '📝 Daily reflection',
        weeklyTabBtn: '📅 Weekly reflection',
        dailyReflectionHeading: 'How was your day?',
        reflectionTextPlaceholder: 'Reflect on how your day went.',
        saveReflectionBtn: 'Save reflections',
        weeklyReflectionHeading: 'How was your week?',
        weeklyReflectionTextPlaceholder: 'Reflect on how your week went. What highlights and challenges did you have?',
        saveWeeklyReflectionBtn: 'Save weekly reflection',
        studyHeading: 'Study',
        studyTimerTitle: 'Study Timer',
        startTimerBtn: 'Start timer',
        pauseTimerBtn: 'Pause',
        resetTimerBtn: 'Reset',
        studyGoalsTitle: 'Study Goals',
        studyGoalInputPlaceholder: 'Enter a study goal (e.g., Read chapter 5)',
        addStudyGoalBtn: 'Add goal',
        studyNotesTitle: 'Study Notes',
        studyNoteInputPlaceholder: 'Write your study notes here...',
        saveStudyNoteBtn: 'Save note',
        studySubjectsTitle: 'Subjects',
        subjectInputPlaceholder: 'Add a new subject (e.g., Mathematics)',
        addSubjectBtn: 'Add subject',
        selectSubjectOption: 'Select subject',
        pomodoroTimerTitle: 'Pomodoro Timer',
        focusTimeMode: 'Focus time',
        breakTimeMode: 'Break',
        pomodoroMessage: '25 minutes focus, 5 minutes break',
        studyRemindersTitle: 'Reminders',
        reminderInputPlaceholder: 'What do you need to remember?',
        addReminderBtn: 'Add reminder',
        achievementsHeading: 'achievements & badges',
        strategiesHeading: 'strategies',
        programsHeading: 'routines',
        premadeBtn: 'pre-made routines',
        customBtn: 'Create your own routines',
        customProgramHeading: 'Create your own routines',
        programNamePlaceholder: 'Program Name',
        programDescriptionPlaceholder: 'Description',
        taskInputPlaceholder: 'Add tasks (e.g., take out trash every Monday)',
        addTaskBtn: 'Add task',
        saveProgramBtn: 'Save program',
        statsHeading: 'Statistics',
        settingsHeading: 'Settings',
        themeLabel: 'Theme',
        fontSizeLabel: 'Text size',
        cardStyleLabel: 'Card style',
        languageLabel: 'Language',
        saveSettingsBtn: 'Save settings',
        resetSettingsBtn: 'Reset defaults',
        settingsSaved: 'Settings saved!',
        settingsReset: 'Default settings restored.',
        accountHeading: 'Account settings',
        accountUsernameLabel: 'Username:',
        accountLevelLabel: 'Level:',
        accountXPLabel: 'XP:',
        accountCreatedLabel: 'Member since:',
        logoutBtn: '🚪 Log out',
        deleteAccountBtn: '🗑️ Delete account',
        deleteConfirmText1: '⚠️ Are you sure you want to delete your account? This cannot be undone!',
        deleteConfirmText2: 'All your data (Goals, habits, achievements, etc.) will be removed permanently.',
        confirmDeleteBtn: 'Yes, delete account',
        cancelDeleteBtn: 'Cancel',
        loginErrorEmpty: 'Please enter both username and password',
        loginErrorInvalid: 'Invalid username or password',
        registerErrorFields: 'Please fill in all fields',
        registerErrorMatch: 'Passwords do not match',
        registerErrorShortPass: 'Password must be at least 4 characters long',
        registerErrorUserExists: 'That username is already taken',
        registerSuccess: 'Registration successful! Welcome!',
        loginSuccess: 'Login successful! Welcome back!',
        welcomeUser: 'Welcome, {user}!'
    }
};

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if a user is already logged in by retrieving from browser storage
    currentUser = localStorage.getItem('currentUser');
    // Load user's saved preferences (theme, language, font size, etc.)
    loadPreferences();
    if (!currentUser) {
        showSection('startscreen');
        hideSidebar();
    } else {
        showSection('home');
        initializeApp();
        showSidebar();
    }

    // Request notification permission
    if ('Notification' in window) {
        Notification.requestPermission();
    }

    // Navigation
    const sections = ['home', 'goals', 'habits', 'challenges', 'daily', 'study', 'strategies', 'programs', 'achievements', 'stats', 'settings'];
    sections.forEach(section => {
        document.getElementById(section + 'Btn').addEventListener('click', () => showSection(section));
    });
    document.getElementById('settingsBtn').addEventListener('click', () => {
        showSection('settings');
        updateSettingsUI();
    });
    document.getElementById('accountBtn').addEventListener('click', () => {
        if (currentUser) {
            showSection('account');
            loadAccountInfo();
        } else {
            showSection('startscreen');
        }
    });

    // Sidebar toggle
    document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);

    // Restore sidebar state
    if (localStorage.getItem('sidebarCollapsed') === 'true') {
        document.getElementById('sidebar').classList.add('collapsed');
        document.getElementById('sidebarToggle').classList.add('collapsed');
        document.getElementById('sidebarToggle').textContent = '▶';
        updateSidebarButtons(true);
    }

    // Startscreen buttons
    document.getElementById('loginStartBtn').addEventListener('click', () => showSection('login'));
    document.getElementById('registerStartBtn').addEventListener('click', () => showSection('register'));

    // Back buttons
    document.getElementById('backToStartBtn').addEventListener('click', () => showSection('startscreen'));
    document.getElementById('backToStartFromRegBtn').addEventListener('click', () => showSection('startscreen'));

    // Login/Register
    document.getElementById('loginBtn').addEventListener('click', login);
    document.getElementById('registerBtn').addEventListener('click', register);
    document.getElementById('saveSettingsBtn').addEventListener('click', savePreferences);
    document.getElementById('resetSettingsBtn').addEventListener('click', resetPreferences);

    // Allow Enter key to login
    document.getElementById('username').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') login();
    });
    document.getElementById('password').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') login();
    });

    // Allow Enter key to register
    document.getElementById('regUsername').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') register();
    });
    document.getElementById('regPassword').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') register();
    });
    document.getElementById('regConfirmPassword').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') register();
    });

    // Goals functionality
    document.getElementById('addGoalBtn').addEventListener('click', addGoal);

    // Habits functionality
    document.getElementById('addHabitBtn').addEventListener('click', addHabit);

    // Challenges functionality
    document.getElementById('generateGoalBtn').addEventListener('click', generateGoal);
    document.getElementById('addGeneratedGoalBtn').addEventListener('click', addGeneratedGoal);
    document.querySelectorAll('.joinChallengeBtn').forEach(btn => {
        btn.addEventListener('click', (e) => joinChallenge(e.target.closest('.challenge').dataset.challenge));
    });

    // Daily check-in
    document.getElementById('saveReflectionBtn').addEventListener('click', saveReflection);
    document.getElementById('saveWeeklyReflectionBtn').addEventListener('click', saveWeeklyReflection);
    
    // Reflection tabs
    document.getElementById('dailyTabBtn').addEventListener('click', () => switchReflectionTab('daily'));
    document.getElementById('weeklyTabBtn').addEventListener('click', () => switchReflectionTab('weekly'));

    // Study functionality
    document.getElementById('startTimerBtn').addEventListener('click', startStudyTimer);
    document.getElementById('pauseTimerBtn').addEventListener('click', pauseStudyTimer);
    document.getElementById('resetTimerBtn').addEventListener('click', resetStudyTimer);
    document.getElementById('addSubjectBtn').addEventListener('click', addSubject);
    document.getElementById('addStudyGoalBtn').addEventListener('click', addStudyGoal);
    document.getElementById('addReminderBtn').addEventListener('click', addReminder);
    document.getElementById('saveStudyNoteBtn').addEventListener('click', saveStudyNote);

    // Programs functionality
    document.getElementById('premadeBtn').addEventListener('click', () => showProgramSection('premade'));
    document.getElementById('customBtn').addEventListener('click', () => showProgramSection('custom'));
    document.getElementById('addTaskBtn').addEventListener('click', addTask);
    document.getElementById('saveProgramBtn').addEventListener('click', saveCustomProgram);

    document.querySelectorAll('.joinProgramBtn').forEach(btn => {
        btn.addEventListener('click', (e) => joinProgram(e.target.closest('.program').dataset.program));
    });

    // Account event listeners
    document.getElementById('logoutBtn').addEventListener('click', logout);
    document.getElementById('deleteAccountBtn').addEventListener('click', () => {
        document.getElementById('deleteConfirm').classList.remove('hidden');
    });
    document.getElementById('confirmDeleteBtn').addEventListener('click', deleteAccount);
    document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
        document.getElementById('deleteConfirm').classList.add('hidden');
    });

    // Request notification permission
    if ('Notification' in window) {
        Notification.requestPermission();
    }
});

// Initialize the app by loading all user data after login
function initializeApp() {
    // Ensure user storage structure exists
    ensureUserData(currentUser);
    // Load all user's goals and display them
    loadGoals();
    // Load all user's bad habits and their streaks
    loadHabits();
    // Load all active challenges the user has joined
    loadChallenges();
    // Load daily and weekly reflections history
    loadReflections();
    // Load earned achievements/badges
    loadAchievements();
    // Load self-improvement strategies
    loadStrategies();
    // Load active programs and routines
    loadPrograms();
    // Update the home page overview with current statistics
    updateOverview();
    // Generate charts and statistics
    loadStats();
    // Update user display with username and level
    updateUserDisplay();
    // Set up scheduled notifications for reminders
    scheduleNotifications();
    // Update home highlights for completed challenges/programs
    loadHomeHighlights();
}

// ==================== SIDEBAR & NAVIGATION ====================

// Show the sidebar navigation menu
function showSidebar() {
    // Add 'visible' class to display the sidebar
    document.getElementById('sidebar').classList.add('visible');
    // Show the sidebar toggle button
    document.getElementById('sidebarToggle').classList.add('visible');
}

// Hide the sidebar navigation menu
function hideSidebar() {
    // Remove 'visible' class to hide the sidebar
    document.getElementById('sidebar').classList.remove('visible');
    // Hide the sidebar toggle button
    document.getElementById('sidebarToggle').classList.remove('visible');
}

// Show a specific section of the app and hide all others
function showSection(section) {
    // Prevent non-logged-in users from accessing protected sections
    if (!currentUser && section !== 'login' && section !== 'startscreen' && section !== 'register') return;
    // Hide all sections by adding the 'hidden' class
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    // Show the requested section by removing the 'hidden' class
    document.getElementById(section).classList.remove('hidden');

    // Update active button styling in sidebar
    const btn = document.getElementById(section + 'Btn');
    if (btn) {
        // Remove active class from all buttons
        document.querySelectorAll('.sidebar button').forEach(btn => btn.classList.remove('active'));
        // Add active class to current button
        btn.classList.add('active');
    }

    // Update account button text based on login status
    if (section === 'account') {
        const t = translations[getCurrentLanguage()] || translations.sv;
        document.getElementById('accountBtn').textContent = currentUser ? t.logoutBtn : t.accountBtn;
    }
}

// Toggle the sidebar between expanded and collapsed states
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');

    // Toggle the 'collapsed' class on the sidebar
    sidebar.classList.toggle('collapsed');
    toggleBtn.classList.toggle('collapsed');

    // Update toggle button text
    if (sidebar.classList.contains('collapsed')) {
        // Sidebar is now collapsed - show expand arrow
        toggleBtn.textContent = '▶';
        // Update sidebar buttons to show only emojis
        updateSidebarButtons(true);
    } else {
        // Sidebar is now expanded - show collapse arrow
        toggleBtn.textContent = '◀';
        // Update sidebar buttons to show full text
        updateSidebarButtons(false);
    }

    // Save sidebar state preference to localStorage
    localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
}

// Update sidebar button display when collapsing/expanding
function updateSidebarButtons(collapsed) {
    // Get all sidebar buttons
    const buttons = document.querySelectorAll('.sidebar button:not(#sidebarToggle)');
    buttons.forEach(button => {
        const buttonId = button.id;
        if (collapsed) {
            // Store original text for later restoration
            button.setAttribute('data-original-text', button.textContent);
            // Show only emoji based on button ID
            switch(buttonId) {
                case 'homeBtn': button.textContent = '🏠'; break;
                case 'goalsBtn': button.textContent = '🎯'; break;
                case 'habitsBtn': button.textContent = '🚫'; break;
                case 'challengesBtn': button.textContent = '⚡'; break;
                case 'dailyBtn': button.textContent = '📝'; break;
                case 'studyBtn': button.textContent = '📖'; break;
                case 'strategiesBtn': button.textContent = '💡'; break;
                case 'programsBtn': button.textContent = '📚'; break;
                case 'achievementsBtn': button.textContent = '🏆'; break;
                case 'statsBtn': button.textContent = '📊'; break;
                case 'settingsBtn': button.textContent = '⚙️'; break;
                case 'accountBtn': button.textContent = '👤'; break;
            }
        } else {
            // Restore original text when expanding
            const originalText = button.getAttribute('data-original-text');
            if (originalText) {
                button.textContent = originalText;
            }
        }
    });
}

function showProgramSection(type) {
    document.querySelectorAll('.programSection').forEach(s => s.classList.add('hidden'));
    document.getElementById(type + 'Programs').classList.remove('hidden');
    document.querySelectorAll('#programTabs button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(type + 'Btn').classList.add('active');
}

// Load user's saved preferences or set defaults if none exist
function loadPreferences() {
    // Get preferences from browser storage, or empty object if not found
    const preferences = JSON.parse(localStorage.getItem('preferences') || '{}');
    // Define default preferences if user hasn't customized them yet
    const defaultPreferences = {
        theme: 'light',           // UI theme: light, dark, or colorful
        fontSize: 'medium',       // Text size: small, medium, or large
        cardStyle: 'standard',    // Card style: standard, soft, or minimal
        language: 'sv'            // Language: Swedish (sv) or English (en)
    };
    // Merge user preferences with defaults
    const settings = { ...defaultPreferences, ...preferences };
    // Apply the preferences to the UI
    applyPreferences(settings);
    // Update settings dropdowns to show current values
    updateSettingsUI(settings);
    // Translate UI to the user's preferred language
    translateUI(settings.language);
    // Return the final settings object
    return settings;
}

// Apply theme, font size, and card style to the UI
function applyPreferences(settings) {
    // Get the body element
    const body = document.body;
    // Remove all previously applied preference classes
    body.classList.remove('theme-light', 'theme-dark', 'theme-colorful', 'font-small', 'font-medium', 'font-large', 'card-standard', 'card-soft', 'card-minimal');
    // Add new classes based on current settings
    body.classList.add(`theme-${settings.theme}`);
    body.classList.add(`font-${settings.fontSize}`);
    body.classList.add(`card-${settings.cardStyle}`);
}

// Update the settings form to show current preferences
function updateSettingsUI(settings) {
    // Get current preferences from storage
    const preferences = settings || JSON.parse(localStorage.getItem('preferences') || '{}');
    // Update each dropdown to show current value
    document.getElementById('themeSelect').value = preferences.theme || 'light';
    document.getElementById('fontSizeSelect').value = preferences.fontSize || 'medium';
    document.getElementById('cardStyleSelect').value = preferences.cardStyle || 'standard';
    document.getElementById('languageSelect').value = preferences.language || 'sv';
}

// Get the user's preferred language
function getCurrentLanguage() {
    // Get preferences from storage
    const preferences = JSON.parse(localStorage.getItem('preferences') || '{}');
    // Return language preference, default to Swedish
    return preferences.language || 'sv';
}

// Translate all UI text to the selected language
function translateUI(language) {
    // Get translation object for the selected language
    const t = translations[language] || translations.sv;
    document.querySelector('header h1').textContent = t.appTitle;
    // Update all navigation buttons
    document.getElementById('homeBtn').textContent = t.homeBtn;
    document.getElementById('goalsBtn').textContent = t.goalsBtn;
    document.getElementById('habitsBtn').textContent = t.habitsBtn;
    document.getElementById('challengesBtn').textContent = t.challengesBtn;
    document.getElementById('dailyBtn').textContent = t.dailyBtn;
    document.getElementById('strategiesBtn').textContent = t.strategiesBtn;
    document.getElementById('programsBtn').textContent = t.programsBtn;
    document.getElementById('achievementsBtn').textContent = t.achievementsBtn;
    document.getElementById('statsBtn').textContent = t.statsBtn;
    document.getElementById('settingsBtn').textContent = t.settingsBtn;
    document.getElementById('accountBtn').textContent = t.accountBtn;

    document.querySelector('#startscreen h2').textContent = t.startTitle;
    document.querySelector('#startscreen p').textContent = t.startText;
    document.getElementById('loginStartBtn').textContent = t.loginStartBtn;
    document.getElementById('registerStartBtn').textContent = t.registerStartBtn;

    document.querySelector('#login h2').textContent = t.loginTitle;
    document.getElementById('username').placeholder = t.usernamePlaceholder;
    document.getElementById('password').placeholder = t.passwordPlaceholder;
    document.getElementById('loginBtn').textContent = t.loginBtn;
    document.getElementById('backToStartBtn').textContent = t.backToStartBtn;

    document.querySelector('#register h2').textContent = t.registerTitle;
    document.getElementById('regUsername').placeholder = t.regUsernamePlaceholder;
    document.getElementById('regPassword').placeholder = t.regPasswordPlaceholder;
    document.getElementById('regConfirmPassword').placeholder = t.regConfirmPasswordPlaceholder;
    document.getElementById('registerBtn').textContent = t.registerBtn;
    document.getElementById('backToStartFromRegBtn').textContent = t.backToStartFromRegBtn;

    document.querySelector('#home h2').textContent = t.homeHeading;
    document.querySelector('#home p').textContent = t.homeText;
    document.querySelector('#overview h3').textContent = t.overviewTitle;

    document.querySelector('#goals h2').textContent = t.goalsHeading;
    document.getElementById('goalInput').placeholder = t.goalInputPlaceholder;
    document.getElementById('addGoalBtn').textContent = t.addGoalBtn;

    document.querySelector('#habits h2').textContent = t.habitsHeading;
    document.getElementById('habitInput').placeholder = t.habitInputPlaceholder;
    document.getElementById('addHabitBtn').textContent = t.addHabitBtn;

    document.querySelector('#challenges h2').textContent = t.challengesHeading;
    document.querySelector('#aiGoalGenerator h3').textContent = t.aiGoalGeneratorTitle;
    document.getElementById('generateGoalBtn').textContent = t.generateGoalBtn;
    document.getElementById('addGeneratedGoalBtn').textContent = t.addGeneratedGoalBtn;
    document.querySelector('#premadeChallenges h3').textContent = t.premadeChallengesHeading;
    document.querySelectorAll('.joinChallengeBtn').forEach(btn => btn.textContent = t.joinChallengeBtn);
    document.querySelector('#goalCategory option[value=""]').textContent = t.goalCategoryPlaceholder;

    document.querySelector('#daily h2').textContent = t.dailyHeading;
    document.getElementById('dailyTabBtn').textContent = t.dailyTabBtn;
    document.getElementById('weeklyTabBtn').textContent = t.weeklyTabBtn;
    document.querySelector('#dailyReflection h3').textContent = t.dailyReflectionHeading;
    document.getElementById('reflectionText').placeholder = t.reflectionTextPlaceholder;
    document.getElementById('saveReflectionBtn').textContent = t.saveReflectionBtn;
    document.querySelector('#weeklyReflection h3').textContent = t.weeklyReflectionHeading;
    document.getElementById('weeklyReflectionText').placeholder = t.weeklyReflectionTextPlaceholder;
    document.getElementById('saveWeeklyReflectionBtn').textContent = t.saveWeeklyReflectionBtn;

    document.querySelector('#study h2').textContent = t.studyHeading;
    document.querySelector('#studyTimer h3').textContent = t.studyTimerTitle;
    document.getElementById('startTimerBtn').textContent = t.startTimerBtn;
    document.getElementById('pauseTimerBtn').textContent = t.pauseTimerBtn;
    document.getElementById('resetTimerBtn').textContent = t.resetTimerBtn;
    document.querySelector('#studyGoals h3').textContent = t.studyGoalsTitle;
    document.getElementById('studyGoalInput').placeholder = t.studyGoalInputPlaceholder;
    document.getElementById('addStudyGoalBtn').textContent = t.addStudyGoalBtn;
    document.querySelector('#studyNotes h3').textContent = t.studyNotesTitle;
    document.getElementById('studyNoteInput').placeholder = t.studyNoteInputPlaceholder;
    document.getElementById('saveStudyNoteBtn').textContent = t.saveStudyNoteBtn;

    document.querySelector('#achievements h2').textContent = t.achievementsHeading;
    document.querySelector('#strategies h2').textContent = t.strategiesHeading;
    document.querySelector('#programs h2').textContent = t.programsHeading;
    document.getElementById('premadeBtn').textContent = t.premadeBtn;
    document.getElementById('customBtn').textContent = t.customBtn;
    document.querySelector('#customProgram h3').textContent = t.customProgramHeading;
    document.getElementById('programName').placeholder = t.programNamePlaceholder;
    document.getElementById('programDescription').placeholder = t.programDescriptionPlaceholder;
    document.getElementById('taskInput').placeholder = t.taskInputPlaceholder;
    document.getElementById('addTaskBtn').textContent = t.addTaskBtn;
    document.getElementById('saveProgramBtn').textContent = t.saveProgramBtn;

    document.querySelector('#stats h2').textContent = t.statsHeading;
    document.querySelector('#settings h2').textContent = t.settingsHeading;
    document.querySelector('label[for="themeSelect"]').textContent = t.themeLabel;
    document.querySelector('label[for="fontSizeSelect"]').textContent = t.fontSizeLabel;
    document.querySelector('label[for="cardStyleSelect"]').textContent = t.cardStyleLabel;
    document.querySelector('label[for="languageSelect"]').textContent = t.languageLabel;
    document.getElementById('saveSettingsBtn').textContent = t.saveSettingsBtn;
    document.getElementById('resetSettingsBtn').textContent = t.resetSettingsBtn;
    document.getElementById('languageSelect').querySelector('option[value="sv"]').textContent = 'Svenska';
    document.getElementById('languageSelect').querySelector('option[value="en"]').textContent = 'English';

    document.querySelector('#account h2').textContent = t.accountHeading;
    const accountLabels = document.querySelectorAll('#accountInfo p strong');
    if (accountLabels.length >= 4) {
        accountLabels[0].textContent = t.accountUsernameLabel;
        accountLabels[1].textContent = t.accountLevelLabel;
        accountLabels[2].textContent = t.accountXPLabel;
        accountLabels[3].textContent = t.accountCreatedLabel;
    }
    document.getElementById('logoutBtn').textContent = t.logoutBtn;
    document.getElementById('deleteAccountBtn').textContent = t.deleteAccountBtn;
    document.querySelector('#deleteConfirm p:nth-child(1)').textContent = t.deleteConfirmText1;
    document.querySelector('#deleteConfirm p:nth-child(2)').textContent = t.deleteConfirmText2;
    document.getElementById('confirmDeleteBtn').textContent = t.confirmDeleteBtn;
    document.getElementById('cancelDeleteBtn').textContent = t.cancelDeleteBtn;
    if (document.getElementById('sidebar').classList.contains('collapsed')) {
        // Update collapsed sidebar buttons to show only emojis
        updateSidebarButtons(true);
    }
}

// Save user's preferences to storage
function savePreferences() {
    // Get current values from settings dropdowns
    const settings = {
        theme: document.getElementById('themeSelect').value,
        fontSize: document.getElementById('fontSizeSelect').value,
        cardStyle: document.getElementById('cardStyleSelect').value,
        language: document.getElementById('languageSelect').value
    };
    // Save to localStorage
    localStorage.setItem('preferences', JSON.stringify(settings));
    // Apply the preferences immediately
    applyPreferences(settings);
    // Update UI to reflect new language
    translateUI(settings.language);
    // Update sidebar buttons if collapsed
    if (document.getElementById('sidebar').classList.contains('collapsed')) {
        updateSidebarButtons(true);
    }
    // Show success message
    const t = translations[settings.language] || translations.sv;
    document.getElementById('settingsMessage').textContent = t.settingsSaved;
    document.getElementById('settingsMessage').style.color = '#2f855a';
}

// Reset preferences to defaults
function resetPreferences() {
    // Remove preferences from storage
    localStorage.removeItem('preferences');
    // Reload with defaults
    const settings = loadPreferences();
    // Show reset message
    const t = translations[settings.language] || translations.sv;
    document.getElementById('settingsMessage').textContent = t.settingsReset;
    document.getElementById('settingsMessage').style.color = '#2c5282';
}

// ==================== USER AUTHENTICATION ====================

// Handle user login
function login() {
    // Get username and password from login form
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Get translated messages for current language
    const t = translations[getCurrentLanguage()] || translations.sv;
    
    // Validate that both fields are filled
    if (!username || !password) {
        document.getElementById('loginMessage').textContent = t.loginErrorEmpty;
        document.getElementById('loginMessage').style.color = '#e53e3e';
        return;
    }

    // Get all registered users from storage
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    // Check if user exists and password matches
    if (users[username] && users[username].password === password) {
        // Set current user
        currentUser = username;
        // Save to storage
        localStorage.setItem('currentUser', currentUser);
        // Ensure user data exists (for new users)
        ensureUserData(currentUser);
        // Navigate to home and initialize app
        showSection('home');
        initializeApp();
        // Show sidebar and user info
        showSidebar();
        // Show success message
        document.getElementById('loginMessage').textContent = t.loginSuccess;
        document.getElementById('loginMessage').style.color = '#48bb78';
        // Clear form fields
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    } else {
        // Show error for invalid credentials
        document.getElementById('loginMessage').textContent = t.loginErrorInvalid;
        document.getElementById('loginMessage').style.color = '#e53e3e';
    }
}

// Handle user registration
function register() {
    // Get registration form values
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    // Get translated messages
    const t = translations[getCurrentLanguage()] || translations.sv;
    
    // Validate all fields are filled
    if (!username || !password || !confirmPassword) {
        document.getElementById('registerMessage').textContent = t.registerErrorFields;
        document.getElementById('registerMessage').style.color = '#e53e3e';
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        document.getElementById('registerMessage').textContent = t.registerErrorMatch;
        document.getElementById('registerMessage').style.color = '#e53e3e';
        return;
    }

    // Check password length requirement
    if (password.length < 4) {
        document.getElementById('registerMessage').textContent = t.registerErrorShortPass;
        document.getElementById('registerMessage').style.color = '#e53e3e';
        return;
    }

    // Get all existing users
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    // Check if username already exists
    if (users[username]) {
        document.getElementById('registerMessage').textContent = t.registerErrorUserExists;
        document.getElementById('registerMessage').style.color = '#e53e3e';
    } else {
        // Create new user account with password and creation date
        users[username] = { password, created: new Date().toISOString() };
        localStorage.setItem('users', JSON.stringify(users));
        // Log in the newly registered user
        currentUser = username;
        localStorage.setItem('currentUser', currentUser);
        // Ensure user storage defaults exist
        ensureUserData(currentUser);
        showSection('home');
        initializeApp();
        showSidebar();
        document.getElementById('registerMessage').textContent = t.registerSuccess;
        document.getElementById('registerMessage').style.color = '#48bb78';
        // Clear form fields
        document.getElementById('regUsername').value = '';
        document.getElementById('regPassword').value = '';
        document.getElementById('regConfirmPassword').value = '';
    }
}

// Log out the current user
function logout() {
    // Clear current user
    currentUser = null;
    // Remove from storage
    localStorage.removeItem('currentUser');
    // Hide user info display
    document.getElementById('userInfo').classList.add('hidden');
    document.getElementById('userDisplay').textContent = '';
    // Return to login screen
    showSection('login');
    hideSidebar();
}

function loadAccountInfo() {
    if (!currentUser) return;

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const userData = users[currentUser];
    const xp = getUserData('xp', 0);
    const level = Math.floor(xp / 100) + 1;

    document.getElementById('accountUsername').textContent = currentUser;
    document.getElementById('accountLevel').textContent = level;
    document.getElementById('accountXP').textContent = xp;

    if (userData && userData.created) {
        const createdDate = new Date(userData.created).toLocaleDateString();
        document.getElementById('accountCreated').textContent = createdDate;
    } else {
        document.getElementById('accountCreated').textContent = 'Unknown';
    }
}

function deleteAccount() {
    if (!currentUser) return;

    // Remove user data
    localStorage.removeItem(`user_${currentUser}`);

    // Remove user from users list
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    delete users[currentUser];
    localStorage.setItem('users', JSON.stringify(users));

    // Clear current user
    localStorage.removeItem('currentUser');
    currentUser = null;

    // Clear user display
    document.getElementById('userInfo').classList.add('hidden');
    document.getElementById('userDisplay').textContent = '';

    // Hide confirmation and show login
    document.getElementById('deleteConfirm').classList.add('hidden');
    showSection('login');
    hideSidebar();
}

// ==================== GOALS SECTION ====================

// Add a new goal to the user's goal list
function addGoal() {
    // Get the goal text from the input field
    const input = document.getElementById('goalInput');
    const goal = input.value.trim();
    if (goal) {
        // Retrieve existing goals from storage
        const goals = getUserData('goals', []);
        // Add new goal object with text, completed status, and creation date
        goals.push({ text: goal, completed: false, created: new Date().toISOString() });
        // Save updated goals to storage
        setUserData('goals', goals);
        // Clear the input field
        input.value = '';
        // Refresh the goals display
        loadGoals();
        // Update home page statistics
        updateOverview();
        // Update stats charts
        loadStats();
    }
}

// Load and display all user goals with complete/edit/delete buttons
function loadGoals() {
    // Get the goals list container and empty state element
    const goalsList = document.getElementById('goalsList');
    const goalsEmpty = document.getElementById('goalsEmpty');
    // Clear the list before reloading
    goalsList.innerHTML = '';
    // Retrieve all user goals from storage
    const goals = getUserData('goals', []);
    // Show empty state message if user has no goals
    if (goals.length === 0) {
        goalsEmpty.classList.remove('hidden');
    } else {
        goalsEmpty.classList.add('hidden');
        // Display each goal with checkbox, edit, and delete buttons
        goals.forEach((goal, index) => {
            const div = document.createElement('div');
            div.className = 'goal' + (goal.completed ? ' completed' : '');
            div.innerHTML = `
                <label>
                    <input type="checkbox" ${goal.completed ? 'checked' : ''} onchange="toggleGoal(${index})">
                    ${goal.text}
                </label>
                <div>
                    <button onclick="editGoal(${index})">Edit</button>
                    <button onclick="deleteGoal(${index})">Delete</button>
                </div>
            `;
            goalsList.appendChild(div);
        });
    }
}

// Toggle goal completion status
function toggleGoal(index) {
    // Get all goals from storage
    const goals = getUserData('goals', []);
    // Toggle the completed status of the goal at the given index
    goals[index].completed = !goals[index].completed;
    // Save the updated goal status
    setUserData('goals', goals);
    // Refresh the goals display
    loadGoals();
    // Update overview statistics
    updateOverview();
    // Update statistics charts
    loadStats();
    // Award XP points if goal is completed
    if (goals[index].completed) {
        addXP(20);
    }
}

// Edit an existing goal text
function editGoal(index) {
    // Get all goals from storage
    const goals = getUserData('goals', []);
    // Prompt user to edit the goal text
    const newText = prompt('Edit goal:', goals[index].text);
    // Update the goal if user didn't cancel and entered text
    if (newText && newText.trim()) {
        goals[index].text = newText.trim();
        setUserData('goals', goals);
        loadGoals();
    }
}

// Delete a goal from the user's list
function deleteGoal(index) {
    // Get all goals from storage
    const goals = getUserData('goals', []);
    // Remove the goal at the specified index
    goals.splice(index, 1);
    // Save the updated goals list
    setUserData('goals', goals);
    // Refresh the goals display
    loadGoals();
    // Update statistics
    updateOverview();
    loadStats();
}

// ==================== BAD HABITS SECTION ====================

// Add a new bad habit to track and break
function addHabit() {
    const input = document.getElementById('habitInput');
    const habit = input.value.trim();
    if (habit) {
        const habits = getUserData('habits', []);
        habits.push({ name: habit, startDate: new Date().toISOString(), streak: 0, lastChecked: null });
        setUserData('habits', habits);
        input.value = '';
        loadHabits();
        updateOverview();
        loadStats();
    }
}

function loadHabits() {
    const habitsList = document.getElementById('habitsList');
    const habitsEmpty = document.getElementById('habitsEmpty');
    habitsList.innerHTML = '';
    const habits = getUserData('habits', []);
    if (habits.length === 0) {
        habitsEmpty.classList.remove('hidden');
    } else {
        habitsEmpty.classList.add('hidden');
        habits.forEach((habit, index) => {
            const div = document.createElement('div');
            div.className = 'habit';
            const days = Math.floor((new Date() - new Date(habit.startDate)) / (1000 * 60 * 60 * 24));
            div.innerHTML = `
                <span>${habit.name} - Streak: ${habit.streak} days</span>
                <div>
                    <button onclick="checkHabit(${index})">Check Today</button>
                    <button onclick="editHabit(${index})">Edit</button>
                    <button onclick="removeHabit(${index})">Remove</button>
                </div>
            `;
            habitsList.appendChild(div);
        });
    }
}

// Mark a bad habit as checked for today to increment the streak
function checkHabit(index) {
    // Get all habits from storage
    const habits = getUserData('habits', []);
    // Get today's date as a string
    const today = new Date().toDateString();
    // Only increment streak if habit wasn't already checked today
    if (habits[index].lastChecked !== today) {
        // Increase the streak counter
        habits[index].streak++;
        // Update the last check date
        habits[index].lastChecked = today;
        // Save changes to storage
        setUserData('habits', habits);
        // Refresh display
        loadHabits();
        updateOverview();
        loadStats();
        // Award XP points for breaking the habit
        addXP(10);
    }
}

// Edit a habit name
function editHabit(index) {
    // Get all habits
    const habits = getUserData('habits', []);
    // Prompt user to enter new habit name
    const newName = prompt('Edit habit:', habits[index].name);
    // Update if user provided new text
    if (newName && newName.trim()) {
        habits[index].name = newName.trim();
        setUserData('habits', habits);
        loadHabits();
    }
}

// Remove a habit from tracking
function removeHabit(index) {
    // Get all habits
    const habits = getUserData('habits', []);
    // Remove the habit at the specified index
    habits.splice(index, 1);
    // Save changes
    setUserData('habits', habits);
    // Refresh display and statistics
    loadHabits();
    updateOverview();
    loadStats();
}

// ==================== STRATEGIES SECTION ====================

// Load and display self-improvement strategies
function loadStrategies() {
    const strategies = [
        { title: 'Sätt mål som följer SMMRT principen', description: 'skapa mål som är Specifika, Mätbara, möjliga, Relevanta, och Tidsbundna.' },
        { title: 'träna medvetenhet', description: 'ta tid varje dag att vara närvarande och medveten om dina tankar och känslor.' },
        { title: 'Bygg vana gradvis', description: 'börja litet och bygg upp till större ändringar för att göra dem hållbara.' },
        { title: 'Spåra din framsteg', description: 'använd en journal eller använd appar för att övervaka dina förbättringar.' },
        { title: 'Sök ansvarlighet', description: 'dela dina mål med andra för att få motivation.' },
        { title: 'Lär dig kontinuerligt', description: 'läs böcker, ta kurser, eller lyssna på poddcaster om självförbättring.' }
    ];
    const strategiesList = document.getElementById('strategiesList');
    strategies.forEach(strategy => {
        const div = document.createElement('div');
        div.className = 'strategy';
        div.innerHTML = `<h4>${strategy.title}</h4><p>${strategy.description}</p>`;
        strategiesList.appendChild(div);
    });
}

// ==================== PROGRAMS/ROUTINES SECTION ====================

// Join an existing program/routine
function joinProgram(programName) {
    const programs = getUserData('activePrograms', []);
    if (!programs.find(p => p.name === programName)) {
        const programData = getProgramData(programName);
        programs.push({ ...programData, startDate: new Date().toISOString(), progress: 0 });
        setUserData('activePrograms', programs);
        loadPrograms();
        updateOverview();
        loadStats();
    }
}

function getProgramData(name) {
    const programs = {
        exercise: { name: '30-Day Exercise Challenge', duration: 30, tasks: ['Exercise for 30 minutes'] },
        reading: { name: 'Reading Habit Builder', duration: 30, tasks: ['Read for 30 minutes'] },
        meditation: { name: 'Mindfulness Meditation', duration: 30, tasks: ['Meditate for 10 minutes'] }
    };
    return programs[name];
}

function addTask() {
    const input = document.getElementById('taskInput');
    const task = input.value.trim();
    if (task) {
        const li = document.createElement('li');
        li.innerHTML = `${task} <button onclick="removeTask(this)">Remove</button>`;
        document.getElementById('taskList').appendChild(li);
        input.value = '';
    }
}

function removeTask(button) {
    button.parentElement.remove();
}

function saveCustomProgram() {
    const name = document.getElementById('programName').value.trim();
    const description = document.getElementById('programDescription').value.trim();
    const tasks = Array.from(document.querySelectorAll('#taskList li')).map(li => li.textContent.replace('Remove', '').trim());
    if (name && tasks.length > 0) {
        const programs = getUserData('activePrograms', []);
        programs.push({ name, description, duration: tasks.length, tasks, startDate: new Date().toISOString(), progress: 0 });
        setUserData('activePrograms', programs);
        // Reset form
        document.getElementById('programName').value = '';
        document.getElementById('programDescription').value = '';
        document.getElementById('taskList').innerHTML = '';
        loadPrograms();
        updateOverview();
        loadStats();
    }
}

function loadPrograms() {
    const activeProgramsDiv = document.getElementById('activePrograms');
    activeProgramsDiv.innerHTML = '<h3>Your Active Programs</h3>';
    const programs = getUserData('activePrograms', []);
    programs.forEach((program, index) => {
        const div = document.createElement('div');
        div.className = 'activeProgram';
        // Use stored progress if available, otherwise calculate from time
        const progress = program.progress !== undefined ? program.progress : Math.floor((new Date() - new Date(program.startDate)) / (1000 * 60 * 60 * 24)) + 1;
        div.innerHTML = `
            <h4>${program.name}</h4>
            <p>${program.description || ''}</p>
            <div class="progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(progress / program.duration) * 100}%"></div>
                </div>
                <span>${progress}/${program.duration} days</span>
            </div>
            <button onclick="completeDay(${index})">Mark Day Complete</button>
        `;
        activeProgramsDiv.appendChild(div);
    });
}

function completeDay(index) {
    const programs = getUserData('activePrograms', []);
    if (!programs[index]) return;
    if (programs[index].progress < programs[index].duration) {
        programs[index].progress++;
        const program = programs[index];
        const programName = program.name;
        if (program.progress === program.duration) {
            const completed = getUserData('completedPrograms', []);
            completed.push({
                ...program,
                completedDate: new Date().toISOString()
            });
            setUserData('completedPrograms', completed);
            programs.splice(index, 1);
            showNotification(`Program Completed: ${programName}!`);
        }
        setUserData('activePrograms', programs);
        loadPrograms();
        updateOverview();
        loadStats();
    }
}

// ==================== STATISTICS SECTION ====================

// Load and display statistics using Chart.js
function loadStats() {
    const goals = getUserData('goals', []);
    const habits = getUserData('habits', []);
    const programs = getUserData('activePrograms', []);

    // Goals chart
    const goalsCtx = document.getElementById('goalsChart').getContext('2d');
    if (goalsChartInstance) goalsChartInstance.destroy();
    goalsChartInstance = new Chart(goalsCtx, {
        type: 'pie',
        data: {
            labels: ['Completed', 'Pending'],
            datasets: [{
                data: [goals.filter(g => g.completed).length, goals.filter(g => !g.completed).length],
                backgroundColor: ['#4CAF50', '#FFC107']
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Goals Progress'
            }
        }
    });

    // Habits chart
    const habitsCtx = document.getElementById('habitsChart').getContext('2d');
    if (habitsChartInstance) habitsChartInstance.destroy();
    habitsChartInstance = new Chart(habitsCtx, {
        type: 'bar',
        data: {
            labels: habits.map(h => h.name),
            datasets: [{
                label: 'Streak (days)',
                data: habits.map(h => h.streak),
                backgroundColor: '#2196F3'
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Habit Streaks'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// ==================== NOTIFICATIONS ====================

// Schedule daily reminder notifications for the user
function scheduleNotifications() {
    // Only schedule if notifications are supported and permitted
    if ('Notification' in window && Notification.permission === 'granted') {
        // Get current time
        const now = new Date();
        // Set reminder time to 8 PM (20:00)
        const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0, 0);
        // If 8 PM already passed today, schedule for tomorrow
        if (reminderTime < now) {
            reminderTime.setDate(reminderTime.getDate() + 1);
        }
        // Calculate milliseconds until next reminder
        const timeUntilReminder = reminderTime - now;
        // Schedule the first notification
        setTimeout(() => {
            // Show the notification
            showNotification('Don\'t forget your goals today!');
            // Schedule repeat daily (24 hours = 86400000 milliseconds)
            setInterval(() => showNotification('Don\'t forget your goals today!'), 24 * 60 * 60 * 1000);
        }, timeUntilReminder);
    }
}

// Show a browser notification to the user
function showNotification(message) {
    // Only show if notifications are supported and permitted
    if ('Notification' in window && Notification.permission === 'granted') {
        // Create and display the notification
        new Notification('Self-Improvement Hub', {
            body: message,
            icon: '/favicon.ico' // Add app icon if available
        });
    }
}

// ==================== UTILITY FUNCTIONS ====================

// Get user data from browser storage using a key
function getUserData(key, defaultValue) {
    // Retrieve all user data as JSON object
    const userData = JSON.parse(localStorage.getItem(`user_${currentUser}`) || '{}');
    // Return the value for the key, or default if not found
    return userData[key] || defaultValue;
}

// Save user data to browser storage
function setUserData(key, value) {
    // Retrieve all existing user data
    const userData = JSON.parse(localStorage.getItem(`user_${currentUser}`) || '{}');
    // Update with new value
    userData[key] = value;
    // Save back to storage
    localStorage.setItem(`user_${currentUser}`, JSON.stringify(userData));
}

// Update user's display with name and level info
function updateUserDisplay() {
    // Get current language for translations
    const lang = getCurrentLanguage();
    const t = translations[lang] || translations.sv;
    
    // Hide user info if not logged in
    if (!currentUser) {
        document.getElementById('userInfo').classList.add('hidden');
        document.getElementById('userDisplay').textContent = '';
        return;
    }
    
    // Show user info display
    document.getElementById('userInfo').classList.remove('hidden');
    // Display welcome message with username
    document.getElementById('userDisplay').textContent = t.welcomeUser.replace('{user}', currentUser);
    
    // Get user's XP and calculate level
    const xp = getUserData('xp', 0);
    const level = Math.floor(xp / 100) + 1;
    // Display level and XP
    document.getElementById('levelDisplay').textContent = t.levelDisplay
        ? t.levelDisplay.replace('{level}', level).replace('{xp}', xp)
        : `Level ${level} - ${xp} XP`;
}

// ==================== ACHIEVEMENTS & XP ====================

// Add XP points to the user's total
function addXP(points) {
    // Get current XP from storage
    const currentXP = getUserData('xp', 0);
    // Add new points
    setUserData('xp', currentXP + points);
    // Update the user display with new level/XP
    updateUserDisplay();
    // Check if user earned any new achievements
    checkAchievements();
}

// Check and unlock achievements based on user progress
function checkAchievements() {
    // Get list of achievements user has unlocked
    const achievements = getUserData('achievements', []);
    // Get user's current data
    const goals = getUserData('goals', []);
    const habits = getUserData('habits', []);
    const xp = getUserData('xp', 0);

    // Achievement: First Goal - unlock when user creates their first goal
    if (goals.length >= 1 && !achievements.includes('firstGoal')) {
        achievements.push('firstGoal');
        addXP(50);
        showNotification('Achievement Unlocked: First Goal!');
    }

    // Achievement: Goal Master - unlock when user completes 5 goals
    const completedGoals = goals.filter(g => g.completed).length;
    if (completedGoals >= 5 && !achievements.includes('goalMaster')) {
        achievements.push('goalMaster');
        addXP(100);
        showNotification('Achievement Unlocked: Goal Master!');
    }

    // Achievement: Habit Breaker - unlock when 3 habits have 7+ day streaks
    const longStreaks = habits.filter(h => h.streak >= 7).length;
    if (longStreaks >= 3 && !achievements.includes('habitBreaker')) {
        achievements.push('habitBreaker');
        addXP(150);
        showNotification('Achievement Unlocked: Habit Breaker!');
    }

    // Level badges - unlock a badge for each level reached
    const level = Math.floor(xp / 100) + 1;
    for (let i = 1; i <= level; i++) {
        if (!achievements.includes(`level${i}`)) {
            achievements.push(`level${i}`);
        }
    }

    // Save achievements to storage
    setUserData('achievements', achievements);
    // Refresh achievements display
    loadAchievements();
}

// ==================== CHALLENGES ====================

// Generate AI-suggested goal based on category selected
function generateGoal() {
    // Get the selected goal category
    const category = document.getElementById('goalCategory').value;
    if (!category) return;

    // Define goal templates for each category
    const goalTemplates = {
        health: [
            "Exercise for 30 minutes, 4 times per week",
            "Drink 8 glasses of water daily",
            "Eat at least 5 servings of vegetables per day",
            "Get 7-8 hours of sleep every night",
            "Practice yoga or meditation for 10 minutes daily"
        ],
        productivity: [
            "Complete the most important task first each morning",
            "Limit social media to 1 hour per day",
            "Use a planner to organize daily tasks",
            "Take regular breaks using the Pomodoro technique",
            "Review and plan the next day before bed"
        ],
        learning: [
            "Read 20 pages of a non-fiction book daily",
            "Learn one new word per day",
            "Take an online course for 30 minutes daily",
            "Practice a new skill for 1 hour per week",
            "Teach someone something new each week"
        ],
        relationships: [
            "Call a family member or friend daily",
            "Practice active listening in conversations",
            "Express gratitude to someone each day",
            "Plan a date night or quality time weekly",
            "Write a handwritten note to someone monthly"
        ],
        finance: [
            "Save 10% of income automatically",
            "Track all expenses for a month",
            "Create and follow a monthly budget",
            "Pay off one credit card debt",
            "Learn about investing basics"
        ]
    };

    // Pick a random goal from the templates for selected category
    const templates = goalTemplates[category];
    const randomGoal = templates[Math.floor(Math.random() * templates.length)];
    // Display the generated goal
    document.getElementById('generatedGoal').textContent = randomGoal;
    // Show the button to add this goal
    document.getElementById('addGeneratedGoalBtn').classList.remove('hidden');
}

// Add the AI-generated goal to user's goal list
function addGeneratedGoal() {
    // Get the generated goal text
    const goalText = document.getElementById('generatedGoal').textContent;
    if (goalText) {
        // Retrieve goals from storage
        const goals = getUserData('goals', []);
        // Add the generated goal to the list
        goals.push({ text: goalText, completed: false, created: new Date().toISOString() });
        // Save goals
        setUserData('goals', goals);
        // Clear the generated goal display
        document.getElementById('generatedGoal').textContent = '';
        // Hide the add button
        document.getElementById('addGeneratedGoalBtn').classList.add('hidden');
        // Refresh display and award XP
        loadGoals();
        updateOverview();
        loadStats();
        addXP(10);
    }
}

// Join a pre-made challenge
function joinChallenge(challengeName) {
    // Get active challenges from storage
    const challenges = getUserData('activeChallenges', []);
    // Check if user hasn't already joined this challenge
    if (!challenges.find(c => c.name === challengeName)) {
        // Get challenge data
        const challengeData = getChallengeData(challengeName);
        // Add challenge with current date and progress
        challenges.push({ ...challengeData, startDate: new Date().toISOString(), progress: 0 });
        // Save challenges
        setUserData('activeChallenges', challenges);
        // Refresh display and award XP
        loadChallenges();
        updateOverview();
        addXP(25);
    }
}

function getChallengeData(name) {
    const challenges = {
        noSugar: { name: '30 Days No Sugar', duration: 30, description: 'Eliminate all added sugars' },
        earlyBird: { name: 'Early Bird Challenge', duration: 21, description: 'Wake up at 6 AM every day' },
        gratitude: { name: 'Gratitude Journal', duration: 30, description: 'Write 3 things you\'re grateful for daily' }
        ,earlysleep: { name: 'Earlier Evenings', duration: 21, description: 'Reduce screen time before bed and go to sleep earlier' }
    };
    return challenges[name];
}

function loadChallenges() {
    const activeChallengesDiv = document.getElementById('activeChallenges');
    activeChallengesDiv.innerHTML = '<h3>Your Active Challenges</h3>';
    const challenges = getUserData('activeChallenges', []);
    challenges.forEach((challenge, index) => {
        const div = document.createElement('div');
        div.className = 'activeProgram';
        // Use stored progress if available, otherwise calculate from time
        const progress = challenge.progress !== undefined ? challenge.progress : Math.floor((new Date() - new Date(challenge.startDate)) / (1000 * 60 * 60 * 24)) + 1;
        div.innerHTML = `
            <h4>${challenge.name}</h4>
            <p>${challenge.description}</p>
            <div class="progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(progress / challenge.duration) * 100}%"></div>
                </div>
                <span>${progress}/${challenge.duration} days</span>
            </div>
            <button onclick="completeChallengeDay(${index})">Mark Day Complete</button>
            <button onclick="endChallenge(${index})" style="margin-left:8px;background:#e53e3e;color:#fff;border:none;padding:6px 8px;border-radius:4px;">Avsluta utmaning</button>
        `;
        activeChallengesDiv.appendChild(div);
    });
}

// End (leave) an active challenge early. Awards partial XP based on progress and
// moves the challenge to `completedChallenges` with an `endedEarly` flag.
function endChallenge(index) {
    const challenges = getUserData('activeChallenges', []);
    if (!challenges[index]) return;

    const challenge = challenges[index];
    const days = Math.floor((new Date() - new Date(challenge.startDate)) / (1000 * 60 * 60 * 24)) + 1;
    const progress = Math.min(days, challenge.duration);

    // Confirm with the user before ending early
    const lang = getCurrentLanguage();
    const confirmText = lang === 'sv'
        ? `Vill du avsluta utmaningen "${challenge.name}" tidigt? Framsteg: ${progress}/${challenge.duration} dagar.`
        : `End challenge "${challenge.name}" early? Progress: ${progress}/${challenge.duration} days.`;
    if (!confirm(confirmText)) return;

    // Remove from active list
    challenges.splice(index, 1);
    setUserData('activeChallenges', challenges);

    // Save into completedChallenges with endedEarly flag
    const completed = getUserData('completedChallenges', []);
    completed.push({
        name: challenge.name,
        description: challenge.description,
        duration: challenge.duration,
        progress: progress,
        startDate: challenge.startDate,
        endDate: new Date().toISOString(),
        endedEarly: true
    });
    setUserData('completedChallenges', completed);

    loadChallenges();
    updateOverview();
    showNotification(`${challenge.name} avslutad.`);
}

function completeChallengeDay(index) {
    const challenges = getUserData('activeChallenges', []);
    if (!challenges[index]) return;
    if (challenges[index].progress < challenges[index].duration) {
        challenges[index].progress++;
        const challenge = challenges[index];
        const challengeName = challenge.name;
        if (challenge.progress === challenge.duration) {
            // Store finished challenge so home can mark it as complete
            const completed = getUserData('completedChallenges', []);
            completed.push({
                ...challenge,
                completedDate: new Date().toISOString(),
                endedEarly: false
            });
            setUserData('completedChallenges', completed);
            challenges.splice(index, 1);
            showNotification(`Challenge Completed: ${challengeName}!`);
        }
        setUserData('activeChallenges', challenges);
        loadChallenges();
        updateOverview();
    }
}

// ==================== DAILY REFLECTIONS ====================

// Save daily reflection with rating and challenges faced
function saveReflection() {
    // Get reflection text from textarea
    const reflection = document.getElementById('reflectionText').value;
    // Get day rating (1-10)
    const rating = document.getElementById('dayRating').value;
    // Check if user worked on goals today
    const goalsWorked = document.getElementById('goalsWorked').checked;
    // Get challenges faced during the day
    const challenges = document.getElementById('challengesFaced').value;

    // Save only if reflection text is not empty
    if (reflection.trim()) {
        // Get existing reflections from storage
        const reflections = getUserData('reflections', []);
        // Add new reflection with timestamp
        reflections.push({
            date: new Date().toISOString(),
            text: reflection,
            rating: rating,
            goalsWorked: goalsWorked,
            challenges: challenges
        });
        setUserData('reflections', reflections);
        // Reset form
        document.getElementById('reflectionText').value = '';
        document.getElementById('dayRating').value = '';
        document.getElementById('goalsWorked').checked = false;
        document.getElementById('challengesFaced').value = '';
        loadReflections();
        addXP(5);
    }
}

function loadReflections() {
    const historyDiv = document.getElementById('reflectionHistory');
    historyDiv.innerHTML = '<h3>Reflection History</h3>';
    const reflections = getUserData('reflections', []);
    reflections.slice(-7).reverse().forEach(reflection => { // Show last 7 days
        const div = document.createElement('div');
        div.className = 'reflection-entry';
        const date = new Date(reflection.date).toLocaleDateString();
        div.innerHTML = `
            <h4>${date} - Rating: ${reflection.rating}/10</h4>
            <p>${reflection.text}</p>
            <p><strong>Goals worked on:</strong> ${reflection.goalsWorked ? 'Yes' : 'No'}</p>
            ${reflection.challenges ? `<p><strong>Challenges:</strong> ${reflection.challenges}</p>` : ''}
        `;
        historyDiv.appendChild(div);
    });
}

function switchReflectionTab(tab) {
    const dailyTab = document.getElementById('dailyReflection');
    const weeklyTab = document.getElementById('weeklyReflection');
    const dailyBtn = document.getElementById('dailyTabBtn');
    const weeklyBtn = document.getElementById('weeklyTabBtn');
    
    if (tab === 'daily') {
        dailyTab.classList.remove('hidden');
        weeklyTab.classList.add('hidden');
        dailyBtn.classList.add('active');
        weeklyBtn.classList.remove('active');
    } else {
        dailyTab.classList.add('hidden');
        weeklyTab.classList.remove('hidden');
        dailyBtn.classList.remove('active');
        weeklyBtn.classList.add('active');
        loadWeeklyReflections();
    }
}

function saveWeeklyReflection() {
    const reflection = document.getElementById('weeklyReflectionText').value;
    const rating = document.getElementById('weekRating').value;
    const goals = document.getElementById('weeklyGoals').value;
    const challenges = document.getElementById('weeklyChallenges').value;
    const improvement = document.getElementById('weeklyImprovement').value;

    if (reflection.trim()) {
        const reflections = getUserData('weeklyReflections', []);
        reflections.push({
            date: new Date().toISOString(),
            text: reflection,
            rating: rating,
            goals: goals,
            challenges: challenges,
            improvement: improvement
        });
        setUserData('weeklyReflections', reflections);
        // Reset form
        document.getElementById('weeklyReflectionText').value = '';
        document.getElementById('weekRating').value = '';
        document.getElementById('weeklyGoals').value = '';
        document.getElementById('weeklyChallenges').value = '';
        document.getElementById('weeklyImprovement').value = '';
        loadWeeklyReflections();
        addXP(10);
    }
}

function loadWeeklyReflections() {
    const historyDiv = document.getElementById('reflectionHistory');
    historyDiv.innerHTML = '<h3>Vecko reflektioner</h3>';
    const reflections = getUserData('weeklyReflections', []);
    reflections.slice(-4).reverse().forEach(reflection => { // Show last 4 weeks
        const div = document.createElement('div');
        div.className = 'reflection-entry';
        const date = new Date(reflection.date).toLocaleDateString();
        div.innerHTML = `
            <h4>${date} - Vecka betyg: ${reflection.rating}/10</h4>
            <p><strong>Reflektion:</strong> ${reflection.text}</p>
            ${reflection.goals ? `<p><strong>Mål uppnådda:</strong> ${reflection.goals}</p>` : ''}
            ${reflection.challenges ? `<p><strong>Utmaningar:</strong> ${reflection.challenges}</p>` : ''}
            ${reflection.improvement ? `<p><strong>Förbättring nästa vecka:</strong> ${reflection.improvement}</p>` : ''}
        `;
        historyDiv.appendChild(div);
    });
}

// Load and display earned achievements and badges
function loadAchievements() {
    // Get containers for badges and recent achievements
    const badgesContainer = document.getElementById('badgesContainer');
    const recentDiv = document.getElementById('recentAchievements');
    // Clear containers
    badgesContainer.innerHTML = '';
    recentDiv.innerHTML = '<h3>Recent Achievements</h3>';

    // Get list of achievements user has earned
    const achievements = getUserData('achievements', []);
    // Define all possible badges with their properties
    const allBadges = [
        { id: 'firstGoal', name: 'First Goal', description: 'Created your first goal', icon: '🎯' },
        { id: 'goalMaster', name: 'Goal Master', description: 'Completed 5 goals', icon: '🏆' },
        { id: 'habitBreaker', name: 'Habit Breaker', description: '3 habits with 7+ day streaks', icon: '💪' },
        { id: 'level1', name: 'Level 1', description: 'Reached level 1', icon: '⭐' },
        { id: 'level2', name: 'Level 2', description: 'Reached level 2', icon: '⭐⭐' },
        { id: 'level3', name: 'Level 3', description: 'Reached level 3', icon: '⭐⭐⭐' }
    ];

    // Display all badges, unlocked or locked
    allBadges.forEach(badge => {
        const div = document.createElement('div');
        // Add 'locked' class if badge not earned
        div.className = 'badge' + (achievements.includes(badge.id) ? '' : ' locked');
        div.innerHTML = `
            <div>${badge.icon}</div>
            <div>${badge.name}</div>
        `;
        // Set tooltip description
        div.title = badge.description;
        badgesContainer.appendChild(div);
    });

    // Display recent 3 achievements in detail
    achievements.slice(-3).reverse().forEach(achievementId => {
        const badge = allBadges.find(b => b.id === achievementId);
        if (badge) {
            const div = document.createElement('div');
            div.className = 'reflection-entry';
            div.innerHTML = `<p><strong>${badge.icon} ${badge.name}</strong> - ${badge.description}</p>`;
            recentDiv.appendChild(div);
        }
    });
}

// Update the home page overview with current user statistics
function updateOverview() {
    // Get the overview statistics container
    const stats = document.getElementById('progressStats');
    // Retrieve all user data
    const goals = getUserData('goals', []);
    const habits = getUserData('habits', []);
    const programs = getUserData('activePrograms', []);
    const challenges = getUserData('activeChallenges', []);
    const completedPrograms = getUserData('completedPrograms', []);
    const completedChallenges = getUserData('completedChallenges', []);
    const xp = getUserData('xp', 0);
    const level = Math.floor(xp / 100) + 1;
    // Display overview statistics
    stats.innerHTML = `
        <p>Level: ${level} (${xp} XP)</p>
        <p>Mål avklarade: ${goals.filter(g => g.completed).length}/${goals.length}</p>
        <p>Vanor som kontrolleras: ${habits.length}</p>
        <p>Aktiva program: ${programs.length}</p>
        <p>Aktiva utmaningar: ${challenges.length}</p>
        <p>Program avklarade: ${completedPrograms.length}</p>
        <p>Utmaningar avklarade: ${completedChallenges.length}</p>
    `;
    loadHomeHighlights();
}

function loadHomeHighlights() {
    const container = document.getElementById('homeHighlights');
    if (!container) return;
    const completedChallenges = getUserData('completedChallenges', []);
    const completedPrograms = getUserData('completedPrograms', []);
    let messages = [];
    if (completedChallenges.length > 0) {
        messages.push(`Du har ${completedChallenges.length} avklarade utmaningar.`);
    }
    if (completedPrograms.length > 0) {
        messages.push(`Du har ${completedPrograms.length} avklarade program.`);
    }
    if (messages.length > 0) {
        container.classList.remove('hidden');
        container.innerHTML = `
            <div class="highlight-card">
                <h3>Färdiga saker</h3>
                <p>${messages.join(' ')}</p>
            </div>
        `;
    } else {
        container.classList.add('hidden');
        container.innerHTML = '';
    }
}

// ==================== STUDY TIMER (Pomodoro) ====================

function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function updateTimerUI() {
    document.getElementById('timerDisplay').textContent = formatTime(studyRemaining);
    document.getElementById('timerMode').textContent = studyMode === 'focus' ? (getCurrentLanguage() === 'sv' ? 'Fokustid' : 'Focus') : (getCurrentLanguage() === 'sv' ? 'Paus' : 'Break');
}

function startStudyTimer() {
    if (studyRunning) return;
    studyRunning = true;
    // Default durations
    const focusDuration = 25 * 60;
    const breakDuration = 5 * 60;
    // If timer was reset or finished, ensure remaining is set
    if (!studyRemaining || studyRemaining <= 0) {
        studyRemaining = studyMode === 'focus' ? focusDuration : breakDuration;
    }
    // Toggle buttons
    document.getElementById('startTimerBtn').classList.add('hidden');
    document.getElementById('pauseTimerBtn').classList.remove('hidden');

    studyTimerInterval = setInterval(() => {
        studyRemaining--;
        if (studyRemaining <= 0) {
            // End of period: switch mode
            clearInterval(studyTimerInterval);
            studyRunning = false;
            // Award XP for completed focus period
            if (studyMode === 'focus') addXP(5);
            studyMode = studyMode === 'focus' ? 'break' : 'focus';
            studyRemaining = studyMode === 'focus' ? focusDuration : breakDuration;
            updateTimerUI();
            // Auto-start next period
            startStudyTimer();
        } else {
            updateTimerUI();
        }
    }, 1000);
    updateTimerUI();
}

function pauseStudyTimer() {
    if (!studyRunning) return;
    studyRunning = false;
    clearInterval(studyTimerInterval);
    studyTimerInterval = null;
    document.getElementById('startTimerBtn').classList.remove('hidden');
    document.getElementById('pauseTimerBtn').classList.add('hidden');
}

function resetStudyTimer() {
    pauseStudyTimer();
    studyMode = 'focus';
    studyRemaining = 25 * 60;
    updateTimerUI();
}

// ==================== STUDY/NOTE FUNCTIONS ====================

function addSubject() {
    const input = document.getElementById('subjectInput');
    const name = input.value.trim();
    if (!name) return;
    const subjects = getUserData('subjects', []);
    subjects.push({ name });
    setUserData('subjects', subjects);
    input.value = '';
    loadSubjects();
}

function loadSubjects() {
    const subjects = getUserData('subjects', []);
    const list = document.getElementById('subjectsList');
    const goalSelect = document.getElementById('goalSubjectSelect');
    const noteSelect = document.getElementById('noteSubjectSelect');
    if (list) list.innerHTML = '';
    if (goalSelect) {
        goalSelect.innerHTML = '<option value="">Välj ämne</option>';
    }
    if (noteSelect) {
        noteSelect.innerHTML = '<option value="">Välj ämne</option>';
    }
    subjects.forEach((s, i) => {
        if (list) {
            const div = document.createElement('div');
            div.textContent = s.name;
            list.appendChild(div);
        }
        if (goalSelect) {
            const opt = document.createElement('option');
            opt.value = s.name;
            opt.textContent = s.name;
            goalSelect.appendChild(opt);
        }
        if (noteSelect) {
            const opt2 = document.createElement('option');
            opt2.value = s.name;
            opt2.textContent = s.name;
            noteSelect.appendChild(opt2);
        }
    });
}

function addStudyGoal() {
    const subject = document.getElementById('goalSubjectSelect').value;
    const text = document.getElementById('studyGoalInput').value.trim();
    if (!text) return;
    const goals = getUserData('studyGoals', []);
    goals.push({ subject, text, created: new Date().toISOString(), completed: false });
    setUserData('studyGoals', goals);
    document.getElementById('studyGoalInput').value = '';
    loadStudyGoals();
}

function loadStudyGoals() {
    const list = document.getElementById('studyGoalsList');
    list.innerHTML = '';
    const goals = getUserData('studyGoals', []);
    goals.forEach((g, i) => {
        const div = document.createElement('div');
        div.className = 'study-goal';
        div.innerHTML = `${g.subject ? `<strong>${g.subject}</strong>: ` : ''}${g.text} <button onclick="removeStudyGoal(${i})">Remove</button>`;
        list.appendChild(div);
    });
}

function removeStudyGoal(index) {
    const goals = getUserData('studyGoals', []);
    goals.splice(index, 1);
    setUserData('studyGoals', goals);
    loadStudyGoals();
}

function addReminder() {
    const text = document.getElementById('reminderInput').value.trim();
    const time = document.getElementById('reminderTime').value;
    if (!text) return;
    const reminders = getUserData('reminders', []);
    reminders.push({ text, time, created: new Date().toISOString() });
    setUserData('reminders', reminders);
    document.getElementById('reminderInput').value = '';
    document.getElementById('reminderTime').value = '';
    loadReminders();
}

function loadReminders() {
    const list = document.getElementById('remindersList');
    list.innerHTML = '';
    const reminders = getUserData('reminders', []);
    reminders.forEach((r, i) => {
        const div = document.createElement('div');
        div.innerHTML = `${r.text} ${r.time ? `- ${new Date(r.time).toLocaleString()}` : ''} <button onclick="removeReminder(${i})">Remove</button>`;
        list.appendChild(div);
    });
}

function removeReminder(index) {
    const reminders = getUserData('reminders', []);
    reminders.splice(index, 1);
    setUserData('reminders', reminders);
    loadReminders();
}

function saveStudyNote() {
    const subject = document.getElementById('noteSubjectSelect').value;
    const text = document.getElementById('studyNoteInput').value.trim();
    if (!text) return;
    const notes = getUserData('studyNotes', []);
    notes.push({ subject, text, created: new Date().toISOString() });
    setUserData('studyNotes', notes);
    document.getElementById('studyNoteInput').value = '';
    loadStudyNotes();
}

function loadStudyNotes() {
    const list = document.getElementById('studyNotesList');
    list.innerHTML = '';
    const notes = getUserData('studyNotes', []);
    notes.forEach(note => {
        const div = document.createElement('div');
        div.className = 'study-note';
        div.innerHTML = `${note.subject ? `<strong>${note.subject}</strong>: ` : ''}${note.text}`;
        list.appendChild(div);
    });
}

// Ensure the user's data object exists in localStorage with default fields
function ensureUserData(username) {
    if (!username) return;
    const key = `user_${username}`;
    const existing = JSON.parse(localStorage.getItem(key) || 'null');
    if (existing && typeof existing === 'object') return;
    const defaults = {
        xp: 0,
        goals: [],
        habits: [],
        activePrograms: [],
        activeChallenges: [],
        completedChallenges: [],
        completedPrograms: [],
        reflections: [],
        weeklyReflections: [],
        achievements: [],
        subjects: [],
        studyGoals: [],
        reminders: [],
        studyNotes: []
    };
    localStorage.setItem(key, JSON.stringify(defaults));
}