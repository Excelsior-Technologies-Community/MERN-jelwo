import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './componets/Header/Header';
import Login from './Pages/Login';
import Register from './Pages/Register';
import RingCategoryPage from './Pages/RingCategoryPage';
import Home from './Pages/Home';

const App = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ring-category" element={<RingCategoryPage />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;