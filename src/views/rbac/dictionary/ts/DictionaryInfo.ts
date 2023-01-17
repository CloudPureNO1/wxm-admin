import { onMounted, ref ,inject, computed} from 'vue'
import type { FormInstance } from 'element-plus'
import type { DictType ,ApiResultType} from '../../../../comm/type'
import { wxmAlert } from '../../../../util/commFn'
import { isEmpty } from 'lodash'
import { usePostApi } from '../../../../composable/ApiBaseCall'
import {RbacInfoKey,RbacInfoRowKey} from '../../../../symbol/Symbol'
import { useLayoutStore } from '../../../../store/layout'
 


export const init = () => {

    const {search,visible}=inject(RbacInfoKey)// 父界面注入方法
    const {row,type}=inject(RbacInfoRowKey) as any

    const layoutStore=useLayoutStore()
    const store=computed(()=>{
        return {
            size:layoutStore.size,
            dictStatus: [
                { dictLabel: '无效', dictValue: '0' },
                { dictLabel: '有效', dictValue: '1' }
            ]
        }
    })


    // 响应式变量
    const formDisabled = ref<boolean>(false)  //表单是否禁用
    const dictionaryFormRef = ref<FormInstance>() // 表单对象，必须与ref相同
    const dictionaryForm = ref<DictType>({})

    // methods start
    const callBack=()=>{
        visible(false)
        search()
    }
    const doAdd = async () => {
        const params = {
            transCode: '62001',
            ...dictionaryForm.value
        }
        const { code } = await usePostApi(`/gateway/rbac/${params.transCode}`, params) as ApiResultType
        if(code!=='0') return
        wxmAlert('新增成功')
        callBack()
    }
    const doEdit = async () => {
        const params = {
            transCode: '63001',
            ...dictionaryForm.value
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
                let msg: string = '字典信息校验不通过'
                if (fields) {
                    msg += Object.values(fields).map(item => `【${item[0].message}】`).join(',')
                }
                wxmAlert(msg, 'error')
                return
            }
    
            if (isEmpty(dictionaryForm.value.dictId)) {
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

        const data: DictType = row ? row.value : {}
 
        Object.keys(data).forEach((key: string) => {
            // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ permissionId?: string
            // 使用 as keyof PermissionType 解决
            dictionaryForm.value[key as keyof DictType] = data[key as keyof DictType]
        })


    })
    return {store, formDisabled, dictionaryForm, dictionaryFormRef,handleSave}
}

// 方法


