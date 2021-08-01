import {ResultCodes} from "../enums";
import {UserType} from "./redux/UsersTypes";
import {ProfilePhotosType, ProfileType} from "./redux/ProfileTypes";

interface IResponse {
    resultCode: ResultCodes;
    messages: Array<string>;
}

/*
* Auth response interfaces
* */
export interface IAuthMeResponse extends IResponse {
    data: {
        userId: string;
        email: string;
        login: string;
    };
}

export interface IAuthLoginResponse extends IResponse {
    data: {
        userId: string;
    };
}

export interface IAuthLogoutResponse extends IResponse {
    data: null;
}

/*
* Profile response interfaces
* */

export interface IProfileResponse extends IResponse {
    data: ProfileType;
}

export interface IProfileStatusResponse extends IResponse {
    data: { status: string };
}

export interface IProfilePhotoResponse extends IResponse {
    data: ProfilePhotosType;
}

/*
* Users response interfaces
* */
export interface IUsersResponse extends IResponse {
    data: {
        items: Array<UserType>,
        totalCount: number
    };
}

export interface IUsersFollowUnfollowResponse extends IResponse {
    data: {};
}