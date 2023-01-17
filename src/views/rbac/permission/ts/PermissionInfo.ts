import {onMounted, ref} from 'vue'
import type { FormInstance } from 'element-plus'
import type { PermissionType, ResultType } from '../../../../comm/type'
import { wxmAlert } from '@/util/commFn'
import { isEmpty } from 'lodash'
import { usePostTo } from '../../../../composable/HttpApi'
// 必须放在vue文件中，
// import { ConditionButtonKey, PaginationKey ,RbacInfoKey,RbacInfoRowKey} from '../../../symbol/Symbol'

// 响应式变量
export const formDisabled=ref<boolean>(false)  //表单是否禁用
export const permissionFormRef=ref<FormInstance>() // 表单对象，必须与ref相同
export const permissionForm=ref<PermissionType>({})


// 方法

const doAdd=async(callBack:Function)=>{
    const params = {
        transCode: '52001',
        ...permissionForm.value
      }
    const {res,err}=await usePostTo(`/gateway/rbac/${params.transCode}`,params) as ResultType
    if(err){
        wxmAlert(err.message||err,'error')
        return false
    }
    if("0"!==res.code){
        wxmAlert(res.message,'error')
        return false
    }
    wxmAlert('新增成功')
    callBack()
}
const doEdit=async(callBack:Function)=>{
    const params = {
        transCode: '53001',
        ...permissionForm.value
      }
    const {res,err}=await usePostTo(`/gateway/rbac/${params.transCode}`,params) as ResultType
    if(err){
        wxmAlert(err.message||err,'error')
        return false
    }
    if("0"!==res.code){
        wxmAlert(res.message,'error')
        return false
    }
    wxmAlert('编辑成功')
    callBack()
}
export const handleSave= async (formEl: FormInstance | undefined,callBack:Function)=>{
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if(!valid){
            let msg:string='权限信息校验不通过'
            if(fields){
                msg+=Object.values(fields).map(item=>`【${item[0].message}】`).join(',')
            }
            wxmAlert(msg,'error')
            return 
        }

        if(isEmpty(permissionForm.value.permissionId)){
            doAdd(callBack)
        }else{
            doEdit(callBack)
        }
  
    })
}



 
export const handleReset = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

 
export const init=(row?:any,type?:any)=>{
    permissionForm.value={}
    onMounted(()=>{
        if(type){
            const data:PermissionType=row?row.value:{}
            Object.keys(data).forEach((key:string)=>{
                // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ permissionId?: string
                // 使用 as keyof PermissionType 解决
               permissionForm.value[key as keyof PermissionType] = data[key as keyof PermissionType]
            })
            formDisabled.value=type.value==='view'
        }
    })
    return {formDisabled,permissionForm,permissionFormRef}
}
                   
// 方法


