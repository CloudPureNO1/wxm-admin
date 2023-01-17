

import { onMounted, computed, ref,provide, inject } from "vue"
import type { ElTable } from 'element-plus'
import { initDictUser } from "../../../../composable/InitDictionary"
import { useLayoutStore } from "../../../..//store/layout"
import type { BaseType,GroupType, UserType,PagingQueryResultsType, ApiResultType } from "../../../../comm/type"
import {usePostApi, useSearchPage} from '../../../../composable/ApiBaseCall'
import {PaginationKey,RbacInfoRowKey} from '../../../../symbol/Symbol'
import { wxmAlert } from "@/util/commFn"

export const init = (props:BaseType<string>) => {


    type ParamsType = {
        transCode: string,
        pageSize: number,
        currentPage: number,
        groupId: string,
        userId?: string,
        username?: string,
        creator?: string
    }
    type DynamicKeys = {
        userId?: string,
        username?: string,
        creator?: string
    }

    const layoutStore = useLayoutStore()
    const size = computed(() => {
        return layoutStore.size
    })

    const queryValue = ref<string>('')
    const queryType = ref<string>('')

    const userList = ref<UserType[]>([])
    const total = ref<number>(0)
    const currentPage = ref<number>(1)
    const pageSize = ref<number>(7)

    const expands = ref<string[]>([])

    const userTableRef= ref<InstanceType<typeof ElTable>>()

    const {row} = inject(RbacInfoRowKey)
    const reload = inject('reload') as Function

    // methods start
    const handleSearch =async () => {
        const params: ParamsType = {
            transCode:'',
            currentPage: currentPage.value,
            pageSize: pageSize.value,
            groupId: row.value.groupId 

        }
        if (props.type === 'add') {
            params.transCode = '11003'
        }
        if (props.type === 'remove') {
            params.transCode = '11002'
        }
        params[queryType.value as keyof DynamicKeys]=queryValue.value
        const { recordList, recordCount } = await useSearchPage(`/gateway/rbac/${params.transCode}`, params) as PagingQueryResultsType
        userList.value = recordList as Array<GroupType>
        total.value = recordCount
    }
    const handleAdd = async() => {
      const selection:UserType[] =  userTableRef.value?.getSelectionRows()
      if(!selection||selection.length===0){
        wxmAlert('请先选择要添加的用户','error')
        return 
      }

      const params = {
        transCode: '22002',
        groupId: row.value.groupId,
        list: selection.map(item => item.userId)
      }
      const {code}=await usePostApi(`/gateway/rbac/${params.transCode}`,params) as ApiResultType
      if(code!=='0') return
      wxmAlert('添加成功')
      if(reload) reload()
    }
    const handleRemove = async () => {
        const selection:UserType[] =  userTableRef.value?.getSelectionRows()
        if(!selection||selection.length===0){
          wxmAlert('请先选择要移除的用户','error')
          return 
        }
        const params = {
            transCode: '24002',
            groupId: row.value.groupId,
            list: selection.map(item => item.userId)
          }
          const {code}=await usePostApi(`/gateway/rbac/${params.transCode}`,params) as ApiResultType
          if(code!=='0') return
          wxmAlert('移除成功')
          if(reload) reload()
    }
    const rowDblclick = (row:UserType) => {
        const userId=row.userId as string

        // 允许 同时展开多个，expands 可以有多个值
        // const index=expands.value.findIndex(item=>item===userId)
        // if(index===-1){
        //     userTableRef.value!.toggleRowExpansion(row,true)
        //     expands.value.push(userId)
        // } else{
        //     userTableRef.value!.toggleRowExpansion(row,false)
        //     expands.value.splice(index,1)
        // }  

        const flag=expands.value.includes(userId)
        userTableRef.value!.toggleRowExpansion(row,!flag)
        if(flag){
            expands.value.pop()
        }else{
            expands.value.push(userId)
        }
    }
    const getRowKey =(row:UserType)=> {
        return row.userId
      }
    // methods end

    provide(PaginationKey,{
        total,
        currentPage,
        pageSize,
        search:handleSearch
    })

    onMounted(() => {
        initDictUser()
        handleSearch()
    })


    return { userTableRef, size, queryType, queryValue, expands, userList, getRowKey,handleSearch, handleAdd, handleRemove, rowDblclick }
}