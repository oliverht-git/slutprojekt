let currentUser = null;

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

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    currentUser = localStorage.getItem('currentUser');
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

function initializeApp() {
    loadGoals();
    loadHabits();
    loadChallenges();
    loadReflections();
    loadAchievements();
    loadStrategies();
    loadPrograms();
    updateOverview();
    loadStats();
    updateUserDisplay();
    scheduleNotifications();
}

function showSidebar() {
    document.getElementById('sidebar').classList.add('visible');
    document.getElementById('sidebarToggle').classList.add('visible');
}

function hideSidebar() {
    document.getElementById('sidebar').classList.remove('visible');
    document.getElementById('sidebarToggle').classList.remove('visible');
}

function showSection(section) {
    if (!currentUser && section !== 'login' && section !== 'startscreen' && section !== 'register') return;
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById(section).classList.remove('hidden');

    // Update active button state in sidebar
    const btn = document.getElementById(section + 'Btn');
    if (btn) {
        document.querySelectorAll('.sidebar button').forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
    }

    if (section === 'account') {
        const t = translations[getCurrentLanguage()] || translations.sv;
        document.getElementById('accountBtn').textContent = currentUser ? t.logoutBtn : t.accountBtn;
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');

    sidebar.classList.toggle('collapsed');
    toggleBtn.classList.toggle('collapsed');

    // Update toggle button text
    if (sidebar.classList.contains('collapsed')) {
        toggleBtn.textContent = '▶';
        // Update sidebar buttons to show only emojis
        updateSidebarButtons(true);
    } else {
        toggleBtn.textContent = '◀';
        // Update sidebar buttons to show full text
        updateSidebarButtons(false);
    }

    // Save sidebar state to localStorage
    localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
}

function updateSidebarButtons(collapsed) {
    const buttons = document.querySelectorAll('.sidebar button:not(#sidebarToggle)');
    buttons.forEach(button => {
        const buttonId = button.id;
        if (collapsed) {
            // Store original text and show only emoji
            button.setAttribute('data-original-text', button.textContent);
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
            // Restore original text
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

function loadPreferences() {
    const preferences = JSON.parse(localStorage.getItem('preferences') || '{}');
    const defaultPreferences = {
        theme: 'light',
        fontSize: 'medium',
        cardStyle: 'standard',
        language: 'sv'
    };
    const settings = { ...defaultPreferences, ...preferences };
    applyPreferences(settings);
    updateSettingsUI(settings);
    translateUI(settings.language);
    return settings;
}

function applyPreferences(settings) {
    const body = document.body;
    body.classList.remove('theme-light', 'theme-dark', 'theme-colorful', 'font-small', 'font-medium', 'font-large', 'card-standard', 'card-soft', 'card-minimal');
    body.classList.add(`theme-${settings.theme}`);
    body.classList.add(`font-${settings.fontSize}`);
    body.classList.add(`card-${settings.cardStyle}`);
}

function updateSettingsUI(settings) {
    const preferences = settings || JSON.parse(localStorage.getItem('preferences') || '{}');
    document.getElementById('themeSelect').value = preferences.theme || 'light';
    document.getElementById('fontSizeSelect').value = preferences.fontSize || 'medium';
    document.getElementById('cardStyleSelect').value = preferences.cardStyle || 'standard';
    document.getElementById('languageSelect').value = preferences.language || 'sv';
}

function getCurrentLanguage() {
    const preferences = JSON.parse(localStorage.getItem('preferences') || '{}');
    return preferences.language || 'sv';
}

function translateUI(language) {
    const t = translations[language] || translations.sv;
    document.querySelector('header h1').textContent = t.appTitle;
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
        updateSidebarButtons(true);
    }
}

function savePreferences() {
    const settings = {
        theme: document.getElementById('themeSelect').value,
        fontSize: document.getElementById('fontSizeSelect').value,
        cardStyle: document.getElementById('cardStyleSelect').value,
        language: document.getElementById('languageSelect').value
    };
    localStorage.setItem('preferences', JSON.stringify(settings));
    applyPreferences(settings);
    translateUI(settings.language);
    if (document.getElementById('sidebar').classList.contains('collapsed')) {
        updateSidebarButtons(true);
    }
    const t = translations[settings.language] || translations.sv;
    document.getElementById('settingsMessage').textContent = t.settingsSaved;
    document.getElementById('settingsMessage').style.color = '#2f855a';
}

function resetPreferences() {
    localStorage.removeItem('preferences');
    const settings = loadPreferences();
    const t = translations[settings.language] || translations.sv;
    document.getElementById('settingsMessage').textContent = t.settingsReset;
    document.getElementById('settingsMessage').style.color = '#2c5282';
}

// User Account
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    const t = translations[getCurrentLanguage()] || translations.sv;
    if (!username || !password) {
        document.getElementById('loginMessage').textContent = t.loginErrorEmpty;
        document.getElementById('loginMessage').style.color = '#e53e3e';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username] && users[username].password === password) {
        currentUser = username;
        localStorage.setItem('currentUser', currentUser);
        showSection('home');
        initializeApp();
        showSidebar();
        document.getElementById('loginMessage').textContent = t.loginSuccess;
        document.getElementById('loginMessage').style.color = '#48bb78';
        // Clear form
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    } else {
        document.getElementById('loginMessage').textContent = t.loginErrorInvalid;
        document.getElementById('loginMessage').style.color = '#e53e3e';
    }
}

function register() {
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    const t = translations[getCurrentLanguage()] || translations.sv;
    if (!username || !password || !confirmPassword) {
        document.getElementById('registerMessage').textContent = t.registerErrorFields;
        document.getElementById('registerMessage').style.color = '#e53e3e';
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById('registerMessage').textContent = t.registerErrorMatch;
        document.getElementById('registerMessage').style.color = '#e53e3e';
        return;
    }

    if (password.length < 4) {
        document.getElementById('registerMessage').textContent = t.registerErrorShortPass;
        document.getElementById('registerMessage').style.color = '#e53e3e';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]) {
        document.getElementById('registerMessage').textContent = t.registerErrorUserExists;
        document.getElementById('registerMessage').style.color = '#e53e3e';
    } else {
        users[username] = { password, created: new Date().toISOString() };
        localStorage.setItem('users', JSON.stringify(users));
        currentUser = username;
        localStorage.setItem('currentUser', currentUser);
        showSection('home');
        initializeApp();
        showSidebar();
        document.getElementById('registerMessage').textContent = t.registerSuccess;
        document.getElementById('registerMessage').style.color = '#48bb78';
        // Clear form
        document.getElementById('regUsername').value = '';
        document.getElementById('regPassword').value = '';
        document.getElementById('regConfirmPassword').value = '';
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('userInfo').classList.add('hidden');
    document.getElementById('userDisplay').textContent = '';
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

// Goals
function addGoal() {
    const input = document.getElementById('goalInput');
    const goal = input.value.trim();
    if (goal) {
        const goals = getUserData('goals', []);
        goals.push({ text: goal, completed: false, created: new Date().toISOString() });
        setUserData('goals', goals);
        input.value = '';
        loadGoals();
        updateOverview();
        loadStats();
    }
}

function loadGoals() {
    const goalsList = document.getElementById('goalsList');
    const goalsEmpty = document.getElementById('goalsEmpty');
    goalsList.innerHTML = '';
    const goals = getUserData('goals', []);
    if (goals.length === 0) {
        goalsEmpty.classList.remove('hidden');
    } else {
        goalsEmpty.classList.add('hidden');
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

function toggleGoal(index) {
    const goals = getUserData('goals', []);
    goals[index].completed = !goals[index].completed;
    setUserData('goals', goals);
    loadGoals();
    updateOverview();
    loadStats();
    if (goals[index].completed) {
        addXP(20);
    }
}

function editGoal(index) {
    const goals = getUserData('goals', []);
    const newText = prompt('Edit goal:', goals[index].text);
    if (newText && newText.trim()) {
        goals[index].text = newText.trim();
        setUserData('goals', goals);
        loadGoals();
    }
}

function deleteGoal(index) {
    const goals = getUserData('goals', []);
    goals.splice(index, 1);
    setUserData('goals', goals);
    loadGoals();
    updateOverview();
    loadStats();
}

// Bad Habits
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

function checkHabit(index) {
    const habits = getUserData('habits', []);
    const today = new Date().toDateString();
    if (habits[index].lastChecked !== today) {
        habits[index].streak++;
        habits[index].lastChecked = today;
        setUserData('habits', habits);
        loadHabits();
        updateOverview();
        loadStats();
        addXP(10);
    }
}

function editHabit(index) {
    const habits = getUserData('habits', []);
    const newName = prompt('Edit habit:', habits[index].name);
    if (newName && newName.trim()) {
        habits[index].name = newName.trim();
        setUserData('habits', habits);
        loadHabits();
    }
}

function removeHabit(index) {
    const habits = getUserData('habits', []);
    habits.splice(index, 1);
    setUserData('habits', habits);
    loadHabits();
    updateOverview();
    loadStats();
}

// Strategies
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

// Programs
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
        const days = Math.floor((new Date() - new Date(program.startDate)) / (1000 * 60 * 60 * 24)) + 1;
        const progress = Math.min(days, program.duration);
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
    if (programs[index].progress < programs[index].duration) {
        programs[index].progress++;
        setUserData('activePrograms', programs);
        loadPrograms();
        updateOverview();
        loadStats();
        addXP(5);
        if (programs[index].progress === programs[index].duration) {
            addXP(50); // Bonus for completing program
            showNotification(`Program Completed: ${programs[index].name}!`);
        }
    }
}

// Statistics
function loadStats() {
    const goals = getUserData('goals', []);
    const habits = getUserData('habits', []);
    const programs = getUserData('activePrograms', []);

    // Goals chart
    const goalsCtx = document.getElementById('goalsChart').getContext('2d');
    new Chart(goalsCtx, {
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
    new Chart(habitsCtx, {
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

// Notifications
function scheduleNotifications() {
    if ('Notification' in window && Notification.permission === 'granted') {
        // Schedule daily reminder at 8 PM
        const now = new Date();
        const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0, 0);
        if (reminderTime < now) {
            reminderTime.setDate(reminderTime.getDate() + 1);
        }
        const timeUntilReminder = reminderTime - now;
        setTimeout(() => {
            showNotification('Don\'t forget your goals today!');
            // Repeat daily
            setInterval(() => showNotification('Don\'t forget your goals today!'), 24 * 60 * 60 * 1000);
        }, timeUntilReminder);
    }
}

function showNotification(message) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Self-Improvement Hub', {
            body: message,
            icon: '/favicon.ico' // Add an icon if available
        });
    }
}

// Utility functions
function getUserData(key, defaultValue) {
    const userData = JSON.parse(localStorage.getItem(`user_${currentUser}`) || '{}');
    return userData[key] || defaultValue;
}

function setUserData(key, value) {
    const userData = JSON.parse(localStorage.getItem(`user_${currentUser}`) || '{}');
    userData[key] = value;
    localStorage.setItem(`user_${currentUser}`, JSON.stringify(userData));
}

function updateUserDisplay() {
    const lang = getCurrentLanguage();
    const t = translations[lang] || translations.sv;
    if (!currentUser) {
        document.getElementById('userInfo').classList.add('hidden');
        document.getElementById('userDisplay').textContent = '';
        return;
    }
    document.getElementById('userInfo').classList.remove('hidden');
    document.getElementById('userDisplay').textContent = t.welcomeUser.replace('{user}', currentUser);
    const xp = getUserData('xp', 0);
    const level = Math.floor(xp / 100) + 1;
    document.getElementById('levelDisplay').textContent = t.levelDisplay
        ? t.levelDisplay.replace('{level}', level).replace('{xp}', xp)
        : `Level ${level} - ${xp} XP`;
}

function addXP(points) {
    const currentXP = getUserData('xp', 0);
    setUserData('xp', currentXP + points);
    updateUserDisplay();
    checkAchievements();
}

function checkAchievements() {
    const achievements = getUserData('achievements', []);
    const goals = getUserData('goals', []);
    const habits = getUserData('habits', []);
    const xp = getUserData('xp', 0);

    // First Goal Achievement
    if (goals.length >= 1 && !achievements.includes('firstGoal')) {
        achievements.push('firstGoal');
        addXP(50);
        showNotification('Achievement Unlocked: First Goal!');
    }

    // Goal Master (5 completed goals)
    const completedGoals = goals.filter(g => g.completed).length;
    if (completedGoals >= 5 && !achievements.includes('goalMaster')) {
        achievements.push('goalMaster');
        addXP(100);
        showNotification('Achievement Unlocked: Goal Master!');
    }

    // Habit Breaker (3 habits with streak >=7)
    const longStreaks = habits.filter(h => h.streak >= 7).length;
    if (longStreaks >= 3 && !achievements.includes('habitBreaker')) {
        achievements.push('habitBreaker');
        addXP(150);
        showNotification('Achievement Unlocked: Habit Breaker!');
    }

    // Level Up badges
    const level = Math.floor(xp / 100) + 1;
    for (let i = 1; i <= level; i++) {
        if (!achievements.includes(`level${i}`)) {
            achievements.push(`level${i}`);
        }
    }

    setUserData('achievements', achievements);
    loadAchievements();
}

function generateGoal() {
    const category = document.getElementById('goalCategory').value;
    if (!category) return;

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

    const templates = goalTemplates[category];
    const randomGoal = templates[Math.floor(Math.random() * templates.length)];
    document.getElementById('generatedGoal').textContent = randomGoal;
    document.getElementById('addGeneratedGoalBtn').classList.remove('hidden');
}

function addGeneratedGoal() {
    const goalText = document.getElementById('generatedGoal').textContent;
    if (goalText) {
        const goals = getUserData('goals', []);
        goals.push({ text: goalText, completed: false, created: new Date().toISOString() });
        setUserData('goals', goals);
        document.getElementById('generatedGoal').textContent = '';
        document.getElementById('addGeneratedGoalBtn').classList.add('hidden');
        loadGoals();
        updateOverview();
        loadStats();
        addXP(10);
    }
}

function joinChallenge(challengeName) {
    const challenges = getUserData('activeChallenges', []);
    if (!challenges.find(c => c.name === challengeName)) {
        const challengeData = getChallengeData(challengeName);
        challenges.push({ ...challengeData, startDate: new Date().toISOString(), progress: 0 });
        setUserData('activeChallenges', challenges);
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
        const days = Math.floor((new Date() - new Date(challenge.startDate)) / (1000 * 60 * 60 * 24)) + 1;
        const progress = Math.min(days, challenge.duration);
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
        `;
        activeChallengesDiv.appendChild(div);
    });
}

function completeChallengeDay(index) {
    const challenges = getUserData('activeChallenges', []);
    if (challenges[index].progress < challenges[index].duration) {
        challenges[index].progress++;
        setUserData('activeChallenges', challenges);
        loadChallenges();
        updateOverview();
        addXP(5);
        if (challenges[index].progress === challenges[index].duration) {
            addXP(100); // Bonus for completing challenge
            showNotification(`Challenge Completed: ${challenges[index].name}!`);
        }
    }
}

function saveReflection() {
    const reflection = document.getElementById('reflectionText').value;
    const rating = document.getElementById('dayRating').value;
    const goalsWorked = document.getElementById('goalsWorked').checked;
    const challenges = document.getElementById('challengesFaced').value;

    if (reflection.trim()) {
        const reflections = getUserData('reflections', []);
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

function loadAchievements() {
    const badgesContainer = document.getElementById('badgesContainer');
    const recentDiv = document.getElementById('recentAchievements');
    badgesContainer.innerHTML = '';
    recentDiv.innerHTML = '<h3>Recent Achievements</h3>';

    const achievements = getUserData('achievements', []);
    const allBadges = [
        { id: 'firstGoal', name: 'First Goal', description: 'Created your first goal', icon: '🎯' },
        { id: 'goalMaster', name: 'Goal Master', description: 'Completed 5 goals', icon: '🏆' },
        { id: 'habitBreaker', name: 'Habit Breaker', description: '3 habits with 7+ day streaks', icon: '💪' },
        { id: 'level1', name: 'Level 1', description: 'Reached level 1', icon: '⭐' },
        { id: 'level2', name: 'Level 2', description: 'Reached level 2', icon: '⭐⭐' },
        { id: 'level3', name: 'Level 3', description: 'Reached level 3', icon: '⭐⭐⭐' }
    ];

    allBadges.forEach(badge => {
        const div = document.createElement('div');
        div.className = 'badge' + (achievements.includes(badge.id) ? '' : ' locked');
        div.innerHTML = `
            <div>${badge.icon}</div>
            <div>${badge.name}</div>
        `;
        div.title = badge.description;
        badgesContainer.appendChild(div);
    });

    // Recent achievements (last 3)
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

function updateOverview() {
    const stats = document.getElementById('progressStats');
    const goals = getUserData('goals', []);
    const habits = getUserData('habits', []);
    const programs = getUserData('activePrograms', []);
    const challenges = getUserData('activeChallenges', []);
    const xp = getUserData('xp', 0);
    const level = Math.floor(xp / 100) + 1;
    stats.innerHTML = `
        <p>Level: ${level} (${xp} XP)</p>
        <p>Mål avklarade: ${goals.filter(g => g.completed).length}/${goals.length}</p>
        <p>Vanor som kontrolleras: ${habits.length}</p>
        <p>Aktiva program: ${programs.length}</p>
        <p>Aktiva utmaningar: ${challenges.length}</p>
        <p>Program avklarade: ${programs.filter(p => p.progress >= p.duration).length}</p>
        <p>Utmaningar avklarade: ${challenges.filter(c => c.progress >= c.duration).length}</p>
    `;
}