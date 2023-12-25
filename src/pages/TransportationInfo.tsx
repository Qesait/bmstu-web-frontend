import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from 'react-router-dom'
import { Card, Row, Col, Navbar, Nav, InputGroup, Form, Button } from 'react-bootstrap';

import { axiosAPI } from "../api";
import { ITransportation, IContainer } from "../models";

import { AppDispatch, RootState } from "../store";
import { setTransportation, resetTransportation, setComposition } from "../store/transportationSlice";
import { addToHistory } from "../store/historySlice";

import AuthCheck, { CUSTOMER } from '../components/AuthCheck'
import LoadAnimation from '../components/LoadAnimation';
import { SmallCCard } from '../components/ContainerCard';
import Breadcrumbs from '../components/Breadcrumbs';

interface ApiResponse {
    transportation: ITransportation
    containers: IContainer[]
}

const TransportationInfo = () => {
    let { transportation_id } = useParams()
    const transportation = useSelector((state: RootState) => state.transportation.transportation);
    const composition = useSelector((state: RootState) => state.transportation.transportationComposition);
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation().pathname;
    const [edit, setEdit] = useState(false)
    const [transport, setTransport] = useState<string>('')

    const update = () => {
        let accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return
        }
        axiosAPI.put(`/transportations`,
            { transport: transport },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log(response.data)
                dispatch(setTransportation(response.data))
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
        setEdit(false);
    }

    useEffect(() => {
        let accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return
        }

        axiosAPI.get<ApiResponse>(`/transportations/${transportation_id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log(response.data)
                dispatch(setTransportation(response.data.transportation))
                dispatch(setComposition(response.data.containers))
                dispatch(addToHistory({ path: location, name: "Перевозка" }))
                setTransport(response.data.transportation.transport ? response.data.transportation.transport : '')
                setLoaded(true)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });

        return () => {
            dispatch(resetTransportation());
        };
    }, [dispatch]);

    return (
        <AuthCheck allowedRole={CUSTOMER}>
            {loaded ? (
                transportation ? (
                    <>
                        <Navbar>
                            <Nav>
                                <Breadcrumbs />
                            </Nav>
                        </Navbar>
                        <Col className='p-3'>
                            <Card className='shadow text center text-md-start'>
                                <Card.Body>
                                    <InputGroup className='mb-1'>
                                        <InputGroup.Text>Статус</InputGroup.Text>
                                        <Form.Control readOnly value={transportation.status} />
                                    </InputGroup>
                                    <InputGroup className='mb-1'>
                                        <InputGroup.Text>Создана</InputGroup.Text>
                                        <Form.Control readOnly value={transportation.creation_date} />
                                    </InputGroup>
                                    <InputGroup className='mb-1'>
                                        <InputGroup.Text>Сформирована</InputGroup.Text>
                                        <Form.Control readOnly value={transportation.formation_date ? transportation.formation_date : ''} />
                                    </InputGroup>
                                    <InputGroup className='mb-1'>
                                        <InputGroup.Text>{transportation.status === 'отклонена' ? 'Отклонена' : 'Подтверждена'}</InputGroup.Text>
                                        <Form.Control readOnly value={transportation.completion_date ? transportation.completion_date : ''} />
                                    </InputGroup>
                                    <InputGroup className='mb-1'>
                                        <InputGroup.Text>Транспорт</InputGroup.Text>
                                        <Form.Control
                                            readOnly={!edit}
                                            value={transport}
                                            onChange={(e) => setTransport(e.target.value)}
                                        />
                                        {!edit && transportation.status === 'черновик' && <Button onClick={() => setEdit(true)}>Изменить</Button>}
                                        {edit && <Button variant='success' onClick={update}>Сохранить</Button>}
                                        {edit && <Button
                                            variant='danger'
                                            onClick={() => {
                                                setTransport(transportation.transport ? transportation.transport : '');
                                                setEdit(false)
                                            }}>
                                            Отменить
                                        </Button>}
                                    </InputGroup>
                                    {transportation.status != 'черновик' &&
                                        <InputGroup>
                                            <InputGroup.Text>Статус доставки</InputGroup.Text>
                                            <Form.Control readOnly value={transportation.delivery_status ? transportation.delivery_status : ''} />
                                        </InputGroup>}
                                </Card.Body>
                            </Card>
                            <Row className='row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 px-1 mt-2'>
                                {composition.map((container) => (
                                    <div className='d-flex p-2 justify-content-center' key={container.uuid}>
                                        <SmallCCard  {...container} />
                                    </div>
                                ))}
                            </Row>
                        </Col>
                    </>
                ) : (
                    <h4 className='text-center'>Такой перевозки не существует</h4>
                )
            ) : (
                <LoadAnimation />
            )}
        </AuthCheck >
    )
}

export default TransportationInfo