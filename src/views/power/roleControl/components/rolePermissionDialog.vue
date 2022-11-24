<template>
  <div>
    <el-tree
      :data="menuListAll"
      :props="{ label: 'title' }"
      show-checkbox
      default-expand-all
      check-strictly
      style="margin: 10px 10% 20px; font-size: 20px"
    />

    <el-row slot="footer" type="flex" justify="center">
      <el-col style="width: 50%; text-align: center">
        <el-button size="small" @click="cancelButton">取 消</el-button>
        <el-button size="small" type="primary" @click="setRolesBtn">确 定</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'rolePermission',
  props: {
    menuListAll: {
      type: Array,
      default: (_) => []
    },
    roleId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {}
  },
  created() {
    // console.log(this.roleId)
  },
  methods: {
    // 取消按钮
    cancelButton() {
      this.$emit('close')
    },

    // 设置权限按钮
    setRolesBtn() {}
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tree-node__label {
  font-size: 17px;
}

::v-deep .el-tree-node__content {
  margin: 5px;
  padding: 10px 0px;
}

.footer {
  margin-top: 30px;
}
</style>
