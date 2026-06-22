/**
 * DevQuery - Advanced Developer Quiz Application
 * Vanilla JS logic, Synthesized audio engine, Custom SVG charting, & Syntax Highlighter
 */

// ==========================================
// 1. DATASET: Default Curated Developer Questions
// ==========================================
const defaultQuizQuestions = [
    {
        type: 'single',
        tag: 'JSQuirks',
        category: 'JS & Core Engine',
        question: 'What is the exact output order of the following log execution?',
        code: `console.log('Start');
setTimeout(() => console.log('Timeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
console.log('End');`,
        options: [
            'Start, Timeout, Promise, End',
            'Start, End, Promise, Timeout',
            'Start, End, Timeout, Promise',
            'Start, Promise, End, Timeout'
        ],
        correct: 1,
        explanation: 'Microtasks (Promise handlers) are executed immediately after the current script stack completes and before any macrotasks (setTimeout callbacks) are run.'
    },
    {
        type: 'single',
        tag: 'Frontend',
        category: 'Frontend & CSS',
        question: 'What is the behavior of the console output in the React component below?',
        code: `const [count, setCount] = useState(0);

useEffect(() => {
  const id = setInterval(() => {
    console.log(count);
  }, 1000);
  return () => clearInterval(id);
}, []); // Empty dependencies`,
        options: [
            'Prints incrementing numbers (0, 1, 2...) every second',
            'Throws a runtime ReferenceError',
            'Prints 0 every second indefinitely (stale closure)',
            'Prints undefined every second'
        ],
        correct: 2,
        explanation: 'Since the dependency array is empty (`[]`), the useEffect hook runs exactly once. The closure created inside the interval callback captures the initial state value (`0`) and will never reflect newer state updates.'
    },
    {
        type: 'single',
        tag: 'Systems',
        category: 'Systems & Git',
        question: 'What is the resulting permissions profile of the file after executing this chmod command?',
        code: `$ chmod 754 run_script.sh`,
        options: [
            'User: rwx, Group: r-x, Others: r--',
            'User: rwx, Group: r-x, Others: -w-',
            'User: r-x, Group: r--, Others: rwx',
            'User: rwx, Group: rwx, Others: r-x'
        ],
        correct: 0,
        explanation: 'Octal permissions maps bits: 7 = rwx (4+2+1), 5 = r-x (4+0+1), 4 = r-- (4+0+0). Thus, user gets full access, group gets read-execute, and others get read-only.'
    },
    {
        type: 'single',
        tag: 'Frontend',
        category: 'Frontend & CSS',
        question: 'Given the flex container configuration below, what is the final calculated width of divs A and B?',
        code: `<div style="display: flex; width: 500px;">
  <div style="flex-grow: 1; flex-basis: 200px;">A</div>
  <div style="flex-grow: 2; flex-basis: 0px;">B</div>
</div>`,
        options: [
            'A: 250px, B: 250px',
            'A: 300px, B: 200px',
            'A: 200px, B: 300px',
            'A: 300px, B: 300px'
        ],
        correct: 1,
        explanation: 'Remaining space is total width minus flex-basis totals: 500px - (200px + 0px) = 300px. The remaining 300px is distributed proportionally via flex-grow values (1:2 ratio). A gets 1/3 of 300px (+100px = 300px), B gets 2/3 of 300px (+200px = 200px).'
    },
    {
        type: 'multi',
        tag: 'Systems',
        category: 'Systems & Git',
        question: 'Which of the following methods are valid pathways to resolve a Git merge conflict in a file named app.js?',
        code: `# Merge conflict encountered in app.js
# [Conflict manually resolved in code editor]`,
        options: [
            'Run: git add app.js && git commit',
            'Run: git commit --amend',
            'Run: git add app.js && git merge --continue',
            'Run: git resolve app.js'
        ],
        correct: [0, 2],
        explanation: 'Both staging files followed by a standard commit, or using the native `git merge --continue` command will successfully finalize the merge process.'
    },
    {
        type: 'fib',
        tag: 'JSQuirks',
        category: 'JS & Core Engine',
        question: 'What keyword refers to the functional context inside a JavaScript function and is dynamically bound depending on how the function is invoked?',
        code: `const contextPrinter = function() {
  console.log( ______.name );
};`,
        options: [],
        correct: 'this',
        explanation: 'The `this` keyword refers to the calling context of the function and is resolved dynamically at runtime.'
    }
];

