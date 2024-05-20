'use client'
import React,{useOptimistic} from 'react';
import Card from "~/app/(gallery)/_gallery_components/card/card";
import {useGetCardsQuery} from "~/server/query/galleryApi";
import {NewCard} from "~/slices/cardSlice";

const Cards = () => {
    const {data:cards}=useGetCardsQuery({limit:10,offset:0,filter:'newest'})


    return (
        <div className={'grid grid-cols-1 place-items-center md:grid-cols-3 gap-2 lg:grid-cols-5 w-full'}>
            { cards?.map((card,i)=>(
<div key={i}>
                <Card studentId={card?.yearbook?.student_id as string} grade={card?.yearbook?.campus as string} academicYear={card?.yearbook?.academicYear as string} campus={card?.yearbook?.campus as string} image={card.files.url??''}  name={card.yearbook!.name} caption={card.yearbook!.caption} liked={card.like !== null} id={card.yearbook!.id}/>
        </div>
            ))}
        </div>
    );
};

export default Cards;
