import React from 'react';
import StaticImage from "~/app/_components/general/StaticImage";
import {profile as profileIcon} from "~/assets/exporter";
import {Button} from "~/app/_components/Button";
import Link from "next/link";
const profile = async () => {

    return (
        <div className={'h-page w-full'}>
            <h1>Profile</h1>
       <div className={'w-full flex flex-col items-center'}>  <div className={'w-[100px] h-[100px] relative'}><StaticImage src={profileIcon} alt={'Profile'}/>
           </div>
       <div className={'w-full'}>
           Your Card
           <div className={'w-full h-1 bg-white'}/>
           <div className={'mt-4'}>
             <div className={'w-full flex flex-col items-center'}> <h2 >{'You have not added any card.'}</h2>
            <Link href={'/profile/create-card'}> <Button> Add Card</Button>
            </Link>
             </div>
           </div>
       </div>

       </div>
        </div>
    );
};

export default profile;
