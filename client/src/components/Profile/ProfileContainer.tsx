import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile} from "../../redux/reducer/profile-reducer";
import {useHistory, useParams} from "react-router";
import {getAuthorizedUserId} from "../../redux/selectors/auth-selectors";
import {Posts} from "./Posts/Posts";
import cls from "./Profile.module.css";
import {ContactsContainer} from "./ProfileInfo/Contacts/ContactsContainer";
import {AboutContainer} from "./ProfileInfo/About/AboutContainer";
import {Educations} from "./ProfileInfo/Educations/Educations";
import {getProfile} from "../../redux/selectors/profile-selectors";
import {Preloader} from "../common/Preloader/Preloader";
import {DetailsContainer} from "./ProfileInfo/Details/DetailsContainer";

const ProfileContainer: FC<PropsType> = () => {
    const history = useHistory()
    let {userId} = useParams<IMatchParams>();
    const isOwner = !userId

    const authorizedUserId = useSelector(getAuthorizedUserId)
    const profile = useSelector(getProfile)

    const dispatch = useDispatch()

    const refresh = () => {
        if (!userId && authorizedUserId) userId = authorizedUserId
        if (!userId) history.push("/login")
        // if (!userId) userId = "1"
        if (userId) {
            dispatch(getUserProfile(userId))
        }
    }

    useEffect(() => {
        refresh()
    }, [userId])

    if (!profile) return <Preloader/>

    return (
        <div className={cls.profile__container}>
            <div className={cls.info}>
                <DetailsContainer isOwner={isOwner}/>
                <ContactsContainer isOwner={isOwner}/>
                <AboutContainer isOwner={isOwner}/>
                <Educations isOwner={isOwner}/>
            </div>
            <Posts/>
        </div>
    );
};

export default ProfileContainer;

type PropsType = {}

interface IMatchParams {
    userId?: string;
}

/*
TODO: - add editMode for Educations
      - update edit mode such as details block
      - create page for posts
      - add job section
      - add server error message to form
*/

