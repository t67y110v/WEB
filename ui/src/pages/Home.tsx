import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Modal, Button, Group, TextInput, PasswordInput } from "@mantine/core"
import { IconLogin, IconLock, IconAt } from '@tabler/icons';
import { Link } from "react-router-dom";
import './pages.css'

const Home = (props: { name: string }) => {

    let home;


    if (document.cookie.slice(4, document.cookie.length - 1) == "") {
        return <Navigate to="/login" />
    }
    else {
        return (

            <div className="container-fluid info-form-container">
                <div className="row space-around">
                    <div className="col-10 info-container">
                        <h3>Добро пожаловать,{props.name}! Ты можешь сообщить о нежелательной реакции лекарственного препарата следующими способами:</h3>

                    </div>
                </div>
                <div className="row space-around-up">

                    <div className="col-5 info-container info-form-container-upper-button">
                        <h3>
                            Отправить json-файл для автоматической конвертации и отправки
                        </h3>

                    </div>

                    <div className="col-5 info-container info-form-container-upper-button">
                        <div>

                            <h3>Отправить сообщение о нежелательной реакции вручную</h3>

                        </div>
                    </div>

                </div>
                <div className="row space-around">
                    <div className="col-5"> <Button leftIcon={<IconLogin />} fullWidth size="md" variant="light" color="cyan" radius="xl" className='btn-cr' component={Link} to="/input">
                        Перейти
                    </Button></div>
                    <div className="col-5">
                        <Button leftIcon={<IconLogin />} fullWidth size="md" variant="light" color="cyan" radius="xl" className='btn-cr' component={Link} to="/input">
                            Перейти
                        </Button>
                    </div>
                </div>
                <div className="col-4">

                </div>
                <br></br>
                <div className="row space-around-up">

                    <div className="col-5 info-container info-form-container-upper-button">
                        <h3>
                            Направить API запрос используя REST
                        </h3>

                    </div>

                    <div className="col-5 info-container info-form-container-upper-button">
                        <div>

                            <h3>Направить API запрос gRPC </h3>

                        </div>
                    </div>

                </div>
                <div className="row space-around">
                    <div className="col-5"> <Button leftIcon={<IconLogin />} fullWidth size="md" variant="light" color="cyan" radius="xl" className='btn-cr' component={Link} to="/input">
                        Узнать больше
                    </Button></div>
                    <div className="col-5">
                        <Button leftIcon={<IconLogin />} fullWidth size="md" variant="light" color="cyan" radius="xl" className='btn-cr' component={Link} to="/input">
                            Узнать больше
                        </Button>
                    </div>
                </div>
                <div className="col-4">

                </div>


            </div>

        );
    }


};

export default Home;