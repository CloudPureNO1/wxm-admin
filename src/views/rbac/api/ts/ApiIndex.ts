import {ref,reactive, provide,computed, onMounted } from "vue";
import type { FormInstance } from "element-plus";
import  { ElMessageBox,ElMessage } from "element-plus";
import type { ApiType,BaseType,PagingQueryResultsType ,ApiResultType} from "../../../../comm/type";
import { useLayoutStore } from "../../../../store/layout";
import { useRbacStore } from "../../../../store/rbac";
import { useSearchPage,usePostApi } from "../../../../composable/ApiBaseCall";
import { useFormatRbacDict } from "../../../../composable/formatDict";


import { ConditionButtonKey ,PaginationKey,RbacInfoKey,RbacInfoRowKey} from '../../../../symbol/Symbol'
import { wxmAlert } from "../../../../util/commFn"
import { initDictApi } from "../../../../composable/InitDictionary";


const layoutStore=useLayoutStore()
const rbacStore=useRbacStore()

export const init=()=>{
    const size=computed(()=>{
        return layoutStore.size
    })
    const dicts=computed(()=>{
        return {
            'apiStatusDicts':rbacStore.apiStatusDicts
        }
    })

    // 
    const searchForm=reactive<ApiType>({})
    const searchFormRef=ref<FormInstance>()
    const apiList=ref<ApiType[]>([])
    const total=ref<number>(0)
    const pageSize=ref<number>(14)
    const currentPage=ref<number>(1)
    const dialogVisible=ref<boolean>(false)
    // info
    const row=ref<ApiType>({})
    const type=ref<string>('')

    // methods start
    const handleSearch= async ()=>{
        const params={
            transCode:'71002',
            pageSize:pageSize.value,
            currentPage:currentPage.value,
            ...searchForm
        }
        const {code,recordList,recordCount} = await useSearchPage(`/gateway/rbac/${params.transCode}`,params) as PagingQueryResultsType
        if(code!=='0') return 
        apiList.value=recordList as ApiType[]
        total.value=recordCount
    }

    const handleAdd = () => {
        handleDialogVisible(true)
        row.value={}
        type.value='add'
      }
       const handleView = (data:ApiType) => {
        handleDialogVisible(true)
        row.value=data
        type.value='view'
      }
       const handleEdit = (data:ApiType) => {
        handleDialogVisible(true)
        row.value=data
        type.value='edit'
      }
       const handleDelete =  (data:ApiType) => {
        ElMessageBox.confirm( '此操作将永久删除接口, 是否继续?', '提示', {
          type:'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
             doDelete(data)
          }).catch(() => {
            ElMessage({
              type: 'warning',
              message:  '已取消删除' })
          })
      }
      
      const doDelete= async(data:ApiType)=>{
        const params = {
          transCode: '74001',
          apiId : data.apiId
        }
        const {code}= await usePostApi(`/gateway/rbac/${params.transCode}`, params)
        if(code!=='0') return 
        wxmAlert('删除成功')
        handleSearch()
      }
       
       const handleDeleteBatch = (selection:any) => {
        if (!selection ||!Array.isArray(selection) ||selection.length === 0) {
          wxmAlert('请先选择要删除的记录', 'error')
          return false
        }
      
      
        ElMessageBox.confirm( '此操作将永久删除用户, 是否继续?', '提示', {
          type:'warning',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
           doDeleteBatch(selection)
        }).catch(() => {
          ElMessage({
            type: 'warning',
            message: '已取消删除'
          })
        })
       
      }
      
      const doDeleteBatch= async(selection:Array<ApiType>)=>{
        const params = {
          transCode: '74002',
          list: selection.map(item => item.apiId)
        }
        const {code}= await usePostApi(`/gateway/rbac/${params.transCode}`, params)
        if(code!=='0') return 
        wxmAlert('删除成功')
        handleSearch()
      }
      
      
       const handleReload = () => {
        handleSearch()
      }
       const handleDialogVisible=(visible:boolean):void=>{
        dialogVisible.value=visible
      }
       const handleExportAll=()=>{
      
      }
      const doEdit = async (data:ApiType) => {
        const params = {
            transCode: '73001',
            ...data
        }
        params.apiStatus=params.apiStatus==='1'?'0':'1'
        const { code } = await usePostApi(`/gateway/rbac/${params.transCode}`, params) as ApiResultType
        if(code!=='0') return
  
        wxmAlert('状态修改完成')
        handleSearch()
    }
    // methods end

    const colList=ref<BaseType<any>[]>([
        { type: 'selection', show: true, width: '55', fixed: 'left' },
        { type: 'index', label: "序号", show: true, width: '55', fixed: 'left' },
        { prop: 'apiId', label: '接口ID', show: '1', width: '110' },
        { prop: 'apiCode', label: '接口编码', show: true, width: '120', align: 'left' },
        { prop: 'apiTitle', label: '接口标题', show: true, align: 'left' },
        { prop: 'apiUrl', label: '接口地址', show: true, align: 'left' },
        { prop: 'apiStatus', label: '接口状态', show: true, formatter: (row: any) => useFormatRbacDict(row, 'apiStatus'),
        ops:[
          {value:'0',render:doEdit,content:'置为有效',permission: ['rbac-permission:edit'],type:'danger'},
          {value:'1',render:doEdit,content:'置为无效',permission: ['rbac-permission:edit'],type:'success'}
      ]},
    
        { prop: 'createTime', label: '创建时间', show: false },
        { prop: 'creator', label: '创建者', show: false },
        { prop: 'updateTime', label: '更新时间', show: false },
        { prop: 'operator', label: '最近一次操作者', show: false, width: '120' },
        { prop: 'apiDesc', label: '描述', show: false, width: '120' },
        //  element 图标 直接传入字符，View  因为已经全局引入，直接出入名称，应用的时候，都是：View格式，
        // 如果直接把图标传入，提示动态出入插件警告
        {
            prop: 'ops', label: '操作', show: true, width: '180', fixed: 'right', children: [
                { permission: ['rbac-api:view'], icon: 'View', type: 'success', render: handleView },
                { permission: ['rbac-api:edit'], icon: 'EditPen', type: 'primary', render: handleEdit },
                { permission: ['rbac-api:delete'], icon: 'Delete', type: 'danger', render: handleDelete }
    
            ]
        },
    ])


    provide(ConditionButtonKey, {
        colList,
        data:{dataList:apiList,fileName:'接口信息',sheetName:'接口信息'},
        add:handleAdd,
        deleteBatch:handleDeleteBatch,
        exportAll:handleExportAll,
        reload:handleReload
      })
     
      provide(PaginationKey,{
        total,
        currentPage,
        pageSize,
        search:handleSearch
      })
    
    
      provide(RbacInfoKey,{
        visible:handleDialogVisible,
        search:handleSearch
      })
      provide(RbacInfoRowKey,{
        row,
        type
      })
    

    onMounted(()=>{
        initDictApi()
        handleSearch()
    })

    return {size,dicts,searchForm,searchFormRef,apiList,colList,dialogVisible,handleSearch}
}