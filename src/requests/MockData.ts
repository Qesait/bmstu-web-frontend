import { IContainerProps } from '../components/ContainerCard';

export const draft_transportation = null
export let containers = new Map<string, IContainerProps>([
    ["a20163ce-7be5-46ec-a50f-a313476b2bd1",
        {
            uuid: "a20163ce-7be5-46ec-a50f-a313476b2bd1",
            marking: "CCCU6543210",
            type: "Стандартный 20-ти футовый контейнер",
            length: 5905,
            height: 2381,
            width: 2350,
            image_url: "localhost:9000/images/a20163ce-7be5-46ec-a50f-a313476b2bd1.jpg",
            cargo: "Зерно",
            weight: 15000
        }
    ],
    ["8f157a95-dad1-43e0-9372-93b51de06163", {
        uuid: "8f157a95-dad1-43e0-9372-93b51de06163",
        marking: "DDDU6543210",
        type: "20 футовый контейнер увеличенной высоты",
        length: 5905,
        height: 2596,
        width: 2350,
        image_url: "localhost:9000/images/8f157a95-dad1-43e0-9372-93b51de06163.jpg",
        cargo: "Фрукты",
        weight: 13000
    }
    ],
    ["07d0cbdc-8e0f-4308-a7aa-11976ee6e5b2", {
        uuid: "07d0cbdc-8e0f-4308-a7aa-11976ee6e5b2",
        marking: "BBBU6543210",
        type: "Стандартный 40-ка футовый контейнер",
        length: 12045,
        height: 2381,
        width: 2350,
        image_url: "localhost:9000/images/07d0cbdc-8e0f-4308-a7aa-11976ee6e5b2.jpg",
        cargo: "Телевизоры",
        weight: 19000
    }
    ]
])