import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import enApp from '@/locales/en/app.json'
import enAuth from '@/locales/en/auth.json'
import enCommon from '@/locales/en/common.json'
import viApp from '@/locales/vi/app.json'
import viAuth from '@/locales/vi/auth.json'
import viCommon from '@/locales/vi/common.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon, auth: enAuth, app: enApp },
      vi: { common: viCommon, auth: viAuth, app: viApp },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'vi'],
    defaultNS: 'common',
    ns: ['common', 'auth', 'app'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  })

i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng
  }
})

if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language
}

export default i18n
