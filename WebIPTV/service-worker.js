const CACHE_NAME = 'webiptv-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    './css/styles.css',
    './js/app.js',
    '/https://cdn.jsdelivr.net/npm/hls.js@1.5.15/dist/hls.min.js',
    '/https://cdn.jsdelivr.net/npm/dashjs@4.7.2/dist/dash.all.min.js',
    '/https://cdn.jsdelivr.net/npm/feather-icons@4.29.2/dist/feather.min.js',
    './img/logo.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(
                    response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    }
                );
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
