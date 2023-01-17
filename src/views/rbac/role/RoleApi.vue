<template>
    <div class="role-permission-index">
        <el-row>
            <el-col :span="12">
                <ApiList :key="keys.keyAdd" type="add" title="可添加的权限列表"/>
            </el-col>
            <el-col :span="12">
                <ApiList :key="keys.keyRemove" type="remove" title="已经添加的权限列表"/>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import ApiList from './ApiList.vue'
import { computed, ref ,provide} from 'vue'
const key = ref < number > (1); //通过改变key 的值 实现组价重新加载
const keys=computed(()=>{
    return {keyAdd:`add-${key.value}`,keyRemove:`remove-${key.value}`}
})

const reload=()=>{
    key.value=key.value+1
}
provide('reload',reload)
</script>
  