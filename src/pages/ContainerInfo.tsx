import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BigCard, IContairnerProps } from '../components/ContainerCard';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

// TODO: handle 404
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
            <Navbar>
                <Nav>
                    <Link to="/containers" className="nav-link p-0 text-dark" data-bs-theme="dark">
                        Контейнеры
                    </Link>
                    <Nav.Item className='mx-1'>{">"}</Nav.Item>
                    <Nav.Item className="nav-link p-0 text-dark">
                        {`${container ? container.marking : ''}`}
                    </Nav.Item>
                </Nav>
            </Navbar>
            {container ? (
                <div>
                    <BigCard {...container} />
                </div>
            ) : (<p>Loading container...</p>)}
        </ >
    )
}

export { ContainerInfo }