let startTime, updatedTime, difference = 0, tInterval;
let running = false;
let lapCounter = 0;

const startPauseBtn = document.getElementById('start-pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const stopwatch = document.getElementById('stopwatch');
const laps = document.getElementById('laps');
const themeSwitch = document.getElementById('theme-switch');
const themeLink = document.getElementById('theme-link');

// Function to start or pause the stopwatch
function startPauseTimer() {
    if (!running && difference === 0) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 10);
        running = true;
        startPauseBtn.textContent = "⏸";
    } else if (running) {
        clearInterval(tInterval);
        running = false;
        startPauseBtn.textContent = "⏵";
    } else if (!running && difference > 0) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 10);
        running = true;
        startPauseBtn.textContent = "⏸";
    }
}

// Function to reset the stopwatch
function stopTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    stopwatch.innerHTML = "00:00:00";
    laps.innerHTML = "";
    lapCounter = 0;
    laps.style.display = "none";
    startPauseBtn.textContent = "⏵";
}

// Function to record a lap
function lapTimer() {
    if (running) {
        lapCounter++;
        const lapTime = stopwatch.innerHTML;
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapElement);
        laps.style.display = "block";
    }
}

// Function to update the stopwatch display
function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((difference % (1000 * 60)) / 1000);
    const millis = Math.floor((difference % 1000) / 10);
    stopwatch.innerHTML = 
        (mins < 10 ? "0" + mins : mins) + ":" +
        (secs < 10 ? "0" + secs : secs) + ":" +
        (millis < 10 ? "0" + millis : millis);
}


// Function to switch between light and dark themes
themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        themeLink.setAttribute('href', 'light-theme.css');
    } else {
        themeLink.setAttribute('href', 'dark-theme.css');
    }
});



// Add event listeners
startPauseBtn.addEventListener('click', startPauseTimer);
resetBtn.addEventListener('click', stopTimer);
lapBtn.addEventListener('click', lapTimer);