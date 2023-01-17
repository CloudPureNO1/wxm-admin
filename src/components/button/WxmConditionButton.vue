<template>
  <div class="wxm-condition-box">
    <div class="search-box" v-if="isShowCondition">
      <slot name="search"></slot>
    </div>
    <div class="fn-btn">
      <div class="fn-btn__left">
        <el-button v-permission="buildPermission('add')" v-click-interval type="primary" :plain="plain" :icon="Plus" :size="layoutStore.size" @click="callAdd" >新增</el-button>
        <el-button v-permission="buildPermission('delete','deleteBatch')" v-click-interval type="danger" :plain="props.plain" :icon="Delete" :size="layoutStore.size" @click="callDelete">删除</el-button>
        <el-button v-permission="buildPermission('export','exportAll')" v-click-interval type="success" :plain="props.plain" :icon="Download" :size="layoutStore.size" @click="callExport">导出</el-button>
        <el-button v-permission="buildPermission('exportAll')" v-click-interval type="success" :plain="props.plain" :icon="Download" :size="layoutStore.size" @click="callExportAll">导出全部</el-button>
        <el-button v-permission="buildPermission('print')" v-click-interval type="success" :plain="props.plain" :icon="Printer" :size="layoutStore.size" @click="callPrint">打印</el-button>
        <slot name="btn"></slot>
      </div>

      <div class="fn-btn__right">
        <el-button v-if="props.showSearch" :type="props.typeRight" :plain="props.plain" :icon="Search" :size="layoutStore.size" @click="callToggleShowCondition" class="right-btn" />
        <el-button v-if="props.showRefresh" :type="props.typeRight" :plain="props.plain" :icon="Refresh" :size="layoutStore.size" @click="callReLoad" class="right-btn" />
        <el-popover placement="bottom-start" trigger="hover" width="300">
          <el-table :data="cols" :size="layoutStore.size" max-height="300" border stripe @selection-change="callGridColsSelectChange" style="width: 100%" ref="gridTableRef">
            <el-table-column type="selection" min-width="55" align="left" />
            <el-table-column label="字段" prop="label" min-width="150" align="left" />
          </el-table>
          <template #reference>
            <el-button v-if="props.showGrid" :type="props.typeRight" :plain="props.plain" :icon="Grid" :size="layoutStore.size" class="right-btn" />
          </template>

        </el-popover>
        <!-- <el-button-group>
                    <el-button v-if="props.showSearch" :type="props.typeRight" :plain="props.plain" :icon="Search" @click="toggleSearch"/>
                    <el-button v-if="props.showRefresh" :type="props.typeRight" :plain="props.plain" :icon="Refresh" @click="callReLoad"/>
                    <el-button v-if="props.showGrid" :type="props.typeRight" :plain="props.plain" :icon="Grid" @click="handleGrid"/>
                </el-button-group> -->

      </div>
    </div>
    <!-- <div class="search-box">
            <slot name="search"></slot>
        </div> -->
  </div>
</template>

 

<script lang="ts" setup >
// import {getCurrentInstance} from 'vue'
import { onMounted, ref, inject } from 'vue';
import type {Ref} from 'vue'
import {
  Plus,
  Delete,
  Download,
  Printer,
  Refresh,
  Search,
  Grid,
} from '@element-plus/icons-vue';
import { ElTable } from 'element-plus';

import { usePrint,useBuildExportData } from '../../composable/baseOperator';
import {useExportExcel} from '../../composable/excel'

import { useLayoutStore } from '../../store/layout';

import type { GridColsType } from '../../comm/type';
import { ConditionButtonKey } from '../../symbol/Symbol';
import { isEmpty } from 'lodash-es';
/**基本按钮的入参类型 */
type BaseBtnType = {
  permissionPrefix?: string;
  plain?: boolean;
  typeRight?: string;

  showSearch?: boolean;
  showRefresh?: boolean;
  showGrid?: boolean;
  elementId?: string; // 打印的内容的根元素
  targetId?: string; // 打印的内容显示在哪里
  // cols: any;
};
// vue 单文件，不支持从其他文件中引入type 等
const props = withDefaults(defineProps<BaseBtnType>(), {
  permissionPrefix: undefined,
  plain: true,
  typeRight: 'primary',

  showSearch: true,
  showRefresh: true,
  showGrid: true,
  elementId: undefined,
  targetId: undefined,
  // cols: [],
});

const layoutStore = useLayoutStore();

// ctx 开发环境可以访问到，生产环境不行
// proxy 则都可以
// const { ctx } = getCurrentInstance()
// const { proxy } = getCurrentInstance() as any ;

 
// 运行时
//const emit = defineEmits([])
// const emit = defineEmits([
//   'add',
//   'edit',
//   'deleteBatch',
//   'export',
//   'exportAll',
//   'print',
//   'toggleSearch',
//   'reload',
//   'grid',
// ]);

// 基于类型
// const emit = defineEmits<{
//   (e: 'change', id: number): void
//   (e: 'update', value: string): void
// }>()
const isShowCondition = ref(false);
const gridTableRef = ref<InstanceType<typeof ElTable>>();
const wxmTableRef=inject('wxmTableRef') as Ref<any>

const {
  colList,
  data,// {dataList:userList,fileName:'用户',sheetName:'用户信息'}
  add,
  deleteBatch,
  exportAll,
  reload,
} = inject(ConditionButtonKey);

 
  const cols: Array<GridColsType> =!colList?[]:colList.value
  .filter((item: any) => item.label)
  .map((item: any) => {
    return {
      prop: item.prop,
      label: item.label,
      show: item.show,
    };
  }) as Array<GridColsType>;
 


