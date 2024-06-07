// Array of blocked IP addresses
const blockedIPs = [
    "0.0.0.0", // Add your blocked IP addresses here
    "10.0.0.1"
];

// Function to check if the current IP is blocked
function isBlockedIP(ip) {
    return blockedIPs.includes(ip);
}

// Function to get the user's IP address
function getUserIP() {
    return fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(error => console.error(error));
}

// Block access if the user's IP is in the blockedIPs array
getUserIP().then(ip => {
    if (isBlockedIP(ip)) {
        window.location.href = "../banned.html"; // Redirect to access denied page
    }
});
