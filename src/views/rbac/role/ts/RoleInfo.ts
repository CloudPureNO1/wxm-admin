import {ref,onMounted} from 'vue'
import type {FormInstance} from 'element-plus'
import type { RoleType ,ResultType} from '../../../../comm/type'
import { wxmAlert } from '@/util/commFn'
import { isEmpty } from 'lodash'
import { usePostTo } from '../../../../composable/HttpApi'




 
// 系统默认的角色编码，不能修改
const permanentRoleCodes:Array<string>=['R-SUPER-ADMIN', 'R-ADMIN', 'R-MANAGER', 'R-BIZ', 'R-ORDINARY'] 
 

export const init=(type:any,row?:any)=>{
    // 响应式变量
    const formDisabled=ref<boolean>(false)  //表单是否禁用
    const disabledRoleCode=ref<boolean>(false)  //表单是否禁用
    const roleForm=ref<RoleType>({})
    const roleFormRef=ref<RoleType>() // 表单对象，必须与ref相同
    // methods start
    const handleSave= async(formEl:FormInstance|undefined,callBack:Function)=>{
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
    
            if(isEmpty(roleForm.value.roleId)){
                doAdd(callBack)
            }else{
                doEdit(callBack)
            }
      
        })
    }
     
    
    const doAdd=async(callBack:Function)=>{
        const params = {
            transCode: '32001',
            ...roleForm.value
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
            transCode: '33001',
            ...roleForm.value
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
    // methods end





    // life cycle method
    onMounted(()=>{
        formDisabled.value=type.value==='view'
 
        const data:RoleType=row?row.value:{}
  
            disabledRoleCode.value=permanentRoleCodes.includes(row.value.roleCode)
            Object.keys(data).forEach((key:string)=>{
                // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ permissionId?: string
                // 使用 as keyof PermissionType 解决
               roleForm.value[key as keyof RoleType] = data[key as keyof RoleType]
            })
       

    })
    return {formDisabled,disabledRoleCode,roleForm,roleFormRef,handleSave}
}