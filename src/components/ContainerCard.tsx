import { FC } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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

export const ContainerCard: FC<IContairnerProps> = ({ uuid, marking, type, length, height, width, image_url, cargo, weight }) => (
    <Card className="card">
        <Card.Img variant="top" src={`http://${image_url}`} />
        <Card.Body>
            <Card.Title>{marking}</Card.Title>
            <Card.Text>
                {cargo}
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
    </Card>
)
export default ContainerCard;