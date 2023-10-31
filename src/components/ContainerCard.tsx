import { FC } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './ContainerCard.css'

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

export const SmallCard: FC<IContairnerProps> = ({ uuid, marking, type, length, height, width, image_url, cargo, weight }) => (
    <Card className='small_card'>
        <div className="image-container">
            <Card.Img variant='top' src={`http://${image_url}`} className='small_card_image' />
        </div>
        <Card.Body className='small_card_body'>
            <Card.Title>{marking}</Card.Title>
            <Card.Text>Тип: {type}</Card.Text>
            <Card.Text>Груз: {cargo}</Card.Text>
            <Card.Text>Вес: {weight} кг</Card.Text>
        </Card.Body>
        <a href={`/containers/${uuid}`} className="btn btn-primary card_button">Подробнее</a>
    </Card>
)

export const BigCard: FC<IContairnerProps> = ({ uuid, marking, type, length, height, width, image_url, cargo, weight }) => {
    return (
        <Card>
            <Card.Body>
                <div className='card_wrapper big_card_wrapper'>
                    <div className='card_image'>
                        <Card.Img src={`http://${image_url}`} />
                    </div>
                    <div className='big_card_body'>
                        <Card.Title>{marking}</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
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
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};
