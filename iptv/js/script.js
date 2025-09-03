let channels = [];
let activeChannels = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let uploadHistory = JSON.parse(localStorage.getItem('uploadHistory')) || [];
let currentChannelIndex = -1;
let hlsInstance = null;
let dashInstance = null;
let showFavoritesOnly = false;
let channelFilter = 'all';
let showingHistory = false;
let selectedCategory = '';
const videoPlayer = document.getElementById('videoPlayer');
const sidebar = document.getElementById('sidebar');
const channelList = document.getElementById('channelList');
const popupOverlay = document.getElementById('popupOverlay');
const historyPopup = document.getElementById('historyPopup');
const epgPopup = document.getElementById('epgPopup');
const multiPlaylistSelect = document.getElementById('multiPlaylistSelect');
const historyList = document.getElementById('historyList');
const epgContent = document.getElementById('epgContent');
const urlInput = document.getElementById('urlInput');
const fileInput = document.getElementById('fileInput');
const qualitySelector = document.getElementById('qualitySelector');
const sleepTimer = document.getElementById('sleepTimer');
const controls = document.getElementById('controls');
const totalChannelsSpan = document.getElementById('totalChannels');
const onlineChannelsSpan = document.getElementById('onlineChannels');
const offlineChannelsSpan = document.getElementById('offlineChannels');
const searchBar = document.getElementById('searchBar');
const tvFrame = document.getElementById('tvFrame');
const datetime = document.getElementById('datetime');
const defaultPlaylistUrl = 'https://iptv-org.github.io/iptv/countries/us.m3u';
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingProgress = document.getElementById('loadingProgress');
const categoryFilter = document.getElementById('categoryFilter');
const progressCanvas = document.getElementById('progressCanvas');

const drmConfig = {
    widevine: { serverURL: 'https://example.com/widevine/license' },
    playready: { serverURL: 'https://example.com/playready/license' }
};

const themes = ['light', 'dark', 'ocean-blue', 'emerald-green', 'slate-gray'];
let currentThemeIndex = themes.indexOf(localStorage.getItem('theme')) || 0;

function drawProgressCircle(progress) {
    const ctx = progressCanvas.getContext('2d');
    ctx.clearRect(0, 0, 100, 100);
    ctx.beginPath();
    ctx.arc(50, 50, 45, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * (progress / 100));
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(50, 50, 45, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.stroke();
    loadingProgress.textContent = `${Math.round(progress)}%`;
}

document.getElementById('sidebarToggleBtn').addEventListener('click', toggleSidebar);
document.getElementById('favoritesToggleBtn').addEventListener('click', toggleFavorites);
document.getElementById('themeCycleBtn').addEventListener('click', cycleTheme);
document.getElementById('fullscreenToggleBtn').addEventListener('click', toggleFullscreen);
document.getElementById('pipToggleBtn').addEventListener('click', togglePiP);
document.getElementById('epgShowBtn').addEventListener('click', showEPG);
document.getElementById('loadUrlBtn').addEventListener('click', () => addM3UList(urlInput.value.trim()));
document.getElementById('closePopupBtn').addEventListener('click', hidePopup);
document.getElementById('closeEpgPopupBtn').addEventListener('click', hidePopup);
document.getElementById('showAllChannelsBtn').addEventListener('click', showAllChannels);
document.getElementById('showOnlineChannelsBtn').addEventListener('click', showOnlineChannels);
document.getElementById('showOfflineChannelsBtn').addEventListener('click', showOfflineChannels);
urlInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addM3UList(urlInput.value.trim()); });
fileInput.addEventListener('change', handleFileUpload);
qualitySelector.addEventListener('change', changeQuality);
sleepTimer.addEventListener('change', setSleepTimer);
categoryFilter.addEventListener('change', filterByCategory);
searchBar.addEventListener('input', filterChannels);
multiPlaylistSelect.addEventListener('change', loadSelectedPlaylist);
document.getElementById('defaultPlaylistToggle').addEventListener('change', toggleDefaultPlaylist);
document.getElementById('historyToggle').addEventListener('change', toggleHistory);

function toggleSidebar() {
    sidebar.classList.toggle('active');
}

function toggleHistory() {
    showingHistory = document.getElementById('historyToggle').checked;
    if (showingHistory) {
        displayHistory();
    } else {
        displayChannels();
    }
}

function cycleTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const theme = themes[currentThemeIndex];
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeCycleBtn').querySelector('svg');
    themeIcon.innerHTML = theme === 'dark' ? 
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-3.16 19.4c.6.12 1.21.2 1.84.2 4.41 0 8-3.59 8-8a10 10 0 00-14.84-8.36 9.91 9.91 0 007.16-2.24z"/></svg>' :
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m16.36-6.36l-1.41 1.41M7.05 17.05l-1.41 1.41m12.31 0l-1.41-1.41M5.64 5.64L7.05 7.05M12 6a6 6 0 100 12 6 6 0 000-12z"/></svg>';
}

function updateDateTime() {
    const now = new Date();
    datetime.textContent = now.toLocaleString('en-GB', { 
        day: '2-digit', month: '2-digit', year: 'numeric', 
        hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true 
    });
}
setInterval(updateDateTime, 1000);
updateDateTime();

let hideControlsTimeout;
function showControls() {
    controls.classList.remove('hidden');
    clearTimeout(hideControlsTimeout);
    hideControlsTimeout = setTimeout(() => {
        if (!controls.matches(':hover')) controls.classList.add('hidden');
    }, 3000);
}

document.addEventListener('mousemove', showControls);
controls.addEventListener('mouseenter', () => clearTimeout(hideControlsTimeout));
controls.addEventListener('mouseleave', () => {
    hideControlsTimeout = setTimeout(() => controls.classList.add('hidden'), 3000);
});

document.addEventListener('keydown', (e) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const ctrlKey = isMac ? e.metaKey : e.ctrlKey;
    if (ctrlKey && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
    }
    if (ctrlKey && e.key === 'f') {
        e.preventDefault();
        toggleFavorites();
    }
    if (ctrlKey && e.key === 't') {
        e.preventDefault();
        cycleTheme();
    }
    if (ctrlKey && e.key === 'l') {
        e.preventDefault();
        urlInput.focus();
    }
    if (ctrlKey && e.key === 's') {
        e.preventDefault();
        searchBar.focus();
    }
    if (ctrlKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
        if (channels.length > 1) {
            currentChannelIndex += e.key === 'ArrowRight' ? 1 : -1;
            currentChannelIndex = (currentChannelIndex + channels.length) % channels.length;
            loadStream(channels[currentChannelIndex].url, currentChannelIndex);
        }
    }
    if (e.key === 'Escape') {
        if (sidebar.classList.contains('active')) toggleSidebar();
        hidePopup();
    }
});

let touchStartX = 0, touchEndX = 0, touchStartY = 0, touchEndY = 0;
document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleGestures();
});

function handleGestures() {
    const swipeDistanceX = touchEndX - touchStartX;
    const swipeDistanceY = touchEndY - touchStartY;
    const isMobile = window.innerWidth <= 1024;
    const tvFrameRect = tvFrame.getBoundingClientRect();

    if (isMobile) {
        const edgeThreshold = window.innerWidth * 0.1;
        if (touchStartX > window.innerWidth - edgeThreshold && swipeDistanceX < -50) toggleSidebar();
        if (sidebar.classList.contains('active') && swipeDistanceX > 50) toggleSidebar();
        const channelListRect = channelList.getBoundingClientRect();
        if (
            touchStartX >= channelListRect.left && touchStartX <= channelListRect.right &&
            touchStartY >= channelListRect.top && touchStartY <= channelListRect.bottom &&
            swipeDistanceY > 50
        ) {
            searchBar.value = '';
            filterChannels();
        }
        if (
            touchStartX >= tvFrameRect.left && touchStartX <= tvFrameRect.right &&
            touchStartY >= tvFrameRect.top && touchStartY <= tvFrameRect.bottom &&
            Math.abs(swipeDistanceX) > 50 && Math.abs(swipeDistanceY) < 50
        ) {
            if (channels.length > 1) {
                currentChannelIndex += swipeDistanceX < 0 ? 1 : -1;
                currentChannelIndex = (currentChannelIndex + channels.length) % channels.length;
                loadStream(channels[currentChannelIndex].url, currentChannelIndex);
            }
        }
    }
}

tvFrame.addEventListener('click', (e) => {
    if (e.target !== controls && !controls.contains(e.target)) toggleSidebar();
});

function showPopup(popupId) {
    popupOverlay.style.display = 'block';
    document.getElementById(popupId).style.display = 'block';
}

