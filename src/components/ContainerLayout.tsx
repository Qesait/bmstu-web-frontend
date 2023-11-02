import { FC, useEffect, useState } from 'react';
import { SmallCard, IContairnerProps } from './ContainerCard';

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
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4'>
            {containers && containers.length > 0 ? (
                containers.map((container) => (
                    <div className='d-flex py-1 px-0 p-sm-1 p-md-2'>
                        <SmallCard key={container.uuid} {...container} />
                    </div>
                ))
            ) : (
                <p>Loading containers...</p>
            )}
        </div>
    );
}

export default ContainerLayout;