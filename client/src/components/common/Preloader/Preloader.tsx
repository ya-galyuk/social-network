import React from 'react';
import {Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

export const Preloader = () => {
    const loadingIcon = <LoadingOutlined style={{fontSize: 48}} spin/>;
    return (
        <div style={{width: '100%', height: '100%', display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Spin indicator={loadingIcon}/>
        </div>
    );
};