function hidePopup() {
    popupOverlay.style.display = 'none';
    historyPopup.style.display = 'none';
    epgPopup.style.display = 'none';
}

function toggleFavorites() {
    showFavoritesOnly = !showFavoritesOnly;
    channelFilter = 'all';
    displayChannels();
    updateStatusBar();
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.error('Fullscreen failed:', err));
    } else {
        document.exitFullscreen();
    }
}

function togglePiP() {
    if (document.pictureInPictureEnabled && videoPlayer !== document.pictureInPictureElement) {
        videoPlayer.requestPictureInPicture().catch(err => console.error('PiP failed:', err));
    } else if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
    }
}

function populateQualitySelector(levels, type) {
    qualitySelector.innerHTML = '<option value="-1">Auto</option>';
    if (type === 'hls') {
        levels.forEach((level, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.text = level.height ? `${level.height}p` : `Level ${index}`;
            qualitySelector.appendChild(option);
        });
    } else if (type === 'dash') {
        levels.forEach((level, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.text = level.height ? `${level.height}p` : `Level ${index}`;
            qualitySelector.appendChild(option);
        });
    }
}

function changeQuality() {
    const quality = parseInt(qualitySelector.value);
    if (hlsInstance) hlsInstance.currentLevel = quality;
    else if (dashInstance) dashInstance.setQualityFor('video', quality);
}

function setSleepTimer() {
    const time = parseInt(sleepTimer.value);
    if (time > 0) setTimeout(() => videoPlayer.pause(), time * 60 * 1000);
}

function cleanupStreams() {
    if (hlsInstance) {
        hlsInstance.detachMedia();
        hlsInstance.destroy();
        hlsInstance = null;
    }
    if (dashInstance) {
        dashInstance.reset();
        dashInstance = null;
    }
    videoPlayer.src = '';
    qualitySelector.innerHTML = '<option value="-1">Auto</option>';
}

async function checkStreamHealth(url) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        const response = await fetch(url, { 
            method: 'HEAD', 
            mode: 'cors', 
            signal: controller.signal 
        });
        clearTimeout(timeoutId);
        return response.ok;
    } catch (e) {
        if (e.name === 'AbortError') return true;
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 1000);
            await fetch(url, { 
                method: 'HEAD', 
                mode: 'no-cors', 
                signal: controller.signal 
            });
            clearTimeout(timeoutId);
            return true;
        } catch {
            return false;
        }
    }
}

async function loadStream(url, index = 0, retries = 2) {
    if (channels[index].online === undefined) {
        channels[index].online = await checkStreamHealth(url);
        updateStatusBar();
    }

    if (!channels[index].online && retries > 0) {
        tryNextStream(index + 1);
        return;
    } else if (!channels[index].online) {
        alert('Stream unavailable. Try another channel or playlist.');
        updateURL();
        return;
    }

    cleanupStreams();
    currentChannelIndex = index;

    const tryLoad = async () => {
        const isDRM = channels[index].drm?.enabled || false;
        if (url.endsWith('.mpd')) {
            dashInstance = dashjs.MediaPlayer().create();
            dashInstance.updateSettings({
                streaming: {
                    abr: { autoSwitchBitrate: { video: true } },
                    delay: { liveDelayFragmentCount: 4 }
                }
            });
            if (isDRM) {
                dashInstance.setProtectionData({
                    'com.widevine.alpha': drmConfig.widevine,
                    'com.microsoft.playready': drmConfig.playready
                });
            }
            dashInstance.initialize(videoPlayer, url, true);
            dashInstance.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
                const qualities = dashInstance.getBitrateInfoListFor('video');
                populateQualitySelector(qualities, 'dash');
                videoPlayer.play().catch(() => {
                    videoPlayer.muted = true;
                    videoPlayer.play();
                });
            });
            dashInstance.on(dashjs.MediaPlayer.events.ERROR, (e) => {
                console.error('DASH Error:', e);
                if (retries > 0) tryNextStream(index + 1);
                else alert('Failed to load stream due to playback error.');
            });
        } else if (Hls.isSupported() && url.endsWith('.m3u8')) {
            hlsInstance = new Hls();
            hlsInstance.loadSource(url);
            hlsInstance.attachMedia(videoPlayer);
            hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
                populateQualitySelector(hlsInstance.levels, 'hls');
                videoPlayer.play().catch(() => {
                    videoPlayer.muted = true;
                    videoPlayer.play();
                });
            });
            hlsInstance.on(Hls.Events.ERROR, (event, data) => {
                console.error('HLS Error:', data);
                if (data.fatal || data.response?.code === 404) {
                    if (retries > 0) tryNextStream(index + 1);
                    else alert('Failed to load stream due to manifest or network error.');
                }
            });
        } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl') && url.endsWith('.m3u8')) {
            videoPlayer.src = url;
            videoPlayer.play().catch(() => {
                videoPlayer.muted = true;
                videoPlayer.play();
            });
        } else {
            throw new Error('Unsupported stream format');
        }
    };

    try {
        await tryLoad();
        localStorage.setItem('lastChannel', JSON.stringify({
            index: index,
            url: channels[index].url,
            playlist: localStorage.getItem('lastPlaylist')
        }));
        displayChannels();
        updateURL();
    } catch (e) {
        console.error('Stream load failed:', e);
        if (retries > 0) tryNextStream(index + 1);
        else alert('No valid streams available: ' + e.message);
    }
}

