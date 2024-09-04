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

import type { TouchableOpacityProps } from "react-native"
import { Text, TouchableOpacity } from "react-native"
import { commonStyles } from "../styles"
import * as React from "react"

export const MainButton = (props: MainButtonProps) => {
    let normalBg = commonStyles.mainButton
    let disabledBg = commonStyles.disabledMainButton
    let normalText = commonStyles.mainButtonText
    let disabledText = commonStyles.disabledMainButtonText
    if (props.isSecondary){
        normalBg = commonStyles.secondaryButton
        disabledBg = commonStyles.disabledSecondaryButton
        normalText = commonStyles.secondaryButtonText
        disabledText = commonStyles.disabledSecondaryButtonText
    }
    return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      style={[
        normalBg,
        props.disabled && disabledBg
      ]}>
      <Text
        style={[
          normalText,
          props.disabled && disabledText
        ]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  )
}

interface MainButtonProps extends TouchableOpacityProps {
  disabled: boolean,
  text: string,
  isSecondary: boolean
}
