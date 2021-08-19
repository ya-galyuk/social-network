import {useSelector} from "react-redux";
import React, {FC} from "react";
import {Preloader} from "../common/Preloader/Preloader";
import {getIsLoading} from "../../redux/selectors/users-selectors";
import {Users} from "./Users";

const UsersPage: FC<PropsType> = (props) => {
    const isLoading = useSelector(getIsLoading)
    return <>
        {isLoading ? <Preloader/> : null}
        <Users/>
    </>
};

export default UsersPage

type PropsType = {}