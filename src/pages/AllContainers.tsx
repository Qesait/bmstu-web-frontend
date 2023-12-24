import { useEffect } from 'react';
import { SmallCCard } from '../components/ContainerCard';
import LoadAnimation from '../components/LoadAnimation';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getAllContainers } from '../api'
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setContainers } from "../store/containerSlice"
import { setDraft } from '../store/transportationSlice';

const AllContainers = () => {
    const searchText = useSelector((state: RootState) => state.container.searchText);
    const containers = useSelector((state: RootState) => state.container.containers);
    const _ = useSelector((state: RootState) => state.transportation.draft);
    const dispatch = useDispatch<AppDispatch>();

    const getContainers = () =>
        getAllContainers(searchText)
            .then(data => {
                dispatch(setContainers(data?.containers))
                dispatch(setDraft(data?.draft_transportation))
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });


    const handleSearch = (event: React.FormEvent<any>) => {
        event.preventDefault();
        getContainers();
    }

    useEffect(() => {
        getContainers();
    }, [dispatch]);

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
                            <SmallCCard  {...container} />
                        </div>
                    ))
                ) : (
                    <LoadAnimation />
                )}
            </div>
        </>
    )
}

export default AllContainers