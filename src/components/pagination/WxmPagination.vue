
<template>
    <div class="wxm-pagination">
        <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="pageSizes"
              :layout="layout" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :small="small"/>
    </div>
</template>

<script setup lang="ts">
 import { inject,ref } from "vue"
 import {useLayoutStore} from '../../store/layout'
 import { PaginationKey } from '../../symbol/Symbol';
 const layoutStore=useLayoutStore()

const pageSizes = [2,10, 20, 50, 100, 200, 300, 400]
const layout = 'total, sizes, prev, pager, next, jumper'
const {total,currentPage,pageSize,search} =inject(PaginationKey)
const small=ref<boolean>(false)
small.value=layoutStore.size==='small'

const handleSizeChange = (val: number) => {
    pageSize.value = val
    search()
}
const handleCurrentChange = (val: number) => {
    currentPage.value = val
    search()
}
</script>
<style scoped lang="scss">
.wxm-pagination {
    display: flex;
    justify-content: flex-end;
}
</style>