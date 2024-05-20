import React from 'react';
import { db } from '~/server/db';
import { files, yearbooks } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

import GalleryApi from "~/server/query/galleryApi";
import Cards from "~/app/(gallery)/_gallery_components/card/Cards";

const Page = async() => {

GalleryApi.endpoints.getCards.initiate({limit:10,offset:0,filter:'newest'});

// Assuming GalleryApi is correctly set up and imported

    return (
        <div className={'h-page w-full '}>
<Cards/>
        </div>
    );
};

export default Page;

