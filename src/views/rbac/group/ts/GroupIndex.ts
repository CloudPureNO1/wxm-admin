import { ref, reactive, computed, provide, onMounted } from 'vue'
import type { Ref } from 'vue'
import type { FormInstance } from 'element-plus'
import type { GroupType, BaseType, PagingQueryResultsType ,ApiResultType} from '../../../../comm/type'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useLayoutStore } from "../../../..//store/layout";
import { useRbacStore } from "../../../..//store/rbac";
import { useSearchPage, usePostApi } from '../../../../composable/ApiBaseCall';
import { ConditionButtonKey, PaginationKey, RbacInfoRowKey, RbacInfoKey } from '../../../../symbol/Symbol'
import { useFormatRbacDict } from '../../../../composable/formatDict';
import { wxmAlert } from "../../../../util/commFn"
import { initDicGroup } from '../../../../composable/InitDictionary'

export const init = (wxmTableRef: Ref<any>) => {
    // data start
    //info start
    const dialogVisibleType=ref<string>('0') // 0 标识用户组信息管理，1 标识 用户管理 2 标识权限管理
    const dialogVisible = ref<boolean>(false)
    const row = ref<GroupType>({})
    const type = ref<string>()
    // info end

    const layoutStore = useLayoutStore()
    const rbacStore = useRbacStore()
    const size = computed(() => {
        return layoutStore.size
    })
    const dicts = computed(() => {
        return { 'groupTypeDicts': rbacStore.groupTypeDicts, 'groupStatusDicts': rbacStore.groupStatusDicts }
    })

    // 
    const groupList = ref<Array<GroupType>>([])
    const total = ref<number>(0)
    const currentPage = ref<number>(1)
    const pageSize = ref<number>(15)

    const searchForm = reactive<GroupType>({})
    const searchFormRef = ref<FormInstance>()
    // data end

    // methods start
    const handleSearch = async () => {
        const params = {
            transCode: '21002',
            currentPage: currentPage.value,
            pageSize: pageSize.value,
            ...searchForm
        }
        const { recordList, recordCount } = await useSearchPage(`/gateway/rbac/${params.transCode}`, params) as PagingQueryResultsType
        groupList.value = recordList as Array<GroupType>
        total.value = recordCount
    }
    const handleDelete = (data: GroupType) => {
        ElMessageBox.confirm('此操作将永久删除用户, 是否继续?', '提示', {
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        }).then(() => {
            doDelete(data)
        }).catch(() => {
            ElMessage({
                type: 'warning',
                message: '已取消删除'
            })
        })
    }
    const doDelete = async (data: GroupType) => {
        const params = {
            transCode: '24001',
            groupId: data.groupId
        }
        const { code } = await usePostApi(`/gateway/rbac/${params.transCode}`, params)
        if (code !== '0') return
        wxmAlert('删除成功')
        handleSearch()
    }
    const handleDeleteBatch = (selection: Array<GroupType>) => {
        if (!selection || !Array.isArray(selection) || selection.length === 0) {
            wxmAlert('请先选择要删除的记录', 'error')
            return false
        }


        ElMessageBox.confirm('此操作将永久删除用户, 是否继续?', '提示', {
            type: 'warning',
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
    const doDeleteBatch = async (selection: Array<GroupType>) => {
        const params = {
            transCode: '24004',
            list: selection.map(item => item.groupId)
        }
        const { code } = await usePostApi(`/gateway/rbac/${params.transCode}`, params)
        if (code !== '0') return
        wxmAlert('删除成功')
        handleSearch()
    }

    const handleDialogVisible = (visible: boolean,type?:string): void => {
        dialogVisible.value = visible
        dialogVisibleType.value=(!type?'0':type ) as string
    }
    const handleAdd = () => {
        handleDialogVisible(true)
        row.value = {}
        type.value = 'add'
    }
    const handleView = (data: GroupType) => {
        handleDialogVisible(true)
        row.value = data
        type.value = 'view'
    }
    const handleEdit = (data: GroupType) => {
        handleDialogVisible(true)
        row.value = data
        type.value = 'edit'
    }
    const handleExportAll = () => {

    }
    const handleReload = () => {
        handleSearch()
    }
    const handleUser=(data:GroupType)=>{
        handleDialogVisible(true,"1")
        row.value = data
    }
    const handleRole=(data:GroupType)=>{
        handleDialogVisible(true,"2")
        row.value = data
    }
    const doEdit = async (data:GroupType) => {
        const params = {
            transCode: '23001',
            ...data
        }
        params.groupStatus=params.groupStatus==='1'?'0':'1'
        const { code } = await usePostApi(`/gateway/rbac/${params.transCode}`, params) as ApiResultType
 
        if ("0" !== code) return 
        wxmAlert('状态修改完成')
        handleSearch()
    }
    //methods end


    // 表格数据
    const colList = ref<BaseType<any>[]>([
        { type: 'selection', show: true, width: '55', fixed: 'left' },
        { type: 'index', label: "序号", show: true, width: '55', fixed: 'left' },
        { prop: 'groupId', label: '用户组ID', show: true, width: '110' },
        { prop: 'groupCode', label: '用户组编码', show: false },
        { prop: 'groupName', label: '用户组名称', show: true, width: '120' },
        { prop: 'groupType', label: '用户组类别', show: true, formatter: (row: any) => useFormatRbacDict(row, 'groupType') },
        { prop: 'groupStatus', label: '用户组状态', show: true, formatter: (row: any) => useFormatRbacDict(row, 'groupStatus'),ops:[
            {value:'0',render:doEdit,content:'置为有效',permission: ['rbac-group:edit'],type:'danger'},
            {value:'1',render:doEdit,content:'置为无效',permission: ['rbac-group:edit'],type:'success'}
        ]},
        { prop: 'createTime', label: '创建时间', show: true },
        { prop: 'creator', label: '创建者', show: true },
        { prop: 'updateTime', label: '更新时间', show: true },
        { prop: 'operator', label: '最近一次操作者', show: true, width: '120' },
        { prop: 'groupDesc', label: '描述', show: true, width: '120' },
        { prop: 'ops', label: '操作', show: true, width: '180', fixed: 'right', children: [
                { permission: ['rbac-group:view'], icon: 'View', type: 'success', render: handleView },
                { permission: ['rbac-group:edit'], icon: 'EditPen', type: 'primary', render: handleEdit },
                { permission: ['rbac-group:delete'], icon: 'Delete', type: 'danger', render: handleDelete },
                { permission: ['rbac-group:user_manage'], icon: 'User', type: 'primary', render: handleUser ,content:'用户管理'},
                { permission: ['rbac-group:role_manage'], icon: 'Stamp', type: 'warning', render: handleRole ,content:'角色管理'},
            ]
        },
    ])

    // 用户批量删除
    provide('wxmTableRef', wxmTableRef)
    // 公共按钮组件
    provide(ConditionButtonKey, {
        colList: colList,
        data: { dataList: groupList, fileName: '用户组', sheetName: '用户组信息' },
        add: handleAdd,
        deleteBatch: handleDeleteBatch,
        exportAll: handleExportAll,
        reload: handleReload
    })
    //分页组件
    provide(PaginationKey, {
        total,
        currentPage,
        pageSize,
        search: handleSearch
    })

    // 初始化info界面的参数
    provide(RbacInfoRowKey, {
        row,
        type
    })
    // info 界面回调父界面方法
    provide(RbacInfoKey, {
        visible: handleDialogVisible,
        search: handleSearch
    })

    // life cycle methods
    onMounted(() => {
        initDicGroup()
        handleSearch()
    })
    return { size, dicts, searchForm, searchFormRef, groupList, colList,dialogVisibleType, dialogVisible, handleSearch }
}