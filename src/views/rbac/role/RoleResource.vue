<template>
  <div class="role-resource-info">
    <div class="header">
 
      <el-input v-model="queryValue" :size="layoutStore.size"  placeholder="请输入内容" class="input-with-select">
        <template #prepend>
          <el-select v-model="queryType"  placeholder="请选择"   style="width: 115px">
            <el-option label="资源ID" value="resourceId" />
            <el-option label="资源名称" value="resourceName" />
            <el-option label="资源地址" value="resourceUrl" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" plain :size="layoutStore.size" @click="handleSearch(roleIdTmp)"/>
        </template>
      </el-input>
      <div class="wxm-btn-left">
      <el-button  v-click-interval :size="layoutStore.size"  type="primary" plain @click="handleSave">提交</el-button>
      </div>
    </div>

    <!-- <el-tree :props="props" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange" /> -->
    <el-tree :data="treeData" :props="treeProps" show-checkbox node-key="nodeId" ref="roleResourceTreeRef">
      <!-- 自定义树节点 -->
      <template #default="{ node, data }">
        <div class="wxm-tree-node">
          <i class="wxm-icon"><component :is="data.icon"/></i>
          <span>{{ $t(node.label) }}</span>
        </div>
      </template>
    </el-tree>

  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { ElTree } from 'element-plus';
import type { TreeNodeType } from '../../../comm/type';
import { usePostApi } from '../../../composable/ApiBaseCall';
import { useLayoutStore } from '../../../store/layout';
import { wxmAlert } from '../../../util/commFn';
import { isEmpty } from 'lodash-es';
// import type Node from 'element-plus/es/components/tree/src/model/node'
const Search = 'Search';
const treeProps = {
  label: 'title', //	指定节点标签为节点对象的某个属性值	string, function(data, node)	—	—
  children: 'children', //	指定子树为节点对象的某个属性值	string	—	—
  isLeaf: 'isLeaf', //,	指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效	string, function(data, node)	—	—
  // disabled?:'disabled',//	指定节点选择框是否禁用为节点对象的某个属性值	string, function(data, node)	—	—
  // class?:'class'//	自定义节点类名	string, function(data, node)	—	—
};
const layoutStore = useLayoutStore();
const treeData = ref<TreeNodeType[]>([]);
const ownIds = ref<string[]>([]);
const roleResourceTreeRef = ref<InstanceType<typeof ElTree>>();
const queryValue = ref<string>('');
const queryType = ref<string>('');
const roleIdTmp = ref<string>('');
const handleSave = async () => {
  let nodes = roleResourceTreeRef.value!.getCheckedNodes(false, false);
  if (!roleIdTmp.value || isEmpty(roleIdTmp.value)) {
    wxmAlert('请先选择角色', 'error');
    return false;
  }
  if (!nodes || nodes.length === 0) {
    wxmAlert('请先选择要添加的资源', 'error');
    return false;
  }
  let params = {
    transCode: '32002',
    roleId: roleIdTmp.value,
    list: nodes.map((node) => node.nodeId),
  };
  let { code } = await usePostApi(`/gateway/rbac/${params.transCode}`, params);
  if (code !== '0') return;
  wxmAlert('成功');
  handleSearch(roleIdTmp.value);
};

const getTreeIds = (nodes: TreeNodeType[]) => {
  const nodeIdList: string[] = [];
  nodes.forEach((node: TreeNodeType) => {
    if(node.isLeaf) nodeIdList.push(node.nodeId);// 勾选飞节点（叶子，按钮）
    if (node.children) {
      nodeIdList.push(...getTreeIds(node.children));
    }
  });
  return nodeIdList;
};
const setCheckedKeys = () => {
  const nodeIdList: string[] = getTreeIds(treeData.value);
  const checkedKeys: string[] = nodeIdList.filter((nodeId:string) =>ownIds.value.includes(nodeId) );
  roleResourceTreeRef.value!.setCheckedKeys(checkedKeys, false);
};
type ParamsType={
    transCode: string,
    roleId?: string ,
    resourceId?:String,
    resourceName?:String,
    resourceUrl?:String,
    resourceType?:String,
}
const handleSearch = async (roleId?: string) => {
  roleIdTmp.value = roleId || '';
  const params:ParamsType = {
    transCode: '41005',
    roleId: roleId 
  };
  params[queryType.value as keyof ParamsType]=queryValue.value
  const { code, data } = await usePostApi(
    `/gateway/rbac/${params.transCode}`,
    params
  );
  if (code !== '0') return;
  treeData.value = data.list;
  ownIds.value = data.listResourceId;

  if (treeData.value.length !== 0) {
    setCheckedKeys();
  }
};
onMounted(() => {
  handleSearch();
});
defineExpose({
  handleSearch,
});
</script>

<style scoped lang="scss">
.role-resource-info {
  .header {
    display: flex;
    justify-content: flex-end;

    border-bottom: 1px solid var(--el-border-color-light);
    padding: 0 0 5px 0;
  }
}
</style>