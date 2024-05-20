'use client';
import React, {FC} from 'react';
import { Button } from '~/app/_components/Button';
import StaticImage from '~/app/_components/general/StaticImage';
import {expand_icon, staticLogo} from '~/assets/exporter';
import Like from './Like';
import { isCurrentUserLiked } from '~/server/gallery/actions';
import { useGetLikesQuery } from '~/server/query/galleryApi';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import {useOutsideClick} from "~/hooks/useHandleOutsideClick";
import Comment from "~/app/(gallery)/_gallery_components/card/Comment";
interface Props {
image:string,caption:string,liked:boolean,name:string,id:number
    ,academicYear:string,
    grade:string,
    campus : string,
    studentId:string,
    isPreview?:boolean}

interface TextRefProps {
    container: HTMLDivElement | null
    name: HTMLDivElement | null
    caption: HTMLDivElement | null

}
interface DetailRefProps{
    container:HTMLDivElement | null
    detailsContainer: HTMLDivElement | null

    details:HTMLDivElement[] | null
}
const Card :FC<Props> = ({ image, caption, liked, name, id,academicYear,campus,studentId,grade, isPreview }) => {
    const imageRef = React.useRef<HTMLImageElement>(null);
    const textRefs = React.useRef<TextRefProps>({ container: null, name: null, caption: null });
   const detailRef=React.useRef<DetailRefProps>({
       container:null,
       detailsContainer:null,
       details:[]
   })
    const [captionLength, setCaptionLength] = React.useState(100);
    const [extend, setExtend] = React.useState(false);

    const tl = React.useRef(gsap.timeline({ paused: true }));


const modalRef=useOutsideClick(()=>{
     setExtend(false)
})
    useGSAP(() => {
if(modalRef.current ) {
    tl.current.to(modalRef.current, {
        x: 0,
        duration: 0.3,
        ease: 'power1.inOut',
        scaleX: 1.2,
        zIndex: 10,
        scaleY: 1.2,
        gridColumn: 'span 3',
        position: 'relative',

    }, '>');
    tl.current.to(imageRef.current, {
        width: '100px',
        height: '100px',
        duration: 0.1,

    }, '<')
    tl.current.to(textRefs.current.name, {
        opacity: 1,
        fontSize: '1.1rem',
        duration: 0.2,
    }, '<')
    tl.current.to(textRefs.current.container, {


        height: 'fit-content',
        width: '290px',
        duration: 0.1,
    }, '<')
    tl.current.to(detailRef.current.container, {
        display: 'grid',

        duration: 0.1
    }, '<')
    tl.current.to(detailRef.current.detailsContainer, {
        display: 'flex',

    }, '<')
    tl.current.to(detailRef.current.details, {
        stagger: 0.05,
        opacity: 1,

    })
}
        if (extend) {

            setCaptionLength(300);
            tl.current.play(0);
        } else {
            setCaptionLength(100);
      tl.current.reverse()

        }

    }, {scope: modalRef, dependencies : [extend],revertOnUpdate:true});

    const details=[academicYear,grade,campus,studentId]
    const toggleExtendCard = () => {
        setExtend(!extend);

    };
    return (
        <div ref={modalRef} className='w-fit will-change-transform h-fit p-1 glassBg   relative  rounded-md  border-2 bg-black border-indigo-300'>
            <div className={'absolute rounded-full cursor-pointer -top-2 z-10 -right-2 p-2  bg-[#0e1129] border-2 '}>
<div onClick={toggleExtendCard} className={'   relative w-[20px] h-[20px] '}><StaticImage src={expand_icon}/></div></div>
            <div ref={(el)=>{
    detailRef.current.container=el} } className={' grid-cols-2 will-change-transform  justify-between'}>
                <div ref={imageRef} className='w-[250px] h-[200px] relative border-2'><StaticImage src={image} /></div>
<div ref={(el)=> {
    detailRef.current.detailsContainer = el
}} className={'hidden text-gradient02 max-w-[200px]  justify-between flex-col items-center'}>
    {details?.map((s,i)=>{

        return <p
            ref={el => {
                detailRef.current.details?.push(el as HTMLDivElement)
            }}
            className={'text-gradient02 max-w-full text-wrap opacity-0 will-change-transform  whitespace-nowrap break-words  drop-shadow-glow  overflow-hidden'} key={i}>{s}</p>
    })}

</div>
</div>
                <div ref={(el) => {
                    textRefs.current.container = el
                }}  className=" p-1 h-[120px] w-[250px] overflow-hidden">
                    <h2 ref={(el) =>{
                        textRefs.current.name = el
                    }} className="text-[1rem] max-w-full text-wrap whitespace-nowrap break-words  tracking-wide text-gradient">{name}</h2>
                    <p className="text-gray-300 text-sm max-w-full text-wrap whitespace-nowrap break-words ">
                        {caption.length > captionLength ? (
                            <>
                                {caption.slice(0, captionLength)}...
                                <span className="text-indigo-300 cursor-pointer" onClick={toggleExtendCard} >read more...</span>
                            </>
                        ) : (
                            caption
                        )}
                    </p>
                </div>

            <div className={'w-full'}>
                {isPreview === true ? <h1 className='w-full text-center'>Preview</h1> :(
                    <div className={'w-full grid grid-cols-3 gap-1 place-items-center'}>  <Like like={liked} id={id} />
                        <Like like={liked} id={id} />
                       <Comment/>
                    </div>
                        )}
            </div>
        </div>
    );
};

export default Card;

export const getLike = async (id: number) => {
    await fetch('http://localhost:3000/api/gallery/like', {});
};
