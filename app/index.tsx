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

import * as React from "react"
import { StyleSheet, Text, View, Keyboard } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTranslation } from "react-i18next"
import { colors, commonStyles } from "../styles"
import { useEffect, useState } from "react"
import { DefaultCustomizer } from "../customize/DefaultCustomizer"
import { useSnackBar } from "../utils/useSnackBar"
import { MaterialTabBar, MaterialTabBarProps, Tabs } from 'react-native-collapsible-tab-view'
import ProgrammablewalletRnSdk, { WalletSdk } from "@circle-fin/w3s-pw-react-native-sdk"
import { SnackBar } from "../components/SnackBar"
import { useRouter } from "expo-router"
import { PinTab } from "../components/PinTab"
import { EmailTab } from "../components/EmailTab"
import { SocialTab } from "../components/SocialTab"

const TAB_BAR_HEIGHT = 48

export default function IndexScreen() {
  const { t } = useTranslation()
  const { visible, message, isSuccess, showSnackBar, hideSnackBar } = useSnackBar()
  const router = useRouter()
  
  // Initialize headerHeight state with the default value, will be updated dynamically
  const [headerHeight, setHeaderHeight] = useState(TAB_BAR_HEIGHT)

  useEffect(() => {
    DefaultCustomizer.setup()
    try {
      const eventListener = ProgrammablewalletRnSdk.addListener(
        'CirclePwOnEvent',
        (event) => {
          console.log(event)
          // Bring application to foreground
          WalletSdk.moveRnTaskToFront()
          // Dismiss keyboard to prevent it from blocking the snackbar
          Keyboard.dismiss()
          // Format event content for display
          const eventMessage = `CirclePwOnEvent: ${JSON.stringify(event)}`
          showSnackBar(eventMessage, true)
        }
      )
      
      // Cleanup function
      return () => {
        // Remove the specific listener
        eventListener.remove()
      }
    } catch (error) {
      console.log("Error setting up SDK listeners:", error)
    }
  }, [showSnackBar, t])

  const header = () => {
    return (
      <View 
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
        onLayout={(event) => {
          // Dynamically measure the height of the header content
          const { height } = event.nativeEvent.layout;
          setHeaderHeight(height);
        }}
      >
        <Text style={commonStyles.heading}>{t("main_title")}</Text>
        <Text style={commonStyles.desc}>{t("main_subtitle")}</Text>
      </View>
    )
  }

  const tabBar = (props: MaterialTabBarProps<string>) => (
    <MaterialTabBar
      {...props}
      activeColor={colors.tab_focused}
      inactiveColor={colors.tab_unfocused}
      getLabelText={(name: string) => name}
      labelStyle={commonStyles.tabText}
      indicatorStyle={{ backgroundColor: colors.tab_focused }}
    />
  )

  const tabView = () => {
    return (
      <Tabs.Container
        headerContainerStyle={styles.tab}
        renderHeader={header}
        renderTabBar={tabBar}
        headerHeight={headerHeight}
        initialTabName={t('tab_pin')}
      >
        <Tabs.Tab name={t('tab_social')}>
          <Tabs.ScrollView>
          <SocialTab showSnackBar={showSnackBar} />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name={t('tab_email')}>
          <Tabs.ScrollView>
          <EmailTab showSnackBar={showSnackBar}/>
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name={t('tab_pin')}>
          <Tabs.ScrollView>
          <PinTab showSnackBar={showSnackBar} />
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
    )
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      {tabView()}
      <SnackBar
        visible={visible}
        message={message}
        isSuccess={isSuccess}
        onDismiss={hideSnackBar}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  tab: {
    elevation: 0,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderColor: colors.tab_underline
  },
  indicator: { backgroundColor: colors.tab_focused },
})