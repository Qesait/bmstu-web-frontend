import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom';
import {Card, ButtonGroup} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import CardImage from './CardImage';
import { IContainer } from '../models'


// const setPlaceholder = (event: any) => {
//     event.target.src = '/placeholder3.jpg';
// };

interface CardProps extends IContainer {
    children: ReactNode;
}

export const SmallCCard: FC<CardProps> = ({ children, uuid, marking, type, image_url, cargo, weight }) => (

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

export const BigCCard: FC<IContainer> = ({ marking, type, length, height, width, image_url, cargo, weight }) => (
    <Card className='shadow-lg text-center text-md-start'>
        <div className='row'>
            <div className='col-12 col-md-8 overflow-hidden'>
                {/* <Card.Img src={`http://${image_url}`} onError={setPlaceholder}/> */}
                <CardImage url={image_url} />
            </div>
            <Card.Body className='col-12 col-md-4 ps-md-0'>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Card.Title>{marking}</Card.Title>
                        <Card.Text>Тип: {type}</Card.Text>
                        <Card.Text>Длинна: {length} мм</Card.Text>
                        <Card.Text>Высота: {height} мм</Card.Text>
                        <Card.Text>Ширина: {width} мм</Card.Text>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Card.Text>Груз: {cargo}</Card.Text>
                        <Card.Text>Вес: {weight} кг</Card.Text>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </div>
    </Card>
);
