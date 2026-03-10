/*
 * Copyright 2025 Circle Internet Group, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  WalletSdk,
  ErrorCallback,
  SuccessCallback,
  LoginSuccessCallback,
  SocialProvider,
  LoginResult
} from "@circle-fin/w3s-pw-react-native-sdk"
import { ShowSnackBarFn } from "./useSnackBar"
import { useAppSelector, useAppDispatch } from "../redux/hooks"
import {
  setEndpoint as setReduxEndpoint,
  setAppId as setReduxAppId,
  setEnableBiometrics as setReduxEnableBiometrics
} from "../features/settings/settingsSlice"
import { setLoginResult } from "../features/result/resultSlice"
import { AuthMode } from "../redux/types"

export default function useWalletSdk(showSnackBar: ShowSnackBarFn) {
  const dispatch = useAppDispatch()
  const endpoint = useAppSelector(state => state.settings.endpoint)
  const appId = useAppSelector(state => state.settings.appId)
  const enableBiometricsPin = useAppSelector(state => state.settings.enableBiometrics)

  const dispatchEndpoint = (value: string) => {
    dispatch(setReduxEndpoint(value))
  }

  const dispatchAppId = (value: string) => {
    dispatch(setReduxAppId(value))
  }

  const dispatchEnableBiometrics = (value: boolean) => {
    dispatch(setReduxEnableBiometrics(value))
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

  const verifyOtp = (otpToken: string, deviceToken: string, deviceEncryptionKey: string,
    successCallback: LoginSuccessCallback,
    errorCallback: ErrorCallback) => {
    initThen(() => {
      WalletSdk.verifyOTP(otpToken, deviceToken, deviceEncryptionKey, successCallback, errorCallback)
    })
  }

  const logoutAndLogin = (provider: SocialProvider, deviceToken: string, deviceEncryptionKey: string,
    successCallback: LoginSuccessCallback,
    errorCallback: ErrorCallback) => {
    initThen(() => {
      WalletSdk.performLogin(provider, deviceToken, deviceEncryptionKey, successCallback, errorCallback)
    })
  }

  const execute = (userToken: string, encryptionKey: string, challengeId: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback) => {
    initThen(() => {
      WalletSdk.execute(userToken, encryptionKey, [challengeId], successCallback, errorCallback)
    })
  }

  const setBiometricsPin = (userToken: string, encryptionKey: string,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback) => {
    initThen(() => {
      WalletSdk.setBiometricsPin(userToken, encryptionKey, successCallback, errorCallback)
    })
  }

  const dispatchLoginResult = (authMode: AuthMode, result: LoginResult) => {
    dispatch(setLoginResult({ authMode, result }))
  }


  // Get authentication data from Redux state
  const emailUserToken = useAppSelector(state => state.result.emailUserToken)
  const emailEncryptionKey = useAppSelector(state => state.result.emailEncryptionKey)
  const socialUserToken = useAppSelector(state => state.result.socialUserToken)
  const socialEncryptionKey = useAppSelector(state => state.result.socialEncryptionKey)
  
  return {
    // Configuration
    endpoint, appId, enableBiometricsPin,
    
    // Redux action dispatchers
    dispatchEndpoint, dispatchAppId, dispatchEnableBiometrics,
    
    // SDK methods
    execute, setBiometricsPin, logoutAndLogin, dispatchLoginResult, verifyOtp,
    
    // Auth data
    emailUserToken, emailEncryptionKey,
    socialUserToken, socialEncryptionKey
  }
}


