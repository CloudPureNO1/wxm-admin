import { defineStore } from "pinia";
import type { DictType } from "../comm/type";

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useOthersStore = defineStore("othersStore", {
  state: () => ({
    statusDicts: [] as DictType[],// 或者 Array<DicType>
 

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
    changeStatusDicts(statusDicts: DictType[]) {
      this.statusDicts = statusDicts
    },
    
  }
});
