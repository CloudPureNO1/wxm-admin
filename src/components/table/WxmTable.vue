<template>
  <el-table :data="props.tableData" :size="layoutStore.size" :max-height="maxHeight" highlight-current-row border stripe style="width: 100%" ref="dataTableRef" fit @row-click="handleRowClick">
    <template v-for="item in props.colList" :key="item">
      <!-- 序号 -->
      <el-table-column v-if="item.show&&item.type&&item.label" :type="item.type" :label="item.label" :fixed="item.fixed" :width="item.width" :align="align" />
      <!-- 复选框 -->
      <el-table-column v-else-if="item.show&&item.type" :type="item.type" :fixed="item.fixed" :width="item.width" :align="align" />
      <!-- 操作按钮 -->
      <el-table-column v-else-if="item.show&&item.children" :label="item.label" :fixed="item.fixed" :min-width="item.width" :align="align" showOverflowTooltip>
        <template #default="scope">
          <template v-for="btn in item.children" :key="btn">
            <el-tooltip v-if="btn.content" :content="btn.content" placement="top" :hide-after="100">
              <el-button v-permission="btn.permission" v-click-interval="1000" :size="layoutStore.size" circle plain :icon="btn.icon" :type="btn.type" @click="btn.render(scope.row)" />
            </el-tooltip>
            <el-button v-else v-permission="btn.permission" v-click-interval="1000" :size="layoutStore.size" circle plain :icon="btn.icon" :type="btn.type" @click="btn.render(scope.row)" />
          </template>
        </template>
      </el-table-column>
      <!-- 字典格式化,有效、无效 -->
      <el-table-column v-else-if="item.show&&item.formatter&&item.ops" :prop="item.prop" :label="item.label" :fixed="item.fixed" :min-width="item.width" :align="align" :formatter="item.formatter" showOverflowTooltip>
        <template #default="scope">
          <template v-for="op in item.ops" :key="op.value">
            <span v-if="op.value===scope.row[item.prop]">
              <el-tooltip v-if="op.content" :content="op.content" placement="top" :hide-after="100">
                <el-button v-if="op.permission" v-permission="op.permission" v-click-interval :size="layoutStore.size" plain :type="op.type" @click="op.render(scope.row)">
                  {{item.formatter(scope.row)}}
                </el-button>
                <span v-else>{{item.prop}}</span>
              </el-tooltip>
              <el-button v-else-if="op.permission" v-permission="op.permission" v-click-interval :size="layoutStore.size" plain :type="op.type" @click="op.render(scope.row)">
                {{item.formatter(scope.row)}}
              </el-button>
              <span v-else>{{item.formatter(scope.row)}}</span>
            </span>
          </template>
        </template>
      </el-table-column>
      <!-- 字典格式化 -->
      <el-table-column v-else-if="item.show&&item.formatter" :prop="item.prop" :label="item.label" :fixed="item.fixed" :min-width="item.width" :align="align" :formatter="item.formatter" showOverflowTooltip />
      <!-- 其他 -->
      <el-table-column v-else-if="item.show" :prop="item.prop" :label="item.label" :min-width="item.width" :align="item.align?item.align:align" showOverflowTooltip />

    </template>
  </el-table>
</template>
<script lang="ts" setup>
import { ref, inject } from 'vue';
import { useLayoutStore } from '../../store/layout';
import { useTableHeight } from '../../composable/tableHeight';
import {PaginationKey} from '../../symbol/Symbol'
type TableDataType = {
  tableData: any;
  colList: any;
};
// vue 单文件，不支持从其他文件中引入type 等
const props = withDefaults(defineProps<TableDataType>(), {
  tableData: [],
  colList: [],
});
const layoutStore = useLayoutStore();
// table height
const maxHeight = useTableHeight(true, true);
const align = ref('center');
const dataTableRef = ref();

const {rowClick} = inject(PaginationKey);
const handleRowClick = (row: any) => {
  if (rowClick) rowClick(row);
};

const getSelectionRows = () => {
  return dataTableRef.value.getSelectionRows();
};

defineExpose({
  getSelectionRows,
});
</script>
