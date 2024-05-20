
import React from 'react';
import {Button} from "~/app/_components/Button";
import StaticImage from "~/app/_components/general/StaticImage";
import {back_Icon} from "~/assets/exporter";
import Cropper_Component from "~/app/(gallery)/profile/_components/cropper";
import Create_Card from "~/app/(gallery)/profile/_components/CreateCard";
import CardPreview from "~/app/(gallery)/profile/_components/CardPreview";

const Page = () => {
    return (
        <div className={'w-full h-page'}>
<Button className={'glassBg  flex justify-center gap-2 items-center h-fit'}>
   <div className={'relative w-[25px] h-[25px]'}> <StaticImage src={back_Icon} alt={'back'} /></div>
  <h3>back </h3>  </Button>
     <div className={'w-full h-fit  place-items-center grid grid-cols-2 px-4 py-2 font-secondary tracking-wide text-xl text-white'}>
         <div  className={'w-full'}><Cropper_Component/>
            <Create_Card/>

         </div>
         <CardPreview/>
     </div>
        </div>
    );
};

export default Page;
