<template>
  <div class="dictionary-index">
    <WxmConditionButton permission-prefix="rbac-dict" elementId="dictionaryIndexId" targetId="dictionaryOthersId">
      <template #search>
        <el-form :model="searchForm" inline :size="store.size" ref="searchFormRef">
          <el-form-item label="字典中文名称" prop="dictLabel">
            <el-input v-model="searchForm.dictLabel" placeholder="" />
          </el-form-item>
          <el-form-item label="字典类别" prop="dictType">
            <el-input v-model="searchForm.dictType" placeholder="" />
          </el-form-item>
          <el-form-item label="状态" prop="dictStatus">
            <el-select v-model="searchForm.dictStatus" placeholder="请选择">
              <el-option v-for="item in store.dictStatus" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue" />
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="">
            <el-button type="primary" plain :size="store.size" :icon="icons.Search" @click="handleSearch">搜索</el-button>
            <el-button type="warning" plain :size="store.size" :icon="icons.RefreshLeft" @click="useReset(searchFormRef)">重置
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
      <WxmTable :tableData="dictionaryList" :colList="colList" ref="wxmTableRef" />
      <WxmPagination />
      <div class="others" id="dictionaryOthersId"> </div>
    </div>

    <el-dialog v-model="dialogVisible" title="字典信息" width="60%" :close-on-press-escape="false" :close-on-click-modal="false" class="dictionary-info-dialog">
      <el-card shadow="never">
        <DictionaryInfo v-if="dialogVisible" />
      </el-card>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import DictionaryInfo from './DictionaryInfo.vue'
import { useReset } from '../../../composable/baseOperator';
import {init} from './ts/DictionaryIndex'
const icons={
  Search:'Search',
  RefreshLeft:'RefreshLeft'
}
const { store,wxmTableRef,searchForm,searchFormRef,colList,dictionaryList,dialogVisible,handleSearch }=init()
</script>