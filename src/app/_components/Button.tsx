import React, {FC, forwardRef} from 'react';

import {cva, VariantProps} from "class-variance-authority";
import {cn} from '~/styles/utils'
const btnVariants = cva(
    'inline-block rounded-md hover:scale-x-[90%] will-change-transform hover:ring-2 hover:ring-offset-2 transition-all rounded-md duration-300 ',
    {
        variants: {
            variant: {
                primary: 'bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg transition-all',
                secondary: 'bg-gradient-to-r from-indigo-500 to-red-400 text-white font-bold py-2 px-4 rounded shadow hover:shadow-md transition-all',
                danger: 'bg-gradient-to-br from-[#ff3030] via-[#ff4747] to-[#ff3030] text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg transition-all',
                success: 'bg-[#0e1129] text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg transition-all',
                warning: 'bg-gradient-to-br from-[#ffd166] via-[#ffb54a] to-[#ffd166] text-black font-bold py-2 px-4 rounded shadow-md hover:shadow-lg transition-all',
                border: 'border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded shadow-md hover:shadow-lg transition-all',
                ghost: 'bg-transparent text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-200 hover:text-black transition-all',
                link: 'text-blue-500 font-bold py-2 px-4 rounded hover:underline'
            }
,
            size:{
                default: 'py-2 px-4',
                sm: 'py-1 px-2',
                lg: 'py-4 px-8'
            },
            font: {
                primary: 'primary-font',
                secondary: 'secondary-font ',
            },

        },
        defaultVariants: {
            variant: 'primary',
            size: 'default',
        }
    }

)
interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> ,VariantProps<typeof btnVariants> {
    children?: React.ReactNode;
}

const Button  = forwardRef< HTMLButtonElement, BtnProps> (({children,variant,className,font,size,...props},ref ) => {
    return (
        <button {...props} className={cn(btnVariants({variant,size,font}),className)} ref={ref}>
            {children}
        </button>
    );
})
Button.displayName='Button'



export {Button,btnVariants};