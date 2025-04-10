import React from 'react';
import Header from '../../Components/Micro/Header/Header';
import { Table } from 'antd';
import { useProfile } from './ProfileStore';
import css from "../../assets/css/index.module.css"
import { Link, useLocation } from 'react-router-dom';

function Profile() {
    const { boxes, columns } = useProfile();
    const location = useLocation(); // ✅ FIXED: Hook must be here

    const expandedRowRender = (items) => (
        <Table
            columns={""}
            dataSource={items}
            pagination={false}
            rowKey={'id'}
        />
    );

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
        <div className={css.profile_page}>
            <Header />

            <header className={css.breadcrumb_nav}>
                <Link to="/" className={css.breadcrumbs}>Home</Link>
                {location.pathname !== '/' && ' / '}
                {generateBreadcrumbs()}
            </header>

            <main className={css.profile_main}>
                <h1 className={css.profile_title}>Hello Nuriddinov's Family</h1>

                <div className={css.profile_table}>
                    <h1>Members of Family</h1>
                    <Table
                        columns={""}
                        expandable={{
                            expandedRowRender: (rec) => expandedRowRender(rec.items),
                            rowExpandable: (rec) => rec.items.length > 0,
                        }}
                        // dataSource={out.filter(rec => rec.items.length > 0)} // Filter out empty inouts
                        rowKey={'id'}
                    />
                </div>
                <div className={css.profile_table}>
                    <h1>Reminders</h1>
                    <Table
                        columns={""}
                        expandable={{
                            expandedRowRender: (rec) => expandedRowRender(rec.items),
                            rowExpandable: (rec) => rec.items.length > 0,
                        }}
                        // dataSource={out.filter(rec => rec.items.length > 0)} // Filter out empty inouts
                        rowKey={'id'}
                    />
                </div>
                <div className={css.profile_table}>
                    <h1>Savings</h1>
                    <Table
                        columns={""}
                        expandable={{
                            expandedRowRender: (rec) => expandedRowRender(rec.items),
                            rowExpandable: (rec) => rec.items.length > 0,
                        }}
                        // dataSource={out.filter(rec => rec.items.length > 0)} // Filter out empty inouts
                        rowKey={'id'}
                    />
                </div>
            </main>
        </div>
    );
}

export default Profile;