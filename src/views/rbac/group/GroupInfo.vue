<template>
  <div class="group-info">
    <el-form :model="groupForm" :rules="rules" :disabled="fromDisabled" :size="size" label-width="auto" label-position="right" status-icon ref="groupFormRef">
      <el-row>
        <el-col :span="23" :offset="1">
          <el-form-item label="用户组名称" prop="groupName">
            <el-input v-model="groupForm.groupName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11" :offset="1">
          <el-form-item label="类型" prop="groupType" placeholder="请选择">
            <el-select v-model="groupForm.groupType" style="width:100%;">
              <el-option v-for="item in dicts.groupTypeDicts" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="状态" prop="groupStatus" placeholder="请选择">
            <el-select v-model="groupForm.groupStatus" style="width:100%;">
              <el-option v-for="item in dicts.groupStatusDicts" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="23" :offset="1">
          <el-form-item label="描述" prop="groupDesc">
            <el-input v-model="groupForm.groupDesc" type="textarea" :rows="3" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="wxm-info-btn">
          <el-button v-click-interval plain :size="size" type="primary" @click="handleSave(groupFormRef)">提交</el-button>
          <el-button v-click-interval plain :size="size" type="warning" @click="useReset(groupFormRef)">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { useReset } from '../../../composable/baseOperator';
import { groupRules as rules } from '../rbacRules';
import { init } from './ts/GroupInfo';
const { size, dicts, groupForm,groupFormRef, fromDisabled ,handleSave} = init();

</script>
