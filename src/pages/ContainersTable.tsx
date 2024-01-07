import { useEffect, useState } from 'react';
import { Navbar, Form, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from 'react-router-dom';

import { getAllContainers, axiosAPI } from '../api'
import { IContainer } from '../models'

import { AppDispatch, RootState } from "../store";
import { setType } from "../store/searchSlice"
import { clearHistory, addToHistory } from "../store/historySlice"

import LoadAnimation from '../components/LoadAnimation';
import CardImage from '../components/CardImage';


const ContainerTable = () => {
    const searchText = useSelector((state: RootState) => state.search.type);
    const [containers, setContainers] = useState<IContainer[]>([])
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation().pathname;

    const getContainers = () =>
        getAllContainers(searchText)
            .then(data => {
                setContainers(data.containers)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });


    const handleSearch = (event: React.FormEvent<any>) => {
        event.preventDefault();
        setContainers([])
        getContainers();
    }

    useEffect(() => {
        dispatch(clearHistory())
        dispatch(addToHistory({ path: location, name: "Управление контейнерами" }))
        getContainers();
    }, [dispatch]);

    const deleteContainer = (uuid: string) => () => {
        let accessToken = localStorage.getItem('access_token');
        axiosAPI.delete(`/containers/${uuid}`, { headers: { 'Authorization': `Bearer ${accessToken}`, } })
            .then(() => getContainers())
    }

    return (
        <>
            <Navbar>
                <Form className="d-flex flex-row flex-grow-1 gap-2" onSubmit={handleSearch}>
                    <Form.Control
                        type="text"
                        placeholder="Поиск"
                        className="form-control-sm flex-grow-1 shadow"
                        data-bs-theme="dark"
                        value={searchText}
                        onChange={(e) => dispatch(setType(e.target.value))}
                    />
                    <Button
                        variant="primary"
                        size="sm"
                        type="submit"
                        className="shadow-lg">
                        Поиск
                    </Button>
                </Form>
            </Navbar>
            < LoadAnimation loaded={containers.length > 0}>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th className='text-center'>Изображение</th>
                            <th className='text-center'>Маркировка</th>
                            <th className='text-center'>Тип</th>
                            <th className='text-center'>Груз</th>
                            <th className='text-center text-nowrap'>Вес, кг</th>
                            <th className=''></th>
                        </tr>
                    </thead>
                    <tbody>
                        {containers.map((container) => (
                            <tr key={container.uuid}>
                                <td style={{ width: '15%' }} className='p-0'>
                                    <CardImage url={container.image_url} />
                                </td>
                                <td className='text-center'>{container.marking}</td>
                                <td className='text-center'>{container.type}</td>
                                <td className='text-center'>{container.cargo}</td>
                                <td className='text-center'>{container.weight}</td>
                                <td className='text-center align-middle'>
                                    <Table className='m-0'>
                                        <tbody>
                                            <tr>
                                                <td style={{ background: 'transparent', border: 'none' }}>
                                                    <Link
                                                        to={`/containers-edit/${container.uuid}`}
                                                        className='btn btn-sm btn-outline-secondary text-decoration-none w-100' >
                                                        Редактировать
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr >
                                                <td style={{ background: 'transparent', border: 'none' }}>
                                                    <Button
                                                        variant='outline-danger'
                                                        size='sm'
                                                        className='w-100'
                                                        onClick={deleteContainer(container.uuid)}>
                                                        Удалить
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </LoadAnimation >
        </>
    )
}

export default ContainerTable