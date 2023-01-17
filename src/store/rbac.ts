import { defineStore } from "pinia";
import type { DictType } from "../comm/type";

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useRbacStore = defineStore("rbacStore", {
  state: () => ({
    userTypeDicts: [] as DictType[],// 或者 Array<DicType>
    userRateDicts: [] as DictType[],
    userStatusDicts: [] as DictType[],

    /**用户组 */
    groupTypeDicts: [] as Array<DictType>,
    groupStatusDicts: [] as Array<DictType>,
    /**角色 */
    roleTypeDicts: [] as Array<DictType>,
    roleStatusDicts: [] as Array<DictType>,
    /**资源 */
    resourceTypeDicts: [] as Array<DictType>,
    resourceStatusDicts: [] as Array<DictType>,
    /**权限 */
    permissionTypeDicts: [] as Array<DictType>,
    permissionStatusDicts: [] as Array<DictType>,
    /**接口 */
    apiStatusDicts: [] as Array<DictType>,
    /**定时任务 */
    triggerStateDicts:[] as Array<DictType>,

  }),
  getters: {
    // getUserTypes:(state):Array<DictType>=>{
    //   return state.usertypeDicts
    // },
    // getUserRates:(state):Array<DictType>=>{
    //   return state.userRateDicts
    // },
    // getUserStatus:(state):Array<DictType>=>{
    //   return state.userStatusDicts
    // },
  },
  actions: {
    changeUserTypeDicts(userTypeDicts: DictType[]) {
      this.userTypeDicts = userTypeDicts
    },
    changeUserRateDicts(userRateDicts: DictType[]) {
      this.userRateDicts = userRateDicts
    },
    changeUserStatusDicts(userStatusDicts: DictType[]) {
      this.userStatusDicts = userStatusDicts
    },

    /**用户组 */
    changeGroupTypeDicts(groupTypeDicts: Array<DictType>) {
      this.groupTypeDicts = groupTypeDicts
    },
    changeGroupStatusDicts(groupStatusDicts: Array<DictType>) {
      this.groupStatusDicts = groupStatusDicts
    },
    /**角色 */
    changeRoleTypeDicts(roleTypeDicts: Array<DictType>) {
      this.roleTypeDicts = roleTypeDicts
    },
    changeRoleStatusDicts(roleStatusDicts: Array<DictType>) {
      this.roleStatusDicts = roleStatusDicts
    },
    /**资源 */
    changeResourceTypeDicts(resourceTypeDicts: Array<DictType>) {
      this.resourceTypeDicts = resourceTypeDicts
    },
    changeResourceStatusDicts(resourceStatusDicts: Array<DictType>) {
      this.resourceStatusDicts = resourceStatusDicts
    },
    /**权限 */
    changePermissionTypeDicts(permissionTypeDicts: Array<DictType>) {
      this.permissionTypeDicts = permissionTypeDicts
    },
    changePermissionStatusDicts(permissionStatusDicts: Array<DictType>) {
      this.permissionStatusDicts = permissionStatusDicts
    },
    /**接口 */
    changeApiStatusDicts(apiStatusDicts: Array<DictType>) {
      this.apiStatusDicts = apiStatusDicts
    },
    /**定时任务 */
    changeTriggerStateDicts(triggerStateDicts: Array<DictType>) {
      debugger
      this.triggerStateDicts = triggerStateDicts
    } 
  }
});
