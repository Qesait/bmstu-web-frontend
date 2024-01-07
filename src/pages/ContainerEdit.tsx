import { FC, useEffect, useState, ChangeEvent, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Card, Row, Navbar, FloatingLabel, InputGroup, Form, Col, Button, ButtonGroup } from 'react-bootstrap';

import { axiosAPI, getContainer } from '../api'
import { IContainer } from '../models';

import { AppDispatch } from "../store";
import { addToHistory } from "../store/historySlice"

import LoadAnimation from '../components/LoadAnimation';
import CardImage from '../components/CardImage';
import Breadcrumbs from '../components/Breadcrumbs';

const ContainerInfo: FC = () => {
    let { container_id } = useParams()
    const [container, setContainer] = useState<IContainer | undefined>(undefined)
    const [loaded, setLoaded] = useState<Boolean>(false)
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation().pathname;
    const [edit, setEdit] = useState<Boolean>(false)
    const [image, setImage] = useState<File | undefined>(undefined);
    const inputFile = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setLoaded(false);
        getContainer(container_id)
            .then(data => {
                setContainer(data);
                dispatch(addToHistory({ path: location, name: data ? data.marking : "неизвестно" }));
                setLoaded(true);
            })
            .catch(() => setLoaded(true));
    }, [dispatch]);

    const changeString = (e: ChangeEvent<HTMLInputElement>) => {
        setContainer(container ? { ...container, [e.target.id]: e.target.value } : undefined)
    }

    const changeNumber = (e: ChangeEvent<HTMLInputElement>) => {
        setContainer(container ? { ...container, [e.target.id]: parseInt(e.target.value) } : undefined)
    }

    const save = () => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return
        }
        setEdit(false);

        const formData = new FormData();
        if (container) {
            Object.keys(container).forEach(key => {
                if ((container as any)[key]) {
                    formData.append(key, (container as any)[key])
                }
            });
        }
        if (image) {
            formData.append('image', image);
        }

        axiosAPI.put(`/containers/${container?.uuid}`, formData, { headers: { 'Authorization': `Bearer ${accessToken}`, } })
            .then(() => getContainer(container_id).then((data) => setContainer(data)))
    }

    const cancel = () => {
        setEdit(false)
        setImage(undefined)
        if (inputFile.current) {
            inputFile.current.value = ''
        }
        getContainer(container_id)
            .then((data) => setContainer(data))
    }

    return (
        <LoadAnimation loaded={loaded}>
            {container ? (
                <>
                    <Navbar>
                        <Breadcrumbs />
                    </Navbar>
                    <Card className='shadow-lg mb-3'>
                        <Row className='m-0'>
                            <Col className='col-12 col-md-8 overflow-hidden p-0'>
                                <CardImage url={container.image_url} />
                            </Col>
                            <Col className='d-flex flex-column col-12 col-md-4 p-0'>
                                <Card.Body className='flex-grow-1'>
                                    <InputGroup className='mb-1'>
                                        <InputGroup.Text className='c-input-group-text'>Маркировка</InputGroup.Text>
                                        <Form.Control id='marking' value={container.marking} readOnly={!edit} onChange={changeString} />
                                    </InputGroup>
                                    <FloatingLabel
                                        label="Тип"
                                        className="mb-3">
                                        <Form.Control
                                            id='type'
                                            value={container.type}
                                            as="textarea"
                                            className='h-25'
                                            readOnly={!edit}
                                            onChange={changeString} />
                                    </FloatingLabel>
                                    <InputGroup className='mb-1'>
                                        <InputGroup.Text className='c-input-group-text'>Длина</InputGroup.Text>
                                        <Form.Control id='length' type='number' value={container.length} readOnly={!edit} onChange={changeNumber} />
                                    </InputGroup>
                                    <InputGroup className='mb-1'>
                                        <InputGroup.Text className='c-input-group-text'>Высота</InputGroup.Text>
                                        <Form.Control id='height' type='number' value={container.height} readOnly={!edit} onChange={changeNumber} />
                                    </InputGroup>
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text className='c-input-group-text'>Ширина</InputGroup.Text>
                                        <Form.Control id='width' type='number' value={container.width} readOnly={!edit} onChange={changeNumber} />
                                    </InputGroup>
                                    <InputGroup className='mb-1'>
                                        <InputGroup.Text className='c-input-group-text'>Груз</InputGroup.Text>
                                        <Form.Control id='cargo' value={container.cargo} readOnly={!edit} onChange={changeString} />
                                    </InputGroup>
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Text className='c-input-group-text'>Вес</InputGroup.Text>
                                        <Form.Control id='weight' type='number' value={container.weight} readOnly={!edit} onChange={changeNumber} />
                                    </InputGroup>
                                    <Form.Group className="mb-1">
                                        <Form.Label>Выберите изображение</Form.Label>
                                        <Form.Control
                                            disabled={!edit}
                                            type="file"
                                            accept='image/*'
                                            ref={inputFile}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setImage(e.target.files?.[0])} />
                                    </Form.Group>
                                </Card.Body>
                                {edit ? (
                                    <ButtonGroup className='w-100'>
                                        <Button variant='success' onClick={save}>Сохранить</Button>
                                        <Button variant='danger' onClick={cancel}>Отменить</Button>
                                    </ButtonGroup>
                                ) : (
                                    <Button
                                        className='w-100 '
                                        onClick={() => setEdit(true)}>
                                        Изменить
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </Card>
                </ >
            ) : (
                <h3 className='text-center'>Такого контейнера не существует</h3>
            )
            }
        </LoadAnimation >
    )
}

export default ContainerInfo