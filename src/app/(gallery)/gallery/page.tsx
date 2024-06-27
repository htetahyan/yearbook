'use client';
import React from 'react';



import dynamic from "next/dynamic";
import {redirect} from "next/navigation";
const Cards=dynamic(()=>import("~/app/(gallery)/_gallery_components/card/Cards"),{ssr:false})
const Filter=dynamic(()=>import("~/app/(gallery)/_gallery_components/card/filter"),{ssr:false})
const Page = ({ searchParams,}:{searchParams: {[filter: string
]:
string | string[] | undefined
}
}
) => {
  const filter = searchParams.filter;
    if (filter === null || filter === undefined) {

redirect('/gallery?filter=newest')
    }


    return (
        <div className={'h-page w-full flex  '}>
          <Filter/>
            <div className={'w-[90%] relative py-2 '}>
                <Cards/>
            </div>

        </div>
    );
};

export default Page;

