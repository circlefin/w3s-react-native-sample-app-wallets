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
import { WalletSdk } from "@circle-fin/w3s-pw-react-native-sdk"
import { MainButton } from "../components/MainButton"
import { useTranslation } from "react-i18next"
import { commonStyles } from "../styles"
import type { RouteProp } from "@react-navigation/native"
import type { RootStackParamList } from "../App"
import type { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types"

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Result">
type ProfileScreenNavigationProp = NativeStackNavigatorProps

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
}
// @ts-ignore
export default function ForgotPinScreen({ navigation }: Props) {
  const { t } = useTranslation()
  return (
    <SafeAreaView
      style={Platform.OS === "ios" ? commonStyles.container : { flex: 1 }}>
      <View style={[commonStyles.container, { justifyContent: "space-between" }]}>
        <Text
          accessibilityLabel={"forgotPinText"}
          style={[
            commonStyles.inputTitle,
            { textAlign: "center", marginTop: 30 }
          ]}>
          {t("forgot_pin")}
        </Text>
        <MainButton
          accessibilityLabel={"continueBt"}
          text={t("continue_bt")}
          onPress={() => {
            WalletSdk.moveTaskToFront()
            navigation.goBack()
          }}
          isDisabled={false} />
      </View>
    </SafeAreaView>
  )
}
