import { format } from 'date-fns';

import { axiosAPI } from ".";
import { IContainer, ITransportation } from "../models";

interface TransportationsResponse {
    transportations: ITransportation[]
}

function formatDate(date: Date | null): string {
    if (!date) {
        return ""
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes} ${day}.${month}.${year}`;
}

export async function getTransportations(
    status: string,
    startDate: string | null,
    endDate: string | null
): Promise<ITransportation[]> {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        return [];
    }
    return axiosAPI
        .get<TransportationsResponse>('/transportations', {
            params: {
                ...(status && { status: status }),
                ...(startDate && {
                    formation_date_start: format(new Date(startDate), 'yyyy-MM-dd HH:mm'),
                }),
                ...(endDate && {
                    formation_date_end: format(new Date(endDate), 'yyyy-MM-dd HH:mm'),
                }),
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
        .then((response) =>
            response.data.transportations.map((tr: ITransportation) => ({
                ...tr,
                creation_date: formatDate(new Date(tr.creation_date)),
                formation_date: tr.formation_date
                    ? formatDate(new Date(tr.formation_date))
                    : null,
                completion_date: tr.completion_date
                    ? formatDate(new Date(tr.completion_date))
                    : null,
            }))
        );
}

interface TransportationResponse {
    containers: IContainer[]
    transportation: ITransportation
}

export async function getTransportation(id: string | undefined): Promise<TransportationResponse | null> {
    if (id === undefined) { return null; }
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        return null;
    }

    return axiosAPI.get<TransportationResponse>(`/transportations/${id}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            const modifiedTransportation: ITransportation = {
                ...response.data.transportation,
                creation_date: formatDate(new Date(response.data.transportation.creation_date)),
                formation_date: response.data.transportation.formation_date
                    ? formatDate(new Date(response.data.transportation.formation_date))
                    : null,
                completion_date: response.data.transportation.completion_date
                    ? formatDate(new Date(response.data.transportation.completion_date))
                    : null,
            };

            return {
                ...response.data,
                transportation: modifiedTransportation,
            };
        })
}