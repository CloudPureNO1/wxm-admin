<template>
    <WxmCard class="api-index" id="apiIndexId">
        <!-- 左侧、右侧按钮 和自定义按钮以及搜索条件-->
        <WxmConditionButton permission-prefix="rbac-user" elementId="apiIndexId" targetId="apiOthersId">
            <template #search>
                <el-form :model="searchForm" inline :size="size" ref="searchFormRef">
                    <el-form-item label="接口ID" prop="apiId">
                        <el-input v-model="searchForm.apiId" placeholder="" />
                    </el-form-item>
                    <el-form-item label="接口编码" prop="apiCode">
                        <el-input v-model="searchForm.apiCode" placeholder="" />
                    </el-form-item>
                    <el-form-item label="接口标题" prop="apiTitle">
                        <el-input v-model="searchForm.apiTitle" placeholder="" />
                    </el-form-item>
                    <el-form-item label="接口地址" prop="apiUrl">
                        <el-input v-model="searchForm.apiUrl" placeholder="" />
                    </el-form-item>
                    <el-form-item label="状态" prop="apiStatus">
                        <el-select v-model="searchForm.apiStatus" placeholder="">
                            <el-option v-for="item in dicts.apiStatusDicts" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
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
                <el-button plain>自定义测试按钮</el-button>
            </template>
        </WxmConditionButton>
        <!-- 内容：包含表格和分页 -->
        <div class="body">
            <WxmTable :tableData="apiList" :colList="colList" ref="wxmTableRef" />
            <WxmPagination />
            <div class="others" id="apiOthersId"> </div>
        </div>
        <el-dialog v-model="dialogVisible" title="接口信息" width="60%" :close-on-press-escape="false"
            :close-on-click-modal="false" class="api-info-dialog">
            <el-card shadow="never">
                <ApiInfo v-if="dialogVisible" />
            </el-card>
        </el-dialog>
    </WxmCard>

</template>
<script lang="ts" setup>
import ApiInfo from './ApiInfo.vue';
import { ref, provide } from 'vue'
import { useReset } from '../../../composable/baseOperator';
import { init } from './ts/ApiIndex';
const icons = {
    Search: 'Search',
    RefreshLeft: 'RefreshLeft',
}
 

const {size,dicts,searchForm,searchFormRef,apiList,colList,dialogVisible,handleSearch} = init()
const wxmTableRef = ref()  //放入到vue文件中
provide('wxmTableRef', wxmTableRef)

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