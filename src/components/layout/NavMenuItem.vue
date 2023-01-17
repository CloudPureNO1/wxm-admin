<template>
  <template v-for="item in menuData" :key="item.nodeId">
    <el-menu-item v-if="item.isLeaf" :index="item.url">
      <el-icon>
        <component :is="item.icon" />
      </el-icon>
      <template #title>
        <span>{{ $t(item.title) }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu v-else :index="'node'+item.nodeId">
      <el-icon>
        <component :is="item.icon" />
      </el-icon>
      <template #title>
        <span>{{ $t(item.title) }}</span>
      </template>
      <!--递归调用自身 调用的是组件的 name  -->
      <span v-if="hasChild(item)">
        <nav-menu-item :menuData="item.children" />
      </span>
    </el-sub-menu>
  </template>
</template>
<script setup lang="ts" name="NavMenuItem">
interface ItemData {
  nodeId: "";
  title: "";
  isLeaf: "";
  icon: "";
  url: "";
  parentId: "";
  children: [];
}
interface Props {
  menuData: ItemData[];
}
defineProps<Props>();

// 是否有子菜单
const hasChild = (item: ItemData) => {
  return item.children && item.children.length !== 0;
}
</script>
