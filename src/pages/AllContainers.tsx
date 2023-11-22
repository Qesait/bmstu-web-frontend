import { useEffect, useState, FC } from 'react';
import { SmallCCard, IContainerProps } from '../components/ContainerCard';
import LoadAnimation from '../components/LoadAnimation';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
type Response = {
    draft_transportation: string;
    containers: IContainerProps[];
}

interface ISearchProps {
    containers: IContainerProps[]
    setFilteredContainers: React.Dispatch<React.SetStateAction<IContainerProps[]>>
}

const Search: FC<ISearchProps> = ({ containers, setFilteredContainers }) => {
    const [searchText, setSearchText] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value)
        if (event.target.value == '') {
            setFilteredContainers(containers)
        } else {
            setFilteredContainers(
                containers.filter(
                    (container) => container.marking.toLowerCase().includes(event.target.value.toLowerCase())
                )
            )
        }
    }
    return (
        <Navbar>
            <Form className="flex-grow-1 shadow shadow-sm">
                <Form.Control
                    type="text"
                    placeholder="Поиск"
                    className="form-control-sm"
                    data-bs-theme="dark"
                    value={searchText}
                    onChange={handleChange}
                />
            </Form>
        </Navbar>)
}

const AllContainers = () => {
    const [loaded, setLoaded] = useState<boolean>(false)
    const [containers, setContainers] = useState<IContainerProps[]>([]);
    const [filteredContainers, setFilteredContainers] = useState<IContainerProps[]>([]);
    const [_, setDraftTransportation] = useState('');

    useEffect(() => {
        fetch('/api/containers')
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<Response>
            })
            .then(data => {
                console.log(data)
                setDraftTransportation(data.draft_transportation)
                setContainers(data.containers)
                setFilteredContainers(data.containers)
                setLoaded(true)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            <Search {...{ containers, setFilteredContainers }} />
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 px-1'>
                {loaded ? (
                    filteredContainers.map((container) => (
                        <div className='d-flex py-1 p-sm-2 p-md-2 justify-content-center' key={container.uuid}>
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