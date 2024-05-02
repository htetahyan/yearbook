'use client'
import React from 'react';
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";

const FooterNavigation = () => {
    const [active, setActive] = React.useState(0);
    const activeRef=React.useRef<HTMLDivElement>(null);
    // Function to handle keydown event
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Tab' || event.key === 'Enter') {
            event.preventDefault(); // Prevent the default action of the key
            const nextIndex = (active + 1) % 4; // Calculate the next index, wrapping around if necessary
            setActive(nextIndex); // Update the active state
        }
    };
    useGSAP(()=>{
        // Calculate the left position based on the active tab
        const leftPosition = active * 25;
        gsap.to(activeRef.current, {duration: 0.3, left: leftPosition + '%', ease: "power1.out"});
    },[active])
    return (
        <div className={'w-[40vw] h-12 fixed bottom-0 grid grid-cols-4 place-items-center'}>
            {
                Array.from({length: 4}, (_, i) => <div key={i} onClick={() => setActive(i)} onKeyDown={handleKeyDown} className={'w-full h-full flex justify-center items-center cursor-pointer'}>{i+1}</div>)
            }
            <div ref={activeRef} className={'bg-amber-700 absolute left-0 w-1/4 h-full z-50'}></div>
        </div>
    );
};

export default FooterNavigation;
