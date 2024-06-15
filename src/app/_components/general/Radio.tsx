import React from 'react';
import {Input} from "~/app/_components/Input";
import {JSX} from "react/jsx-runtime";
import IntrinsicAttributes = JSX.IntrinsicAttributes;

const Radio = ({value,name,onChange}: {value:string,name:string,onChange:(event: string) => void}) => {

    return (

        <div className="flex items-center mb-4">
            <Input defaultChecked={value === name }
                   onChange={()=> onChange(name)}
                   checked={value === name}
                   type="radio" value={value??""} name={name} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{name}</label>
        </div>


);
};

export default Radio;
