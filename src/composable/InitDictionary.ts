import { useRbacStore } from '../store/rbac';
import {useBizStore} from '../store/biz'
import {useOthersStore} from '../store/others'
import type { DictType, ResultType } from '../comm/type'
// import { DictStateKeyData } from '../comm/Data'
import { wxmAlert } from '../util/commFn';
import { useLineToCamel } from './StringTransform';

import { usePostTo } from './HttpApi'
const rbacStore = useRbacStore()
const othersStore=useOthersStore()
const bizStore=useBizStore()


/**
 * 定时任务字典查询
 * @param url 
 * @returns 
 */
export const initDictQuartz = async (url?: string) => {
    const data: Array<string> = ['TRIGGER_STATE']
    initDictRbac(data, url)
}

/**
 * 接口字典查询
 * @param url 
 * @returns 
 */
export const initDictApi = async (url?: string) => {
    const data: Array<string> = ['API_STATUS']
    initDictRbac(data, url)
}


/**
 * 权限字典查询
 * @param url 
 * @returns 
 */
export const initDicPermission = async (url?: string) => {
    const data: Array<string> = ['PERMISSION_TYPE', 'PERMISSION_STATUS']
    initDictRbac(data, url)
}


/**
 * 资源字典查询
 * @param url 
 * @returns 
 */
export const initDicResource = async (url?: string) => {
    const data: Array<string> = ['RESOURCE_TYPE', 'RESOURCE_STATUS']
    initDictRbac(data, url)
}


/**
 * 角色字典查询
 * @param url 
 * @returns 
 */
export const initDicRole = async (url?: string) => {
    const data: Array<string> = ['ROLE_TYPE', 'ROLE_STATUS']
    initDictRbac(data, url)

}


/**
 * 用户组字典查询
 * @param url 
 * @returns 
 */
export const initDicGroup = async (url?: string) => {
    const data: Array<string> = ['GROUP_TYPE', 'GROUP_STATUS']
    initDictRbac(data, url)
}

/**
 * 用户字典查询
 * @param url 
 * @returns 
 */
export const initDictUser = async (url?: string) => {
    const data: Array<string> = ['USER_TYPE', 'USER_RATE', 'USER_STATUS']
    initDictRbac(data, url)
}



export const initDictRbac = async (data?: Array<string>, url?: string) => {
    const state: any = rbacStore.$state
    let dictWords: Array<string> = ['USER_TYPE', 'USER_RATE', 'USER_STATUS', 'GROUP_TYPE', 'GROUP_STATUS', 'ROLE_TYPE', 'ROLE_STATUS', 'RESOURCE_TYPE', 'RESOURCE_STATUS', 'PERMISSION_TYPE', 'PERMISSION_STATUS', 'API_STATUS']
    dictWords = data ? data : dictWords
    dictWords.forEach((word: string, index: number) => {
        // const dictStateName:string=`${DictStateKeyData[word]}Dicts`
        const dictStateName = `${useLineToCamel(word.toLocaleLowerCase())}Dicts`
        // if(!Object.prototype.hasOwnProperty.call(state, dictStateName)){
        //     dictWords.splice(index,1)
        // }else{
        //     const dictList:Array<DictType>=state[dictStateName] 
        //     if(!dictList||!(dictList instanceof Array)||dictList.length!==0){
        //         dictWords.splice(index,1)
        //     }
        // }

        const dictList: Array<DictType> = state[dictStateName]
        if (!dictList || !(dictList instanceof Array) || dictList.length !== 0) {
            dictWords.splice(index, 1)
        }
    })
    if (dictWords.length === 0) return


    const { res, err } = await queryDict(dictWords, url) as ResultType;
    if (err) {
        const errMsg = err.message || err
        wxmAlert(errMsg, 'error')
        return false
    }
    if (!res || res.code !== '0') {
        wxmAlert(res.message, 'error')
        return false
    }


    dictWords.forEach(word => {
        const dictStateName: string =  `${useLineToCamel(word.toLocaleLowerCase())}Dicts`
        const data: Array<DictType> = res.data.filter((item: DictType) => item.dictType === word)

        rbacStore.$patch((state: any) => {
            state[dictStateName] = data
        })

    })
}


export const initDictBiz = async (data?: Array<string>, url?: string) => {
    const state: any = bizStore.$state
    const dictWords = data?data:[]  
    dictWords.forEach((word: string, index: number) => {
        const dictStateName = `${useLineToCamel(word.toLocaleLowerCase())}Dicts`
        const dictList: Array<DictType> = state[dictStateName]
        if (!dictList || !(dictList instanceof Array) || dictList.length !== 0) {
            dictWords.splice(index, 1)
        }
    })
    if (dictWords.length === 0) return

    const { res, err } = await queryDict(dictWords, url) as ResultType;
    if (err) {
        const errMsg = err.message || err
        wxmAlert(errMsg, 'error')
        return false
    }
    if (!res || res.code !== '0') {
        wxmAlert(res.message, 'error')
        return false
    }


    dictWords.forEach(word => {
        const dictStateName: string =  `${useLineToCamel(word.toLocaleLowerCase())}Dicts`
        const data: Array<DictType> = res.data.filter((item: DictType) => item.dictType === word)

        bizStore.$patch((state: any) => {
            state[dictStateName] = data
        })

    })
}

export const initDictOthers = async (data?: Array<string>, url?: string) => {
    const state: any = othersStore.$state
    const dictWords = data?data:[]  
    dictWords.forEach((word: string, index: number) => {
        const dictStateName = `${useLineToCamel(word.toLocaleLowerCase())}Dicts`
        const dictList: Array<DictType> = state[dictStateName]
        if (!dictList || !(dictList instanceof Array) || dictList.length !== 0) {
            dictWords.splice(index, 1)
        }
    })
    if (dictWords.length === 0) return

    const { res, err } = await queryDict(dictWords, url) as ResultType;
    if (err) {
        const errMsg = err.message || err
        wxmAlert(errMsg, 'error')
        return false
    }
    if (!res || res.code !== '0') {
        wxmAlert(res.message, 'error')
        return false
    }


    dictWords.forEach(word => {
        const dictStateName: string =  `${useLineToCamel(word.toLocaleLowerCase())}Dicts`
        const data: Array<DictType> = res.data.filter((item: DictType) => item.dictType === word)

        othersStore.$patch((state: any) => {
            state[dictStateName] = data
        })

    })
}

/**
 * 基本字典查询
 * @param data  Array<string>
 * @param url  string
 * @returns 
 */
export const queryDict = (data: Array<string>, url?: string) => {
    if (!url) {
        url = '/gateway/rbac/61002'
    }
    const params = {
        transCode: '61002',
        typeList: data,
    }
    return usePostTo(url, params)
}

