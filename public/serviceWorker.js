const timeout = 4000;

const containers = {
  "draft_transportation": null,
  "containers": [
    {
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
    {
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
    {
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
  ]
}

function fromNetwork(request, timeout) {
  return new Promise((fulfill, reject) => {
    var timeoutId = setTimeout(reject, timeout);
    fetch(request).then((response) => {
      clearTimeout(timeoutId);
      if (response.status < 500) {
        fulfill(response);
      } else {
        reject(new Error(`HTTP error: ${response.status} ${response.statusText}`));
      }
      fulfill(response);
    }, reject);
  });
}


self.addEventListener('fetch', (event) => {
  const requestURL = new URL(event.request.url);

  if (requestURL.pathname.startsWith('/api/containers')) {
    event.respondWith(fromNetwork(event.request, timeout)
        .catch((err) => {
          console.log(`Error caught: ${err.message}`);
          return new Response(JSON.stringify(containers), {
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
          });
        })
    );

  } else {
    event.respondWith(fetch(event.request));
  }
});
