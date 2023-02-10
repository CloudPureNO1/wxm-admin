<template>
    <div class="login-main">

        <div class="login-main-form">
            <div class="login-title">后台管理系统</div>
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginFormRef">
                <el-form-item label="" prop="username">
                    <el-tooltip content="用户名" placement="top" effect="light">
                        <el-input v-model="loginForm.username" placeholder="请输入用户名" :size="size"
                            @keyup.enter="submitForm(loginFormRef)" ref="usernameRef">
                            <template #prefix>
                                <el-icon>
                                    <UserFilled />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-tooltip content="密码" placement="top" effect="light">
                        <el-input v-model="loginForm.password" placeholder="请输入密码" :size="size" show-password
                            @keyup.enter="submitForm(loginFormRef)">
                            <template #prefix>
                                <el-icon>
                                    <Lock />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="" prop="verifyCode">
                    <el-row>
                        <el-col :span="14">
                            <el-tooltip content="验证码" placement="top" effect="light" :size="size">
                                <el-input v-model="loginForm.verifyCode" placeholder="请输入验证码" :size="size"
                                    prefix-icon="" @keyup.enter="submitForm(loginFormRef)" />
                            </el-tooltip>
                        </el-col>
                        <el-col :span="10">
                            <span @click="refreshCode">
                                     <verify-code :identifyCode="identifyCode" :fontSizeMax="35"
                                    :contentHeight="36" />
                            </span>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <!-- <el-button type="primary"  :size="size" class="login-btn">登录</el-button>-->

            <div style="width:100%;">
                <div style="width:48%;float:left;">
                    <el-button type="info" :size="size" class="login-btn" plain @click="resetForm(loginFormRef)">重置
                    </el-button>
                </div>
                <div style="width:4%;float:left;">&nbsp;</div>
                <div style="width:48%;float:left;">
                    <el-button type="primary" :size="size" class="login-btn" @click="submitForm(loginFormRef)">登录
                    </el-button>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script setup lang="ts">
import qs from "qs";
import { onMounted, ref, inject, reactive } from 'vue'
import { useRouter } from "vue-router";
import type { FormInstance, FormRules } from 'element-plus';
import VerifyCode from '../components/VerifyCode.vue'
interface LoginData {
    username: string,
    password: string,
    verifyCode: string
}
const loginForm = reactive<LoginData>({
    username: '',
    password: '',
    verifyCode: ''
})
const loginFormRef = ref<FormInstance>()
    const router=useRouter()
const size = 'large'
const identifyCodes = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789abcdefghjkmnpqrstuvwxyz'
const identifyCode = ref('')
onMounted(() => {
    refreshCode()
    identifyCode.value = ''
    makeCode(identifyCodes, 4)
})

const $wxmAlert: any = inject("$wxmAlert");
const $Http: any = inject("$Http");
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (!valid) {
            console.log('>>>>>>>>>>valid>>>>', fields)
            refreshCode()
            return false
        }
        let params = loginForm

        $Http
            .post("/login", qs.stringify(params))
            .then((resp: any) => {
                if (resp.data.code !== "0") {
                    $wxmAlert(resp.data.message, "提示", { type: "error" });
                    return false;
                }
                sessionStorage.setItem("accessToken", resp.data.data.accessToken);

                console.log('>>>>>>>>>>>>>登录成功：',new Date())
                
                router.push("/home")
            })
            .catch((err: any) => {
                $wxmAlert(err.message || err, "提示", { type: "error" });
            });
    })
}


// 验证码
const randomNum = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const refreshCode = () => {
    identifyCode.value = ''
    makeCode(identifyCodes, 4)
}
const makeCode = (o: any, l: number) => {
    for (let i = 0; i < l; i++) {
        identifyCode.value += identifyCodes[randomNum(0, identifyCodes.length)]
    }
}
const compareCode = (rule: any, value: any, callback: any) => {
    // if (!(identifyCode.toLowerCase() === loginForm.verifyCode.toLowerCase())) {
    if (!(identifyCode.value === loginForm.verifyCode)) {
        // 为了与elementui 自带的校验信息一致{message:'',field:''}
        let obj = reactive({
            message: '',
            field: ''
        })
        obj.message = '验证码错误'
        obj.field = rule.field
        return callback(obj)
    }
    return callback()
}

const rules = reactive<FormRules>({
    username: [
        { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
        { min: 3, message: '长度不能小于3', trigger: ['blur', 'change'] }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
        { min: 3, max: 20, message: '长度在3 到 20之间', trigger: ['blur', 'change'] }
    ],
    verifyCode: [
        { required: true, message: '请输入验证码', trigger: ['blur', 'change'] },
        { validator: compareCode, trigger: ['blur', 'change'] }
    ]
})

</script>
  
<style lang="scss" >
$bgcolor: #2d3a4b;
$color: #c0c4cc;

.login-main {
    width: 100vw;
    height: 100vh;
    //display: inline-block;
    // background-color: $bgcolor;

    .login-btn {
        width: 100% !important;
    }

    input {
        color: #c0c4cc !important;

        &:hover {
            border-color: #7ea1e7 !important;
        }

        &:focus {
            border-color: #409eff !important;
        }

        &::placeholder {
            color: #656D7C;
        }
    }

    .login-main-form {
        position: absolute;
        width: 500px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .login-title {
            height: 126px;
            font-size: 35px;
           // color: #fff;
        }
    }



}
</style>
  