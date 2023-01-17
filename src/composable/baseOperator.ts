import type { FormInstance } from 'element-plus'

import {useHtml2Img} from './html2canvasOp'

import type {BaseType,ExcelExportType } from '../comm/type'
import {useStrBytesLen} from './stringBytesLength'
import {useFormatData} from './format'
 
 
export const usePrint = (elementId:string,targetId:string) => {
  const element:any=document.getElementById(elementId)
  const target:any=document.getElementById(targetId)
  useHtml2Img(element,target)
}


/**
 * 表单重置
 * @param formEl 
 * @returns 
 */
export const useReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

 
/**
 * 构建导出需要的数据
 * @param colList 
 * @param data 
 * @param fileName 
 * @param sheetName 
 * @returns 
 */
export const useBuildExportData=(colList:Array<BaseType<any>>,data:Array<BaseType<any>>,fileName:string,sheetName:string):ExcelExportType=>{
  // 导出的数据
  // const exportCols=['userId','username','userType','userRate']


  const exportCols:string []=[]
  const header:Array<string>=[]
  const headerWidth:Array<number>=[]
  colList.filter(item=>item.prop&&'ops'!==item.prop).forEach(item=>{
    exportCols.push(item.prop)
    header.push(item.label)
    headerWidth.push(useStrBytesLen(item.label)*3)
  })
  
  const exportData:ExcelExportType={
    header:header,
    data:useFormatData(exportCols,data),
    headerWidth:headerWidth,
    fileName:fileName,
    sheetName:sheetName
  }
  return exportData
}


 
