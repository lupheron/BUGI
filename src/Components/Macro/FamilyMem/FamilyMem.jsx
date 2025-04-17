import { Button, Divider, message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useFamMem } from './FamilyMemStore';
import { useForm } from 'antd/es/form/Form';
import Edit from './Edit';
import Create from './Create';
import css from '../../../assets/css/components.module.css'

function FamilyMem(props) {
    const { family_mem, getFamilyMem, columns, handleOpenCreate, isCreating, isEditing, handleClose, selectedmember, handleUpdate, handleCreate } = useFamMem();
    const [familyId, setFamilyId] = useState();
    const [form] = useForm();

    useEffect(() => {
        const fam_id = localStorage.getItem("fam_id");
        console.log("Retrieved fam_id from localStorage:", fam_id);

        if (fam_id) {
            setFamilyId(fam_id);
            form.setFieldsValue({ fam_id }); // Add this line
            getFamilyMem(fam_id);
        } else {
            message.error("No family ID found in localStorage");
        }
    }, []);


    return (
        <div>
            <div className={css.create_btn}>
                <Button onClick={handleOpenCreate} type='primary'>Yangi oila a'zosi qo'shish</Button>
            </div>
            <br />
            <Divider />
            <Table
                rowKey={'id'}
                columns={columns}
                dataSource={family_mem}
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

export default FamilyMem;