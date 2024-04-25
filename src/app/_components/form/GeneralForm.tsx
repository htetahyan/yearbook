'use client'
import * as React from 'react';
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
} from 'formik';
import {Input} from "~/app/_components/Input";
import ReCAPTCHA from 'react-google-recaptcha'
import {Button} from "~/app/_components/Button";
interface MyFormValues {
   email:string;
   password:string
}

 const GeneralForm: React.FC<{}> = () => {
    const initialValues: MyFormValues = { email: '',password:'' };
    return (
        <div className={' flex w-screen h-fit mt-16 justify-center font-secondary  items-center'}>

            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    console.log({ values, actions });
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
            >{(props)=>(
                <Form className={'w-1/3 h-[500px] flex flex-col gap-4 '}>
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
                    <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPCHA_KEY!} />
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