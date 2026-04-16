let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        showSection('login');
        hideSidebar();
    } else {
        showSection('home');
        initializeApp();
        showSidebar();
    }

    // Navigation
    const sections = ['home', 'goals', 'habits', 'challenges', 'daily', 'strategies', 'programs', 'achievements', 'stats'];
    sections.forEach(section => {
        document.getElementById(section + 'Btn').addEventListener('click', () => showSection(section));
    });
    document.getElementById('accountBtn').addEventListener('click', () => {
        if (currentUser) {
            showSection('account');
            loadAccountInfo();
        } else {
            showSection('login');
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

    // Login/Register
    document.getElementById('loginBtn').addEventListener('click', login);
    document.getElementById('registerBtn').addEventListener('click', register);

    // Allow Enter key to login
    document.getElementById('username').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') login();
    });
    document.getElementById('password').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') login();
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
    if (!currentUser && section !== 'login') return;
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById(section).classList.remove('hidden');

    // Update active button state in sidebar
    document.querySelectorAll('.sidebar button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(section + 'Btn').classList.add('active');

    if (section === 'account') {
        document.getElementById('accountBtn').textContent = currentUser ? '👤 Logout' : '👤 Account';
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
                case 'strategiesBtn': button.textContent = '💡'; break;
                case 'programsBtn': button.textContent = '📚'; break;
                case 'achievementsBtn': button.textContent = '🏆'; break;
                case 'statsBtn': button.textContent = '📊'; break;
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

// User Account
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        document.getElementById('loginMessage').textContent = 'Please enter both username and password';
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
        document.getElementById('loginMessage').textContent = 'Login successful! Welcome back!';
        document.getElementById('loginMessage').style.color = '#48bb78';
        // Clear form
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    } else {
        document.getElementById('loginMessage').textContent = 'Invalid username or password';
        document.getElementById('loginMessage').style.color = '#e53e3e';
    }
}

function register() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        document.getElementById('loginMessage').textContent = 'Please enter both username and password';
        document.getElementById('loginMessage').style.color = '#e53e3e';
        return;
    }

    if (password.length < 4) {
        document.getElementById('loginMessage').textContent = 'Password must be at least 4 characters long';
        document.getElementById('loginMessage').style.color = '#e53e3e';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]) {
        document.getElementById('loginMessage').textContent = 'Username already exists';
        document.getElementById('loginMessage').style.color = '#e53e3e';
    } else {
        users[username] = { password, created: new Date().toISOString() };
        localStorage.setItem('users', JSON.stringify(users));
        currentUser = username;
        localStorage.setItem('currentUser', currentUser);
        showSection('home');
        initializeApp();
        showSidebar();
        document.getElementById('loginMessage').textContent = 'Registration successful! Welcome!';
        document.getElementById('loginMessage').style.color = '#48bb78';
        // Clear form
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
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
        { title: 'Set SMART Goals', description: 'Make goals Specific, Measurable, Achievable, Relevant, and Time-bound.' },
        { title: 'Practice Mindfulness', description: 'Take time each day to be present and aware of your thoughts and feelings.' },
        { title: 'Build Habits Gradually', description: 'Start small and build up to bigger changes to make them sustainable.' },
        { title: 'Track Your Progress', description: 'Keep a journal or use apps to monitor your improvements.' },
        { title: 'Seek Accountability', description: 'Share your goals with others to stay motivated.' },
        { title: 'Learn Continuously', description: 'Read books, take courses, or listen to podcasts on self-improvement.' }
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
    if (!currentUser) {
        document.getElementById('userInfo').classList.add('hidden');
        document.getElementById('userDisplay').textContent = '';
        return;
    }
    document.getElementById('userInfo').classList.remove('hidden');
    document.getElementById('userDisplay').textContent = `Welcome, ${currentUser}!`;
    const xp = getUserData('xp', 0);
    const level = Math.floor(xp / 100) + 1;
    document.getElementById('levelDisplay').textContent = `Level ${level} - ${xp} XP`;
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
        <p>Goals completed: ${goals.filter(g => g.completed).length}/${goals.length}</p>
        <p>Habits being tracked: ${habits.length}</p>
        <p>Active programs: ${programs.length}</p>
        <p>Active challenges: ${challenges.length}</p>
        <p>Programs completed: ${programs.filter(p => p.progress >= p.duration).length}</p>
        <p>Challenges completed: ${challenges.filter(c => c.progress >= c.duration).length}</p>
    `;
}