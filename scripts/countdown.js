// countdown.js

function updateCountdown() {
    // Get the current date and time
    const now = new Date();
    // Set the target date to August 20th of the current year
    const targetDate = new Date(now.getFullYear(), 7, 20); // Months are 0-indexed (7 = August)

    // If August 20th has already passed this year, set the target to next year
    if (now > targetDate) {
        targetDate.setFullYear(now.getFullYear() + 1);
    }

    // Calculate the remaining time
    const timeDiff = targetDate - now;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    // Display the countdown in the footer
    document.getElementById('countdown').textContent = 
        `y | ${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Update the countdown every second
    setTimeout(updateCountdown, 1000);
}

// Initial call to start the countdown
updateCountdown();
