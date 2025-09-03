// Bugsfree Studio IPTV - including animated Bugsfree Studio logo effect cycles

function $(q) { return document.querySelector(q); }
function $all(q) { return Array.from(document.querySelectorAll(q)); }
const DEFAULT_LOGO = 'https://bugsfreecdn.netlify.app/BugsfreeDefault/logo.png';
const PLAYER_POSTER = 'https://bugsfreecdn.netlify.app/BugsfreeDefault/player-poster.webp';

let currentChannelIndex = 0;
let isMuted = false;
let viewerCount = 0;
let scanlinesEnabled = true;
let currentBrightness = 100;
let currentContrast = 100;
let currentSaturation = 100;
let theme = localStorage.getItem('theme') || 'dark';
let playlistKey = "iptv_channels";
let playlistLoaded = false;

const demoPlaylist = [
    {
        src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        name: "Demo HLS Stream",
        number: "01",
        type: "hls",
        logo: DEFAULT_LOGO,
        favorite: false
    }
];

let channels = [];
let filteredChannels = [];
let history = JSON.parse(localStorage.getItem('iptv_history') || "[]");
let favorites = JSON.parse(localStorage.getItem('iptv_favorites') || "[]");

// Background Sync State
let backgroundSyncEnabled = false;
let backgroundSyncInterval = null;
let lastOnlineChannels = [];
let syncInProgress = false;

// ---- Helpers ----
function saveChannelsToStorage() {
    if (playlistLoaded) localStorage.setItem(playlistKey, JSON.stringify(channels));
    else localStorage.removeItem(playlistKey);
}
function loadChannelsFromStorage() {
    const stored = localStorage.getItem(playlistKey);
    if (stored) {
        try {
            channels = JSON.parse(stored);
            playlistLoaded = true;
        } catch (e) {
            channels = [];
            playlistLoaded = false;
        }
    } else {
        channels = [];
        playlistLoaded = false;
    }
}
function getStreamType(url) {
    if (!url) return "hls";
    if (url.endsWith('.m3u8')) return 'hls';
    if (url.endsWith('.mpd')) return 'dash';
    if (url.endsWith('.mp4')) return 'mp4';
    if (url.endsWith('.ts')) return 'ts';
    if (/\.mp4(\?|$)/.test(url)) return 'mp4';
    if (/\.ts(\?|$)/.test(url)) return 'ts';
    if (/\.m3u8(\?|$)/.test(url)) return 'hls';
    if (/\.mpd(\?|$)/.test(url)) return 'dash';
    return 'hls';
}
function getChannelLogo(ch) {
    return ch.logo ? ch.logo : DEFAULT_LOGO;
}
function setChannelLogo(ch) {
    $('#channel-logo').src = getChannelLogo(ch);
}
function saveHistory() {
    localStorage.setItem('iptv_history', JSON.stringify(history));
}
function saveFavorites() {
    localStorage.setItem('iptv_favorites', JSON.stringify(favorites));
}
function updateFavoritesListUI() {
    const list = $('#favorites-list');
    list.innerHTML = '';
    favorites.forEach((ch, i) => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${getChannelLogo(ch)}" class="playlist-logo" onerror="this.src='${DEFAULT_LOGO}'">
            <span class="playlist-name">${ch.name}</span>
            <button class="fav-remove" title="Unfavorite" data-index="${i}"><i data-feather="x"></i></button>`;
        li.querySelector('.fav-remove').onclick = e => {
            e.stopPropagation();
            favorites.splice(i, 1);
            saveFavorites();
            updateFavoritesListUI();
            renderChannelList();
        };
        list.appendChild(li);
    });
    feather.replace();
}
function updateHistoryListUI() {
    const list = $('#history-list');
    list.innerHTML = '';
    history.forEach((h, i) => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="history-name">${h.name || h.file || h.url}</span>
            <button class="history-resync" title="Resync" data-index="${i}"><i data-feather="refresh-ccw"></i></button>
            <button class="history-remove" title="Delete" data-index="${i}"><i data-feather="trash-2"></i></button>`;
        li.querySelector('.history-remove').onclick = () => {
            history.splice(i, 1);
            saveHistory();
            updateHistoryListUI();
        };
        li.querySelector('.history-resync').onclick = () => {
            if (h.type === 'file') handleFileReload(h.fileContent, h.file, true);
            else if (h.type === 'url') handleUrlReload(h.url, true);
        };
        list.appendChild(li);
    });
    feather.replace();
}
$('#history-delete-all').onclick = function() {
    history = [];
    saveHistory();
    updateHistoryListUI();
    channels = [];
    filteredChannels = [];
    playlistLoaded = false;
    lastOnlineChannels = [];
    saveChannelsToStorage();
    stopBackgroundSync();
    renderChannelList();
    playChannel(0, demoPlaylist);
};
$('#history-resync-all').onclick = function() {
    history.forEach(h => {
        if (h.type === 'file') handleFileReload(h.fileContent, h.file, true);
        else if (h.type === 'url') handleUrlReload(h.url, true);
    });
};

