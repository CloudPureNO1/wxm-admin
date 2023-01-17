
import { ref, reactive, onMounted, provide } from 'vue'
import  { ElMessageBox ,ElMessage} from 'element-plus'
import type { FormInstance,Action} from 'element-plus'
import { Search, RefreshLeft  } from '@element-plus/icons-vue';

import type { BaseType, SearchPermissionType, PermissionType ,ResultType} from '../../../../comm/type'
import { useFormatRbacDict } from '../../../../composable/formatDict';
import { useSearchPage,usePostApi } from '../../../../composable/ApiBaseCall';
import { useResetPermission } from '../../../../composable/sessionStorePermission';
import { ConditionButtonKey, PaginationKey ,RbacInfoKey,RbacInfoRowKey} from '../../../../symbol/Symbol'
import { initDicPermission } from '../../../../composable/InitDictionary';
import { usePostTo } from '../../../../composable/HttpApi'
import { wxmAlert } from "../../../../util/commFn"
 
 
 
// 响应式变量
export const searchForm = reactive<SearchPermissionType>({})
export const searchFormRef = ref<FormInstance>()

// 父组件调用子组件的方法，需要卸载vue界面中
// const wxmTableRef = ref()
// export const testRef=()=>{
//   wxmTableRef.value.test("Hello")
// }

export const permissionList = ref<PermissionType[]>([])
export const total = ref<number>(0)

export const currentPage = ref<number>(1)
export const pageSize = ref<number>(15)

export const dialogVisible=ref<boolean>(false)

const row=ref<PermissionType>({})
const type=ref<string>('')


 

export const handleSearch = async () => {
 
  const params = {
    transCode: '51002',
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    ...searchForm
  }
 
  const {code,recordList,recordCount}= await useSearchPage(`/gateway/rbac/${params.transCode}`,params) 
  if(code!=='0') return 
  permissionList.value =recordList as Array<PermissionType>
  total.value = recordCount

  useResetPermission()

   
}
 


//provide() can only be used inside setup().

export const handleAdd = () => {
  handleDialogVisible(true)
  row.value={}
  type.value='add'
}
export const handleView = (data:PermissionType) => {
  handleDialogVisible(true)
  row.value=data
  type.value='view'
}
export const handleEdit = (data:PermissionType) => {
  handleDialogVisible(true)
  row.value=data
  type.value='edit'
}
export const handleDelete =  (data:PermissionType) => {
  ElMessageBox.confirm( '此操作将永久删除该权限, 是否继续?', '提示', {
    type:'warning',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }).then(() => {
       doDelete(data)
    }).catch((action: Action) => {
      ElMessage({
        type: 'warning',
        message:
          action === 'cancel'
            ? '已取消删除'
            : 'Stay in the current route',
      })
    })
}

const doDelete= async(data:PermissionType)=>{
  const params = {
    transCode: '54001',
    permissionId: data.permissionId
  }
  const {code}= await usePostApi(`/gateway/rbac/${params.transCode}`, params)
  if(code!=='0') return 
  wxmAlert('删除成功')
  handleSearch()
}
 
export const handleDeleteBatch = (selection:any) => {
  if (!selection ||!Array.isArray(selection) ||selection.length === 0) {
    wxmAlert('请先选择要删除的记录', 'error')
    return false
  }


  ElMessageBox.confirm( '此操作将永久删除该权限, 是否继续?', '提示', {
    type:'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(() => {
     doDeleteBatch(selection)
  }).catch((action: Action) => {
    ElMessage({
      type: 'warning',
      message:
        action === 'cancel'
          ? '已取消删除'
          : 'Stay in the current route',
    })
  })
 
}

const doDeleteBatch= async(selection:Array<PermissionType>)=>{
  const params = {
    transCode: '54002',
    list: selection.map(item => item.permissionId)
  }
  const {code}= await usePostApi(`/gateway/rbac/${params.transCode}`, params)
  if(code!=='0') return 
  wxmAlert('删除成功')
  handleSearch()
}


export const handleReload = () => {
  handleSearch()
}
export const handleDialogVisible=(visible:boolean):void=>{
  dialogVisible.value=visible
}

const doEdit=async(data:PermissionType)=>{
  const params = {
      transCode: '53001',
      ...data
    }
    params.permissionStatus= params.permissionStatus==='1'?'0':'1'
  const {res,err}=await usePostTo(`/gateway/rbac/${params.transCode}`,params) as ResultType
  if(err){
      wxmAlert(err.message||err,'error')
      return false
  }
  if("0"!==res.code){
      wxmAlert(res.message,'error')
      return false
  }
  wxmAlert('状态修改完成')
  handleSearch()
}

export const colList = ref<BaseType<any>[]>([
  { type: 'selection', show: true, width: '55', fixed: 'left' },
  { type: 'index', label: "序号", show: true, width: '55', fixed: 'left' },
  { prop: 'permissionId', label: '权限ID', show: true, width: '110' },
  { prop: 'permissionCode', label: '权限编码', show: true, width: '120',align:'left' },
  { prop: 'permissionName', label: '权限名称', show: true,align:'left'  },
  { prop: 'permissionType', label: '类型', show: true, formatter: (row: any) => useFormatRbacDict(row, 'permissionType') },
  { prop: 'permissionStatus', label: '状态', show: true, formatter: (row: any) => useFormatRbacDict(row, 'permissionStatus') ,
  ops:[
    {value:'0',render:doEdit,content:'置为有效',permission: ['rbac-permission:edit'],type:'danger'},
    {value:'1',render:doEdit,content:'置为无效',permission: ['rbac-permission:edit'],type:'success'}
]},
  { prop: 'createTime', label: '创建时间', show: true },
  { prop: 'creator', label: '创建者', show: false },
  { prop: 'updateTime', label: '更新时间', show: true },
  { prop: 'operator', label: '最近一次操作者', show: true, width: '120' },
  { prop: 'permissionDesc', label: '描述', show: true, width: '120' },
  //  element 图标 直接传入字符，View  因为已经全局引入，直接出入名称，应用的时候，都是：View格式，
  // 如果直接把图标传入，提示动态出入插件警告
  {
    prop: 'ops', label: '操作', show: true, width: '180', fixed: 'right', children: [
      { permission: ['rbac-permission:view'], icon: 'View', type: 'success', render: handleView },
      { permission: ['rbac-permission:edit'], icon: 'EditPen', type: 'primary', render: handleEdit },
      { permission: ['rbac-permission:delete'], icon: 'Delete', type: 'danger', render: handleDelete },
    ]
  },
])





export const init = () => {
  // mounted
  onMounted(() => {
    initDicPermission();
    handleSearch();
  });
  
  provide(ConditionButtonKey, {
    colList,
    data: { dataList: permissionList, fileName: '权限信息', sheetName: '权限信息' },
    add: handleAdd,
    deleteBatch:handleDeleteBatch,
    // exportAll:handleExportAll,
    reload: handleReload
  })
  
  provide(PaginationKey, {
    total,
    currentPage,
    pageSize,
    search: handleSearch
  })

  // 上面的 PaginationKey已经给子组件注入了handleSearch，当是为了
  provide(RbacInfoKey,{
    visible:handleDialogVisible,
    search: handleSearch
  })

  provide(RbacInfoRowKey,{
    row,
    type
  })

  return { Search, RefreshLeft ,dialogVisible}
}