// 方法 ===================start=====================
const buildPermission=(...types:string[])=>{
  if(!props.permissionPrefix){
    return ['ALL']
  }
  if(isEmpty(props.permissionPrefix)){
    return types
  }
  const permissions:Array<string>=[]
  types.forEach((type:string)=>{
    permissions.push(`${props.permissionPrefix}:${type}`)
  })
  return permissions
}
const callGridColsSelectChange = (selection: GridColsType[]) => {
  // emit('grid',selection)
  // 推荐 改变 供给方（provide) 响应式数据时，通过供给方的方法 handleGrid 的修改，便于统一管理，
  // 但是这里写统一组件的时候，为了避免每个调用这个组件的地方，都写一个方法，所以写在了接收方
  // if(handleGrid) handleGrid(selection)
  if (colList) {
    colList.value = colList.value.map((item: any) => {
      item.show = selection.some((s) => s.label === item.label) || !item.label;
      return item;
    });
  }
};

const callAdd = () => {
  // console.log('>>>>>>>>>proxy',proxy,proxy.$parent)
  // emit('add');
  // proxy.emit('add')
  if (add) add();
};
// const handleEdit=()=>{
//     emit('edit')
// }
const callDelete = () => {
  // emit('deleteBatch');
  // proxy.emit('deleteBatch')
  const selection=wxmTableRef.value.getSelectionRows()
  if (deleteBatch) deleteBatch(selection);
};

const callExport = () => {
  // emit('export');
  // if (handleExport) handleExport();
  const exportData = useBuildExportData(colList.value, data.dataList.value, data.fileName, data.sheetName)
  useExportExcel(exportData)
};
const callExportAll = () => {
  // emit('exportAll');
  if (exportAll) exportAll();
};
// const show=ref(false)
const callToggleShowCondition = () => {
  isShowCondition.value = !isShowCondition.value;
};
const callReLoad = () => {
  // emit('reload');
  // proxy.emit('refresh')
  if (reload) reload();
};

const callPrint=()=>{
  usePrint(props.elementId,props.targetId)
}

onMounted(() => {
  // props.cols.forEach((row: GridColsType) => {
  cols.forEach((row: GridColsType) => {
    gridTableRef.value!.toggleRowSelection(row, row.show);
  });
});
// 方法 ===================end=======================
</script>







<style scoped lang="scss">
.wxm-condition-box {
  padding: 0 0 10px 0;

  .search-box {
    padding: 0 0 0 8px;
    border-bottom: 1px dashed var(--el-border-color) ;
    margin-bottom: 1.5rem;
  }

  .fn-btn {
    flex: 1;
    width: 100%;

    display: flex;
    flex-direction: row;

    justify-content: space-between;

    :deep(.el-button-group .el-button--primary:first-child) {
      border-right-color: var(--el-color-primary-light-5);
    }

    :deep(.el-button-group
        .el-button--primary:not(:first-child):not(:last-child)) {
      border-left-color: var(--el-color-primary-light-5);
      border-right-color: var(--el-color-primary-light-5);
    }

    :deep(.el-button-group .el-button--primary:last-child) {
      border-left-color: var(--el-color-primary-light-5);
    }

    :deep(.el-button-group .el-button--warning:first-child) {
      border-right-color: var(--el-color-warning-light-5);
    }

    :deep(.el-button-group
        .el-button--warning:not(:first-child):not(:last-child)) {
      border-left-color: var(--el-color-warning-light-5);
      border-right-color: var(--el-color-warning-light-5);
    }

    :deep(.el-button-group .el-button--warning:last-child) {
      border-left-color: var(--el-color-warning-light-5);
    }

    :deep(.el-button-group .el-button--danger:first-child) {
      border-right-color: var(--el-color-danger-light-5);
    }

    :deep(.el-button-group
        .el-button--danger:not(:first-child):not(:last-child)) {
      border-left-color: var(--el-color-danger-light-5);
      border-right-color: var(--el-color-danger-light-5);
    }

    :deep(.el-button-group .el-button--danger:last-child) {
      border-left-color: var(--el-color-danger-light-5);
    }

    :deep(.el-button-group .el-button--success:first-child) {
      border-right-color: var(--el-color-success-light-5);
    }

    :deep(.el-button-group
        .el-button--success:not(:first-child):not(:last-child)) {
      border-left-color: var(--el-color-success-light-5);
      border-right-color: var(--el-color-success-light-5);
    }

    :deep(.el-button-group .el-button--success:last-child) {
      border-left-color: var(--el-color-success-light-5);
    }

    :deep(.el-button-group .el-button--info:first-child) {
      border-right-color: var(--el-color-info-light-5);
    }

    :deep(.el-button-group
        .el-button--info:not(:first-child):not(:last-child)) {
      border-left-color: var(--el-color-info-light-5);
      border-right-color: var(--el-color-info-light-5);
    }

    :deep(.el-button-group .el-button--info:last-child) {
      border-left-color: var(--el-color-info-light-5);
    }
  }

  .right-btn {
    margin-left: 0 !important;
    border-radius: 0 !important;

    // &:first-of-type{
    //     border-right:0 !important;
    // }
    &:first-of-type {
      border-right: 1px solid var(--el-color-primary-light-5) !important;
    }

    &:not(:first-of-type) {
      //color:red !important;
      border-left: 0 !important;
    }
  }
}
</style>