// ---- Background Sync Logic ----
function startBackgroundSync() {
    if (backgroundSyncInterval) clearInterval(backgroundSyncInterval);
    backgroundSyncEnabled = true;
    $('#background-sync-status').textContent = "ON";
    syncAndShowOnlineChannels();
    backgroundSyncInterval = setInterval(syncAndShowOnlineChannels, 120000); // every 2 min
}
function stopBackgroundSync() {
    backgroundSyncEnabled = false;
    $('#background-sync-status').textContent = "OFF";
    if (backgroundSyncInterval) clearInterval(backgroundSyncInterval);
    lastOnlineChannels = [];
    renderChannelList();
}
async function syncAndShowOnlineChannels() {
    if (syncInProgress) return;
    syncInProgress = true;
    let pl = playlistLoaded ? channels : demoPlaylist;
    let online = [];
    for (let ch of pl) {
        try {
            await Promise.race([
                fetch(ch.src, { method: 'HEAD', mode: 'no-cors' }),
                new Promise((_, rej) => setTimeout(rej, 2000))
            ]);
            online.push(ch);
        } catch (e) { /* offline */ }
    }
    lastOnlineChannels = online;
    renderChannelList(online);
    syncInProgress = false;
}
$('#background-sync-btn').onclick = function () {
    if (!backgroundSyncEnabled) startBackgroundSync();
    else stopBackgroundSync();
};

// ---- Channel List Rendering ----
function renderChannelList(list = null) {
    const channelList = $('#channel-list');
    let pl = (list || (backgroundSyncEnabled ? lastOnlineChannels : (filteredChannels.length ? filteredChannels : (playlistLoaded ? channels : demoPlaylist))));
    channelList.innerHTML = '';
    pl.forEach((ch, i) => {
        let running = (i === currentChannelIndex && !filteredChannels.length);
        const li = document.createElement('li');
        let favClass = (favorites.find(f => f.src === ch.src)) ? 'fav' : '';
        li.className = ((i === currentChannelIndex && !filteredChannels.length) ? 'active running' : (i === currentChannelIndex ? 'active' : ''));
        li.innerHTML = `<img src="${getChannelLogo(ch)}" class="playlist-logo" onerror="this.src='${DEFAULT_LOGO}'">
                        <span class="playlist-name">${ch.name}</span>
                        <span class="playlist-fav ${favClass}" title="Favorite"><i data-feather="star"></i></span>`;
        li.addEventListener('click', e => {
            if (e.target.closest('.playlist-fav')) {
                if (!favorites.find(f => f.src === ch.src)) {
                    favorites.push(ch);
                } else {
                    favorites = favorites.filter(f => f.src !== ch.src);
                }
                saveFavorites();
                renderChannelList();
                updateFavoritesListUI();
            } else {
                currentChannelIndex = i;
                playChannel(i, pl);
            }
        });
        channelList.appendChild(li);
    });
    feather.replace();
}

