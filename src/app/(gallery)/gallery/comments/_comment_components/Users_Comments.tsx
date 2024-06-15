'use client'
import React, {useEffect} from 'react';
import { useGetCommentsQuery } from '~/server/query/commentApi';
import TimeAgo from 'timeago-react';
const User_Comments = ({id,limit}: {id:number,limit:number}) => {
    const [newLimit, setNewLimit] = React.useState(limit);
    const { data } = useGetCommentsQuery({id,limit})
    const [comments, setComments] = React.useState(data);
 
    return (
       <div  className="flex flex-col w-full h-[90%]">
            <div className="flex-grow overflow-y-scroll ">
                {data?.map((d, i) => (
                    <Single_Comment key={i} comment={d.comments?.content as string} created_at={d.comments?.createdAt as number } author={d.users.name!} />
                ))}
            </div>
        </div>
    );
};

export default User_Comments;
const Single_Comment = ({ comment, created_at,author }: { comment: string, created_at: number,author:string }) => {

    return (
        <div className={'w-full h-fit p-2 '}>
            <div>
                <div className='flex justify-between items-center'>  <h3 className={'font-secondary text-lg tracking-wider'}>{author??'Anonymous'}</h3>
                  <TimeAgo
  datetime={created_at*1000}
                        locale='en'
                        live={false}

/>
                </div>
                <p className={'text-gray-500 text-sm px-2 max-w-full text-wrap whitespace-nowrap break-words' }>
                    {comment}
                </p>
                <div className={'h-[1px] bg-gray-400 w-full'}/>
            </div>
        </div>)
}
