import { Button, Divider, Table } from 'antd';
import React, { useEffect } from 'react';
import { useFamMem } from './FamilyMemStore';
import Edit from './Edit';
import Create from './Create';
import CreateCat from '../Category/CreateCat';
import css from '../../../assets/css/components.module.css';

function FamilyMem() {
    const {
        family_mem,
        categories,
        getFamilyMem,
        getCategories,
        columns,
        catColumns,
        handleOpenCreate,
        isCreating,
        isEditing,
        isCreatingCat,
        handleClose,
        selectedmember,
        handleUpdate,
        handleCreate,
        handleCreateCat,
    } = useFamMem();

    const familyId = localStorage.getItem("fam_id");

    useEffect(() => {
        if (familyId) {
            getFamilyMem(familyId);
            getCategories(familyId);
        }
    }, [familyId]);

    const expandedRowRender = (member) => {
        const memberCategories = categories[member.id] || [];
        const remaining = 3 - memberCategories.length;

        return (
            <div>
                <p style={{ marginBottom: 16 }}>
                    {remaining > 0
                        ? `Can add ${remaining} more categories`
                        : 'Category limit reached (3/3)'}
                </p>
                <Table
                    columns={catColumns}
                    dataSource={memberCategories}
                    pagination={false}
                    rowKey="id"
                    bordered
                    locale={{
                        emptyText: 'No categories yet'
                    }}
                />
            </div>
        );
    };

    return (
        <div>
            <div className={css.create_btn}>
                <Button onClick={handleOpenCreate} type='primary'>
                    Yangi oila a'zosi qo'shish
                </Button>
            </div>
            <br />
            <Divider />

            <Table
                rowKey={'id'}
                columns={columns}
                expandable={{
                    expandedRowRender,
                    rowExpandable: () => true // Always show expandable row
                }}
                dataSource={family_mem}
                bordered
            />

            <Edit
                isEditing={isEditing}
                handleClose={handleClose}
                selectedItem={selectedmember}
                handleUpdate={handleUpdate}
            />

            <Create
                isCreating={isCreating}
                handleClose={handleClose}
                handleCreate={handleCreate}
            />

            <CreateCat
                isCreating={isCreatingCat}
                handleClose={handleClose}
                handleCreate={handleCreateCat}
                selectedMember={selectedmember}
                currentCount={(categories[selectedmember?.id] || []).length}
            />
        </div>
    );
}

export default FamilyMem;