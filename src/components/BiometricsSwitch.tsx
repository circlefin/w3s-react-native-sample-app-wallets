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

import {Image, StyleSheet, Switch, Text, View} from "react-native"
import {colors} from "../styles"
import * as React from "react"
import {useTranslation} from "react-i18next"
import {SwitchProps} from "react-native/Libraries/Components/Switch/Switch"

export const BiometricsSwitchButton = (props: BiometricsSwitchProps) => {
    const { t } = useTranslation()
    return (
        <View
            style={
                [styles.normalBg, props.style]
            }>
            <Image source={require("../../assets/image/ic_biometrics.png")} style={{marginRight: 8, width: 48, height: 48}}/>

            <View style={{flexShrink: 1}}>
                <Text
                    style={styles.mainText}>
                    {t('biometrics_switch_title')}
                </Text>
                <Text
                    style={styles.subText}>
                    {t('biometrics_switch_desc')}
                </Text>
            </View>

            <Switch
                accessibilityLabel={props.accessibilityLabel}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={props.enableSwitch ? colors.primary : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={props.onValueChange}
                value={props.value}
            />
        </View>
    )
}

interface BiometricsSwitchProps extends SwitchProps {
    accessibilityLabel: string,
    enableSwitch: boolean,
}
const styles = StyleSheet.create({
    normalBg: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mainText: {
        fontFamily: "Inter-Medium",
        color: colors.social_login_text,
        fontWeight: "500",
        fontSize: 16,
    },
    subText: {
        fontFamily: "Inter-Medium",
        color: colors.tab_unfocused,
        fontWeight: "400",
        fontSize: 14,
    },
})
