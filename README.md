🍅 Project Presentation: Vanilla JS Pomodoro Timer

TOPIC 1: Project Overview & Tech Stack
•	The Goal: To build a productivity tool that seamlessly alternates between 25-minute focus sessions and 5-minute break sessions.

•	The Tech Stack: 100% Vanilla Web Technologies.

•	HTML5: For the structural skeleton.

•	CSS3 (Flexbox): For modern, responsive centering and UI styling.

•	Vanilla JavaScript (ES6+): For the core logic and DOM manipulation, specifically avoiding frameworks to demonstrate a deep understanding of browser APIs.

TOPIC 2: The Architecture (HTML & CSS)
"Before writing the logic, I built a clean, centralized user interface."

The Skeleton (HTML): I used semantic IDs (#timer, #startBtn, #pauseBtn) to create a bridge between the visual elements and the JavaScript engine.

The Styling (CSS Flexbox): To solve the classic problem of centering a div on a screen, I turned the body into a Flex container. By applying display: flex;, justify-content: center;, and align-items: center; with a height of 100vh, the timer perfectly snaps to the dead center of any screen size.

TOPIC 3: Application State (The Brain of the App)
"The most critical part of this application is State Management. At the top of my JavaScript file, I defined the 'truth' of the application."

JavaScript
const workDuration = 25 * 60; 
let isWorkTime = true;
let timeLeft = workDuration;
let timer = null; 
Why in seconds? I convert 25 minutes into pure seconds (25 * 60) because it is significantly easier for the computer to subtract 1 every second than to handle complex minute/second math on every tick.

The isWorkTime Flag: This boolean flag acts as a switch. If it is true, the app acts as a work timer. If false, it transforms into a break timer.

The timer = null safety: I explicitly declare the timer variable as null when the app boots up so the engine knows no background clocks are currently running.

TOPIC 4: Formatting the Data (The UI Bridge)
"Computers read math; humans read clocks. I built a function to translate raw seconds into a human-readable format."

JavaScript
function updateTimerDisplay() {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
}
The Math: I use Math.floor() to extract the whole minutes, and the Modulo operator (%) to find the exact remaining seconds.

The Polish (padStart): To prevent the clock from looking glitchy (like showing 25:9 instead of 25:09), I convert the numbers to Strings and use the ES6 padStart(2, '0') method. This forces the string to always be two digits long.

TOPIC 5: The Engine (setInterval)
"The heart of the application is the startTimer function, which uses the browser's asynchronous API."

JavaScript
function startTimer() {
    if (timer !== null) return; // The Bouncer

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            // Auto-Switch Logic
            stopTimer();
            toggleStatus();
            updateTimerDisplay();
            startTimer();
        }
    }, 1000);
}
The Bouncer: The very first line if (timer !== null) return; prevents the "Speed Bug." If a user clicks Start multiple times, it prevents the browser from spawning multiple overlapping background clocks.

The Background Loop: setInterval runs exactly once every 1,000 milliseconds (1 second). It subtracts a second, updates the screen, and checks if it hit zero.

The Auto-Switch: If time hits zero, the app automatically pauses, runs the toggleStatus() function to flip the isWorkTime boolean, updates the text to "Break Time", and immediately calls startTimer() to begin the break automatically.

TOPIC 6: The Triggers (Event Listeners)
"Finally, I wired the user interface to the logic."

JavaScript
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
I strictly separated the UI from the logic. Instead of putting onclick attributes inside the HTML, I used addEventListener at the bottom of my JavaScript file. This keeps the codebase modular, clean, and ready to scale.

