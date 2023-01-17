<template>
    <div class="resource-index">
        <el-row>
            <el-col :span="5">
                <el-card>
                    <div :style="{'overflow':'auto','height':tabHeight+'px','padding':'10px 0 0 0'}">
                    <!-- <el-tree :props="props" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange" /> -->
                    <el-tree :data="treeData" :props="treeProps" node-key="nodeId" @node-click="handleNodeClick"   ref="resourceTreeRef">
                        <!-- 自定义树节点 -->
                        <template #default="{ node, data }">
                            <div class="wxm-tree-node">
                                <i class="wxm-icon"><component :is="data.icon"/></i>
                                <span>{{ $t(node.label) }}</span>
                            </div>
                        </template>
                    </el-tree>
                </div>
                </el-card>
            </el-col>
            <el-col :span="19">
                <el-card>
                    <ResourceInfo ref="resourceInfoRef"  :style="{'overflow':'auto','height':tabHeight+'px','padding':'10px 0 0 0'}"/>
                </el-card>
                <!-- <ResourceInfo ref="resourceInfoRef"  :style="{'overflow':'auto','height':tabHeight+'px','padding':'10px 0 0 0'}"/> -->
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import type { TreeNode } from 'element-plus/es/components/tree-v2/src/types';
import { ref, onMounted,nextTick ,provide} from 'vue'
import type { TreeNodeType,BaseType } from '../../../comm/type';
import { usePostApi } from '../../../composable/ApiBaseCall';
import { useTableHeight } from '../../../composable/tableHeight';
import ResourceInfo from './ResourceInfo.vue';

const resourceInfoRef=ref<any>();
const resourceTreeRef=ref();
 
const tabHeight=useTableHeight(true,true)
const treeProps = {
    label: 'title', //	指定节点标签为节点对象的某个属性值	string, function(data, node)	—	—
    children: 'children', //	指定子树为节点对象的某个属性值	string	—	—
    isLeaf: 'isLeaf', //,	指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效	string, function(data, node)	—	—
    // disabled?:'disabled',//	指定节点选择框是否禁用为节点对象的某个属性值	string, function(data, node)	—	—
    // class?:'class'//	自定义节点类名	string, function(data, node)	—	—
};
const treeData = ref<TreeNodeType[]>([]);

const handleNodeClick=(d:TreeNodeType,n:TreeNode,e:Event)=>{
    console.log('单击了：',d,n,e)
    nextTick(()=>{
        resourceInfoRef.value.handleSearch(d.nodeId)
    })
}

const handleSearch = async () => {
    const params:BaseType<string> = {
        transCode: '41003'
    };
    const { code, data } = await usePostApi(`/gateway/rbac/${params.transCode}`, params);
    if (code !== '0') return;
    treeData.value = data.list;
 
};
provide('SourceTreeKey',{
    loadSourceTree:handleSearch
})
onMounted(() => {
    handleSearch();
});
</script>
 