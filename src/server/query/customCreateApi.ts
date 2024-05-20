import * as React from 'react'
import {
    createDispatchHook,
    createSelectorHook,
    createStoreHook,
    ReactReduxContextValue,
} from 'react-redux'
import {
    buildCreateApi,
    coreModule,
    reactHooksModule,
} from '@reduxjs/toolkit/query/react'

export const customCreateApi = buildCreateApi(
    coreModule(),
    reactHooksModule(
{ unstable__sideEffectsInRender: true }
    )
)
