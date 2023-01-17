import { computed, ref, reactive, onMounted, inject } from "vue";
import type { FormRules, FormInstance } from 'element-plus'
import type { BaseType, DBSourceType, DBTargeType, SpeedType, ErrorLimitType, ApiResultType } from '../../../../comm/type'
import { isEmpty } from "lodash";
import { RbacInfoRowKey,RbacInfoKey } from '../../../../symbol/Symbol'
import { useLayoutStore } from "../../../..//store/layout";
import { useReset } from "../../../../composable/baseOperator";
import { usePostApi } from "../../../../composable/ApiBaseCall";
import { wxmAlert } from "../../../../util/commFn";


export const initStaticData = () => {
    // 校验规则
    const rulesDBSource = reactive<FormRules>({
        name: [
            { required: true, message: '请输入数据库名称', trigger: ['blur', 'change'] },
            { min: 1, max: 100, message: '长度在1到100之间', trigger: ['blur', 'change'] },
        ],
        jdbcUrl: [
            { required: true, message: '请输入地址', trigger: ['blur', 'change'] },
        ],
        username: [
            { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
            { min: 3, message: '长度不能小于3', trigger: ['blur', 'change'] }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
            { min: 3, max: 20, message: '长度在3 到 20之间', trigger: ['blur', 'change'] }
        ]
    })
    const rulesDBTarget = reactive<FormRules>({
        name: [
            { required: true, message: '请输入数据库名称', trigger: ['blur', 'change'] },
            { min: 1, max: 100, message: '长度在1到100之间', trigger: ['blur', 'change'] },
        ],
        jdbcUrl: [
            { required: true, message: '请输入地址', trigger: ['blur', 'change'] },
        ],
        username: [
            { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
            { min: 3, message: '长度不能小于3', trigger: ['blur', 'change'] }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
            { min: 3, max: 20, message: '长度在3 到 20之间', trigger: ['blur', 'change'] }
        ],
        batchSize:[
            {required:true,message:'批量大小不能为空',trigger:['blur','change']}
        ],
        writeMode:[
            {required:true,message:'写入模式不能为空',trigger:['blur','change']}
        ]
    })
    const rulesQuartz=reactive<FormRules>({
        cron:[
            {required:true,message:'执行规则表达式不能为空',trigger:['blur','change']}
        ],
        selectedCron:[
            {required:true,message:'执行规则表达式不能为空',trigger:['blur','change']}
        ]
    })
    const rulesSpeed=reactive<FormRules>({
        channel:[
            {required:true,message:'最大并发数不能为空',trigger:['blur','change']}
        ],
        spByte:[
            {required:true,message:'传输速度不能为空',trigger:['blur','change']}
        ]
    })
    const rulesErrorLimit=reactive<FormRules>({
        record:[
            {required:true,message:'脏数据阀值不能为空',trigger:['blur','change']}
        ],
        percentage:[
            {required:true,message:'脏数据占比阀值不能为空',trigger:['blur','change']}
        ]
    })

    const crons: BaseType<string>[] = [
        { label: '10秒执行1次', value: '*/10 * * * * ?' },
        { label: '1分钟执行1次', value: '0 */1 * * * ?' },
        { label: '1小时执行1次', value: '0 0 */1 * * ?' },
        { label: '每天中午12:00执行任务', value: '0 0 12 * * ?' },
        { label: '每天上午09:00到下午17:00时间段内每隔半小时执行任务', value: '0 0/30 9-17 * * ?' },
        { label: '每月15日上午10:15执行任务', value: '0 15 10 15 * ?' },
        { label: '每个星期三中午12:00执行任务', value: '0 0 12 ? * WED' },
        { label: '每月最后一日上午12:00执行任务', value: '0 0 12 L * ?' },
        { label: '每月最后一个星期六上午10:15执行任务', value: '0 15 10 ? * 6L' },
        { label: '每周星期天凌晨1点执行一次', value: '0 0 1 ? * L' },
        { label: '每天的0点、13点、18点、21点都执行一次', value: '0 0 0,13,18,21 * * ?' },
        { label: '每月最后一天23点执行一次', value: '0 0 23 L * ?' },
        { label: '每月1号凌晨1点执行一次', value: '0 0 1 1 * ?' },
        { label: '每天23点执行一次', value: '0 0 23 * * ?' },
        { label: '每天1点执行一次', value: '0 0 1 * * ?' },
        { label: '每月第三个星期六上午10:15执行任务', value: '0 15 10 ? * 6#3' },
        { label: '自定义', value: '自定义' },
    ]
    const nameReaders: BaseType<string>[] = [
        { label: 'MySQL', value: 'mysqlreader' },
        { label: 'Oracle', value: 'oraclereader' },
        { label: 'SQLServer', value: 'sqlserverreader' },
        { label: 'OSS', value: 'ossreader' },
        { label: 'MongoDB', value: 'mongodbreader' }
    ]
    const nameWriters: BaseType<string>[] = [
        { label: 'MySQL', value: 'mysqlwriter' },
        { label: 'Oracle', value: 'oraclewriter' },
        { label: 'SQLServer', value: 'sqlserverwriter' },
        { label: 'OSS', value: 'osswriter' },
        { label: 'MongoDB', value: 'mongodbwriter' }
    ]
    const writeModes: string[] = ['insert', 'replace', 'update']

    return { rulesDBSource,rulesDBTarget,rulesQuartz,rulesSpeed,rulesErrorLimit, crons, nameReaders, nameWriters, writeModes }
}
// pinia store 数据
export const initStoreData = () => {
    const layoutStore = useLayoutStore()
    const size = computed(() => {
        return layoutStore.size
    })
    return { size }
}
// 响应式变量，后面init方法中需要用到的
 const initReactiveData = () => {
    // 响应式变量
    const formDisabled = ref<boolean>(false)
    const dbSource = ref<DBSourceType>({
        name: 'mysqlreader',//mysqlreader, // 默认mysql
        jdbcUrl: '',//, // 可以使用多个，但是不建议，多个使用都好分割
        password: '',//,
        username: '',//,
        fetchSize: 1024,// , // 默认1024，该配置项定义了插件和数据库服务器端每次批量数据获取条数，该值决定了DataX和服务器端的网络交互次数，能够较大的提升数据抽取性能，注意，该值过大(>2048)可能造成DataX进程OOM
        querySql: '',//, // 自定义sql,支持多表关联，当用户配置querySql时，直接忽略table、column、where条件的配置。
        splitPk: '',// , // 仅支持整形型数据切分；如果指定splitPk，表示用户希望使用splitPk代表的字段进行数据分片，如果该值为空，代表不切分，使用单通道进行抽取
        table: '',//, // 多个使用逗号分割
        column: '',//, // "*" 默认所有列,支持列裁剪，列换序,不建议使用*,多个字段使用都好分割
        where: '',//  // 指定的column、table、where条件拼接SQL，可以指定limit 10，也可以增量数据同步，如果该值为空，代表同步全表所有的信息
    })
    const dbTarget = ref<DBTargeType>({
        name: "mysqlwriter",// mysqlwriter, // 默认mysql
        jdbcUrl: '',// , // 只能一个数据源
        username: '',// ,
        password: '',//,
        batchSize: 1024,// 1024, // 默认值1024 一次性批量提交的记录数大小，该值可以极大减少DataX与Mysql的网络交互次数，并提升整体吞吐量。但是该值设置过大可能会造成DataX运行进程OOM情况。
        column: '',//, // 必须指定，不能留空；如果要依次写入全部列，使用表示, 例如: "column": [""]，强烈不建议,多个以逗号分割
        table: '',// , // 支持写入一个或者多个表。当配置为多张表时，必须确保所有表结构保持一致。多个以逗号分割
        preSql: '',// , // 写入数据到目的表前，会先执行这里的标准语句。例在导入表前先进行删除操作：["delete from 表名"] 多个以逗号分割
        postSql: '',//, // 写入数据到目的表后，会执行这里的标准语句。（原理同 preSql ） 多个以逗号分割
        session: '',// , // DataX在获取Mysql连接时，执行session指定的SQL语句，修改当前connection session属性
        writeMode: 'update'// update // 默认insert ，可选insert/replace/update
    })
    const quartzForm = ref<BaseType<string>>({
        cron: '0 0 */1 * * ?', // 每小时执行异常
        selectedCron:'0 0 */1 * * ?'
    })
    // 流量控制
    const speed = ref<SpeedType>({
        channel: 3, // 控制同步时的最大并发数
        // byte: 1048576 // 控制传输速度，单位为byte/s，DataX运行会尽可能达到该速度但是不超过它
        // byte 为Java 关键字，此处使用sByte(sbyte 是个其他系统关键字，不适用)
        spByte: 1048576 // 控制传输速度，单位为byte/s，DataX运行会尽可能达到该速度但是不超过它
    })
    const errorLimit = ref<ErrorLimitType>({
        record: 0, // 对脏数据最大记录数阈值（record值）或者脏数据占比阈值（percentage值，当数量或百分比，DataX Job报错退出
        percentage: 0 // 者脏数据占比阈值（percentage值，当数量或百分比，DataX Job报错退出
    })
    // mysql 时，设置为0，且不显示，其他的默认设置为1024，显示，可以修改
    const showFetchSize = ref<boolean>(false)
    const showHelp = ref<boolean>(false)
    return { formDisabled, dbSource, dbTarget, quartzForm, speed, errorLimit, showFetchSize, showHelp }
}
const refsData = () => {
    const dbSourceRef = ref<FormInstance>()
    const dbTargetRef = ref<FormInstance>()
    const quartzFormRef = ref<FormInstance>()
    const speedFormRef = ref<FormInstance>()
    const errorListFromRef = ref<FormInstance>()
    return { dbSourceRef, dbTargetRef, quartzFormRef, speedFormRef, errorListFromRef }
}

export const init = () => {

    const {  crons } = initStaticData()
    const { formDisabled, dbSource, dbTarget, quartzForm, speed, errorLimit, showFetchSize, showHelp } = initReactiveData()
    const { dbSourceRef, dbTargetRef, quartzFormRef, speedFormRef, errorListFromRef } = refsData()
    // inject start
    const { row, type } = inject(RbacInfoRowKey)
    const {visible,search} =inject(RbacInfoKey)
    // inject end
    // methods start
    const handleNameChanged = () => {
        // mysql 不能设置 fetchSize
        if (dbSource.value.name === 'mysqlreader') {
            dbSource.value.fetchSize = 0
            showFetchSize.value = false
        } else {
            dbSource.value.fetchSize = 1024
            showFetchSize.value = true
        }
    }
    const setSelectedCron = () => {
        const rs = crons.filter(item => item.value === quartzForm.value.cron)
        if (rs && rs.length !== 0) {
           quartzForm.value.selectedCron = rs[0].value
        } else {
            quartzForm.value.selectedCron = '自定义'
        }
    }
    const handleCronChange = () => {
        quartzForm.value.cron =quartzForm.value.selectedCron
    }
    const checkData = async (formEl: FormInstance | undefined): Promise<boolean> => {
       if (!formEl) return false
       return await formEl.validate((valid, fields) => {
            if (!valid) {
                let msg: string = '信息校验不通过'
                if (fields) {
                    msg += Object.values(fields).map(item => `【${item[0].message}】`).join(',')
                }
                wxmAlert(msg, 'error')
                return false
            }
            return true
        })
    }
    
    const handleSave = async() => {
        const dbSourceFlag=await checkData(dbSourceRef.value)
        const dbTargetFlag=await checkData(dbTargetRef.value)
        const quartzFormFlag=await checkData(quartzFormRef.value)
        const speedFlag=await checkData(speedFormRef.value)
        const errorLimitFlag=await checkData(errorListFromRef.value)
        if (!dbSourceFlag||!dbTargetFlag||!quartzFormFlag||!speedFlag||!errorLimitFlag) return 
        if (!isEmpty(row.value.jobName) && !isEmpty(row.value.jobGroup)) {
            doEdit()
        } else {
            doAdd()
        }
    }
    const doAdd=async()=>{
        const params = {
            transCode: '12001',
            speed: speed.value,
            errorLimit: errorLimit.value,
            dbSource: dbSource.value,
            dbTarget: dbTarget.value,
            quartzForm: quartzForm.value
          }
          const {code}=await usePostApi(`/gateway/quartz/${params.transCode}`,params)
          if(code!=='0') return
          search()
          visible(false)
    }
    const doEdit=async()=>{
        const params = {
            transCode: '13001',
            triggerIn: row.value,
            speed: speed.value,
            errorLimit: errorLimit.value,
            dbSource: dbSource.value,
            dbTarget: dbTarget.value,
            quartzForm: quartzForm.value
          }
          const {code}=await usePostApi(`/gateway/quartz/${params.transCode}`,params)
          if(code!=='0') return
          search()
          visible(false)
    }
    const handlerOpenCron = () => {
        showHelp.value=!showHelp.value
    }
    const handleResetForm = () => {
        useReset(dbSourceRef.value)
        useReset(dbTargetRef.value)
        useReset(quartzFormRef.value)
        useReset(speedFormRef.value)
        useReset(errorListFromRef.value)
        setTimeout(()=>{
            handleNameChanged()
            handleCronChange()
        },300)
    }
    const handleSearch = async () => {
        const params = {
            transCode: '11004',
            schedName: row.value.schedName,
            triggerName: row.value.triggerName,
            triggerGroup: row.value.triggerGroup
        }
        const { code, data } = await usePostApi(`/gateway/quartz/${params.transCode}`, params) as ApiResultType
        if (code !== '0') return
        quartzForm.value = data.quartzForm
        speed.value = data.speed
        errorLimit.value = data.errorLimit
        dbSource.value = data.dbSource
        dbTarget.value = data.dbTarget
        setSelectedCron()
    }
    // methods end




    // life cycle start
    onMounted(() => {
        formDisabled.value = type.value === 'view'
        handleNameChanged()
        handleCronChange()
        if(
            Object.prototype.hasOwnProperty.call(row.value,'schedName')&&
            Object.prototype.hasOwnProperty.call(row.value,'triggerName')&&
            Object.prototype.hasOwnProperty.call(row.value,'triggerGroup')
            
        ){
            handleSearch()
            
        }
    })
    // life cycle end

    return { 
        dbSourceRef, dbTargetRef, quartzFormRef, speedFormRef, errorListFromRef,
        formDisabled, dbSource, dbTarget, quartzForm, speed, errorLimit, showFetchSize, showHelp,
        handleNameChanged, handleSave, handleResetForm, setSelectedCron, handleCronChange, handlerOpenCron 
    }
}