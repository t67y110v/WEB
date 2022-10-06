
import React, { useEffect, useState } from 'react';
import { Box } from '@mantine/core'
import './App.css'
import useSWR from 'swr'
import AddUser from './components/addUser';
import { BrowserRouter } from 'react-router-dom';
import Navpanel from "./components/navpanel";
import MyHeader from './components/header';


const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

export const ENDPOINT = "http://localhost:4000";


export interface User {
  email: string
  password: string
  token: string
}

function App() {

  const { data, mutate } = useSWR<User>('healthcheck', fetcher)
  const [name, setName] = useState('');

  useEffect(() => {
    (
      async () => {
        const response = await fetch('http://localhost:8000/api/user', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const content = await response.json();

        setName(content.name);
      }
    )();
  });


  return (
    <BrowserRouter>


      <MyHeader name={name} setName={setName} />
      
            <Navpanel name={name} setName={setName} />
          <div className="container">
            <div className="row">
              <div className="col-4"></div>
              <div className="col-4">
                 < AddUser mutate={mutate} />
              </div>
            </div>
          </div>
           
       

    </BrowserRouter>
  )


}

export default App
