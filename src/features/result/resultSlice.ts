// Copyright (c) 2024, Circle Internet Financial, LTD. All rights reserved.
//
// SPDX-License-Identifier: Apache-2.0
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../../app/store.ts'
import {AuthMode} from "../../screens/TabScreen.tsx"
import { LoginResult } from '../../utils/useWalletSdk.ts'

export interface AuthLoginResult {
  authMode: AuthMode,
  result: LoginResult
}
// Define a type for the slice state
interface ResultState {
  emailUserToken: string | undefined,
  emailEncryptionKey: string | undefined,
  socialUserToken: string | undefined,
  socialEncryptionKey: string | undefined,
}

// Define the initial state using that type
const initialState: ResultState = {
  emailEncryptionKey: undefined,
  emailUserToken: undefined,
  socialEncryptionKey: undefined,
  socialUserToken: undefined,
}

export const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    setLoginResult: (state, action: PayloadAction<AuthLoginResult>) => {
      switch (action.payload.authMode){
        case AuthMode.email:
          state.emailUserToken = action.payload.result.userToken
          state.emailEncryptionKey = action.payload.result.encryptionKey
          break
        case AuthMode.social:
          state.socialUserToken = action.payload.result.userToken
          state.socialEncryptionKey = action.payload.result.encryptionKey
          break
      }
    }
  }
})

export const { setLoginResult } = resultSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectEmailUserToken = (state: RootState) => state.result.emailUserToken
export const selectEmailEncryptionKey = (state: RootState) => state.result.emailEncryptionKey
export const selectSocialUserToken = (state: RootState) => state.result.socialUserToken
export const selectSocialEncryptionKey = (state: RootState) => state.result.socialEncryptionKey

export default resultSlice.reducer
