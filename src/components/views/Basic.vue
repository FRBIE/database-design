<template>
  <el-container class="home_container">
    <!-- Header Area -->
    <el-header class="header">
      <div class="header-content">
        <div class="logo-section">
          <img src="/favicon.ico" alt="Logo" class="logo" />
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
      <el-aside width="200px" class="aside">
        <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            class="el-menu-vertical-demo"
            default-active="1"
            @open="handleOpen"
            @close="handleClose"
        ><router-link to="/index/project" class="menu-link">
          <el-menu-item index="1">
            项目管理
          </el-menu-item>
        </router-link>
          <router-link to="/index/unit" class="menu-link">
            <el-menu-item index="2">
              单位管理
            </el-menu-item>
          </router-link>
          <router-link to="/index/manager" class="menu-link">
            <el-menu-item index="3">
              负责人管理
            </el-menu-item>
          </router-link>
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
import axios from "axios";

export default {
  methods: {
    logout() {
      axios.post("/user/logout");
      this.$router.push('/login');
    }
  }
};
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

/* 自定义 router-link 的样式 */
.menu-link {
  color: #fff;
  text-decoration: none;
}

.menu-link:hover {
  color: #ffd04b;
}

/* 调整选中时的背景颜色 */
.el-menu-item.is-active {
  background-color: #445569; /* 选中时的背景色 */
}
</style>