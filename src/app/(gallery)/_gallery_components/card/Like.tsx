'use client'
import React from 'react'
import { Button } from '~/app/_components/Button'
import StaticImage from '~/app/_components/general/StaticImage'
import { like_filled, like_outline } from '~/assets/exporter'

const Like = () => {
    const[like,setLike]=React.useState(false)
  return (
    <Button className='relative w-12 h-8 p-2' onClick={()=>setLike(!like)}>
        <StaticImage src={like?like_filled:like_outline} />
    </Button>
  )
} 

export default Like