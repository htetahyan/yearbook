import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { generateToken, loginUser, tokenCookiesOptions } from "~/server/auth/actions"
import {decryptPayload} from "~/server/security/payloadEncrypt";

export const POST=async(req:NextRequest)=>{
    const {iv,encryptedData}=await req.json()

    try{
        const {email,password}=decryptPayload(encryptedData,iv)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
     const user= await loginUser(email,password)
     const token=await generateToken(user)
        cookies().set('token',token,tokenCookiesOptions)
        return NextResponse.json({message:'Login successful'},{status:200})

    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:400})
    }

}
