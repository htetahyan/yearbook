import {eq} from "drizzle-orm"
import {db} from "../db"
import {NewUser, users} from "../db/schema"
import {jwtDecrypt, jwtVerify, SignJWT} from 'jose'
import bcrypt from 'bcryptjs';
import {ResponseCookie} from "next/dist/compiled/@edge-runtime/cookies";


export const checkUserExists = async (email: string) => {
    const res=await db.query.users.findFirst({
        where : eq(users.email, email)
    })
    return res ? true : false
}

export const insertUser = async (user: NewUser) => {
    return db.insert(users).values(user);
  }
 export const hashPassword =  (password: string) => {
    const salt = bcrypt.genSaltSync(10);
return  bcrypt.hashSync(password, salt);

 }
 export const comparePassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
 }
 export const loginUser=async(email:string,password:string)=>{
    const user=await db.query.users.findFirst({
        where : eq(users.email, email)
    })
    if(!user) throw new Error('User not found')
    const isPasswordValid= comparePassword(password,user.password)
    if(!isPasswordValid) throw new Error('password is not valid')
    return user
 }
 const secretKey=new TextEncoder().encode(process.env.JWT_SECRET)
 export const generateToken =async (user: any) => {
    try {
        return await new SignJWT({email: user.email, id: user.id})
            .setProtectedHeader({alg: "HS256"})
            .setIssuedAt()
            .setIssuer("https://example.com")
            .setAudience("https://example.com")
            .setExpirationTime("1d")
            .sign(secretKey)
    }catch (error:any) {
throw new Error (error.message)
    }

 }
 export const decodeToken = async (token: string) => {
     return await jwtDecrypt(token,secretKey);
 }

 export const verifyToken = async (token: string) => {
 try {
     const {  payload} =   await jwtVerify(token,secretKey,{
         issuer: "https://example.com",
         audience:'https://example.com'
     });
     return payload
 } catch (error:any) {
     throw new Error(error.message)
 }
 }

 export const tokenCookiesOptions:Partial<ResponseCookie> = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    domain: "localhost",

 }
