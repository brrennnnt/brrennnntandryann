document.addEventListener("DOMContentLoaded", function() {
    // Function to format the time
    function formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return `${hours}:${minutes}:${seconds} ${ampm}`;
    }

    // Function to update the time
    function updateTime() {
        const caboOffset = -7; // Cabo San Lucas is UTC-7
        const localTime = new Date();
        const utcTime = localTime.getTime() + (localTime.getTimezoneOffset() * 60000);
        const caboTime = new Date(utcTime + (3600000 * caboOffset));
        document.getElementById("time").innerText = formatTime(caboTime);
    }

    // Update the time every second
    setInterval(updateTime, 1000);

    // Initial call to display the time immediately
    updateTime();
});
