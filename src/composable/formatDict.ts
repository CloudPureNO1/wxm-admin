import { useRbacStore } from "../store/rbac"
import type{BaseType, DictType} from '../comm/type'
const rbacStore=useRbacStore()

/**
 * 
 * @param row 行数据
 * @param key 行中的property   ==>对应字典：property+Dicts
 * @returns 
 */
export const useFormatRbacDict = (row: BaseType<any>,key:string) => {
    const state:any=rbacStore.$state  
    const dictList:Array<DictType>=state[`${key}Dicts`] 
    if(!dictList||dictList.length===0) return row[key]
    const rs:Array<DictType> =dictList.filter(item =>item.dictValue === row[key])
    return rs.length === 0 ? row[key] : rs[0].dictLabel
}