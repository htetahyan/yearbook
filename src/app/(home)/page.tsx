import React from 'react';
import Hero from "~/app/_components/home/hero";
import Second from "~/app/_components/home/Second";

const Page = () => {
    return (
        <div className={'p-2 w-screen overflow-hidden flex h-[600vh] flex-col  gap-[13vh]'}>
        <Hero/><Second/>

        </div>
    );
};

export default Page;