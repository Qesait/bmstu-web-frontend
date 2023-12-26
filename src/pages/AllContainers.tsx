import { useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from 'react-router-dom';

import { getAllContainers, axiosAPI } from '../api'

import { AppDispatch, RootState } from "../store";
import { setFilter, setContainers } from "../store/containerSlice"
import { clearHistory, addToHistory } from "../store/historySlice"
import { setDraft } from '../store/transportationSlice';

import { SmallCCard } from '../components/ContainerCard';
import LoadAnimation from '../components/LoadAnimation';

const AllContainers = () => {
    const searchText = useSelector((state: RootState) => state.container.searchText);
    const containers = useSelector((state: RootState) => state.container.containers);
    const role = useSelector((state: RootState) => state.user.role);
    const draft = useSelector((state: RootState) => state.transportation.draft);
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation().pathname;

    const getContainers = () =>
        getAllContainers(searchText)
            .then(data => {
                console.log(data)
                dispatch(setContainers(data?.containers))
                dispatch(setDraft(data?.draft_transportation?.uuid))
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });


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
            .then(response => {
                dispatch(setDraft(response.data.uuid))
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
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
                        onChange={(e) => dispatch(setFilter(e.target.value))}
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
                {containers ? (
                    containers.map((container) => (
                        <div className='d-flex p-2 justify-content-center' key={container.uuid}>
                            <SmallCCard  {...container}>
                                {role != '0' &&
                                    <Button
                                        variant='outline-primary'
                                        className='mt-0 rounded-bottom'
                                        onClick={addToTransportation(container.uuid)}>
                                        Добавить в корзину
                                    </Button>
                                }
                            </SmallCCard>
                        </div>
                    ))
                ) : (
                    <LoadAnimation />
                )}
            </div>
            {draft && <Link
                to={`/transportations/${draft}`}
                className="btn btn-primary rounded-pill"
                style={{ position: 'fixed', bottom: '16px', right: '16px', zIndex: '1000' }}>
                Корзина
            </Link>}
        </>
    )
}

export default AllContainers