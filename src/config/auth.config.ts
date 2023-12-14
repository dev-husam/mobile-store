import {
    GoogleSignin,
} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
console.log({
    ios: Config.IOS_CLIENT_ID,
    androidClientId: Config.ANDROID_CLIENT_ID,
    webClientId: Config.WEB_CLIENT_ID
})
GoogleSignin.configure({
    offlineAccess: false,
    scopes: ["profile", "email"],
    iosClientId: Config.IOS_CLIENT_ID,
    webClientId: "899706158244-qrv9stfvk9bqods0gc0bp6eiuvq4bpfg.apps.googleusercontent.com"
});


export { GoogleSignin }