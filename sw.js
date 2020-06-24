var CACHE_NAME = 'mauriciojun-card-v01-offline-01';
var urlsToCache = [
	'/card/',
	'/card/index.html',
	'/card/offline.html',
	'/card/404.html',
	'/card/favicon/android-chrome-512x512.png',
	'/card/css/all.css',
	'/card/webfonts/fa-brands-400.eot',
	'/card/webfonts/fa-brands-400.svg',
	'/card/webfonts/fa-brands-400.ttf',
	'/card/webfonts/fa-brands-400.woff',
	'/card/webfonts/fa-brands-400.woff2',
	'/card/webfonts/fa-regular-400.eot',
	'/card/webfonts/fa-regular-400.svg',
	'/card/webfonts/fa-regular-400.ttf',
	'/card/webfonts/fa-regular-400.woff',
	'/card/webfonts/fa-regular-400.woff2',
	'/card/webfonts/fa-solid-900.eot',
	'/card/webfonts/fa-solid-900.svg',
	'/card/webfonts/fa-solid-900.ttf',
	'/card/webfonts/fa-solid-900.woff',
	'/card/webfonts/fa-solid-900.woff2',
	'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
	'https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
	'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
	'/card/imgs/mauricio-jun-card-top-bkg.png',
	'/card/imgs/mauricio-jun-sobre-mobile.png',
	'/card/imgs/header-bkg-01.png',
	'/card/imgs/logo-bkg-03-mobile-transparente.png',
	'/card/imgs/logo-mauricio-jun-01-maior-1024x1024.png',
	'/card/imgs/mauricio-jun-logo-horizontal-projetos-web-vinho-02.png'
];
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					// Return true if you want to remove this cache,
					// but remember that caches are shared across
					// the whole origin
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});
/* FETCH */
self.addEventListener('fetch', function(event) {
	event.respondWith(
	// Try the cache
		caches.match(event.request).then(function(response) {
			//console.log('response 01 = ' + response);
			if (response) {
				return response;
			}
			return fetch(event.request).then(function(response) {
				//console.log('response.status = ' + response.status);
				if (response.status === 404) {
					return caches.match('/card/404.html');
				}
				//console.log('response 02 = ' + response);
				return response
			});
		}).catch(function() {
			// If both fail, show a generic fallback:
			//console.log('offline event = ' + event);
			return caches.match('/card/offline.html');
		})
	);
});