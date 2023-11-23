const timeout = 400;

function fromNetwork(request, timeout) {
  return new Promise((fulfill, reject) => {
    var timeoutId = setTimeout(() => { reject("Timeout") }, timeout);
    fetch(request).then((response) => {
      clearTimeout(timeoutId);
      if (response.status >= 500 || response.headers.get("Server") == "GitHub.com") {
        reject(`HTTP error: ${response.status} ${response.statusText}`);
      }
      fulfill(response);
    }).catch((error) => {
      reject(`Unknown error while sending request: ${error.message}`);
    });
  });
}

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});


self.addEventListener('fetch', (event) => {
  const requestURL = new URL(event.request.url);

  if (requestURL.pathname.startsWith('/api/containers')) {
    event.respondWith(
      fromNetwork(event.request, timeout)
        .catch((err) => {
          console.log(`${err}`);
          const containerIdMatch = requestURL.pathname.match(/^\/api\/containers\/([^/]+)$/);

          if (containerIdMatch) {
            const containerId = containerIdMatch[1];
            if (containers.hasOwnProperty(containerId)) {
              return new Response(JSON.stringify(containers[containerId]), {
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
              });
            } else {
              return new Response(JSON.stringify({ error: 'Container not found' }), {
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                status: 404,
              });
            }
          } else {
            filteredContainers = Object.values(containers)
            let type = requestURL.searchParams.get("type")
            if (type) {
              type = type.toLowerCase()
              filteredContainers = filteredContainers.filter(
                (container) => container.type.toLowerCase().includes(type)
              )
            }
            return new Response(JSON.stringify({ draft_transportation, containers: filteredContainers }), {
              headers: { 'Content-Type': 'application/json; charset=utf-8' },
            });
          }
        })
    );
  } else if (requestURL.pathname.startsWith('/images')) {
    event.respondWith(
      fromNetwork(event.request, timeout)
        .catch((err) => {
          console.log(`${err}`);
          return fetch('placeholder3.jpg')
            .then((response) => {
              return new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: new Headers(response.headers),
              });
            })
            .catch((_) => {
              return new Response('Failed to load image', {
                status: 500,
                headers: { 'Content-Type': 'text/plain' },
              });
            });
        })
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});


const draft_transportation = null
const containers = {
  "a20163ce-7be5-46ec-a50f-a313476b2bd1": {
    "uuid": "a20163ce-7be5-46ec-a50f-a313476b2bd1",
    "marking": "CCCU6543210",
    "type": "Стандартный 20-ти футовый контейнер",
    "length": 5905,
    "height": 2381,
    "width": 2350,
    "image_url": "localhost:9000/images/a20163ce-7be5-46ec-a50f-a313476b2bd1.jpg",
    "cargo": "Зерно",
    "weight": 15000
  },
  "8f157a95-dad1-43e0-9372-93b51de06163": {
    "uuid": "8f157a95-dad1-43e0-9372-93b51de06163",
    "marking": "DDDU6543210",
    "type": "20 футовый контейнер увеличенной высоты",
    "length": 5905,
    "height": 2596,
    "width": 2350,
    "image_url": "localhost:9000/images/8f157a95-dad1-43e0-9372-93b51de06163.jpg",
    "cargo": "Фрукты",
    "weight": 13000
  },
  "07d0cbdc-8e0f-4308-a7aa-11976ee6e5b2": {
    "uuid": "07d0cbdc-8e0f-4308-a7aa-11976ee6e5b2",
    "marking": "BBBU6543210",
    "type": "Стандартный 40-ка футовый контейнер",
    "length": 12045,
    "height": 2381,
    "width": 2350,
    "image_url": "localhost:9000/images/07d0cbdc-8e0f-4308-a7aa-11976ee6e5b2.jpg",
    "cargo": "Телевизоры",
    "weight": 19000
  }
}