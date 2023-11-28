import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BigCCard, IContainerProps } from '../components/ContainerCard';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import LoadAnimation from '../components/LoadAnimation';
import { getContainer } from '../requests/GetContainer'

const ContainerInfo: FC = () => {
    let { container_id } = useParams()
    const [container, setContainer] = useState<IContainerProps>()
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        getContainer(container_id)
            .then(data => {
                setContainer(data)
                setLoaded(true)
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
                        {`${container ? container.marking : 'неизвестно'}`}
                    </Nav.Item>
                </Nav>
            </Navbar>
            {loaded ? (
                container ? (
                    <BigCCard {...container} />
                ) : (
                    <h3 className='text-center'>Такого контейнера не существует</h3>
                )
            ) : (
                <LoadAnimation />
            )
            }
        </ >
    )
}

export { ContainerInfo }