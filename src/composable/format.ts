import type {BaseType} from '../comm/type'
/**
 * 根据传入的列，获取对应列的数据
 * @param cols 
 * @param data 
 * @returns 
 */
 export const useFormatData=(cols:string[],data:BaseType<any>[])=>{
    return data.map(item=>cols.map((key:string)=>item[key]))
  }