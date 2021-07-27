importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.setConfig({
    debug: false,
});

/*workbox.precaching.precacheAndRoute([
    {url: '/shampan/pub/media/wysiwyg/slider/shampan-banner-2-v.jpg', revision: 'bhf1321'},
    {url: '/shampan/pub/media/wysiwyg/slider/shampan-banner-min.jpg', revision: 'bhf1322'},
    {url: '/shampan/pub/media/wysiwyg/slider/slider2.jpg', revision: 'bhf1322'},
    {url: '/shampan/pub/media/promobanners//r/s/rsz_pexels-ge-yonk-1152077.jpg', revision: 'bhf1324'},
    {url: '/shampan/pub/media/promobanners//h/o/home-tile.jpg', revision: 'bhf1325'},
    {url: '/shampan/pub/media/promobanners//r/s/rsz_pexels-evg-culture-1040384_1.jpg', revision: 'bhf1326'},
    {url: '/shampan/pub/media/promobanners/h/o/home-tile-2.jpg', revision: 'bhf1327'},
    {url: '/shampan/pub/media/promobanners/r/s/rsz_pexels-bella-zhong-3782786.jpg', revision: 'bhf1328'},
    {url: '/shampan/pub/media/promobanners/h/o/home-big-tile.jpg', revision: 'bhf1329'},
    {url: '/shampan/pub/media/wysiwyg/shampan-u-new-logo.png', revision: 'bhf13210'}
]);*/

workbox.routing.registerRoute(
    new RegExp('.*\\.(?:js)'),
    //new RegExp('^(?!.*(knockout|bundle)\\.js$).*\\.js$'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'script'
    }),
);

workbox.routing.registerRoute(
    new RegExp('.*\\.(?:css)'),
    //new RegExp('^(?!.*(knockout|bundle)\\.js$).*\\.js$'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'style'
    }),
);

// Demonstrates using default cache
/*workbox.routing.registerRoute(
    new RegExp('.*\\.(?:js)'),
    new workbox.strategies.NetworkFirst(),
);*/

// Demonstrates a custom cache name for a route.
workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                //maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 14 // 30 Days
            }),
        ]
    })
);

// Demonstrates a custom cache name for a route.
workbox.routing.registerRoute(
    //new RegExp('/'),
    ({request}) => request.destination === 'document' && request.origin === 'https://www.shampan.com' && request.pathname ===('/'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'document'
    })
);

/*workbox.routing.registerRoute(
    new RegExp('.*\\.(?:png|jpg|jpeg|svg|gif)'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                //maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
            }),
        ],
    }),
);*/

/* Offline Mode */
/*
const CACHE_NAME = 'offline-html';
// This assumes /offline.html is a URL for your self-contained
// (no external images or styles) offline page.
const FALLBACK_HTML_URL = '/';
// Populate the cache with the offline HTML page when the
// service worker is installed.
self.addEventListener('install', async (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.add(FALLBACK_HTML_URL))
);
});

navigationPreload.enable();

const networkOnly = new NetworkOnly();
const navigationHandler = async (params) => {
    try {
        // Attempt a network request.
        return await networkOnly.handle(params);
    } catch (error) {
        // If it fails, return the cached HTML.
        return caches.match(FALLBACK_HTML_URL, {
            cacheName: CACHE_NAME,
        });
    }
};

// Register this strategy to handle all navigations.
registerRoute(
    new NavigationRoute(navigationHandler)
);*/

console.log('Hello from service-worker.js');
