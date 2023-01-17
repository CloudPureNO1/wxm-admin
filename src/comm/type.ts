/**Rbac 用户类型 */
export type UserType = {
    userId?: string,
    username?: string,
    passwd?: string,
    userType?: string,
    userRate?: string,
    userStatus?: string,
    createTime?: string,
    creator?: string,
    updateTime?: string,
    operator?: string,
    userDesc?: string,
    accountExpiredTime?: string,
    lockTime?: string,
    unlockTime?: string,

}
export type GroupType={
    groupId?:string,
    groupCode?:string,
    groupName?:string,
    groupType?:string,
    groupStatus?:string,
    groupDesc?: string,
    creator?: string,
    createTime?: string,
    operator?: string,
    updateTime?: string,
}
export type RoleType = {
    roleId?: string,
    roleCode?: string,
    roleName?: string,
    roleType?: string,
    roleStatus?: string,
    roleDesc?: string,
    creator?: string,
    createTime?: string,
    operator?: string,
    updateTime?: string,
}
export type ResourceType={
    resourceId?:string,
    resourceCode?:string,
    resourceName?:string,
    resourceUrl?:string,
    resourceType?:string,
    resourceStatus?:string,
    resourceIcon?:string,
    resourceNum?:string,
    orderNum?:string,
    resourceDesc?:string,
    creator?: string,
    createTime?: string,
    operator?: string,
    updateTime?: string,
    checked?:string ,
    parentId?:string,
    parentName?:string
}
export type PermissionType = {
    permissionId?: string,
    permissionCode?: string,
    permissionName?: string,
    permissionType?: string,
    permissionStatus?: string,
    permissionDesc?: string,
    creator?: string,
    createTime?: string,
    operator?: string,
    updateTime?: string,
    checked?:string 
}

export type ApiType={
    apiId?:string,
    apiTitle?:string,
    apiUrl?:string,
    apiCode?:string,
    apiStatus?:string,
    apiDesc?:string,
    creator?: string,
    createTime?: string,
    operator?: string,
    updateTime?: string,
    checked?:string 
}

export type QuartzJobType={
    schedName?:string,
    triggerName?:string,
    triggerGroup?:string,
    jobName?:string,
    jobGroup?:string,
    nextFireTime?:string,
    prevFireTime?:string,
    priority?:string,
    triggerState?:string,
    triggerType?:string,
    cronExpression?:string,
    startTime?:string,
    endTime?:string,
    calendarName?:string,
    misfireInstr?:string,
    jobClassName?:string,
    description?:string,
    jobData?:string,
    timeZoneId?:string
 
}
/**
 * 数据同步，源数据类型
 */
export type DBSourceType={
    name:string,//mysqlreader, // 默认mysql
    jdbcUrl: string,//, // 可以使用多个，但是不建议，多个使用都好分割
    password: string,//,
    username: string,//,
    fetchSize:number,// , // 默认1024，该配置项定义了插件和数据库服务器端每次批量数据获取条数，该值决定了DataX和服务器端的网络交互次数，能够较大的提升数据抽取性能，注意，该值过大(>2048)可能造成DataX进程OOM
    querySql: string,//, // 自定义sql,支持多表关联，当用户配置querySql时，直接忽略table、column、where条件的配置。
    splitPk:string,// , // 仅支持整形型数据切分；如果指定splitPk，表示用户希望使用splitPk代表的字段进行数据分片，如果该值为空，代表不切分，使用单通道进行抽取
    table: string,//, // 多个使用逗号分割
    column: string,//, // "*" 默认所有列,支持列裁剪，列换序,不建议使用*,多个字段使用都好分割
    where:string,//  // 指定的column、table、where条件拼接SQL，可以指定limit 10，也可以增量数据同步，如果该值为空，代表同步全表所有的信息
}
/**
 * 数据同步，目标数据类型
 */
