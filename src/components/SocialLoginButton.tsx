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

import {Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from "react-native"
import {colors} from "../styles"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {SocialProvider} from "@circle-fin/w3s-pw-react-native-sdk/src/types.ts"

export const SocialLoginButton = (props: SocialLoginButtonProps) => {
    const name = props.provider.toLowerCase()
    const { t } = useTranslation()
    let icon = require("../../assets/image/ic_google.png")
    switch (props.provider){
        case SocialProvider.Facebook:
            icon = require("../../assets/image/ic_facebook.png")
            break
        case SocialProvider.Apple:
            icon = require("../../assets/image/ic_apple.png")
            break
    }
  return (
    <TouchableOpacity
      disabled={props.disabled}
      accessibilityLabel={`${name}LoginBt`}
      activeOpacity={0.7}
      onPressOut={props.onPressOut}
      style={
        [props.disabled ? styles.disabledBg: styles.normalBg, props.style]
      }>
      <Image source={icon} style={{marginRight: 10}}/>
      <Text
        style={props.disabled ? styles.disabledText: styles.normalText}>
        {t(`${name}_bt`)}
      </Text>
    </TouchableOpacity>
  )
}

interface SocialLoginButtonProps extends TouchableOpacityProps {
  disabled: boolean,
  provider: SocialProvider
}
const styles = StyleSheet.create({
    normalBg: {
        backgroundColor: colors.background,
        minHeight: 40,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: colors.social_login_bt_boarder,
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    disabledBg: {
        backgroundColor: colors.social_login_bt_disabled,
        minHeight: 40,
        borderRadius: 6,
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    normalText: {
        fontFamily: "Inter-Medium",
        color: colors.social_login_text,
        fontWeight: "500",
        fontSize: 16,
    },
    disabledText: {
        fontFamily: "Inter-Medium",
        color: colors.social_login_text_disabled,
        fontWeight: "500",
        fontSize: 16,
    },
})
