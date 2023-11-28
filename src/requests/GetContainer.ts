import { containers } from './MockData';
import { IContainerProps } from '../components/ContainerCard';

const api = '/api/containers/'

export async function getContainer(containerId?: string): Promise<IContainerProps | undefined> {
    if (containerId === undefined) {
        return undefined
    }
    let url = api + containerId
    return fetch(url)
        .then(response => {
            if (response.status >= 500 || response.headers.get("Server") == "GitHub.com") {
                return containers.get(containerId)
            }
            return response.json() as Promise<IContainerProps | undefined>
        })
        .catch(_ => {
            console.log("hi")
            return containers.get(containerId)
        })
}