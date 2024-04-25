'use client'
import React, {useRef} from 'react';
import SteadyText from "~/app/_components/general/SteadyText";
import StaticImage from "~/app/_components/general/StaticImage";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {loader01, students04} from "~/assets/exporter";
import {useGSAP} from "@gsap/react";
import Image from "next/image";

const Second = () => {
    const container = useRef(null)
    const textRefs= useRef<HTMLHeadingElement[]>([])
    const imageRef= useRef<HTMLImageElement>(null)
    const imageWrapperRef= useRef<HTMLDivElement>(null)
    const loaderRef= useRef<HTMLImageElement>(null)
    useGSAP(()=>{
        gsap.registerPlugin(ScrollTrigger)
        const tl=gsap.timeline({
            scrollTrigger:{
                trigger:container.current,
                start:'top-=100px',
                end:'bottom+=200px',
                pin:true,
                scrub:true,
                markers:true
            }
        })
tl.to(textRefs.current,{
    scale:2, xPercent:50,yPercent:50,
  color:'#05ffbf',
})
    .to(loaderRef.current,{
        rotate:360,

    },'<')
    .to(imageRef.current,{
        scale:1.5, top:0,
    },'<')
    .to(imageWrapperRef.current,{
        width:'200px',
        height:'250px',
        left:'40%',
        borderRadius:'20px',
        scale:1.5
    },'<')
.to(textRefs.current,{
    yPercent:60,
    top:500,
    scrollTrigger:{
        trigger:container.current,
        start:'top-=10px',
        end:'bottom+=500px',
        scrub:true,
        markers:true

    }
})
    },{scope:container})
    return (
        <div ref={container} className={'h-[500px]'}>
          <div className={'flex items-center'}> <SteadyText text={'/Our Yearbook'}/>
              <Image ref={loaderRef} src={loader01} alt={'loader'} className={'w-16'}/>
          </div>
            <div className={'text-4xl uppercase relative h-3/4 mt-10  p-2 w-screen'}>
                <h2
                    ref={el => {
                        if(el){
                            textRefs.current.push(el as unknown as HTMLHeadingElement)
                        }
                    }}
                    className={'absolute bottom-10 left-10'}>
                    Cherished Moments
                </h2>
                <h2
                    ref={el => {
                        if(el){
                            textRefs.current.push(el as unknown as HTMLHeadingElement)
                        }
                    }}
                    className={'absolute top-0 left-10'}>
                    Unforgettable Adventures
                </h2>
                <h2
                    ref={el => {
                        if(el){
                            textRefs.current.push(el as unknown as HTMLHeadingElement)
                        }
                    }}
                    className={'absolute top-1/4 right-10'}>
                    Memories That Last a Lifetime
                </h2>
                <div ref={imageWrapperRef} className={'absolute left-0 overflow-hidden bottom-1/4'}>
                    <div
                        ref={imageRef}
                        className={'h-48 w-72 relative bg-amber-400'}>
                        <StaticImage src={students04}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Second;