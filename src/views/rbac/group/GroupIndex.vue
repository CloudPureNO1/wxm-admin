<template>
<WxmCard class="group-index" id="groupIndexId">
    <!-- 左侧、右侧按钮 和自定义按钮以及搜索条件-->
    <WxmConditionButton permission-prefix="rbac-user" elementId="groupIndexId" targetId="groupOthersId">
      <template #search>
        <el-form :model="searchForm" inline :size="size" ref="searchFormRef">
            <el-form-item label="用户组ID" prop="groupId">
            <el-input v-model="searchForm.groupId" placeholder=""/>
          </el-form-item>
          <el-form-item label="用户组名称" prop="groupName">
            <el-input v-model="searchForm.groupName" placeholder=""/>
          </el-form-item>
          <el-form-item label="用户组编码" prop="groupCode">
            <el-input v-model="searchForm.groupCode" placeholder=""/>
          </el-form-item>
          <el-form-item label="类型" prop="groupType">
            <el-select v-model="searchForm.groupType" placeholder="">
              <el-option v-for="item in dicts.groupTypeDicts" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="groupStatus">
            <el-select v-model="searchForm.groupStatus" placeholder="">
              <el-option v-for="item in dicts.groupStatusDicts" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="">
            <el-button type="primary" plain :size="size" :icon="icons.Search" @click="handleSearch">搜索</el-button>
            <el-button type="warning" plain :size="size" :icon="icons.RefreshLeft" @click="useReset(searchFormRef)">重置
            </el-button>
          </el-form-item>
        </el-form>
      </template>

      <template #btn>
        <el-button :size="size" plain>自定义测试按钮</el-button>
      </template>
    </WxmConditionButton>
    <!-- 内容：包含表格和分页 -->
    <div class="body">
        <WxmTable :tableData="groupList" :colList="colList" ref="wxmTableRef"/>
        <WxmPagination  />
      <div class="others" id="groupOthersId"> </div>
    </div>
    <el-dialog v-model="dialogVisible" title="" width="60%" :close-on-press-escape="false" :close-on-click-modal="false" class="group-info-dialog">
      <template #title>
        <span v-if="dialogVisibleType==='0'">用户组信息管理</span>
        <span v-if="dialogVisibleType==='1'">用户管理</span>
        <span v-if="dialogVisibleType==='2'">角色管理</span>
      </template>
      <el-card shadow="never">
        <GroupInfo  v-if="dialogVisible&&dialogVisibleType==='0'"/>
        <GroupUser  v-if="dialogVisible&&dialogVisibleType==='1'"/>
        <GroupRole  v-if="dialogVisible&&dialogVisibleType==='2'"/>
      </el-card>
    </el-dialog>
  </WxmCard>

</template>
<script lang="ts" setup>
import GroupInfo from './GroupInfo.vue'
import GroupUser from './GroupUser.vue'
import GroupRole from './GroupRole.vue'
import {ref} from 'vue'
import {useReset} from '../../../composable/baseOperator'
import {init} from './ts/GroupIndex'
const icons={
  Search:'Search',
  RefreshLeft:'RefreshLeft'
}
const wxmTableRef = ref<any>()  //放入到vue文件中
const {size,dicts,searchForm,searchFormRef,groupList,colList,dialogVisible,dialogVisibleType,handleSearch}=init(wxmTableRef)


</script>