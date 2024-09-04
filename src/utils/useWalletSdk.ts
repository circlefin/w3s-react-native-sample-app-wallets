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

import {useDispatch, useSelector} from "react-redux"
import {
  selectAppId,
  selectEnableBiometrics,
  selectEndpoint,
  setAppId, setEnableBiometrics,
  setEndpoint
} from "../features/settings/settingsSlice.ts"
import {WalletSdk} from "@circle-fin/w3s-pw-react-native-sdk"
import {ErrorCallback, LoginSuccessCallback} from "@circle-fin/w3s-pw-react-native-sdk/src/types.ts"
import {AuthMode} from "../screens/TabScreen.tsx"
import {
  LoginResult,
  SocialProvider,
  SuccessCallback
} from "@circle-fin/w3s-pw-react-native-sdk/lib/typescript/src/types"
import {setLoginResult} from "../features/result/resultSlice.ts"
import {ShowSnackBarFn} from "./useSnackBar.tsx"


export default function useWalletSdk(showSnackBar: ShowSnackBarFn) {
  const dispatch = useDispatch()
  const endpoint = useSelector(selectEndpoint)
  const appId = useSelector(selectAppId)
  const enableBiometricsPin = useSelector(selectEnableBiometrics)
  const dispatchEndpoint = (value: string) => {
    dispatch(setEndpoint(value))
  }
  const dispatchAppId = (value: string) => {
    dispatch(setAppId(value))
  }
  const dispatchEnableBiometrics = (value: boolean) => {
    dispatch(setEnableBiometrics(value))
  }
  const dispatchLoginResult = (authMode: AuthMode, result: LoginResult) => {
    dispatch(setLoginResult({authMode, result}))
  }
  const initThen = (action: () => void) => {
    WalletSdk.init({
      endpoint,
      appId,
      settingsManagement: { enableBiometricsPin: enableBiometricsPin }
    }).then(() => {
      action()
    }).catch((e) => {
      showSnackBar(e.message, false)
    })
  }
  const verifyOtp = (otpToken:string, deviceToken: string, deviceEncryptionKey: string,
                     successCallback: LoginSuccessCallback,
                     errorCallback: ErrorCallback)=> {
    initThen(() => {
      WalletSdk.verifyOTP(otpToken, deviceToken, deviceEncryptionKey, successCallback, errorCallback)
    })
  }
  const logoutAndLogin = (provider: SocialProvider, deviceToken: string, deviceEncryptionKey: string,
                          successCallback: LoginSuccessCallback,
                          errorCallback: ErrorCallback) => {
    WalletSdk.performLogout(provider,() => {
      initThen(() => {
        WalletSdk.performLogin(provider, deviceToken, deviceEncryptionKey, successCallback, errorCallback)
      })
    }, e => {
      errorCallback(e)
    } )
  }
  const execute = (userToken:string, encryptionKey: string, challengeId: string,
                     successCallback: SuccessCallback,
                     errorCallback: ErrorCallback)=> {
    initThen(() => {
      WalletSdk.execute(userToken, encryptionKey, [challengeId], successCallback, errorCallback)
    })
  }
  const setBiometricsPin = (userToken:string, encryptionKey: string,
                     successCallback: SuccessCallback,
                     errorCallback: ErrorCallback)=> {
    initThen(() => {
      WalletSdk.setBiometricsPin(userToken, encryptionKey, successCallback, errorCallback)
    })
  }
  return {
    endpoint, appId, enableBiometricsPin,
    dispatchEndpoint, dispatchAppId, dispatchEnableBiometrics,
    dispatchLoginResult, logoutAndLogin, verifyOtp, execute, setBiometricsPin}
}

export * from '@circle-fin/w3s-pw-react-native-sdk'
export type * from '@circle-fin/w3s-pw-react-native-sdk/lib/typescript/src/types'
