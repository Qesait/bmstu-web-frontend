// import { useEffect, useState, FC } from 'react';
import { useEffect, useState } from 'react';
import { SmallCard, ITransportationProps } from '../components/TransportationCard';
import LoadAnimation from '../components/LoadAnimation';
// import Navbar from 'react-bootstrap/Navbar';
// import Form from 'react-bootstrap/Form';
type Response = {
    transportations: ITransportationProps[];
}

// interface ISearchProps {
//     containers: IContairnerProps[]
//     setFilteredContainers: React.Dispatch<React.SetStateAction<IContairnerProps[]>>
// }

// const Search: FC<ISearchProps> = ({ containers, setFilteredContainers }) => {
//     const [searchText, setSearchText] = useState<string>('');

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchText(event.target.value)
//         if (event.target.value == '') {
//             setFilteredContainers(containers)
//         } else {
//             setFilteredContainers(
//                 containers.filter(
//                     (container) => container.marking.toLowerCase().includes(event.target.value.toLowerCase())
//                 )
//             )
//         }
//     }
//     return (
//         <Navbar>
//             <Form className="flex-grow-1 shadow shadow-sm">
//                 <Form.Control
//                     type="text"
//                     placeholder="Поиск"
//                     className="form-control-sm"
//                     data-bs-theme="dark"
//                     value={searchText}
//                     onChange={handleChange}
//                 />
//             </Form>
//         </Navbar>)
// }

function stringToDate(date: Date | null) {
    return date ? new Date(date) : null;
}

const AllTransportations = () => {
    const [loaded, setLoaded] = useState<boolean>(false)
    const [_, setTransportations] = useState<ITransportationProps[]>([]);
    const [filteredTransportations, setFilteredTransportations] = useState<ITransportationProps[]>([]);

    useEffect(() => {
        fetch('/api/transportations')
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<Response>
            })
            .then(data => {
                data.transportations.forEach((transportation) => {
                    transportation.creation_date = stringToDate(transportation.creation_date);
                    transportation.formation_date = stringToDate(transportation.formation_date);
                    transportation.completion_date = stringToDate(transportation.completion_date);
                });
                console.log(data)
                setTransportations(data.transportations)
                setFilteredTransportations(data.transportations)
                console.log(filteredTransportations)
                setLoaded(true)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            {/* <Search {...{ containers, setFilteredContainers }} /> */}
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 px-1'>
                {loaded ? (
                    filteredTransportations.map((transportation) => (
                        <div className='d-flex py-1 p-sm-2 p-md-2 justify-content-center' key={transportation.uuid}>
                            <SmallCard  {...transportation} />
                        </div>
                    ))
                ) : (
                    <LoadAnimation />
                )}
            </div>
        </>
    )
}



export { AllTransportations }