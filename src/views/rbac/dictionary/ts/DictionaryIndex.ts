import { ref, reactive, provide, computed, onMounted } from 'vue'

import { ElMessageBox, ElMessage, type FormInstance } from 'element-plus'
import type { Action } from 'element-plus'

import type { DictType, BaseType ,ApiResultType} from '../../../../comm/type'
import { ConditionButtonKey ,PaginationKey,RbacInfoKey,RbacInfoRowKey} from '../../../../symbol/Symbol'
import { useSearchPage, usePostApi } from '../../../../composable/ApiBaseCall'
import { wxmAlert } from '../../../../util/commFn'

import { useLayoutStore } from '../../../../store/layout'


const formatDictStatus = (row: DictType) => {
    if (row.dictStatus === '1') return '有效'
    if (row.dictStatus === '0') return '无效'
    return row.dictStatus
}
export const init = () => {
    const layoutStore = useLayoutStore()
    const store = computed(() => {
        return {
            size: layoutStore.size,
            dictStatus: [
                { dictLabel: '无效', dictValue: '0' },
                { dictLabel: '有效', dictValue: '1' }
            ]
        }
    })

    const wxmTableRef = ref<any>()
    const searchForm = reactive<DictType>({})
    const searchFormRef = ref<FormInstance>()
    const dictionaryList = ref<DictType[]>([])
    const total = ref<number>(0)
    const currentPage = ref<number>(1)
    const pageSize = ref<number>(10)
    // info 界面
    const dialogVisible = ref<boolean>(false)
    const type = ref<string>('')
    const row = ref<DictType>({})



    const handleView = (data: DictType) => {
        row.value = data
        type.value = 'view'
        handleDialogVisible(true)
    }
    const handleAdd = () => {
        row.value={}
        type.value = 'add'
        handleDialogVisible(true)
    }
    const handleEdit = (data: DictType) => {
        row.value = data
        type.value = 'edit'
        handleDialogVisible(true)
    }
    const handleReload = () => {
        handleSearch()
    }
    const handleDialogVisible = (visible: boolean) => {
        dialogVisible.value = visible
    }
    const handleSearch = async () => {
        const params = {
            transCode: '61003',
            currentPage: currentPage.value,
            pageSize: pageSize.value,
            ...searchForm
        }
        const { code, recordList, recordCount } = await useSearchPage(`/gateway/rbac/${params.transCode}`, params)
        if (code !== '0') return
        dictionaryList.value = recordList as Array<DictType>
        total.value = recordCount

    }
    const handleDelete = async (data: DictType) => {
        ElMessageBox.confirm('此操作将永久删除该字典, 是否继续?', '提示', {
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
    const doDelete = async (data: DictType) => {
        const params = {
            transCode: '64001',
            dictId: data.dictId
        }
        const { code } = await usePostApi(`/gateway/rbac/${params.transCode}`, params)
        if (code !== '0') return
        wxmAlert('删除成功')
        handleSearch()
    }
    const handleDeleteBatch = (selection: any) => {
        if (!selection || !Array.isArray(selection) || selection.length === 0) {
            wxmAlert('请先选择要删除的记录', 'error')
            return false
        }


        ElMessageBox.confirm('此操作将永久删除该字典, 是否继续?', '提示', {
            type: 'warning',
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

    const doDeleteBatch = async (selection: Array<DictType>) => {
        const params = {
            transCode: '64002',
            list: selection.map(item => item.dictId)
        }
        const { code } = await usePostApi(`/gateway/rbac/${params.transCode}`, params)
        if (code !== '0') return
        wxmAlert('删除成功')
        handleSearch()
    }

    const doEdit = async (data:DictType) => {
        const params = {
            transCode: '63001',
            ...data
        }
        params.dictStatus=params.dictStatus==='1'?'0':'1'
        const { code } = await usePostApi(`/gateway/rbac/${params.transCode}`, params) as ApiResultType
        if(code!=='0') return
  
        wxmAlert('状态修改完成')
        handleSearch()
    }

    const colList = ref<BaseType<any>[]>([
        { type: 'selection', show: true, width: '55', fixed: 'left' },
        { type: 'index', label: "序号", show: true, width: '55', fixed: 'left' },
        { prop: 'dictId', label: '字典ID', show: '1', width: '110' },
        { prop: 'dictType', label: '字典类别', show: true, width: '120', align: 'left' },
        { prop: 'dictValue', label: '字典值', show: true, align: 'left' },
        { prop: 'dictLabel', label: '字典中文名称', show: true, align: 'left' },
        { prop: 'dictParentValue', label: '父字典值', show: true, align: 'left' },
        { prop: 'orderNum', label: '同类型字典排序', show: true, align: 'left' },
        { prop: 'dictStatus', label: '字典状态', show: true, formatter: (row: any) => formatDictStatus(row), status: true ,
        ops:[
            {value:'0',render:doEdit,content:'置为有效',permission: ['rbac-permission:edit'],type:'danger'},
            {value:'1',render:doEdit,content:'置为无效',permission: ['rbac-permission:edit'],type:'success'}
        ]},
        //  element 图标 直接传入字符，View  因为已经全局引入，直接出入名称，应用的时候，都是：View格式，
        // 如果直接把图标传入，提示动态出入插件警告
        {
            prop: 'ops', label: '操作', show: true, width: '180', fixed: 'right', children: [
                { permission: ['rbac-dict:view'], icon: 'View', type: 'success', render: handleView },
                { permission: ['rbac-dict:edit'], icon: 'EditPen', type: 'primary', render: handleEdit },
                { permission: ['rbac-dict:delete'], icon: 'Delete', type: 'danger', render: handleDelete },

            ]
        },
    ])

    provide(ConditionButtonKey, {
        colList,
        data: { dataList: dictionaryList, fileName: '字典信息', sheetName: '字典信息' },
        add: handleAdd,
        deleteBatch: handleDeleteBatch,
        // exportAll:handleExportAll,
        reload: handleReload
    })
    provide(PaginationKey, {
        total,
        currentPage,
        pageSize,
        search: handleSearch
    })
    provide(RbacInfoKey, {
        visible: handleDialogVisible,
        search: handleSearch
    })
    provide(RbacInfoRowKey, {
        row,
        type
    })
    provide('wxmTableRef',wxmTableRef)
    onMounted(()=>{
        handleSearch()
    })

    return { store, wxmTableRef, searchForm, searchFormRef, colList, dictionaryList, dialogVisible, handleSearch }
}