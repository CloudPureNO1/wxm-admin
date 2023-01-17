

import { onMounted, computed, ref,provide, inject } from "vue"
import type { ElTable } from 'element-plus'
import { initDicRole } from "../../../../composable/InitDictionary"
import { useLayoutStore } from "../../../..//store/layout"
import type { BaseType,GroupType, RoleType,PagingQueryResultsType, ApiResultType } from "../../../../comm/type"
import {usePostApi, useSearchPage} from '../../../../composable/ApiBaseCall'
import {PaginationKey,RbacInfoRowKey} from '../../../../symbol/Symbol'
import { wxmAlert } from "@/util/commFn"

export const init = (props:BaseType<string>) => {


    type ParamsType = {
        transCode: string,
        pageSize: number,
        currentPage: number,
        groupId: string,
        roleId?: string,
        roleName?: string,
        roleCode?: string,
        creator?: string
    }
    type DynamicKeys = {
        roleId?: string,
        roleName?: string,
        roleCode?: string,
        creator?: string
    }

    const layoutStore = useLayoutStore()
    const size = computed(() => {
        return layoutStore.size
    })

    const queryValue = ref<string>('')
    const queryType = ref<string>('')

    const roleList = ref<RoleType[]>([])
    const total = ref<number>(0)
    const currentPage = ref<number>(1)
    const pageSize = ref<number>(7)

    const expands = ref<string[]>([])

    const roleTableRef= ref<InstanceType<typeof ElTable>>()

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
            params.transCode = '31003'
        }
        if (props.type === 'remove') {
            params.transCode = '31002'
        }
        params[queryType.value as keyof DynamicKeys]=queryValue.value
        const { recordList, recordCount } = await useSearchPage(`/gateway/rbac/${params.transCode}`, params) as PagingQueryResultsType
        roleList.value = recordList as Array<GroupType>
        total.value = recordCount
    }
    const handleAdd = async() => {
      const selection:RoleType[] =  roleTableRef.value?.getSelectionRows()
      if(!selection||selection.length===0){
        wxmAlert('请先选择要添加的角色','error')
        return 
      }

      const params = {
        transCode: '22003',
        groupId: row.value.groupId,
        list: selection.map(item => item.roleId)
      }
      const {code}=await usePostApi(`/gateway/rbac/${params.transCode}`,params) as ApiResultType
      if(code!=='0') return
      wxmAlert('添加成功')
      if(reload) reload()
    }
    const handleRemove = async () => {
        const selection:RoleType[] =  roleTableRef.value?.getSelectionRows()
        if(!selection||selection.length===0){
          wxmAlert('请先选择要移除的角色','error')
          return 
        }
        const params = {
            transCode: '24003',
            groupId: row.value.groupId,
            list: selection.map(item => item.roleId)
          }
          const {code}=await usePostApi(`/gateway/rbac/${params.transCode}`,params) as ApiResultType
          if(code!=='0') return
          wxmAlert('移除成功')
          if(reload) reload()
    }
    const rowDblclick = (row:RoleType) => {
        const userId=row.roleId as string

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
        roleTableRef.value!.toggleRowExpansion(row,!flag)
        if(flag){
            expands.value.pop()
        }else{
            expands.value.push(userId)
        }
    }
    const getRowKey =(row:RoleType)=> {
        return row.roleId
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


    return { roleTableRef, size, queryType, queryValue, expands, roleList, getRowKey,handleSearch, handleAdd, handleRemove, rowDblclick }
}