export type DBTargeType={
    name:string,// mysqlwriter, // 默认mysql
    jdbcUrl:string,// , // 只能一个数据源
    username:string,// ,
    password: string,//,
    batchSize:number,// 1024, // 默认值1024 一次性批量提交的记录数大小，该值可以极大减少DataX与Mysql的网络交互次数，并提升整体吞吐量。但是该值设置过大可能会造成DataX运行进程OOM情况。
    column: string,//, // 必须指定，不能留空；如果要依次写入全部列，使用表示, 例如: "column": [""]，强烈不建议,多个以逗号分割
    table:string,// , // 支持写入一个或者多个表。当配置为多张表时，必须确保所有表结构保持一致。多个以逗号分割
    preSql:string,// , // 写入数据到目的表前，会先执行这里的标准语句。例在导入表前先进行删除操作：["delete from 表名"] 多个以逗号分割
    postSql: string,//, // 写入数据到目的表后，会执行这里的标准语句。（原理同 preSql ） 多个以逗号分割
    session:string,// , // DataX在获取Mysql连接时，执行session指定的SQL语句，修改当前connection session属性
    writeMode:string// update // 默认insert ，可选insert/replace/update
}
/**
 * 数据同步，Speed 类型，流量控制
 */
export type SpeedType={
    channel: number,//3, // 控制同步时的最大并发数,
    // byte: 1048576 // 控制传输速度，单位为byte/s，DataX运行会尽可能达到该速度但是不超过它
    // byte 为Java 关键字，此处使用sByte(sbyte 是个其他系统关键字，不适用)
    spByte:number// 1048576 // 控制传输速度，单位为byte/s，DataX运行会尽可能达到该速度但是不超过它
}
/**
 * 数据同步错误类型，脏数据控制
 */
export type ErrorLimitType={
    record: number//0, // 对脏数据最大记录数阈值（record值）或者脏数据占比阈值（percentage值，当数量或百分比，DataX Job报错退出
    percentage: number//0 // 者脏数据占比阈值（percentage值，当数量或百分比，DataX Job报错退出
}



/** 国际化Locale 类型 */
export type Locale = {
    [key: string]: any
}

/**
 * element plus 颜色类型
 */
export type MenuColorType = {
    menuBgColor: string | null,
    menuTextColor: string | null,
    menuActiveTextColor: string | null
}

/**基本按钮的入参类型 */
export type BaseBtnType = {
    plain?: boolean,
    typeRight?: string,
    showAdd?: boolean,
    showEdit?: boolean,
    showDelete?: boolean,
    showExport?: boolean,
    showPrint?: boolean,
    showSearch?: boolean,
    showRefresh?: boolean,
    showGrid?: boolean
}
/**接口返回类型 */
export type DataRtnType = {
    code: string,
    message?: string,
    data?: any;
    detailMsg?: string,
    rsTime: number
}
/**字典类型 */
export type DictType = {
    dictId?: string,
    dictType?: string,
    dictValue?: string,
    dictLabel?: string,
    dictStatus?: string,
    dictParentValue?: string,
    orderNum?:string
}

/**用户首页查询类型 */
export type SearchUserType = {
    userId?: string | number
    username?: string
    userType?: string | number,
    userRate?: string | number
}

/**用户首页查询类型 */
export type SearchPermissionType = {
    permissionId?: string | number
    permissionCode?: string
    permissionType?: string | number,
    permissionName?: string,
    permissionStatus?: string
}

/**统一解构 */
export type ResultType = {
    res: any,
    err: any
}

export type DictResultType = {
    [key: string]: Array<DictType>
}

export type CommType = {
    [key: string]: any
}
// export type BaseType = {
//     [key: string]: string
// }
export type BaseType<T> = {
    [key: string]: T
}

/**
 * 导出多sheet Excel 的类型
 */
export type ExcelExportType = {
    header: Array<string>,
    data: Array<BaseType<any>>,
    headerWidth: Array<number>,
    sheetName?: string
    fileName?: string
}

export type GridColsType = {
    prop: string,
    label: string,
    show: boolean
}

/**
 * 分页查询结果类型
 */
export type PagingQueryResultsType = {
    code: string,
    recordList: BaseType<any>,
    recordCount: number
}
/**
 * 基本api 调用结果类型
 */
export type ApiResultType = {
    code: string,
    data?: any
}

export type TreeNodeType = {
    nodeId: string,
    title: string,
    isLeaf: boolean
    icon: string,
    url: string,
    parentId:string
    children: Array<any>
}

 