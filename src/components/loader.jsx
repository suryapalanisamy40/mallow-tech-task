import React from 'react';
import { Spin } from 'antd';

const Loader = ({ text = "Loading..." }) => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <Spin size="large" tip={text} />
        </div>
    );
};

export default Loader;