function tryNextStream(index) {
    index = index % channels.length;
    if (index < channels.length) loadStream(channels[index].url, index, 0);
    else alert('No valid streams available.');
}

function parseM3U(data) {
    const channels = [];
    const lines = data.split('\n');
    let name = '', url = '', logo = '', epgUrl = '', category = 'Uncategorized', drm = null;
    lines.forEach(line => {
        if (line.startsWith('#EXTINF')) {
            name = line.split(',')[1]?.trim() || 'Unknown Channel';
            logo = line.match(/tvg-logo="([^"]*)"/i)?.[1] || '';
            epgUrl = line.match(/tvg-url="([^"]*)"/i)?.[1] || '';
            category = line.match(/group-title="([^"]*)"/i)?.[1] || 'Uncategorized';
            drm = line.match(/drm="([^"]*)"/i)?.[1] ? { enabled: true, type: line.match(/drm="([^"]*)"/i)[1] } : null;
        } else if (line.startsWith('http')) {
            url = line.trim();
            if (url.endsWith('.mpd') || url.endsWith('.m3u8') || url.endsWith('.m3u')) {
                channels.push({ name, url, logo, epgUrl, category, online: undefined, drm });
            }
        }
    });
    return channels.filter(c => c.url);
}

function parseJSON(data) {
    try {
        return JSON.parse(data).map(item => ({
            name: item.name || item.title || 'Unknown Channel',
            url: item.url || item.link || '',
            logo: item.logo || item.tvgLogo || '',
            epgUrl: item.epgUrl || '',
            category: item.category || item.group || 'Uncategorized',
            online: undefined,
            drm: item.drm ? { enabled: true, type: item.drm } : null
        })).filter(item => item.url.startsWith('http') && (item.url.endsWith('.mpd') || item.url.endsWith('.m3u8') || item.url.endsWith('.m3u')));
    } catch (e) {
        console.error('Invalid JSON format:', e);
        return [];
    }
}

function parseTXT(data) {
    const channels = [];
    const lines = data.split('\n');
    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('http') && (trimmed.endsWith('.mpd') || trimmed.endsWith('.m3u8') || trimmed.endsWith('.m3u'))) {
            channels.push({ name: 'Unknown Channel', url: trimmed, logo: '', epgUrl: '', category: 'Uncategorized', online: undefined, drm: null });
        } else if (trimmed.includes(',')) {
            const [name, url, logo, epgUrl, category, drm] = trimmed.split(',').map(s => s.trim());
            if (url?.startsWith('http') && (url.endsWith('.mpd') || url.endsWith('.m3u8') || url.endsWith('.m3u'))) {
                channels.push({ 
                    name: name || 'Unknown Channel', 
                    url, 
                    logo: logo || '', 
                    epgUrl: epgUrl || '', 
                    category: category || 'Uncategorized', 
                    online: undefined,
                    drm: drm ? { enabled: true, type: drm } : null 
                });
            }
        }
    });
    return channels.filter(c => c.url);
}

