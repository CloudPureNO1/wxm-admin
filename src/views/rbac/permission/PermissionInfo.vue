<template>
  <div class="permission-info">
    <el-form :model="permissionForm" :rules="rules" :disabled="formDisabled" :size="layoutStore.size" label-width="auto" label-position="right" status-icon ref="permissionFormRef">
      <el-row>
        <el-col :span="11" :offset="1">
          <el-form-item label="权限编码" prop="permissionCode">
            <el-input v-model="permissionForm.permissionCode"/>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="权限名称" prop="permissionName">
            <el-input v-model="permissionForm.permissionName"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11" :offset="1">
          <el-form-item label="权限类别" prop="permissionType" placeholder="请选择">
            <el-select v-model="permissionForm.permissionType" style="width:100%;">
              <el-option v-for="item in rbacStore.permissionTypeDicts" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="状态" prop="permissionStatus" placeholder="请选择">
            <el-select v-model="permissionForm.permissionStatus" style="width:100%;">
              <el-option v-for="item in rbacStore.permissionStatusDicts" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="23" :offset="1">
          <el-form-item label="描述" prop="permissionDesc">
            <el-input v-model="permissionForm.permissionDesc" type="textarea" :rows="3"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="wxm-btn-info">
          <el-button v-click-interval type="primary" plain :size="layoutStore.size" @click="handleSave(permissionFormRef,callBack)">提交</el-button>
          <el-button v-click-interval type="warning" plain :size="layoutStore.size" @click="handleReset(permissionFormRef)">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {inject} from 'vue'
import { useLayoutStore } from '../../../store/layout';
import { useRbacStore} from '../../../store/rbac'
import { RbacInfoKey,RbacInfoRowKey} from '../../../symbol/Symbol'
import {permissionRules as rules} from '../rbacRules'
import { init,handleReset,handleSave } from './ts/PermissionInfo';

const layoutStore = useLayoutStore();
const rbacStore=useRbacStore()
const {search,visible}=inject(RbacInfoKey)// 父界面注入方法
const {row,type}=inject(RbacInfoRowKey) as any

const { formDisabled, permissionForm ,permissionFormRef} = init(row,type) as any;

const callBack=()=>{
    visible()
    search()
}

</script>
 