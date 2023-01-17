import { isEmpty } from "lodash"

/**
 * 首字母转小写
 * @param str 
 * @returns 
 */
export const firstLetter2lowercase=(str:string)=>{
    if(isEmpty(str)) return str
    return str.slice(0,1).toLocaleLowerCase()+str.slice(1)
}

 
/**
 * 下划线转换成驼峰
 * @param str 
 * @returns 
 */
export const  useLineToCamel=(str:string)=>{
    return str.replace(/_(\w)/g, (_, letter)=>{
        return letter.toUpperCase();
    });
}
// toHump('hello_js_go') //helloJsGo
 
/**
 * 驼峰转换下划线
 * @param str 
 * @returns 
 */
export const  useCamelToLine=(str:string)=> {
  return str.replace(/([A-Z])/g,"_$1").toLowerCase();
}
// toLine('aBcdEfg') //a_bcd_efg
 