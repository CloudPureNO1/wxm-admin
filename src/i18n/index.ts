import type { Locale } from '../comm/type'

import { createI18n } from 'vue-i18n'
import zhCn from './lang/zh-cn'
import en from './lang/en'


export const messages: Locale = {
  'zh-cn': zhCn,
  en,
}
export const setCurrentLocale = (language: string) => {
  sessionStorage.setItem('language', language)
  i18n.global.locale.value = language
}
export const getCurrentLanguage = () => {
  return sessionStorage.getItem('language') || navigator.language.toLowerCase()
}
export const getLanguage = () => {
  const language = getCurrentLanguage()
  // messages.hasOwnProperty(language) 不适用
  if (Object.prototype.hasOwnProperty.call(messages, language)) {
    return language
  }

  return 'en'
}

export const getLocale = () => {
  const language = getCurrentLanguage()
  // messages.hasOwnProperty(language) 不适用
  if (Object.prototype.hasOwnProperty.call(messages, language)) {
    return messages[language]
  }

  return messages['en']
}




// 创建 i18n
const i18n = createI18n({
  legacy: false,
  globalInjection: true, // 全局模式，可以直接使用 $t
  locale: getLanguage(),
  fallbackLocale: 'en', // 不存在默认则为英文
  allowComposition: true, // 允许组合式api
  messages: messages,
})

export default i18n
