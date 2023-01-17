import { reactive, ref, onMounted, provide } from "vue"
import type { FormInstance ,Action} from 'element-plus'
import type { SearchUserType, UserType, PagingQueryResultsType, BaseType ,ResultType} from '../../../../comm/type'
import  { ElMessageBox ,ElMessage} from 'element-plus'
import { useFormatRbacDict } from '../../../../composable/formatDict';
import { useSearchPage ,usePostApi} from '../../../../composable/ApiBaseCall';
import { initDictUser } from '../../../../composable/InitDictionary';

import { ConditionButtonKey ,PaginationKey,RbacInfoKey,RbacInfoRowKey} from '../../../../symbol/Symbol'
import { wxmAlert } from "../../../../util/commFn"
import { usePostTo } from '../../../../composable/HttpApi'
 
 

export const init = () => {
  //info
  const dialogVisible=ref<boolean>(false)
  const row=ref<UserType>({})
  const type=ref<string>('')
  // 响应式变量
 const searchForm = reactive<SearchUserType>({})
 const searchFormRef = ref<FormInstance>()


 const userList = ref<UserType[]>([])
 const total = ref<number>(0)
 const currentPage = ref<number>(1)
 const pageSize = ref<number>(10)



// methods start

 const handleSearch = async () => {
  const params = {
    transCode: '11002',
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    ...searchForm
  }
 
  const {code,recordList,recordCount}= await useSearchPage(`/gateway/rbac/${params.transCode}`,params) as PagingQueryResultsType
  if(code!=='0') return 
  userList.value =recordList as Array<UserType>
  total.value = recordCount
}


//provide() can only be used inside setup().

 const handleAdd = () => {
  handleDialogVisible(true)
  row.value={}
  type.value='add'
}
 const handleView = (data:UserType) => {
  handleDialogVisible(true)
  row.value=data
  type.value='view'
}
 const handleEdit = (data:UserType) => {
  handleDialogVisible(true)
  row.value=data
  type.value='edit'
}
 const handleDelete =  (data:UserType) => {
  ElMessageBox.confirm( '此操作将永久删除用户, 是否继续?', '提示', {
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

const doDelete= async(data:UserType)=>{
  const params = {
    transCode: '14001',
    userId: data.userId
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

const doDeleteBatch= async(selection:Array<UserType>)=>{
  const params = {
    transCode: '14002',
    list: selection.map(item => item.userId)
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

const doEdit = async (data:UserType) => {
  const params = {
      transCode: '13001',
      ...data
  }
  params.userStatus=params.userStatus==='1'?'0':'1'
  const { res, err } = await usePostTo(`/gateway/rbac/${params.transCode}`, params) as ResultType
  if (err) {
      wxmAlert(err.message || err, 'error')
      return false
  }
  if ("0" !== res.code) {
      wxmAlert(res.message, 'error')
      return false
  }
  wxmAlert('状态修改完成')
  handleSearch()
}
// methods end

const colList = ref<BaseType<any>[]>([
  { type: 'selection', show: true, width: '55', fixed: 'left' },
  { type: 'index', label: "序号", show: true, width: '55', fixed: 'left' },
  { prop: 'userId', label: '用户ID', show: true, width: '110' },
  { prop: 'username', label: '用户名', show: true, width: '120' },
  { prop: 'passwd', label: '密码', show: false },
  { prop: 'userType', label: '类别', show: true, formatter: (row: any) => useFormatRbacDict(row, 'userType') },
  { prop: 'userRate', label: '等级', show: true, formatter: (row: any) => useFormatRbacDict(row, 'userRate') },
  { prop: 'userStatus', label: '状态', show: true, formatter: (row: any) => useFormatRbacDict(row, 'userStatus'),
  ops:[
    {value:'0',render:doEdit,content:'置为有效',permission: ['rbac-user:edit'],type:'danger'},
    {value:'1',render:doEdit,content:'置为无效',permission: ['rbac-user:edit'],type:'success'}
]},
  { prop: 'createTime', label: '创建时间', show: true },
  { prop: 'creator', label: '创建者', show: true },
  { prop: 'updateTime', label: '更新时间', show: true },
  { prop: 'operator', label: '最近一次操作者', show: true, width: '120' },
  { prop: 'userDesc', label: '描述', show: true, width: '120' },
  {
    prop: 'ops', label: '操作', show: true, width: '180', fixed: 'right', children: [
      { permission: ['rbac-user:view'], icon: 'View', type: 'success', render: handleView },
      { permission: ['rbac-user:edit'], icon: 'EditPen', type: 'primary', render: handleEdit },
      { permission: ['rbac-user:delete'], icon: 'Delete', type: 'danger', render: handleDelete },
    ]
  },
])

  // mounted
  onMounted(() => {
    initDictUser();
    handleSearch();
  });



  provide(ConditionButtonKey, {
    colList,
    data:{dataList:userList,fileName:'用户信息',sheetName:'用户信息'},
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

  return {searchForm,searchFormRef,colList,userList,dialogVisible,handleSearch}
}


// methods ===================end=======================



