import {ResultCodes} from "../enums";

export interface TResponse<D = {}, RC = ResultCodes> {
    data: D
    resultCode: RC;
    messages: Array<string | object>;
}
