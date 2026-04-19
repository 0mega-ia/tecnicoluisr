// Este script permite que la web cargue más rápido
self.addEventListener('install', (e) => {
  console.log('Service Worker instalado');
});

self.addEventListener('fetch', (e) => {
  // Aquí podrías añadir lógica para caché offline si deseas
});
