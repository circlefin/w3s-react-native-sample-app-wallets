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

import {Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View} from "react-native"
import {colors} from "../styles"
import * as React from "react"
import {useTranslation} from "react-i18next"

export const GoExecuteButton = (props: GoExecuteButtonProps) => {
    const { t } = useTranslation()
    return (
        <TouchableOpacity
            accessibilityLabel={props.accessibilityLabel}
            activeOpacity={0.7}
            onPressOut={props.onPressOut}
            style={
                [styles.normalBg, props.style]
            }>
            <Image source={require("../../assets/image/ic_go_execute.png")} style={{marginRight: 12, width: 48, height: 48}}/>

            <View style={{flexShrink: 1}}>
                <Text
                    style={styles.mainText}>
                    {t('go_execute_bt')}
                </Text>
                <Text
                    style={styles.subText}>
                    {t('go_execute_bt_desc')}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

interface GoExecuteButtonProps extends TouchableOpacityProps {
    accessibilityLabel: string,
}
const styles = StyleSheet.create({
    normalBg: {
        backgroundColor: colors.background,
        padding: 16,
        borderWidth: 1,
        borderRadius: 16,
        borderColor: colors.input_boarder,
        marginTop: 16,
        flexDirection: 'row',
    },
    mainText: {
        fontFamily: "Inter-Medium",
        color: colors.tab_focused,
        fontWeight: "500",
        fontSize: 16,
    },
    subText: {
        fontFamily: "Inter-Medium",
        color: colors.bt_sub_text,
        fontWeight: "400",
        fontSize: 14,
    },
})
