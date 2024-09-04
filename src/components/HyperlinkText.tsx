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

import { Linking, StyleSheet, Text} from "react-native"
import { colors } from "../styles.ts"
import React from "react"


export type HyperlinkTextProps = {
  fullText: string,
  linkText: string,
  url: string
}
export default function HyperlinkText({fullText, linkText, url}: HyperlinkTextProps) {

  const startIndex = linkText? fullText.indexOf(linkText): -1
  const getPlainArr = () => {
        switch (startIndex){
            case 0:
                return['', fullText.substring(linkText.length)]
            case -1:
                return[fullText,'']
            default:
                return[fullText.substring(0, startIndex), fullText.substring(startIndex + linkText.length)]
        }
  }
  const plainArr = getPlainArr()
    return (<Text
        style={[styles.desc]}>
        {plainArr[0]}
        {startIndex != -1 && <Text
            style={styles.hyperlink}
            onPressOut={() => {
                Linking.openURL(url)
            }}>
            {linkText}
        </Text>}
        {plainArr[1]}
    </Text>)
}
const styles = StyleSheet.create({
    desc: {
        fontFamily: "Inter-Regular",
        color: colors.info_desc,
        fontWeight: "400",
        fontSize: 14,
        marginTop: 24,
    },
    hyperlink: {
        fontFamily: "Inter-Semi-Bold",
        color: colors.primary,
        fontWeight: "400",
        fontSize: 14,
    },
})
