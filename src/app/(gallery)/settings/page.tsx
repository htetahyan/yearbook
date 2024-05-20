import React from 'react';
import Settings from "~/app/(gallery)/settings/_components/settings";

const Page = () => {
    return (
        <div className={'h-page w-full  p-3 flex flex-col items-center  gap-2'}>
            <h1 className={'text-center text-3xl'}>Settings</h1>
            <Settings/>
        </div>
    );
};

export default Page;
