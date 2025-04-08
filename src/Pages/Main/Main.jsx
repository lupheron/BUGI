import React from 'react';
import Header from '../../Components/Micro/Header/Header';
import Cal from '../../Components/Macro/Calendar/Cal';
import Status from '../../Components/Macro/Status/Status';
import SuggestCard from '../../Components/Macro/Sugesstion/SuggestCard';

function Main() {
    return (
        <div>
            <Header />
            <Cal />
            <Status />
            <SuggestCard />
        </div>
    );
}

export default Main;