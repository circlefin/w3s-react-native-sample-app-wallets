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

import { default as i18next } from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      tab_social: "Social",
      tab_email: "Email",
      tab_pin: "PIN",
      login: "Login",
      register: "Register",
      email: "Email",
      password: "Password",
      pin: "PIN",
      confirm_pin: "Confirm PIN",
      submit: "Submit",
      back: "Back",
      social_login_title: "Social Login",
      email_login_title: "Email Login",
      pin_login_title: "PIN Login",
      sdk_version: "SDK Version",
      required_mark: "*",
      endpoint_title: "Endpoint",
      appid_title: "App ID",
      user_token_title: "User Token",
      encryption_title: "Encryption Key",
      challenge_id_title: "Challenge ID",
      execute_bt: "Execute",
      set_biometrics_pin_bt: "Set Biometrics PIN",
      biometrics_switch_title: "Enable Biometrics",
      biometrics_switch_desc: "Use biometrics for authentication",
      execute_success: "Execute Success",
      execute_screen_title: "Execute Screen",
      received_pin: "Received PIN",
      go_back: "Go Back",
      device_id_title: "Device ID",
      device_token_title: "Device Token",
      device_encryption_title: "Device Encryption Key",
      log_in_with_section: "Log in with",
      login_success: "Login Success",
      info_full_text: "Learn more about social login here",
      info_link_text: "here",
      go_execute_bt: "Go to Execute",
      go_execute_bt_desc: "Execute challenges with your user token",
      otp_token_title: "OTP Token",
      email_login_bt: "Email Login",
      main_title: "User Controlled Wallet \nSample App",
      main_subtitle: "Choose one Auth Method to start",
      implement_callback_instruction: "Callback received",
      google_bt: "Continue with Google",
      facebook_bt: "Continue with Facebook",
      apple_bt: "Continue with Apple",
    },
  },
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    console.log("i18next initialized successfully");
  })
  .catch((error) => {
    console.error("Error initializing i18next:", error);
  });

export const t = (key: string): string => {
  return i18next.t(key);
};

export default i18next;
