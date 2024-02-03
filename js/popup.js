document.addEventListener("DOMContentLoaded", function () {
    // Function to close all tabs and open a new one
    function sendMessage(action, data, callback) {
        chrome.runtime.sendMessage({ action, data }, callback);
    }

    function updateCountdownDisplay() {
        sendMessage("getCountdown", null, function (response) {
            const countdownDisplay = document.getElementById("timerDisplay");
            console.log(response);
            if (response && response.countdown !== undefined) {
                countdownDisplay.innerText = `Timer: ${response.countdown} seconds`;
            } else {
                countdownDisplay.innerText = "Timer: N/A";
            }
        });
    }

    // Add a click event listener to the button
    document
        .getElementById("timerButton")
        .addEventListener("click", function () {
            // Set a timer for 5 seconds (you can adjust the time as needed)
            const timerSeconds = 5;

            sendMessage("startCountdown", { seconds: timerSeconds });

            document.getElementById("timerButton").disabled = true;
        });

    updateCountdownDisplay();

    setInterval(updateCountdownDisplay, 1000);
});
