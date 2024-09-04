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
import {useTranslation} from "react-i18next"
import {commonStyles} from "../styles.ts"
import CommonInputText from "./CommonInputText.tsx"
import type {RootStackParamList} from "../App"
import {AuthMode} from "../screens/TabScreen.tsx"
import useWalletSdk from "../utils/useWalletSdk.ts"
import {NativeStackNavigationProp} from "@react-navigation/native-stack/src/types.tsx"
import CopyableText from "./CopyableText.tsx"
import {WalletSdk} from "../utils/useWalletSdk.ts"
import { useSelector} from "react-redux"
import {selectSocialEncryptionKey, selectSocialUserToken} from "../features/result/resultSlice.ts"
import {ShowSnackBarFn} from "../utils/useSnackBar.tsx"
import {SocialProvider} from "@circle-fin/w3s-pw-react-native-sdk/src/types.ts"
import RequiredMarkText from "./RequiredMarkText.tsx"
import {SocialLoginButton} from "./SocialLoginButton.tsx"
import HyperlinkText from "./HyperlinkText.tsx"
import {GoExecuteButton} from "./GoExecuteButton.tsx"

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Tab'>
    showSnackBar: ShowSnackBarFn
}

export default function SocialTab({ navigation, showSnackBar }: Props) {
    const DOC_URL = 'https://developers.circle.com/w3s/docs/authentication-methods#create-a-wallet-with-social-logins'
    const { t } = useTranslation()
    const userToken = useSelector(selectSocialUserToken)
    const encryptionKey = useSelector(selectSocialEncryptionKey)
    const {appId, dispatchAppId, logoutAndLogin, dispatchLoginResult} = useWalletSdk(showSnackBar)
    const [deviceToken, setDeviceToken] = React.useState("")
    const [deviceEncryptionKey, setDeviceEncryptionKey] = React.useState("")

    const LoginButton = (provider: SocialProvider) => {
        return (
            <SocialLoginButton disabled={deviceToken.length === 0 || deviceEncryptionKey.length === 0}
                               provider={provider} onPressOut={() => {
                        logoutAndLogin(provider, deviceToken, deviceEncryptionKey,
                            loginResult => {
                                dispatchLoginResult(AuthMode.social, loginResult)
                                showSnackBar(t('login_success'), true)
                            },
                            e => {
                                showSnackBar(e.message, false)
                            })
            }}/>)
    }
    const SectionText = () => {
        return (<View style={{flexDirection: 'row',justifyContent: 'center', marginTop: 24, marginBottom: 12}}>
            <View style={commonStyles.sectionLine}/>
            <Text style={commonStyles.sectionText}>{t("log_in_with_section")}</Text>
            <View style={commonStyles.sectionLine}/>
        </View>)
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

            {SectionText()}
            {LoginButton(SocialProvider.Google)}
            {LoginButton(SocialProvider.Facebook)}
            {LoginButton(SocialProvider.Apple)}
            {userToken != null && encryptionKey != null && (<GoExecuteButton
                accessibilityLabel={"socialGoExecuteBt"}
                onPressOut={() => {
                    navigation.navigate('Execute', {authMode: AuthMode.social})
                }}
            />)}
            <HyperlinkText fullText={t('info_full_text')} linkText={t('info_link_text')} url={DOC_URL}/>
        </View>
    )
}
