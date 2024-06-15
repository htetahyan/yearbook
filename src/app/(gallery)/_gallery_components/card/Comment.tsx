'use client'
import React from 'react';
import StaticImage from "~/app/_components/general/StaticImage";
import {comment_icon} from "~/assets/exporter";
import Link from "next/link";


const Comment = ({id}: {id:number}) => {

    return (

        <Link href={`/gallery/comments/${id}?limit=10`} > <div className={'w-12 h-12 relative hover:scale-90 cursor-pointer will-change-transform transition-all '}>
            <StaticImage src={comment_icon}
alt={'comment'}/>    </div>
</Link>

    );
};

export default Comment;
