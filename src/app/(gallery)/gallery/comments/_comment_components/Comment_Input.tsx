'use client'
import React, {useEffect, useState} from 'react';
import {Input} from "~/app/_components/Input";
import {Button} from "~/app/_components/Button";
import { usePostCommentMutation } from '~/server/query/commentApi';
import { toast } from 'sonner';

const Comment_Input = ({id}: {id:number}) => {
   const [postComment,{isLoading}]=usePostCommentMutation();
    const [newMessage, setNewMessage] = useState('');
    const onSubmit = async(e: React.FormEvent) => {
e.preventDefault();
        if (newMessage.length > 0) {
      const content={
        content: newMessage,}

            await postComment({ content, card_id: id });
            setNewMessage('');
    } else {
        toast.error('Comment cannot be empty');
    }



    }

    return (
        <form onSubmit={onSubmit} className={'w-full absolute bottom-0 bg-gray-300 flex items-center h-16'}>
<Input value={newMessage} className={'w-[80%] h-full'} onChange={(e) => setNewMessage(e.target.value)} placeholder={'Write a comment'} />
            <Button variant={'success'} className={'w-[20%] h-full'} type={'submit'} disabled={newMessage.length === 0 || isLoading}>Post</Button>
        </form>
    );
};

export default Comment_Input;
