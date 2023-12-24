import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { axiosAPI } from '../api'
import { AxiosResponse, AxiosError } from 'axios';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setRole } from "../store/authorizationSlice"

const Registration: FC = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();

    // TODO: Error handling? expires_in in redux
    const handleRegistration = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axiosAPI.post('/user/sign_up', { login, password })
            .then((response: AxiosResponse) => {
                console.log('Response:', response.data);
                dispatch(setRole(response.data.role));
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('login', response.data.login);
            })
            .catch((error: AxiosError) => {
                console.error('Error:', error.message);
            })
    };

    return (
        <Container fluid="sm" className='d-flex flex-column flex-grow-1 align-items-center justify-content-center'>
            <Form onSubmit={handleRegistration} className='d-flex flex-column align-items-center'>
                <h2>Регистрация</h2>

                <Form.Group controlId="login" className='d-flex flex-column align-items-center mt-2'>
                    <Form.Label>Логин</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Введите ваш логин"
                        value={login}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="password" className='d-flex flex-column align-items-center mt-1'>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Введите ваш пароль"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    className='mt-3 w-100'
                    disabled={!login || !password}
                >
                    Зарегистрироваться
                </Button>

                <Link to={'/authorization'}>
                    <Button variant="link">
                        Перейти к авторизации
                    </Button>
                </Link>
            </Form>
        </Container>
    );
};

export default Registration