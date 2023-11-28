import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';

interface CardImageProps {
    url: string;
    className?: string;
}

const CardImage = ({ url, className, ...props }: CardImageProps) => {
    const [src, setSrc] = useState('/placeholder.jpg');


    useEffect(() => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => setSrc(URL.createObjectURL(blob)))
    }, []);

    const handleError = () => {
        console.error(`Error loading image: ${url}`);
    };

    return <Card.Img src={src} className={className} onError={handleError} {...props} />;
};

export default CardImage;