// ==========================================
// 2. SYNTHESIZED WEB AUDIO ENGINE
// ==========================================
class SynthAudioEngine {
    constructor() {
        this.ctx = null;
        this.enabled = localStorage.getItem('devquery_sound_enabled') !== 'false';
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('devquery_sound_enabled', this.enabled);
        this.playChirp();
        return this.enabled;
    }

    playChirp() {
        if (!this.enabled) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
    }

    playClick() {
        if (!this.enabled) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.frequency.setValueAtTime(440, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
    }

    playSuccess() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        
        // Soft synth chime (C5 then E5)
        const playTone = (freq, start, duration) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0.12, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

            osc.start(start);
            osc.stop(start + duration);
        };

        playTone(523.25, now, 0.15); // C5
        playTone(659.25, now + 0.08, 0.25); // E5
    }

    playFailure() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.frequency.setValueAtTime(160, now);
        osc.frequency.linearRampToValueAtTime(70, now + 0.3);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.start(now);
        osc.stop(now + 0.3);
    }

    playVictory() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5

        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.connect(gain);
            gain.connect(this.ctx.destination);

            const start = now + idx * 0.12;
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0.1, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

            osc.start(start);
            osc.stop(start + 0.45);
        });
    }
}

const audio = new SynthAudioEngine();

