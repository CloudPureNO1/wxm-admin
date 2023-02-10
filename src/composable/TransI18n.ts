import {firstLetter2lowercase} from './StringTransform'

/**
 * 在vue 的setup 中可以直接使用
 */
// import { useI18n } from 'vue-i18n'

// const i18n=useI18n()

/**
 * 外部ts 中使用方式
 */
import i18n from '../i18n'


const {t}=i18n.global

/**
 * i18n翻译,
 * html 中直接可以使用：$t(),js 中使用 t()
 * @param msg 
 * @param type 类型：为空或不传入， 1 后面添加 不能为空，2 前面添加请输入，3 前面添加请选择 
 * @returns 
 */
 export const transToLocale=(msg:string)=>{
    return toLocale(msg)
  }
  
  export const toLocale=(msg:string)=>{
    
    return t(msg)
  }
  /**
   * i18n翻译,
   * html 中直接可以使用：$t(),js 中使用 t()
   * @param msg 
   * @returns 
   */
   export const toLocaleNotEmpty=(msg:string)=>{
    return `${t(msg)} ${t('Common.cannotBeEmpty')}`
  }
  /**
   * i18n翻译,
   * html 中直接可以使用：$t(),js 中使用 t()
   * @param msg 
   * @returns 
   */
   export const toLocalePleaseEnter=(msg:string)=>{
    return `${t('Common.pleaseEnter')} ${firstLetter2lowercase(t(msg))}`
  }
  /**
   * i18n翻译,
   * html 中直接可以使用：$t(),js 中使用 t()
   * @param msg 
   * @returns 
   */
   export const toLocalePleaseSelect=(msg:string)=>{
    return `${t('Common.pleaseSelect')} ${firstLetter2lowercase(t(msg))}`
  }
 
  
  export const testFn=(fn:any,msg:string)=>{
    return `${fn('Common.pleaseEnter')} ${firstLetter2lowercase(fn(msg))}`
  }