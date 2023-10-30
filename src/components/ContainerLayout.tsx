import React, { FC, useEffect, useState } from 'react';
import { ContainerCard, IContairnerProps } from './ContainerCard';

type Response = {
    draft_transportation: string;
    containers: IContairnerProps[];
}

const ContainerLayout: FC = () => {
    const [containers, setContainers] = useState<IContairnerProps[]>([]);
    const [draftTransportation, setDraftTransportation] = useState('');

    useEffect(() => {
        fetch('/api/containers')
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<Response>
            })
            .then(data => {
                console.log(data)
                setDraftTransportation(data.draft_transportation)
                setContainers(data.containers)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    return (
        <div className='container_layout'>
            {containers && containers.length > 0 ? (
                containers.map((container) => (
                    <ContainerCard key={container.uuid} {...container} />
                ))
            ) : (
                <p>Loading containers...</p>
            )}
        </div>
    );
}

export default ContainerLayout;