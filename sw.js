const CACHE_NAME = 'zhuoyouzhushou-cache-v1';
const URLS_TO_CACHE = [
  'zhuoyouzhushou.html'
];

// 安装 Service Worker 时，缓存文件
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// 拦截网络请求，优先从缓存中获取
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果缓存中有匹配的资源，则返回它
        if (response) {
          return response;
        }
        // 否则，通过网络请求获取
        return fetch(event.request);
      })
  );
});
