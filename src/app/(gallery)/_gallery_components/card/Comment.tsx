'use client'
import React from 'react';
import StaticImage from "~/app/_components/general/StaticImage";
import {comment_icon} from "~/assets/exporter";


const Comment = () => {

    return (
      <div >  <div className={'w-12 h-12 relative hover:scale-90 cursor-pointer will-change-transform transition-all '}>
            <StaticImage src={comment_icon}
alt={'comment'}/>    </div>

        </div>
    );
};

export default Comment;
