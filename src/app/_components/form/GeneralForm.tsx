'use client'
import * as React from 'react';
import {
    Formik,

    Form,

} from 'formik';
import {Input} from "~/app/_components/Input";
import ReCAPTCHA from 'react-google-recaptcha'
import {Button} from "~/app/_components/Button";
import { toast } from 'sonner';
interface MyFormValues {
   email:string;
   password:string
}

 const GeneralForm: React.FC<{}> = () => {
    const initialValues: MyFormValues = { email: '',password:'' };
    const recaptcha = React.useRef<any>(null)

    return (
        <div className={' flex w-screen h-fit mt-16 justify-center font-secondary  items-center'}>

            <Formik
                initialValues={initialValues}
                onSubmit={async(values, actions) => {
                    const captchaValue = recaptcha?.current?.getValue() 
    if (!captchaValue) {
        toast.error('Please verify you are not a bot')      
        
    } else {
 const res=await fetch('/api/recapcha',{
    body:JSON.stringify({value:captchaValue}),method:'POST'
 })
toast.success('success')
 
    }
                }}
            >{(props)=>(
                <Form className={'w-1/2 lg:w-1/3 h-[500px] flex flex-col gap-4 '}>
                    <div><label  className={'text-2xl'}>
                        Email
                    </label>
                        <Input onChange={props.handleChange} name={'email'} type={'email'} className={'text-black'}/>
                    </div>
                    <div><label className={'text-2xl'}>
                        Password
                    </label>
                        <Input onChange={props.handleChange} name={'password'} type={'password'} className={'text-black'}/>
                    </div>
                    <ReCAPTCHA ref={recaptcha}   theme={'dark'} sitekey={'6LevWMUpAAAAAIH82TGkvd1fMccegGtStR5GIjNX'} />
                    <Button >
                        Submit
                    </Button>
                </Form>
            )}


            </Formik>
        </div>
    );
 };
export default GeneralForm