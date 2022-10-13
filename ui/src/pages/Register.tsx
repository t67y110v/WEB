import React, { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Modal, Button, Group, TextInput, PasswordInput } from "@mantine/core"
import { IconLogin, IconLock, IconAt, IconUser } from '@tabler/icons';

const Register = () => {
    const [name, setName] = useState('');
    const [seccondname, setSeccondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);



    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('http://localhost:4000/api/register', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                name,
                seccondname,
            })
        });
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/login" />
    }

    return (

        <div className="container-fluid">
            <div className="row justify-content-md">

                <div className="col-4"></div>
                <div className="col-4">
                    <div className="Auth-form-container">
                        <div className="Auth-form">
                            <div className="Auth-form-content">
                                <h3 className="Auth-form-title tx">Регистрация в системе</h3>
                                <div className="form-shadow">
                                    <form onSubmit={submit}>
                                        <label className='tx'>Почта </label>
                                        <TextInput
                                            required
                                            mb={12}
                                            variant="filled"
                                            radius="xl"
                                            icon={<IconAt size={16} />}
                                            placeholder="Введите свою почту"
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <label className='tx'>Пароль</label>
                                        <PasswordInput
                                            icon={<IconLock size={16} />}
                                            variant="filled"
                                            required
                                            mb={12}
                                            radius="xl"
                                            placeholder="Введите пароль"
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                        <label className='tx'>Имя</label>
                                        <TextInput
                                            icon={<IconUser size={16} />}
                                            required
                                            mb={12}
                                            variant="filled"
                                            radius="xl"
                                            placeholder="Введите ваше имя"
                                            onChange={e => setName(e.target.value)}
                                        />
                                        <label className='tx'>Фамилия</label>
                                        <TextInput
                                            icon={<IconUser size={16} />}
                                            required
                                            mb={12}
                                            variant="filled"
                                            radius="xl"
                                            placeholder="Введите вашу фамилию"
                                            onChange={e => setSeccondName(e.target.value)}
                                        />
                                        <br />
                                        <Button leftIcon={<IconLogin />} fullWidth size="md" variant="light" className='btn-cr' color="cyan" radius="xl" type="submit">Войти </Button>
                                    </form>
                                </div>




                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>







    );
};

export default Register;