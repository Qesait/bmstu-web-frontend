import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useDispatch } from "react-redux";

import { AppDispatch } from "../store";
import { clearHistory } from "../store/historySlice"

interface IButtonProps {
    path: string;
    text: string;
}

const MenuButton: FC<IButtonProps> = ({ path, text }) => (
    <Link to={path} className='d-flex text-decoration-none mb-2'>
        <Button variant="outline-primary" className='flex-grow-1 shadow-sm'>
            {text}
        </Button>
    </Link>
);

const Main = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(clearHistory())
    }, [dispatch]);

    return (
        <Container fluid="sm" className='d-flex flex-column flex-grow-1 align-items-center justify-content-center'>
            <Col className='col-10 col-sm-7 col-md-6 col-lg-5'>
                <MenuButton path="/registration" text="Регистрация" />
                <MenuButton path="/authorization" text="Авторизация" />
                <MenuButton path="/containers" text="Контейнеры" />
                <MenuButton path="/transportations" text="Перевозки" />
                <MenuButton path="/containers/edit/new" text="Добавить контейнер" />
            </Col>
        </Container >
    );
};

export default Main;
