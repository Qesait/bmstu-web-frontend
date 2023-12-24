import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Authorization: FC = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleRegistration = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Authorization
        console.log('User registered:', { login, password });
    };

    return (
        <Container fluid="sm" className='d-flex flex-column flex-grow-1 align-items-center justify-content-center'>
            <Form onSubmit={handleRegistration} className='d-flex flex-column align-items-center'>
                <h2>Авторизация</h2>

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
                    Авторизироваться
                </Button>

                <Link to={'/registration'}>
                    <Button variant="link">
                        Перейти к регистрации
                    </Button>
                </Link>
            </Form>
        </Container>
    );
};

export default Authorization