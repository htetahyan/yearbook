import React from 'react';
import Link from "next/link";
import {Button} from "~/app/_components/Button";
import {delete_icon, email, password, profile} from "~/assets/exporter";
import StaticImage from "~/app/_components/general/StaticImage";

const Settings = () => {
    return (
        <div className={'h-[40%] w-1/2 grid   gap-5'}>

                {settings.map((item, index) => (
                    <Link href={item.href} key={index} className={'w-full glassBg rounded-md  h-full gap-2 flex justify-center items-center'}>
                       <div className={'relative w-[30px] h-[30px]'}><StaticImage src={item.icon} alt={item.label}/>
                       </div>
                       <h2>{item.label}</h2>
                    </Link>
                ))}
        </div>
    );
};

export default Settings;
const settings = [

    {
        label:'Change Password',
        icon: password,
        href:'/'
    },
    {
        label:'Change Email',
        icon: email,
        href:'/'
    },
    {
        label:'Delete Account',
        icon: delete_icon,
        href:'/'
    }

]
