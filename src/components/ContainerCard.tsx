import { FC } from 'react'
import { Button, Card } from 'react-bootstrap'
import './ContainerCard.css'

interface Props {
    uuid: string
    marking: string
    type: string
    length: number
    height: number
    width: number
    imageUrl: string
    cargo: string
    weight: number
}

const ContainerCard: FC<Props> = ({ uuid, marking, type, length, height, width, imageUrl, cargo, weight }) => (
    <Card className="card">
        <Card.Img className="cardImage" variant="top" src={imageUrl} />
        <Card.Body>
            <div className="textStyle">
                <Card.Title>{marking}</Card.Title>
            </div>
            <div className="textStyle">
                <Card.Text>
                    {cargo}
                </Card.Text>
            </div>
        </Card.Body>
    </Card>
)
export default ContainerCard;