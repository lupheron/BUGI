import { Card } from 'antd';
import React from 'react';

function SuggestCard() {
    return (
        <div>
            <Card title="Card title" variant="borderless" style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        </div>
    );
}

export default SuggestCard;