import * as XLSX from 'xlsx' // Vue3 版本
import type { ExcelExportType } from '../comm/type'
// https://www.pudn.com/news/62e7671f55398e076b0a35b6.html
// https://www.jianshu.com/p/b28f5cd4d55a
export const useExportExcel = (data:ExcelExportType) => {
    const xlsxParam:any = {
        raw: true //转换成excel时，使用原始的格式，这样导出的时候数字过长不会变成科学计数法
    }; 
    // 创建工作簿
    const workBook = XLSX.utils.book_new()

    // 创建工作表
    const workSheet = XLSX.utils.json_to_sheet(data.data,xlsxParam)

    // 向workSheet工作表中的A1位置添加数据的数组,来实现设置表头
    XLSX.utils.sheet_add_aoa(workSheet, [data.header], { origin: "A1" });

   
    // 改变A列的宽度为50，改变B列宽度为100
    // workSheet["!cols"] = [ { wch: 50 },{wch:100} ];
    workSheet["!cols"]=data.headerWidth.map(item=>{
        const obj={wch:item}
        return obj
    })
    
    // 将工作表附加到工作簿，并将工作表命名为 "数据"
    if(!data.sheetName){
        data.sheetName="数据"
    }
    XLSX.utils.book_append_sheet(workBook, workSheet, data.sheetName)

    
    // 生成文件并下载
    XLSX.writeFile(workBook, (data.fileName?data.fileName:'数据')+".xlsx")
}


/**
 * 导出excel 包含多个sheet
 * @param data 
 * @param fileName 
 */
export const useExportExcelMulti = (data: Array<ExcelExportType>, fileName: string) => {
    const xlsxParam:any = {
        raw: true //转换成excel时，使用原始的格式，这样导出的时候数字过长不会变成科学计数法
    }; 

    // 创建工作簿
    const workBook = XLSX.utils.book_new()

    data.forEach((item,index)=>{
        // 创建工作表
        const workSheet = XLSX.utils.json_to_sheet(item.data,xlsxParam)

        // 向workSheet工作表中的A1位置添加数据的数组,来实现设置表头
        XLSX.utils.sheet_add_aoa(workSheet, [item.header], { origin: "A1" });

        // 改变A列的宽度为50，改变B列宽度为100
        // workSheet["!cols"] = [ { wch: 50 },{wch:100} ];
        workSheet["!cols"] =item.headerWidth.map((width:number)=>{
            const obj={wch:width}
            return obj
        })
        
        // 将工作表附加到工作簿，并将工作表命名为 "数据"
        XLSX.utils.book_append_sheet(workBook, workSheet, item.sheetName?item.sheetName:`数据${index}`)
    })


 
    // 生成文件并下载
    XLSX.writeFile(workBook, fileName+".xlsx")
}