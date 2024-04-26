'use client'
import React, {useRef} from 'react';
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
const SteadyText = ({text,className}:{text:string,className?:string}) => {
    const container = useRef(null)
    const textRefs= useRef<string[]>([])
    useGSAP(()=>{
        gsap.registerPlugin(ScrollTrigger)
        gsap.to(textRefs.current,{
duration:0.8,
           ease:'expo',
            stagger:{
                each:0.05,


            },
            scrollTrigger:{
                trigger:container.current,
                start:'-=400px',
                end:'+=100px',
                scrub:true,
                markers:true
            },

            y:0,yPercent:0,
            x:0,xPercent:0,
            opacity:1
        })
    },{scope:container})
    return (
        <div ref={container} className={'flex items-center gap-2 h-fit' }>
            {text.split('').map((char, index) => (
                <h2
                    className={className+'  opacity-0 font-secondary translate-y-1/2'}
                    ref={el =>{
                        if (el) {
                            textRefs.current.push(el as unknown as string)
                        }
                    }}
                    key={index}
                >
                    {char}
                </h2>
            ))}
        </div>
    );
};

export default SteadyText;