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
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import "./locales/index"
import TabScreen from "./screens/TabScreen"
import {store} from './app/store'
import { Provider } from 'react-redux'
import ExecuteScreen from "./screens/ExecuteScreen.tsx"

export type RootStackParamList = {
  Main: object;
  Tab: object;
  Execute: {
    authMode: string
  }
}
const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Tab"
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="Tab" component={TabScreen} />
          <Stack.Screen name="Execute" component={ExecuteScreen} options={{
            presentation: 'modal',
            animationTypeForReplace: 'push',
            animation:'slide_from_bottom'
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
