import { onMounted, ref ,inject, computed} from 'vue'
import type { FormInstance } from 'element-plus'
import type { ApiType ,ApiResultType} from '../../../../comm/type'
import { wxmAlert } from '../../../../util/commFn'
import { isEmpty } from 'lodash'
import { usePostApi } from '../../../../composable/ApiBaseCall'
import {RbacInfoKey,RbacInfoRowKey} from '../../../../symbol/Symbol'
import { useLayoutStore } from '../../../../store/layout'
import { useRbacStore } from '../../../../store/rbac'
 


export const init = () => {

    const {search,visible}=inject(RbacInfoKey)// 父界面注入方法
    const {row,type}=inject(RbacInfoRowKey) as any

    const layoutStore=useLayoutStore()
    const rbacStore=useRbacStore()
    const store=computed(()=>{
        return {
            size:layoutStore.size,
            apiStatus:rbacStore.apiStatusDicts
        }
    })


    // 响应式变量
    const formDisabled = ref<boolean>(false)  //表单是否禁用
    const apiFormRef = ref<FormInstance>() // 表单对象，必须与ref相同
    const apiForm = ref<ApiType>({})

    // methods start
    const callBack=()=>{
        visible()
        search()
    }
    const doAdd = async () => {
        const params = {
            transCode: '72001',
            ...apiForm.value
        }
        const { code } = await usePostApi(`/gateway/rbac/${params.transCode}`, params) as ApiResultType
        if(code!=='0') return
        wxmAlert('新增成功')
        callBack()
    }
    const doEdit = async () => {
        const params = {
            transCode: '73001',
            ...apiForm.value
        }
        const { code } = await usePostApi(`/gateway/rbac/${params.transCode}`, params) as ApiResultType
        if(code!=='0') return
  
        wxmAlert('编辑成功')
        callBack()
    }
    const handleSave = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (!valid) {
                let msg: string = '接口信息校验不通过'
                if (fields) {
                    msg += Object.values(fields).map(item => `【${item[0].message}】`).join(',')
                }
                wxmAlert(msg, 'error')
                return
            }
    
            if (isEmpty(apiForm.value.apiId)) {
                doAdd()
            } else {
                doEdit()
            }
    
        })
    }

    // methods end

    // life cycle method
    onMounted(() => {
        formDisabled.value = type.value === 'view'

        const data: ApiType = row ? row.value : {}
 
        Object.keys(data).forEach((key: string) => {
            // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ permissionId?: string
            // 使用 as keyof PermissionType 解决
            apiForm.value[key as keyof ApiType] = data[key as keyof ApiType]
        })


    })
    return {store, formDisabled, apiForm, apiFormRef,handleSave}
}

// 方法


