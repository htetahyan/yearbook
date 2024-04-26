
import React, {useRef} from 'react';
import BlurImage from "~/app/_components/general/BlurImage";
import {scrollImage, students01, students02, students03} from "~/assets/exporter";
import Image from "next/image";
import TextReveal from "~/app/_components/home/TextReveal";


const Hero = () => {
    return (
        <div  className={'h-[85vh] relative'}>
            <div
                className={'  text-center md:text-8xl text-6xl lg:text-9xl h-full flex flex-col justify-center items-center'}>
                <TextReveal from={'center'} duration={0.3} ease={'power3.in'} spanClassName={'opacity-0 drop-shadow-smallGlow translate-y-1/3'}
                            className={' bg-gradient-to-r from-yellow-500 to-teal-400 bg-clip-text text-transparent '} text={'Welcome  to'}/>

<h1  className={' drop-shadow-glow'}>
    Edusn Digital School
</h1>
             <TextReveal text={'Yearbook'}
                         duration={0.2} delay={0.8} ease={'power2.in'} spanClassName={'opacity-0 scale-75 drop-shadow-smallGlow '}

                         className={' bg-gradient-to-r  from-indigo-500 to-yellow-500 bg-clip-text text-transparent'}/>

                <div className={'text-7xl w-full justify-center h-1/6 flex items-center'}>
                 <h2 className={'font-secondary text-3xl md:text-4xl'}>scroll</h2>
                    <Image width={50} height={50} alt={'scroll'}  src={scrollImage as unknown as string}/>
                    <h2 className={'font-secondary text-3xl md:text-4xl'}>down</h2>
                </div>
            </div>
            <div className={'absolute top-0 -z-10 w-full h-full'}>
                <BlurImage width={250}  className={'absolute top-0 opacity-80 left-2  rounded-full w-[180px] md:w-[200px] lg:w-[250px]'}  src={students01}/>
    <BlurImage className={'absolute bottom-1/3 hidden md:block md:bottom-0 opacity-80 left-1/3 md:left-2 rounded-md mask border-1 w-[180px] md:w-[200px] lg:w-[250px]'} width={300}  src={students02}/>
<BlurImage className={'absolute bottom-0 md:bottom-0 opacity-80 right-2 md:right-2 mask02 border-1 w-[180px] md:w-[220px] lg:w-[250px]'}  width={300} src={students03}/>
            </div>

        </div>
    );
};

export default Hero;