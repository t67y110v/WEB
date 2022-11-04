import React from 'react';
import { Link } from "react-router-dom";
import { Box, NavLink, Button, ActionIcon } from '@mantine/core';
import './components.css'
import { IconLogin, IconLogout, IconHome } from '@tabler/icons';


const Navpanel = (props: { name: string, setName: (name: string) => void }) => {
    const logout = async () => {
        await fetch('http://localhost:4000/api/logout', {
            method: "POST",
            headers: { 'Content-Type': 'application-json' },
            credentials: 'include',
        })
        props.setName('')
    }
    let menu
    if (props.name === '') {
        menu = (
            <ul className="navbar-nav ">
                <li className="nav-item active">
                    <Button.Group>
                        <Button leftIcon={<IconLogin />} size="md" variant="light" color="cyan" radius="xl" className='btn-cr' component={Link} to="/login">
                            Войти
                        </Button>
                        <Button leftIcon={<IconLogout />} size="md" variant="light" color="cyan" className='btn-cr' radius="xl" component={Link} to="/register">
                            Зарегистрироваться
                        </Button>
                    </Button.Group>
                </li>
            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav ">
                <li className="nav-item active">
                    <Button leftIcon={<IconLogout />} size="md" variant="light" color="cyan" radius="xl" component={Link} to="/login" className='btn-cr' onClick={logout}>
                        Logout
                    </Button>
                </li>
            </ul>
        )
    }
    return (
        <nav className="navbar navbar-expand-md ">
            <div className="container-fluid">
                <div className="col-1">
                    <NavLink
                        color="#EDF5E1"
                        component={Link} to="/home"
                        label="Главная"
                        className='tx-1'

                        icon={<IconHome size={24} />}
                    />
                </div>


                {menu}
            </div>
        </nav>
    )
}

export default Navpanel;