<script lang="ts" setup >
import { ref } from 'vue'
import {FormProps} from "element-plus";
import axios from "axios";

import {useRouter} from "vue-router";

const labelPosition = ref<FormProps['labelPosition']>('left')

const LoginForm = ref({
  userAccount: '',
  userPassword: '',
})
const router = useRouter();
const Login = (LoginForm ) => {
  axios.post("/user/login",LoginForm).then(
      response =>{
        if(response.data.code === 0){
          alert("登录成功")
          router.push("/project")
        }else{
          alert("登录失败")
        }
      }
  ).catch(error =>{
    console.error(error);
  })
}

</script>
<template>
  <el-form
      :label-position="labelPosition"
      label-width="auto"
      :model="LoginForm"
      style="max-width: 600px"
  >
    <el-form-item label="账号">
      <el-input v-model="LoginForm.userAccount" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="LoginForm.userPassword" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="Login(LoginForm)">登录</el-button>
    </el-form-item>

  </el-form>
</template>

