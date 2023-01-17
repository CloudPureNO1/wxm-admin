import {reactive} from 'vue'
import type { FormRules } from 'element-plus'
import {toLocaleNotEmpty} from '../../composable/TransI18n'
// 规则校验 响应式
// 用户组
export const userRules = reactive<FormRules>({
 
})
// 用户组
export const groupRules = reactive<FormRules>({
 
})
// 角色
export const roleRules = reactive<FormRules>({
    roleName: [
        { required: true, message: '请输入角色名称', trigger: ['blur', 'change'] }
    ],
    roleType: [
        { required: true, message: '请选择角色类型', trigger: ['blur', 'change'] }
    ],
    roleStatus: [
        { required: true, message: '请选择角色状态', trigger: ['blur', 'change'] }
    ],
    roleCode: [
        { required: true, message: '角色编码不能为空', trigger: ['blur', 'change'] }
    ]
})

// 资源
export const resourceRules=reactive<FormRules>({
    parentId:[
        { required: true, message: toLocaleNotEmpty('Rbac.Resource.parentId'), trigger: ['blur', 'change'] }
    ],
    resourceName:[
        { required: true, message: toLocaleNotEmpty('Rbac.Resource.resourceName'), trigger: ['blur', 'change'] }
    ],
    resourceUrl:[
        { required: true, message: toLocaleNotEmpty('Rbac.Resource.resourceUrl'), trigger: ['blur', 'change'] }
    ],
    resourceType:[
        { required: true, message: toLocaleNotEmpty('Rbac.Resource.resourceType'), trigger: ['blur', 'change'] }
    ],
    resourceStatus:[
        { required: true, message: toLocaleNotEmpty('Rbac.Resource.resourceStatus'), trigger: ['blur', 'change'] }
    ],
    resourceIcon:[
        { required: true, message: toLocaleNotEmpty('Rbac.Resource.resourceIcon'), trigger: ['blur', 'change'] }
    ],
    resourceNum:[
        { required: true, message: toLocaleNotEmpty('Rbac.Resource.resourceNum'), trigger: ['blur', 'change'] }
    ],
    orderNum:[
        { required: true, message: toLocaleNotEmpty('Rbac.Resource.orderNum'), trigger: ['blur', 'change'] }
    ]
})

//  权限 规则校验 响应式
export const permissionRules=reactive<FormRules>({
    permissionName: [
        { required: true, message: '请输入权限名称', trigger: ['blur', 'change'] }
      ],
      permissionType: [
        { required: true, message: '请选择权限类型', trigger: ['blur', 'change'] }
      ],
      permissionStatus: [
        { required: true, message: '请选择权限状态', trigger: ['blur', 'change'] }
      ],
      permissionCode: [
        { required: true, message: '权限编码不能为空', trigger: ['blur', 'change'] }
      ]
})
//  接口 规则校验 响应式
export const apiRules=reactive<FormRules>({
 
})

//  字典 规则校验 响应式
export const dictionaryRules=reactive<FormRules>({
    
})