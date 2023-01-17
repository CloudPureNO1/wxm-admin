import { computed, ref, reactive, onMounted, inject } from "vue"
import type { FormInstance, FormRules } from 'element-plus'
import type { BaseType, ApiResultType } from "../../../../comm/type"
import { useLayoutStore } from "../../../../store/layout"
import { RbacInfoRowKey, RbacInfoKey } from '../../../../symbol/Symbol'
import { isEmpty } from "lodash"
import { usePostApi } from "../../../../composable/ApiBaseCall";
import { wxmAlert } from "../../../../util/commFn";


export const initStaticData = () => {
    // 校验规则
    const rulesQuartz = reactive<FormRules>({
        cron: [
            { required: true, message: '执行规则表达式不能为空', trigger: ['blur', 'change'] }
        ],
        selectedCron: [
            { required: true, message: '执行规则表达式不能为空', trigger: ['blur', 'change'] }
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
    const classList = [
        { label: '通用定时任务类', value: 'com.wxm.quartz.single.job.OrdinaryJob' },
        { label: '自定义定时任务类', value: '' }
    ]

    return { rulesQuartz, crons, classList }
}

export const initStore = () => {
    const layoutStore = useLayoutStore()
    const size = computed(() => {
        return layoutStore.size
    })
    return { size }
}

export const init = () => {
    const { crons, classList } = initStaticData()
    const formDisabled = ref<boolean>(false)
    const quartzForm = ref<BaseType<string>>({
        cron: '0 0 */1 * * ?', // 每小时执行异常
        selectedCron: '0 0 */1 * * ?',
        selectedClassName: 'com.wxm.quartz.single.job.OrdinaryJob',
        className: ''
    })
    const showCustomClass = ref<boolean>(false)
    const showHelp = ref<boolean>(false)
    const showHelpType = ref<string>()
    const quartzFormRef = ref<FormInstance>()

    // inject start
    const { row, type } = inject(RbacInfoRowKey)
    const { visible, search } = inject(RbacInfoKey)
    // inject end
    const setSelectedCron = () => {
        const rs = crons.filter(item => item.value === quartzForm.value.cron)
        if (rs && rs.length !== 0) {
            quartzForm.value.selectedCron = rs[0].value
        } else {
            quartzForm.value.selectedCron = '自定义'
        }
    }
    const handleCronChange = () => {
        quartzForm.value.cron = quartzForm.value.selectedCron
    }
    const handleClassChange = () => {
        quartzForm.value.className = quartzForm.value.selectedClassName
        showCustomClass.value = (quartzForm.value.selectedClassName && !isEmpty(quartzForm.value.selectedClassName)) as boolean
    }
    const handlerOpenHelper = (helperType: string) => {
        showHelp.value = true
        showHelpType.value = helperType
    }
    const handleSetClass = () => {
        const rs = classList.filter(item => item.value === quartzForm.value.className)
        if (rs && rs.length !== 0) {
            quartzForm.value.selectedClassName = rs[0].value
            showCustomClass.value = true
        } else {
            quartzForm.value.selectedClassName = ''
            quartzForm.value.customClassName = ''
            showCustomClass.value = false
        }
    }
    const handleSave = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (!valid) {
                let msg: string = '定时任务信息校验不通过'
                if (fields) {
                    msg += Object.values(fields).map(item => `【${item[0].message}】`).join(',')
                }
                wxmAlert(msg, 'error')
                return
            }

            if (!isEmpty(row.value.jobName) && !isEmpty(row.value.jobGroup)) {
                doEdit()
            } else {
                doAdd()
            }

        })
    }
    const doAdd = async () => {
        const params = {
            transCode: '12002',
            ...quartzForm.value
        }
        const { code } = await usePostApi(`/gateway/quartz/${params.transCode}`, params) as ApiResultType
        if (code !== '0') return
        visible(false)
        search()
    }
    const doEdit = async () => {
        const params = {
            transCode: '13002',
            ...quartzForm.value,
            triggersIn:row.value
        }
        const { code } = await usePostApi(`/gateway/quartz/${params.transCode}`, params) as ApiResultType
        if (code !== '0') return
        visible(false)
        search()
    }

    onMounted(() => {
        formDisabled.value = type.value === 'view'

        const data = row ? row : {}
        quartzForm.value.cron = data.value.cronExpression
        quartzForm.value.className = data.value.jobClassName
        if (Object.prototype.hasOwnProperty.call(data.value, 'jobData') && !isEmpty(data.value.jobData)) {
            const d1 = data.value.jobData.split('\r\n').filter((item: string) => item.indexOf('customClass=') !== -1)[0]
            if (d1) {
                const customClassName = d1.split('=').filter((item: string) => item.indexOf('customClass') === -1)[0]
                quartzForm.value.customClassName = customClassName
            }
        }

        handleCronChange()
        handleClassChange()

    })

    return { quartzFormRef, formDisabled, quartzForm, showCustomClass, showHelp, showHelpType, handleSetClass, handlerOpenHelper, setSelectedCron, handleCronChange, handleClassChange, handleSave }
}