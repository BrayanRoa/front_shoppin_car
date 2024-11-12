export interface BaseResponse {
    rta:        boolean;
    message:    string;
    httpStatus: number;
}

export interface BaseResponseSuccess extends BaseResponse {
    data:string
}