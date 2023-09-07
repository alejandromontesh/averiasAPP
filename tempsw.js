// const CACHE_NAME = 'Averias-pwa-cache-v1';
// const STATIC_CACHE_URLS = [
//   '/',
//   '/index.html',
//   '/css/style.css',
//   '/js/jquery-3.7.0.min.js',
//   '/emergency64.ico',
// ];

// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache) {
//       return cache.addAll(STATIC_CACHE_URLS);
//     })
//   );
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request).then(function(cachedResponse) {
//       return (
//         cachedResponse ||
//         fetch(event.request).then(function(networkResponse) {
//           // Verificar si la respuesta es válida (código 200) antes de almacenar en caché
//           if (networkResponse.status === 200) {
//             // Clonar la respuesta para almacenarla en caché
//             const responseToCache = networkResponse.clone();
//             caches.open(CACHE_NAME).then(function(cache) {
//               cache.put(event.request, responseToCache);
//             });
//           }
//           return networkResponse;
//         })
//       );
//     })
//   );
// });

self.addEventListener('fetch', event => {

  console.log(event.request.url)
  // event.respondWith( fetch(event.request));
})
//TEST

// self.addEventListener('activate', function(event) {
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames
//           .filter(function(cacheName) {
//             // Elimina cachés que no coinciden con la versión actual
//             return cacheName !== CACHE_NAME;
//           })
//           .map(function(cacheName) {
//             return caches.delete(cacheName);
//           })
//       );
//     })
//   );
// });
