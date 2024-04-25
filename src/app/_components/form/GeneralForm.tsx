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

interface MyFormValues {
    firstName: string;
}

 const GeneralForm: React.FC<{}> = () => {
    const initialValues: MyFormValues = { firstName: '' };
    return (
        <div className={' flex w-screen h-fit mt-16 justify-center items-center'}>

            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    console.log({ values, actions });
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
            >{(props)=>(
                <form className={'w-1/3 h-[500px] flex flex-col gap-4 '}>
                    <div><label className={'text-xl'}>
                        Name
                    </label>
                        <Input className={'text-black'}/>
                    </div>
                    <div><label className={'text-xl'}>
                        Name
                    </label>
                        <Input className={'text-black'}/>
                    </div>
                </form>
            )}


            </Formik>
        </div>
    );
 };
export default GeneralForm