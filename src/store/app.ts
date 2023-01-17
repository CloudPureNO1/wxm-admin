import { defineStore } from "pinia";
// import i18n,{setCurrentLocale} from '../i18n'
import {setCurrentLocale} from '../i18n'
 
export const useAppStore = defineStore("appStore", {
  state: () => ({
    // locale:'en' // 国际化默认为zh-cn 中文
    locale:sessionStorage.getItem('language')||'en' // 国际化默认为zh-cn 中文
  }),
  getters:{
  
  },
  actions:{
    changeLocale(language:string){
      this.locale=language?language:'zh-cn'
      /* sessionStorage.setItem('locale',this.locale)
      i18n.global.locale.value=locale */
      setCurrentLocale(language)
    }
  }
});
