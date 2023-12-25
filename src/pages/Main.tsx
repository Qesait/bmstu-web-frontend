import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from "react-redux";

import { axiosAPI } from '../api';

import { AppDispatch, RootState } from "../store";
import { clearHistory } from "../store/historySlice"
import { setTransportations } from "../store/transportationSlice"
import { resetLogin, resetRole } from "../store/userSlice";

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
    const userLogin = useSelector((state: RootState) => state.user.login);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(clearHistory())
    }, [dispatch]);

    const logout = () => {
        let accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return
        }
        axiosAPI.post('/user/logout', null, { headers: { 'Authorization': `Bearer ${accessToken}` } })
            .then(_ => {
                dispatch(resetLogin())
                dispatch(resetRole())
                dispatch(setTransportations([]))
                localStorage.clear()
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    return (
        <Container fluid="sm" className='d-flex flex-column flex-grow-1 align-items-center justify-content-center'>
            <Col className='col-10 col-sm-7 col-md-6 col-lg-5'>
                {!userLogin && <MenuButton path="/registration" text="Регистрация" />}
                {!userLogin && <MenuButton path="/authorization" text="Авторизация" />}
                {userLogin && <Button
                    variant="outline-primary"
                    className='flex-grow-1 shadow-sm mb-3 w-100'
                    onClick={logout}
                >
                    Выйти
                </Button>}
                <div className='py-2'></div>
                <MenuButton path="/containers" text="Контейнеры" />
                <MenuButton path="/transportations" text="Перевозки" />
                <MenuButton path="/containers/edit/new" text="Добавить контейнер" />
            </Col>
        </Container >
    );
};

export default Main;
