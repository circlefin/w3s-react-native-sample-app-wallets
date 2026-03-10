# Migrating from SDK v1 to SDK v2

> Complete guide for upgrading from bare React Native + SDK v1 to Expo Modules + SDK v2

If you have an existing bare React Native project using SDK v1 and want to upgrade to SDK v2, this guide will help you through the migration process.

## Table of Contents

- [Understanding the Architecture Change](#understanding-the-architecture-change)
- [Migration Paths](#migration-paths)
  - [Path 1: Keep Bare React Native + Add Expo Modules (Recommended)](#path-1-keep-bare-react-native--add-expo-modules-recommended)
  - [Path 2: Migrate to Expo-Managed Workflow](#path-2-migrate-to-expo-managed-workflow)
- [API Changes](#api-changes)


---

### Understanding the Architecture Change

**SDK v1**: Traditional bare React Native architecture
- Package: `"@circle-fin/w3s-pw-react-native-sdk": "^1.0.0"`
- Architecture: Bare React Native
- Build: Manual native project setup

**SDK v2**: Expo Modules architecture
- Package: `"@circle-fin/w3s-pw-react-native-sdk": "^2.0.0"`
- Architecture: Expo Modules
- Build: Expo Prebuild

> [!IMPORTANT]
> SDK v2 requires Expo Modules support in your project. You must install Expo dependencies to enable Expo Modules.

For detailed instructions on installing Expo modules in existing React Native projects, see [Expo documentation](https://docs.expo.dev/bare/installing-expo-modules/).

### Migration Paths

Choose the migration path based on your project's native code customizations:

---

#### Path 1: Keep Bare React Native + Add Expo Modules (Recommended)

This approach preserves your existing native projects and adds Expo Modules support to them.

**Best for:**
- Projects with **custom native code** (native modules, custom configurations, etc.)
- Teams that want to **continue managing** `ios/` and `android/` directories manually
- Minimal changes to existing workflow

**How it works:**
- Uses `npx install-expo-modules@latest` to automatically configure native projects
- Keeps your existing `ios/` and `android/` directories
- Adds necessary Expo Modules configuration without removing customizations

**Steps:**

1. **Install Expo Modules in your project:**

```bash
npx install-expo-modules@latest
```

This automatically configures your native projects for Expo Modules support. For details, see [Expo automatic installation guide](https://docs.expo.dev/bare/installing-expo-modules/#automatic-installation).

> [!NOTE]
> If automatic installation fails due to conflicts, follow the [manual installation guide](https://docs.expo.dev/bare/installing-expo-modules/#manual-installation).

2. **Update SDK package to v2:**

```bash
npm install @circle-fin/w3s-pw-react-native-sdk@^2.0.0
```

3. **Update event listener API** - See [API Changes](#api-changes) section below

4. **Build and test:**

For iOS:
```bash
npm run ios
```

For Android:
```bash
npm run android
```

---

#### Path 2: Migrate to Expo-Managed Workflow

This approach converts your project to use Expo's managed workflow where `expo prebuild` generates and manages native code.

**Best for:**
- Projects with **minimal or no custom native code**
- Teams that want **Expo to manage** native configurations
- Simpler maintenance through declarative `app.json` configuration

**How it works:**
- Deletes and regenerates `ios/` and `android/` directories from `app.json`
- Native code is managed by Expo (don't edit directly)
- Run `expo prebuild` whenever you change native configuration
- Apply customizations through `app.json` config plugins

> [!WARNING]
> This will **delete your existing native directories**. Any custom native code will be lost. Back up your project before proceeding.

**Steps:**

1. **Update SDK package and add Expo dependencies:**

```bash
npm install @circle-fin/w3s-pw-react-native-sdk@^2.0.0 expo
```

Check this sample app's `package.json` for the recommended Expo version.

2. **Create or update `app.json` with Expo configuration:**

```json
{
  "expo": {
    "name": "YourAppName",
    "slug": "your-app-slug",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.your.app.bundle"
    },
    "android": {
      "package": "com.your.app.package"
    }
  }
}
```

3. **Generate native projects:**

```bash
npx expo prebuild --clean
```

The `--clean` flag will delete and regenerate the native directories.

4. **Update event listener API** - See [API Changes](#api-changes) section below

5. **Build and test:**

For iOS:
```bash
npx expo run:ios
```

For Android:
```bash
npx expo run:android
```

> [!TIP]
> With Expo-managed workflow, apply native customizations through `app.json` [config plugins](https://docs.expo.dev/config-plugins/introduction/) instead of editing native files directly. Any direct edits to `ios/` or `android/` will be lost when you run `expo prebuild` again.

---

### API Changes

**Event Listener API:**

**Add listener:**

SDK v1:
```typescript
WalletSdk.addListener((event) => {
  // Handle event
})
```

SDK v2:
```typescript
const eventListener = ProgrammablewalletRnSdk.addListener(
  'CirclePwOnEvent',
  (event) => {
    // Handle event
  }
)
```

**Remove listener:**

SDK v1:
```typescript
WalletSdk.removeAllListeners()
```

SDK v2:
```typescript
eventListener.remove()
```

