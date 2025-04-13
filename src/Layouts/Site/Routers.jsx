import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from '../../Pages/Profile/Profile';
import Main from '../../Pages/Main/Main';

function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}

export default Routers;
