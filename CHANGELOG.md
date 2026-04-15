# Changelog

> This changelog keeps track of all updates and improvements made to `W3sSampleWallet`.

## v2.1.1 - _(2026-04-14)_

### 🚀 What's New

- Dependency and security-related upgrades, including **@xmldom/xmldom**, **yaml**, **ajv** (addressing reported advisories).

## v2.1.0 - _(2026-04-13)_

### 🚀 What's New

- Bumped `@circle-fin/w3s-pw-react-native-sdk` to **v2.2.1** [(npm)](https://www.npmjs.com/package/@circle-fin/w3s-pw-react-native-sdk); bumped app metadata to **2.1.0**.
- Updated README for **iOS/Android** requirements aligned with SDK **2.2.1** (including **Android SDK Platform 36** where applicable).
- Fixed **iOS tab switching** when using `react-native-collapsible-tab-view` v8 with React Native **0.81**.
- Added **AGENTS.md** with local verification steps for contributors and agents.
- CI: **ESLint**, **Prettier**, and **TypeScript** (`tsc --noEmit`) on pull requests; **AI PR** optional review workflow; internal **quality-checks** wired for **Cloudsmith** auth during `npm ci`.
- Dependency and security-related upgrades, including **tar**, **minimatch**, **picomatch**, **undici**, **node-forge**, **flatted**, and **brace-expansion** (addressing reported advisories).

## v2.0.0 - _(2026-03-10)_

### 🚀 What's New

- Migrated from **bare React Native** to **Expo 54**
- Upgraded `@circle-fin/w3s-pw-react-native-sdk` from v1 to v2
- Updated README with configuration details
- Added MIGRATION_GUIDE

## v1.1.6 - _(2026-03-06)_

### 🚀 What's New

- Bumped `@circle-fin/w3s-pw-react-native-sdk` to v1.1.7 [(npm)](https://www.npmjs.com/package/@circle-fin/w3s-pw-react-native-sdk)
- Upgraded dependencies and improved SDK integration.

## v1.1.2 - _(2025-03-19)_

### 🚀 What's New

- Upgrade React Native version from _0.73.6_ to _0.75.5_.
- Recommended upgrade to `w3s-react-native-sdk` v1.1.2 [(npm)](https://www.npmjs.com/package/@circle-fin/w3s-pw-react-native-sdk)
- Upgraded dependencies and improved SDK integration.

## v1.0.1 - _(2024-09-04)_

### 🚀 Initial Release

- First official release of `W3sSampleWallet`.
- Example project included to demonstrate SDK integration.
- Integrated with `w3s-react-native-sdk` v1.1.1 [(npm)](https://www.npmjs.com/package/@circle-fin/w3s-pw-react-native-sdk).
- Basic wallet connectivity and transaction support.
- Support for **React Native old and new architecture**.
- Initial **Android and iOS native dependencies setup**.
- Authentication via **GitHub Personal Access Token (PAT)** for package installation.
