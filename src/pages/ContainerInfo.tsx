import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BigCard, IContairnerProps } from '../components/ContainerCard';

const ContainerInfo: FC = () => {
    let { container_id } = useParams()
    const [container, setContainer] = useState<IContairnerProps>()

    useEffect(() => {
        fetch(`/api/containers/${container_id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<IContairnerProps>
            })
            .then(data => {
                setContainer(data)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            {container ? (
                <>
                    <BigCard {...container} />
                </>
            ) : (<p>Loading containers...</p>)}
        </ >
    )
}

export { ContainerInfo }