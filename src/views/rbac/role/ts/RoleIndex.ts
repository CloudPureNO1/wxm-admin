import { ref, reactive, provide, onMounted } from 'vue'
import type {Ref} from 'vue'
import type { RoleType, BaseType,ResultType } from '../../../../comm/type'
import { ConditionButtonKey, PaginationKey, RbacInfoKey, RbacInfoRowKey} from '../../../../symbol/Symbol'

import { ElMessageBox, ElMessage } from 'element-plus'
import type { Action } from 'element-plus'
import { initDicRole } from '../../../../composable/InitDictionary'
import { useFormatRbacDict } from '../../../../composable/formatDict'

import { useResetPermission } from '../../../../composable/sessionStorePermission'
import { useSearchPage, usePostApi } from '../../../../composable/ApiBaseCall'
import { wxmAlert } from '../../../../util/commFn'
import { usePostTo } from '../../../../composable/HttpApi'

// 响应式变量
export const searchForm = reactive<RoleType>({})
export const searchFormRef = ref()




export const roleList = ref<Array<RoleType>>([])
const total = ref<number>(0)
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)

// info 界面
export const dialogVisibleType=ref<string>('0') // 0 标识用户组信息管理，1 标识 用户管理 2 标识权限管理
export const dialogVisible = ref<boolean>(false)
const type = ref<string>('')
const row = ref<RoleType>({})

//methods start
export const handleSearch = async () => {
    const params = {
        transCode: '31002',
        currentPage: currentPage.value,
        pageSize: pageSize.value,
        ...searchForm
    }
    const { code, recordList, recordCount } = await useSearchPage(`/gateway/rbac/${params.transCode}`, params)
    if (code !== '0') return
    roleList.value = recordList as Array<RoleType>
    total.value = recordCount

    useResetPermission()
}
const handleView = (data: RoleType) => {
    row.value = data
    type.value = 'view'
    handleDialogVisible(true)
}
const handleAdd = () => {
    type.value = 'add'
    handleDialogVisible(true)
}
const handleEdit = (data: RoleType) => {
    row.value = data
    type.value = 'edit'
    handleDialogVisible(true)
}
const handleDelete = async (data: RoleType) => {
    ElMessageBox.confirm('此操作将永久删除该角色及关联信息, 是否继续?', '提示', {
        type: 'warning',
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

const doDelete= async(data:RoleType)=>{
    const params = {
      transCode: '34001',
      roleId: data.roleId
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
    
    
      ElMessageBox.confirm( '此操作将永久删除该角色, 是否继续?', '提示', {
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

const doDeleteBatch= async(selection:Array<RoleType>)=>{
    const params = {
      transCode: '34004',
      list: selection.map(item => item.roleId)
    }
    const {code}= await usePostApi(`/gateway/rbac/${params.transCode}`, params)
    if(code!=='0') return 
    wxmAlert('删除成功')
    handleSearch()
  }
const handleReload = () => {
    handleSearch()
}
const handleDialogVisible = (visible: boolean,type?:string): void => {
    dialogVisible.value = visible
    dialogVisibleType.value=(!type?'0':type ) as string
}
const handlePermission=(data:RoleType)=>{
    handleDialogVisible(true,"1")
    row.value = data
}
const handleApi=(data:RoleType)=>{
    handleDialogVisible(true,"2")
    row.value = data
}
const doEdit=async(data:RoleType)=>{
    const params = {
        transCode: '33001',
        ...data
      }
      params.roleStatus=params.roleStatus==='1'?'0':'1'
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
// methods end

export const colList = ref<BaseType<any>[]>([
    { type: 'selection', show: true, width: '55', fixed: 'left' },
    { type: 'index', label: "序号", show: true, width: '55', fixed: 'left' },
    { prop: 'roleId', label: '角色ID', show: '1', width: '110' },
    { prop: 'roleCode', label: '角色编码', show: true, width: '120', align: 'left' },
    { prop: 'roleName', label: '角色名称', show: true, align: 'left' },
    { prop: 'roleType', label: '角色类型', show: true, formatter: (row: any) => useFormatRbacDict(row, 'roleType') },
    { prop: 'roleStatus', label: '角色状态', show: true, formatter: (row: any) => useFormatRbacDict(row, 'roleStatus'),  ops:[
        {value:'0',render:doEdit,content:'置为有效',permission: ['rbac-role:edit'],type:'danger'},
        {value:'1',render:doEdit,content:'置为无效',permission: ['rbac-role:edit'],type:'success'}
    ]},

    { prop: 'createTime', label: '创建时间', show: false },
    { prop: 'creator', label: '创建者', show: false },
    { prop: 'updateTime', label: '更新时间', show: false },
    { prop: 'operator', label: '最近一次操作者', show: false, width: '120' },
    { prop: 'roleDesc', label: '描述', show: false, width: '120' },
    //  element 图标 直接传入字符，View  因为已经全局引入，直接出入名称，应用的时候，都是：View格式，
    // 如果直接把图标传入，提示动态出入插件警告
    {
        prop: 'ops', label: '操作', show: true, width: '180', fixed: 'right', children: [
            { permission: ['rbac-role:view'], icon: 'View', type: 'success', render: handleView },
            { permission: ['rbac-role:edit'], icon: 'EditPen', type: 'primary', render: handleEdit },
            { permission: ['rbac-role:delete'], icon: 'Delete', type: 'danger', render: handleDelete },
            { permission: ['rbac-role:permission_manage'], icon: 'Flag', type: 'primary', render: handlePermission ,content:'权限管理'},
            { permission: ['rbac-role:api_manage'], icon: 'Document', type: 'warning', render: handleApi ,content:'接口管理'},

        ]
    },
])


export const init = (wxmTableRef:Ref<any>,roleResourceRef:Ref<any> ) => {
    const handleRowClick=(data:RoleType)=>{
        roleResourceRef.value.handleSearch(data.roleId)
        // rolePermissionRef.value.handleSearch(data.roleId)
        // roleApiRef.value.handleSearch(data.roleId)
    }
    
    provide('wxmTableRef',wxmTableRef) // 在所有子界面中可以获取Wxm-table 暴露的数据或方法
 

    // mounted
    onMounted(() => {
        initDicRole();
        handleSearch();
    });

    provide(ConditionButtonKey, {
        colList,
        data: { dataList: roleList, fileName: '角色信息', sheetName: '角色信息' },
        add: handleAdd,
        deleteBatch: handleDeleteBatch,
        // exportAll:handleExportAll,
        reload: handleReload
    })

    provide(PaginationKey, {
        total,
        currentPage,
        pageSize,
        search: handleSearch,
        rowClick:handleRowClick
    })

    // 上面的 PaginationKey已经给子组件注入了handleSearch，当是为了
    provide(RbacInfoKey, {
        visible: handleDialogVisible,
        search: handleSearch
    })

    provide(RbacInfoRowKey, {
        row,
        type
    })

 
}