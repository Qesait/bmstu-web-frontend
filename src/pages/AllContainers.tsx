import { useEffect, useState } from 'react';
import { SmallCard, IContairnerProps } from '../components/ContainerCard';

type Response = {
    draft_transportation: string;
    containers: IContairnerProps[];
}


const AllContainers = () => {
    const [containers, setContainers] = useState<IContairnerProps[]>([]);
    const [_, setDraftTransportation] = useState('');

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
        <div className="p-2 px-3">
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4'>
                {containers && containers.length > 0 ? (
                    containers.map((container) => (
                        <div className='d-flex py-1 p-sm-1 p-md-2 justify-content-center' key={container.uuid}>
                            <SmallCard  {...container} />
                        </div>
                    ))
                ) : (
                    <p>Loading containers...</p>
                )}
            </div>
        </div>
    )
}

export { AllContainers }