// ==========================================
// 3. SYNTAX HIGHLIGHTER UTILITY
// ==========================================
function highlightCode(codeText) {
    if (!codeText) return '';
    // Escaping html tag chars to avoid script issues
    let escaped = codeText
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Syntax regex tokens
    const rules = [
        { regex: /(\/\/.*)/g, type: 'comment' },
        { regex: /('(?:\\\\'|[^'])*'|"(?:\\\\"|[^"])*"|`(?:\\\\`|[^`])*`)/g, type: 'string' },
        { regex: /\b(const|let|var|function|return|class|extends|if|else|for|while|do|switch|case|default|break|continue|import|export|from|new|typeof|instanceof|async|await|try|catch|finally|throw)\b/g, type: 'keyword' },
        { regex: /\b(true|false|null|undefined|NaN)\b/g, type: 'builtin' },
        { regex: /\b(console|document|window|Object|Array|Promise|setTimeout|setInterval|clearInterval|Math|Date)\b/g, type: 'builtin' },
        { regex: /\b(\d+)\b/g, type: 'number' }
    ];

    // Workaround to apply tokens without overlapping HTML strings
    // We replace target items with markers, then build the code blocks
    let placeholders = [];
    
    // Process Comments first
    escaped = escaped.replace(/(\/\/.*)/g, (match) => {
        placeholders.push(`<span class="token comment">${match}</span>`);
        return `___PLACEHOLDER_${placeholders.length - 1}___`;
    });

    // Process Strings next
    escaped = escaped.replace(/('(?:\\\\'|[^'])*'|"(?:\\\\"|[^"])*"|`(?:\\\\`|[^`])*`)/g, (match) => {
        placeholders.push(`<span class="token string">${match}</span>`);
        return `___PLACEHOLDER_${placeholders.length - 1}___`;
    });

    // Process Keywords
    escaped = escaped.replace(/\b(const|let|var|function|return|class|extends|if|else|for|while|do|switch|case|default|break|continue|import|export|from|new|typeof|instanceof|async|await|try|catch|finally|throw)\b/g, (match) => {
        return `<span class="token keyword">${match}</span>`;
    });

    // Process Builtins
    escaped = escaped.replace(/\b(true|false|null|undefined|NaN)\b/g, (match) => {
        return `<span class="token builtin">${match}</span>`;
    });
    escaped = escaped.replace(/\b(console|document|window|Object|Array|Promise|setTimeout|setInterval|clearInterval|Math|Date)\b/g, (match) => {
        return `<span class="token builtin">${match}</span>`;
    });

    // Process Numbers
    escaped = escaped.replace(/\b(\d+)\b/g, (match) => {
        return `<span class="token number">${match}</span>`;
    });

    // Restore placeholders
    for (let i = placeholders.length - 1; i >= 0; i--) {
        escaped = escaped.replace(`___PLACEHOLDER_${i}___`, placeholders[i]);
    }

    return `<pre><code>${escaped}</code></pre>`;
}

// ==========================================
// 4. APP STATE
// ==========================================
let state = {
    selectedCategory: 'all', // all, Frontend, Systems, JSQuirks
    activeQuestions: [],
    currentIndex: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    startTime: null,
    timerInterval: null,
    elapsedSeconds: 0,
    selectedAnswers: [], // stores options index or FIB text
    history: JSON.parse(localStorage.getItem('devquery_history')) || [],
    customQuestions: JSON.parse(localStorage.getItem('devquery_custom_questions')) || [],
    sessionAnswers: [] // logs correctness data for review screen
};

// ==========================================
// 5. DOM ELEMENT REFERENCES
// ==========================================
const elements = {
    // Screen blocks
    screens: document.querySelectorAll('.screen'),
    dashboard: document.getElementById('dashboard-screen'),
    quiz: document.getElementById('quiz-screen'),
    results: document.getElementById('result-screen'),
    review: document.getElementById('review-screen'),
    creator: document.getElementById('creator-screen'),

    // Toggles and Selectors
    themeSelector: document.getElementById('theme-selector'),
    soundToggle: document.getElementById('sound-toggle'),
    categoryCards: document.querySelectorAll('.category-card'),

    // Controls
    startBtn: document.getElementById('start-assessment-btn'),
    goCreatorBtn: document.getElementById('go-creator-btn'),
    exitCreatorBtn: document.getElementById('exit-creator-btn'),
    closeReviewBtn: document.getElementById('close-review-btn'),
    showReviewBtn: document.getElementById('show-review-btn'),
    exitBtn: document.getElementById('exit-btn'),
    
    // Quiz components
    currentQuestionText: document.getElementById('question-text'),
    codeContainer: document.getElementById('code-snippet-container'),
    optionsContainer: document.getElementById('options-container'),
    timerText: document.getElementById('timer-text'),
    currentQNum: document.getElementById('current-q'),
    totalQNum: document.getElementById('total-q'),
    streakIndicator: document.getElementById('streak-indicator'),
    categoryTag: document.getElementById('question-category'),
    progressBarFill: document.getElementById('progress-bar-fill'),
    feedbackPanel: document.getElementById('feedback-panel'),
    feedbackBadge: document.getElementById('feedback-badge'),
    explanationText: document.getElementById('explanation-text'),

    // Summary Screen components
    resultMessage: document.getElementById('result-message'),
    radialFill: document.getElementById('radial-progress-fill'),
    scoreNumerator: document.getElementById('score-numerator'),
    scoreDenominator: document.getElementById('score-denominator'),
    accuracyValue: document.getElementById('metric-accuracy'),
    streakValue: document.getElementById('metric-streak'),
    durationValue: document.getElementById('metric-duration'),
    achievementsPanel: document.getElementById('earned-achievements'),

    // Footer actions
    footer: document.getElementById('assessment-footer'),
    skipBtn: document.getElementById('skip-question-btn'),
    checkBtn: document.getElementById('check-answer-btn'),
    continueBtn: document.getElementById('continue-btn'),

    // Review & Creator DOM
    reviewTimeline: document.getElementById('review-timeline'),
    creatorForm: document.getElementById('custom-question-form'),
    optionsInputsList: document.getElementById('options-inputs-list'),
    addOptionBtn: document.getElementById('add-option-row-btn'),
    clearCustomBtn: document.getElementById('clear-custom-questions-btn')
};

// ==========================================
// 6. INITIALIZATION & ROUTING
// ==========================================
function init() {
    // Set active values based on local storage
    if (localStorage.getItem('devquery_sound_enabled') === 'false') {
        elements.soundToggle.querySelector('.sound-icon').textContent = '🔇';
    } else {
        elements.soundToggle.querySelector('.sound-icon').textContent = '🔊';
    }

    const savedTheme = localStorage.getItem('devquery_theme') || 'theme-vercel';
    document.body.className = savedTheme;
    elements.themeSelector.value = savedTheme;

    // Attach core event listeners
    elements.themeSelector.addEventListener('change', (e) => {
        document.body.className = e.target.value;
        localStorage.setItem('devquery_theme', e.target.value);
        audio.playChirp();
    });

    elements.soundToggle.addEventListener('click', () => {
        const soundOn = audio.toggle();
        elements.soundToggle.querySelector('.sound-icon').textContent = soundOn ? '🔊' : '🔇';
    });

    // Dashboard navigation
    elements.startBtn.addEventListener('click', startAssessment);
    elements.goCreatorBtn.addEventListener('click', () => switchScreen('creator-screen'));
    elements.exitCreatorBtn.addEventListener('click', () => switchScreen('dashboard-screen'));

    // Category filtering UI
    elements.categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            elements.categoryCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            state.selectedCategory = card.getAttribute('data-category');
            audio.playClick();
        });
    });

    // Quiz action footer
    elements.checkBtn.addEventListener('click', checkAnswer);
    elements.continueBtn.addEventListener('click', advanceQuiz);
    elements.skipBtn.addEventListener('click', skipQuestion);

    // Summary screen actions
    elements.showReviewBtn.addEventListener('click', showReview);
    elements.closeReviewBtn.addEventListener('click', () => switchScreen('result-screen'));
    elements.exitBtn.addEventListener('click', () => {
        switchScreen('dashboard-screen');
        renderHistoryChart();
    });

    // Custom Quiz Builder forms listeners
    elements.addOptionBtn.addEventListener('click', () => addOptionInputRow());
    elements.creatorForm.addEventListener('submit', handleCustomQuestionSubmit);
    elements.clearCustomBtn.addEventListener('click', clearAllCustomQuestions);
    document.getElementById('new-q-type').addEventListener('change', toggleCreatorOptionBuilder);

    // Initial renders
    updateCategoriesCount();
    renderHistoryChart();
}

function switchScreen(screenId) {
    elements.screens.forEach(s => {
        s.classList.remove('active');
    });
    const target = document.getElementById(screenId);
    target.classList.add('active');
}

// ==========================================
// 7. DASHBOARD DATA HANDLING
// ==========================================
function updateCategoriesCount() {
    const fullPool = [...defaultQuizQuestions, ...state.customQuestions];
    
    // Group categories
    const counts = { Frontend: 0, Systems: 0, JSQuirks: 0 };
    fullPool.forEach(q => {
        if (counts[q.tag] !== undefined) {
            counts[q.tag]++;
        }
    });

    // Update numbers dynamically
    elements.categoryCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const countSpan = card.querySelector('.cat-count');
        if (cat === 'all') {
            countSpan.textContent = fullPool.length;
        } else {
            countSpan.textContent = counts[cat] || 0;
        }
    });
}

