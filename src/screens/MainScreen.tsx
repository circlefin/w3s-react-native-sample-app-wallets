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

import { Platform, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from "react-native"
import { WalletSdk } from "@circle-fin/w3s-pw-react-native-sdk"
import { toast } from "../Helpers.ts"
import { DefaultCustomizer } from "../customize/DefaultCustomizer.ts"
import { useTranslation } from "react-i18next"
import { colors, commonStyles } from "../styles.ts"
import CommonInputText from "../components/CommonInputText.tsx"
import { MainButton } from "../components/MainButton.tsx"
import { pw_app_id, pw_endpoint } from "../config.json"
import { version } from "../../package.json"
import { ExecuteEvent } from "@circle-fin/w3s-pw-react-native-sdk/lib/typescript/src/types"
// @ts-ignore
export default function MainScreen({ navigation }: Props) {
  const { t } = useTranslation()
  const [endpoint, setEndpoint] = React.useState(pw_endpoint)
  const [appId, setAppId] = React.useState(pw_app_id)
  const [enableBiometricsPin, setEnableBiometricsPin] = React.useState(true)
  const [userToken, setUserToken] = React.useState("")
  const [encryptionKey, setEncryptionKey] = React.useState("")

  const [challengeId, setChallengeId] = React.useState("")
  React.useEffect(() => {
    DefaultCustomizer.setup()
    WalletSdk.addListener((event: ExecuteEvent) => {
      WalletSdk.moveRnTaskToFront()
      navigation.navigate("ForgotPin")
      console.log(event)
    })
    // Removes the listener once unmounted
    return () => {
      WalletSdk.removeAllListeners()
    }
  }, [])
  const _setBiometricsPin = async () => {
    try {
      await WalletSdk.init({
        endpoint,
        appId,
        settingsManagement: { enableBiometricsPin: enableBiometricsPin }
      })
    } catch (e) {
      // @ts-ignore
      toast(e.message)
      return
    }
    WalletSdk.setBiometricsPin(
      userToken,
      encryptionKey,
      successResult => {
        const { result } = successResult
        navigation.navigate("Result", {
          challengeId: challengeId,
          challengeType: result.resultType,
          resultStatus: result.status
        })
      },
      e => {
        navigation.navigate("Result", {
          errorCode: e.code,
          errorMessage: e.message
        })
        toast(e.message)
      }
    )
  }

  const _isSetBiometricsPinDisabled = () => {
    return (
      !enableBiometricsPin ||
      endpoint === "" ||
      appId === "" ||
      encryptionKey === "" ||
      userToken === ""
    )
  }
  const _isExecuteDisabled = () => {
    return (
      endpoint === "" ||
      appId === "" ||
      userToken === "" ||
      encryptionKey === "" ||
      challengeId === ""
    )
  }
  const _executeSdk = async () => {
    try {
      await WalletSdk.init({
        endpoint,
        appId,
        settingsManagement: { enableBiometricsPin: enableBiometricsPin }
      })
    } catch (e) {
      // @ts-ignore
      toast(e.message)
      return
    }
    WalletSdk.execute(
      userToken,
      encryptionKey,
      [challengeId],
      successResult => {
        const { result, warning } = successResult
        navigation.navigate("Result", {
          challengeId: challengeId,
          challengeType: result.resultType,
          resultStatus: result.status,
          signature: result.data?.signature,
          warningType: warning?.warningType,
          warningMessage: warning?.warningString
        })
      },
      e => {
        navigation.navigate("Result", {
          errorCode: e.code,
          errorMessage: e.message
        })
        toast(e.message)
      }
    )
  }
  return (
    <SafeAreaView
      style={Platform.OS === "ios" ? commonStyles.container : { flex: 1 }}>
      <View style={commonStyles.container}>
        <ScrollView>
          <Text style={commonStyles.heading}>{t("main_title")}</Text>
          <Text style={commonStyles.inputTitle}>{t("endpoint_title")}</Text>
          <CommonInputText
            accessibilityLabel={"endpointInput"}
            onChangeText={setEndpoint}
            value={endpoint}
          />
          <Text style={commonStyles.inputTitle}>{t("appid_title")}</Text>
          <CommonInputText
            accessibilityLabel={"appIdInput"}
            onChangeText={setAppId}
            value={appId}
          />
          <Text style={commonStyles.inputTitle}>{t("user_token_title")}</Text>
          <CommonInputText
            accessibilityLabel={"userTokenInput"}
            onChangeText={setUserToken}
            value={userToken}
          />
          <Text style={commonStyles.inputTitle}>{t("encryption_title")}</Text>
          <CommonInputText
            accessibilityLabel={"encryptionKeyInput"}
            onChangeText={setEncryptionKey}
            value={encryptionKey}
          />
          <View style={styles.rowItem}>
            <Text style={commonStyles.switchTitle}>
              {t("biometrics_title")}
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={enableBiometricsPin ? colors.primary : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setEnableBiometricsPin}
              value={enableBiometricsPin}
            />
          </View>
          <Text style={commonStyles.inputTitle}>{t("challenge_id_title")}</Text>
          <CommonInputText
            accessibilityLabel={"challengeIdInput"}
            onChangeText={setChallengeId}
            value={challengeId}
          />
        </ScrollView>
        <MainButton
          accessibilityLabel={"executeBt"}
          isDisabled={_isExecuteDisabled()}
          text={t("execute_bt")}
          onPress={() => {
            _executeSdk()
          }}
        />
        <MainButton
          accessibilityLabel={"setBiometricsPinBt"}
          isDisabled={_isSetBiometricsPinDisabled()}
          text={t("set_biometrics_pin_bt")}
          onPress={() => {
            _setBiometricsPin()
          }}
        />
        <Text style={styles.footText}>
          {`${t("version")}: ${version}\n${t("sdk_version")}: ${
            WalletSdk.sdkVersion.rn
          }+${WalletSdk.sdkVersion.native}`}
        </Text>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  box: {
    width: 60,
    height: 60,
    marginVertical: 20
  },
  rowItem: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 0
  },
  footText: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "bottom",
    color: colors.text_main,
    marginTop: 30,
    width: "100%"
  }
})
