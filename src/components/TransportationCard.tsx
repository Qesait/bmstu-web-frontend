import { FC } from 'react'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { SmallCCard, IContainerProps } from './ContainerCard'

export interface ITransportationProps {
    uuid: string
    status: string
    creation_date: Date | null
    formation_date: Date | null
    completion_date: Date | null
    customer: string
    moderator: string
    transport: string
}

interface IExtendedTransportationProps{
    transportation: ITransportationProps;
    containers: IContainerProps[];
}

function formatDateToString(date: Date | null): string {
    if (!date) {
        return ""
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

export const SmallTCard: FC<ITransportationProps> = ({ uuid, status, creation_date, formation_date, completion_date, transport }) => (
    <Card className='w-100 mx-auto px-0 shadow text-center'>
        <Card.Body className='flex-grow-1'>
            <Card.Text>Статус: {status}</Card.Text>
            <Card.Text>Дата создания: {formatDateToString(creation_date)}</Card.Text>
            {formation_date ? (<Card.Text>Дата формирования: {formatDateToString(formation_date)}</Card.Text>) : (<></>)}
            {completion_date ? <Card.Text>Дата подтверждения: {formatDateToString(completion_date)}</Card.Text> : <></>}
            <Card.Text>Транспорт: {transport ? transport : "Неизвестен"}</Card.Text>
        </Card.Body>
        <Link to={`/transportations/${uuid}`} className="btn btn-primary">Подробнее</Link>
    </Card>
)


export const BigTCard: FC<IExtendedTransportationProps> = ({ transportation, containers}) => (
    <Card className='shadow-sm text-center text-md-start'>
        <div className='row m-0'>
            <Card.Body className='col-12 col-md-4 pe-md-0'>
                <Card.Text>Статус: {transportation.status}</Card.Text>
                <Card.Text>Дата создания: {formatDateToString(transportation.creation_date)}</Card.Text>
                {transportation.formation_date ? (<Card.Text>Дата формирования: {formatDateToString(transportation.formation_date)}</Card.Text>) : (<></>)}
                {transportation.completion_date ? <Card.Text>Дата подтверждения: {formatDateToString(transportation.completion_date)}</Card.Text> : <></>}
                <Card.Text>Транспорт: {transportation.transport ? transportation.transport : "Неизвестен"}</Card.Text>
            </Card.Body>
            <div className='col-12 col-md-8'>
                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-xl-3 px-1'>
                    {containers.map((container) => (
                        <div className='d-flex py-1 p-sm-2 p-md-2 justify-content-center' key={container.uuid}>
                            <SmallCCard  {...container} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </Card>
);
