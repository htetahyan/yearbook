'use client'
import React from 'react';
import Card from "~/app/(gallery)/_gallery_components/card/card";
import {useAppSelector} from "~/app/_components/providers/hooks";

const Card_preview = () => {

    const card=useAppSelector(state=>state.card)
    return (
        <div>
            <h3 className={'text-center'}>Preview</h3>
            <Card isPreview={true} image={ card.image ? URL.createObjectURL(card.image) : ''} caption={card.caption} liked={false} name={card.name} id={0}
            academicYear={card.academicYear}
                  campus={card.campus}
                  grade={card.grade}
                  studentId={card.studentId}
            />
        </div>
    );
};

export default Card_preview;
