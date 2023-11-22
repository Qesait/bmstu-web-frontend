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
            return new Response(JSON.stringify({ draft_transportation, containers: Object.values(containers) }), {
              headers: { 'Content-Type': 'application/json; charset=utf-8' },
            });
          }
        })
    );
  } else if (requestURL.pathname.startsWith('/api/transportations')) {
    event.respondWith(
      fromNetwork(event.request, timeout)
        .catch((err) => {
          console.log(`${err}`);
          const transportationIdMatch = requestURL.pathname.match(/^\/api\/transportations\/([^/]+)$/);

          if (transportationIdMatch) {
            const transportationId = transportationIdMatch[1];
            if (transportations.hasOwnProperty(transportationId)) {
              return new Response(JSON.stringify(transportations[transportationId]), {
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
              });
            } else {
              return new Response(JSON.stringify({ error: 'Transportation not found' }), {
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                status: 404,
              });
            }
          } else {
            return new Response(JSON.stringify({ transportations: Object.values(transportations).map((t) => t.transportation) }), {
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
const transportations = {
  "47e5468f-6426-4d0b-9866-85d2d0dbbee4": {
    "transportation": {
      "uuid": "47e5468f-6426-4d0b-9866-85d2d0dbbee4",
      "status": "завершён",
      "creation_date": "2023-11-21 14:17:04",
      "formation_date": "2023-11-21 14:17:45",
      "completion_date": "2023-11-21 14:17:54",
      "moderator": "Модератор",
      "customer": "Просто пользователь",
      "transport": ""
    },
    "containers": [
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
  },
  "b8a71f96-48c2-436e-b587-29a9074e0b5c": {
    "transportation": {
      "uuid": "b8a71f96-48c2-436e-b587-29a9074e0b5c",
      "status": "черновик",
      "creation_date": "2023-11-21 14:18:24",
      "formation_date": "2023-11-21 20:59:30",
      "completion_date": null,
      "moderator": null,
      "customer": "Просто пользователь",
      "transport": ""
    },
    "containers": [
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
      },
      {
        "uuid": "87f1e44c-2d5f-4611-ae7c-4b56ba690d05",
        "marking": "XYZU9876543",
        "type": "20 футовый контейнер увеличенной высоты",
        "length": 5905,
        "height": 2596,
        "width": 2350,
        "image_url": "localhost:9000/images/87f1e44c-2d5f-4611-ae7c-4b56ba690d05.jpg",
        "cargo": "Медицинское оборудование",
        "weight": 8000
      },
      {
        "uuid": "f4c76108-9cd1-42e8-81d5-803eaed7866a",
        "marking": "XYZU9876543",
        "type": "Стандартный 40-ка футовый контейнер",
        "length": 12045,
        "height": 2381,
        "width": 2350,
        "image_url": "localhost:9000/images/f4c76108-9cd1-42e8-81d5-803eaed7866a.jpg",
        "cargo": "Одежда",
        "weight": 16000
      }
    ]
  },
  "7be39e57-784b-437a-a222-834f7995b1b5": {
    "transportation": {
      "uuid": "7be39e57-784b-437a-a222-834f7995b1b5",
      "status": "отклонён",
      "creation_date": "2023-11-21 14:15:44",
      "formation_date": "2023-11-21 14:16:53",
      "completion_date": null,
      "moderator": "Модератор",
      "customer": "Просто пользователь",
      "transport": ""
    },
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
        "uuid": "0706419e-b024-469d-a354-9480cd79c6a5",
        "marking": "AAAU1234560",
        "type": "Стандартный 20-ти футовый контейнер",
        "length": 5905,
        "height": 2381,
        "width": 2350,
        "image_url": "localhost:9000/images/0706419e-b024-469d-a354-9480cd79c6a5.jpeg",
        "cargo": "Автомобиль",
        "weight": 5000
      }
    ]
  },
  "2aa39aff-e4c3-4f39-ab3d-2dde1989569b": {
    "transportation": {
      "uuid": "2aa39aff-e4c3-4f39-ab3d-2dde1989569b",
      "status": "черновик",
      "creation_date": "2023-11-21 20:59:57",
      "formation_date": null,
      "completion_date": null,
      "moderator": null,
      "customer": "Просто пользователь",
      "transport": ""
    },
    "containers": [
      {
        "uuid": "0706419e-b024-469d-a354-9480cd79c6a5",
        "marking": "AAAU1234560",
        "type": "Стандартный 20-ти футовый контейнер",
        "length": 5905,
        "height": 2381,
        "width": 2350,
        "image_url": "localhost:9000/images/0706419e-b024-469d-a354-9480cd79c6a5.jpeg",
        "cargo": "Автомобиль",
        "weight": 5000
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
}