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
import { MainButton } from "./MainButton";
import { useTranslation } from "react-i18next";
import { commonStyles } from "../styles";
import CommonInputText from "./CommonInputText";
import useWalletSdk from "../utils/useWalletSdk";
import { ShowSnackBarFn } from "../utils/useSnackBar";
import RequiredMarkText from "./RequiredMarkText";
import { BiometricsSwitchButton } from "./BiometricsSwitch";

interface PinTabProps {
  showSnackBar: ShowSnackBarFn;
}

export const PinTab: React.FC<PinTabProps> = ({ showSnackBar }) => {
  const { t } = useTranslation();
  const {
    endpoint,
    appId,
    enableBiometricsPin,
    dispatchEndpoint,
    dispatchAppId,
    dispatchEnableBiometrics,
    execute,
    setBiometricsPin,
  } = useWalletSdk(showSnackBar);
  const [userToken, setUserToken] = React.useState("");
  const [encryptionKey, setEncryptionKey] = React.useState("");
  const [challengeId, setChallengeId] = React.useState("");

  const isSetBiometricsPinDisabled = () => {
    return (
      !enableBiometricsPin ||
      !endpoint ||
      !appId ||
      !encryptionKey ||
      !userToken
    );
  };

  const isExecuteDisabled = () => {
    return !endpoint || !appId || !userToken || !encryptionKey || !challengeId;
  };

  const successCallback = (result: any) => {
    showSnackBar(t("execute_success"), true);
    console.log(JSON.stringify(result));
  };

  const errorCallback = (e: any) => {
    const message = e?.message || "Unknown error";
    showSnackBar(message, false);
  };

  return (
    <View style={commonStyles.containerWithPadding}>
      <RequiredMarkText text={t("endpoint_title")} style={{ marginTop: 12 }} />
      <CommonInputText
        accessibilityLabel={"endpointInput"}
        onChangeText={(value) => {
          dispatchEndpoint(value);
        }}
        value={endpoint}
      />
      <RequiredMarkText text={t("appid_title")} />
      <CommonInputText
        accessibilityLabel={"appIdInput"}
        onChangeText={(value) => {
          dispatchAppId(value);
        }}
        value={appId}
      />
      <RequiredMarkText text={t("user_token_title")} />
      <CommonInputText
        accessibilityLabel={"userTokenInput"}
        onChangeText={setUserToken}
        value={userToken}
      />
      <RequiredMarkText text={t("encryption_title")} />
      <CommonInputText
        accessibilityLabel={"encryptionKeyInput"}
        onChangeText={setEncryptionKey}
        value={encryptionKey}
      />
      <Text style={commonStyles.inputTitle}>{t("challenge_id_title")}</Text>
      <CommonInputText
        accessibilityLabel={"challengeIdInput"}
        onChangeText={setChallengeId}
        value={challengeId}
      />
      <BiometricsSwitchButton
        accessibilityLabel={"biometricsSwitch"}
        enableSwitch={enableBiometricsPin}
        onValueChange={(value) => {
          dispatchEnableBiometrics(value);
        }}
        value={enableBiometricsPin}
      />
      <MainButton
        accessibilityLabel={"executeBt"}
        disabled={isExecuteDisabled()}
        isSecondary={false}
        text={t("execute_bt")}
        onPress={() => {
          execute(
            userToken,
            encryptionKey,
            challengeId,
            successCallback,
            errorCallback,
          );
        }}
      />
      <MainButton
        isSecondary={true}
        accessibilityLabel={"setBiometricsPinBt"}
        disabled={isSetBiometricsPinDisabled()}
        text={t("set_biometrics_pin_bt")}
        onPress={() => {
          setBiometricsPin(
            userToken,
            encryptionKey,
            successCallback,
            errorCallback,
          );
        }}
      />
    </View>
  );
};
