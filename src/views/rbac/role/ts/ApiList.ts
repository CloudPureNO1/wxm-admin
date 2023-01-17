

import { onMounted, computed, ref,provide, inject } from "vue"
import type { ElTable } from 'element-plus'
import { initDicRole } from "../../../../composable/InitDictionary"
import { useLayoutStore } from "../../../..//store/layout"
import type { BaseType, ApiType,PagingQueryResultsType, ApiResultType } from "../../../../comm/type"
import {usePostApi, useSearchPage} from '../../../../composable/ApiBaseCall'
import {PaginationKey,RbacInfoRowKey} from '../../../../symbol/Symbol'
import { wxmAlert } from "@/util/commFn"

export const init = (props:BaseType<string>) => {


    type ParamsType = {
        transCode: string,
        pageSize: number,
        currentPage: number,
        roleId: string,
        apiId?: string,
        apiTitle?: string,
        creator?: string
    }
    type DynamicKeys = {
        apiId?: string,
        apiTitle?: string,
        creator?: string
    }

    const layoutStore = useLayoutStore()
    const size = computed(() => {
        return layoutStore.size
    })

    const queryValue = ref<string>('')
    const queryType = ref<string>('')

    const apiList = ref<ApiType[]>([])
    const total = ref<number>(0)
    const currentPage = ref<number>(1)
    const pageSize = ref<number>(7)

    const expands = ref<string[]>([])

    const apiTableRef= ref<InstanceType<typeof ElTable>>()

    const {row} = inject(RbacInfoRowKey)
    const reload = inject('reload') as Function

    // methods start
    const handleSearch =async () => {
        const params: ParamsType = {
            transCode:'',
            currentPage: currentPage.value,
            pageSize: pageSize.value,
            roleId: row.value.roleId 

        }
        if (props.type === 'add') {
            params.transCode = '71003'
        }
        if (props.type === 'remove') {
            params.transCode = '71002'
        }
        params[queryType.value as keyof DynamicKeys]=queryValue.value
        const { recordList, recordCount } = await useSearchPage(`/gateway/rbac/${params.transCode}`, params) as PagingQueryResultsType
        apiList.value = recordList as Array<ApiType>
        total.value = recordCount
    }
    const handleAdd = async() => {
      const selection:ApiType[] =  apiTableRef.value?.getSelectionRows()
      if(!selection||selection.length===0){
        wxmAlert('请先选择要添加的接口','error')
        return 
      }

      const params = {
        transCode: '32004',
        roleId: row.value.roleId,
        list: selection.map(item => item.apiId)
      }
      const {code}=await usePostApi(`/gateway/rbac/${params.transCode}`,params) as ApiResultType
      if(code!=='0') return
      wxmAlert('添加成功')
      if(reload) reload()
    }
    const handleRemove = async () => {
        const selection:ApiType[] =  apiTableRef.value?.getSelectionRows()
        if(!selection||selection.length===0){
          wxmAlert('请先选择要移除的接口','error')
          return 
        }
        const params = {
            transCode: '34003',
            roleId: row.value.roleId,
            list: selection.map(item => item.apiId)
          }
          const {code}=await usePostApi(`/gateway/rbac/${params.transCode}`,params) as ApiResultType
          if(code!=='0') return
          wxmAlert('移除成功')
          if(reload) reload()
    }
    const rowDblclick = (row:ApiType) => {
        const apiId=row.apiId as string

        // 允许 同时展开多个，expands 可以有多个值
        // const index=expands.value.findIndex(item=>item===apiId)
        // if(index===-1){
        //     userTableRef.value!.toggleRowExpansion(row,true)
        //     expands.value.push(apiId)
        // } else{
        //     userTableRef.value!.toggleRowExpansion(row,false)
        //     expands.value.splice(index,1)
        // }  

        const flag=expands.value.includes(apiId)
        apiTableRef.value!.toggleRowExpansion(row,!flag)
        if(flag){
            expands.value.pop()
        }else{
            expands.value.push(apiId)
        }
    }
    const getRowKey =(row:ApiType)=> {
        return row.apiId
      }
    // methods end

    provide(PaginationKey,{
        total,
        currentPage,
        pageSize,
        search:handleSearch
    })

    onMounted(() => {
        initDicRole()
        handleSearch()
    })


    return { apiTableRef, size, queryType, queryValue, expands, apiList, getRowKey,handleSearch, handleAdd, handleRemove, rowDblclick }
}