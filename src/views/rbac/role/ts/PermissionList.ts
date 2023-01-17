

import { onMounted, computed, ref,provide, inject } from "vue"
import type { ElTable } from 'element-plus'
import { initDicRole } from "../../../../composable/InitDictionary"
import { useLayoutStore } from "../../../..//store/layout"
import type { BaseType, PermissionType,PagingQueryResultsType, ApiResultType } from "../../../../comm/type"
import {usePostApi, useSearchPage} from '../../../../composable/ApiBaseCall'
import {PaginationKey,RbacInfoRowKey} from '../../../../symbol/Symbol'
import { wxmAlert } from "../../../../util/commFn"
import { useResetPermission } from '../../../../composable/sessionStorePermission'

export const init = (props:BaseType<string>) => {


    type ParamsType = {
        transCode: string,
        pageSize: number,
        currentPage: number,
        roleId: string,
        permissionId?: string,
        permissionName?: string,
        permissionCode?: string,
        creator?: string
    }
    type DynamicKeys = {
        permissionId?: string,
        permissionName?: string,
        permissionCode?: string,
        creator?: string
    }

    const layoutStore = useLayoutStore()
    const size = computed(() => {
        return layoutStore.size
    })

    const queryValue = ref<string>('')
    const queryType = ref<string>('')

    const permissionList = ref<PermissionType[]>([])
    const total = ref<number>(0)
    const currentPage = ref<number>(1)
    const pageSize = ref<number>(7)

    const expands = ref<string[]>([])

    const permissionTableRef= ref<InstanceType<typeof ElTable>>()

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
            params.transCode = '51003'
        }
        if (props.type === 'remove') {
            params.transCode = '51002'
        }
        params[queryType.value as keyof DynamicKeys]=queryValue.value
        const { recordList, recordCount } = await useSearchPage(`/gateway/rbac/${params.transCode}`, params) as PagingQueryResultsType
        permissionList.value = recordList as Array<PermissionType>
        total.value = recordCount

        useResetPermission()
    }
    const handleAdd = async() => {
      const selection:PermissionType[] =  permissionTableRef.value?.getSelectionRows()
      if(!selection||selection.length===0){
        wxmAlert('请先选择要添加的权限','error')
        return 
      }

      const params = {
        transCode: '32003',
        roleId: row.value.roleId,
        list: selection.map(item => item.permissionId)
      }
      const {code}=await usePostApi(`/gateway/rbac/${params.transCode}`,params) as ApiResultType
      if(code!=='0') return
      wxmAlert('添加成功')
      if(reload) reload()
    }
    const handleRemove = async () => {
        const selection:PermissionType[] =  permissionTableRef.value?.getSelectionRows()
        if(!selection||selection.length===0){
          wxmAlert('请先选择要移除的权限','error')
          return 
        }
        const params = {
            transCode: '34002',
            roleId: row.value.roleId,
            list: selection.map(item => item.permissionId)
          }
          const {code}=await usePostApi(`/gateway/rbac/${params.transCode}`,params) as ApiResultType
          if(code!=='0') return
          wxmAlert('移除成功')
          if(reload) reload()
    }
    const rowDblclick = (row:PermissionType) => {
        const permissionId=row.permissionId as string

        // 允许 同时展开多个，expands 可以有多个值
        // const index=expands.value.findIndex(item=>item===permissionId)
        // if(index===-1){
        //     userTableRef.value!.toggleRowExpansion(row,true)
        //     expands.value.push(permissionId)
        // } else{
        //     userTableRef.value!.toggleRowExpansion(row,false)
        //     expands.value.splice(index,1)
        // }  

        const flag=expands.value.includes(permissionId)
        permissionTableRef.value!.toggleRowExpansion(row,!flag)
        if(flag){
            expands.value.pop()
        }else{
            expands.value.push(permissionId)
        }
    }
    const getRowKey =(row:PermissionType)=> {
        return row.permissionId
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


    return { permissionTableRef, size, queryType, queryValue, expands, permissionList, getRowKey,handleSearch, handleAdd, handleRemove, rowDblclick }
}