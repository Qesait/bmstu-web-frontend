import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { axiosAPI } from "../api";
import { ITransportation, IContainer } from "../models";

import { AppDispatch, RootState } from "../store";
import { setTransportation, setComposition } from "../store/transportationSlice";
import { addToHistory } from "../store/historySlice";

import AuthCheck, { CUSTOMER } from '../components/AuthCheck'
import LoadAnimation from '../components/LoadAnimation';
import { SmallCCard } from '../components/ContainerCard';
import Breadcrumbs from '../components/Breadcrumbs';

interface ApiResponse {
    transportation: ITransportation
    containers: IContainer[]
}

const TransportationInfo = () => {
    let { transportation_id } = useParams()
    const transportation = useSelector((state: RootState) => state.transportation.transportation);
    const composition = useSelector((state: RootState) => state.transportation.transportationComposition);
    const [loaded, setLoaded] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation().pathname;

    useEffect(() => {
        let accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return
        }

        axiosAPI.get<ApiResponse>(`/transportations/${transportation_id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log(response.data)
                dispatch(setTransportation(response.data.transportation))
                dispatch(setComposition(response.data.containers))
                dispatch(addToHistory({ path: location, name: "Перевозка" }))
                setLoaded(true)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [dispatch]);

    return loaded ? (
        transportation ? (
            <AuthCheck allowedRole={CUSTOMER}>
                <Navbar>
                    <Nav>
                        <Breadcrumbs />
                    </Nav>
                </Navbar>
                <Card className='shadow-lg text center text-md-start'>
                    <Row className="m-0">
                        <Card.Body className='col-12 col-md-4 pe-md-0'>
                            <Card.Text>Статус: {transportation.status}</Card.Text>
                            <Card.Text>Дата создания: {formatDateToString(new Date(transportation.creation_date))}</Card.Text>
                            {transportation.formation_date ? (<Card.Text>Дата формирования: {formatDateToString(new Date(transportation.formation_date))}</Card.Text>) : (<></>)}
                            {transportation.completion_date ? <Card.Text>Дата подтверждения: {formatDateToString(new Date(transportation.completion_date))}</Card.Text> : <></>}
                            <Card.Text>Транспорт: {transportation.transport ? transportation.transport : "Неизвестен"}</Card.Text>
                        </Card.Body>
                        <Col className='col-12 col-md-8'>
                            <Row className='row-cols-1 row-cols-sm-2 row-cols-xl-4 px-1'>
                                {composition.map((container) => (
                                    <div className='d-flex p-2 justify-content-center' key={container.uuid}>
                                        <SmallCCard  {...container} />
                                    </div>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </AuthCheck >
        ) : (
            <h4 className='text-center'>Такой перевозки не существует</h4>
        )
    ) : (
        <LoadAnimation />
    )

}

export default TransportationInfo

function formatDateToString(date: Date | null): string {
    if (!date) {
        return ""
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}