// Draw dynamic vector charts using HTML SVGs
function renderHistoryChart() {
    const container = document.getElementById('chart-container');
    if (!container) return;

    if (state.history.length === 0) {
        container.innerHTML = '<p class="chart-placeholder">Build assessment runs to visualize your historical score trends.</p>';
        return;
    }

    // Limit history data to last 7 attempts for layout cleanliness
    const data = state.history.slice(-7);
    const svgWidth = 400;
    const svgHeight = 150;
    const padding = 20;

    let points = [];
    const stepX = (svgWidth - (padding * 2)) / Math.max(1, data.length - 1);

    data.forEach((run, i) => {
        const x = padding + (i * stepX);
        // Normalize score between 0 and 100
        const percent = run.percentage;
        // SVG coordinates: y is 0 at top, so invert percentage mapping
        const y = svgHeight - padding - (percent / 100) * (svgHeight - (padding * 2));
        points.push({ x, y, percent, score: `${run.score}/${run.totalQuestions}`, date: run.date });
    });

    let pathD = '';
    if (points.length > 0) {
        pathD = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');
    }

    // Dynamic grid lines matching theme borders
    let gridLinesHTML = '';
    for (let percent = 25; percent <= 75; percent += 25) {
        const gridY = svgHeight - padding - (percent / 100) * (svgHeight - (padding * 2));
        gridLinesHTML += `<line x1="${padding}" y1="${gridY}" x2="${svgWidth - padding}" y2="${gridY}" class="chart-grid" />`;
    }

    // Nodes for interactive SVG
    let dotsHTML = '';
    points.forEach((p, idx) => {
        dotsHTML += `<circle cx="${p.x}" cy="${p.y}" r="4.5" class="chart-dot" data-index="${idx}">
            <title>${p.percent}% (${p.score}) on ${p.date}</title>
        </circle>`;
    });

    container.innerHTML = `
        <svg viewBox="0 0 ${svgWidth} ${svgHeight}" class="chart-svg">
            ${gridLinesHTML}
            ${pathD ? `<path d="${pathD}" class="chart-line" />` : ''}
            ${dotsHTML}
        </svg>
    `;
}

