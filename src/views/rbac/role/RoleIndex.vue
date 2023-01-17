<template>
  <div class="role-index" id="roleIndexId">
    <WxmConditionButton permission-prefix="rbac-role" elementId="roleIndexId">
      <template #search>
        <el-form :model="searchForm" inline :size="layoutStore.size" ref="searchFormRef">
          <el-form-item label="角色ID" prop="roleId">
            <el-input v-model="searchForm.roleId" placeholder="" />
          </el-form-item>
          <el-form-item label="角色编码" prop="roleCode">
            <el-input v-model="searchForm.roleCode" placeholder="" />
          </el-form-item>
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="searchForm.roleName" placeholder="" />
          </el-form-item>
          <el-form-item label="类型" prop="roleType">
            <el-select v-model="searchForm.roleType" placeholder="">
              <el-option v-for="item in rbacStore.roleTypeDicts" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="roleStatus">
            <el-select v-model="searchForm.roleStatus" placeholder="">
              <el-option v-for="item in rbacStore.roleStatusDicts" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue" />
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="">
            <el-button type="primary" plain :icon="Search" :size="layoutStore.size" @click="handleSearch">搜索</el-button>
            <el-button type="warning" plain :icon="RefreshLeft" :size="layoutStore.size" @click="useReset(searchFormRef)">重置
            </el-button>
          </el-form-item>
        </el-form>
      </template>

    </WxmConditionButton>
    <!-- 内容：包含表格和分页 -->
    <div class="body">
      <el-row :gutter="10">
        <el-col :span="15">
          <el-card>
            <WxmTable :tableData="roleList" :colList="colList" ref="wxmTableRef" />
            <WxmPagination />
          </el-card>
        </el-col>

        <el-col :span="9">
          <el-card>
            <el-tabs type="border-card" class="demo-tabs">
              <el-tab-pane>
                <template #label>
                  <span class="custom-tabs-label">
                    <el-icon>
                      <calendar />
                    </el-icon>
                    <span>资源分配</span>
                  </span>
                </template>
                <RoleResource ref="roleResourceRef" />
              </el-tab-pane>
              <!-- <el-tab-pane label="权限分配">
                <RolePermissions ref="rolePermissionRef" />
              </el-tab-pane>
              <el-tab-pane label="接口分配">
                <RoleApis ref="roleApiRef" />
              </el-tab-pane> -->
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>

      <div class="others"> </div>
    </div>

    <el-dialog v-model="dialogVisible" title="" width="60%" :close-on-press-escape="false" :close-on-click-modal="false" class="permission-info-dialog">
      <template #title>
        <span v-if="dialogVisibleType==='0'">角色信息管理</span>
        <span v-if="dialogVisibleType==='1'">权限管理</span>
        <span v-if="dialogVisibleType==='2'">接口管理</span>
      </template>
      <el-card shadow="never">
        <RoleInfo  v-if="dialogVisible&&dialogVisibleType==='0'"/>
        <RolePermission  v-if="dialogVisible&&dialogVisibleType==='1'"/>
        <RoleApi  v-if="dialogVisible&&dialogVisibleType==='2'"/>
      </el-card>
    </el-dialog>

  </div>
</template>
 <script lang="ts" setup>
import RoleInfo from './RoleInfo.vue';
import RoleResource from './RoleResource.vue';
import RolePermission from './RolePermission.vue';
import RoleApi from './RoleApi.vue';
// import RolePermissions from './RolePermissions.vue';
// import RoleApis from './RoleApis.vue';

// import type { ElTable } from 'element-plus';
import { Search, RefreshLeft } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { useLayoutStore } from '../../../store/layout';
import { useRbacStore } from '../../../store/rbac';

import { useReset } from '../../../composable/baseOperator';

import {
  searchForm,
  searchFormRef,
  roleList,
  colList,
  dialogVisible,
  dialogVisibleType,
  handleSearch,
  init,
} from './ts/RoleIndex';

const layoutStore = useLayoutStore();
const rbacStore = useRbacStore();
const wxmTableRef = ref(); //放入到vue文件中
const roleResourceRef = ref();
// const roleApiRef = ref();
// const rolePermissionRef = ref<InstanceType<typeof ElTable>>();
init(wxmTableRef, roleResourceRef );
</script>