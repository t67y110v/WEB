import React, {SyntheticEvent, useState} from 'react';
import {Navigate} from 'react-router-dom';
import { Modal, Button, Group, TextInput, PasswordInput } from "@mantine/core"

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
            headers: {'Content-Type': 'application/json'},
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
        return <Navigate to= "/login"/>
    }

    return (
        <form onSubmit={submit}>
        <TextInput
            required
            mb={12}
            label="Почта"
            placeholder="Введите свою почту"
            onChange={e => setEmail(e.target.value)}
        />
        <PasswordInput
            label="Пароль"
            required
            mb={12}
            placeholder="Введите пароль"
            onChange={e => setPassword(e.target.value)}
        />
        <TextInput
            required
            mb={12}
            label="Имя"
            placeholder="Введите ваше имя"
            onChange={e => setName(e.target.value)}
        />
        <TextInput
            required
            mb={12}
            label="Фамилия"
            placeholder="Введите вашу фамилию"
            onChange={e => setSeccondName(e.target.value)}
        />
        
        <Button fullWidth type="submit">Войти </Button>
    </form> 


        
    );
};

export default Register;