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

import { Platform, SafeAreaView, Text, View } from "react-native"
import { commonStyles } from "../styles.ts"
import { useTranslation } from "react-i18next"
import { MainButton } from "../components/MainButton.tsx"
// @ts-ignore
export default function ResultScreen({ route, navigation }: Props) {
  const { t } = useTranslation()
  const {
    challengeId,
    challengeType,
    resultStatus,
    signature,
    warningType,
    warningMessage,
    errorCode,
    errorMessage
  } = route.params
  const getTitleComponent = (value: string, title: string) => {
    if (value == null) {
      return null
    }
    return <Text style={commonStyles.inputTitle}>{title}</Text>
  }
  const getValueComponent = (value: string, accessibilityLabel: string) => {
    if (value == null) {
      return null
    }
    return (
      <Text
        accessibilityLabel={accessibilityLabel}
        style={[
          commonStyles.normalValueText,
          Platform.OS === "ios" ? { lineHeight: 56 } : {}
        ]}>
        {value}
      </Text>
    )
  }
  return (
    <SafeAreaView
      style={Platform.OS === "ios" ? commonStyles.container : { flex: 1 }}>
      <View style={commonStyles.container}>
        {getTitleComponent(challengeId, t("challenge_id_title"))}
        {getValueComponent(challengeId, "challengeId")}
        {getTitleComponent(challengeType, t("challenge_type_title"))}
        {getValueComponent(challengeType, "resultType")}
        {getTitleComponent(resultStatus, t("result_status_title"))}
        {getValueComponent(resultStatus, "resultStatus")}
        {getTitleComponent(signature, t("signature_title"))}
        {getValueComponent(signature, "signature")}
        {getTitleComponent(warningType, t("warning_type_title"))}
        {getValueComponent(warningType, "warningType")}
        {getTitleComponent(warningMessage, t("warning_message_title"))}
        {getValueComponent(warningMessage, "warningMessage")}
        {getTitleComponent(errorCode, t("error_code_title"))}
        {getValueComponent(errorCode, "errorCode")}
        {getTitleComponent(errorMessage, t("error_message_title"))}
        {getValueComponent(errorMessage, "errorMessage")}

        <MainButton
          accessibilityLabel={"continueBt"}
          text={t("continue_bt")}
          onPress={() => {
            navigation.goBack()
          }}
          isDisabled={false}
        />
      </View>
    </SafeAreaView>
  )
}
