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
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, commonStyles } from "../styles";
import { useTranslation } from "react-i18next";
import { MainButton } from "../components/MainButton";
import { AuthMode } from "../redux/types";
import CommonInputText from "../components/CommonInputText";
import useWalletSdk from "../utils/useWalletSdk";
import { useSnackBar } from "../utils/useSnackBar";
import CopyableText from "../components/CopyableText";
import RequiredMarkText from "../components/RequiredMarkText";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SnackBar } from "../components/SnackBar";
import { useSelector } from "react-redux";
import {
  selectEmailEncryptionKey,
  selectEmailUserToken,
  selectSocialEncryptionKey,
  selectSocialUserToken,
} from "../features/result/resultSlice";

export default function ExecuteScreen() {
  const { t } = useTranslation();
  const [challengeId, setChallengeId] = React.useState("");
  const { visible, message, isSuccess, showSnackBar, hideSnackBar } =
    useSnackBar();
  const { execute } = useWalletSdk(showSnackBar);
  const router = useRouter();
  const params = useLocalSearchParams();

  // Get authMode from route parameters
  const authMode = (params.authMode as AuthMode) || AuthMode.social;

  // Use Redux selectors to get tokens and keys
  const socialUserToken = useSelector(selectSocialUserToken);
  const socialEncryptionKey = useSelector(selectSocialEncryptionKey);
  const emailUserToken = useSelector(selectEmailUserToken);
  const emailEncryptionKey = useSelector(selectEmailEncryptionKey);

  // Determine which token and key to use based on authMode
  const userToken =
    authMode === AuthMode.social ? socialUserToken : emailUserToken;
  const encryptionKey =
    authMode === AuthMode.social ? socialEncryptionKey : emailEncryptionKey;

  // Component to display values
  const ValueComponent = (
    value: string | undefined | null,
    accessibilityLabel: string,
  ) => {
    if (value) {
      return (
        <Text
          accessibilityLabel={accessibilityLabel}
          style={[commonStyles.normalValueText]}
        >
          {value}
        </Text>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <TouchableOpacity
        accessibilityLabel={"executeScreenCloseBt"}
        style={{ marginLeft: 4, marginTop: 8 }}
        onPress={() => {
          router.back();
        }}
      >
        <Image source={require("../assets/image/ic_close.png")} />
      </TouchableOpacity>
      <ScrollView>
        <View
          style={[
            commonStyles.containerWithPadding,
            { justifyContent: "flex-start" },
          ]}
        >
          <Text style={styles.title}>{t("go_execute_bt")}</Text>

          <Text style={commonStyles.inputTitle}>{t("encryption_title")}</Text>
          {ValueComponent(encryptionKey, `executeEncryptionKey`)}

          <Text style={commonStyles.inputTitle}>{t("user_token_title")}</Text>
          <CopyableText
            accessibilityLabel={"executeUserToken"}
            value={userToken}
          />

          <RequiredMarkText text={t("challenge_id_title")} />
          <CommonInputText
            accessibilityLabel={"challengeIdInput"}
            onChangeText={setChallengeId}
            value={challengeId}
          />

          <MainButton
            accessibilityLabel={`executeExecuteBt`}
            text={t("execute_bt")}
            isSecondary={false}
            onPress={() => {
              if (userToken && encryptionKey) {
                execute(
                  userToken,
                  encryptionKey,
                  challengeId,
                  (result) => {
                    showSnackBar(t("execute_success"), true);
                    if (__DEV__) {
                      console.log(JSON.stringify(result));
                    }
                  },
                  (e) => {
                    showSnackBar(e?.message || "Unknown error", false);
                  },
                );
              }
            }}
            disabled={challengeId.length === 0 || !userToken || !encryptionKey}
          />
        </View>
      </ScrollView>
      <SnackBar
        visible={visible}
        message={message}
        isSuccess={isSuccess}
        onDismiss={hideSnackBar}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.execute_challenge_screen_title,
    fontWeight: "700",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 8,
  },
});
