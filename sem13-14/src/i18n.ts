import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "ru",
  resources: {
    ru: {
      translation: {
        unreadMessages_one: "У вас {{count}} непрочитанное сообщение ({{date}})",
        unreadMessages_few: "У вас {{count}} непрочитанных сообщения ({{date}})",
        unreadMessages_many: "У вас {{count}} непрочитанных сообщений ({{date}})",
      },
    },
  },
});

export default i18n;