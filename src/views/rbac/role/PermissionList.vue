<template>
  <div class="permission-list">
    <fieldset>
      <legend>{{title}}</legend>
      <div class="con">
        <div class="search">
          <!--表单里的元素，el-input el-select 等宽度可以设置100%，其依赖父元素-->
          <el-input placeholder="请输入内容" v-model="queryValue" :size="size" style="width:100%;">
            <template #prepend>
              <el-select v-model="queryType" placeholder="请选择" style="width:115px;">
                <el-option label="权限名" value="permissionName" />
                <el-option label="权限ID" value="permissionId" />
                <el-option label="权限编码" value="permissionCode" />
                <el-option label="创建者" value="creator" />
              </el-select>
            </template>
            <template #append>
                <el-button :icon="icons.Search" :size="size" @click="handleSearch"/>
            </template>
          </el-input>
        </div>
        <div class="btn">
          <el-button v-click-interval v-if="type==='add'" plain type="primary" :size="size" :icon="icons.Plus" @click="handleAdd">添加</el-button>
          <el-button v-click-interval v-if="type==='remove'" plain type="danger" :size="size" :icon="icons.Minus" @click="handleRemove">移除</el-button>
        </div>
      </div>

      <el-table :data="permissionList" :size="size" height="16.3rem" :row-key="getRowKey" :expand-row-keys="expands" border stripe style="width: 100%" @row-dblclick="rowDblclick" ref="permissionTableRef">
        <el-table-column type="selection" width="55"/>
        <el-table-column label="权限ID" prop="permissionId" :align="align" show-overflow-tooltip/>
        <el-table-column label="权限名称" prop="permissionName" :align="align" show-overflow-tooltip/>
        <el-table-column label="创建者" prop="creator" :align="align" show-overflow-tooltip />
        <el-table-column type="expand" label="展开/收起" width="100">
          <template #default="scope">
            <el-card>
              <el-descriptions class="margin-top" title="" :column="1" :size="size" border>
                <el-descriptions-item>
                  <template #label><el-icon><Flag/></el-icon>&nbsp;权限ID</template>
                  {{scope.row.permissionId}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label> <el-icon><Flag/></el-icon>&nbsp;权限名</template>
                  {{scope.row.permissionName}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label> <el-icon><Flag/></el-icon> &nbsp;权限编码</template>
                  {{scope.row.permissionCode}}
                </el-descriptions-item>
   
                <el-descriptions-item>
                  <template #label><el-icon><Flag/></el-icon>&nbsp;类别</template>
                  <el-tag :size="size">{{scope.row.permissionType}}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label> <el-icon><Flag/></el-icon>&nbsp;状态</template>
                  <el-tag :size="size">{{scope.row.permissionStatus}}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label> <el-icon><Flag/></el-icon>&nbsp;创建者</template>
                  {{scope.row.creator}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label><el-icon><Flag/></el-icon>nbsp;创建时间</template>
                  {{scope.row.createTime}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label><el-icon><Flag/></el-icon>&nbsp;最近一次操作者</template>
                  {{scope.row.operator}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label> <el-icon><Flag/></el-icon>&nbsp;更新时间</template>
                  {{scope.row.updateTime}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label> <el-icon><Flag/></el-icon>&nbsp; 备注 </template>
                  <el-tag :size="size">{{scope.row.permissionDesc}}</el-tag>
                </el-descriptions-item>
              </el-descriptions>
            </el-card>
          </template>
        </el-table-column>
      </el-table>
      <WxmPagination />
    </fieldset>

  </div>
</template>
<script lang="ts" setup>
import WxmPagination from '../../../components/pagination/WxmPagination.vue'
import {init} from './ts/PermissionList'
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
const   { permissionTableRef,size, queryType, queryValue, expands, permissionList, getRowKey,handleSearch, handleAdd, handleRemove, rowDblclick }=init(props)
 </script>
<style scoped lang="scss">
.permission-list {
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
  