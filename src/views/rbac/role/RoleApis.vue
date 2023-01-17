<template>
  <div class="role-api-info">
    <div class="header">
      <el-input v-model="queryValue" :size="layoutStore.size" placeholder="请输入内容" class="input-with-select">
        <template #prepend>
          <el-select v-model="queryType" placeholder="请选择" style="width: 115px">
            <el-option label="接口ID" value="apiId" />
            <el-option label="接口标题" value="apiTitle" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" :size="layoutStore.size" plain @click="handleSearch(roleIdTmp)" />
        </template>
      </el-input>
      <div class="wxm-btn-left">
        <el-button  v-click-interval :size="layoutStore.size" type="primary" plain @click="handleSave">提交</el-button>
      </div>
      
    </div>
    <el-table :data="apiList" :size="layoutStore.size" fit border stripe highlight-current-row row-key="apiId" ref="roleApiTableRef">
      <!-- reserve-selection 分页后依然选中  配合row-key  -->
      <el-table-column type="selection" width="50" reserve-selection/> 
      <el-table-column prop="apiId" label="接口ID" :min-width="80" />
      <el-table-column prop="apiTitle" label="接口标题" :min-width="120" />
      <el-table-column prop="apiUrl" label="接口地址" :min-width="100" />
    </el-table>
    <WxmPagination />
  </div>
</template>
  <script lang="ts" setup>
import WxmPagination from '../../../components/pagination/WxmPagination.vue';
import { ref, provide, onMounted, nextTick } from 'vue';
import { ElTable } from 'element-plus';
import type { ApiType,ApiResultType } from '../../..//comm/type';
import { PaginationKey } from '../../../symbol/Symbol';
import { useSearchPage,usePostApi } from '../../../composable/ApiBaseCall';
import { useResetPermission } from '../../../composable/sessionStorePermission';
import { useLayoutStore } from '../../../store/layout';
import { wxmAlert } from '../../../util/commFn';

const layoutStore = useLayoutStore();
const apiList = ref<ApiType[]>([]);
const total = ref<number>(0);
const currentPage = ref<number>(1);
const pageSize = ref<number>(100);
const Search = 'Search';
const queryValue = ref<string>('');
const queryType = ref<string>('');
const roleIdTmp = ref<string>('');

const roleApiTableRef = ref<InstanceType<typeof ElTable>>();

type ParamsType = {
  transCode: string;
  pageSize: number;
  currentPage: number;
  roleId?: string;
  apiId?: String;
  apiTitle?: String;
};
type DynamicKeys = {
    apiId?: String;
    apiTitle?: String;
}
// methods start
const handleSearch = async (roleId?: string) => {
  roleIdTmp.value = roleId || '';
  const params: ParamsType = {
    transCode: '71005',
    pageSize: pageSize.value,
    currentPage: currentPage.value,
    roleId: roleIdTmp.value,
  };
  params[queryType.value as keyof DynamicKeys] = queryValue.value;

  const { code, recordList, recordCount } = await useSearchPage(
    `/gateway/rbac/${params.transCode}`,
    params
  );
  if (code !== '0') return;
  apiList.value = recordList as Array<ApiType>;
  total.value = recordCount;

  // 调用接口获取table 数据库，设置选中，需要在nextTick 中
  nextTick(() => {
    initSelection(apiList.value);
  });
};
const initSelection = (data: ApiType[]) => {
  data.forEach((item: ApiType) => {
    roleApiTableRef.value!.toggleRowSelection(item, item.checked==='1')
  });
};

const handleSave = async () => { 
  const selection:ApiType[]=roleApiTableRef.value!.getSelectionRows()
  const params={
    transCode:'32006',
    roleId:roleIdTmp.value,
    list:selection.map(item=>item.apiId)
  }
  const {code}= await usePostApi(`/gateway/rbac/${params.transCode}`,params) as ApiResultType
  if(code!=='0') return
  wxmAlert('角色接口提交成功')
  handleSearch(roleIdTmp.value);

  useResetPermission()
};
// methods end

// life cycle methods
onMounted(() => {
  handleSearch();
});

provide(PaginationKey, {
  total,
  currentPage,
  pageSize,
  search: handleSearch,
});

defineExpose({
  handleSearch,
});
</script>

<style scoped lang="scss">
.role-api-info {
  .header {
    display: flex;
    justify-content: flex-end;

    border-bottom: 1px solid var(--el-border-color-light);
    padding: 0 0 5px 0;
  }
}
</style>