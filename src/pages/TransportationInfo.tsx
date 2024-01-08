import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { Card, Row, Col, Navbar, InputGroup, Form, Button, ButtonGroup } from 'react-bootstrap';

import { axiosAPI } from "../api";
import { getTransportation } from '../api/Transportations';
import { ITransportation, IContainer } from "../models";

import { AppDispatch } from "../store";
import { addToHistory } from "../store/historySlice";

import LoadAnimation from '../components/LoadAnimation';
import ContainerCard from '../components/ContainerCard';
import Breadcrumbs from '../components/Breadcrumbs';

const TransportationInfo = () => {
    let { transportation_id } = useParams()
    const [transportation, setTransportation] = useState<ITransportation | null>(null)
    const [composition, setComposition] = useState<IContainer[] | null>([])
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation().pathname;
    const [edit, setEdit] = useState(false)
    const [transport, setTransport] = useState<string>('')
    const navigate = useNavigate()

    const getData = () => {
        getTransportation(transportation_id)
            .then(data => {
                if (data === null) {
                    setTransportation(null)
                    setComposition([])
                } else {
                    setTransportation(data.transportation);
                    setTransport(data.transportation.transport ? data.transportation.transport : '')
                    setComposition(data.containers);

                }
            })
    }

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
            .then(() => getData())
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
        setEdit(false);
    }

    useEffect(() => {
        dispatch(addToHistory({ path: location, name: "Перевозка" }))
        getData()
        setLoaded(true)
    }, [dispatch]);

    const delFromTransportation = (id: string) => () => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return
        }
        axiosAPI.delete(`/transportations/delete_container/${id}`, { headers: { 'Authorization': `Bearer ${accessToken}`, } })
            .then(() => getData())
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    const confirm = () => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return
        }
        axiosAPI.put('/transportations/user_confirm', null, { headers: { 'Authorization': `Bearer ${accessToken}`, } })
            .then(_ => {
                getData()
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    const deleteT = () => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return
        }
        axiosAPI.delete('/transportations', { headers: { 'Authorization': `Bearer ${accessToken}`, } })
            .then(_ => {
                navigate('/containers')
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    return (
        <LoadAnimation loaded={loaded}>
            {transportation ? (
                <>
                    <Navbar>
                        <Breadcrumbs />
                    </Navbar>
                    <Col className='p-3 pt-1'>
                        <Card className='shadow text center text-md-start'>
                            <Card.Body>
                                <InputGroup className='mb-1'>
                                    <InputGroup.Text className='t-input-group-text'>Статус</InputGroup.Text>
                                    <Form.Control readOnly value={transportation.status} />
                                </InputGroup>
                                <InputGroup className='mb-1'>
                                    <InputGroup.Text className='t-input-group-text'>Создана</InputGroup.Text>
                                    <Form.Control readOnly value={transportation.creation_date} />
                                </InputGroup>
                                <InputGroup className='mb-1'>
                                    <InputGroup.Text className='t-input-group-text'>Сформирована</InputGroup.Text>
                                    <Form.Control readOnly value={transportation.formation_date ? transportation.formation_date : ''} />
                                </InputGroup>
                                {(transportation.status == 'отклонена' || transportation.status == 'завершена') && <InputGroup className='mb-1'>
                                    <InputGroup.Text className='t-input-group-text'>{transportation.status === 'отклонена' ? 'Отклонена' : 'Завершена'}</InputGroup.Text>
                                    <Form.Control readOnly value={transportation.completion_date ? transportation.completion_date : ''} />
                                </InputGroup>}
                                <InputGroup className='mb-1'>
                                    <InputGroup.Text className='t-input-group-text'>Транспорт</InputGroup.Text>
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
                                    <InputGroup className='mb-1'>
                                        <InputGroup.Text className='t-input-group-text'>Статус доставки</InputGroup.Text>
                                        <Form.Control readOnly value={transportation.delivery_status ? transportation.delivery_status : ''} />
                                    </InputGroup>}
                                {transportation.status == 'черновик' &&
                                    <ButtonGroup className='flex-grow-1 w-100'>
                                        <Button variant='success' onClick={confirm}>Сформировать</Button>
                                        <Button variant='danger' onClick={deleteT}>Удалить</Button>
                                    </ButtonGroup>}
                            </Card.Body>
                        </Card>
                        {composition && <Row className='row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 px-1 mt-2'>
                            {composition.map((container) => (
                                <div className='d-flex p-2 justify-content-center' key={container.uuid}>
                                    <ContainerCard  {...container}>
                                        {transportation.status == 'черновик' &&
                                            <Button
                                                variant='outline-danger'
                                                className='mt-0 rounded-bottom'
                                                onClick={delFromTransportation(container.uuid)}>
                                                Удалить
                                            </Button>}
                                    </ContainerCard>
                                </div>
                            ))}
                        </Row>}
                    </Col>
                </>
            ) : (
                <h4 className='text-center'>Такой перевозки не существует</h4>
            )}
        </LoadAnimation>
    )
}

export default TransportationInfo