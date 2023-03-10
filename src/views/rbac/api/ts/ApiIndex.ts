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
        ElMessageBox.confirm( '??????????????????????????????, ?????????????', '??????', {
          type:'warning',
            confirmButtonText: '??????',
            cancelButtonText: '??????',
          }).then(() => {
             doDelete(data)
          }).catch(() => {
            ElMessage({
              type: 'warning',
              message:  '???????????????' })
          })
      }
      
      const doDelete= async(data:ApiType)=>{
        const params = {
          transCode: '74001',
          apiId : data.apiId
        }
        const {code}= await usePostApi(`/gateway/rbac/${params.transCode}`, params)
        if(code!=='0') return 
        wxmAlert('????????????')
        handleSearch()
      }
       
       const handleDeleteBatch = (selection:any) => {
        if (!selection ||!Array.isArray(selection) ||selection.length === 0) {
          wxmAlert('??????????????????????????????', 'error')
          return false
        }
      
      
        ElMessageBox.confirm( '??????????????????????????????, ?????????????', '??????', {
          type:'warning',
          confirmButtonText: '??????',
          cancelButtonText: '??????',
        }).then(() => {
           doDeleteBatch(selection)
        }).catch(() => {
          ElMessage({
            type: 'warning',
            message: '???????????????'
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
        wxmAlert('????????????')
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
  
        wxmAlert('??????????????????')
        handleSearch()
    }
    // methods end

    const colList=ref<BaseType<any>[]>([
        { type: 'selection', show: true, width: '55', fixed: 'left' },
        { type: 'index', label: "??????", show: true, width: '55', fixed: 'left' },
        { prop: 'apiId', label: '??????ID', show: '1', width: '110' },
        { prop: 'apiCode', label: '????????????', show: true, width: '120', align: 'left' },
        { prop: 'apiTitle', label: '????????????', show: true, align: 'left' },
        { prop: 'apiUrl', label: '????????????', show: true, align: 'left' },
        { prop: 'apiStatus', label: '????????????', show: true, formatter: (row: any) => useFormatRbacDict(row, 'apiStatus'),
        ops:[
          {value:'0',render:doEdit,content:'????????????',permission: ['rbac-permission:edit'],type:'danger'},
          {value:'1',render:doEdit,content:'????????????',permission: ['rbac-permission:edit'],type:'success'}
      ]},
    
        { prop: 'createTime', label: '????????????', show: false },
        { prop: 'creator', label: '?????????', show: false },
        { prop: 'updateTime', label: '????????????', show: false },
        { prop: 'operator', label: '?????????????????????', show: false, width: '120' },
        { prop: 'apiDesc', label: '??????', show: false, width: '120' },
        //  element ?????? ?????????????????????View  ???????????????????????????????????????????????????????????????????????????View?????????
        // ????????????????????????????????????????????????????????????
        {
            prop: 'ops', label: '??????', show: true, width: '180', fixed: 'right', children: [
                { permission: ['rbac-api:view'], icon: 'View', type: 'success', render: handleView },
                { permission: ['rbac-api:edit'], icon: 'EditPen', type: 'primary', render: handleEdit },
                { permission: ['rbac-api:delete'], icon: 'Delete', type: 'danger', render: handleDelete }
    
            ]
        },
    ])


    provide(ConditionButtonKey, {
        colList,
        data:{dataList:apiList,fileName:'????????????',sheetName:'????????????'},
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