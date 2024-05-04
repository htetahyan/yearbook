'use client'
import React, {useRef, useState} from 'react';
import StaticImage from "~/app/_components/general/StaticImage";
import {staticLogo} from "~/assets/exporter";
import Avatar from "~/app/(gallery)/_gallery_components/header/avatar";
import {useOutsideClick} from "~/hooks/useHandleOutsideClick";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";

const Header = () => {
    const [show, setShow] = useState(false);
const toggle = () => {
    setShow(!show)
}
const ref=useOutsideClick(()=>{
    setShow(false)
})
    const menu = useRef<HTMLDivElement>(null)
    useGSAP(()=>{
        gsap.to(menu.current,{opacity:1,top:'4rem', duration:0.4,

        })
    },[show])
    return (
        <div className={'w-screen h-16   relative flex justify-between  py-2 px-4 '}>
            <div className={'relative w-24 h-12'}>
            <StaticImage src={staticLogo} /></div>
            <div ref={ref}>
                {/*<div className={'relative w-fit h-fit '} onClick={toggle}><Avatar/>
                </div>
                {show && <div ref={menu}
                className={'absolute opacity-0 w-24 h-60 bg-white rounded-lg scale-1 right-2 top-16'}>hello
            </div>
           */ }
        </div>

        </div>
    );
};

export default Header;
