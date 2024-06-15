import { isFulfilled, isPending, isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { toast } from 'sonner'


export const CustomSonnerLoaderMiddleWare: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {

        if (isRejectedWithValue(action)) {
        toast.dismiss()
            //@ts-expect-error
            action.payload.data ===null || action.payload.data === undefined ? null :
                //@ts-expect-error
                action.payload.status === 401 || action.payload.status === 403
                    ? toast.warning('You dont have permission to perform this action! please contact your administrator.')

                    //@ts-expect-error
                    : action.payload.status === "FETCH_ERROR"
                        ? toast.error('Server error, please try again later.')
                        : // @ts-expect-error
            toast.warning(action?.payload.data.message || 'An error has occurred')

        }    if (isFulfilled(action)) {
            toast.dismiss()
            // @ts-expect-error
            toast.success(action.payload?.message)
        }
        if(isPending(action)){

            toast.loading('Please wait...',{duration:3})
        }

        return next(action)
    }

