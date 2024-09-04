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

import {Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import React, {useEffect, useState} from "react"
import {colors} from "../styles.ts"
export type SnackBarProps = {
  message: string,
  isSuccess:  boolean,
  duration: number
  onDismissSnackbar: (() => void) | undefined
}
enum SnackBarState {
  gone,
  fadeInPlaying,
  fadeoutPlaying,
  visible
}
export default function SnackBar({message, isSuccess, duration = 3000, onDismissSnackbar = undefined}: SnackBarProps) {
  const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout|null>(null)
  const [visibleState, setVisibleState] = useState<SnackBarState>(SnackBarState.gone)
  const fadeAnim = useState<Animated.Value>(new Animated.Value(0))[0]
  useEffect(() => {
    showSnackbar()
  }, [])

  const showSnackbar = () => {
    setVisibleState(SnackBarState.fadeInPlaying)
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisibleState(SnackBarState.visible)
      setTimeOutId(setTimeout(() => {
        hideSnackbar()
      }, duration))
    })
  }
  const hideSnackbar = () => {
    setVisibleState(SnackBarState.fadeoutPlaying)
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisibleState(SnackBarState.gone)
      setTimeOutId(null)
      onDismissSnackbar?.()
    })
  }
  const hideSnackbarImmediately = () => {
    const onStop = ()=>{
      setVisibleState(SnackBarState.gone)
      fadeAnim.setValue(0)
      onDismissSnackbar?.()
    }
    switch (visibleState){
      case SnackBarState.fadeInPlaying:
        fadeAnim.stopAnimation(onStop)
        break
      case SnackBarState.fadeoutPlaying:
        break
      case SnackBarState.visible:
        if(timeOutId){
          clearTimeout(timeOutId)
        }
        onStop()
        break
      case SnackBarState.gone:
        break
    }
  }
  let bg = styles.errorBg
  let textStyle = styles.errorText
  let icon = require('../../assets/image/ic_snackbar_error.png')
  let closeIcon = require('../../assets/image/ic_snackbar_error_close.png')
  if(isSuccess){
    bg = styles.successBg
    // @ts-ignore
    textStyle = styles.successText
    icon = require("../../assets/image/ic_snackbar_success.png")
    closeIcon = require("../../assets/image/ic_snackbar_success_close.png")

  }
  return visibleState != SnackBarState.gone ? (
      <Animated.View
          style={[
            styles.snackbarContainer,
            styles.bottom,
            { opacity: fadeAnim }
          ]}>
        <View style={[styles.container, bg]}>
          <Image source={icon}/>
          <Text style={[styles.messageText, textStyle]}>{message}</Text>
          <TouchableOpacity onPress={hideSnackbarImmediately} style={{marginLeft: 12}}>
            <Image source={closeIcon}/>
          </TouchableOpacity>
        </View>
      </Animated.View>
  ) : null
}
const styles = StyleSheet.create({
  snackbarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  bottom: {
    bottom: 24,
  },
  successBg: {
    backgroundColor: colors.snackbar_success_bg,
    borderRadius: 8,
    borderWidth: 0,
    borderColor: colors.snackbar_success_bg,
    elevation: 10,
  },
  errorBg: {
    backgroundColor:  colors.snackbar_error_bg,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.snackbar_error_text
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
    flexShrink: 1,
    maxWidth: Dimensions.get('screen').width - 32,
  },
  messageText: {
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    fontSize: 16,
    flexShrink: 1,
    marginLeft: 8,
    alignSelf: 'center',
  },
  successText: {
    color:  colors.background,
    fontFamily: "Inter-Semi-Bold",
    fontWeight: "700",
    fontSize: 14,
  },
  errorText: {
    color:  colors.snackbar_error_text,
    fontFamily: 'Inter-Regular',
    fontWeight: "400",
    fontSize: 14,
  },
})
