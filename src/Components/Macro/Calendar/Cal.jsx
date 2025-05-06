import React, { useEffect, useState } from 'react';
import { Calendar, Button, Modal } from 'antd';
import css from '../../../assets/css/components.module.css';
import dayjs from 'dayjs';
import { useCalStore } from './CalStore';
import ReminderForm from './ReminderForm';
import axios from 'axios';

const Cal = () => {
    const { reminders, fetchReminders } = useCalStore();
    const [reminderModalVisible, setReminderModalVisible] = useState(false);
    const [selectedDateReminders, setSelectedDateReminders] = useState([]);
    const [formModalVisible, setFormModalVisible] = useState(false);
    const fam_id = localStorage.getItem('fam_id');

    useEffect(() => {
        fetchReminders(fam_id);
    }, []);

    const getListData = (value) => {
        const dateStr = value.format('YYYY-MM-DD');
        return reminders.filter(
            reminder => dayjs(reminder.date).format('YYYY-MM-DD') === dateStr && reminder.status !== 1 // Exclude done reminders
        );
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        if (listData.length > 0) {
            return (
                <div style={{ fontSize: '12px', textAlign: 'center', color: 'rgb(171, 171, 171)', margin: '20px auto' }}>
                    Got plans for the day
                </div>
            );
        }
        return null;
    };

    const handleDateClick = (value) => {
        const dateReminders = getListData(value);
        setSelectedDateReminders(dateReminders);
        setReminderModalVisible(true);
    };

    const closeReminderModal = () => {
        setReminderModalVisible(false);
        setSelectedDateReminders([]);
    };

    const handleMarkAsDone = async (id) => {
        try {
            await axios.post('http://bugi.test/api/reminders-done', {
                id,
                status: 1, // Mark as done
            });
            // Refresh reminders after marking as done
            fetchReminders(fam_id);
            // Close the modal after marking as done
            closeReminderModal();
        } catch (error) {
            console.error('Failed to mark reminder as done:', error);
        }
    };

    return (
        <>
            <Button type="primary" onClick={() => setFormModalVisible(true)} style={{ marginBottom: "10px" }}>
                + Add Reminder
            </Button>
            <Calendar
                className={css.calendar}
                onSelect={handleDateClick} // Open modal on date click
                dateCellRender={dateCellRender}
            />
            <ReminderForm visible={formModalVisible} setVisible={setFormModalVisible} fam_id={fam_id} />

            {/* Modal for viewing reminders on a selected date */}
            <Modal
                title="Reminders"
                visible={reminderModalVisible}
                onCancel={closeReminderModal}
                footer={null}
            >
                {selectedDateReminders.length > 0 ? (
                    <ul>
                        {selectedDateReminders.map((reminder, idx) => (
                            <li key={idx} style={{ marginBottom: '10px' }}>
                                <p><strong>Title:</strong> {reminder.title}</p>
                                <p><strong>Description:</strong> {reminder.description}</p>
                                <p><strong>Date:</strong> {dayjs(reminder.date).format('YYYY-MM-DD')}</p>
                                {reminder.family_member_name && (
                                    <p><strong>Family Member:</strong> {reminder.family_member_name}</p>
                                )}
                                <Button
                                    type="primary"
                                    onClick={() => handleMarkAsDone(reminder.id)}
                                    style={{ marginTop: '10px' }}
                                >
                                    Done
                                </Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reminders for this date.</p>
                )}
            </Modal>
        </>
    );
};

export default Cal;
