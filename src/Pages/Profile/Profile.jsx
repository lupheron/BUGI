import React from 'react';
import Header from '../../Components/Micro/Header/Header';
import { Table } from 'antd';
import { useProfile } from './ProfileStore';
import css from "../../assets/css/index.module.css"

function Profile() {
    const { boxes, columns } = useProfile()
    const expandedRowRender = (items) => (
        <Table
            columns={""}
            dataSource={items}
            pagination={false}
            rowKey={'id'}
        />
    );
    return (
        <div className={css.profile_page}>
            <Header />

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
            </main>
        </div>
    );
}

export default Profile;