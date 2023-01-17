import { ref,onMounted, computed ,inject} from "vue"
import { isEmpty } from "lodash"
import type { FormInstance } from "element-plus"
import type { GroupType ,ApiResultType} from "../../../../comm/type"
import { useLayoutStore } from "../../../..//store/layout"
import { useRbacStore } from "../../../..//store/rbac"
import {RbacInfoKey,RbacInfoRowKey} from '../../../../symbol/Symbol'
import { wxmAlert } from '../../../../util/commFn'
import { usePostApi } from "../../../../composable/ApiBaseCall"

export const init=()=>{
    // data start
    const layoutStore=useLayoutStore()
    const rbacStore=useRbacStore()
    const size=computed(()=>{
        return layoutStore.size
    })
    const dicts = computed(() => {
        return { 'groupTypeDicts': rbacStore.groupTypeDicts, 'groupStatusDicts': rbacStore.groupStatusDicts }
    })
    const fromDisabled=ref<boolean>(false)
    const groupForm=ref<GroupType>({})
    const groupFormRef=ref<FormInstance>()
    // data end

    const {search,visible}=inject(RbacInfoKey)// 父界面注入方法
    const {row,type}=inject(RbacInfoRowKey) as any
    const callBack=()=>{
        visible(false)
        search()
    }

    // methods start

    const doAdd = async () => {
        const params = {
            transCode: '22001',
            ...groupForm.value
        }
        const { code } = await usePostApi(`/gateway/rbac/${params.transCode}`, params) as ApiResultType
 
        if ("0" !== code) return 
        wxmAlert('新增成功')
        callBack()
    }
    const doEdit = async () => {
        const params = {
            transCode: '23001',
            ...groupForm.value
        }
        const { code } = await usePostApi(`/gateway/rbac/${params.transCode}`, params) as ApiResultType
 
        if ("0" !== code) return 
        wxmAlert('编辑成功')
        callBack()
    }

    const handleSave=async (formEl: FormInstance | undefined)=>{
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (!valid) {
                let msg: string = '用户组信息校验不通过'
                if (fields) {
                    msg += Object.values(fields).map(item => `【${item[0].message}】`).join(',')
                }
                wxmAlert(msg, 'error')
                return
            }
    
            if (isEmpty(groupForm.value.groupId)) {
                doAdd()
            } else {
                doEdit()
            }
    
        })
    }

    // methods end

    onMounted(()=>{
        fromDisabled.value = type.value === 'view'

        const data: GroupType = row ? row.value : {}

  
        Object.keys(data).forEach((key: string) => {
            // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ permissionId?: string
            // 使用 as keyof PermissionType 解决
            groupForm.value[key as keyof GroupType] = data[key as keyof GroupType]
        })

    })

    return {size,dicts,groupForm,groupFormRef,fromDisabled,handleSave}
}