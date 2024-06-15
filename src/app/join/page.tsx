import React from 'react';
import dynamic from "next/dynamic";
const GeneralForm = dynamic(() => import("~/app/_components/authForm/GeneralForm"), {ssr: false})

const Page = () => {
    return (
        <div className={'h-[85vh]'}>
<GeneralForm path={'join'}/>
        </div>
    );
};

export default Page;
