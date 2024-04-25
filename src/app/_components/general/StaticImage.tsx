'use client';
import Image, {StaticImageData} from 'next/image';

import { useInView } from 'react-intersection-observer';

export default function StaticImage({src,className}:{src:StaticImageData,className?:string}) {

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5
    })


    return (

                <Image
                    ref={ref}
                    src={src}
quality={100}                    fill
                    alt="image"
fetchPriority={'high'}
                    style={{
                        opacity: inView ? 1 : 0,

                        transition: "opacity 0.5s cubic-bezier(0.3, 0.2, 0.2, 0.8)"
                    }}
                />


    )
}