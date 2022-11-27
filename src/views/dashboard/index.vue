<template>
  <div class="dashboard-container">
    <!-- 头部区域 -->
    <el-card>
      <div class="title-box">
        <div class="left-box">
          <img :src="avatarPic" alt="">
        </div>
        <div class="right-box">
          <h1 class="roleMsg">{{ roleEn2Zn }}</h1>
          <span class="idMsg">当你的才华还撑不起你的野心时，你就该努力。</span>
        </div>
      </div>
    </el-card>

    <!-- 中间核心区域 -->
    <el-row type="flex" justify="space-between">
      <!-- 左侧内容 -->
      <el-col :span="13" style="margin-right: 10px">
        <!-- 工作日历 -->
        <el-card class="box-card">
          <div slot="header" class="header">
            <span>工作日历</span>
          </div>
          <el-calendar v-model="value" />
        </el-card>
      </el-col>

      <!-- 右侧内容 -->
      <el-col :span="11" style="margin-left: 10px">
        <!-- 帮助连接 -->
        <el-card class="box-card">
          <div class="header">
            <span>平台直达</span>
          </div>
          <div class="sideLink">
            <el-row>
              <el-col :span="8">
                <a href="#">
                  <span class="icon iconGuide" />
                  <p>三体平台</p>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="#">
                  <span class="icon iconHelp" />
                  <p>oj平台</p>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="#">
                  <span class="icon iconTechnology" />
                  <p>其他</p>
                </a>
              </el-col>
            </el-row>
          </div>
        </el-card>

        <!-- 底部动图区域 -->
        <div class="picShow">
          <img src="@/assets/common/dashboardPic.gif" alt="">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import authorPic from '@/assets/common/authorPic.png'
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      value: new Date()
    }
  },
  computed: {
    // ...mapGetters(['name']),

    ...mapState('user', ['userInfoAll']),

    // 暂时用默认头像!!!
    avatarPic() {
      return authorPic
    },

    roleEn2Zn() {
      if (this.userInfoAll.role[0] === 'super-admin') {
        return '超级管理员'
      } else {
        switch (this.userInfoAll.role[0]) {
          case 'super-admin':
            return '超级管理员'
          case 'root':
            return '模块管理员'
          case 'oj-admin':
            return 'oj管理员'
          case 'teacher':
            return '教师用户'
          default:
            return '普通用户'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  margin: 20px;
  // 头部区域
  .title-box {
    display: flex;
    .left-box {
      margin: 10px;
      border-radius: 45px;
      overflow: hidden;
      img {
        width: 90px;
        height: 90px;
      }
    }
    .right-box {
      margin-left: 10px;
      .roleMsg {
        font-size: 28px;
      }
      .idMsg {
        background-color: #959698;
        border-radius: 10px;
        text-align: center;
        padding: 3px 8px;
        font-size: 15px;
        color: aliceblue;
      }
    }
  }

  // 底部动图区域
  .picShow {
    position: relative;
    width: 100%;
    img {
      // 居中
      position: absolute;
      left: 50%;
      margin-left: -200px;

      margin-top: 100px;
    }
  }
}

// 平台直达区域
.box-card {
  padding: 5px 10px;
  margin-top: 20px;
  .header {
    span {
      color: #2c3e50;
      font-size: 24px;
      border-bottom: 4px solid #8a97f8;
      padding-bottom: 10px;
    }
  }
  .sideLink {
    text-align: center;
    padding: 30px 0 12px;
    .icon {
      display: inline-block;
      width: 76px;
      height: 76px;
      background: url('./../../assets/common/icon.png') no-repeat;
    }
    .iconGuide {
      background-position: 0 0;
    }
    .iconHelp {
      background-position: -224px 0;
    }
    .iconTechnology {
      background-position: -460px 0;
    }
  }
}
</style>
