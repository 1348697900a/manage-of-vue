export interface UserInfo {
    name?:string,
    authList?: string[],
    isLogin: boolean
}
export interface LoginInfo {
    account: number,
    password: string|number
}