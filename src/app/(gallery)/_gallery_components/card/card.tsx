import React from 'react';
import { Button } from '~/app/_components/Button';
import StaticImage from '~/app/_components/general/StaticImage';
import { staticLogo } from '~/assets/exporter';

const Card = ({image}:{image:string}) => {
  return (
    <div className='h-fit w-fit p-1 glassBg relative rounded-md border-2 bg-black border-indigo-300'>
    <div className="w-[200px] h-[250px] relative rounded-md ">
      <div className='w-full h-2/3 relative border-2'><StaticImage src={image} /></div> 

      <div className="p-1 max-h-1/3 overflow-hidden">
        <h2 className="text-xl font-semibold">User Name</h2>
        <p className="mt-1 text-gray-300 text-sm">
  {caption.length > 40? (
    <>
      {caption.slice(0, 40)}...
      <span className="text-indigo-300">Read More</span>
    </>
  ) : (
    caption
  )}
</p>

      </div>

    
    </div>
    <div >
        <Button>
            Like
            </Button>
     </div>
    </div>
  );
};

export default Card;
const caption='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'