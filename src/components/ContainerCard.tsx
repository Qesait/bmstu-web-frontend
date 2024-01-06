import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom';
import {Card, ButtonGroup} from 'react-bootstrap';
import CardImage from './CardImage';
import { IContainer } from '../models'

interface ContainerCardProps extends IContainer {
    children: ReactNode;
}

const ContainerCard: FC<ContainerCardProps> = ({ children, uuid, marking, type, image_url, cargo, weight }) => (
    <Card className='w-100 mx-auto px-0 shadow-lg text-center' key={uuid}>
        <div className="ratio ratio-16x9 overflow-hidden">
            <CardImage url={image_url} className='rounded object-fit-cover' />
        </div>
        <Card.Body className='flex-grow-1'>
            <Card.Title>{marking}</Card.Title>
            <Card.Text>Тип: {type}</Card.Text>
            <Card.Text>Груз: {cargo}</Card.Text>
            <Card.Text>Вес: {weight} кг</Card.Text>
        </Card.Body>
        <ButtonGroup vertical>
            <Link to={`/containers/${uuid}`} className="btn btn-outline-primary">Подробнее</Link>
            <>{children}</>
        </ButtonGroup>
    </Card>
)

export default ContainerCard;