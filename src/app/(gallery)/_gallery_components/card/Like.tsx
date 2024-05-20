'use client'
import React, {useOptimistic, useState} from 'react'
import { Button } from '~/app/_components/Button'
import StaticImage from '~/app/_components/general/StaticImage'
import { like_filled, like_outline } from '~/assets/exporter'
import {likeCard, toggleLike} from "~/server/gallery/actions";
import {revalidateTag} from "next/cache";
import {useToggleLikeMutation} from "~/server/query/galleryApi";

const Like = ({like,id}:{like:boolean,id:number}) => {
const [toggle,{isLoading}]=useToggleLikeMutation()
const [liked,setLiked]=useState(like)
const likeHandler=async ()=>{

    console.log(isLoading)
    if(isLoading){
        return
    }else{
        setLiked(!liked)
        await toggle(id).unwrap().catch(e => {
          setLiked(!liked)
        })
    }

}
  return (
    <div  className={`relative w-12 h-8 p-2 cursor-pointer transition-all ${isLoading?'opacity-50':'opacity-100'}`} onClick={likeHandler}>
        <StaticImage src={liked?like_filled:like_outline} />
    </div>
  )
}

export default Like
