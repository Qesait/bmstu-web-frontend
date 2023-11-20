import { FC } from 'react'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export interface IContairnerProps {
    uuid: string
    marking: string
    type: string
    length: number
    height: number
    width: number
    image_url: string
    cargo: string
    weight: number
}

export const SmallCard: FC<IContairnerProps> = ({ uuid, marking, type, image_url, cargo, weight }) => (
    <Card className='w-100 mx-auto px-0 shadow text-center'>
        <div className="ratio ratio-16x9 overflow-hidden">
            <Card.Img variant='top' src={`http://${image_url}`} className='rounded object-fit-cover' />
        </div>
        <Card.Body className='flex-grow-1'>
            <Card.Title>{marking}</Card.Title>
            <Card.Text>Тип: {type}</Card.Text>
            <Card.Text>Груз: {cargo}</Card.Text>
            <Card.Text>Вес: {weight} кг</Card.Text>
        </Card.Body>
        <Link to={`${import.meta.env.BASE_URL}/containers/${uuid}`} className="btn btn-primary">Подробнее</Link>
    </Card>
)

export const BigCard: FC<IContairnerProps> = ({ marking, type, length, height, width, image_url, cargo, weight }) => {
    return (
        <Card className='shadow text-center text-md-start'>
            <div className='row'>
                <div className='col-12 col-md-8 px-md-0overflow-hidden'>
                    <Card.Img src={`http://${image_url}`} />
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
};
