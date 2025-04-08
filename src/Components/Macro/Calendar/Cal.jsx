import React from 'react';
import { Badge, Calendar } from 'antd';
import css from '../../../assets/css/components.module.css';

const getListData = value => {
    let listData = []; // Specify the type of listData
    switch (value.date()) {
        case 8:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
            ];
            break;
        case 10:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
                { type: 'error', content: 'This is error event.' },
            ];
            break;
        case 15:
            listData = [
                { type: 'warning', content: 'This is warning event' },
                { type: 'success', content: 'This is very long usual event......' },
                { type: 'error', content: 'This is error event 1.' },
                { type: 'error', content: 'This is error event 2.' },
                { type: 'error', content: 'This is error event 3.' },
                { type: 'error', content: 'This is error event 4.' },
            ];
            break;
        default:
    }
    return listData || [];
};
const getMonthData = value => {
    if (value.month() === 8) {
        return 1394;
    }
};
const Cal = () => {
    const monthCellRender = value => {
        const num = getMonthData(value);
        return num ? (
            <div className={css.notes_month}>
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };
    const dateCellRender = value => {
        const listData = getListData(value);
        return (
            <ul className={css.events}>
                {listData.map(item => (
                    <li className={css.calendar_tasks} style={{ fontSize: "10px" }} key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };
    const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };
    return (
        <Calendar
            className={css.calendar} // Ensure this matches your CSS class
            cellRender={cellRender}
        />
    );
};
export default Cal;