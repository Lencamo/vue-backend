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
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="addRoleBtnFn"
              >新增角色</el-button>
            </el-row>
            <!-- 使用 Table 组件实现用户角色的渲染 -->
            <el-table
              :data="rolesList"
              border
              :header-cell-style="headContentClass"
              style="width: 100%"
            >
              <el-table-column
                :index="nextPageIndex"
                type="index"
                label="序号"
                width="120"
                align="center"
              />
              <el-table-column prop="role" label="角色名" width="240" align="center" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    type="success"
                    @click="setRoles(scope)"
                  >分配权限</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="editRolesFn(scope)"
                  >编辑</el-button>
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
        :title="isEdit ? '编辑角色' : '新增角色'"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :visible.sync="showDialog"
        @close="closeRoleDialog"
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

      <!-- 分配权限弹窗 -->
      <el-dialog
        title="分配权限"
        :visible.sync="dialogVisible"
        width="25%"
        @close="closeMenuDialog"
      >
        <role-permission-dialog
          :role-id="roleId"
          :menu-list-all="menuListAll"
          :role-ids-list="roleIdsList"
          @close="closeMenuDialog"
          @confirm="ConfirmMenuDialog"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getRoleListAllAPI,
  addRoleAPI,
  delRoleAPI,
  getRoleDetailAPI,
  editRoleAPI,
  getMenuListAllAPI,
  getMenuByRoleIdFn
} from '@/api'
import rolePermissionDialog from './components/rolePermissionDialog'

export default {
  components: {
    rolePermissionDialog
  },
  data() {
    return {
      activeName: 'first',
      query: {
        page: 1, // 当前页面
        size: 10 // 页面显示的条数
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
      },

      isEdit: false, // 由于弹窗是共用的，提交时，判断是编辑请求还是新增请求（默认为新增请求）
      roleId: null, // 供编辑、分配权限请求时使用

      dialogVisible: false, // 分配权限弹窗的隐藏和展示
      menuListAll: [], // 权限菜单列表
      roleIdsList: [] // 不同角色的权限菜单列表（采用id简写代替）
    }
  },

  created() {
    this.getRoleListAllFn()
    this.getMenuListAllFn()
  },

  methods: {
    // 每页显示的条数发生改变时触发
    handleSizeChange(newSize) {
      this.query.size = newSize
      this.getRoleListAllFn()
    },

    // 当前页面发生改变时触发
    handleCurrentChange(newPage) {
      this.query.page = newPage
      this.getRoleListAllFn()
    },

    // 表头调整
    headContentClass() {
      return 'text-align: center'
    },

    // 获取角色列表
    async getRoleListAllFn() {
      const { data: res } = await getRoleListAllAPI(this.query)
      // console.log(res)

      if (res.code !== 200) return this.$message.error(res.msg)

      this.rolesList = res.data
      this.total = res.total
    },

    // 获取权限菜单列表
    async getMenuListAllFn() {
      const { data: res } = await getMenuListAllAPI()
      // console.log(res)

      if (res.code !== 200) return this.$message.error(res.msg)

      this.menuListAll = res.data
    },

    // 角色分配权限
    async setRoles(scope) {
      // 在显示弹窗时，显示清除数据(防止出现一闪bug)
      this.roleIdsList = []
      // 当然也可以在子组件中加上 v-if="dialogVisible" 属性直接销毁

      this.dialogVisible = true

      const id = scope.$index
      this.roleId = id // 供获取角色的拥有的菜单权限请求使用

      const { data: res } = await getMenuByRoleIdFn(id)
      // console.log(res)
      this.roleIdsList = res.data
    },

    // 编辑角色
    async editRolesFn(scope) {
      this.isEdit = true // 标明弹窗是编辑请求状态

      const id = scope.$index
      this.roleId = id // 供编辑请求时使用

      const { data: res } = await getRoleDetailAPI(id)
      // console.log(res)
      if (res.code !== 200) return this.$message.error(res.msg)

      // 显示弹窗
      this.showDialog = true
      // 注意要放在弹窗显示后面才会生效（解决先编辑，后新增数据回显的bug）
      this.$nextTick(() => {
        this.roleForm.name = res.data[0].role
        this.roleForm.description = res.data[0].description
      })
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

      this.getRoleListAllFn()
    },

    // 通过新增角色按钮显示弹窗
    addRoleBtnFn() {
      this.isEdit = false // 标明弹窗是新增角色状态
      this.showDialog = true
    },

    // 角色弹框-> 确定按钮
    roleSubmit() {
      this.$refs.roleForm.validate(async(valid) => {
        if (valid) {
          // 1、调用新增角色请求
          if (!this.isEdit) {
            // 添加角色
            const { data: res } = await addRoleAPI(this.roleForm)

            // 响应提示
            if (res.code !== 200) return this.$message.error(res.msg)

            this.$message.success(res.msg)
          } else {
            // 2、调用编辑角色请求
            const data = {
              id: this.roleId,
              roleForm: this.roleForm
            }
            // console.log(data)
            // 修改角色
            const { data: res } = await editRoleAPI(data)
            // 响应提示
            if (res.code !== 200) return this.$message.error(res.msg)
            this.$message.success(res.msg)
          }

          this.getRoleListAllFn()
          // // 清空数据
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

    // 角色弹窗-> x掉时
    closeRoleDialog() {
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },

    // 关于index分页时索引值问题
    nextPageIndex(index) {
      return index + 1 + (this.query.page - 1) * this.query.size
    },
    // 分配权限弹窗-> 确认按钮
    ConfirmMenuDialog(val) {
      // console.log(val)

      // 发送数据（由于涉及角色菜单关联表，无法模拟）

      this.dialogVisible = false
      this.getRoleListAllFn()
    },

    // 分配权限弹窗-> 取消按钮
    closeMenuDialog() {
      this.dialogVisible = false
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