// ---- Playback ----
function getPlayerHtml(channel, muted) {
    return `<video id="video-frame" controls autoplay playsinline style="width:100%;height:100%;background:#000;" poster="${PLAYER_POSTER}" ${muted?'muted':''}></video>`;
}
function playChannel(index, showChannels = null) {
    let pl = (showChannels || (backgroundSyncEnabled ? lastOnlineChannels : (filteredChannels.length ? filteredChannels : (playlistLoaded ? channels : demoPlaylist))));
    if (index < 0 || index >= pl.length) return;
    currentChannelIndex = index;
    const channel = pl[index];
    const container = $('#video-container');
    container.innerHTML = getPlayerHtml(channel, isMuted);
    // Animated Bugsfree Studio logo
    const logoDiv = document.querySelector('.logo');
    if (logoDiv) {
        logoDiv.innerHTML = `<img id="channel-logo" src="${getChannelLogo(channel)}" alt="Channel Logo" onerror="this.src='${DEFAULT_LOGO}'">
        <span class="special-animated">Bugsfree Studio</span>`;
    }
    setChannelLogo(channel);

    const video = $('#video-frame');
    const src = channel.src;
    if (!video) return;
    if (channel.type === 'hls' || channel.type === 'ts') {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;
        } else {
            video.src = src;
        }
    } else if (channel.type === 'mp4' || channel.type === 'dash') {
        video.src = src;
    } else {
        video.src = src;
    }
    video.muted = isMuted;
    video.volume = isMuted ? 0 : 1;
    document.getElementById('current-channel').textContent = channel.number;
    document.getElementById('channel-name').textContent = channel.name;
    updateMuteIcons();
    renderChannelList(pl);
    // re-apply Bugsfree Studio logo animation (since logo is re-rendered)
    addBugsfreeStudioLogoAnimation();
}
function updateMuteIcons() {
    let icon = isMuted ? "volume-x" : "volume-2";
    $all("#main-mute-btn i, #sound-icon-btn i").forEach(el=>{
        el.setAttribute("data-feather", icon);
    });
    $('#sound-status').textContent = isMuted ? 'OFF' : 'ON';
    let iconDiv = $('#sound-icon-btn');
    if (isMuted) iconDiv && iconDiv.classList.add('muted');
    else iconDiv && iconDiv.classList.remove('muted');
    feather.replace();
}
function playByChannel(ch) {
    let pl = backgroundSyncEnabled ? lastOnlineChannels : (playlistLoaded ? channels : demoPlaylist);
    let idx = pl.findIndex(c => c.src === ch.src);
    if (idx >= 0) {
        currentChannelIndex = idx;
        playChannel(idx, pl);
    }
}
function nextChannel() {
    let pl = backgroundSyncEnabled ? lastOnlineChannels : (filteredChannels.length ? filteredChannels : (playlistLoaded ? channels : demoPlaylist));
    currentChannelIndex = (currentChannelIndex + 1) % pl.length;
    playChannel(currentChannelIndex, pl);
}
function prevChannel() {
    let pl = backgroundSyncEnabled ? lastOnlineChannels : (filteredChannels.length ? filteredChannels : (playlistLoaded ? channels : demoPlaylist));
    currentChannelIndex = (currentChannelIndex - 1 + pl.length) % pl.length;
    playChannel(currentChannelIndex, pl);
}
function toggleMute() {
    isMuted = !isMuted;
    let pl = backgroundSyncEnabled ? lastOnlineChannels : (filteredChannels.length ? filteredChannels : (playlistLoaded ? channels : demoPlaylist));
    playChannel(currentChannelIndex, pl);
}
function toggleScanlines() {
    scanlinesEnabled = !scanlinesEnabled;
    const scanlines = $('.scanlines');
    const status = $('#scanlines-status');
    scanlines.style.display = scanlinesEnabled ? 'block' : 'none';
    status.textContent = scanlinesEnabled ? 'ON' : 'OFF';
}
function adjustBrightness(val) { currentBrightness = val; updateVideoFilters(); }
function adjustContrast(val) { currentContrast = val; updateVideoFilters(); }
function adjustSaturation(val) { currentSaturation = val; updateVideoFilters(); }
function updateVideoFilters() {
    const videoContainer = $('.video-container');
    videoContainer.style.filter = `brightness(${currentBrightness/100}) contrast(${currentContrast/100}) saturate(${currentSaturation/100})`;
}

