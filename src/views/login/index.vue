<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">3T平台后台管理系统</h3>
      </div>

      <div class="user-item">
        <el-form-item id="fillInput" prop="email">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="email"
            v-model="loginForm.email"
            placeholder="请输入邮箱地址"
            name="email"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
      </div>

      <div class="pwd-item">
        <el-form-item id="fillInput" prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </div>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { validEmail, validPwd } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validdateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('请输入合法的邮箱地址！'))
      } else {
        callback()
      }
    }
    const validdatePwd = (rule, value, callback) => {
      // if (!validPwd(value)) {
      //   callback(new Error('请输入由字母、数字组成的8-20位密码！'))
      // } else {
      //   callback()
      // }
      if (value === '') {
        callback(new Error('请输入由任意字符组成的8-20位密码！'))
      } else {
        callback()
      }
    }
    return {
      // 为了开发方便，填写上个默认值
      loginForm: {
        email: '',
        password: ''
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur', validator: validdateEmail }],
        password: [
          { required: true, trigger: 'blur', validator: validdatePwd },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined // 初始值设置
    }
  },
  watch: {
    // 监听$route中的query地址
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      // 登录请求
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          // console.log(this.loginForm)
          try {
            // 使用Action封装完成请求👀
            await this.$store.dispatch('user/loginActions', this.loginForm)

            // 页面跳转到后台主页（升级：未遂地址处理 --- 登录时）
            // router.replace('/')
            this.$router.replace(this.redirect || '/')
          } catch (err) {
            // 异常提示在axios统一处理
            console.dir(err)
          }
          this.loading = false
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
// $dark_gray: #889aa4;
$light_gray: #eee;

$dark_gray: #516280;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  background-image: url('~@/assets/common/login.jpg');
  background-size: 100% 100%;
  background-size: cover;
  position: absolute;
  background-attachment: fixed;
  height: 100%;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    // padding: 160px 35px 0;
    // margin: 0 auto;
    overflow: hidden;

    background-color: #889aa4;
    margin: 15% auto;
    padding: 0px 40px;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #e8f1fa;
      // margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

// 校验提示
::v-deep .el-form-item__error {
  font-size: 15px;
  padding-top: 10px;
}

.user-item,
.pwd-item {
  margin-bottom: 35px;
}

// 注意权重问题
::v-deep #fillInput input {
  color: #204657 !important;
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #7a8a93 inset !important;
    box-shadow: 0 0 0px 1000px #7a8a93 inset !important;
    -webkit-text-fill-color: #204657 !important;
    font-size: 14px;
  }
}
</style>
