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

import * as React from "react";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { commonStyles } from "../styles";
import CommonInputText from "./CommonInputText";
import CopyableText from "./CopyableText";
import { WalletSdk, SocialProvider } from "@circle-fin/w3s-pw-react-native-sdk";
import useWalletSdk from "../utils/useWalletSdk";
import { AuthMode } from "../redux/types";
import { ShowSnackBarFn } from "../utils/useSnackBar";
import RequiredMarkText from "./RequiredMarkText";
import { SocialLoginButton } from "./SocialLoginButton";
import HyperlinkText from "./HyperlinkText";
import { GoExecuteButton } from "./GoExecuteButton";
import { useRouter } from "expo-router";
import { useAppSelector } from "@redux/hooks";
import {
  selectSocialUserToken,
  selectSocialEncryptionKey,
} from "../features/result/resultSlice";

interface SocialTabProps {
  showSnackBar: ShowSnackBarFn;
}

export const SocialTab: React.FC<SocialTabProps> = ({ showSnackBar }) => {
  const DOC_URL =
    "https://developers.circle.com/w3s/docs/authentication-methods#create-a-wallet-with-social-logins";
  const router = useRouter();
  const { t } = useTranslation();
  const { appId: reduxAppId } = useAppSelector((state) => state.settings);
  const socialUserToken = useAppSelector(selectSocialUserToken);
  const socialEncryptionKey = useAppSelector(selectSocialEncryptionKey);

  const { appId, dispatchAppId, logoutAndLogin, dispatchLoginResult } =
    useWalletSdk(showSnackBar);

  const [deviceToken, setDeviceToken] = React.useState("");
  const [deviceEncryptionKey, setDeviceEncryptionKey] = React.useState("");

  const LoginButton = (provider: SocialProvider) => {
    return (
      <SocialLoginButton
        disabled={deviceToken.length === 0 || deviceEncryptionKey.length === 0}
        provider={provider}
        onPress={() => {
          logoutAndLogin(
            provider,
            deviceToken,
            deviceEncryptionKey,
            (loginResult) => {
              dispatchLoginResult(AuthMode.social, loginResult);
              showSnackBar(t("login_success"), true);
              console.log("login_success");
            },
            (e) => {
              console.log("login_failed:" + (e?.message || "Unknown error"));
              showSnackBar(e?.message || "Unknown error", false);
            },
          );
        }}
      />
    );
  };

  const SectionText = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 24,
          marginBottom: 12,
        }}
      >
        <View style={commonStyles.sectionLine} />
        <Text style={commonStyles.sectionText}>{t("log_in_with_section")}</Text>
        <View style={commonStyles.sectionLine} />
      </View>
    );
  };

  return (
    <View style={commonStyles.containerWithPadding}>
      <Text style={[commonStyles.inputTitle, { marginTop: 12 }]}>
        {t("device_id_title")}
      </Text>
      <CopyableText
        accessibilityLabel={"deviceId"}
        value={WalletSdk.deviceId}
      />

      <RequiredMarkText text={t("appid_title")} />
      <CommonInputText
        accessibilityLabel={"appIdInput"}
        onChangeText={(value) => {
          dispatchAppId(value);
        }}
        value={appId || reduxAppId}
      />

      <RequiredMarkText text={t("device_token_title")} />
      <CommonInputText
        accessibilityLabel={"deviceTokenInput"}
        onChangeText={setDeviceToken}
        value={deviceToken}
      />

      <RequiredMarkText text={t("device_encryption_title")} />
      <CommonInputText
        accessibilityLabel={"deviceEncryptionKeyInput"}
        onChangeText={setDeviceEncryptionKey}
        value={deviceEncryptionKey}
      />

      {SectionText()}
      {LoginButton(SocialProvider.Google)}
      {LoginButton(SocialProvider.Facebook)}
      {LoginButton(SocialProvider.Apple)}

      {socialUserToken != null && socialEncryptionKey != null && (
        <GoExecuteButton
          accessibilityLabel={"socialGoExecuteBt"}
          onPress={() => {
            router.push({
              pathname: "/ExecuteScreen",
              params: {
                authMode: AuthMode.social,
                userToken: socialUserToken,
                encryptionKey: socialEncryptionKey,
              },
            });
          }}
        />
      )}

      <HyperlinkText
        fullText={t("info_full_text")}
        linkText={t("info_link_text")}
        url={DOC_URL}
      />
    </View>
  );
};