async function processChannelsInChunks(newChannels, chunkSize = 25) {
    const total = newChannels.length;
    channels = [];

    loadingOverlay.classList.add('active');
    drawProgressCircle(0);

    const worker = new Worker(URL.createObjectURL(new Blob([`
        self.onmessage = async function(e) {
            const channels = e.data.channels;
            const chunkSize = e.data.chunkSize;
            const total = e.data.total;
            let processed = 0;

            async function checkStreamHealth(url) {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 2000);
                    const response = await fetch(url, { 
                        method: 'HEAD', 
                        mode: 'cors', 
                        signal: controller.signal 
                    });
                    clearTimeout(timeoutId);
                    return response.ok;
                } catch (e) {
                    if (e.name === 'AbortError') return true;
                    try {
                        const controller = new AbortController();
                        const timeoutId = setTimeout(() => controller.abort(), 1000);
                        await fetch(url, { 
                            method: 'HEAD', 
                            mode: 'no-cors', 
                            signal: controller.signal 
                        });
                        clearTimeout(timeoutId);
                        return true;
                    } catch {
                        return false;
                    }
                }
            }

            try {
                for (let i = 0; i < channels.length; i += chunkSize) {
                    const chunk = channels.slice(i, i + chunkSize);
                    const promises = chunk.map(async (channel) => {
                        channel.online = await checkStreamHealth(channel.url);
                        processed++;
                        self.postMessage({ progress: Math.round((processed / total) * 100), channel });
                        return channel;
                    });
                    await Promise.all(promises);
                }
                self.postMessage({ done: true, channels });
            } catch (error) {
                self.postMessage({ error: error.message });
            }
        };
    `], { type: 'text/javascript' })));

    worker.onmessage = (e) => {
        if (e.data.progress !== undefined) {
            drawProgressCircle(e.data.progress);
        }
        if (e.data.done) {
            channels = e.data.channels;
            activeChannels = channels;
            finalizeChannelProcessing();
            worker.terminate();
        }
        if (e.data.error) {
            console.error('Worker error:', e.data.error);
            loadingOverlay.classList.remove('active');
            alert('Failed to process channels: ' + e.data.error);
            worker.terminate();
        }
    };

    worker.onerror = (error) => {
        console.error('Worker error:', error);
        loadingOverlay.classList.remove('active');
        alert('Worker failed to process channels.');
        worker.terminate();
    };

    worker.postMessage({ channels: newChannels, chunkSize, total });

    function finalizeChannelProcessing() {
        const categories = [...new Set(channels.map(c => c.category))].sort();
        categoryFilter.innerHTML = '<option value="">All Categories</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.text = cat;
            categoryFilter.appendChild(option);
        });

        loadingOverlay.classList.remove('active');
        displayChannels();
        updateStatusBar();

        const lastChannel = JSON.parse(localStorage.getItem('lastChannel') || '{}');
        if (lastChannel?.url && lastChannel?.playlist === localStorage.getItem('lastPlaylist')) {
            const index = channels.findIndex(c => c.url === lastChannel.url);
            if (index >= 0) {
                loadStream(channels[index].url, index);
            } else if (channels[0]) {
                loadStream(channels[0].url, 0);
            }
        } else if (channels[0]) {
            loadStream(channels[0].url, 0);
        }
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    loadingOverlay.classList.add('active');
    drawProgressCircle(0);

    const reader = new FileReader();
    reader.onload = e => {
        let newChannels = [];
        const fileName = file.name;
        if (fileName.endsWith('.m3u')) newChannels = parseM3U(e.target.result);
        else if (fileName.endsWith('.json')) newChannels = parseJSON(e.target.result);
        else if (fileName.endsWith('.txt')) newChannels = parseTXT(e.target.result);

        if (newChannels.length > 0) {
            uploadHistory = [fileName, ...uploadHistory.filter(h => h !== fileName).slice(0, 9)];
            localStorage.setItem('uploadHistory', JSON.stringify(uploadHistory));
            localStorage.setItem('lastPlaylist', fileName);
            processChannelsInChunks(newChannels);
            displayHistory();
            updateURLWithStream(fileName);
        } else {
            loadingOverlay.classList.remove('active');
            alert('Invalid or empty playlist file.');
        }
    };
    reader.onerror = () => {
        loadingOverlay.classList.remove('active');
        alert('Failed to read file.');
    };
    reader.readAsText(file);
    fileInput.value = '';
}

