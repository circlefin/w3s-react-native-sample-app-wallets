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

import {Text, View} from "react-native"
import { commonStyles } from "../styles.ts"
import React from "react"
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet"
import {TextStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes"
import {useTranslation} from "react-i18next"
export type RequiredMarkTextProps = {
  text: string,
  style?: StyleProp<TextStyle> | undefined
  markStyle?: StyleProp<TextStyle> | undefined
}
export default function RequiredMarkText(props: RequiredMarkTextProps) {
  const { t } = useTranslation()
  return (
      <View style={[{flexDirection: 'row', alignItems: 'center', flexShrink: 1, justifyContent: 'flex-start'}, props.style, {
         }]}>
        <Text style={[commonStyles.inputTitle]}>
          {props.text}
        </Text>
        <Text style={[commonStyles.requiredMark, props.markStyle]}>
          {t('required_mark')}
        </Text>
      </View>
  )
}