// ==========================================
// 8. ASSESSMENT RUNNER
// ==========================================
function startAssessment() {
    audio.playClick();
    const fullPool = [...defaultQuizQuestions, ...state.customQuestions];
    
    // Filter by category
    if (state.selectedCategory === 'all') {
        state.activeQuestions = shuffle(fullPool);
    } else {
        state.activeQuestions = shuffle(fullPool.filter(q => q.tag === state.selectedCategory));
    }

    if (state.activeQuestions.length === 0) {
        alert('This category is currently empty. Build custom questions to start this quiz!');
        return;
    }

    // Limit practice assessment sessions to a readable length of 5 questions max
    if (state.activeQuestions.length > 5) {
        state.activeQuestions = state.activeQuestions.slice(0, 5);
    }

    // Reset quiz counters
    state.currentIndex = 0;
    state.score = 0;
    state.streak = 0;
    state.maxStreak = 0;
    state.elapsedSeconds = 0;
    state.sessionAnswers = [];
    state.startTime = Date.now();

    elements.footer.classList.remove('hidden');
    switchScreen('quiz-screen');
    renderQuestion();

    // Start counter clock
    clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
        state.elapsedSeconds++;
        const mins = String(Math.floor(state.elapsedSeconds / 60)).padStart(2, '0');
        const secs = String(state.elapsedSeconds % 60).padStart(2, '0');
        elements.timerText.textContent = `${mins}:${secs}`;
    }, 1000);
}

function renderQuestion() {
    const q = state.activeQuestions[state.currentIndex];
    
    // Meta descriptions
    elements.currentQNum.textContent = state.currentIndex + 1;
    elements.totalQNum.textContent = state.activeQuestions.length;
    elements.categoryTag.textContent = q.category || q.tag;
    elements.currentQuestionText.textContent = q.question;
    elements.streakIndicator.textContent = state.streak;

    // Progress Bar Fill
    const progressPercent = (state.currentIndex / state.activeQuestions.length) * 100;
    elements.progressBarFill.style.width = `${progressPercent}%`;

    // Render code snippet if available
    if (q.code) {
        elements.codeContainer.innerHTML = highlightCode(q.code);
        elements.codeContainer.classList.remove('hidden');
    } else {
        elements.codeContainer.classList.add('hidden');
        elements.codeContainer.innerHTML = '';
    }

    // Reset components states
    elements.optionsContainer.innerHTML = '';
    elements.feedbackPanel.classList.add('hidden');
    elements.checkBtn.disabled = true;
    elements.checkBtn.classList.remove('hidden');
    elements.continueBtn.classList.add('hidden');
    state.selectedAnswers = [];

    // Render answer options list depending on standard formats
    if (q.type === 'fib') {
        const wrapper = document.createElement('div');
        wrapper.className = 'fib-wrapper';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'fib-text-input';
        input.placeholder = 'Type your answer matching syntax requirements...';
        input.autocomplete = 'off';
        
        input.addEventListener('input', (e) => {
            state.selectedAnswers = [e.target.value];
            elements.checkBtn.disabled = e.target.value.trim() === '';
        });

        wrapper.appendChild(input);
        elements.optionsContainer.appendChild(wrapper);
    } else {
        // Option letters keys (A, B, C, D)
        q.options.forEach((opt, idx) => {
            const item = document.createElement('div');
            item.className = 'option-item';
            item.setAttribute('data-index', idx);
            
            const badge = document.createElement('span');
            badge.className = 'option-badge';
            badge.textContent = String.fromCharCode(65 + idx); // A, B, C, D...

            const text = document.createElement('span');
            text.className = 'option-text';
            text.textContent = opt;

            item.appendChild(badge);
            item.appendChild(text);

            item.addEventListener('click', () => handleOptionSelection(idx, item, q.type));
            elements.optionsContainer.appendChild(item);
        });
    }
}

function handleOptionSelection(idx, itemElement, qType) {
    audio.playClick();
    if (qType === 'single') {
        // Clear all select states
        const options = elements.optionsContainer.querySelectorAll('.option-item');
        options.forEach(opt => opt.classList.remove('selected'));
        itemElement.classList.add('selected');
        state.selectedAnswers = [idx];
    } else if (qType === 'multi') {
        itemElement.classList.toggle('selected');
        if (state.selectedAnswers.includes(idx)) {
            state.selectedAnswers = state.selectedAnswers.filter(item => item !== idx);
        } else {
            state.selectedAnswers.push(idx);
        }
    }
    elements.checkBtn.disabled = state.selectedAnswers.length === 0;
}

