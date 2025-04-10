import { Card } from 'antd';
import React from 'react';

function SuggestCard() {
    return (
        <div>
            <Card title="Category Name" variant="borderless" style={{ width: 300, marginTop: '30px' }}>
                <p>Reading book (The Song of Achilles)</p>
            </Card>
        </div>
    );
}

export default SuggestCard;