function addM3UList(url) {
    if (!url) return;

    loadingOverlay.classList.add('active');
    drawProgressCircle(0);

    fetch(url)
        .then(response => response.text())
        .then(data => {
            let newChannels = [];
            if (url.endsWith('.m3u')) newChannels = parseM3U(data);
            else if (url.endsWith('.json')) newChannels = parseJSON(data);
            else if (url.endsWith('.txt')) newChannels = parseTXT(data);
            else newChannels = parseM3U(data);

            if (newChannels.length > 0) {
                uploadHistory = [url, ...uploadHistory.filter(h => h !== url).slice(0, 9)];
                localStorage.setItem('uploadHistory', JSON.stringify(uploadHistory));
                localStorage.setItem('lastPlaylist', url);
                processChannelsInChunks(newChannels);
                displayHistory();
                updateURLWithStream(url);
            } else {
                loadingOverlay.classList.remove('active');
                alert('Invalid or empty playlist.');
            }
        })
        .catch(err => {
            loading |Overlay.classList.remove('active');
            alert('Failed to load playlist URL: ' + err.message);
        });
}

function toggleDefaultPlaylist() {
    if (document.getElementById('defaultPlaylistToggle').checked) {
        addM3UList(defaultPlaylistUrl);
    } else {
        // Clear current playlist if toggle is turned off
        channels = [];
        activeChannels = [];
        currentChannelIndex = -1;
        cleanupStreams();
        displayChannels();
        updateStatusBar();
    }
}

function toggleFavorite(channel, index) {
    const isFavorited = favorites.some(f => f.url === channel.url);
    if (isFavorited) favorites = favorites.filter(f => f.url !== channel.url);
    else favorites.push(channel);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayChannels();
    updateStatusBar();
}

function updateStatusBar() {
    const total = activeChannels.length;
    const online = activeChannels.filter(c => c.online === true).length;
    const offline = activeChannels.filter(c => c.online === false).length;
    totalChannelsSpan.textContent = total;
    onlineChannelsSpan.textContent = online;
    offlineChannelsSpan.textContent = offline;
}

function showAllChannels() {
    channelFilter = 'all';
    displayChannels();
}

function showOnlineChannels() {
    channelFilter = 'online';
    displayChannels();
}

function showOfflineChannels() {
    channelFilter = 'offline';
    displayChannels();
}

function filterByCategory() {
    selectedCategory = categoryFilter.value;
    displayChannels();
}

function displayChannels() {
    const scrollPosition = channelList.scrollTop;
    channelList.innerHTML = '';
    if (!showingHistory) {
        let displayChannels = showFavoritesOnly ? activeChannels.filter(c => favorites.some(f => f.url === c.url)) : activeChannels;
        if (selectedCategory) displayChannels = displayChannels.filter(c => c.category === selectedCategory);
        if (channelFilter === 'online') displayChannels = displayChannels.filter(c => c.online === true);
        else if (channelFilter === 'offline') displayChannels = displayChannels.filter(c => c.online === false);
        const term = searchBar.value.toLowerCase();
        displayChannels = displayChannels.filter(c => term ? c.name.toLowerCase().includes(term) : true);

        const chunkSize = 50;
        let loadedIndex = 0;

        function loadNextChunk() {
            const end = Math.min(loadedIndex + chunkSize, displayChannels.length);
            for (let index = loadedIndex; index < end; index++) {
                const channel = displayChannels[index];
                const channelDiv = document.createElement('div');
                channelDiv.className = 'channel-item' + (index === currentChannelIndex ? ' current-channel' : '');
                channelDiv.onclick = () => {
                    const currentScroll = channelList.scrollTop;
                    loadStream(channel.url, index);
                    setTimeout(() => channelList.scrollTop = currentScroll, 0);
                };
                const logo = document.createElement('img');
                logo.className = 'channel-logo';
                logo.src = channel.logo || 'https://bugsfreecdn.netlify.app/BugsfreeDefault/default-logo.png';
                logo.onerror = () => logo.src = 'https://bugsfreecdn.netlify.app/BugsfreeDefault/default-logo.png';
                const name = document.createElement('span');
                name.className = 'channel-name';
                name.textContent = channel.name;
                const favBtn = document.createElement('button');
                favBtn.className = 'favorite-btn' + (favorites.some(f => f.url === channel.url) ? ' favorited' : '');
                favBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
                favBtn.onclick = (e) => {
                    e.stopPropagation();
                    toggleFavorite(channel, index);
                };
                channelDiv.appendChild(logo);
                channelDiv.appendChild(name);
                channelDiv.appendChild(favBtn);
                channelList.appendChild(channelDiv);
            }
            loadedIndex = end;
            if (loadedIndex < displayChannels.length) requestAnimationFrame(loadNextChunk);
            else channelList.scrollTop = scrollPosition;
        }

        requestAnimationFrame(loadNextChunk);
    }
}

