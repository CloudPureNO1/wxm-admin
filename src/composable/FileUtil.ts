
import type { CommType } from '../comm/type'
import {usePostApi} from './ApiBaseCall'
import { wxmAlert } from '../util/commFn'
 
export const useUploadFileBatch=async (apiUrl:string,fileList:Array<File>,params?:CommType)=>{
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    const formData = new FormData()

    fileList.forEach(file => {
        formData.append('files', file)
    })
    if(params) formData.set('data', JSON.stringify(params))

    const {code,data} = await usePostApi(apiUrl,formData,config)
    if(code!=='0') return 
    wxmAlert('上传成功')
    return data
}


export const useUploadFile=async (apiUrl:string,file:File|Blob,params?:CommType)=>{
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    const formData = new FormData()

    formData.append('files', file)
    if(params) formData.set('data', JSON.stringify(params))

    const {code,data} = await usePostApi(apiUrl,formData,config)
    if(code!=='0') return 
    wxmAlert('上传成功')
    return data
}


export const useUploadBase64FileBatch=async (apiUrl:string,base64FileList:Array<string>,params?:CommType)=>{
    const p:CommType={
        base64FileList:base64FileList
    }
    
    if(params) p.params= JSON.stringify(params)

    const {code,data} = await usePostApi(apiUrl,p)
    if(code!=='0') return 
    wxmAlert('上传成功')
    return data
}

export const useUploadBase64File=async (apiUrl:string,base64File:string,params?:CommType)=>{
    const p:CommType={
        base64File:base64File
    }
    
    if(params) p.params= JSON.stringify(params)

    const {code,data} = await usePostApi(apiUrl,p)
    if(code!=='0') return 
    wxmAlert('上传成功')
    return data
}