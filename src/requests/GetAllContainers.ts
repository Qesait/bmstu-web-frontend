import { containers, draft_transportation } from './MockData';
import { IContainerProps } from '../components/ContainerCard';

export type Response = {
    draft_transportation: string | null;
    containers: IContainerProps[];
}

export async function getAllContainers(filter?: string): Promise<Response> {
    let url = '/api/containers'
    if (filter !== undefined) {
        url += `?type=${filter}`
    }
    return fetch(url)
        .then(response => {
            if (response.status >= 500 || response.headers.get("Server") == "GitHub.com") {
                return fromMock(filter)
            }
            return response.json() as Promise<Response>
        })
        .catch(_ => {
            return fromMock(filter)
        })
}

function fromMock(filter?: string): Response {
    let filteredContainers = Array.from(containers.values())
    if (filter !== undefined) {
        let type = filter.toLowerCase()
        filteredContainers = filteredContainers.filter(
            (container) => container.type.toLowerCase().includes(type)
        )
    }
    return { draft_transportation, containers: filteredContainers }
}