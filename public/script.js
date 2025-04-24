document.addEventListener('DOMContentLoaded', () => {
    const loadingMessages = [
        "Loading love... please wait 💖",
        "Spreading hearts across the web...",
        "Calculating the perfect proxy route...",
        "Warming up the love engine...",
        "Fetching your heart's desires...",
        "Encrypting love packets...",
        "Connecting to the love network...",
        "Almost there... love is in the air!",
        "Loading... don't forget to smile :)",
        "Proxying with passion and care..."
    ];

    const loadingElement = document.getElementById('loading-message');
    const iframe = document.getElementById('web');
    let messageIndex = 0;
    let intervalId = null;

    function showNextMessage() {
        loadingElement.textContent = loadingMessages[messageIndex];
        messageIndex = (messageIndex + 1) % loadingMessages.length;
    }

    function startLoadingMessages() {
        loadingElement.style.display = 'block';
        showNextMessage();
        intervalId = setInterval(showNextMessage, 4000);
    }

    function stopLoadingMessages() {
        loadingElement.style.display = 'none';
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    // Initially hide loading messages
    stopLoadingMessages();

    // Show loading messages when iframe starts loading a new page
    // We listen for navigation button clicks and input submission to trigger loading messages

    // Navigation buttons
    const backBtn = document.querySelector("button[onclick*='back']");
    const forwardBtn = document.querySelector("button[onclick*='forward']");
    const reloadBtn = document.querySelector("button[onclick*='reload']");
    const closeBtn = document.querySelector("button[onclick*='close']");
    const input = document.getElementById('search');

    function onNavigation() {
        startLoadingMessages();
    }

    if (backBtn) backBtn.addEventListener('click', onNavigation);
    if (forwardBtn) forwardBtn.addEventListener('click', onNavigation);
    if (reloadBtn) reloadBtn.addEventListener('click', onNavigation);
    if (closeBtn) closeBtn.addEventListener('click', () => {
        stopLoadingMessages();
    });

    // Input submission (Enter key)
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            startLoadingMessages();
        }
    });

    // Stop loading messages when iframe finishes loading
    iframe.addEventListener('load', () => {
        stopLoadingMessages();
    });
});
