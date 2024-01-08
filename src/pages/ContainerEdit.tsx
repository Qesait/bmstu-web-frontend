import { FC, useEffect, useState, ChangeEvent, useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
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
    const [edit, setEdit] = useState<boolean>(false)
    const [image, setImage] = useState<File | undefined>(undefined);
    const inputFile = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate()

    // There is no god beyond that
    useEffect(() => {
        const getData = async () => {
            setLoaded(false);
            let data: IContainer | undefined;
            let name: string;
            try {
                if (container_id == 'new') {
                    data = {
                        uuid: "",
                        marking: "",
                        type: "",
                        length: NaN,
                        height: NaN,
                        width: NaN,
                        image_url: "",
                        cargo: "",
                        weight: NaN,
                    }
                    name = 'Новый контейнер'
                    setEdit(true)
                } else {
                    data = await getContainer(container_id);
                    name = data ? data.marking : ''
                }
                setContainer(data);
                dispatch(addToHistory({ path: location, name: name }));
            } finally {
                setLoaded(true);
            }
        }

        getData();

    }, [dispatch]);

    const changeString = (e: ChangeEvent<HTMLInputElement>) => {
        setContainer(container ? { ...container, [e.target.id]: e.target.value } : undefined)
    }

    const changeNumber = (e: ChangeEvent<HTMLInputElement>) => {
        setContainer(container ? { ...container, [e.target.id]: parseInt(e.target.value) } : undefined)
    }

    const deleteContainer = () => {
        let accessToken = localStorage.getItem('access_token');
        axiosAPI.delete(`/containers/${container_id}`, { headers: { 'Authorization': `Bearer ${accessToken}`, } })
            .then(() => navigate('/containers-edit'))
    }

    const save = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formElement = event.currentTarget;
        if (!formElement.checkValidity()) {
            return
        }
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

        if (container_id == 'new') {
            axiosAPI.post(`/containers`, formData, { headers: { 'Authorization': `Bearer ${accessToken}`, } })
                .then((response) => getContainer(response.data).then((data) => setContainer(data)))
        } else {
            axiosAPI.put(`/containers/${container?.uuid}`, formData, { headers: { 'Authorization': `Bearer ${accessToken}`, } })
                .then(() => getContainer(container_id).then((data) => setContainer(data)))
        }
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
                                <Form noValidate validated={edit} onSubmit={save}>
                                    <Card.Body className='flex-grow-1'>
                                        <InputGroup hasValidation className='mb-1'>
                                            <InputGroup.Text className='c-input-group-text'>Маркировка</InputGroup.Text>
                                            <Form.Control id='marking' required type='text' value={container.marking} readOnly={!edit} onChange={changeString} />
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
                                                required
                                                onChange={changeString} />
                                        </FloatingLabel>
                                        <InputGroup className='mb-1'>
                                            <InputGroup.Text className='c-input-group-text'>Длина</InputGroup.Text>
                                            <Form.Control id='length' required type='number' value={isNaN(container.length) ? '' : container.length} readOnly={!edit} onChange={changeNumber} />
                                        </InputGroup>
                                        <InputGroup className='mb-1'>
                                            <InputGroup.Text className='c-input-group-text'>Высота</InputGroup.Text>
                                            <Form.Control id='height' required type='number' value={isNaN(container.height) ? '' : container.height} readOnly={!edit} onChange={changeNumber} />
                                        </InputGroup>
                                        <InputGroup className='mb-3'>
                                            <InputGroup.Text className='c-input-group-text'>Ширина</InputGroup.Text>
                                            <Form.Control id='width' required type='number' value={isNaN(container.width) ? '' : container.width} readOnly={!edit} onChange={changeNumber} />
                                        </InputGroup>
                                        <InputGroup className='mb-1'>
                                            <InputGroup.Text className='c-input-group-text'>Груз</InputGroup.Text>
                                            <Form.Control id='cargo' required value={container.cargo} readOnly={!edit} onChange={changeString} />
                                        </InputGroup>
                                        <InputGroup className='mb-3'>
                                            <InputGroup.Text className='c-input-group-text'>Вес</InputGroup.Text>
                                            <Form.Control id='weight' required type='number' value={isNaN(container.weight) ? '' : container.weight} readOnly={!edit} onChange={changeNumber} />
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
                                            <Button variant='success' type='submit'>Сохранить</Button>
                                            {container_id != 'new' && <Button variant='danger' onClick={cancel}>Отменить</Button>}
                                        </ButtonGroup>
                                    ) : (
                                        <ButtonGroup className='w-100'>
                                            <Button
                                                onClick={() => setEdit(true)}>
                                                Изменить
                                            </Button>
                                            <Button variant='danger' onClick={deleteContainer}>Удалить</Button>
                                        </ButtonGroup>
                                    )}
                                </Form>
                            </Col>
                        </Row>
                    </Card>
                </ >
            ) : (
                <h3 className='text-center'>Такого контейнера не существует</h3>
            )}
        </LoadAnimation >
    )
}

export default ContainerInfo