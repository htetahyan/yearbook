'use client'
import React, { useOptimistic } from 'react'
import StaticImage from '~/app/_components/general/StaticImage'
import { like_filled, like_outline } from '~/assets/exporter'
import { useToggleLikeMutation } from '~/server/query/galleryApi'

const Like = ({ like, id ,total_likes}: { like: boolean, id: number ,total_likes:number}) => {
    const [toggle, { isLoading }] = useToggleLikeMutation()
    const [liked, update] = useOptimistic(like, (prevLiked) => !prevLiked)

    const likeHandler = async () => {
        if (isLoading) return
        update(!liked)

        try {
            await toggle(id).unwrap()
        } catch (e) {
            update(like)
        }
    }

    return (
       <div
       className={'flex items-center gap-2'}
       > <div
            className={`relative flex items-center w-12 h-8 p-2 cursor-pointer transition-all ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            onClick={likeHandler}
        >
            <StaticImage src={!isLoading && liked ? like_filled : like_outline} />

        </div>
           <p className={'text-gray-200'}>{total_likes > 0 ? total_likes :0}</p>
       </div>
    )
}

export default Like
