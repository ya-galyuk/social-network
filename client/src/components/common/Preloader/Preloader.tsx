import React from 'react';
import {Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

export const Preloader = () => {
    const loadingIcon = <LoadingOutlined style={{fontSize: 48}} spin/>;
    return (<Spin indicator={loadingIcon}/>);
};
