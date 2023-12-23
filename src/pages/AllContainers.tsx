import { useEffect, useState } from 'react';
import { SmallCCard, IContainerProps } from '../components/ContainerCard';
import LoadAnimation from '../components/LoadAnimation';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getAllContainers } from '../api'
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../store/containerFilterSlice"

const AllContainers = () => {
    const [loaded, setLoaded] = useState<boolean>(false)
    const [containers, setContainers] = useState<IContainerProps[]>([]);
    const [_, setDraftTransportation] = useState<string | null>(null);
    const searchText = useSelector((state: RootState) => state.containerFilter.searchText);
    const dispatch = useDispatch<AppDispatch>();

    const handleSearch = (event: React.FormEvent<any>) => {
        event.preventDefault();
        getAllContainers(searchText)
            .then(data => setContainers(data.containers))
    }

    useEffect(() => {
        getAllContainers(searchText)
            .then(data => {
                setDraftTransportation(data.draft_transportation)
                setContainers(data.containers)
                setLoaded(true)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

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
                        // onChange={(e) => setSearchText(e.target.value)}
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
                {loaded ? (
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