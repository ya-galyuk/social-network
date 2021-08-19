import React, {FC} from 'react';
import cls from "../../Profile.module.css";
import {useSelector} from "react-redux";
import {getJob} from "../../../../redux/selectors/profile-selectors";
import Title from "../../common/Title";
import {Typography} from 'antd';
import {JobInfoForm} from "./JobInfoForm";

const {Paragraph} = Typography;

export const JobInfo: FC<PropsType> = (props) => {
    const {isOwner, editMode} = props

    // const [editMode, setEditMode] = useState(false)

    const job = useSelector(getJob)

    if (!job?.lookingForAJob) return null

    return (
        <div className={cls.job}>
            <Title title={"Open to work"} editable={false}/>
            {!editMode
                ? <Paragraph ellipsis={{rows: 2, expandable: true, symbol: 'more'}}>{job.description}</Paragraph>
                : <JobInfoForm job={job} isOwner={isOwner}/>}
        </div>
    );
}

type PropsType = {
    isOwner: boolean
    editMode: boolean
}