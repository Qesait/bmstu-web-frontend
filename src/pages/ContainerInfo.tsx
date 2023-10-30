import { useParams } from 'react-router-dom';

const ContainerInfo = () => {
    let { container_id } = useParams()
    return (
        <div>
            <h1>{container_id}</h1>
            <p>Look, it your container!</p>
        </div>
    )
}

export {ContainerInfo}