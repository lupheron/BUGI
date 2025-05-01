import React from 'react';
import Header from '../../Components/Micro/Header/Header';
import Cal from '../../Components/Macro/Calendar/Cal';
import Status from '../../Components/Macro/Status/Status';
import SuggestCard from '../../Components/Macro/Sugesstion/SuggestCard';
import { Link, useLocation } from 'react-router-dom';
import css from "../../assets/css/index.module.css"

function Main() {
    const location = useLocation();

    const generateBreadcrumbs = () => {
        const paths = location.pathname.split('/').filter((p) => p);
        let fullPath = '';
        return paths.map((part, i) => {
            fullPath += `/${part}`;
            const name = part.charAt(0).toUpperCase() + part.slice(1);
            return (
                <span key={i}>
                    <Link to={fullPath} className={css.breadcrumbs}>{name}</Link>
                    {i < paths.length - 1 && ' / '}
                </span>
            );
        });
    };
    return (
        <div>
            <Header />
            <header className={css.breadcrumb_nav}>
                <Link to="/" className={css.breadcrumbs}>Home</Link>
                {location.pathname !== '/' && ' / '}
                {generateBreadcrumbs()}
            </header>
            <Cal />
        </div>
    );
}

export default Main;