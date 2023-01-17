 
import type {BaseType,ResultType,ApiResultType,PagingQueryResultsType} from '../comm/type'
 
import { usePostTo} from './HttpApi'
import { wxmAlert } from "../util/commFn"
 

 /**
  * 分页查询列表
  * @param url 请求地址
  * @param params 请求参数
  * @returns Promise<PagingQueryResultsType>
  */
  export const usePostApi= async (url:string,params:BaseType<any>,config?:any):Promise<ApiResultType>=>{
    const { res, err } = await usePostTo(url, params,config) as ResultType
    const apiResult:ApiResultType={
      code:res.code,
      data:null
    }
    if (err || res.code !== '0') {
      console.error(err, res)
      const message = err ? (err.message || err) : res.message
      wxmAlert(message, "error")
    }else{
        apiResult.data=res.data
    }
    return apiResult
  }
  

 
 /**
  * 分页查询列表
  * @param url 请求地址
  * @param params 请求参数
  * @returns Promise<PagingQueryResultsType>
  */
export const useSearchPage= async (url:string,params:BaseType<any>):Promise<PagingQueryResultsType>=>{
  const { res, err } = await usePostTo(url, params) as ResultType
  const pagingQueryResults:PagingQueryResultsType={
    code:res.code,
    recordList:[],
    recordCount:0
  }
  if (err) {
    console.error(err)
    wxmAlert(err||err.message, "error")
  }else if(res.code!=='0'){
    console.error(res.message,res.detailMsg)
    wxmAlert(res.message,'error')
  }else{
    pagingQueryResults.recordList=res.data.list
    pagingQueryResults.recordCount=res.data.total
  }
  return pagingQueryResults
}
