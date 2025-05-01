import React, { useEffect, useState } from 'react';
import { Badge, Calendar, Button } from 'antd';
import css from '../../../assets/css/components.module.css';
import dayjs from 'dayjs';
import { useCalStore } from './CalStore';
import ReminderForm from './ReminderForm';

const Cal = () => {
    const { reminders, fetchReminders } = useCalStore();
    const [modalVisible, setModalVisible] = useState(false);
    const fam_id = 1; // Replace with real data

    useEffect(() => {
        fetchReminders(fam_id);
    }, []);

    const getListData = (value) => {
        const dateStr = value.format('YYYY-MM-DD');
        return reminders
            .filter(reminder => dayjs(reminder.date).format('YYYY-MM-DD') === dateStr)
            .map(reminder => ({
                type: 'success',
                content: reminder.title,
            }));
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className={css.events}>
                {listData.map((item, idx) => (
                    <li className={css.calendar_tasks} style={{ fontSize: "10px" }} key={idx}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <>
            <Button type="primary" onClick={() => setModalVisible(true)} style={{ marginBottom: "10px" }}>
                + Add Reminder
            </Button>
            <Calendar
                className={css.calendar}
                cellRender={(current, info) =>
                    info.type === 'date' ? dateCellRender(current) : info.originNode
                }
            />
            <ReminderForm visible={modalVisible} setVisible={setModalVisible} fam_id={fam_id} />
        </>
    );
};

export default Cal;
