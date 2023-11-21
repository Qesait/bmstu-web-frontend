import { FC } from 'react'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

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

export const TransportationCard: FC<ITransportationProps> = ({ uuid, status, creation_date, formation_date, completion_date, transport }) => (
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
