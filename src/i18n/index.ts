import i18n from "i18next";
import { I18nManager } from "react-native";
import { initReactI18next } from "react-i18next";
import RNRestart from "react-native-restart";
import en from './locales/en.json';
import ar from './locales/ar.json';
const AVAILABLE_LANGUAGES = { en, ar };


export default i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: AVAILABLE_LANGUAGES,
        lng: I18nManager.isRTL ? "ar" : 'en',

    });



export const ChangeLangugae = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar").then(() => {
        I18nManager.forceRTL(i18n.language === "ar");
        RNRestart.Restart();
    });
};



