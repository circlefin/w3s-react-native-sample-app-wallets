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

import * as React from "react"
import { Text, View } from "react-native"
import { MainButton } from "./MainButton"
import { useTranslation } from 'react-i18next'
import { commonStyles } from "../styles"
import CommonInputText from "./CommonInputText"
import useWalletSdk from "../utils/useWalletSdk"
import { AuthMode } from "../redux/types"
import { ShowSnackBarFn } from "../utils/useSnackBar"
import CopyableText from "./CopyableText"
import { WalletSdk } from "@circle-fin/w3s-pw-react-native-sdk"
import RequiredMarkText from "./RequiredMarkText"
import { GoExecuteButton } from "./GoExecuteButton"
import { useRouter } from "expo-router"

interface EmailTabProps {
  showSnackBar: ShowSnackBarFn;
}

export const EmailTab: React.FC<EmailTabProps> = ({ showSnackBar }) => {
  const router = useRouter()
  const { t } = useTranslation()
  
  const {
    appId, 
    dispatchAppId, 
    verifyOtp, 
    dispatchLoginResult,
    // Get email auth data directly from the hook 
    emailUserToken,
    emailEncryptionKey
  } = useWalletSdk(showSnackBar)
  
  const [deviceToken, setDeviceToken] = React.useState("")
  const [deviceEncryptionKey, setDeviceEncryptionKey] = React.useState("")
  const [otpToken, setOtpToken] = React.useState("")

  const isEmailLoginDisabled = () => {
    return (
      !appId ||
      !deviceToken ||
      !deviceEncryptionKey ||
      !otpToken
    )
  }

  return (
    <View style={commonStyles.containerWithPadding}>
      <Text style={[commonStyles.inputTitle, { marginTop: 12 }]}>{t("device_id_title")}</Text>
      <CopyableText accessibilityLabel={'deviceId'} value={WalletSdk.deviceId} />
      
      <RequiredMarkText text={t('appid_title')} />
      <CommonInputText
        accessibilityLabel={"appIdInput"}
        onChangeText={(value) => {
          dispatchAppId(value)
        }}
        value={appId}
      />
      
      <RequiredMarkText text={t('device_token_title')} />
      <CommonInputText
        accessibilityLabel={"deviceTokenInput"}
        onChangeText={setDeviceToken}
        value={deviceToken}
      />
      
      <RequiredMarkText text={t('device_encryption_title')} />
      <CommonInputText
        accessibilityLabel={"deviceEncryptionKeyInput"}
        onChangeText={setDeviceEncryptionKey}
        value={deviceEncryptionKey}
      />
      
      <RequiredMarkText text={t('otp_token_title')} />
      <CommonInputText
        accessibilityLabel={"otpTokenInput"}
        onChangeText={setOtpToken}
        value={otpToken}
      />
      
      <MainButton
        accessibilityLabel={"emailLoginBt"}
        disabled={isEmailLoginDisabled()}
        isSecondary={false}
        text={t("email_login_bt")}
        onPress={() => {
          verifyOtp(
            otpToken, 
            deviceToken, 
            deviceEncryptionKey,
            loginResult => {
              dispatchLoginResult(AuthMode.email, loginResult)
              showSnackBar(t('login_success'), true)
            },
            e => {
              showSnackBar(e.message, false)
            }
          )
        }}
      />
      
      {emailUserToken != null && emailEncryptionKey != null && (
        <GoExecuteButton
          accessibilityLabel={"emailGoExecuteBt"}
          style={{ marginTop: 24 }}
          onPress={() => {
            router.push({
              pathname: '/ExecuteScreen',
              params: { 
                authMode: AuthMode.email,
                userToken: emailUserToken,
                encryptionKey: emailEncryptionKey
              }
            })
          }}
        />
      )}
    </View>
  )
}