// ---- Playlist File Parsing ----
function parseJson(content) {
    let arr = [];
    try {
        const data = JSON.parse(content);
        let chNum = 1;
        let channelsArr = [];
        if (Array.isArray(data)) {
            channelsArr = data;
        } else if (typeof data === 'object' && Array.isArray(data.channels)) {
            channelsArr = data.channels;
        } else if (typeof data === 'object' && typeof data.channels === 'object' && data.channels !== null) {
            for (let group in data.channels) {
                if (Array.isArray(data.channels[group])) {
                    data.channels[group].forEach(ch => channelsArr.push(ch));
                }
            }
        }
        channelsArr.forEach(ch => {
            let url = ch.src || ch.url;
            if (!url) return;
            arr.push({
                src: url,
                name: ch.name || `JSON Channel ${chNum}`,
                number: ch.number || String(chNum).padStart(2, '0'),
                type: ch.type || getStreamType(url),
                logo: ch.logo || DEFAULT_LOGO,
                favorite: false
            });
            chNum++;
        });
    } catch (e) { }
    return arr;
}
function parseM3u(content) {
    const lines = content.split('\n');
    let out = [];
    let lastInf = null;
    let chNum = 1;
    for(let i=0; i<lines.length; ++i) {
        let l = lines[i].trim();
        if (l.startsWith('#EXTINF')) {
            lastInf = l;
        } else if (l && !l.startsWith('#')) {
            let nameMatch = /,(.+)$/.exec(lastInf || '');
            let logoMatch = /tvg-logo="([^"]+)"/.exec(lastInf || '');
            let name = nameMatch ? nameMatch[1].trim() : `M3U Channel ${chNum}`;
            let url = l;
            let type = getStreamType(url);
            let logo = logoMatch ? logoMatch[1] : DEFAULT_LOGO;
            out.push({
                type,
                src: url,
                name,
                number: String(chNum).padStart(2, '0'),
                logo,
                favorite: false
            });
            chNum++;
            lastInf = null;
        }
    }
    return out;
}
function parseTxt(content) {
    let arr = [];
    let chNum = 1;
    content.split('\n').forEach(line => {
        let l = line.trim();
        if (!l || l.startsWith('#')) return;
        let [url, name] = l.split('|');
        url = url.trim();
        let type = getStreamType(url);
        arr.push({
            src: url,
            name: name ? name.trim() : `TXT Channel ${chNum}`,
            number: String(chNum).padStart(2, '0'),
            type,
            logo: DEFAULT_LOGO,
            favorite: false
        });
        chNum++;
    });
    return arr;
}
function parseCustom(content) {
    let arr = parseTxt(content);
    if (!arr.length) arr = parseM3u(content);
    return arr;
}
function handleFileReload(content, file, historyOnly) {
    let chs = [];
    if (file.endsWith('.json')) chs = parseJson(content);
    else if (file.endsWith('.txt')) chs = parseTxt(content);
    else if (file.endsWith('.m3u') || file.endsWith('.m3u8')) chs = parseM3u(content);
    else chs = parseCustom(content);
    if (chs.length && !historyOnly) {
        channels = chs;
        playlistLoaded = true;
        filteredChannels = [];
        saveChannelsToStorage();
        renderChannelList();
        playChannel(0, channels);
    }
}
function handleUrlReload(url, historyOnly) {
    fetch(url)
        .then(res => res.text())
        .then(txt => {
            let chs = [];
            if (url.endsWith('.json')) chs = parseJson(txt);
            else if (url.endsWith('.txt')) chs = parseTxt(txt);
            else if (url.endsWith('.m3u') || url.endsWith('.m3u8')) chs = parseM3u(txt);
            else chs = parseCustom(txt);
            if (chs.length && !historyOnly) {
                channels = chs;
                playlistLoaded = true;
                filteredChannels = [];
                saveChannelsToStorage();
                renderChannelList();
                playChannel(0, channels);
            }
        });
}

