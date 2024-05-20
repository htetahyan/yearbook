'use client'
import Image from "next/image";
import React, {ChangeEvent} from 'react';
import { FixedCropper, FixedCropperRef, ImageRestriction, RectangleStencil} from "react-advanced-cropper";
import {Input} from "~/app/_components/Input";
import 'react-advanced-cropper/dist/style.css'
import Modal from "~/app/_components/general/Modal";
import {useModal} from "~/hooks/useModal";
import {useAppDispatch, useAppSelector} from "~/app/_components/providers/hooks";
import {setImage} from "~/slices/cardSlice";
const Cropper_Component = () => {
    const {isOpen, openModal, closeModal}=useModal()
    const dispatch=useAppDispatch()
    const image=useAppSelector(state=>state.card.image)
    const [selectedFile, setSelectedFile] = React.useState<File | null | undefined>(null);
    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            return;
        } else {
            setSelectedFile(event.target.files[0]);
            openModal()
        }
    };
    const cropperRef = React.useRef<FixedCropperRef>(null);

    const onCrop = async () => {
        if (cropperRef.current) {
             await   fetch(cropperRef.current.getCanvas()?.toDataURL() ?? "")
                    .then(response => response.blob())
                    .then(async (blob) => {
                            const file = new File([blob], `${Math.floor(Math.random() * 99999)}'s_avatar`, { type: blob.type || 'image/png' });
                    dispatch(setImage(file))
                    }

                        //File object
                    )

    }}
    const onCancel = () => {
        setSelectedFile(null) ;
        closeModal()
        console.log(selectedFile)
    }

    return (
        <div>
            <h2 className={'text-3xl'}>Yearbook Photo</h2>
            <Input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-black focus:outline-none dark:bg-white dark:border-gray-600 dark:placeholder-gray-400" type={'file'} onChange={onFileChange} accept={'image/*'}/>
           <p className={'text-md text-red-300'}>*only image formats are allowed.</p>
            {image && <Image src={URL.createObjectURL(image)} width={100} height={100} alt={''}/>}
           <Modal captions={' Edit card photo'} closeModal={onCancel}

                  isOpen={isOpen} action={onCrop}> {selectedFile && ( <div className={' relative '}><FixedCropper

                ref={cropperRef}

                src={URL.createObjectURL(selectedFile)}


                stencilSize={{
                    height: 200,
                    width: 200
                }}
                stencilComponent={RectangleStencil}
                imageRestriction={ImageRestriction.stencil}
                className={'cropper'}
            /></div> )}
           </Modal>
        </div>
    );
}

export default Cropper_Component;
