'use client'
import * as React from 'react';
import {
    Formik,
    Form,
    useFormik,
} from 'formik';
import {Input} from "~/app/_components/Input";
import ReCAPTCHA from 'react-google-recaptcha'
import {Button} from "~/app/_components/Button";
import { toast } from 'sonner';
import { Google } from './oauth/Google';
import Link from 'next/link';
import { logo, staticLogo } from '~/assets/exporter';

import StaticImage from '../general/StaticImage';
interface MyFormValues {
   email:string;
   password:string
}
interface props{
path:'join'|'login'
}
    const initialValues: MyFormValues = { email: '',password:'' };

 const GeneralForm: React.FC<props> = ({path}) => {
    const submit=(values:MyFormValues,actions:any)=> {
        const captchaValue = recaptcha?.current?.getValue() 
        console.log(values);
        
    if (!captchaValue) {
    toast.error('Please verify you are not a bot')      
    
    } else {
    
    
    toast.promise(
    // Declare a variable in a broader scope

       new Promise(async (resolve, reject) => {
       try {
          const response = await fetch(`/api/auth/email/${path}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
      const data = await response.json();
      
          if (!response.ok) {
            throw new Error(data.message);
          }
          resolve(data); // Resolve the promise with the data

       } catch (error) {
          
          reject(error); // Reject the promise with the error
       }
      }),
  
      
    {
    loading:'Loading',
    success:path === 'join' ? 'User created successfully' : 'User logged in successfully',
    error:(res)=> res.message
    })
    
    }
    }
    const formik=useFormik({
        initialValues,
        onSubmit:submit
    })
    const recaptcha = React.useRef<any>(null)

    return (
        <div className={' flex w-screen  h-full justify-around   font-secondary  items-center'}>
  <div  className='w-72 relative h-36  '>  

  <StaticImage src={staticLogo}  />
             </div>
             
         
                <form onSubmit={formik.handleSubmit} className={'w-1/2  lg:w-1/3 h-[500px] flex flex-col gap-4 py-2 '}>
                    <h1 className='text-3xl md:text-5xl text-center font-primary text-gradient02 lg:text-6xl'>{path === 'join' ? 'Join Now' : 'Please Login'}</h1>
               
                    <div><label  className={'text-2xl'}>
                        Email
                    </label>
                        <Input onChange={formik.handleChange} name={'email'} type={'email'} className={'text-black'}/>
                    </div>
                    <div><label className={'text-2xl'}>
                        Password
                    </label>
                        <Input onChange={formik.handleChange} name={'password'} type={'password'} className={'text-black'}/>
                    </div>
              
                    <Button >
                        Submit
                    </Button>
                    <div className='h-20'>  <ReCAPTCHA ref={recaptcha}   theme={'dark'} sitekey={'6LevWMUpAAAAAIH82TGkvd1fMccegGtStR5GIjNX'} />
                 </div> 
                    <h1 className='font-primary'>
 {path === 'join' ? (
    <>
      Already have an account?{' '}
      <Link href={'/join/login'} className='text-blue-500'>Login</Link>
    </>
 ) : (
    <>
    Don't have an account?{' '}
    <Link href={'/join'} className='text-blue-500'>Join</Link>
  </>
 
 )}
</h1>

                  <Google/>
                  </form>

        </div>
    );
 };
export default GeneralForm
