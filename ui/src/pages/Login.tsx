import React, { SyntheticEvent, useState } from 'react'
import { Navigate } from "react-router-dom"
import { Modal, Button, Group, TextInput, PasswordInput } from "@mantine/core"
import { IconLogin, IconLock, IconAt } from '@tabler/icons';
import './pages.css'




const Login = (props: { token:string ,setToken: (token: string) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({
                email,
                password
            })
        });

        const content = await response.json();

        setRedirect(true);
        props.setToken(content.token);
        console.log(content.token)
        document.cookie = "jwt="+content.token +";"
    }

    if (redirect) {
        return <Navigate to="/home" />
    }

    return (

        <div className="container-fluid">
            <div className="row justify-content-md">
                <div className="col-4"> </div>
                <div className="col-4">
                    <div className="Auth-form-container">
                        <div className='Auth-form'>
                            <div className='Auth-form-content' >
                                <h3 className="Auth-form-title tx">Вход в систему</h3>
                                <div className="form-shadow">
                                    <form onSubmit={submit}>
                                        <label className='tx'>Почта </label>
                                        <TextInput
                                            icon={<IconAt size={16} />}
                                            required
                                            mb={12}
                                            variant="filled"
                                            radius="xl"
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
                                        <br></br>
                                        <Button
                                            leftIcon={<IconLogin />}
                                            fullWidth
                                            size="md"
                                            variant="light"
                                            className='btn-cr'
                                            color="cyan"
                                            radius="xl"
                                            type="submit">
                                            Войти
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                </div>
            </div>
        </div>
    )
}


export default Login