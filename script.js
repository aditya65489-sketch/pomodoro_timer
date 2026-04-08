const timerDisplay = document.getElementById('timer');
const statusDisplay = document.getElementById('status');

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

const WORK_MINUTES = 0.5;
const BREAK_MINUTES = 0.05;
const workDuration = WORK_MINUTES * 60; // 25 minutes in seconds
const breakDuration = BREAK_MINUTES * 60; // 5 minutes in seconds

let isWorkTime = true;
let timeLeft = workDuration;
let timer = null;

function updateTimerDisplay() {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function toggleStatus() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? workDuration : breakDuration;
    statusDisplay.textContent = isWorkTime ? 'Focus Time' : 'Break Time';
}

function startTimer() {
    //Added the bouncer back to prevent the Speed Bug!
    if (timer !== null) return; 

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            stopTimer();
            toggleStatus();
            updateTimerDisplay();
            startTimer();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
}

function pauseTimer() {
    stopTimer();
}

function resetTimer() {
    stopTimer();
    // Ensure Reset forces the app back to Work Mode
    isWorkTime = true; 
    timeLeft = workDuration;
    statusDisplay.textContent = 'Focus Time';
    updateTimerDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Run this once at the start to make sure the screen says 25:00
updateTimerDisplay();