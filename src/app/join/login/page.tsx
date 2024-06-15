import React from 'react'
import dynamic from "next/dynamic";
const GeneralForm=dynamic(()=>import("~/app/_components/authForm/GeneralForm"),{ssr:false})
 const page = () => {
  return (
    <div className={'h-[85vh]'}>
    <GeneralForm path={'login'}/>
            </div>  )
}
export default page