// ---- Upload Events ----
$('#m3u-file-input').addEventListener('change', function(evt) {
    const file = evt.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        let chs = [];
        const lowName = file.name.toLowerCase();
        if (lowName.endsWith('.json')) {
            chs = parseJson(e.target.result);
        } else if (lowName.endsWith('.txt')) {
            chs = parseTxt(e.target.result);
        } else if (lowName.endsWith('.m3u') || lowName.endsWith('.m3u8')) {
            chs = parseM3u(e.target.result);
        } else {
            chs = parseCustom(e.target.result);
        }
        if (chs.length) {
            channels = chs;
            playlistLoaded = true;
            filteredChannels = [];
            saveChannelsToStorage();
            renderChannelList();
            playChannel(0, channels);
            history.push({type:'file', name:file.name, file:file.name, fileContent:e.target.result, time:Date.now()});
            saveHistory();
            updateHistoryListUI();
            $('#m3u-upload-form').style.display = "none";
            $('#m3u-url-form').style.display = "none";
        } else {
            alert('No valid channels found in uploaded file.');
        }
        evt.target.value = '';
    };
    reader.readAsText(file);
});
$('#m3u-upload-form').addEventListener('submit', function(evt) {
    evt.preventDefault();
});
$('#m3u-url-form').addEventListener('submit', function(evt) {
    evt.preventDefault();
    const url = $('#m3u-url-input').value.trim();
    if (!url) return;
    fetch(url)
        .then(res => res.text())
        .then(txt => {
            let chs = [];
            const lurl = url.toLowerCase();
            if (lurl.endsWith('.json')) chs = parseJson(txt);
            else if (lurl.endsWith('.txt')) chs = parseTxt(txt);
            else if (lurl.endsWith('.m3u') || lurl.endsWith('.m3u8')) chs = parseM3u(txt);
            else chs = parseCustom(txt);
            if(chs.length) {
                channels = chs;
                playlistLoaded = true;
                filteredChannels = [];
                saveChannelsToStorage();
                renderChannelList();
                playChannel(0, channels);
                history.push({type:'url', name:url.split('/').pop(), url, time:Date.now()});
                saveHistory();
                updateHistoryListUI();
                $('#m3u-upload-form').style.display = "none";
                $('#m3u-url-form').style.display = "none";
            } else {
                alert('No valid channels found in the playlist URL.');
            }
        })
        .catch(() => alert('Failed to load playlist from URL.'));
});
/*$('#single-channel-form').addEventListener('submit', function(evt) {
    evt.preventDefault();
    const url = $('#single-channel-url').value.trim();
    const name = $('#single-channel-name').value.trim();
    const logo = $('#single-channel-logo').value.trim() || DEFAULT_LOGO;
    if (!url) return;
    let type = getStreamType(url);
    let ch = {
        type,
        src: url,
        name: name || `Channel ${channels.length+1}`,
        number: String(channels.length+1).padStart(2, '0'),
        logo,
        favorite: false
    };
    if (!playlistLoaded) {
        channels = [ch];
        playlistLoaded = true;
    } else {
        channels.push(ch);
    }
    filteredChannels = [];
    saveChannelsToStorage();
    renderChannelList();
    playChannel(0, channels);
    $('#single-channel-url').value = '';
    $('#single-channel-name').value = '';
    $('#single-channel-logo').value = '';
});*/

