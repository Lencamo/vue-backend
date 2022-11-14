<template>
  <!-- 表单 -->
  <el-form ref="userForm" :model="userFormData" :rules="rules" label-width="100px" justify="center">
    <el-form-item prop="name" label="姓名">
      <el-input v-model="userFormData.name" style="width: 80%" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item prop="classes" label="班级">
      <el-input v-model="userFormData.classes" style="width: 80%" placeholder="请输入班级信息" />
    </el-form-item>
    <el-form-item prop="studentId" label="学号">
      <el-input v-model="userFormData.studentId" style="width: 80%" placeholder="请输入学号" />
    </el-form-item>
    <el-form-item prop="email" label="邮箱">
      <el-input v-model="userFormData.email" style="width: 80%" placeholder="请输入邮箱地址" />
    </el-form-item>
    <el-form-item prop="role" label="角色">
      <el-select v-model="userFormData.role" style="width: 80%" placeholder="请设置用户角色">
        <el-option v-for="(item, index) in roles" :key="index" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="addCancel">取消</el-button>
      <el-button @click="addSubmit" type="primary">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'userDialog',
  props: ['rolesList', 'userDetail', 'isEdit'],
  created() {
    this.$nextTick(() => {
      this.userFormData = this.userDetail
    })
  },
  data() {
    return {
      // 角色列表
      roles: this.rolesList,
      // 当前行的用户信息
      userDetail: this.userDetail,
      // 当前弹窗所处的状态
      isEdit: this.isEdit,

      // 表单数据
      userFormData: {
        name: '', // 姓名
        classes: null, // 班级
        studentId: null, // 学号
        email: '', // 邮箱
        role: '' // 角色
      },
      // 表单校验
      rules: {
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        // classes: [{ required: true, message: '班级不能为空', trigger: 'blur' }],
        // studentId: [{ required: true, message: '学号不能为空', trigger: 'change' }],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          {
            pattern: /^([A-z0-9]{6,18})(\w|\-)+@[A-z0-9]+\.([A-z]{2,3})$/,
            message: '请输入合法的邮箱格式',
            trigger: 'blur'
          }
        ],
        role: { required: true, message: '请选择用户角色', trigger: 'change' }
      }
    }
  },
  methods: {
    // 点击取消按钮
    addCancel() {
      this.$emit('update:isDialog', false)
    },

    // 点击确定按钮
    addSubmit() {
      // 表单兜底校验
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          // 1、调用新增角色请求
          if (!this.isEdit) {
            // 先父组件传递表单数据
            this.$emit('userDataAdd', this.userFormData)
            this.$emit('update:isDialog', false)
          } else {
            // 2、调用编辑角色请求
            this.$emit('userDataEdit', this.userFormData)
            this.$emit('update:isDialog', false)
          }

          this.userFormData = {
            name: '', // 姓名
            classes: null, // 班级
            studentId: null, // 学号
            email: '', // 邮箱
            role: '' // 角色
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
