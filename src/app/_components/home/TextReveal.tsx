'use client'
import React, {useRef} from 'react';
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";

const TextReveal = ({text, className, spanClassName, duration,ease,delay,from}: {text:string,className?:string,spanClassName?:string,duration?:number,ease?:string,delay?:number,from?:any}) => {
   const container = useRef(null)
    const textRefs= useRef<string[]>([])
useGSAP(()=>{
    gsap.registerPlugin(ScrollTrigger)
    gsap.to(textRefs.current,{
        duration:duration??0.5,
        ease:ease??'none',
        delay:delay??0,
        stagger:{
            each:0.03,

            from: from ?? 'start',
        },
        scale:1,
        y:0,yPercent:0,
        x:0,xPercent:0,
        opacity:1
    })
    ScrollTrigger.create({
        trigger:container.current,
        start:'top-=100px',
        end:'+=400px',
        scrub:1,
        markers:true,
        animation:gsap.to(textRefs.current,{
            yPercent:70,
            ease:'none',


        })
    })

},{scope:container})

    return (
        <div className={className + ' flex items-center gap-2 '} ref={container} style={{overflowWrap: 'break-word'}}>
            {text.split('').map((char, index) => (
                <h1
                    key={index}
                    className={spanClassName}
                    ref={el => {
                        if (el) {
                            textRefs.current.push(el as unknown as string)
                        }
                    }}
                >
                    {char}
                </h1>
            ))}
        </div>

    );
};

export default TextReveal;