// ==========================================
// 9. CHECK ANSWER & EVALUATION
// ==========================================
function checkAnswer() {
    const q = state.activeQuestions[state.currentIndex];
    let isCorrect = false;

    if (q.type === 'fib') {
        const userStr = state.selectedAnswers[0].trim().toLowerCase();
        const correctStr = q.correct.trim().toLowerCase();
        isCorrect = userStr === correctStr;

        // Visual coloring input
        const input = elements.optionsContainer.querySelector('.fib-text-input');
        input.disabled = true;
        input.classList.add(isCorrect ? 'correct' : 'incorrect');
    } else if (q.type === 'multi') {
        // Sort lists to verify matching arrays elements
        const userArr = [...state.selectedAnswers].sort();
        const correctArr = [...q.correct].sort();
        isCorrect = JSON.stringify(userArr) === JSON.stringify(correctArr);

        // Highlight correct options vs incorrect selections
        const options = elements.optionsContainer.querySelectorAll('.option-item');
        options.forEach((opt, idx) => {
            const index = parseInt(opt.getAttribute('data-index'));
            if (q.correct.includes(index)) {
                opt.classList.add('correct');
            } else if (state.selectedAnswers.includes(index)) {
                opt.classList.add('incorrect');
            }
        });
    } else {
        const userIdx = state.selectedAnswers[0];
        isCorrect = userIdx === q.correct;

        // Highlight options selection
        const options = elements.optionsContainer.querySelectorAll('.option-item');
        options.forEach((opt, idx) => {
            const index = parseInt(opt.getAttribute('data-index'));
            if (index === q.correct) {
                opt.classList.add('correct');
            } else if (index === userIdx) {
                opt.classList.add('incorrect');
            }
        });
    }

    // Evaluate stats metrics
    if (isCorrect) {
        state.score++;
        state.streak++;
        state.maxStreak = Math.max(state.maxStreak, state.streak);
        audio.playSuccess();
        showFeedback(true, q.explanation);
    } else {
        state.streak = 0;
        audio.playFailure();
        showFeedback(false, q.explanation);
    }

    // Track response log details for review stage
    state.sessionAnswers.push({
        questionIndex: state.currentIndex,
        question: q.question,
        code: q.code || null,
        type: q.type,
        options: q.options || null,
        correctAnswers: q.correct,
        userSelection: state.selectedAnswers,
        correct: isCorrect,
        skipped: false,
        explanation: q.explanation
    });

    elements.checkBtn.classList.add('hidden');
    elements.continueBtn.classList.remove('hidden');
    elements.streakIndicator.textContent = state.streak;
}

function showFeedback(isCorrect, explanation) {
    elements.feedbackPanel.classList.remove('hidden');
    if (isCorrect) {
        elements.feedbackBadge.textContent = 'Correct';
        elements.feedbackBadge.className = 'badge correct';
    } else {
        elements.feedbackBadge.textContent = 'Incorrect';
        elements.feedbackBadge.className = 'badge incorrect';
    }
    elements.explanationText.textContent = explanation;
}

function skipQuestion() {
    audio.playClick();
    const q = state.activeQuestions[state.currentIndex];
    
    state.streak = 0;
    
    // Log skip
    state.sessionAnswers.push({
        questionIndex: state.currentIndex,
        question: q.question,
        code: q.code || null,
        type: q.type,
        options: q.options || null,
        correctAnswers: q.correct,
        userSelection: [],
        correct: false,
        skipped: true,
        explanation: q.explanation
    });

    advanceQuiz();
}

function advanceQuiz() {
    audio.playClick();
    if (state.currentIndex < state.activeQuestions.length - 1) {
        state.currentIndex++;
        renderQuestion();
    } else {
        finishAssessment();
    }
}

