'use client'
import React from 'react';
import {Button} from "~/app/_components/Button";

interface ModalProps {
    closeModal: () => void
    isOpen: boolean
    children: React.ReactNode
    action: () => void
    captions: string

}
const Modal = (props:ModalProps) => {

    return (

        <div className={` ${props.isOpen ? 'block' : 'hidden'} bg-white rounded-lg p-2  w-fit h-fit absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2` }>
         <div className={'flex justify-between items-center'}>  <h2 className={'text-2xl text-black font-secondary tracking-wider'}>{props.captions}</h2>
             <Button variant={'danger'} onClick={props.closeModal}>X</Button>
         </div>
            {props.isOpen && (
                <div className={'  w-[500px] mt-2 h-[500px]'}>{props.children}

                </div>
            )}
            <div className={'flex justify-between items-center'}>
                <Button variant={'danger'} onClick={props.closeModal}>Close</Button>
                <Button onClick={props.action}>Confirm</Button>
            </div>
        </div>
    );
};

export default Modal;