function filterChannels() {
    displayChannels();
}

function displayHistory() {
    multiPlaylistSelect.innerHTML = '<option value="">Switch Playlist</option>';
    uploadHistory.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.text = item.length > 20 ? item.substring(0, 20) + '...' : item;
        multiPlaylistSelect.appendChild(option);
    });

    channelList.innerHTML = '';
    if (showingHistory) {
        const backBtn = document.createElement('button');
        backBtn.textContent = 'Back to Channels';
        backBtn.style.width = '100%';
        backBtn.style.marginBottom = '10px';
        backBtn.onclick = () => {
            document.getElementById('historyToggle').checked = false;
            toggleHistory();
        };
        channelList.appendChild(backBtn);
        uploadHistory.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'history-item';
            const icon = document.createElement('span');
            icon.innerHTML = item.startsWith('http') ?
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17h-2v-2h2v2zm3.5-4.34v-3.66c0-1.79-1.47-3.25-3.25-3.25s-3.25 1.46-3.25 3.25v3.66c0 .21.15.39.34.44l2.03.5c.06.01.12.01.18.01s.12 0 .18-.01l2.03-.5c.19-.05.34-.23.34-.44zm-3.25-4.09c.69 0 1.25.56 1.25 1.25v3.66l-2.5.62-2.5-.62v-3.66c0-.69.56-1.25 1.25-1.25s1.25.56 1.25 1.25z"/></svg>' :
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"/></svg>';
            const nameSpan = document.createElement('span');
            nameSpan.className = 'history-name';
            nameSpan.textContent = item.length > 20 ? item.substring(0, 20) + '...' : item;
            const loadBtn = document.createElement('button');
            loadBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>';
            loadBtn.onclick = () => (item.startsWith('http') ? addM3UList(item) : alert('Upload file again'));
            const clearBtn = document.createElement('button');
            clearBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
            clearBtn.onclick = () => {
                uploadHistory.splice(index, 1);
                localStorage.setItem('uploadHistory', JSON.stringify(uploadHistory));
                if (uploadHistory.length === 0) localStorage.removeItem('lastPlaylist');
                displayHistory();
            };
            div.appendChild(icon);
            div.appendChild(nameSpan);
            div.appendChild(loadBtn);
            div.appendChild(clearBtn);
            channelList.appendChild(div);
        });
    }
}

function loadSelectedPlaylist() {
    const url = multiPlaylistSelect.value;
    if (url) addM3UList(url);
}

function showEPG() {
    showPopup('epgPopup');
    epgContent.innerHTML = '<p>Loading EPG...</p>';
    const epgUrl = channels[currentChannelIndex]?.epgUrl;
    if (epgUrl) {
        fetch(epgUrl)
            .then(response => response.text())
            .then(data => {
                epgContent.innerHTML = '<p>EPG data loaded. Parsing not implemented.</p>';
            })
            .catch(() => {
                epgContent.innerHTML = '<p>Failed to load EPG data.</p>';
            });
    } else {
        epgContent.innerHTML = '<p>No EPG available for this channel.</p>';
    }
}

function updateURL() {
    const state = { channelIndex: currentChannelIndex };
    try {
        history.replaceState(state, '', `#channel=${currentChannelIndex}`);
    } catch (e) {
        console.log('History state cannot be modified in this context (e.g., about:srcdoc). Skipping URL update.');
    }
}

function updateURLWithStream(streamUrl) {
    try {
        const encodedStream = btoa(streamUrl);
        history.replaceState(null, '', `?stream=${encodedStream}`);
    } catch (e) {
        console.log('Failed to update URL with stream:', e);
    }
}

function decryptStreamLink(encoded) {
    try {
        return atob(encoded);
    } catch (e) {
        console.error('Failed to decrypt stream link:', e);
        return null;
    }
}

function initializeApp() {
    const urlParams = new URLSearchParams(window.location.search);
    const stream = urlParams.get('stream');

    if (stream) {
        const decryptedUrl = decryptStreamLink(stream);
        if (decryptedUrl && decryptedUrl.startsWith('http')) {
            addM3UList(decryptedUrl);
        } else {
            alert('Invalid or corrupted stream link.');
        }
    }
    // No automatic loading of lastPlaylist or defaultPlaylistUrl
    displayHistory();
}

// Initialize the app
initializeApp();