// ==========================================
// 10. ASSESSMENT COMPLETION & STATS
// ==========================================
function finishAssessment() {
    clearInterval(state.timerInterval);
    elements.footer.classList.add('hidden');
    switchScreen('result-screen');
    audio.playVictory();

    const percentage = Math.round((state.score / state.activeQuestions.length) * 100);

    // Save session logs to history
    const dateString = new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    const runRecord = {
        date: dateString,
        category: state.selectedCategory,
        score: state.score,
        totalQuestions: state.activeQuestions.length,
        percentage: percentage
    };
    state.history.push(runRecord);
    localStorage.setItem('devquery_history', JSON.stringify(state.history));

    // Render radial statistics percentage
    elements.scoreNumerator.textContent = state.score;
    elements.scoreDenominator.textContent = state.activeQuestions.length;
    
    // Set SVG stroke dash offset
    // 251.2 total stroke width representation
    const strokeOffset = 251.2 - (251.2 * (percentage / 100));
    elements.radialFill.style.strokeDashoffset = strokeOffset;

    // Display generic cards ratings
    if (percentage === 100) {
        elements.resultMessage.textContent = 'Flawless run! You fully understand the internal details.';
    } else if (percentage >= 80) {
        elements.resultMessage.textContent = 'Excellent performance. Keep challenging your limits!';
    } else if (percentage >= 50) {
        elements.resultMessage.textContent = 'Good attempt. Check the review cards below to master the core concepts.';
    } else {
        elements.resultMessage.textContent = 'Keep practicing. Engineering mastery is built step-by-step.';
    }

    elements.accuracyValue.textContent = `${percentage}%`;
    elements.streakValue.textContent = state.maxStreak;
    elements.durationValue.textContent = `${state.elapsedSeconds}s`;

    // Achievement badges logic
    elements.achievementsPanel.innerHTML = '';
    if (percentage === 100) {
        elements.achievementsPanel.innerHTML += '<div class="achievement-badge">🏆 Master Core</div>';
    }
    if (state.maxStreak >= 3) {
        elements.achievementsPanel.innerHTML += '<div class="achievement-badge">🔥 Streak Fire</div>';
    }
    if (state.elapsedSeconds < 30 && percentage >= 80) {
        elements.achievementsPanel.innerHTML += '<div class="achievement-badge">⚡ Rapid Execution</div>';
    }
    if (state.achievementsPanel.innerHTML === '') {
        elements.achievementsPanel.innerHTML = '<span style="font-size:0.8rem;color:var(--text-muted);">No bonus achievements unlocked this run.</span>';
    }
}

// ==========================================
// 11. DETAILED SESSION REVIEW
// ==========================================
function showReview() {
    audio.playClick();
    switchScreen('review-screen');
    elements.reviewTimeline.innerHTML = '';

    state.sessionAnswers.forEach((ans, idx) => {
        const card = document.createElement('div');
        let cardClass = 'review-card';
        let statusText = '';

        if (ans.skipped) {
            cardClass += ' skipped';
            statusText = 'SKIPPED';
        } else if (ans.correct) {
            cardClass += ' correct';
            statusText = 'CORRECT';
        } else {
            cardClass += ' incorrect';
            statusText = 'INCORRECT';
        }

        card.className = cardClass;

        // Render question details
        let codeHTML = '';
        if (ans.code) {
            codeHTML = `<div class="code-snippet-container" style="margin-bottom: 1rem;">${highlightCode(ans.code)}</div>`;
        }

        // Render selections block
        let userRepr = '';
        let correctRepr = '';

        if (ans.type === 'fib') {
            userRepr = ans.userSelection[0] || '<em>None</em>';
            correctRepr = ans.correctAnswers;
        } else if (ans.type === 'multi') {
            userRepr = ans.userSelection.length > 0 
                ? ans.userSelection.map(i => `${String.fromCharCode(65 + i)}: ${ans.options[i]}`).join('<br>')
                : '<em>None</em>';
            correctRepr = ans.correctAnswers.map(i => `${String.fromCharCode(65 + i)}: ${ans.options[i]}`).join('<br>');
        } else {
            const userIdx = ans.userSelection[0];
            userRepr = userIdx !== undefined 
                ? `${String.fromCharCode(65 + userIdx)}: ${ans.options[userIdx]}`
                : '<em>None</em>';
            correctRepr = `${String.fromCharCode(65 + ans.correctAnswers)}: ${ans.options[ans.correctAnswers]}`;
        }

        card.innerHTML = `
            <div class="review-card-header">
                <span class="review-num">QUESTION #${idx + 1}</span>
                <span class="badge ${ans.correct ? 'correct' : 'incorrect'}">${statusText}</span>
            </div>
            <h3>${ans.question}</h3>
            ${codeHTML}
            <div class="review-details-grid">
                <div class="review-column">
                    <div class="col-label">Your Selection</div>
                    <div class="col-content">${userRepr}</div>
                </div>
                <div class="review-column">
                    <div class="col-label">Correct Answer</div>
                    <div class="col-content">${correctRepr}</div>
                </div>
            </div>
            <div class="review-explanation">
                <strong>EXPLANATION:</strong> ${ans.explanation}
            </div>
        `;

        elements.reviewTimeline.appendChild(card);
    });
}

