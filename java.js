let timerInterval;
let startTime;
let elapsedTime = 0;
let running = false;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const lapResetButton = document.getElementById('lapReset');
const lapTimesContainer = document.getElementById('lapTimes');

function startStop() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        running = true;
        startStopButton.textContent = 'Stop';
    }
}

function updateTime() {
    const now = Date.now();
    elapsedTime = now - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const date = new Date(time);
    return date.toISOString().substr(11, 11);
}

function lapReset() {
    if (running) {
        const lapTime = formatTime(elapsedTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapTimesContainer.children.length + 1}: ${lapTime}`;
        lapTimesContainer.appendChild(lapElement);
    } else {
        display.textContent = '00:00:00.00';
        elapsedTime = 0;
        lapTimesContainer.innerHTML = '';
    }
}

startStopButton.addEventListener('click', startStop);
lapResetButton.addEventListener('click', lapReset);
