let startTime, timerInterval;
const hourlyRate = 25.00;
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let clockInCount = 0;

document.getElementById('clockInBtn').addEventListener('click', function() {
    startTime = new Date();
    localStorage.setItem('startTime', startTime.getTime());

    let today = weekDays[startTime.getDay()];
    clockInCount = (parseInt(localStorage.getItem(today + "ClockInCount")) || 0) + 1;
    
    if (clockInCount > 3) {
        alert("Maximum 3 clock-ins per day reached.");
        return;
    }

    // Set clock-in time
    let clockInTime = formatTime(startTime);
    localStorage.setItem(today + "In" + clockInCount, clockInTime);
    localStorage.setItem(today + "ClockInCount", clockInCount);

    // Update display
    document.getElementById('clockInTime').textContent = `Clocked in at: ${clockInTime}`;
    document.getElementById(today.toLowerCase() + "In" + clockInCount).textContent = clockInTime;

    this.disabled = true;
    document.getElementById('clockOutBtn').disabled = false;

    timerInterval = setInterval(updateTimer, 1000);
});

document.getElementById('clockOutBtn').addEventListener('click', function() {
    clearInterval(timerInterval);

    let now = new Date();
    let elapsedSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
    let workedHours = elapsedSeconds / 3600;
    let earnings = workedHours * hourlyRate;

    let today = weekDays[now.getDay()];
    let clockOutCount = parseInt(localStorage.getItem(today + "ClockInCount")) || 1;

    let clockOutTime = formatTime(now);
    localStorage.setItem(today + "Out" + clockOutCount, clockOutTime);

    localStorage.setItem(today + "Hours", (parseFloat(localStorage.getItem(today + "Hours") || 0) + workedHours).toFixed(2));
    localStorage.setItem(today + "Earnings", (parseFloat(localStorage.getItem(today + "Earnings") || 0) + earnings).toFixed(2));

    document.getElementById(today.toLowerCase() + "Out" + clockOutCount).textContent = clockOutTime;
    document.getElementById(today.toLowerCase() + "Hours").textContent = localStorage.getItem(today + "Hours");
    document.getElementById(today.toLowerCase() + "Earnings").textContent = `$${localStorage.getItem(today + "Earnings")}`;

    document.getElementById('timer').textContent = "Time: 00:00:00";
    document.getElementById('clockInTime').textContent = "Clocked in at: --:--";
    document.getElementById('earnings').textContent = "Earnings: $0.00";

    localStorage.removeItem('startTime');
    localStorage.removeItem('clockInDisplay');
    localStorage.removeItem('earnings');

    document.getElementById('clockInBtn').disabled = false;
    this.disabled = true;
});

function updateTimer() {
    let now = new Date();
    let elapsedSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
    
    let hours = Math.floor(elapsedSeconds / 3600);
    let minutes = String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2, '0');
    let seconds = String(elapsedSeconds % 60).padStart(2, '0');

    document.getElementById('timer').textContent = `Time: ${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;

    let earnings = (elapsedSeconds / 3600) * hourlyRate;
    document.getElementById('earnings').textContent = `Earnings: $${earnings.toFixed(2)}`;
    localStorage.setItem('earnings', earnings.toFixed(2));
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
}

// Restore state on page reload
window.onload = function() {
    let savedStartTime = localStorage.getItem('startTime');
    let savedClockInDisplay = localStorage.getItem('clockInDisplay');
    let savedEarnings = localStorage.getItem('earnings');

    if (savedStartTime) {
        startTime = new Date(parseInt(savedStartTime));
        document.getElementById('clockInBtn').disabled = true;
        document.getElementById('clockOutBtn').disabled = false;
        document.getElementById('clockInTime').textContent = `Clocked in at: ${savedClockInDisplay}`;
        document.getElementById('earnings').textContent = `Earnings: $${savedEarnings || '0.00'}`;
        timerInterval = setInterval(updateTimer, 1000);
    }

    // Restore weekly data
    weekDays.forEach(day => {
        let lowerDay = day.toLowerCase();
        let count = parseInt(localStorage.getItem(day + "ClockInCount")) || 0;

        for (let i = 1; i <= 3; i++) {
            document.getElementById(lowerDay + "In" + i).textContent = localStorage.getItem(day + "In" + i) || "--:--";
            document.getElementById(lowerDay + "Out" + i).textContent = localStorage.getItem(day + "Out" + i) || "--:--";
        }

        document.getElementById(lowerDay + "Hours").textContent = localStorage.getItem(day + "Hours") || "0";
        document.getElementById(lowerDay + "Earnings").textContent = `$${localStorage.getItem(day + "Earnings") || "0.00"}`;
    });
};


// RESET BUTTON
document.getElementById('resetBtn').addEventListener('click', function() {
    // Ask the user for confirmation
    let confirmReset = confirm("Are you sure you want to reset all data?");

    if (confirmReset) {
        // Reset all stored data
        localStorage.clear(); // Clears all data in localStorage

        // Reset all UI elements
        resetUI();

        alert("All data has been reset.");
    }
});

function resetUI() {
    // Reset the displayed clock-in times, clock-out times, hours, and earnings
    document.getElementById('clockInTime').textContent = "Clocked in at: --:--";
    document.getElementById('timer').textContent = "Time: 00:00:00";
    document.getElementById('earnings').textContent = "Earnings: $0.00";

    // Reset the weekly summary table
    weekDays.forEach(day => {
        let lowerDay = day.toLowerCase();
        for (let i = 1; i <= 3; i++) {
            document.getElementById(lowerDay + "In" + i).textContent = "--:--";
            document.getElementById(lowerDay + "Out" + i).textContent = "--:--";
        }

        document.getElementById(lowerDay + "Hours").textContent = "0";
        document.getElementById(lowerDay + "Earnings").textContent = "$0.00";
    });

    // Enable the clock-in button
    document.getElementById('clockInBtn').disabled = false;
    document.getElementById('clockOutBtn').disabled = true;
}

// CALENDAR DATE// This function gets the current date in the Month/Day format (e.g., 02/02)
function formatDate(date) {
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    let day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}`;
}

// Update the date next to each day of the week in real time
function updateDates() {
    weekDays.forEach(day => {
        let today = new Date();
        let currentDay = today.getDay();
        let lowerDay = day.toLowerCase();
        let dateElement = document.getElementById(lowerDay + "Date");

        if (currentDay === weekDays.indexOf(day)) {
            // If it's today, highlight or update with today's date
            dateElement.textContent = formatDate(today);
        } else {
            // For other days, show the respective date of the week (e.g., for Monday, show the upcoming Monday)
            let dayOffset = weekDays.indexOf(day) - currentDay;
            let futureDay = new Date(today);
            futureDay.setDate(today.getDate() + dayOffset);
            dateElement.textContent = formatDate(futureDay);
        }
    });
}

// Call updateDates on page load and set interval to update daily
window.onload = function() {
    updateDates(); // Set dates initially
    setInterval(updateDates, 86400000); // Update once every 24 hours (86400000ms)
};

