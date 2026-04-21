const CACHE_NAME = 'tecnicoluisr-v1';

// 1. INSTALACIÓN: Aquí guardamos los archivos críticos para que funcionen offline
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
      ]);
    })
  );
  self.skipWaiting();
});

// 2. ACTIVACIÓN: Limpiamos caché vieja si actualizas tu web
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});

// 3. FETCH: Aquí está la magia. Si el usuario pide algo, primero lo buscamos en caché
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // Retornar de caché si existe, si no, ir a la red
      return response || fetch(e.request);
    })
  );
});
