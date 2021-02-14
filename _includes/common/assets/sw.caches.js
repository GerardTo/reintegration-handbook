/*self.addEventListener("activate", function (event) {
  const current = ["{{ theme_alias }}"];

  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (current.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (e) {
  if (e.request.url.match("{{ theme_alias }}")) {
    e.respondWith(
      caches.match(e.request).then(function (resp) {
        if (resp !== undefined) {
          return resp;
        } else {
          return fetch(e.request, {
            cache: "no-store",
          })
            .then(function (resp) {
              let clone = resp.clone();
              caches.open("{{ theme_alias }}").then(function (cache) {
                cache.put(e.request, clone);
              });
              return resp;
            })
            .catch(console.log);
        }
      })
    );
  }
});
*/
// service-worker.js

// set names for both precache & runtime cache
workbox.core.setCacheNameDetails({
  prefix: 'my-blog',
  suffix: 'v1.0',
  precache: 'precache',
  runtime: 'runtime-cache'
});

// let Service Worker take control of pages ASAP
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// let Workbox handle our precache list
workbox.precaching.precacheAndRoute(self.__precacheManifest);

// use `NetworkFirst` strategy for html
workbox.routing.registerRoute(
  /\.html$/,
  new workbox.strategies.NetworkFirst()
);

// use `NetworkFirst` strategy for css and js
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.NetworkFirst()
);

// use `CacheFirst` strategy for images
workbox.routing.registerRoute(
  /assets\/(img|icons)/,
  new workbox.strategies.CacheFirst()
);

// use `StaleWhileRevalidate` third party files
workbox.routing.registerRoute(
  /^https?:\/\/cdn.staticfile.org/,
  new workbox.strategies.StaleWhileRevalidate()
);