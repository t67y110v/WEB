import React from 'react';
import { Link } from "react-router-dom";
import { Box, NavLink, Button, ActionIcon } from '@mantine/core';
import './components.css'
import { IconLogin, IconLogout, IconHome } from '@tabler/icons';


const Navpanel = (props: { token: string, setToken: (token: string) => void }) => {
    const logout = async () => {
        document.cookie = "jwt=;"
        props.setToken('')
    }
    let menu
    if (document.cookie.slice(4, document.cookie.length - 1) == "") {
        menu = (
            <div className="container-fluid">
                <div className="col-10"></div>
                <div className="col-2">
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
                </div>
            </div>
        )
    } else {
        menu = (
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
                <div className="col-1">
                    <NavLink

                        color="#EDF5E1"
                        component={Link} to="/home"
                        label="История"
                        className='tx-1'

                        icon={<IconHome size={24} />}
                    />
                </div>
                <div className="col-9"></div>
                <ul className="navbar-nav ">
                    <li className="nav-item active">
                        <Button leftIcon={<IconLogout />} size="md" variant="light" color="cyan" radius="xl" component={Link} to="/login" className='btn-cr' onClick={logout}>
                            Выход
                        </Button>
                    </li>
                </ul>

            </div>
        )
    }

    return (
        <nav className="navbar navbar-expand-md ">



            {menu}

        </nav>
    )
}

export default Navpanel;