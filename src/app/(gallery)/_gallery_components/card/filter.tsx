'use client'
import React from 'react';
import StaticImage from "~/app/_components/general/StaticImage";
import {filter_icon} from "~/assets/exporter";
import Radio from "~/app/_components/general/Radio";
import {useAppDispatch, useAppSelector} from "~/app/_components/providers/hooks";
import {setFilter} from "~/slices/filterSlice";
import {useRouter, useSearchParams} from "next/navigation";

const Filter = () => {
    const filter=useAppSelector(state => state.filter.filter)
const searchParams=useSearchParams()
    const filterValue=searchParams.get('filter')
    const radios=['newest','oldest','a-z','z-a','popular','liked']
    const router=useRouter()
    const dispath=useAppDispatch()
    const onChange = (value:string ) => {
 router.push('/gallery?filter='+value)
        dispath(setFilter(value ))

    }

    return (
        <div className={'w-[10%] px-2'}>
            <div className={'flex  relative items-center gap-2 justify-around'}>
            <h1 className={'text-2xl text-gray-200'}>filter</h1>
                <div className={'relative w-6 h-6'}>
                <StaticImage src={filter_icon} alt={'filter'}/>
                </div>
                <div className={'absolute w-full h-[1px] bg-gray-400 bottom-0'}/>
            </div>
            {radios.map((radio,i)=><Radio key={i}  value={filterValue!} onChange={onChange} name={radio}/>)}
<div>
<label>Limit</label>
    <select className={'text-black p-2 mx-2 rounded-xl text-xl bg-white'}>
        <option className={'text-black p-2'} value={6}>
            6
        </option>
 <option value={12}>
     12
 </option>

    </select>
</div>
        </div>
    );
};

export default Filter;

