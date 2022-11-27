<template>
  <div>
    <el-radio-group v-model="radioCheck" class="core-box" @input="checkValue">
      <el-radio v-for="item in roles" :key="item" :label="item" class="radio-item" />
    </el-radio-group>

    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="cancleDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmDialog">确 定</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'GiveRole',
  props: {
    rolesList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      radioCheck: 'super-admin', // 初次选择中的单选框
      roles: this.rolesList, // 角色列表

      checkRole: 'super-admin' // 手动选中的角色
    }
  },
  created() {
    // console.log(this.rolesList)
  },
  methods: {
    // 角色选择
    checkValue(val) {
      // console.log(val)
      this.checkRole = val
    },

    // 点击取消按钮
    cancleDialog() {
      this.$emit('close')
    },

    // 点击确定按钮
    async confirmDialog() {
      this.$emit('confirm', this.checkRole)
    }
  }
}
</script>

<style lang="scss" scoped>
.core-box {
  margin: 0px 0px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  font-size: 33px;
}

.radio-item {
  margin: 10px;
  padding: 10px 20px;
  box-sizing: border-box;
}

.radio-item:hover {
  border-radius: 20px;
  background-color: #f3f4f5;
}

::v-deep .el-radio__label {
  font-size: 16px;
}

.footer {
  margin-top: 30px;
}
</style>
