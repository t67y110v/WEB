
import React, { useEffect, useState } from 'react';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navpanel from "./components/navpanel";
import MyHeader from './components/header';
import MyFooter from './components/footer';
import Home from "./pages/basepages/Home";
import Register from "./pages/basepages/Register";
import Login from "./pages/basepages/Login";
import InputForm from "./pages/otherpages/InputForm";
import RestPage from "./pages/otherpages/RestPage";
import GRPCPage from "./pages/otherpages/GRPCPage";
import JsonPage from "./pages/otherpages/JsonPage";
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
        <Navpanel token={token} name={name} setToken={setToken} setName={setName} />
        <main className="form-signin">
          <Routes>
            <Route path="/home" element={<Home  name={name} />} />
            <Route path="/login" element={<Login setToken={setToken} token={token} />} />
            <Route path="/register" element={<Register setToken={setToken} token={token} />} />
            <Route path="/input" element={<InputForm name={name} setName={setToken} />} />
            <Route path= "/rest" element= {<RestPage name={name} />} />
            <Route path='/grpc' element = {<GRPCPage name={name} /> } />
            <Route path ='/json' element = {<JsonPage name={name} />} />
            <Route path="*" element={<Register  setToken={setToken} token={token} />} />
          </Routes>

        </main>



      </BrowserRouter>
      <MyFooter />
    </div>
  )


}

export default App
