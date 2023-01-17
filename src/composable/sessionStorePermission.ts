import{usePostTo} from './HttpApi'
import type {ResultType} from '../comm/type'
import { wxmAlert } from '../util/commFn';


export const useInitSetPermission=async()=>{
    const{res,err} = await usePostTo('/gateway/rbac/51004',{transCode:'51004'}) as ResultType;
    if(err){
      // throw new Error(err||res.message)
      wxmAlert(err.message||err,'error')
      // return false
      return { name: 'Login' }
    }
    if(res.code!=='0'){
      wxmAlert(res.message,'error')
      // return false
      return { name: 'Login' }
    }
    sessionStorage.setItem('permission',JSON.stringify(res.data.list))
}

export const useResetPermission=async ()=>{
    const{res,err} = await usePostTo('/gateway/rbac/51004',{transCode:'51004'}) as ResultType;
    if(err){
      wxmAlert(err.message||err,'error')
    } else if(res.code!=='0'){
      wxmAlert(res.message,'error')
    }else{
        sessionStorage.setItem('permission',JSON.stringify(res.data.list))
    }
}