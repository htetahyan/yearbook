import { NextRequest, NextResponse } from "next/server"
import { checkUserExists, hashPassword, insertUser } from "~/server/auth/actions"
export const POST=async(req:NextRequest)=>{
const {email,password}=await req.json()

if(!email || !password) return NextResponse.json({message:'Please provide email and password'+email+password},{status:400})
if(await checkUserExists(email)) return NextResponse.json({message:'User already exists'},{status:400})
try{
    const hashedPassword= hashPassword(password)
    await insertUser({email,password:hashedPassword})
    return NextResponse.json({message:'User created successfully'},{status:201})

}catch(e:any){
    return NextResponse.json({message:e.message },{status:500})
}
}