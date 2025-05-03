import React, { useEffect, useState } from 'react';
import { Badge, Calendar, Button, Modal } from 'antd';
import css from '../../../assets/css/components.module.css';
import dayjs from 'dayjs';
import { useCalStore } from './CalStore';
import ReminderForm from './ReminderForm';

const Cal = () => {
    const { reminders, fetchReminders } = useCalStore();
    const [reminderModalVisible, setReminderModalVisible] = useState(false); // State for reminder details modal
    const [reminderDetails, setReminderDetails] = useState(null);  // State to store reminder details for the modal
    const [formModalVisible, setFormModalVisible] = useState(false);  // State for reminder form modal
    const [reminderByOtherMembers, setReminderByOtherMembers] = useState({}); // State to track member-specific reminders
    const fam_id = localStorage.getItem('fam_id');

    useEffect(() => {
        fetchReminders(fam_id);
    }, []);

    useEffect(() => {
        // Group reminders by date and family member
        const remindersByDate = reminders.reduce((acc, reminder) => {
            const dateStr = dayjs(reminder.date).format('YYYY-MM-DD');
            if (!acc[dateStr]) acc[dateStr] = [];
            acc[dateStr].push(reminder);
            return acc;
        }, {});

        setReminderByOtherMembers(remindersByDate);
    }, [reminders]);

    const getListData = (value) => {
        const dateStr = value.format('YYYY-MM-DD');
        return reminders
            .filter(reminder => dayjs(reminder.date).format('YYYY-MM-DD') === dateStr)
            .map(reminder => ({
                type: 'success',
                content: reminder.title,
                reminder,  // Store full reminder data
            }));
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        const dateStr = value.format('YYYY-MM-DD');
        const hasMultipleReminders = reminderByOtherMembers[dateStr]?.length > 1;
        const familyMemberReminder = reminderByOtherMembers[dateStr]?.find(r => r.family_member_id !== fam_id);

        return (
            <ul className={css.events}>
                {listData.map((item, idx) => (
                    <li
                        className={css.calendar_tasks}
                        style={{ fontSize: "10px" }}
                        key={idx}
                        onClick={() => openReminderModal(item.reminder)}  // Open modal on click
                    >
                        <Badge
                            status={hasMultipleReminders || familyMemberReminder ? 'warning' : 'success'}
                            text={item.content}
                            style={{
                                fontSize: '20px',  // Increase size of the badge
                                padding: '8px',    // Larger padding for the button
                                borderRadius: '50%',  // Round the badge
                            }}
                        />
                    </li>
                ))}
            </ul>
        );
    };

    const openReminderModal = (reminder) => {
        setReminderDetails(reminder);  // Set reminder details for the modal
        setReminderModalVisible(true);  // Show the reminder details modal
    };

    const closeReminderModal = () => {
        setReminderModalVisible(false);  // Close the reminder details modal
        setReminderDetails(null);  // Clear reminder details
    };

    return (
        <>
            <Button type="primary" onClick={() => setFormModalVisible(true)} style={{ marginBottom: "10px" }}>
                + Add Reminder
            </Button>
            <Calendar
                className={css.calendar}
                cellRender={(current, info) =>
                    info.type === 'date' ? dateCellRender(current) : info.originNode
                }
            />
            <ReminderForm visible={formModalVisible} setVisible={setFormModalVisible} fam_id={fam_id} />

            {/* Modal for viewing reminder details */}
            <Modal
                title="Reminder Details"
                visible={reminderModalVisible && reminderDetails !== null}
                onCancel={closeReminderModal}
                footer={null}
            >
                {reminderDetails && (
                    <div>
                        <h3>Title: {reminderDetails.title}</h3>
                        <p><strong>Category:</strong> {reminderDetails.category_name}</p>
                        <p><strong>Description:</strong> {reminderDetails.description}</p>
                        <p><strong>Date:</strong> {dayjs(reminderDetails.date).format('YYYY-MM-DD')}</p>
                        <p><strong>Family Member:</strong> {reminderDetails.family_member_name}</p>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default Cal;
