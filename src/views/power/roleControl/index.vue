<template>
  <div class="roleControl-container">
    <div class="app-container">
      <!-- 卡片组件 -->
      <el-card class="box-card">
        <!-- 使用 Tabs 组件完成标签页布局 -->
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first" class="tab-pane">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button @click="addRoleBtnFn" icon="el-icon-plus" size="small" type="primary"
                >新增角色</el-button
              >
            </el-row>
            <!-- 使用 Table 组件实现用户角色的渲染 -->
            <el-table :data="rolesList" border style="width: 100%">
              <el-table-column :index="nextPageIndex" type="index" label="序号" width="120" />
              <el-table-column prop="role" label="角色名" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="success" @click="setRoles(scope.row)"
                    >分配权限</el-button
                  >
                  <el-button size="small" type="primary" @click="editRolesFn(scope)"
                    >编辑</el-button
                  >
                  <el-button size="small" type="danger" @click="delRolesFn(scope)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination
              :current-page="query.page"
              :page-sizes="[5, 10, 15, 20, 25]"
              :page-size="query.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>
        </el-tabs>
      </el-card>

      <!-- 添加角色弹窗（新增、修改角色共用） -->
      <el-dialog
        title="新增角色"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :visible.sync="showDialog"
      >
        <el-form ref="roleForm" :model="roleForm" :rules="roleRules" label-width="100px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>

        <!-- 底部 -->
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="cancleRoles">取消</el-button>
            <el-button size="small" type="primary" @click="roleSubmit">确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoleListAllAPI, addRoleAPI, delRoleAPI, getRoleDetailAPI } from '@/api'

export default {
  data() {
    return {
      activeName: 'first',
      query: {
        page: 1, // 当前页面
        size: 5 // 页面显示的条数
      },
      rolesList: [], // 角色列表
      total: 0, // 角色数据总条数

      showDialog: false, // 控制弹框的隐藏和展示
      // 添加角色
      roleForm: {
        name: '',
        description: ''
      },
      // 添加角色验证
      roleRules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }]
      }
    }
  },

  created() {
    this.getRoleListAllAFn()
  },
  methods: {
    // 每页显示的条数发生改变时触发
    handleSizeChange(newSize) {
      this.query.size = newSize
      this.getRoleListAllAFn()
    },

    // 当前页面发生改变时触发
    handleCurrentChange(newPage) {
      this.query.page = newPage
      this.getRoleListAllAFn()
    },

    // 获取角色列表
    async getRoleListAllAFn() {
      const { data: res } = await getRoleListAllAPI(this.query)
      // console.log(res)

      if (res.code !== 200) return this.$message.error(res.msg)

      this.rolesList = res.data
      this.total = res.total
    },

    // 设置角色
    setRoles() {},

    // 编辑角色
    async editRolesFn(scope) {
      const id = scope.$index

      const { data: res } = await getRoleDetailAPI(id)
      // console.log(res)

      // 显示弹窗
      this.roleForm.name = res.data[0].role
      this.roleForm.description = res.data[0].description
      this.showDialog = true
    },

    // 删除角色
    async delRolesFn(scope) {
      // console.log(scope.$index)
      const id = scope.$index

      // 显示删除询问对话框（必要条件）
      const delRes = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)

      // 1、若取消操作
      if (delRes === 'cancel') return this.$message.info('您取消了删除')

      // 2、若执行操作
      const { data: res } = await delRoleAPI(id)

      if (res.code !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)

      this.getRoleListAllAFn()
    },

    // 通过新增角色按钮显示弹窗
    addRoleBtnFn() {
      this.showDialog = true
    },
    // 角色弹框-> 确定按钮
    async roleSubmit() {
      this.$refs.roleForm.validate(async (valid) => {
        if (valid) {
          // 添加角色
          const { data: res } = await addRoleAPI(this.roleForm)

          // 响应提示
          if (res.code !== 200) return this.$message.error(res.msg)
          this.$message.success(res.msg)

          this.getRoleListAllAFn()
          // 清空数据
          this.roleForm.name = ''
          this.roleForm.description = ''
          this.showDialog = false
        }
      })
    },

    // 角色弹框-> 取消按钮
    cancleRoles() {
      // console.log(this.roleForm)
      // 清空数据
      this.roleForm.name = ''
      this.roleForm.description = ''

      this.showDialog = false
    },

    // 关于index分页时索引值问题
    nextPageIndex(index) {
      return index + 1 + (this.query.page - 1) * this.query.size
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  background: #889aa4;
}

.box-card {
  padding: 10px 30px;
}

.tab-pane {
  padding: 20px;
}

.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
