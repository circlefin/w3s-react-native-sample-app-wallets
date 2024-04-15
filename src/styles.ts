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

import { StyleSheet } from "react-native"

export const colors = {
  text_main: "#1A1A1A",
  text_auxiliary: "#3D3D3D",
  placeholder: "#A3A3A3",
  disabled_main_bt_text: "rgba(255,255,255,0.8)",
  disabled_main_bt_background: "#0073C380",
  main_bt_text: "#FFFFFFFF",
  primary: "#0073c3",
  primaryCursor: "rgba(0,115,195,0.5)",
  main_bt_text_pressed: "#FFFFFFFF",
  main_bt_background_pressed: "#1AA3FF",
  disabled_input_background: "#F5F5F5",
  input_boarder_focused: "#46B5FF",
  input_boarder: "#E8E8E8",
  background: "#FFFFFFFF"
}
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.background
  },
  mainButton: {
    marginTop: 24,
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 56,
    minHeight: 48,
    paddingVertical: 8,
    justifyContent: "center"
  },
  disabledMainButton: {
    backgroundColor: colors.disabled_main_bt_background
  },
  disabledMainButtonText: {
    color: colors.disabled_main_bt_text
  },
  mainButtonText: {
    fontFamily: "Inter-Medium",
    color: colors.main_bt_text,
    fontWeight: "500",
    fontSize: 16
  },
  inputTitle: {
    fontFamily: "Inter-Regular",
    color: colors.text_auxiliary,
    fontWeight: "400",
    fontSize: 14,
    marginTop: 12,
    marginBottom: 4
  },
  switchTitle: {
    fontFamily: "Inter-Regular",
    color: colors.text_main,
    fontWeight: "400",
    fontSize: 16,
    marginTop: 0
  },
  heading: {
    fontFamily: "Inter-Semi-Bold",
    color: colors.text_main,
    fontSize: 32,
    marginBottom: 8
  },
  normalInputField: {
    height: 56,
    marginTop: 4,
    borderWidth: 2,
    backgroundColor: colors.background,
    borderColor: colors.input_boarder,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontFamily: "Inter-Regular",
    color: colors.text_main,
    fontWeight: "400",
    fontSize: 16
  },
  normalValueText: {
    minHeight: 56,
    marginTop: 4,
    borderWidth: 2,
    backgroundColor: colors.background,
    borderColor: colors.input_boarder,
    borderRadius: 16,
    textAlignVertical: "center",
    fontFamily: "Inter-Regular",
    paddingHorizontal: 16,
    color: colors.text_main,
    fontWeight: "400",
    fontSize: 16
  },
  disabledInputField: {
    borderColor: colors.input_boarder,
    backgroundColor: colors.disabled_input_background
  },
  focusedInputField: {
    borderColor: colors.input_boarder_focused
  }
})
