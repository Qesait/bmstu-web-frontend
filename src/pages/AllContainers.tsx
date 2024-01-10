import { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from 'react-router-dom';

import { getAllContainers, axiosAPI } from '../api'
import { IContainer } from '../models'

import { AppDispatch, RootState } from "../store";
import { setType } from "../store/searchSlice"
import { clearHistory, addToHistory } from "../store/historySlice"

import ContainerCard from '../components/ContainerCard';
import LoadAnimation from '../components/LoadAnimation';

const AllContainers = () => {
    const searchText = useSelector((state: RootState) => state.search.type);
    const [containers, setContainers] = useState<IContainer[]>([])
    const [draft, setDraft] = useState<string | null>(null)
    const role = useSelector((state: RootState) => state.user.role);
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation().pathname;

    const getContainers = () =>
        getAllContainers(searchText)
            .then(data => {
                setContainers(data.containers)
                setDraft(data.draft_transportation)
            })


    const handleSearch = (event: React.FormEvent<any>) => {
        event.preventDefault();
        getContainers();
    }

    useEffect(() => {
        dispatch(clearHistory())
        dispatch(addToHistory({ path: location, name: "Контейнеры" }))
        getContainers();
    }, [dispatch]);

    const addToTransportation = (id: string) => () => {
        let accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return
        }

        axiosAPI.post(`/containers/${id}/add_to_transportation`, null, { headers: { 'Authorization': `Bearer ${accessToken}`, } })
            .then(() => {
                getContainers();
            })
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
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 px-1'>
                <LoadAnimation loaded={containers.length > 0}>
                    {containers.map((container) => (
                        <div className='d-flex p-2 justify-content-center' key={container.uuid}>
                            <ContainerCard  {...container}>
                                {role != 0 &&
                                    <Button
                                        variant='outline-primary'
                                        className='mt-0 rounded-bottom'
                                        onClick={addToTransportation(container.uuid)}>
                                        Добавить в корзину
                                    </Button>
                                }
                            </ContainerCard>
                        </div>
                    ))}
                </LoadAnimation>
            </div>
            {!!role && <Link to={`/transportations/${draft}`}>
                <Button
                    style={{ position: 'fixed', bottom: '16px', right: '16px', zIndex: '1000' }}
                    className="btn btn-primary rounded-pill"
                    disabled={!draft}>
                    Корзина
                </Button>
            </Link>}
        </>
    )
}

export default AllContainers