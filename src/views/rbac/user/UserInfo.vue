<template>
    <div class="user-info">
        <el-form :model="userForm" :rules="rules" :disabled="formDisabled" status-icon :size="layoutStore.size" label-width="auto" label-position="right" ref="userFormRef">
        <el-row>
          <el-col :span="11" :offset="1">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" :disabled="!allowChange" style="width:100%;"/>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="类别" prop="userType">
              <el-select v-model="userForm.userType"  :disabled="!allowChange" placeholder="请选择" style="width:100%;">
                <el-option v-for="item in rbacStore.userTypeDicts" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11" :offset="1">
            <el-form-item label="密码" :prop="type==='view'||type==='edit'||!allowChange?'':'passwd'">
              <el-input v-model="userForm.passwd" :disabled="type==='edit'||!allowChange"   style="width:100%;"/>
            </el-form-item>
          </el-col>

          <el-col :span="11" :offset="1">
            <el-form-item label="等级" prop="userRate">
              <el-select v-model="userForm.userRate" :disabled="!allowChange" placeholder="请选择" style="width:100%;">
                <el-option v-for="item in rbacStore.userRateDicts" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-if="type==='edit'" :span="11" :offset="1">
            <el-form-item label="新密码" prop="passwdNew">
              <el-input v-model="userForm.passwdNew"   style="width:100%;" placeholder="如果需要修改密码，输入新密码"/>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="状态"  prop="userStatus">
              <el-select v-model="userForm.userStatus" :disabled="!allowChange" placeholder="请选择" style="width:100%;">
                <el-option v-for="item in rbacStore.userStatusDicts" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="23" :offset="1">
            <el-form-item label="用户描述" prop="userDesc">
              <el-input v-model="userForm.userDesc" type="textarea" :rows="3"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col  class="wxm-btn-info">
            <el-button v-click-interval type="primary" plain :size="layoutStore.size" @click="handleSave(userFormRef,callBack)">提交</el-button>
            <el-button v-click-interval type="warning" plain :size="layoutStore.size" @click="useReset(userFormRef)">重置</el-button>
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
import { useReset } from '../../../composable/baseOperator';
import { init} from './ts/UserInfo';

const layoutStore = useLayoutStore();
const rbacStore=useRbacStore()
const {search,visible}=inject(RbacInfoKey)// 父界面注入方法
const {row,type}=inject(RbacInfoRowKey) as any

const { formDisabled, userForm, userFormRef,allowChange,handleSave}= init(row,type) as any;

const callBack=()=>{
    visible()
    search()
}

</script>
 