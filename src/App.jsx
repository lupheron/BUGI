import React from 'react';
import { Route, Routes } from 'react-router-dom';
import css from "./App.module.css";
import Register from './Layouts/Auth/Register/Register';
import SignIn from './Layouts/Auth/SignIn/SignIn';
import AuthController from './hook/AuthController';
import Routers from './Layouts/Site/Routers';
import Site from './Layouts/Site/Site';

function App() {
  return (
    <div className={css.app}>
      <Routes>
        <Route path="/" element={<Site />} />
        <Route path="/fam-register" element={<Register />} />
        <Route path="/fam-sign" element={<SignIn />} />
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
