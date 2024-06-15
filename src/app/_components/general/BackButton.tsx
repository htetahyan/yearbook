'use client'
import React from 'react';
import Link from "next/link";
import {Button} from "~/app/_components/Button";
import {useRouter} from "next/navigation";

const BackButton = ({url}: {url?: string}) => {
    const router = useRouter();
    const goBack = () => {
     url? router.push(url):   router.back()
    }
    return (

         <Button onClick={goBack} className={'h-fit'}>
             Back
         </Button>

    );
};

export default BackButton;
