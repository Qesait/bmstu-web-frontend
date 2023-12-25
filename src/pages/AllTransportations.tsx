import { useEffect, forwardRef, ButtonHTMLAttributes } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from 'react-router-dom';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import { Navbar, Form, Button, Table, Col, InputGroup } from 'react-bootstrap';

import { axiosAPI } from "../api";
import { ITransportation } from "../models";

import { AppDispatch, RootState } from "../store";
import { setTransportations, setStatusFilter, setDateStart, setDateEnd } from "../store/transportationSlice";
import { clearHistory, addToHistory } from "../store/historySlice";

import LoadAnimation from '../components/LoadAnimation';
import AuthCheck, { CUSTOMER } from '../components/AuthCheck'

interface ApiResponse {
    transportations: ITransportation[]
}

interface CustomInputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    value?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const AllTransportations = () => {
    const transportations = useSelector((state: RootState) => state.transportation.transportations);
    const statusFilter = useSelector((state: RootState) => state.transportation.statusFilter);
    const dateStart = useSelector((state: RootState) => state.transportation.formationDateStart);
    const dateEnd = useSelector((state: RootState) => state.transportation.formationDateEnd);
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation().pathname;

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
        dispatch(clearHistory())
        dispatch(addToHistory({ path: location, name: "Перевозки" }))
        getTransportations();
    }, [dispatch]);

    const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>((props, ref) => (
        <Button
            variant="outline-dark"
            ref={ref}
            size="sm"
            className="text-nowrap shadow-sm"
            style={{ paddingRight: '1.5rem', minWidth: '137px' }}
            {...props}
        >
            {props.value ? props.value : "Введите дату"}
        </Button>
    ));

    return (
        <AuthCheck allowedRole={CUSTOMER}>
            <Navbar>
                <Form className="d-flex flex-row align-items-stretch flex-grow-1 gap-2" onSubmit={handleSearch}>
                    <InputGroup size='sm'>
                        <InputGroup.Text >Статус</InputGroup.Text>
                        <Form.Select
                            defaultValue={statusFilter}
                            onChange={(status) => dispatch(setStatusFilter(status.target.value))}
                            className="shadow-sm"
                        >
                            <option value="">Любой</option>
                            <option value="сформирована">Сформирована</option>
                            <option value="завершёна">Завершена</option>
                            <option value="отклонёна">Отклонена</option>
                        </Form.Select>
                    </InputGroup>
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
                            <th className='text-center'>Статус</th>
                            <th className='text-center'>Дата создания</th>
                            <th className='text-center'>Дата формирования</th>
                            <th className='text-center'>Дата завершения</th>
                            <th className='text-center'>Транспорт</th>
                            <th className='text-center'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {transportations.map((transportation) => (
                            <tr key={transportation.uuid}>
                                <td className='text-center'>{transportation.status}</td>
                                <td className='text-center'>{transportation.creation_date}</td>
                                <td className='text-center'>{transportation.formation_date}</td>
                                <td className='text-center'>{transportation.completion_date}</td>
                                <td className='text-center'>{transportation.transport}</td>
                                <td className=''>
                                    <Col className='d-flex flex-col align-items-center justify-content-center'>
                                        <Link to={`/transportations/${transportation.uuid}`} className='text-decoration-none' >
                                            <Button
                                                variant='outline-secondary'
                                                size='sm'
                                                className='align-self-center'
                                            >
                                                Подробнее
                                            </Button>
                                        </Link>
                                    </Col>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <LoadAnimation />
            )
            }
        </ AuthCheck >
    );
}

export default AllTransportations
