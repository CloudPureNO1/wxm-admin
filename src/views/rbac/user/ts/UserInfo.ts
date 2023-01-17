import { onMounted, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import type { UserType, ResultType } from '../../../../comm/type'
import { wxmAlert } from '../../../../util/commFn'
import { isEmpty } from 'lodash'
import { usePostTo } from '../../../../composable/HttpApi'
// 必须放在vue文件中，
// import { ConditionButtonKey, PaginationKey ,RbacInfoKey,RbacInfoRowKey} from '../../../symbol/Symbol'



const SysBaseUserList:Array<string> = ['wxm', 'wsm', 'wxy', 'wangxm', 'wangsm', 'wangxy', 'wangsenming', 'admin', 'manager', 'administrator']


export const init = (row?: any, type?: any) => {
    // 响应式变量
    const formDisabled = ref<boolean>(false)  //表单是否禁用
    const userFormRef = ref<FormInstance>() // 表单对象，必须与ref相同
    const userForm = ref<UserType>({})
    const allowChange = ref<boolean>(true)

    // methods start
    const doAdd = async (callBack: Function) => {
        const params = {
            transCode: '12001',
            ...userForm.value
        }
        const { res, err } = await usePostTo(`/gateway/rbac/${params.transCode}`, params) as ResultType
        if (err) {
            wxmAlert(err.message || err, 'error')
            return false
        }
        if ("0" !== res.code) {
            wxmAlert(res.message, 'error')
            return false
        }
        wxmAlert('新增成功')
        callBack()
    }
    const doEdit = async (callBack: Function) => {
        const params = {
            transCode: '13001',
            ...userForm.value
        }
        const { res, err } = await usePostTo(`/gateway/rbac/${params.transCode}`, params) as ResultType
        if (err) {
            wxmAlert(err.message || err, 'error')
            return false
        }
        if ("0" !== res.code) {
            wxmAlert(res.message, 'error')
            return false
        }
        wxmAlert('编辑成功')
        callBack()
    }
    const handleSave = async (formEl: FormInstance | undefined, callBack: Function) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (!valid) {
                let msg: string = '用户信息校验不通过'
                if (fields) {
                    msg += Object.values(fields).map(item => `【${item[0].message}】`).join(',')
                }
                wxmAlert(msg, 'error')
                return
            }
    
            if (isEmpty(userForm.value.userId)) {
                doAdd(callBack)
            } else {
                doEdit(callBack)
            }
    
        })
    }

    // methods end

    // life cycle method
    onMounted(() => {
        formDisabled.value = type.value === 'view'

        const data: UserType = row ? row.value : {}

        if (type === 'edit') {
            allowChange.value = SysBaseUserList.includes(row.username)
        }
        Object.keys(data).forEach((key: string) => {
            // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ permissionId?: string
            // 使用 as keyof PermissionType 解决
            userForm.value[key as keyof UserType] = data[key as keyof UserType]
        })


    })
    return { formDisabled, userForm, userFormRef,allowChange,handleSave}
}

// 方法


