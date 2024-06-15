import React from 'react';
import BackButton from "~/app/_components/general/BackButton";
import Comment_Input from "~/app/(gallery)/gallery/comments/_comment_components/Comment_Input";
import commentApi from '~/server/query/commentApi';
import dynamic from "next/dynamic";
const User_Comments=dynamic(()=>import("~/app/(gallery)/gallery/comments/_comment_components/Users_Comments"),{ssr:false})
const Page = ({params,searchParams}: { params: { id: string,limit:string },searchParams:  { offset?: string | undefined,limit:string }}) => {
  const id = parseInt(params.id)

    const offset = parseInt(searchParams.offset ?? '0')

const limit = parseInt(searchParams.limit)
  commentApi.endpoints.getComments.initiate({id,limit})
    return (
     <div className={'w-screen text-[#2E2E2E] h-page flex justify-center'}>
<BackButton url={'/gallery'}  />
         <div className={'h-[90%] bg-gray-50 w-[40vw]  rounded-xl relative overflow-hidden'}>
           <div>  <h1 className={'text-2xl font-primary p-2'}>Comments</h1>
             <div className={'h-[1px] bg-black w-full'}/></div>
          <User_Comments id={ id} limit={limit} />

          <Comment_Input id={ id} />
        </div>
     </div>
    );
};

export default Page;
