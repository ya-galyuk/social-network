import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {actions, getUserProfile} from "../../redux/reducer/profile-reducer";
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
import {gql, useQuery} from "@apollo/client";
import {useMessageError, useMessageLoading} from "../../hooks/message-hook";
import {Typography} from "antd";

const {Text} = Typography;

const ProfileContainer: FC<PropsType> = () => {
    const history = useHistory()
    let {userId} = useParams<IMatchParams>();
    const isOwner = !userId

    const authorizedUserId = useSelector(getAuthorizedUserId)
    const profile = useSelector(getProfile)
    const {loading, error, data, refetch} = useQuery(GET_USER, {
        variables: {userId: userId || authorizedUserId},
        onCompleted: ({getUser}) => dispatch(actions.setUserProfile(getUser))
    });

    useMessageError(error)
    // useMessageLoading(loading)

    const dispatch = useDispatch()

    const refresh = () => {
        if (!userId && authorizedUserId) userId = authorizedUserId
        if (!userId) history.push("/login")
        if (userId) {
            refetch({userId})
        }
    }

    useEffect(() => {
        refresh()
    }, [userId])

    if (loading || !profile) return <Preloader/>

    console.log("isOwner", isOwner)
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

export const GET_USER = gql`
    query Query($userId: ID!) {
        getUser(userId: $userId) {
            id
            fullName
            email
            about
            status
            location {
                country
                city
            }
            photos {
                small
                large
            }
            contacts {
                Email
                Telegram
                GitHub
                YouTube
                LinkedIn
                WebSite
            }
            followed
            followerCount
            educations {
                country
                city
                university {
                    name
                }
                fieldOfStudy
                degree
                startYear
                endYear
            }
        }
    }
`


/*
TODO: - add editMode for Educations
      - update edit mode such as details block
      - create page for posts
      - add job section
      - add server error message to form
*/

