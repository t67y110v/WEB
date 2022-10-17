import React, { useEffect } from 'react';
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

        <div className="container">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <div>
                        {props.name ? 'Hi ' + props.name : 'You are not logged in'}
                        <br></br>
                        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis dolor voluptas omnis et, sequi provident magni numquam aliquid unde mollitia maiores fugiat, facilis nemo. Nisi voluptas in quasi exercitationem sint.</h1>
                    </div>
                </div>
            </div>

            
        </div>

    );
};

export default Home;