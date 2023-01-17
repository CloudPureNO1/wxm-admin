<template>
    <div class="role-list">
        <fieldset>
            <legend>{{title}}</legend>
            <div class="con">
                <div class="search">
                    <el-input placeholder="请输入内容" v-model="queryValue" :size="size" style="width:100%;">
                        <template #prepend>
                            <el-select v-model="queryType" placeholder="请选择" style="width:115px">
                                <el-option label="角色名" value="roleName"/>
                                <el-option label="角色ID" value="roleId"/>
                                <el-option label="角色编码" value="roleCode"/>
                                <el-option label="创建者" value="creator"/>
                            </el-select>
                        </template>
                        <template #append>
                            <el-button :icon="icons.Search" plain :size="size" @click="handleSearch"/>
                        </template>
                    </el-input>
                </div>
                <div class="btn">
                    <el-button v-click-interval v-if="type==='add'" type="primary" :size="size" :icon="icons.Plus"
                        @click="handleAdd" plain>添加</el-button>
                    <el-button v-click-interval v-if="type==='remove'" type="danger" :size="size"
                        :icon="icons.Minus" @click="handleRemove" plain>移除</el-button>
                </div>
            </div>

            <el-table :data="roleList" :size="size" height="16.3rem" :row-key="getRowKey" :expand-row-keys="expands"
                border stripe style="width: 100%" @row-dblclick="rowDblclick" ref="roleTableRef">
                <el-table-column type="selection" width="55"/>
                <el-table-column label="序号" type="index" fixed="left"/>
                <el-table-column label="角色ID" prop="roleId" :align="align" show-overflow-tooltip/>
                <el-table-column label="角色名称" prop="roleName" :align="align" show-overflow-tooltip/>
                <el-table-column label="创建者" prop="creator" :align="align" show-overflow-tooltip/>
                <el-table-column type="expand" label="展开/收起" width="100">
                    <template #default="scope">
                        <el-card>
                            <el-descriptions class="margin-top" title="" :column="1" :size="size" border>
                                <el-descriptions-item>
                                    <template #label> <el-icon><Stamp/></el-icon>&nbsp;角色ID</template>
                                    {{scope.row.roleId}}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>  <el-icon><Stamp/></el-icon> &nbsp;角色编码</template>
                                    {{scope.row.roleCode}}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>  <el-icon><Stamp/></el-icon> &nbsp;角色名</template>
                                    {{scope.row.roleName}}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>  <el-icon><Stamp/></el-icon>&nbsp;类别</template>
                                    <el-tag :size="size">{{scope.row.roleType}}</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>  <el-icon><Stamp/></el-icon>&nbsp;状态</template>
                                    <el-tag :size="size">{{scope.row.roleStatus}}</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label> <el-icon><Stamp/></el-icon>&nbsp;创建者</template>
                                    {{scope.row.creator}}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label> <el-icon><Stamp/></el-icon>&nbsp;创建时间</template>
                                    {{scope.row.createTime}}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label> <el-icon><Stamp/></el-icon>&nbsp;最近一次操作者</template>
                                    {{scope.row.operator}}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>  <el-icon><Stamp/></el-icon>&nbsp;更新时间</template>
                                    {{scope.row.updateTime}}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label> <el-icon><Stamp/></el-icon>&nbsp;备注 </template>
                                    <el-tag :size="size">{{scope.row.userDesc}}</el-tag>
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-card>
                    </template>
                </el-table-column>
            </el-table>
            <WxmPagination/>
        </fieldset>

    </div>
</template>
<script lang="ts" setup>
import WxmPagination from '../../../components/pagination/WxmPagination.vue'
import {init} from './ts/RoleList'
const icons={
    Search:'Search',
    Plus:'Plus',
    Minus:'Minus' 
}
const align='center'
const props = defineProps({
        title: { type: String, default: '' },
        type: { type: String, default: '' }
    })
const   { roleTableRef,size, queryType, queryValue, expands, roleList, getRowKey,handleSearch, handleAdd, handleRemove, rowDblclick }=init(props)
 </script>
<style scoped lang="scss">
.role-list {
    .con {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 10px;

        .search {
            width: 78%;
        }

        .btn {
            width: 20%;
        }
    }
 
}
</style>