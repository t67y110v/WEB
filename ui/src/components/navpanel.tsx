import React from 'react';
import { Link } from "react-router-dom";
import { Box, NavLink, Button, Divider, Group, Text, ActionIcon } from '@mantine/core';
import './components.css'
import { IconLogin, IconLogout, IconHome, IconHistory, IconDeviceAnalytics } from '@tabler/icons';


const Navpanel = (props: { token: string, name: string, setToken: (token: string) => void, setName: (name: string) => void}) => {
    const logout = async () => {
        document.cookie = "jwt=;"
        props.setName('')
        props.setToken('')
    }
    let menu
   // console.log(props.name);
    
    if (props.name == null ) {
        menu = (
            <div className="container-fluid">
                <div className="col-10"></div>
                <div className="col-2">

                    <Button.Group>
                        <Button leftIcon={<IconLogin />} size="sm" variant="light" color="cyan" radius="xl" className='btn-cr' component={Link} to="/login">
                            Войти
                        </Button>
                        <Button leftIcon={<IconLogout />} size="sm" variant="light" color="cyan" className='btn-cr' radius="xl" component={Link} to="/register">
                            Зарегистрироваться
                        </Button>
                    </Button.Group>

                </div>
            </div>
        )
    } else {
        menu = (
            <div className="container-fluid">
                <div className="col-4">
                    <Button.Group>
                        <Button
                            leftIcon={<IconHome />}
                            size="md"
                            variant="light"
                            color="cyan"
                            className='btn-cr'
                            radius="xl"
                            component={Link}
                            to="/home">
                            Главная
                        </Button>
                        <Button
                            leftIcon={<IconHistory />}
                            size="md"
                            variant="light"
                            color="cyan"
                            radius="xl"
                            className='btn-cr'
                            component={Link}
                            to="/login">
                            История
                        </Button>
                        <Button
                            leftIcon={<IconDeviceAnalytics />}
                            size="md"
                            variant="light"
                            color="cyan"
                            radius="xl"
                            className='btn-cr'
                            component={Link}
                            to="/login">
                            Жрунал
                        </Button>
                    </Button.Group>
                </div>
                <div className="col-4"></div>
                <div className="col-3">
                    <div className='user-info' >
                        <Group>
                            <Text>      </Text>
                            <Text>
                                Пользователь : {props.name}
                            </Text>
                            <Text>      </Text>
                            <Divider size="md" orientation="vertical" />
                            <Text>      </Text>
                            <Text> Роль : Администартор</Text>
                        </Group>


                    </div>

                </div>
                <div className="col-1">
                    <ul className="navbar-nav ">
                        <li className="nav-item active">
                            <Button
                                leftIcon={<IconLogout />}
                                size="md"
                                variant="light"
                                color="cyan"
                                radius="xl"
                                component={Link}
                                to="/login"
                                className='btn-cr'
                                onClick={logout}>
                                Выход
                            </Button>
                        </li>
                    </ul>
                </div>


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