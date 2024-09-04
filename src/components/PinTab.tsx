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

import {
    Text,
    View
} from "react-native"
import { MainButton } from "./MainButton.tsx"
import { useTranslation } from "react-i18next"
import {commonStyles} from "../styles.ts"
import type { RootStackParamList } from "../App.tsx"
import CommonInputText from "./CommonInputText.tsx"
import useWalletSdk from "../utils/useWalletSdk.ts"
import {NativeStackNavigationProp} from "@react-navigation/native-stack/src/types.tsx"
import {ShowSnackBarFn} from "../utils/useSnackBar.tsx"
import {SuccessCallback} from "../utils/useWalletSdk.ts"
import {ErrorCallback} from "../utils/useWalletSdk.ts"
import RequiredMarkText from "./RequiredMarkText.tsx"
import {BiometricsSwitchButton} from "./BiometricsSwitch.tsx"
type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Tab'>
    showSnackBar: ShowSnackBarFn
}
export default function PinTab({ showSnackBar }: Props) {
    const { t } = useTranslation()
    const {endpoint, appId, enableBiometricsPin,
        dispatchEndpoint, dispatchAppId, dispatchEnableBiometrics,
        execute, setBiometricsPin } = useWalletSdk(showSnackBar)
    const [userToken, setUserToken] = React.useState("")
    const [encryptionKey, setEncryptionKey] = React.useState("")
    const [challengeId, setChallengeId] = React.useState("")
    const isSetBiometricsPinDisabled = () => {
        return (
            !enableBiometricsPin ||
            !endpoint ||
            !appId ||
            !encryptionKey ||
            !userToken
        )
    }
    const isExecuteDisabled = () => {
        return (
            !endpoint ||
            !appId ||
            !userToken ||
            !encryptionKey ||
            !challengeId
        )
    }
    const successCallback: SuccessCallback = result => {
        showSnackBar(t('execute_success'), true)
        console.log(JSON.stringify(result))
    }
    const errorCallback: ErrorCallback = e => {
        showSnackBar(e.message, false)
    }
    return (
        <View style={commonStyles.containerWithPadding}>
            <RequiredMarkText text={t('endpoint_title')} style={{marginTop: 12}}/>
            <CommonInputText
                accessibilityLabel={"endpointInput"}
                onChangeText={dispatchEndpoint}
                value={endpoint}
            />
            <RequiredMarkText text={t('appid_title')}/>
            <CommonInputText
                accessibilityLabel={"appIdInput"}
                onChangeText={dispatchAppId}
                value={appId}
            />
            <RequiredMarkText text={t('user_token_title')}/>
            <CommonInputText
                accessibilityLabel={"userTokenInput"}
                onChangeText={setUserToken}
                value={userToken}
            />
            <RequiredMarkText text={t('encryption_title')}/>
            <CommonInputText
                accessibilityLabel={"encryptionKeyInput"}
                onChangeText={setEncryptionKey}
                value={encryptionKey}
            />
            <Text style={commonStyles.inputTitle}>{t("challenge_id_title")}</Text>
            <CommonInputText
                accessibilityLabel={"challengeIdInput"}
                onChangeText={setChallengeId}
                value={challengeId}
            />
            <BiometricsSwitchButton
                accessibilityLabel={"biometricsSwitch"}
                enableSwitch={enableBiometricsPin}
                onValueChange={dispatchEnableBiometrics}
                value={enableBiometricsPin}
            />
            <MainButton
                accessibilityLabel={"executeBt"}
                disabled={isExecuteDisabled()}
                isSecondary={false}
                text={t("execute_bt")}
                onPressOut={() => {
                    execute(userToken, encryptionKey, challengeId, successCallback, errorCallback)
                }}
            />
            <MainButton
                isSecondary={true}
                accessibilityLabel={"setBiometricsPinBt"}
                disabled={isSetBiometricsPinDisabled()}
                text={t("set_biometrics_pin_bt")}
                onPressOut={() => {
                    setBiometricsPin(userToken, encryptionKey, successCallback, errorCallback)
                }}
            />
        </View>
    )
}
