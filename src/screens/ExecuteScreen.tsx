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
import {SafeAreaView, Text, View, ScrollView, Image, TouchableOpacity, StyleSheet} from "react-native"
import {colors, commonStyles} from "../styles.ts"
import {useTranslation} from "react-i18next"
import {MainButton} from "../components/MainButton.tsx"
import {AuthMode} from "./TabScreen.tsx"
import {useSelector} from "react-redux"
import {
    selectEmailEncryptionKey,
    selectEmailUserToken,
    selectSocialEncryptionKey,
    selectSocialUserToken
} from "../features/result/resultSlice.ts"
import CommonInputText from "../components/CommonInputText.tsx"
import useWalletSdk from "../utils/useWalletSdk.ts"
import useSnackBar from "../utils/useSnackBar.tsx"
import type {RootStackParamList} from "../App"
import type {NativeStackScreenProps} from "@react-navigation/native-stack"
import CopyableText from "../components/CopyableText.tsx"
import RequiredMarkText from "../components/RequiredMarkText.tsx"

type Props = NativeStackScreenProps<RootStackParamList, 'Execute'>
export default function ExecuteScreen({ route, navigation }: Props) {
  const { t } = useTranslation()
  const [challengeId, setChallengeId] = React.useState("")
  const { renderSnackBar, showSnackBar } = useSnackBar()
    const { execute } = useWalletSdk(showSnackBar)
  const {
      authMode
  } = route.params

    const initByAuthMode = () => {
        switch (authMode){
            case AuthMode.social:
                return {
                    userToken: useSelector(selectSocialUserToken),
                    encryptionKey: useSelector(selectSocialEncryptionKey)
                }
            case AuthMode.email:
                return {
                    userToken: useSelector(selectEmailUserToken),
                    encryptionKey: useSelector(selectEmailEncryptionKey)
                }
            default:
                return {
                    userToken: null,
                    encryptionKey: null
                }
        }
    }
  const {userToken, encryptionKey} = initByAuthMode()
  const ValueComponent = (value: string|undefined|null, accessibilityLabel: string) => {
    if (value) {
        return (
            <Text
                accessibilityLabel={accessibilityLabel}
                style={[
                    commonStyles.normalValueText
                ]}>
                {value}
            </Text>
        )
    }
      return null
  }
  return (
    <SafeAreaView
      style={commonStyles.container}>
        <TouchableOpacity
            accessibilityLabel={'executeScreenCloseBt'}
            style={{marginLeft: 4, marginTop: 8}}
            onPressOut={() => {
                navigation.goBack()
            }}>
            <Image source={require('../../assets/image/ic_close.png')}/>
        </TouchableOpacity>
        <ScrollView>
            <View style={[commonStyles.containerWithPadding, {justifyContent: 'flex-start'}]}>
                <Text style={styles.title}>{t('go_execute_bt')}</Text>
                <Text style={commonStyles.inputTitle}>{t("encryption_title")}</Text>
                {ValueComponent(encryptionKey, `executeEncryptionKey`)}
                <Text style={commonStyles.inputTitle}>{t("user_token_title")}</Text>
                <CopyableText accessibilityLabel={'executeUserToken'} value={userToken}/>

                <RequiredMarkText text={t('challenge_id_title')}/>
                <CommonInputText
                    accessibilityLabel={"challengeIdInput"}
                    onChangeText={setChallengeId}
                    value={challengeId}
                />
                <MainButton
                  accessibilityLabel={`executeExecuteBt`}
                  text={t("execute_bt")}
                  isSecondary={false}
                  onPressOut={() => {
                      if(userToken && encryptionKey ) {
                          execute(userToken, encryptionKey, challengeId, result => {
                              showSnackBar(t('execute_success'), true)
                              console.log(JSON.stringify(result))
                          }, e => {
                              showSnackBar(e.message, false)
                          })
                      }
                  }}
                  disabled={challengeId.length === 0}
                />
              {renderSnackBar()}
          </View>
          </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: "Inter-Semi-Bold",
        color: colors.execute_challenge_screen_title,
        fontWeight: "700",
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 8
    },
})
