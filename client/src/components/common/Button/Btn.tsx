import React, {FC} from 'react';
import {EditOutlined} from "@ant-design/icons";
import cls from "./Btn.module.css";
import {Tooltip} from "antd";

export const BtnEdit: FC<PropTypes> = (props) => {
    const {tooltip = "click to edit section", onClick} = props
    return (
        <Tooltip title={tooltip}>
            <EditOutlined onClick={onClick} className={cls.btn__edit}/>
        </Tooltip>
    );
};

type PropTypes = {
    tooltip?: string | null
    onClick: () => void
};