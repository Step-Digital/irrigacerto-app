import "dotenv/config";

export default {
  expo: {
    name: "IrrigaCerto",
    slug: "IrrigaCerto",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#00344A",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#00344A",
      },
      package: "com.manejoIrrigacerto.app",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "12aff356-ecf9-4200-b2b3-7e348aebaac1",
      },
    },
    runtimeVersion: {
      policy: "sdkVersion",
    },
    updates: {
      url: "https://u.expo.dev/36bbef1f-779d-411c-b658-86544c82db78",
    },
  },
};
