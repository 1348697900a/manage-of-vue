export interface UserInfo {
    admin_name?:string,
    authList?: string[],
    isLogin: boolean
}
export interface LoginInfo {
    account: string,
    password: string
}