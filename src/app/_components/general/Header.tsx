import React from 'react';
import BlurImage from "~/app/_components/general/BlurImage";
import {logo} from "~/assets/exporter";
import Link from "next/link";
import {Button} from "~/app/_components/Button";

const Header = () => {
    return (
        <div
            className={'w-screen z-50 h-[65px] grid grid-cols-3 items-center p-4 sticky top-0 bg-purple-700 rounded-br-md rounded-bl-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 '}>

            <Link href={'/'}   > <BlurImage height={40} width={150} src={logo}/></Link>
            <div className={'flex items-center justify-center  gap-4 text-4xl font-secondary underline'}>

                <Link href={'/'} className={'text-gradient'}>
                    Gallery &rarr;
                </Link>

            </div>
            <div className={'flex items-center justify-center gap-4 text-3xl font-secondary underline'}>
            <Link href={'/join/login'}> <Button variant={'success'}  size={'sm'} className={'text-xl bg-[#0e1129]'}>

                     Login &rarr;

             </Button>
             </Link>
            </div>
        </div>
    );
};

export default Header;