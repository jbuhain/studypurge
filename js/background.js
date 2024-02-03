let countdown;
let countdownInterval;

function closeAllTabsAndOpenNewTab() {
    // Get all tabs
    chrome.tabs.query({}, function (tabs) {
        // Close each tab
        tabs.forEach(function (tab) {
            chrome.tabs.remove(tab.id);
        });

        // Open a new tab
        chrome.tabs.create({});
    });
}

function startCountdown(seconds) {
    countdown = seconds;
    console.log("1st part: initially says " + seconds + " seconds");
    // Show countdown
    countdownInterval = setInterval(function () {
        countdown--;
        console.log("Decrement to " + countdown + " seconds");
        // TODO: Store the countdown to seconds and update this in realtime and send this value to popup if they want.
        if (countdown <= 0) {
            // TODO: Implement/Test closeAllTabsAndOpenNewTab() 
            closeAllTabsAndOpenNewTab(); 
            clearCountdown();
        }
    }, 1000);
}

function clearCountdown() {
    clearInterval(countdownInterval);
    countdown = undefined;
}

function getCountdown() {
    return countdown;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "startCountdown") {
        console.log("Start Countdown");
        // console.log(request);
        startCountdown(request.data.seconds);
    } else if (request.action === "getCountdown") {
        // console.log("Get Countdown");
        sendResponse({ countdown: getCountdown() });
    } else if (request.action === "clearCountdown") { // for cancelling
        // console.log("Clear Countdown");
        clearCountdown();
    }
});
