<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import axios from 'axios';
import { useRouter } from 'vue-router';

const labelPosition = ref<FormInstance['labelPosition']>('left');

const LoginForm = ref({
  userAccount: '',
  userPassword: '',
});

const rules = ref<FormRules>({
  userAccount: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  userPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
});

const router = useRouter();

const loginFormRef = ref<FormInstance>();

const handleLogin = () => {
  if (loginFormRef.value) {
    axios.post('/user/login', LoginForm.value).then(response => {
      if (response.data.code === 0) {
        alert('登录成功');
        router.push('/index');
      } else {
        alert('登录失败');
      }
    }).catch(error => {
      console.error(error);
    });
  } else {
    console.log('error submit!!');
    return false;
  }
};
</script>

<template>
  <div class="login-container">
    <img src="https://www.mbachina.com/uploads/yxk/202005/12/1589274008955925.jpg" alt="Logo" class="logo" />
    <h2 class="title">项目管理系统</h2>
    <el-form
        :label-position="labelPosition"
        label-width="auto"
        :model="LoginForm"
        :rules="rules"
        ref="loginFormRef"
        class="login-form"
    >
      <el-form-item label="账号" prop="userAccount">
        <el-input v-model="LoginForm.userAccount" />
      </el-form-item>
      <el-form-item label="密码" prop="userPassword">
        <el-input v-model="LoginForm.userPassword" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('https://pic.netbian.com/uploads/allimg/240624/231407-1719242047b936.jpg'); /* 替换为你的背景图片路径 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.logo {
  width: 80px;
  height: 80px;
  border-radius: 50%; /* 将图片设置为圆形 */
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.login-form {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8); /* 添加一个半透明的背景色 */
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>
