// const CACHE_STATIC_NAME = 'Averias-static-v1.2';
// const CACHE_DYNAMIC_NAME = 'Avericas-dinamic-v1.1';

// const CACHE_INMUTABLE_NAME = 'Averias-inmutable-v1.1';

// self.addEventListener('install', e => {

//     const cacheProm = caches.open(CACHE_STATIC_NAME)
//         .then(cache => {
//             return cache.addAll([
//                 '/',
//                 '/index.html',
//                 '/RepoAveria.html',
//                 '/css/style.css',
//                 '/images/cdfLogo.jpg',
//                 '/images/logoCDF.png',
//                 '/js/app.js',
//                 '/js/RepoAveria.js'
//             ]);
//         });

//     const cacheInm = caches.open(CACHE_INMUTABLE_NAME)
//         .then(cache => {
//             cache.addAll([
//                 '/js/jquery-3.7.0.min',
//                 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css',
//                 'https://kit.fontawesome.com/483f7c89f8.js'
//             ])
//         });

//         self.skipWaiting();

//     e.waitUntil(Promise.all([cacheProm, cacheInm]));
// });

// self.addEventListener('activate', e=> {

//     const activacion = caches.keys()
//     .then (keys => {

//         keys.forEach ( key => {
//             if(key !== CACHE_STATIC_NAME && key.includes('static') ){
//                 return caches.delete(key);
//             }
//         });
//     });

//     e.waitUntil(activacion);
// })

// self.addEventListener('fetch', e => {
//     //1. cache Only
//     // e.respondWith(caches.match( e.request ));

//     //2. cache with Network Fallback
//     caches.match(e.request)
//         .then(resp => {
//             if (resp) return resp;

//             console.log('No existe', e.request.url);

//             return fetch(e.request)
//                 .then(newResp => {

//                     caches.open(CACHE_DYNAMIC_NAME).then(cache => {
//                         cache.put(e.request, newResp)
//                     });

//                     return newResp.clone();

//                 });
//         });
// });

importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static-averias-v1'
const DYNAMIC_CACHE = 'dynamic-averias-v1'
const INMUTABLE_CACHE = 'inmutable-averias-v1'

//Archivos necesarios para el APP
const APP_SHELL = [
    // '/',
    'index.html',
    'RepoAveria.html',
    'images/cdfLogo.jpg',
    'images/logoCDF.png',
    'images/logocdf2.jpg',
    'css/style.css',
    'js/app.js',
    'js/RepoAveria.js',
    'js/sw-utils.js'
];

const APP_SHELL_INMUTABLE = [
    'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css',
    'https://kit.fontawesome.com/483f7c89f8.js',
    '/js/jquery.js'
];

// Instalación del serviceWorker
self.addEventListener('install', e => {

    const cacheStatic = caches.open(STATIC_CACHE)  // Abrir cache
        .then(cache => {
            cache.addAll(APP_SHELL);               // Agregar archivo a cache
        });

    const cacheInmutable = caches.open(INMUTABLE_CACHE)
        .then(cache => {
            cache.addAll(APP_SHELL_INMUTABLE);
        });

        //Actualizar serviceWorker 
        self.skipWaiting();

    //Esperar a que termine el proceso de cache
    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

// Borrar caches anteriores
self.addEventListener('activate', e => {

    const respuesta = caches.keys()
        .then(keys => {
            keys.forEach(key => {
                if (key != STATIC_CACHE && key.includes('static')) {
                    return caches.delete(key)
                }
            });
        });

    e.waitUntil(respuesta);
    
});

self.addEventListener('fetch', e => {

    const respuesta = caches.match(e.request).then(res => {

        if (res) {
            return res;
        }
        else {
            return fetch(e.request).then(newRes => {

                return ActualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);

            });
        }
    });

    e.respondWith(respuesta);

});