<template>
  <WxmCard class="user-index" id="userIndexId">
    <!-- 左侧、右侧按钮 和自定义按钮以及搜索条件-->
    <WxmConditionButton permission-prefix="rbac-user" elementId="userIndexId" targetId="othersId">
      <template #search>
        <el-form :model="searchForm" inline :size="layoutStore.size" ref="searchFormRef">
          <el-form-item label="用户ID" prop="userId">
            <el-input v-model="searchForm.userId" placeholder="" />
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="searchForm.username" placeholder="" />
          </el-form-item>
          <el-form-item label="类别" prop="userType">
            <el-select v-model="searchForm.userType" placeholder="">
              <el-option v-for="item in rbacStore.userTypeDicts" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue" />
            </el-select>
          </el-form-item>
          <el-form-item label="等级" prop="userRate">
            <el-select v-model="searchForm.userRate" placeholder="">
              <el-option v-for="item in rbacStore.userRateDicts" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue" />
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="">
            <el-button type="primary" plain :icon="icons.Search" @click="handleSearch">搜索</el-button>
            <el-button type="warning" plain :icon="icons.RefreshLeft" @click="useReset(searchFormRef)">重置
            </el-button>
          </el-form-item>
        </el-form>
      </template>

      <template #btn>
        <el-button>自定义测试按钮</el-button>
      </template>
    </WxmConditionButton>
    <!-- 内容：包含表格和分页 -->
    <div class="body">
        <WxmTable :tableData="userList" :colList="colList" ref="wxmTableRef"/>
        <WxmPagination  />
      <div class="others" id="othersId"> </div>
    </div>
    <el-dialog v-model="dialogVisible" title="用户信息" width="60%" :close-on-press-escape="false" :close-on-click-modal="false" class="user-info-dialog">
      <el-card shadow="never">
        <UserInfo v-if="dialogVisible"/>
      </el-card>
    </el-dialog>
  </WxmCard>

</template>
<script lang="ts" setup>
import UserInfo from './UserInfo.vue';
import {ref,provide} from 'vue'
import { useLayoutStore } from "../../../store/layout"
import { useRbacStore } from "../../../store/rbac"
import { useReset } from '../../../composable/baseOperator';
import { init } from './ts/UserIndex';
const icons = {
    Search: 'Search',
    RefreshLeft: 'RefreshLeft',
}
// pinia  store
const layoutStore = useLayoutStore()
const rbacStore = useRbacStore()
 
const {searchForm,searchFormRef,colList,userList,dialogVisible,handleSearch}=init()
const wxmTableRef = ref()  //放入到vue文件中
provide('wxmTableRef',wxmTableRef)

</script>




<style scoped lang="scss">
.user-index {
  .body {
    //flex: 1;
    //display: flex;
    //flex-direction: column;
    overflow: auto;
    // :deep(.el-table){
    //    overflow: initial;
    // }
  }
 
}
</style>