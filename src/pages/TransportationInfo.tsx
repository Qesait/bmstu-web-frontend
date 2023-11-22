import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IContainerProps } from '../components/ContainerCard';
import { BigTCard, ITransportationProps } from '../components/TransportationCard';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import LoadAnimation from '../components/LoadAnimation';

type Response = {
    transportation: ITransportationProps;
    containers: IContainerProps[];
}

function stringToDate(date: Date | null) {
    return date ? new Date(date) : null;
}

const TransportationInfo: FC = () => {
    let { transportation_id } = useParams()
    const [transportation, setTransportation] = useState<ITransportationProps>()
    const [containers, setContainers] = useState<IContainerProps[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        fetch(`/api/transportations/${transportation_id}`)
            .then(response => {
                setLoaded(true)
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<Response>
            })
            .then(data => {
                data.transportation.creation_date = stringToDate(data.transportation.creation_date);
                data.transportation.formation_date = stringToDate(data.transportation.formation_date);
                data.transportation.completion_date = stringToDate(data.transportation.completion_date);
                setTransportation(data.transportation)
                setContainers(data.containers)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            <Navbar>
                <Nav>
                    <Link to="/transportations" className="nav-link p-0 text-dark" data-bs-theme="dark">
                        Перевозки
                    </Link>
                    <Nav.Item className='mx-1'>{">"}</Nav.Item>
                    <Nav.Item className="nav-link p-0 text-dark">
                        {`${transportation ? transportation.uuid : 'неизвестно'}`}
                    </Nav.Item>
                </Nav>
            </Navbar>
            {loaded ? (
                transportation ? (
                    <BigTCard transportation={transportation} containers={containers} />
                ) : (
                    <h4 className='text-center'>Такой перевозки не существует</h4>
                )
            ) : (
                <LoadAnimation />
            )
            }
            {/* <LoadAnimation /> */}
        </ >
    )
}

export { TransportationInfo }