// Popup blocker script
(function() {
    // Whitelisted URLs
    const whitelist = [
        "https://discord.gg/bosskingdom-comeback-1090560322760347649"
    ];

    // Function to block popups
    function blockPopups(event) {
        // Prevent the default action of opening a new window
        event.preventDefault();
        // Log a message indicating that a popup was blocked
        console.log("Popup blocked!");
    }

    // Add event listener to intercept all click events on the document
    document.addEventListener("click", function(event) {
        // Check if the clicked element is a link with a target attribute set to _blank (indicating it will open in a new window)
        if (event.target.tagName === "A" && event.target.getAttribute("target") === "_blank") {
            // If it is, check if the URL is in the whitelist
            if (!whitelist.includes(event.target.href)) {
                // If not in the whitelist, block the popup
                blockPopups(event);
            }
        }

        // Check if the clicked element is an iframe
        if (event.target.tagName === "IFRAME") {
            // Block the iframe
            blockPopups(event);
        }
    });

    // Block the entire site by preventing the contextmenu event
    document.addEventListener("contextmenu", blockPopups);
})();
