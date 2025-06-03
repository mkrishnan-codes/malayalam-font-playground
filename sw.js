const CACHE_NAME = 'malayalam-font-playground-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/style.css',
  '/assets/script.js',
  '/manifest.json',
  'https://smc.org.in/fonts/gayathri.css',
  'https://smc.org.in/fonts/malini.css',
  'https://smc.org.in/fonts/manjari.css',
  'https://smc.org.in/fonts/nupuram.css',
  'https://smc.org.in/fonts/uroob.css',
  'https://smc.org.in/fonts/nupuram-arrows-color.css',
  'https://smc.org.in/fonts/nupuram-calligraphy.css',
  'https://smc.org.in/fonts/nupuram-color.css',
  'https://smc.org.in/fonts/keraleeyam.css',
  'https://smc.org.in/fonts/chilanka.css',
  'https://smc.org.in/fonts/dyuthi.css',
  'https://smc.org.in/fonts/karumbi.css',
  'https://smc.org.in/fonts/rachana.css',
  'https://smc.org.in/fonts/raghumalayalamsans.css',
  'https://smc.org.in/fonts/suruma.css',
  'https://html2canvas.hertzen.com/dist/html2canvas.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 