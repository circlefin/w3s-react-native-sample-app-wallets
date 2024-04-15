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
import MainScreen from "./screens/MainScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ForgotPinScreen from "./screens/ForgotPinScreen"
import ResultScreen from "./screens/ResultScreen"
import "./locales/index"

export type RootStackParamList = {
  Main: undefined;
  ForgotPin: undefined;
  Result: {
    challengeId: string,
    challengeType: string,
    resultStatus: string,
    signature: string,
    warningType: string,
    warningMessage: string,
    errorCode: string,
    errorMessage: string,
  }
}
const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="ForgotPin" component={ForgotPinScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
