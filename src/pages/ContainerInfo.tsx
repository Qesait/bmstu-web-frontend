import { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Card, Row, Navbar, ListGroup } from 'react-bootstrap';

import { getContainer } from '../api'
import { IContainer } from '../models';

import { AppDispatch } from "../store";
import { addToHistory } from "../store/historySlice"

import LoadAnimation from '../components/LoadAnimation';
import CardImage from '../components/CardImage';
import Breadcrumbs from '../components/Breadcrumbs';

const ContainerInfo: FC = () => {
    let { container_id } = useParams()
    const [container, setContainer] = useState<IContainer | undefined>(undefined)
    const [loaded, setLoaded] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation().pathname;

    console.log()

    useEffect(() => {
        getContainer(container_id)
            .then(data => {
                setContainer(data);
                dispatch(addToHistory({ path: location, name: data ? data.marking : "неизвестно" }));
                setLoaded(true);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [dispatch]);

    return (
        <LoadAnimation loaded={loaded}>
            {container ? (
                <>
                    <Navbar>
                        <Breadcrumbs />
                    </Navbar>
                    <Card className='shadow-lg text-center text-md-start'>
                        <Row>
                            <div className='col-12 col-md-8 overflow-hidden'>
                                <CardImage url={container.image_url} />
                            </div>
                            <Card.Body className='col-12 col-md-4 ps-md-0'>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Card.Title>{container.marking}</Card.Title>
                                        <Card.Text>Тип: {container.type}</Card.Text>
                                        <Card.Text>Длинна: {container.length} мм</Card.Text>
                                        <Card.Text>Высота: {container.height} мм</Card.Text>
                                        <Card.Text>Ширина: {container.width} мм</Card.Text>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Card.Text>Груз: {container.cargo}</Card.Text>
                                        <Card.Text>Вес: {container.weight} кг</Card.Text>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Row>
                    </Card>
                </ >
            ) : (
                <h3 className='text-center'>Такого контейнера не существует</h3>
            )}
        </LoadAnimation>
    )
}

export default ContainerInfo