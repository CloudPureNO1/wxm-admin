<template>
    <div class="group-role-index">
        <el-row>
            <el-col :span="12">
                <RoleList :key="keys.keyAdd" type="add" title="可添加的角色列表"/>
            </el-col>
            <el-col :span="12">
                <RoleList :key="keys.keyRemove" type="remove" title="已经添加的角色列表"/>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import RoleList from './RoleList.vue'
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
  