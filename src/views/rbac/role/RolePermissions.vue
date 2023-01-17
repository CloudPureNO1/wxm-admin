<template>
  <div class="role-permission-info">
    <div class="permission-info-header">
      <el-input v-model="queryValue" :size="layoutStore.size" placeholder="请输入内容" class="input-with-select">
        <template #prepend>
          <el-select v-model="queryType" placeholder="请选择" style="width: 115px">
            <el-option label="权限ID" value="permissionId" />
            <el-option label="权限名称" value="permissionName" />
            <el-option label="权限编码" value="permissionCode" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" plain :size="layoutStore.size" @click="handleSearch(roleIdTmp)" />
        </template>
      </el-input>
      <div class="wxm-btn-left">
        <el-button v-click-interval :size="layoutStore.size" type="primary" plain @click="handleSave">提交</el-button>
      </div>
    </div>
    <el-table :data="permissionList" :size="layoutStore.size" :max-height="maxHeight" fit border stripe
      highlight-current-row row-key="permissionId" ref="rolePermissionTableRef">
      <!-- reserve-selection 分页后依然选中  配合row-key  -->
      <el-table-column type="selection" width="50" reserve-selection />
      <el-table-column prop="permissionId" label="权限ID" :min-width="80" />
      <el-table-column prop="permissionCode" label="权限编码" :min-width="120" />
      <el-table-column prop="permissionName" label="权限名称" :min-width="100" />
    </el-table>
    <WxmPagination />
  </div>
</template>
<script lang="ts" setup>
import WxmPagination from '../../../components/pagination/WxmPagination.vue';
import { ref, provide, onMounted, nextTick } from 'vue';
import { ElTable } from 'element-plus'
import type { PermissionType, ApiResultType } from '../../..//comm/type';
import { PaginationKey } from '../../../symbol/Symbol'
import { useSearchPage, usePostApi } from '../../../composable/ApiBaseCall';
import { useResetPermission } from '../../../composable/sessionStorePermission'
import { useLayoutStore } from '../../../store/layout';
import { wxmAlert } from '../../../util/commFn';
import { useTableHeight } from '../../../composable/tableHeight'

const maxHeight = useTableHeight(true, true,['.el-tabs__header .is-top','.permission-info-header']);
maxHeight.value=maxHeight.value-100

const layoutStore = useLayoutStore();
const permissionList = ref<PermissionType[]>([]);
const total = ref<number>(0);
const currentPage = ref<number>(1);
const pageSize = ref<number>(100);
const Search = 'Search';
const queryValue = ref<string>('');
const queryType = ref<string>('');
const roleIdTmp = ref<string>('');

const rolePermissionTableRef = ref<InstanceType<typeof ElTable>>()


type ParamsType = {
  transCode: string,
  pageSize: number,
  currentPage: number,
  roleId?: string,
  permissionId?: String,
  permissionName?: String,
  permissionCode?: String
}
type DynamicKeys = {
  permissionId?: String,
  permissionName?: String,
  permissionCode?: String
}
// methods start
const handleSearch = async (roleId?: string) => {
  roleIdTmp.value = roleId || '';
  const params: ParamsType = {
    transCode: '51005',
    pageSize: pageSize.value,
    currentPage: currentPage.value,
    roleId: roleIdTmp.value,
  };
  params[queryType.value as keyof DynamicKeys] = queryValue.value


  const { code, recordList, recordCount } = await useSearchPage(`/gateway/rbac/${params.transCode}`, params)
  if (code !== '0') return
  permissionList.value = recordList as Array<PermissionType>
  total.value = recordCount
 

  // 调用接口获取table 数据库，设置选中，需要在nextTick 中
  nextTick(() => {
    initSelection(permissionList.value)
  })


  useResetPermission()
};
const initSelection = (data: PermissionType[]) => {
  data.forEach((item: PermissionType) => {
    rolePermissionTableRef.value!.toggleRowSelection(item, item.checked === '1')
  })

}

const handleSave = async () => {
  const selection: PermissionType[] = rolePermissionTableRef.value!.getSelectionRows()
  const params = {
    transCode: '32005',
    roleId: roleIdTmp.value,
    list: selection.map(item => item.permissionId)
  }
  const { code } = await usePostApi(`/gateway/rbac/${params.transCode}`, params) as ApiResultType
  if (code !== '0') return
  wxmAlert('角色权限提交成功')
  handleSearch(roleIdTmp.value);
};
// methods end

// life cycle methods
onMounted(() => {
  handleSearch()
})


provide(PaginationKey, {
  total,
  currentPage,
  pageSize,
  search: handleSearch
})

defineExpose({
  handleSearch,
});
</script>

<style scoped lang="scss">
.role-permission-info {
  .permission-info-header {
    display: flex;
    justify-content: flex-end;

    border-bottom: 1px solid var(--el-border-color-light);
    padding: 0 0 5px 0;
 
  }
}
</style>