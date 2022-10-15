<template>
  <div class="dashboard-container">
    <div class="userMsg">
      <div class="left-box">
        <img :src="avatarPic" alt="" />
      </div>
      <div class="right-box">
        <span class="roleMsg">超级管理员</span>
        <span class="idMsg">当你的才华还撑不起你的野心时，你就该努力。</span>
      </div>
    </div>
    <div class="picShow">
      <img src="@/assets/common/dashboardPic.gif" alt="" />
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import authorPic from '@/assets/common/authorPic.png'

export default {
  name: 'Dashboard',
  computed: {
    // ...mapGetters(['name']),

    // 暂时用默认头像!!!
    avatarPic() {
      return authorPic
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  .userMsg {
    margin: 50px 0px 0px 70px;
    display: flex;
    .left-box {
      height: 130px;
      width: 130px;
      border-radius: 65px;
      overflow: hidden;
      background-color: red;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .right-box {
      display: flex;
      flex-direction: column;

      margin-left: 30px;

      .roleMsg {
        margin: 22px 0px 25px 0px;
        font-size: 38px;
        font-weight: 400;
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
</style>
