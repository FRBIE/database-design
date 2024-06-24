<template>
  <el-container class="home_container">
    <!-- Header Area -->
    <el-header class="header" v-if="!isLoginPage">
      <div class="header-content">
        <div class="logo-section">
          <img src="../../../public/favicon.ico" alt="Logo" class="logo" />
          <span class="system-name">项目管理系统</span>
        </div>
        <div class="logout-section">
          <el-button type="info" @click="logout">退出</el-button>
        </div>
      </div>
    </el-header>
    <!-- Main Content Area -->
    <el-container>
      <!-- Sidebar -->
      <el-aside width="200px" class="aside" v-if="!isLoginPage">
        <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
            @open="handleOpen"
            @close="handleClose"
            :router="true"
        >
          <el-menu-item index="/project">
            <el-icon><icon-menu /></el-icon>
            <span>项目管理</span>
          </el-menu-item>
          <el-menu-item index="/unit">
            <el-icon><icon-menu /></el-icon>
            <span>单位管理</span>
          </el-menu-item>
          <el-menu-item index="/manager">
            <el-icon><icon-menu /></el-icon>
            <span>负责人管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- Main Content -->
      <el-main class="main-content">
        <!-- Router View -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  computed: {
    isLoginPage() {
      return this.$route.path === '/login';
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.home_container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #545c64;
  color: #fff;
  padding: 0 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
}

.logo {
  height: 30px;
  margin-right: 10px;
}

.system-name {
  font-size: 18px;
  font-weight: bold;
}

.logout-section {
  display: flex;
  align-items: center;
}

.aside {
  background-color: #2c3e50;
  padding-top: 20px;
}

.main-content {
  padding: 20px;
  background-color: #f5f5f5;
}
</style>
