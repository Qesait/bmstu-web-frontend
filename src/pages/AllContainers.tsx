import { useEffect, useState, FC } from 'react';
import { SmallCCard, IContainerProps } from '../components/ContainerCard';
import LoadAnimation from '../components/LoadAnimation';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getAllContainers } from '../requests/GetAllContainers'

interface ISearchProps {
    setContainers: React.Dispatch<React.SetStateAction<IContainerProps[]>>
}

const Search: FC<ISearchProps> = ({ setContainers }) => {
    const [searchText, setSearchText] = useState<string>('');

    const handleSearch = (event: React.FormEvent<any>) => {
        event.preventDefault();
        getAllContainers(searchText)
            .then(data => {
                // console.log(data)
                setContainers(data.containers)
            })
    }
    return (
        <Navbar>
            <Form className="d-flex flex-row flex-grow-1 gap-2" onSubmit={handleSearch}>
                <Form.Control
                    type="text"
                    placeholder="Поиск"
                    className="form-control-sm flex-grow-1 shadow shadow-sm"
                    data-bs-theme="dark"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button
                    variant="primary"
                    size="sm"
                    type="submit"
                    className="shadow">
                    Поиск
                </Button>
            </Form>
        </Navbar>)
}

const AllContainers = () => {
    const [loaded, setLoaded] = useState<boolean>(false)
    const [containers, setContainers] = useState<IContainerProps[]>([]);
    const [_, setDraftTransportation] = useState<string | null>(null);

    useEffect(() => {
        getAllContainers()
            .then(data => {
                // console.log(data)
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
            <Search setContainers={setContainers} />
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

export { AllContainers }