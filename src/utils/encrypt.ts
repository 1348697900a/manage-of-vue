import crypto  from "crypto-js"
export const encrypt = (content: any) => crypto.AES.encrypt(content,'lyx').toString();
export const decrypt = (content:any) => crypto.AES.decrypt(content,'lyx').toString(crypto.enc.Utf8)

