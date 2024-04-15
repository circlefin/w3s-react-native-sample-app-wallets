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

import {
  DateFormat,
  ErrorCode,
  IconTextConfig,
  IconTextsKey,
  ImageKey,
  InputType,
  SecurityQuestion,
  TextConfig,
  TextKey,
  TextsKey,
  WalletSdk
} from "@circlefin/w3s-pw-react-native-sdk"
import { colors } from "../styles.ts"

export const DefaultCustomizer = {
  setup() {
    _setSecurityQuestions()
    _setDismissOnCallbackMap()
    _setTextConfigsMap()
    _setIconTextConfigsMap()
    _setTextConfigMap()
    _setErrorStringMap()
    _setImageMap()
    _setDateFormat()
    _setDebugging()
    _setCustomUserAgent()
  }
}

const _setSecurityQuestions = () => {
  WalletSdk.setSecurityQuestions([
    new SecurityQuestion("What was your childhood nickname?", InputType.text),
    new SecurityQuestion("What is your father’s middle name?", InputType.text),
    new SecurityQuestion("When is your birthday?", InputType.datePicker),
    new SecurityQuestion(
      "When is your father's birthday?",
      InputType.datePicker
    ),
    new SecurityQuestion("When is your favorite date?", InputType.datePicker),
    new SecurityQuestion("What is the name of your first pet?"),
    new SecurityQuestion("What is the name of the first street you lived on?"),
    new SecurityQuestion("What is your favorite song?"),
    new SecurityQuestion("What is your favorite color?"),
    new SecurityQuestion("What is your favorite country?")
  ])
}
const _setDismissOnCallbackMap = () => {
  const map = new Map()
  map.set(ErrorCode.unknown, true)
  map.set(ErrorCode.userCanceled, true)
  map.set(ErrorCode.networkError, true)
  map.set(ErrorCode.biometricsKeyPermanentlyInvalidated, true)
  map.set(ErrorCode.biometricsUserSkip, true)
  map.set(ErrorCode.biometricsUserDisableForPin, true)
  map.set(ErrorCode.biometricsUserLockout, true)
  map.set(ErrorCode.biometricsUserLockoutPermanent, true)
  map.set(ErrorCode.biometricsUserNotAllowPermission, true)
  map.set(ErrorCode.biometricsInternalError, true)
  WalletSdk.setDismissOnCallbackMap(map)
}
const _setTextConfigsMap = () => {
  const map = new Map()
  map.set(TextsKey.securityQuestionHeaders, [
    new TextConfig("Choose your 1st question"),
    new TextConfig("Choose your 2nd question")
  ])
  map.set(TextsKey.securitySummaryQuestionHeaders, [
    new TextConfig("1st Question"),
    new TextConfig("2nd Question")
  ])
  map.set(TextsKey.enterPinCodeHeadline, [
    new TextConfig("ENTER your "),
    new TextConfig("PIN", undefined, colors.primary)
  ])
  map.set(TextsKey.securityIntroHeadline, [
    new TextConfig("Set up your "),
    new TextConfig("Recovery Method", undefined, colors.primary)
  ])
  map.set(TextsKey.newPinCodeHeadline, [
    new TextConfig("ENTER your "),
    new TextConfig("PIN", undefined, colors.primary)
  ])
  map.set(TextsKey.securityIntroLink, [
    new TextConfig("Learn more"),
    new TextConfig("https://path/terms-policies/privacy-notice/")
  ])
  map.set(TextsKey.recoverPinCodeHeadline, [
    new TextConfig("Recover your "),
    new TextConfig("PIN", undefined, colors.primary)
  ])
  WalletSdk.setTextConfigsMap(map)
}

const _setIconTextConfigsMap = () => {
  const map = new Map()
  map.set(IconTextsKey.securityConfirmationItems, [
    new IconTextConfig(
      require("../../assets/image/ic_intro_item0_icon.png"),
      new TextConfig("This is the only way to recover my account access. ")
    ),
    new IconTextConfig(
      require("../../assets/image/ic_intro_item1_icon.png"),
      new TextConfig(
        "Circle won’t store my answers so it’s my responsibility to remember them."
      )
    ),
    new IconTextConfig(
      require("../../assets/image/ic_intro_item2_icon.png"),
      new TextConfig(
        "I will lose access to my wallet and my digital assets if I forget my answers. "
      )
    )
  ])
  WalletSdk.setIconTextConfigsMap(map)
}
const _setTextConfigMap = () => {
  const map = new Map()
  // @ts-ignore
  map.set(
    TextKey.circlepw_recover_pincode_answer_input_placeholder,
    new TextConfig(
      "Type your answer here",
      undefined,
      colors.placeholder,
      "Inter-Regular"
    )
  )
  WalletSdk.setTextConfigMap(map)
}
const _setErrorStringMap = () => {
  const map = new Map()
  map.set(ErrorCode.incorrectUserPin, "The PIN you entered is incorrect.")
  map.set(
    ErrorCode.insecurePinCode,
    "Your PIN can’t have repeating or consecutive numbers."
  )
  WalletSdk.setErrorStringMap(map)
}
const _setImageMap = () => {
  const imageMap = new Map()
  imageMap.set(ImageKey.naviBack, require("../../assets/image/ic_back.png"))
  imageMap.set(ImageKey.naviClose, require("../../assets/image/ic_close.png"))
  imageMap.set(ImageKey.showPin, require("../../assets/image/ic_show_pin.png"))
  imageMap.set(ImageKey.hidePin, require("../../assets/image/ic_hide_pin.png"))
  imageMap.set(
    ImageKey.alertWindowIcon,
    require("../../assets/image/ic_alert_window_icon.png")
  )
  imageMap.set(
    ImageKey.securityIntroMain,
    require("../../assets/image/ic_intro_main_icon.png")
  )
  imageMap.set(
    ImageKey.selectCheckMark,
    require("../../assets/image/ic_select_checkmark.png")
  )
  imageMap.set(
    ImageKey.dropdownArrow,
    require("../../assets/image/ic_dropdown_arrow.png")
  )
  imageMap.set(
    ImageKey.errorInfo,
    require("../../assets/image/ic_error_info.png")
  )
  imageMap.set(
    ImageKey.securityConfirmMain,
    require("../../assets/image/ic_security_confirm_main.png")
  )
  imageMap.set(
    ImageKey.biometricsAllowMain,
    require("../../assets/image/ic_biometrics_allow_main.png")
  )
  WalletSdk.setImageMap(imageMap)
}

const _setDateFormat = () => {
  WalletSdk.setDateFormat(DateFormat.YYYYMMDD_HYPHEN)
}
const _setDebugging = () => {
  WalletSdk.setDebugging(true)
}
const _setCustomUserAgent = () => {
  WalletSdk.setCustomUserAgent("Circle-Programmable-Wallet-RN-Sample")
}
