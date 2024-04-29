import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { generateToken, loginUser, tokenCookiesOptions } from "~/server/auth/actions"

export const POST=async(req:NextRequest)=>{
    const {email,password}=await req.json()
    try {
     const user= await loginUser(email,password) 
     const token=await generateToken(user)
        cookies().set('token',token,tokenCookiesOptions)
        return NextResponse.json({message:'Login successful'},{status:200})

    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:401})
    }

}