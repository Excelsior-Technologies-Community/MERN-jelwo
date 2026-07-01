import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './componets/Header/Header';
import Login from './Pages/Login'; 
import Register from './Pages/Register'

const App = () => {
  return (
    <div>
      
      <Header/>
      <Routes>
  <Route path="/" element={<Navigate to="/" />} />
  <Route path="/login" element={<Login />} />
  <Route path='/register' element={<Register />} />
</Routes>
    </div>
  );
};

export default App;