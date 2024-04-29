import Image from 'next/image'
import React from 'react'
import { Button } from '~/app/_components/Button'
import { google } from '~/assets/exporter'
import { getGoogleOAuthURL } from '~/server/auth/getOAuthUrl'

export const Google = () => {
  return (
    <Button onClick={getGoogleOAuthURL} variant={'success'} className={'w-fit flex items-center gap-4'}>
<Image src={google} width={24} height={24} alt={'google'} />
        <span>Continue with Google</span>
    </Button>
  )
}
