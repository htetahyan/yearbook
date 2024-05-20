'use client'
import React from 'react';
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import StaticImage from '~/app/_components/general/StaticImage';
import {home, noti, profile, setting, vip} from '~/assets/exporter';
import Link from "next/link";

const FooterNavigation = () => {
    const [active, setActive] = React.useState(0);
    const activeRef=React.useRef<HTMLDivElement>(null);
    // Function to handle keydown event

    useGSAP(()=>{
        // Calculate the left position based on the active tab
        const leftPosition = active * 20;
        const tl=gsap.timeline({
            defaults:{duration:0.3, ease:'power1.out'}
        })
        tl.to(activeRef.current, { left: leftPosition + '%'});

    },[active])
    return (
        <div className={'w-[30vw] outline-1 outline outline-indigo-300 glassBg rounded-md overflow-hidden h-12 fixed bottom-1 grid grid-cols-5 place-items-center'}>
           {navigations.map((item, index) => (
               <Link href={item.href} key={index} className={`relative w-1/5 h-full rounded-md cursor-pointer `} onClick={() => setActive(index)}>
                <StaticImage src={item.Icon} />
                </Link>
           ))}
            <div ref={activeRef} className={'bg-black absolute left-0 w-1/5 h-full -z-10'}></div>
        </div>
    );
};

export default FooterNavigation;
const navigations=[{
    label:'Home',
    Icon: home,
    href:'/gallery'
},{
    label:'Notifications',
    Icon: noti,
    href:'/'
},
    {
    label:'Profile',
    Icon: profile,
    href:'/settings'},
    {
    label:'Settings',
    Icon: setting,
    href:'/settings'
},{
    label:'Vip',
    Icon: vip,
    href:'/settings'
},]
