import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import css from "./App.module.css";
import Register from './Layouts/Auth/Register/Register';
import SignIn from './Layouts/Auth/SignIn/SignIn';
import AuthController from './hook/AuthController';
import Routers from './Layouts/Site/Routers';

function App() {
  return (
    <div className={css.app}>
      <Routes>
        <Route path="/" element={<Navigate to="/mainpage" replace />} />
        <Route path="/famregister" element={<Register />} />
        <Route path="/famsignin" element={<SignIn />} />
        <Route
          path="/mainpage/*"
          element={
            <AuthController>
              <Routers />
            </AuthController>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
