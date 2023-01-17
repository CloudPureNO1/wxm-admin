<template>
  <div class="role-info">
    <!-- <fieldset>
      <legend>角色信息</legend> -->
      <el-form :model="roleForm" :rules="rules" :disabled="formDisabled" :size="layoutStore.size" label-width="auto" label-position="right" status-icon ref="roleFormRef">
        <el-row>
          <el-col :span="9" :offset="1">
            <el-form-item label="类型" prop="roleType" placeholder="请选择">
              <el-select v-model="roleForm.roleType" style="width:100%;">
                <el-option v-for="item in rbacStore.roleTypeDicts" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="13" :offset="1">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="roleForm.roleName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="1">
            <el-form-item label="状态" prop="roleStatus" placeholder="请选择">
              <el-select v-model="roleForm.roleStatus" style="width:100%;">
                <el-option v-for="item in rbacStore.roleStatusDicts" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="13" :offset="1">
            <el-form-item label="角色编码" prop="roleCode" placeholder="请选择">
              <el-input v-model="roleForm.roleCode" :disabled="disabledRoleCode"  style="width:100%;"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23" :offset="1">
            <el-form-item label="描述" prop="roleDesc">
              <el-input v-model="roleForm.roleDesc" type="textarea" :rows="3" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="wxm-btn-info">
            <el-button v-click-interval type="primary" :size="layoutStore.size" plain @click="handleSave(roleFormRef,callBack)">提交</el-button>
            <el-button v-click-interval type="warning" :size="layoutStore.size" plain @click="useReset(roleFormRef)">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    <!-- </fieldset> -->
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { useLayoutStore } from '../../../store/layout';
import { useRbacStore } from '../../../store/rbac';
import { RbacInfoKey, RbacInfoRowKey } from '../../../symbol/Symbol';
import { init } from './ts/RoleInfo';
import {roleRules as rules} from '../rbacRules'
import {useReset} from '../../../composable/baseOperator'

const layoutStore = useLayoutStore();
const rbacStore = useRbacStore();
const { search, visible } = inject(RbacInfoKey); // 父界面注入方法
const { row, type } = inject(RbacInfoRowKey) as any;
const { formDisabled,disabledRoleCode,  roleForm, roleFormRef ,handleSave} = init(type,row) as any;

const callBack = () => {
  visible();
  search();
};
</script>