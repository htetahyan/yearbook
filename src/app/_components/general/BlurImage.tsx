import Image from 'next/image';

import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

export default async function BlurImage({width,height,src,className}:{width:number,height?:number,src:string,className?:string}) {


    const buffer = await fs.readFile(`./public/${src}`);
    const { base64 } = await getPlaiceholder(buffer);

    return (


                <Image
                    src={src.replace('./public', '')}
                    width={width}
                    height={height ?? width/1.5}
                    className={className}
                    alt="image"
                    placeholder='blur'
                    blurDataURL={base64}
                />

    )
}