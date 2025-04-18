import { Button, Divider, message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import css from '../../../assets/css/components.module.css'
import Edit from './Edit';
import Create from './Create';
import { useForm } from 'antd/es/form/Form';
import { useCategory } from './CategoryStore';

function Category() {
    const { category, getCategory, columns, handleOpenCreate, isCreating, isEditing, handleClose, selectedmember, handleUpdate, handleCreate } = useCategory();

    useEffect(() => {
        getCategory()
    }, []);
    return (
        <div>
            <div className={css.create_btn}>
                <Button onClick={handleOpenCreate} type='primary'>Yangi kategoriya qo'shish</Button>
            </div>
            <br />
            <Divider />
            <Table
                rowKey={'id'}
                columns={columns}
                dataSource={category}
                bordered
            />

            <Edit
                title="Tahrirlash"
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedmember}
                handleUpdate={handleUpdate}
            />

            <Create
                title="Qo'shish"
                isCreating={isCreating}
                handleClose={handleClose}
                handleCreate={handleCreate}
            />
        </div>
    );
}

export default Category;