// ---- Tabs ----
$all('.tab-btn').forEach(btn => {
    btn.onclick = function() {
        $all('.tab-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        let tab = btn.getAttribute('data-tab');
        $all('.tab-content').forEach(sec => {
            sec.classList.toggle('active', sec.classList.contains('tab-'+tab));
        });
        if(tab === "upload") {
            $('#m3u-upload-form').style.display = "";
            $('#m3u-url-form').style.display = "";
        }
    }
});

// ---- Settings ----
$('#theme-toggle').onclick = function() {
    theme = (theme === 'dark') ? 'light' : 'dark';
    document.body.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
    updateThemeIcon();
};
function updateThemeIcon() {
    let iconEl = $('#theme-toggle i');
    if (iconEl) {
        iconEl.setAttribute('data-feather', theme === 'light' ? 'moon' : 'sun');
        feather.replace();
    }
}
$('#report-issue-btn').onclick = function() {
    window.open('https://github.com/bugsfreeweb/webtv/issues', '_blank');
};
$('#sidebar-exit-btn').onclick = function() {
    $('.left-panel').style.display = 'none';
};
function toggleSidebar() {
    const sidebar = $('.left-panel');
    sidebar.style.display = (sidebar.style.display === 'none') ? 'flex' : 'none';
}
$('#mute-btn').onclick = toggleMute;
$('#main-mute-btn').onclick = toggleMute;
$('#scanlines-btn').onclick = toggleScanlines;
$('#brightness-slider').oninput = e => adjustBrightness(e.target.value);
$('#contrast-slider').oninput = e => adjustContrast(e.target.value);
$('#saturation-slider').oninput = e => adjustSaturation(e.target.value);

// Attach JS click handlers for header buttons (no inline JS)
const nextBtn = document.getElementById('next-channel-btn');
if(nextBtn) nextBtn.onclick = nextChannel;
const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
if(sidebarToggleBtn) sidebarToggleBtn.onclick = toggleSidebar;

// ---- Keyboard & Gesture ----
document.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName === "INPUT") return;
    switch(e.key) {
        case 'ArrowUp':
            prevChannel();
            break;
        case 'ArrowDown':
            nextChannel();
            break;
        case 'ArrowLeft':
            adjustVolume(-0.05);
            break;
        case 'ArrowRight':
            adjustVolume(0.05);
            break;
        case ' ':
            e.preventDefault();
            toggleMute();
            break;
        case 'Enter':
            nextChannel();
            break;
        case 'Escape':
            toggleSidebar();
            break;
    }
});
function adjustVolume(diff) {
    const video = $('#video-frame');
    if (video) {
        let v = video.volume + diff;
        v = Math.max(0, Math.min(1, v));
        video.volume = v;
        isMuted = (v === 0);
        updateMuteIcons();
    }
}
let touchStartX = 0, touchStartY = 0, touchEndX = 0, touchEndY = 0;
function handleGesture() {
    let dx = touchEndX - touchStartX;
    let dy = touchEndY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 50) prevChannel();
        else if (dx < -50) nextChannel();
    } else {
        const video = $('#video-frame');
        if (!video) return;
        if (dy < -30) adjustVolume(0.1);
        else if (dy > 30) adjustVolume(-0.1);
    }
}
document.addEventListener('touchstart', function(e){
    if (e.touches.length !== 1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, {passive:true});
document.addEventListener('touchend', function(e){
    if (e.changedTouches.length !== 1) return;
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    handleGesture();
}, {passive:true});

// ---- UI: Time, Viewer, Analysis ----
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
    });
    $('#current-time').textContent = timeString;
}
function updateViewerCount() {
    viewerCount = Math.floor(Math.random() * 100) + 1;
    $('#viewer-count').textContent = viewerCount;
}
let analysisChart = null;
let lastAnalysis = { online: [], offline: [] };
function updateAnalysis(sync = false) {
    let pl = playlistLoaded ? channels : demoPlaylist;
    const total = pl.length;
    let online = [];
    let offline = [];
    if (total === 0) {
        $('#analysis-total').textContent = "0";
        $('#analysis-online').textContent = "0";
        $('#analysis-offline').textContent = "0";
        if (analysisChart) {
            analysisChart.data.datasets[0].data = [0, 0];
            analysisChart.update();
        }
        return;
    }
    if (!sync && lastAnalysis.online.length + lastAnalysis.offline.length === total) {
        online = lastAnalysis.online;
        offline = lastAnalysis.offline;
    } else {
        online = [];
        offline = [];
        let checked = 0;
        $('#analysis-total').textContent = total;
        $('#analysis-online').textContent = "Checking...";
        $('#analysis-offline').textContent = "Checking...";
        pl.forEach((ch, i) => {
            let timeout = setTimeout(() => {
                offline.push(ch);
                checked++;
                updateA();
            }, 2000);
            fetch(ch.src, { method: 'HEAD', mode:"no-cors" }).then(()=> {
                clearTimeout(timeout);
                online.push(ch);
                checked++;
                updateA();
            }).catch(()=> {
                clearTimeout(timeout);
                offline.push(ch);
                checked++;
                updateA();
            });
        });
        function updateA() {
            $('#analysis-online').textContent = online.length;
            $('#analysis-offline').textContent = offline.length;
            if (checked === total) {
                lastAnalysis = { online, offline };
                if (analysisChart) {
                    analysisChart.data.datasets[0].data = [online.length, offline.length];
                    analysisChart.update();
                } else {
                    createChart(online.length, offline.length);
                }
            }
        }
        return;
    }
    $('#analysis-total').textContent = total;
    $('#analysis-online').textContent = online.length;
    $('#analysis-offline').textContent = offline.length;
    if (!analysisChart) {
        createChart(online.length, offline.length);
    } else {
        analysisChart.data.datasets[0].data = [online.length, offline.length];
        analysisChart.update();
    }
}
function createChart(online, offline) {
    analysisChart = new Chart($('#analysis-chart').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Online', 'Offline'],
            datasets: [{
                data: [online, offline],
                backgroundColor: ['#18A999','#FF5E5E'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: "70%",
            plugins: { legend: { display: false } }
        }
    });
}
$('#analysis-sync-btn').onclick = function() {
    lastAnalysis = {online:[], offline:[]};
    updateAnalysis(true);
};
$('#analysis-total-btn').onclick = function() {
    filteredChannels = [];
    renderChannelList();
};
$('#analysis-online-btn').onclick = function() {
    if (lastAnalysis.online.length) {
        filteredChannels = lastAnalysis.online;
        renderChannelList(filteredChannels);
    }
};
$('#analysis-offline-btn').onclick = function() {
    if (lastAnalysis.offline.length) {
        filteredChannels = lastAnalysis.offline;
        renderChannelList(filteredChannels);
    }
};

// ---- Bugsfree Studio: Startup Animation Sequence and Random Cycles ----
function bfsLogoAnimCycle() {
    const bfs = document.querySelector('.special-animated');
    if (!bfs) return;
    bfs.classList.remove('bfs-glow-anim','bfs-pulse-anim','bfs-shine-anim','bfs-jump-anim');
    // Randomly pick one effect, weighted so 'bfs-glow-anim' is most frequent
    const effects = [
        ...Array(5).fill('bfs-glow-anim'),
        'bfs-pulse-anim','bfs-pulse-anim','bfs-shine-anim','bfs-jump-anim'
    ];
    const effect = effects[Math.floor(Math.random()*effects.length)];
    bfs.classList.add(effect);
    // If it's a one-off (pulse, shine, jump), remove after anim ends
    if (['bfs-pulse-anim','bfs-shine-anim','bfs-jump-anim'].includes(effect)) {
        const dur = effect==='bfs-pulse-anim'?700:effect==='bfs-jump-anim'?700:1400;
        setTimeout(() => {
            bfs.classList.remove(effect);
            bfs.classList.add('bfs-glow-anim');
        }, dur);
    }
}

function addBugsfreeStudioLogoAnimation() {
    const bfs = document.querySelector('.special-animated');
    if (!bfs) return;
    bfs.classList.add('bfs-intro-anim');
    setTimeout(() => {
        bfs.classList.remove('bfs-intro-anim');
        bfs.classList.add('bfs-glow-anim');
        setInterval(bfsLogoAnimCycle, 7000);
    }, 950);
}

// ---- Init ----
function initialize() {
    if (theme === 'light') document.body.classList.add('light');
    updateThemeIcon();
    loadChannelsFromStorage();
    renderChannelList();
    updateFavoritesListUI();
    updateHistoryListUI();
    updateTime();
    setInterval(updateTime, 1000);
    updateViewerCount();
    setInterval(updateViewerCount, 30000);
    setTimeout(()=>updateAnalysis(), 300);
    playChannel(0, playlistLoaded ? channels : demoPlaylist);
    feather.replace();
    $('#background-sync-status').textContent = backgroundSyncEnabled ? "ON" : "OFF";
    $('#scanlines-status').textContent = scanlinesEnabled ? 'ON' : 'OFF';
    $('.scanlines').style.display = scanlinesEnabled ? 'block' : 'none';
    document.body.style.overflowX = "hidden";
    $all('.left-panel, .channel-list, .history-list, .favorites-list, .channel-list-box').forEach(el => {
        if (el) el.style.overflowX = "hidden";
    });
    addBugsfreeStudioLogoAnimation();
}
window.addEventListener('storage', function(e) {
    if (e.key === playlistKey) {
        loadChannelsFromStorage();
        renderChannelList();
    }
});
window.addEventListener('DOMContentLoaded', initialize);