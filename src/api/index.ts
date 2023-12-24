import { containers, draft_transportation } from './MockData';
import { IContainer } from '../models';
import axios from 'axios';


const ip = 'localhost'
const port = '3000'
export const imagePlaceholder = `${import.meta.env.BASE_URL}placeholder.jpg`

export const axiosAPI = axios.create({ baseURL: `http://${ip}:${port}/api/`, timeout: 500 });
export const axiosImage = axios.create({ baseURL: `http://${ip}:${port}/images/`, timeout: 1000 });

export type Response = {
    draft_transportation: string | null;
    containers: IContainer[];
}

export async function getAllContainers(filter?: string): Promise<Response> {
    let url = 'containers';
    if (filter !== undefined) {
        url += `?type=${filter}`;
    }
    return axiosAPI.get<Response>(url)
        .then(response => response.data)
        .catch(_ => fromMock(filter))
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

export async function getContainer(containerId?: string): Promise<IContainer | undefined> {
    if (containerId === undefined) {
        return undefined
    }
    let url = 'containers/' + containerId
    return axiosAPI.get<IContainer>(url)
        .then(response => response.data)
        .catch(_ => containers.get(containerId))
}