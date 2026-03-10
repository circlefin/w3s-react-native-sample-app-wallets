/*
 * Copyright 2025 Circle Internet Group, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text } from 'react-native'
import { colors } from '../styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface SnackBarProps {
  visible: boolean;
  message: string;
  isSuccess?: boolean;
  duration?: number;
  onDismiss?: () => void;
}

export const SnackBar: React.FC<SnackBarProps> = ({
  visible,
  message,
  isSuccess = true,
  duration = 3000,
  onDismiss,
}) => {
  const opacity = useRef(new Animated.Value(0)).current
  const insets = useSafeAreaInsets()

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start(() => {
        if (onDismiss) {
          onDismiss()
        }
      })
    }
  }, [visible, duration, opacity, onDismiss])

  if (!visible) return null

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          opacity,
          bottom: insets.bottom 
        },
        isSuccess ? styles.successContainer : styles.errorContainer
      ]}
      accessibilityRole="alert"
    >
      <Text 
        style={[
          styles.message,
          isSuccess ? styles.successMessage : styles.errorMessage
        ]}
        accessibilityLiveRegion="assertive"
        accessible={true}
        accessibilityLabel={message}
      >
        {message}
      </Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  successContainer: {
    backgroundColor: colors.snackbar_success_bg,
  },
  errorContainer: {
    backgroundColor: colors.snackbar_error_bg,
  },
  message: {
    fontSize: 16,
  },
  successMessage: {
    color: 'white',
  },
  errorMessage: {
    color: colors.snackbar_error_text,
  },
})