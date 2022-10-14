<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <!-- 面包屑 -->
    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <!-- 头部名称 -->
    <div class="app-breadcrumb">
      “教、学、练”三位一体教学平台
      <span class="breadBtn">测试版</span>
    </div>

    <!-- 右侧下拉菜单 -->
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <!-- 1、点击区域 -->
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" />
          <span class="name">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <!-- 2、下拉区域 -->
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- 首页 -->
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <!-- 前台 -->
          <a target="_blank" href="http://10.22.130.17/#/">
            <el-dropdown-item>三体平台</el-dropdown-item>
          </a>
          <!-- 退出登陆 -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import authorPic from '@/assets/common/authorPic.png'

export default {
  components: {
    // Breadcrumb,
    Hamburger
  },
  data() {
    return {
      // 暂时用随机的用户名
      // name: '20631740233'
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'name']),

    // 暂时用默认头像!!!
    avatar() {
      return authorPic
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      // vue-element-admin 模板原代码
      // await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$confirm('你确定要离开吗?, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$store.dispatch('user/logOutActions')

          // 跳转到登录页面（升级：未遂地址处理 --- 退出时）
          // this.$router.replace('/login')
          this.$router.replace(`/login?redirect=${encodeURIComponent(this.$route.fullPath)}`)

          // 退出成功提示
          this.$message.success('退出成功!')
        })
        .catch(() => {
          // 取消退出提示
          this.$message.info('已取消退出')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  // background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  // 头部区域背景颜色
  background: #889aa4;

  // 头部名称样式
  .app-breadcrumb {
    display: inline-block;
    font-size: 18px;
    line-height: 50px;
    margin-left: 10px;
    color: #23272e;
    cursor: text;

    .breadBtn {
      background: #ecd8b5;
      font-size: 14px;
      padding: 0 10px;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      border-radius: 10px;
      margin-left: 15px;
    }
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      // 顶部右侧区域样式调整
      .avatar-wrapper {
        font-size: 16px;

        .user-avatar {
          width: 35px;
          height: 35px;
          border-radius: 10px;

          vertical-align: middle;
        }

        .name {
          cursor: pointer;
          color: #fff;
          margin: 0px 15px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
