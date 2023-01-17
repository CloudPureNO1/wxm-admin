<template>
    <div class="resource-info">
        <el-card class="resource-into-card" >
            <template #header>
                <div class="card-header">
                    <span>
                        <el-button v-click-interval type="primary" :icon="icons.plus" :size="layoutStore.size" plain
                            @click="handleAdd(0)">{{$t('Rbac.Resource.addLv1Resource')}}</el-button>
                        <el-button v-click-interval type="primary" :icon="icons.plus" :size="layoutStore.size" plain
                            @click="handleAdd(1)">{{$t('Rbac.Resource.addChildResource')}}</el-button>
                    </span>
                    <span>
                        <el-button v-click-interval type="success" :icon="icons.finished" :size="layoutStore.size" plain @click="handleSave(resourceFromRef)">{{$t('Common.save')}}</el-button>
                        <el-button v-click-interval type="danger" :icon="icons.delete" :size="layoutStore.size" plain @click="handleDelete">{{$t('Common.delete')}}</el-button>
                    </span>
                </div>
            </template>

            <el-form :model="resourceForm" :size="layoutStore.size" :rules="rules" label-width="auto" label-position="right"
                ref="resourceFromRef">
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('Rbac.Resource.parentName')" prop="parentName">
                            <el-input v-model="resourceForm.parentName" :placeholder="toLocalePleaseEnter('Rbac.Resource.parentName')" readonly />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('Rbac.Resource.resourceName')" prop="resourceName">
                            <el-input v-model="resourceForm.resourceName" :placeholder="toLocalePleaseEnter('Rbac.Resource.resourceName')" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('Rbac.Resource.resourceUrl')" prop="resourceUrl">
                            <el-input v-model="resourceForm.resourceUrl" :placeholder="toLocalePleaseEnter('Rbac.Resource.resourceName')"  />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('Rbac.Resource.resourceType')" prop="resourceType">
                            <el-select v-model="resourceForm.resourceType" :placeholder="toLocalePleaseSelect('Rbac.Resource.resourceType')"  style="width:100%;">
                                <el-option v-for="typeItem in rbacStore.resourceTypeDicts" :key="typeItem.dictValue"
                                    :label="typeItem.dictLabel" :value="typeItem.dictValue" style="width:100%;" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('Rbac.Resource.resourceStatus')" prop="resourceStatus">
                            <el-select v-model="resourceForm.resourceStatus" :placeholder="toLocalePleaseSelect('Rbac.Resource.resourceStatus')"  style="width:100%;">
                                <el-option v-for="statusItem in rbacStore.resourceStatusDicts"
                                    :key="statusItem.dictValue" :label="statusItem.dictLabel"
                                    :value="statusItem.dictValue" style="width:100%;" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item :label="$t('Rbac.Resource.resourceIcon')" prop="resourceIcon" style="text-align:left;">
                            <WxmIcon :icon="resourceForm.resourceIcon" @selected="setIcon" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item :label="$t('Rbac.Resource.resourceNum')" prop="resourceNum">
                            <el-input-number v-model="resourceForm.resourceNum" controls-position="right" :min="0" :placeholder="toLocalePleaseEnter('Rbac.Resource.resourceNum')" 
                                :max="100" step-strictly style="width:100%;text-align:left;" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item :label="$t('Rbac.Resource.orderNum')" prop="orderNum">
                            <el-input-number v-model="resourceForm.orderNum" controls-position="right" :min="0" :placeholder="toLocalePleaseEnter('Rbac.Resource.orderNum')" 
                                :max="100" step-strictly style="width:100%;" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('Rbac.Resource.resourceDesc')" prop="resourceDesc">
                            <el-input v-model="resourceForm.resourceDesc" :placeholder="toLocalePleaseEnter('Rbac.Resource.resourceDesc')"  type="textarea"
                                :autosize="{ minRows: 4, maxRows: 5}" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import WxmIcon from '../../../components/icons/WxmIcon.vue'
import {resourceRules as rules} from '../rbacRules'
import {toLocalePleaseEnter,toLocalePleaseSelect} from '../../../composable/TransI18n'
import { layoutStore, rbacStore, init } from './ts/ResourceInfo';
const { resourceForm,resourceFromRef, handleAdd, handleDelete, handleSave, setIcon,handleSearch } = init();
const icons = {
    plus: 'Plus',
    delete: 'Delete',
    finished: 'Finished'
}
defineExpose({
        handleSearch
})

</script>
<style scoped lang="scss">
.resource-info {
    height: 100%;
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>