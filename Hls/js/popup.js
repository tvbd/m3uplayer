// Array of iframe URLs to block popups from
const blockedUrls = [
    "https://vidsrc.to/",
    "https://vidsrc.me/",
    "https://show2embed/",
    "https://autoembed.co/",
    "https://multiembed.mov/",
    "https://play.123embed.net/",
    "https://www.2embed.cc/",
    "https://www.2embed.stream/",
    "https://www.primewire.tf/",
    "https://embed.smashystream.com/",
    "https://8-stream.vercel.app/",
    "https://2embed.pro/",
    "https://vidsrc.pro/",
    "https://vidsrc.xyz/",
    "https://flixon.click/",
    "https://vidsrc.in/",
    "https://vidsrc.pm/",
    "https://2embed.org/",
    "https://vidsrc.icu/",
    "https://vidsrc.xyz/",
    "https://databasegdriveplayer.xyz/",
    "https://moviehab.to/",
    "https://api.123movie.cc/",
    "https://player.autoembed.cc/",
    "https://embed.warezcdn.com/",
    "https://new-nunflix-player.vercel.app/",
    "https://watch.streamflix.one/",
    "https://blackvid.space/",
    "https://superflixapi.top/",
    "https://api.slidemovies.org/",
    "https://moviesapi.club/",
    "https://vip.filmclub.tv/",
    "https://mostream.us/",
    "https://vidsrc.top/",
];

// Function to block popups
function blockPopups() {
    // Block popups for main URL
    window.open = function() {
        console.log("Popup blocked in main window");
        return null;
    };

    // Block popups for iframe URLs
    document.querySelectorAll('iframe').forEach(iframe => {
        const iframeUrl = iframe.src;
        if (blockedUrls.some(url => iframeUrl.includes(url))) {
            iframe.onload = function() {
                try {
                    const iframeWindow = iframe.contentWindow;
                    if (iframeWindow) {
                        iframeWindow.eval(`
                            window.open = function() {
                                console.log("Popup blocked in iframe");
                                return null;
                            };
                        `);
                    }
                } catch (e) {
                    console.error("Error blocking popup in iframe:", e);
                }
            };
        }
    });
}

// Call the blockPopups function
blockPopups();
