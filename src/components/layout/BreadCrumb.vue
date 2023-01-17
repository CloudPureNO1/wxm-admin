<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <template v-for="(item,index) in route.matched" :key="index+item.path">
            <el-breadcrumb-item v-if="item.meta.type==='node'"> {{$t(`${item.meta.title}`)}}</el-breadcrumb-item>
            <el-breadcrumb-item v-else :to="{ path: item.path }"> {{$t(`${item.meta.title}`)}}</el-breadcrumb-item>
        </template>
    </el-breadcrumb>
</template>
<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>    