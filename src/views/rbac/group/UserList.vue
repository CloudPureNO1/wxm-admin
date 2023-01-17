<template>
    <div class="user-list">
        <fieldset>
            <legend>{{props.title}}</legend>
            <div class="con">
                <div class="search">
                    <!--表单里的元素，el-input el-select 等宽度可以设置100%，其依赖父元素-->
                    <el-input placeholder="请输入内容" v-model="queryValue" :size="size" style="width:100%;">
                        <template #prepend>
                            <el-select v-model="queryType" placeholder="请选择" style="width: 115px">
                                <el-option label="用户名" value="username"/>
                                <el-option label="用户ID" value="userId"/>
                                <el-option label="创建者" value="creator"/>
                            </el-select>
                        </template>
                        <template #append>
                            <el-button :icon="icons.Search" plain :size="size" @click="handleSearch" />
                        </template>
                    </el-input>
                </div>
                <div class="btn">
                    <el-button v-click-interval v-if="props.type==='add'" type="primary" :size="size" plain :icon="icons.Plus"  @click="handleAdd">添加</el-button>
                    <el-button v-click-interval v-if="props.type==='remove'" type="danger" :size="size" plain :icon="icons.Minus" @click="handleRemove">移除</el-button>
                </div>
            </div>

            <el-table :data="userList" :size="size" height="16.3rem" :row-key="getRowKey" :expand-row-keys="expands"
                border stripe style="width: 100%" @row-dblclick="rowDblclick" ref="userTableRef">
                <el-table-column type="selection" width="55"/>
                <el-table-column label="序号" type="index" fixed="left"/>
                <el-table-column label="用户ID" prop="userId" :align="align" show-overflow-tooltip/>
                <el-table-column label="用户名" prop="username" :align="align" show-overflow-tooltip/>
                <el-table-column label="创建者" prop="creator" :align="align" show-overflow-tooltip/>
                <el-table-column type="expand" label="展开/收起" width="100">
                    <template #default="scope">
                        <el-card>
                            <el-descriptions class="margin-top" title="" :column="1" :size="size" border>
                                <el-descriptions-item>
                                    <template #label> <i class="el-icon-bank-card"></i>&nbsp;用户ID</template>
                                    {{scope.row.userId}}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label> <i class="el-icon-user"></i> &nbsp;用户名</template>
                                    {{scope.row.username}}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label> <i class="el-icon-collection-tag"></i> &nbsp;类别</template>
                                    <el-tag :size="size">{{scope.row.userType}}</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label> <i class="el-icon-star-on"></i>&nbsp;等级</template>
                                    <el-tag :size="size">{{scope.row.userRate}}</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label> <i class="el-icon-s-flag"></i>&nbsp;状态</template>
                                    <el-tag :size="size">{{scope.row.userStatus}}</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label> <i class="el-icon-user"></i>&nbsp;创建者</template>
                                    {{scope.row.creator}}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label> <i class="el-icon-date"></i>&nbsp;创建时间</template>
                                    {{scope.row.createTime}}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label> <i class="el-icon-user"></i>&nbsp;最近一次操作者</template>
                                    {{scope.row.operator}}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label> <i class="el-icon-date"></i>&nbsp;更新时间</template>
                                    {{scope.row.updateTime}}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label> <i class="el-icon-tickets"></i>&nbsp; 备注 </template>
                                    <el-tag :size="size">{{scope.row.roleDesc}}</el-tag>
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
import {init} from './ts/UserList'
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
const  {userTableRef,size,queryType,queryValue,expands,userList,getRowKey,handleSearch,handleAdd,handleRemove,rowDblclick}=init(props)
 </script>
<style scoped lang="scss">
.user-list {
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
  