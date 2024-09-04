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
import type {RootState} from '../../app/store'
import {pw_app_id, pw_endpoint} from "../../config.json"

// Define a type for the slice state
interface SettingsState {
  endpoint: string,
  appId: string,
  enableBiometrics: boolean,
}

// Define the initial state using that type
const initialState: SettingsState = {
  endpoint: pw_endpoint,
  appId: pw_app_id,
  enableBiometrics: false,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setEndpoint: (state, action: PayloadAction<string>) => {
      state.endpoint = action.payload
    },
    setAppId: (state, action: PayloadAction<string>) => {
      state.appId = action.payload
    },
    setEnableBiometrics: (state, action: PayloadAction<boolean>) => {
      state.enableBiometrics = action.payload
    },
  }
})

export const { setEndpoint, setAppId,
  setEnableBiometrics } = settingsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectEndpoint = (state: RootState) => state.settings.endpoint
export const selectAppId = (state: RootState) => state.settings.appId
export const selectEnableBiometrics = (state: RootState) => state.settings.enableBiometrics

export default settingsSlice.reducer
