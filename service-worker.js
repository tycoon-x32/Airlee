const CACHE_NAME = 'airlee-pwa-v1';
const ASSETS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'logo.png',
  'service-worker.js',
  'cesna 208.jpg',
  'phenom 300.jpg',
  'g650.jpg',
  'Challenger 350.jpg',
  'cessna208.html',
  'phenom300.html',
  'gulfstream-g650.html',
  'challenger350.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
