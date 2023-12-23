import { FC } from 'react'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CardImage from './CardImage';

export interface IContainerProps {
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

// const setPlaceholder = (event: any) => {
//     event.target.src = '/placeholder3.jpg';
// };

export const SmallCCard: FC<IContainerProps> = ({ uuid, marking, type, image_url, cargo, weight }) => (

    <Card className='w-100 mx-auto px-0 shadow-lg text-center'>
        <div className="ratio ratio-16x9 overflow-hidden">
            <CardImage url={image_url} className='rounded object-fit-cover'/>
        </div>
        <Card.Body className='flex-grow-1'>
            <Card.Title>{marking}</Card.Title>
            <Card.Text>Тип: {type}</Card.Text>
            <Card.Text>Груз: {cargo}</Card.Text>
            <Card.Text>Вес: {weight} кг</Card.Text>
        </Card.Body>
        <Link to={`/containers/${uuid}`} className="btn btn-primary">Подробнее</Link>
    </Card>
)

export const BigCCard: FC<IContainerProps> = ({ marking, type, length, height, width, image_url, cargo, weight }) => (
    <Card className='shadow-lg text-center text-md-start'>
        <div className='row'>
            <div className='col-12 col-md-8 overflow-hidden'>
                {/* <Card.Img src={`http://${image_url}`} onError={setPlaceholder}/> */}
                <CardImage url={image_url}/>
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
