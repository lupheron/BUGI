import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './Pages/Main/Main';
import css from "./App.module.css"
import Profile from './Pages/Profile/Profile';

function App() {
  return (
    <div className={css.app}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>

  );
}

export default App;