// ==========================================
// 12. CUSTOM QUIZ BUILDER HANDLERS
// ==========================================
function toggleCreatorOptionBuilder() {
    const type = document.getElementById('new-q-type').value;
    const container = document.getElementById('options-builder-container');

    if (type === 'fib') {
        container.style.display = 'none';
    } else {
        container.style.display = 'flex';
        // Reset builder list if empty
        if (elements.optionsInputsList.children.length === 0) {
            addOptionInputRow();
            addOptionInputRow();
        }
    }
}

function addOptionInputRow() {
    const list = elements.optionsInputsList;
    const rowIdx = list.children.length;

    const row = document.createElement('div');
    row.className = 'option-input-row';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `Option ${rowIdx + 1} text...`;
    input.required = true;

    const correctLabel = document.createElement('label');
    correctLabel.className = 'option-checkbox-label';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'option-correct-check';
    
    correctLabel.appendChild(checkbox);
    correctLabel.appendChild(document.createTextNode(' Correct'));

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-row-btn';
    deleteBtn.innerHTML = '🗑';
    deleteBtn.addEventListener('click', () => {
        row.remove();
        reindexOptionRows();
    });

    row.appendChild(input);
    row.appendChild(correctLabel);
    row.appendChild(deleteBtn);
    list.appendChild(row);

    audio.playClick();
}

function reindexOptionRows() {
    const rows = elements.optionsInputsList.querySelectorAll('.option-input-row');
    rows.forEach((row, i) => {
        row.querySelector('input[type="text"]').placeholder = `Option ${i + 1} text...`;
    });
}

function handleCustomQuestionSubmit(e) {
    e.preventDefault();

    const category = document.getElementById('new-q-category').value;
    const questionText = document.getElementById('new-q-text').value;
    const codeText = document.getElementById('new-q-code').value.trim();
    const type = document.getElementById('new-q-type').value;
    const explanation = document.getElementById('new-q-explanation').value;

    let newQuestion = {
        type: type,
        tag: category,
        category: category === 'Frontend' ? 'Frontend & CSS' : (category === 'Systems' ? 'Systems & Git' : 'JS & Core Engine'),
        question: questionText,
        code: codeText || null,
        explanation: explanation
    };

    if (type === 'fib') {
        const correctStr = prompt('Specify the exact text that matches the correct answer:');
        if (!correctStr || correctStr.trim() === '') {
            alert('A correct answer string is required for FIB questions!');
            return;
        }
        newQuestion.correct = correctStr.trim();
    } else {
        const rows = elements.optionsInputsList.querySelectorAll('.option-input-row');
        if (rows.length < 2) {
            alert('Please add at least 2 options for multiple/single choice questions!');
            return;
        }

        let options = [];
        let corrects = [];

        rows.forEach((row, idx) => {
            const val = row.querySelector('input[type="text"]').value;
            const check = row.querySelector('.option-correct-check').checked;
            options.push(val);
            if (check) {
                corrects.push(idx);
            }
        });

        if (corrects.length === 0) {
            alert('Please check at least one option as the correct answer!');
            return;
        }

        newQuestion.options = options;
        if (type === 'single') {
            if (corrects.length > 1) {
                alert('Single choice format supports exactly 1 correct answer. Only the first marked correct answer will be used.');
            }
            newQuestion.correct = corrects[0];
        } else {
            newQuestion.correct = corrects;
        }
    }

    state.customQuestions.push(newQuestion);
    localStorage.setItem('devquery_custom_questions', JSON.stringify(state.customQuestions));

    // Clear form inputs
    elements.creatorForm.reset();
    elements.optionsInputsList.innerHTML = '';
    toggleCreatorOptionBuilder();
    updateCategoriesCount();

    audio.playSuccess();
    alert('Custom question successfully created and loaded into the active quiz pool.');
    switchScreen('dashboard-screen');
}

function clearAllCustomQuestions() {
    if (confirm('Are you sure you want to delete all custom questions? This action is permanent.')) {
        state.customQuestions = [];
        localStorage.removeItem('devquery_custom_questions');
        updateCategoriesCount();
        audio.playFailure();
    }
}

// ==========================================
// 13. DATA HELPER FUNCTIONS
// ==========================================
function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// Start executing
init();