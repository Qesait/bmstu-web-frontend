import { FC, useEffect, useState } from 'react';
import { SmallCard, IContairnerProps } from './ContainerCard';
import './ContainerLayout.css'

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
                    <SmallCard key={container.uuid} {...container} />
                ))
            ) : (
                <p>Loading containers...</p>
            )}
        </div>
    );
}

export default ContainerLayout;