import 'dotenv/config';

export default  {
    name: "rate-repository-app",
    slug: "rate-repository-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
        "image": "./assets/splash.png",
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
    },
    assetBundlePatterns: [
        "**/*"
    ],
    ios: {
        "supportsTablet": true
    },
    android: {
        "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
        }
    },
    web: {
        "favicon": "./assets/favicon.png",
        "output": "single",
        "bundler": "metro",
        "baseUrl": "/rate-repository-app",
        "build": {
            "sourceMap": true
        }
    },
    extra: {
        uri: process.env.APOLLO_URI,
    },
}
