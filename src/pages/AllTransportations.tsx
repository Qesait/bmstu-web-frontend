import { AppDispatch, RootState } from "../store";
import { useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { axiosAPI } from "../api";
import LoadAnimation from '../components/LoadAnimation';
import { setTransportations, setStatusFilter, setDateStart, setDateEnd } from "../store/transportationSlice";
import { ITransportation } from "../models";
import Table from 'react-bootstrap/Table';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import AuthCheck from '../components/AuthCheck'

import "react-datepicker/dist/react-datepicker.css";

interface ApiResponse {
    transportations: ITransportation[]
}



const AllTransportations = () => {
    const transportations = useSelector((state: RootState) => state.transportation.transportations);
    const statusFilter = useSelector((state: RootState) => state.transportation.statusFilter);
    const dateStart = useSelector((state: RootState) => state.transportation.formationDateStart);
    const dateEnd = useSelector((state: RootState) => state.transportation.formationDateEnd);
    const dispatch = useDispatch<AppDispatch>();

    const getTransportations = () => {
        let accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return
        }

        axiosAPI.get<ApiResponse>('/transportations', {
            params: {
                ...(statusFilter && { status: statusFilter }),
                ...(dateStart && { formation_date_start: format(new Date(dateStart), 'yyyy-MM-dd HH:mm') }),
                ...(dateEnd && { formation_date_end: format(new Date(dateEnd), 'yyyy-MM-dd HH:mm') }),
            },
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log(response.data)
                dispatch(setTransportations(response.data.transportations))
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }


    const handleSearch = (event: React.FormEvent<any>) => {
        event.preventDefault();
        getTransportations();
    }

    useEffect(() => {
        getTransportations();
    }, [dispatch]);

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <Button
            variant="outline-dark"
            onClick={onClick}
            ref={ref}
            size="sm"
            className="text-nowrap shadow-sm"
            style={{ paddingRight: '1.5rem', minWidth: '137px' }}
        >
            {value ? value : "Введите дату"}
        </Button>
    ));

    return (
        <AuthCheck>
            <Navbar>
                <Form className="d-flex flex-row align-items-stretch flex-grow-1 gap-2" onSubmit={handleSearch}>
                    <Form.Label className="m-0">Статус:</Form.Label>
                    <Form.Select
                        defaultValue={statusFilter}
                        onChange={(status) => dispatch(setStatusFilter(status.target.value))}
                        className="shadow-sm"
                        size="sm"
                    >
                        <option value="">Любой</option>
                        <option value="сформирована">Сформирована</option>
                        <option value="завершёна">Завершена</option>
                        <option value="отклонёна">Отклонена</option>
                    </Form.Select>
                    <DatePicker
                        selected={dateStart ? new Date(dateStart) : null}
                        onChange={(date: Date) => dispatch(setDateStart(date))}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={60}
                        isClearable
                        timeCaption="Время"
                        dateFormat="HH:mm MM.d.yyyy"
                        customInput={<CustomInput />}
                    />
                    <DatePicker
                        selected={dateEnd ? new Date(dateEnd) : null}
                        onChange={(date: Date) => dispatch(setDateEnd(date))}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={60}
                        isClearable
                        timeCaption="Время"
                        dateFormat="HH:mm MM.d.yyyy"
                        customInput={<CustomInput />}
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
            {transportations ? (
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Статус</th>
                            <th>Дата создания</th>
                            <th>Дата формирования</th>
                            <th>Дата завершения</th>
                            <th>Транспорт</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transportations.map((transportation) => (
                            <tr key={transportation.uuid}>
                                <td>{transportation.status}</td>
                                <td>{transportation.creation_date}</td>
                                <td>{transportation.formation_date}</td>
                                <td>{transportation.completion_date}</td>
                                <td>{transportation.transport}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <LoadAnimation />
            )}
        </ AuthCheck>
    );
}

export default AllTransportations