const CACHE_NAME = 'quiz-cache-v9';

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

// Установка: кэшируем нужные файлы
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Активация: удаляем старый кэш, если есть
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Обработка запросов: сначала из кэша, потом из сети
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// **Обработка сообщения от главного скрипта для пропуска ожидания**
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});



self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});