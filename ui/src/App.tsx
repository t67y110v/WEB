
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

  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  useEffect(() => {
    (
      async () => {
        const response = await fetch('http://localhost:4000/api/user', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify({
            "token" : document.cookie.slice(4,document.cookie.length-1)
          })
        });

        const content = await response.json();

        setName(content.name);
        setToken(content.token)
      }
    )();
  });

  return (
    <div className="App">
      <BrowserRouter>


        <MyHeader name={token} setName={setToken} />
        <Navpanel token={token} setToken={setToken} />
        <main className="form-signin">
          <Routes>
            <Route path="/home" element={<Home  name={name} />} />
            <Route path="/login" element={<Login setToken={setToken} token={token} />} />
            <Route path="/register" element={<Register setToken={setToken} token={token} />} />
            <Route path="/input" element={<InputForm setName={setToken} />} />
            <Route path="*" element={<Register  setToken={setToken} token={token} />} />
          </Routes>

        </main>



      </BrowserRouter>
      <MyFooter />
    </div>
  )


}

export default App
