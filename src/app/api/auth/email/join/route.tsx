import { NextRequest, NextResponse } from "next/server"
import { checkUserExists, hashPassword, insertUser } from "~/server/auth/actions"
import {decryptPayload} from "~/server/security/payloadEncrypt";
export const POST=async(req:NextRequest)=>{
const {iv,encryptedData}=await req.json()

try{
    const {email,password}=decryptPayload(encryptedData,iv)
    if(await checkUserExists(email)) return NextResponse.json({message:'User already exists'},{status:409})

        const hashedPassword= hashPassword(password)
        await insertUser({email,password:hashedPassword})

    return NextResponse.json({message:'User created successfully'},{status:201})

}catch(e:any){
    return NextResponse.json({message:e.message || 'An error has occurred' },{status:500})
}
}
