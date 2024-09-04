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

import * as React from "react"

import {Text, View} from "react-native"
import {MainButton} from "./MainButton.tsx"
import {useTranslation} from "react-i18next"
import {commonStyles} from "../styles.ts"
import CommonInputText from "./CommonInputText.tsx"


import type {RootStackParamList} from "../App"
import {AuthMode} from "../screens/TabScreen.tsx"
import useWalletSdk from "../utils/useWalletSdk.ts"
import {NativeStackNavigationProp} from "@react-navigation/native-stack/src/types.tsx"
import CopyableText from "./CopyableText.tsx"
import {WalletSdk} from "../utils/useWalletSdk.ts"
import {useSelector} from "react-redux"
import {selectEmailEncryptionKey, selectEmailUserToken} from "../features/result/resultSlice.ts"
import {ShowSnackBarFn} from "../utils/useSnackBar.tsx"
import RequiredMarkText from "./RequiredMarkText.tsx"
import {GoExecuteButton} from "./GoExecuteButton.tsx"

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Tab'>
    showSnackBar: ShowSnackBarFn
}

export default function EmailTab({ navigation, showSnackBar }: Props) {
    const { t } = useTranslation()
    const userToken = useSelector(selectEmailUserToken)
    const encryptionKey = useSelector(selectEmailEncryptionKey)
    const {appId,dispatchAppId, verifyOtp, dispatchLoginResult} = useWalletSdk(showSnackBar)
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
            <Text style={[commonStyles.inputTitle, {marginTop: 12}]}>{t("device_id_title")}</Text>
            <CopyableText accessibilityLabel={'deviceId'} value={WalletSdk.deviceId}/>
            <RequiredMarkText text={t('appid_title')}/>
            <CommonInputText
                accessibilityLabel={"appIdInput"}
                onChangeText={dispatchAppId}
                value={appId}
            />
            <RequiredMarkText text={t('device_token_title')}/>
            <CommonInputText
                accessibilityLabel={"deviceTokenInput"}
                onChangeText={setDeviceToken}
                value={deviceToken}
            />
            <RequiredMarkText text={t('device_encryption_title')}/>
            <CommonInputText
                accessibilityLabel={"deviceEncryptionKeyInput"}
                onChangeText={setDeviceEncryptionKey}
                value={deviceEncryptionKey}
            />
            <RequiredMarkText text={t('otp_token_title')}/>
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
                onPressOut={() => {
                    verifyOtp(otpToken, deviceToken, deviceEncryptionKey,
                            loginResult => {
                                dispatchLoginResult(AuthMode.email, loginResult)
                                showSnackBar(t('login_success'), true)
                            },
                            e => {
                                showSnackBar(e.message, false)
                            })
                }}
            />
            {userToken != null && encryptionKey != null && (<GoExecuteButton
                accessibilityLabel={"emailGoExecuteBt"}
                style={{marginTop: 24}}
                onPressOut={() => {
                    navigation.navigate('Execute', {authMode: AuthMode.email})
                }}
            />)}
        </View>
    )
}
