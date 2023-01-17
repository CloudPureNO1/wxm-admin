import {onMounted, ref,provide} from 'vue'
import type {BaseType,QuartzJobType,PagingQueryResultsType} from '../../../../comm/type'
import  { ElMessageBox ,ElMessage} from 'element-plus'
import { useFormatRbacDict } from '../../../../composable/formatDict';
import { initDictQuartz } from '../../../../composable/InitDictionary';
import { useSearchPage ,usePostApi} from '../../../../composable/ApiBaseCall';
import { ConditionButtonKey ,PaginationKey,RbacInfoKey,RbacInfoRowKey} from '../../../../symbol/Symbol'
import { wxmAlert } from "../../../../util/commFn"

export const init=()=>{

  // 响应式变量
  const tableData=ref<QuartzJobType[]>([])
  const total=ref<number>(0)
  const pageSize=ref<number>(14)
  const currentPage=ref<number>(1)

  const panelRef=ref<any>()
  const searchForm=ref<QuartzJobType>()

  // info
  const dialogVisible=ref<boolean>(false)
  const dialogFullscreen=ref<boolean>(false)
  const type=ref<string>('')
  const row=ref<QuartzJobType>({})
  // methods start

    const handleSearch = async () => {
      const params = {
        transCode: '11003',
        currentPage: currentPage.value,
        pageSize: pageSize.value,
        dataXFlag: '1',
        ...searchForm.value
      }
    
      const {code,recordList,recordCount}= await useSearchPage(`/gateway/quartz/${params.transCode}`,params) as PagingQueryResultsType
      if(code!=='0') return 
      tableData.value =recordList as Array<QuartzJobType>
      total.value = recordCount
    }
    const handleAdd = () => {
      handleDialogVisible(true)
      row.value={}
      type.value='add'
    }
     const handleView = (data:QuartzJobType) => {
      handleDialogVisible(true)
      row.value=data
      type.value='view'
    }
     const handleEdit = (data:QuartzJobType) => {
      handleDialogVisible(true)
      row.value=data
      type.value='edit'
    }
    const handleReload = () => {
      handleSearch()
      panelRef.value.removeOthersContent()
    }
     const handleDialogVisible=(visible:boolean):void=>{
      dialogVisible.value=visible
    }
    const handleExportAll=()=>{}
    const handleDelete =  (data:QuartzJobType) => {
      ElMessageBox.confirm( '此操作将永久删除定时任务, 是否继续?', '提示', {
        type:'warning',
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
    
    const doDelete= async(data:QuartzJobType)=>{
      const params = {
        transCode: '14001',
        ...data
      }
      const {code}= await usePostApi(`/gateway/quartz/${params.transCode}`, params)
      if(code!=='0') return 
      wxmAlert('删除成功')
      handleSearch()
    }
     
     const handleDeleteBatch = (selection:QuartzJobType) => {
      if (!selection ||!Array.isArray(selection) ||selection.length === 0) {
        wxmAlert('请先选择要删除的记录', 'error')
        return false
      }
    
    
      ElMessageBox.confirm( '此操作将永久删除定时任务, 是否继续?', '提示', {
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
    
    const doDeleteBatch= async(selection:Array<QuartzJobType>)=>{
      const params = {
        transCode: '',// 暂无后端方法
        list: selection
      }
      const {code}= await usePostApi(`/gateway/quartz/${params.transCode}`, params)
      if(code!=='0') return 
      wxmAlert('删除成功')
      handleSearch()
    }
    
    const handlePause= async(data:QuartzJobType)=>{
      const params = {
        transCode: '15001',
        ...data
      }
      const {code}= await usePostApi(`/gateway/quartz/${params.transCode}`, params)
      if(code!=='0') return 
      wxmAlert('定时任务停止成功')
      handleSearch()
    }
    const handleResume= async(data:QuartzJobType)=>{
      const params = {
        transCode: '16001',
        ...data
      }
      const {code}= await usePostApi(`/gateway/quartz/${params.transCode}`, params)
      if(code!=='0') return 
      wxmAlert('定时任务恢复成功')
      handleSearch()
    }
    // methods end

    const colList = ref<BaseType<any>[]>([
        { type: 'selection', show: true, width: '55', fixed: 'left' },
        { type: 'index', label: "序号", show: true, width: '55', fixed: 'left' },
        { prop: 'schedName', label: '调度名称', show: false, width: '110'},
        { prop: 'triggerName', label: '定时任务触发器名', show: false, width: '110'},
        { prop: 'triggerGroup', label: '定时任务触发器组', show: false, width: '110'},
        { prop: 'jobName', label: '定时任务名', show: true, width: '120' ,search:{elType:'input'}},
        { prop: 'jobGroup', label: '定时任务组', show: true, width: '120' ,search:{elType:'input'}},
        { prop: 'nextFireTime', label: '下一次触发时间', show: true },
        { prop: 'prevFireTime', label: '上一次触发时间', show: true },
        { prop: 'priority', label: '优先级', show: true },
        // { prop: 'triggerState', label: '当前触发器状态', show: true, formatter: (row:any)=>useFormatRbacDict(row,'triggerState'),search:{elType:'select',dicts:dictsStatus}},
        // 总共三个字典文件：rbac,biz,others
        { prop: 'triggerState', label: '当前触发器状态', show: true, formatter: (row:any)=>useFormatRbacDict(row,'triggerState'),search:{elType:'select',piniaDict:'rbac'},
        ops:[
          {value:'ACQUIRED',render:handlePause,content:'停止任务',permission: ['quartz-ordinary:pause'],type:'success'},
          {value:'WAITING',render:handlePause,content:'停止任务',permission: ['quartz-ordinary:pause'],type:'primary'},
          {value:'BLOCKED',render:handlePause,content:'停止任务',permission: ['quartz-ordinary:pause'],type:'danger'},
          {value:'ERROR',render:handlePause,content:'停止任务',permission: ['quartz-ordinary:pause'],type:'danger'},
          {value:'PAUSED',render:handleResume,content:'恢复任务',permission: ['quartz-ordinary:resume'],type:'danger'}
      ]},
        { prop: 'triggerType', label: '触发器的类型', show: true, formatter: (row:any)=>useFormatRbacDict(row,'triggerType')},
        // { prop: 'areaCode', label: '统筹区', show: true, width: '120',search:{elType:'cascader',options:options,props:cascaderProps}},
        { prop: 'timeZoneId', label: '时区', show: true },
        { prop: 'cronExpression', label: 'Cron表达式', show: true },
        { prop: 'startTime', label: '开始时间', show: true },
        { prop: 'endTime', label: '结束时间', show: false },
        { prop: 'calendarName', label: '日程表名称', show: false },
        { prop: 'misfireInstr', label: '措施或者是补偿执行的策略', show: false },
        { prop: 'jobClassName', label: '定时任务类名称', show: false },
        { prop: 'description', label: '详细描述信息', show: false },
        { prop: 'jobData', label: 'JOB_DATA', show: false },
        {
          prop: 'ops', label: '操作', show: true, width: '180', fixed: 'right', children: [
            { permission: ['quartz-datax:view'], icon: 'View', type: 'success', render: handleView },
            { permission: ['quartz-datax:edit'], icon: 'EditPen', type: 'primary', render: handleEdit },
            { permission: ['quartz-datax:delete'], icon: 'Delete', type: 'danger', render: handleDelete },
            { permission: ['quartz-datax:resume'], icon: 'VideoPlay', type: 'primary', render: handleResume,content:'恢复'},
            { permission: ['quartz-datax:pause'], icon: 'VideoPause', type: 'warning', render: handlePause,content:'停止'},
          ]
        },
      ])
      provide(ConditionButtonKey, {
        colList,
        data:{dataList:tableData,fileName:'定时任务信息',sheetName:'定时任务信息'},
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
        searchForm.value=panelRef.value.searchForm
        initDictQuartz()
        handleSearch()
    })

    return {panelRef,tableData,dialogVisible,dialogFullscreen}
}
