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

import {
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from "react-native"
import {useTranslation} from "react-i18next"
import {colors, commonStyles} from "../styles"
import {useEffect} from "react"
import SocialTab from "../components/SocialTab.tsx"
import EmailTab from "../components/EmailTab.tsx"
import PinTab from "../components/PinTab.tsx"
import type {RootStackParamList} from "../App"
import type {NativeStackScreenProps} from "@react-navigation/native-stack"
import {DefaultCustomizer} from "../customize/DefaultCustomizer.ts"
import useSnackBar from "../utils/useSnackBar.tsx"
import {MaterialTabBar, MaterialTabBarProps, Tabs} from 'react-native-collapsible-tab-view'
import {WalletSdk, ExecuteEvent} from "../utils/useWalletSdk.ts"

type Props = NativeStackScreenProps<RootStackParamList, 'Tab'>
const TAB_BAR_HEIGHT = 48
export enum AuthMode {
    social = 'social',
    email = 'email',
    pin = 'pin',
}
export default function TabScreen({ navigation }: Props) {
    const { t } = useTranslation()
    const { renderSnackBar, showSnackBar } = useSnackBar()

    useEffect(() => {
        DefaultCustomizer.setup()
        const { rn, native} = WalletSdk.sdkVersion
        console.log(`PW SDK version: ${rn}, ${native}`)
        WalletSdk.addListener((event: ExecuteEvent) => {
            WalletSdk.moveRnTaskToFront()
            showSnackBar(t('implement_callback_instruction'), false)
            console.log(event)
        })
        // Removes the listener once unmounted
        return () => {
            WalletSdk.removeAllListeners()
        }
    }, [])
    const header = () => {
        return <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
        }} >
            <Text style={commonStyles.heading}>{t("main_title")}</Text>
            <Text style={commonStyles.desc}>{t("main_subtitle")}</Text>
        </View>
    }

    const tabBar = (props: MaterialTabBarProps<string>) => (
        <MaterialTabBar
            {...props}
            activeColor={colors.tab_focused}
            inactiveColor={colors.tab_unfocused}
            getLabelText={name => name}
            labelStyle={commonStyles.tabText}
            indicatorStyle={{ backgroundColor: colors.tab_focused }}/>
    )
    const tabView = () => {
        return (
            <Tabs.Container
                headerContainerStyle={styles.tab}
                renderHeader={header}
                renderTabBar={tabBar}
                headerHeight={TAB_BAR_HEIGHT} // optional
            >
                <Tabs.Tab name={t('tab_social')}>
                    <Tabs.ScrollView>
                        <SocialTab navigation={navigation} showSnackBar={showSnackBar} />
                    </Tabs.ScrollView>
                </Tabs.Tab>
                <Tabs.Tab name={t('tab_email')}>
                    <Tabs.ScrollView>
                        <EmailTab navigation={navigation} showSnackBar={showSnackBar}/>
                    </Tabs.ScrollView>
                </Tabs.Tab>
                <Tabs.Tab name={t('tab_pin')}>
                    <Tabs.ScrollView>
                        <PinTab navigation={navigation} showSnackBar={showSnackBar}/>
                    </Tabs.ScrollView>
                </Tabs.Tab>
            </Tabs.Container>
        )
    }
    return (
        <SafeAreaView
            style={commonStyles.container}>
            {tabView()}
            {renderSnackBar()}
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
    indicator: {backgroundColor: colors.tab_focused},
})
