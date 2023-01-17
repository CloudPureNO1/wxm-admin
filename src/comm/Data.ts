import type { BaseType, MenuColorType } from "./type";


export const MenuColors: Array<MenuColorType> = [
  // 默认透明与不设置一致
  {
    menuBgColor:'', 
    menuTextColor:'',
    menuActiveTextColor:'',
  },
  {
    menuBgColor:'#409eff', 
    menuTextColor:'#ffffff',
    menuActiveTextColor:'#ffeb3b',
  },
  {
    menuBgColor:'#2c3e50', 
    menuTextColor:'#ffffff',
    menuActiveTextColor:'#409eff',
  },
]

/**
 * 字典 state 对照类型，对应值+Dicts 就是state中的变量
 */
export const DictStateKeyData:BaseType<string>={
  'USER_TYPE':'userType',
  'USER_RATE':'userRate',
  'USER_STATUS':'userStatus',
  'GROUP_TYPE':'groupType',
  'GROUP_STATUS':'groupStatus',
  'ROLE_TYPE':'roleType',
  'ROLE_STATUS':'roleStatus',
  'RESOURCE_TYPE':'resourceType',
  'RESOURCE_STATUS':'resourceStatus',
  'PERMISSION_TYPE':'permissionType',
  'PERMISSION_STATUS':'permissionStatus',
  'API_STATUS':'apiStatus',
}