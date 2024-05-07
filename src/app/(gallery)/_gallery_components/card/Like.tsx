'use client'
import React from 'react'
import { Button } from '~/app/_components/Button'
import StaticImage from '~/app/_components/general/StaticImage'
import { like_filled, like_outline } from '~/assets/exporter'
import {likeCard} from "~/server/gallery/actions";

const Like = ({like}:{like:boolean}) => {

    const likeHandler=async ()=>{

await fetch(`/api/gallery/like?liked=${like}&&card_id=1`,{method:'POST'})

    }
  return (
    <Button className='relative w-12 h-8 p-2' onClick={likeHandler}>
        <StaticImage src={like?like_filled:like_outline} />
    </Button>
  )
}

export default Like
