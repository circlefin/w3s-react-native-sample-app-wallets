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
  text_desc: "#8E8E93",
  placeholder: "#A3A3A3",
  disabled_secondary_bt_text: "#3273c3",
  disabled_main_bt_text: "rgba(255,255,255,0.8)",
  disabled_main_bt_background: "#0073C380",
  disabled_secondary_bt_background: "#F1F9FE",
  main_bt_text: "#FFFFFFFF",
  primary: "#0073c3",
  primaryCursor: "rgba(0,115,195,0.5)",
  main_bt_text_pressed: "#FFFFFFFF",
  main_bt_background_pressed: "#1AA3FF",
  disabled_input_background: "#F5F5F5",
  input_boarder_focused: "#46B5FF",
  input_boarder: "#E8E8E8",
  social_login_bt_boarder: "#CAC4D0",
  social_login_bt_disabled: "#1D1B201F",
  social_login_text: "#000000",
  social_login_text_disabled: "#938F99",
  background: "#FFFFFFFF",
  tab_focused: "#29233B",
  tab_unfocused: "#8A849C",
  section_text: "#8A849C",
  section_line: "#1118271A",
  tab_underline: "#1118271A",
  required_red: "#F55538",
  info_desc: "#4E4763",
  info_link: "#4E4763",
  bt_sub_text: "#6B6580",
  execute_challenge_screen_title: "#1D1B20",
  snackbar_success_bg: "#008339",
  snackbar_error_bg: "#FFEAEF",
  snackbar_error_text: "#BC0016",
}
export const pagePaddingH = 16
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  containerWithPadding: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: pagePaddingH,
    paddingBottom: 24,
  },
  mainButton: {
    marginTop: 24,
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 56,
    minHeight: 56,
    paddingVertical: 8,
    justifyContent: "center"
  },
  secondaryButton: {
    marginTop: 24,
    alignItems: "center",
    backgroundColor: colors.background,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 56,
    minHeight: 56,
    paddingVertical: 8,
    justifyContent: "center"
  },
  disabledMainButton: {
    backgroundColor: colors.disabled_main_bt_background
  },
  disabledSecondaryButton: {
    backgroundColor: colors.disabled_secondary_bt_background,
    opacity: 0.5
  },
  disabledMainButtonText: {
    color: colors.disabled_main_bt_text
  },
  disabledSecondaryButtonText: {
    color: colors.disabled_secondary_bt_text
  },
  mainButtonText: {
    fontFamily: "Inter-Medium",
    color: colors.main_bt_text,
    fontWeight: "500",
    fontSize: 16
  },
  secondaryButtonText: {
    fontFamily: "Inter-Medium",
    color: colors.primary,
    fontWeight: "500",
    fontSize: 16
  },
  sectionLine: {
    height: 1,
    backgroundColor: colors.section_line,
    flexShrink: 1,
    alignSelf: 'center',
    flex: 1
  },
  sectionText: {
    fontFamily: "Inter-Regular",
    color: colors.section_text,
    textAlign: 'center',
    fontWeight: "400",
    fontSize: 14,
    marginHorizontal: 16,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  inputTitle: {
    fontFamily: "Inter-Regular",
    color: colors.text_auxiliary,
    fontWeight: "400",
    fontSize: 14,
    marginTop: 12,
    marginBottom: 4,
    flexShrink: 1,
  },
  switchTitle: {
    fontFamily: "Inter-Regular",
    color: colors.text_main,
    fontWeight: "400",
    fontSize: 16,
    marginTop: 0
  },
  tabText: {
    fontFamily: "Inter-Semi-Bold",
    color: colors.tab_focused,
    fontSize: 14,
  },
  heading: {
    fontFamily: "Inter-Semi-Bold",
    color: colors.text_main,
    fontSize: 22,
    marginTop: 24,
    textAlign: 'center',
    paddingHorizontal: pagePaddingH
  },
  desc: {
    fontFamily: "Inter-Regular",
    color: colors.text_desc,
    fontSize: 14,
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
    paddingHorizontal: pagePaddingH
  },
  normalInputField: {
    marginTop: 8,
    borderWidth: 1,
    backgroundColor: colors.background,
    borderColor: colors.input_boarder,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontFamily: "Inter-Regular",
    color: colors.text_main,
    fontWeight: "400",
    fontSize: 16
  },
  normalValueText: {
    fontFamily: "Inter-Regular",
    color: colors.text_main,
    fontWeight: "400",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 4,
    minHeight: 24,
    flexShrink: 1
  },
  disabledInputField: {
    borderColor: colors.input_boarder,
    backgroundColor: colors.disabled_input_background
  },
  focusedInputField: {
    borderColor: colors.input_boarder_focused
  },
  requiredMark: {
    fontFamily: "Inter-Regular",
    color: colors.required_red,
    borderColor: 'red',
    fontWeight: "400",
    fontSize: 12,
    marginLeft: 4,
    flexWrap: 'wrap'
  },
})
