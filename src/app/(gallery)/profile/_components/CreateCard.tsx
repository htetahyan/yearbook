'use client'
import React from 'react';
import {Input} from "~/app/_components/Input";
import {useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "~/app/_components/providers/hooks";
import {NewCard, setCard} from "~/slices/cardSlice";
import {Button} from "~/app/_components/Button";
import {useCreateCardMutation} from "~/server/query/galleryApi";
import {toast} from "sonner";

const Create_Card = () => {
    const createCardValues=useAppSelector(state => state.card)
const [createCard]=useCreateCardMutation()
    const dispatch=useAppDispatch()
const submitCard=async ()=>{
    const requiredFields: (keyof NewCard)[] = ['name', 'caption', 'grade', 'academicYear', 'campus', 'studentId', 'image',"border"]
    if (requiredFields.some(key => !createCardValues[key])) {
        toast.warning('Please fill in all required fields', {
            duration: 1500,

        });
        return;
    }
  await  createCard(createCardValues).unwrap()
}
    return (
        <div className={'h-fit '}>
            {createCardFields.map( (field:FieldType,i) => {
                return (
                    <div key={i} className={'flex-col flex'}>
                        <label>{field.label}</label>
                        {field.type==='dropdown' ? <select
                           defaultValue={createCardValues[field.label as keyof typeof createCardValues]!}
                            onChange={(e) => {
                                e.target.value !== field.options[0] &&
                                dispatch(setCard({[field.label]: e.target.value}))
                            }}
                            className={' bg-gray-700 p-2 rounded-xl'}>
                            {field.options.map((option,i)=><option key={i}>{option}</option>)}
                        </select>:    <Input
                            value={createCardValues[field.label as keyof typeof createCardValues]!}
                            onChange={(e) => dispatch(setCard({[field.label]: e.target.value}))}
                            className={' bg-gray-700'} type={field.type} />}

                    </div>

                );
            })}
            <Button onClick={submitCard}>
                Submit
            </Button>
        </div>
    );
};

export default Create_Card;
interface Field {
    label: string;
    type: 'text';
}

interface DropdownField {
    label: string;
    type: 'dropdown'; // Corrected typo here
    options: string[];
}

type FieldType = Field | DropdownField;

export const createCardFields: FieldType[] = [
    {
        label: 'name',
        type: 'text',
    },
    {
        label: 'caption',
        type: 'text',
    },
    {
        label: 'grade',
        type: 'dropdown', // Corrected typo here
        options: [
            "select previous attended Grade",
            "KG","Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6", "Grade 7","Grade 8","Grade 9"
        ]
    },
    {
        label: 'academicYear',
        type: 'dropdown', // Corrected typo here
        options: [
            "select academic year",
            "2020-21","2021-22","2022-23","2023-24","2024-25",
        ]
    },
    {
        label: 'campus',
        type: 'dropdown',
        options: [
            "select campus",'campus','Crimson','Helio','Mocha','Purple Marigold','Sangria','Morado','Fuchsia','Sapphire','Indigo','Azura','none'
        ]
    },
    {
        label: 'studentId',
        type: 'text',
    },
    {
        label: 'border',
        type: 'dropdown',
        options: [
            "select border",
            "normal_scene_01","normal_scene_02"
            ,"normal_scene_03","normal_scene_04","vip_scene_01",
            "vip_scene_02","vip_scene_03","vip_scene_04"
        ]
        // Corrected typo here
    },
];


