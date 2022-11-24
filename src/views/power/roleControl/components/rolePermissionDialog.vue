<template>
  <div>
    <el-tree
      ref="tree"
      :data="menuListAll"
      :props="{ label: 'title' }"
      node-key="id"
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
    roleIdsList: {
      type: Array,
      default: (_) => []
    },
    roleId: {
      type: [Number, String],
      required: true
    }
  },

  // 设置勾选的节点（需要搭配node-key="id"）
  watch: {
    roleIdsList() {
      this.$refs.tree.setCheckedKeys(this.roleIdsList)
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
    setRolesBtn() {
      // 获取重新设置的新的权限菜单id数组
      const new_roleIdsList = this.$refs.tree.getCheckedKeys()
      this.$emit('confirm', { id: this.roleId, roleIdsList: new_roleIdsList })
    }
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
