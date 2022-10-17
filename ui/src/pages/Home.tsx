import React, { useEffect } from 'react';
import { Modal, Button, Group, TextInput, PasswordInput } from "@mantine/core"
import { IconLogin, IconLock, IconAt } from '@tabler/icons';
import './pages.css'

const Home = (props: { name: string }) => {

    useEffect(() => {
        (
            async () => {
                await fetch('http://localhost:4000/api/user', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
            }
        )()
    })






    return (

        <div className="container-fluid info-form-container">
            <div className="row space-around">
                
                <div className="col-5 info-container">
                    <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus voluptatum nam placeat sequi exercitationem, cum consequuntur nulla dicta. At ullam expedita dolor culpa consectetur laudantium fugit quisquam earum, ipsa commodi.</h1>
                    <Button leftIcon={<IconLogin />} fullWidth size="md" variant="light" className='btn-cr' color="cyan" radius="xl" type="submit">Использоввать</Button>
                </div>
                
                <div className="col-5 info-container">
                    <div>
                       
                        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis dolor voluptas omnis et, sequi provident magni numquam aliquid unde mollitia maiores fugiat, facilis nemo. Nisi voluptas in quasi exercitationem sint.</h1>
                        <Button leftIcon={<IconLogin />} fullWidth size="md" variant="light" className='btn-cr' color="cyan" radius="xl" type="submit">Узнать больше</Button>
                    </div>
                </div>
                
            </div>
            <br></br>
            <div className="row space-around">
            <div className="col-10 info-container">
                    <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus voluptatum nam placeat sequi exercitationem, cum consequuntur nulla dicta. At ullam expedita dolor culpa consectetur laudantium fugit quisquam earum, ipsa commodi.</h1>
               
                </div>
            </div>


        </div>

    );
};

export default Home;