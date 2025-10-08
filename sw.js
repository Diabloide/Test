const CACHE_NAME = 'quiz-cache-v2'; // поменял версию!
const urlsToCache = [
  '/',
  '/index.html',
  '/test1.html',
  '/test2.html',
  '/menu.html',
  '/result.html',
  '/script.js',
  '/script2.js',
  '/style.css',
  '/manifest.json',
  '/icons/icons-192png.png',
  '/icons/icons-512png.png'
];

// Установка
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // Активируем новый сервис-воркер сразу
});

// Активация
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // Позволяем сервис-воркеру контролировать страницу сразу
});

// Фетч
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Отправка сообщения клиентам при обновлении
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});