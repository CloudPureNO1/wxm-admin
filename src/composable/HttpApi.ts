import { ref, isRef, unref, watchEffect } from 'vue'
import { Base64 } from "js-base64";
import router from '../router'
import type { DataRtnType, ResultType, BaseType } from '../comm/type'

import AxiosUtil from "../util/axios/axios-util";
// import {ElMessage} from 'element-plus'
import { wxmAlert } from '../util/commFn';
 
/** 需要异步转同步时使用 */
/**
 * 兼容响应式ref url 的,post 请求
 * @param url 
 * @param params 
 * @param config 
 * @returns 
 */
export const usePost = (url: string, params?: any, config?: any) => {
    const doPost = () => {
        if (!params) {
            params = {}
        }
        const paramsBase64 = Base64.encode(JSON.stringify(params));
        if (!config) {
            config = {
                headers: {
                    // 'Content-type': 'application/json' 传入的时base64编码串 多 双引号，表格模式多等号
                    'Content-type': 'text/plain',
                },
            }
        }
        return AxiosUtil.post(unref(url), paramsBase64, config)
    }

    if (isRef(url)) {
        // 若输入的 URL 是一个 ref，那么启动一个响应式的请求
        return watchEffect(doPost)
    } else {
        // 否则只请求一次
        // 避免监听器的额外开销
        return doPost()
    }
}


/**
* async await 异常处理使用try...catch 多个的时候，。。。；
* 在 await 后使用catch 又很奇怪（失去原本async await 初衷，雷同于直接。then().catch()）
* 采用统一处理
* @param {*} V
* @returns
*/
const to = (fn: any) => {
    return new Promise((resolve) => {
        const resData: DataRtnType = {
            code: '',
            message: '',
            data: '',
            detailMsg: '',
            rsTime: 0
        }
        const data = ref<DataRtnType>(resData)
        const error = ref(null)
        // 成功的时候，resolve([nul,res]),异常的时候resolve([err,null])  不是reject
        const rs: ResultType = {
            res: data,
            err: error
        }
        fn.then((res: any) => {
            if (
                res.data &&
                (res.data.code === "SCK-10005" ||
                    res.data.code === "SCK-10009" ||
                    res.data.code === "SCK-10010" ||
                    res.data.code === "SCK-10011" ||
                    res.data.code === "ACCESS-10001")
            ) {
                wxmAlert(res.data.detailMsg ,'error');
                const keys = Object.keys(sessionStorage);
                if (keys.length !== 0) {
                    keys.forEach((key) => sessionStorage.removeItem(key));
                }
                router.push({ path: "/login" });
            }else{
                rs.res = res.data
                rs.err = null
                resolve(rs)
            }
        }).catch((err: any) => {
            console.error(err)
            rs.res = null
            rs.err = err
            resolve(rs)
        })
    })
}

/**
 * 兼容响应式ref url 的 ，且经过to 方法处理的的Post 请求
 * @param url 
 * @param params 
 * @returns Promise
 */
export const usePostTo = (url: string, params: BaseType<any>,config?:any) => {
    return to(usePost(url, params,config))
}



/**
 * 原始 axios post 请求，和返回结果
 * @param url 
 * @param params 
 * @param config 
 * @returns 
 */
export const usePostOriginal = (url: string, params?: any, config?: any) => {
    if (!params) {
        params = {}
    }
    const paramsBase64 = Base64.encode(JSON.stringify(params));
    if (!config) {
        config = {
            headers: {
                // 'Content-type': 'application/json' 传入的时base64编码串 多 双引号，表格模式多等号
                'Content-type': 'text/plain',
            },
        }
    }

    return AxiosUtil.post(unref(url), paramsBase64, config)
}

