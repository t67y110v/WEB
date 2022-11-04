
import React, { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navpanel from "./components/navpanel";
import MyHeader from './components/header';
import MyFooter from './components/footer';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import InputForm from "./pages/InputForm";


function App() {

  const [name, setName] = useState('');

  useEffect(() => {
    (
      async () => {
        const response = await fetch('http://localhost:4000/api/user', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const content = await response.json();

        setName(content.name);
      }
    )();
  });

  return (
    <div className="App">
      <BrowserRouter>


        <MyHeader name={name} setName={setName} />
        <Navpanel name={name} setName={setName} />
        <main className="form-signin">
          <Routes>
            <Route path="/home" element={<Home name={name} />} />
            <Route path="/login" element={<Login setName={setName} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/input" element = {<InputForm setName={setName} />}  />
            <Route path ="*" element= {<Register />}/>
          </Routes>

        </main>



      </BrowserRouter>
      <MyFooter/>
    </div>
  )


}

export default App
