import React from 'react';
import { Route, Routes } from 'react-router-dom';
import css from "./App.module.css"
import Profile from './Pages/Profile/Profile';
import Site from './Layouts/Site/Site';
import Register from './Layouts/Auth/Register/Register';
import SignIn from './Layouts/Auth/SignIn/SignIn';
import Main from './Pages/Main/Main';

function App() {
  return (
    <div className={css.app}>
      <Routes>
        <Route path="/" element={<Site />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/mainpage" element={<Main />} />
        <Route path="/mainpage/profile" element={<Profile />} />
      </Routes>
    </div>

  );
}

export default App;