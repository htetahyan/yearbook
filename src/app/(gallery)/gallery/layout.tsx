'use client'
import React from 'react';
import {useModal} from "~/hooks/useModal";

const Layout =  ({children}: {children: React.ReactNode,comment:React.ReactNode}) => {

    return (
        <>
            {children}

        </>
    );
};

export default Layout;
