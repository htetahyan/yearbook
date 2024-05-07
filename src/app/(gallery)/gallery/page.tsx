import React from 'react';
import Card from '../_gallery_components/card/card';
import { db } from '~/server/db';
import { files, yearbooks } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

const Page = async() => {

const cards= await db.select().from(yearbooks).rightJoin(files, eq(files.yearbook_id,yearbooks.id)).limit(10);

console.log(cards);

    return (
        <div className={'h-page w-full grid gap-2 grid-cols-5'}>
{cards.map((card)=>(

    <Card image={card.files.url}/>
))}
        </div>
    );
};

export default Page;
