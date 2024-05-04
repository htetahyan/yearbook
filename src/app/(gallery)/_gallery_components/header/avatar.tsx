import React from 'react';
import StaticImage from "~/app/_components/general/StaticImage";
import {profile} from "~/assets/exporter";
import {HtmlProps} from "next/dist/shared/lib/html-context.shared-runtime";

const Avatar = (props: any) => {
    return (
        <div className={'w-12 h-12 bg-indigo-400 rounded-full relative outline-1 outline outline-indigo-300 outline-offset-2 hover:outline-dashed hover:outline-2 cursor-pointer'}>
            <StaticImage src={profile} {...props} />
        </div>
    );
};

export default Avatar;
