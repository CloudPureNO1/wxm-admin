<template>
  <div class="permission-index" id="permissionIndexId">
    <WxmConditionButton permission-prefix="rbac-permission" elementId="permissionIndexId" targetId="othersId">
      <template #search>
        <el-form :model="searchForm" inline :size="layoutStore.size" ref="searchFormRef">
          <el-form-item label="权限ID" prop="permissionId">
            <el-input v-model="searchForm.permissionId" placeholder="" />
          </el-form-item>
          <el-form-item label="权限名" prop="permissionName">
            <el-input v-model="searchForm.permissionName" placeholder="" />
          </el-form-item>
          <el-form-item label="权限代码" prop="permissionCode">
            <el-input v-model="searchForm.permissionCode" placeholder="" />
          </el-form-item>
          <el-form-item label="权限类别" prop="userType">
            <el-select v-model="searchForm.permissionType" placeholder="请选择">
              <el-option v-for="item in rbacStore.permissionTypeDicts" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="permissionStatus">
            <el-select v-model="searchForm.permissionStatus" placeholder="请选择">
              <el-option v-for="item in rbacStore.permissionStatusDicts" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue" />
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="">
            <el-button type="primary" plain :size="layoutStore.size" :icon="Search" @click="handleSearch">搜索</el-button>
            <el-button type="warning" plain :size="layoutStore.size" :icon="RefreshLeft" @click="useReset(searchFormRef)">重置
            </el-button>
          </el-form-item>

        </el-form>
      </template>
      <template #btn>
        <el-button>test</el-button>
      </template>
    </WxmConditionButton>
    <!-- 内容：包含表格和分页 -->
    <div class="body">
      <WxmTable :tableData="permissionList" :colList="colList" ref="wxmTableRef"/>
      <WxmPagination />
      <div class="others" id="othersId"> </div>
    </div>

    <el-dialog v-model="dialogVisible" title="权限信息" width="60%" :close-on-press-escape="false" :close-on-click-modal="false" class="permission-info-dialog">
      <el-card shadow="never">
        <PermissionInfo v-if="dialogVisible"/>
      </el-card>
    </el-dialog>

  </div>
</template>
<script lang="ts" setup>
import PermissionInfo from './PermissionInfo.vue'
import {provide,ref} from 'vue'
import { useLayoutStore } from '../../../store/layout';
import { useRbacStore } from '../../../store/rbac';
import { useReset } from '../../../composable/baseOperator';

import {
  colList,
  searchForm,
  searchFormRef,
  permissionList,
  init,
  handleSearch 
} from './ts/PermissionIndex';
 

const layoutStore = useLayoutStore();
const rbacStore = useRbacStore();



// 初始化
const { Search, RefreshLeft, dialogVisible } = init();

const wxmTableRef = ref()  //放入到vue文件中
provide('wxmTableRef',wxmTableRef)

</script>

 