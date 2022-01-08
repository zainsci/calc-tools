"use strict";
// Cache Name
const CACHE_NAME = "calc-tools-cache";
// Cache Files
const FILES_TO_CACHE = [
  "/calc-tools/index.html",
  "/calc-tools/global.css",
  "/calc-tools/favicon.ico",
  "/calc-tools/build/bundle.js",
  "/calc-tools/build/bundle.css",
  "/calc-tools/icons/android-chrome-192x192.png",
  "/calc-tools/icons/android-chrome-512x512.png",
];

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(FILES_TO_CACHE);
    })()
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(CACHE_NAME);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});

// // Active PWA Cache and clear out anything older
// self.addEventListener("activate", (evt) => {
//   console.log("[ServiceWorker] Activate");
//   evt.waitUntil(
//     caches.keys().then((keyList) => {
//       return Promise.all(
//         keyList.map((key) => {
//           if (key !== CACHE_NAME) {
//             console.log("[ServiceWorker] Removing old cache", key);
//             return caches.delete(key);
//           }
//         })
//       );
//     })
//   );
//   self.clients.claim();
// });
// // listen for fetch events in page navigation and return anything that has been cached
// self.addEventListener("fetch", (evt) => {
//   console.log("[ServiceWorker] Fetch", evt.request.url);
//   // when not a navigation event return
//   if (evt.request.mode !== "navigate") {
//     return;
//   }
//   evt.respondWith(
//     fetch(evt.request).catch(() => {
//       return caches.open(CACHE_NAME).then((cache) => {
//         return cache.match("offline.html");
//       });
//     })
//   );
// });
