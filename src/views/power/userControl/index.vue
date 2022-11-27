<template>
  <div class="userControl-container">
    <div class="app-container">
      <!-- 一、头部组件引入 -->
      <page-tools>
        <!-- 插槽一 -->
        <template #slot-left>
          <span>共 {{ total }} 条记录</span>
        </template>

        <!-- 插槽二  -->
        <template #slot-right>
          <el-button type="danger" size="small" @click="uploadExcelBtnFn">导入excel</el-button>
          <el-button type="success" size="small" @click="downloadExcel">导出excel</el-button>
          <el-button type="primary" size="small" @click="addUserBtnFn">新增用户</el-button>
        </template>
      </page-tools>

      <!-- 二、主体内容区域 -->
      <el-card style="margin-top: 10px">
        <el-table
          ref="usersTable"
          :cell-style="contentClass"
          :header-cell-style="headContentClass"
          border
          :data="userList"
          @row-dblclick="handleRowDbClick"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            :index="nextPageIndex"
            type="index"
            label="序号"
            width="60"
            align="center"
          />
          <el-table-column prop="name" label="姓名" width="120" align="center" />
          <!-- <el-table-column prop="role" label="角色" width="100" align="center" /> -->
          <el-table-column prop="role" label="角色" width="100" align="center">
            <template slot-scope="scope">
              <el-tag
                effect="plain"
                size="small"
                :type="
                  scope.row.role == 'super-admin'
                    ? 'danger'
                    : scope.row.role == 'root'
                      ? 'warning'
                      : scope.row.role == 'oj-admin'
                        ? 'primary'
                        : scope.row.role == 'teacher'
                          ? 'success'
                          : 'info'
                "
              >{{ scope.row.role }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="classes" label="班级" width="180" />
          <el-table-column prop="studentId" label="学号" width="180" />
          <el-table-column prop="email" label="邮箱" width="180" />
          <el-table-column prop="uuid" label="uuid" width="180" />
          <el-table-column fixed="right" label="操作" min-width="260">
            <template slot-scope="scope">
              <el-button
                type="warning"
                icon="el-icon-edit-outline"
                size="mini"
                plain
                @click="editUserBtnFn(scope)"
              />
              <el-button
                type="primary"
                size="mini"
                plain
                @click="assignRole(scope)"
              >更改角色</el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                plain
                @click="delUserBtnFn(scope)"
              />
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
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
        </el-row>
      </el-card>
    </div>

    <!-- 用户弹窗 -->
    <el-dialog
      v-if="showDialog"
      :title="isEdit ? '编辑用户' : '新增用户'"
      :visible.sync="showDialog"
      @close="dialogCloseFn"
    >
      <user-dialog
        ref="userDialog"
        :is-dialog.sync="showDialog"
        :roles-list="rolesList"
        :user-detail="userDetail"
        :is-edit="isEdit"
        @userDataAdd="userDataAddFn"
        @userDataEdit="userDataEditFn"
      />
    </el-dialog>

    <!-- 分配角色弹窗 -->
    <el-dialog title="分配权限" :visible.sync="showDialogNext" @close="cancleDialog">
      <give-role-dialog
        :roles-list="rolesList"
        @close="showDialogNext = false"
        @confirm="roleChangeFn"
      />
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserListAllAPI,
  getUserListAPI,
  getRoleListAPI,
  addUserAPI,
  delUserAPI,
  getUserDetailAPI,
  editUserAPI,
  userRoleChangeAPI
} from '@/api'

import userDialog from './components/userDialog.vue'
import giveRoleDialog from './components/giveRoleDialog'

export default {
  name: 'Employees',
  components: {
    userDialog,
    giveRoleDialog
  },
  data() {
    return {
      test1: true,
      query: {
        page: 1, // 页码
        size: 5 // 每页条数
      },
      total: 0, // 数据总条数
      userList: [], // 用户列表数据

      showDialog: false, // 是否展示用户弹窗

      rolesList: [], // 用于传递给弹窗子组件的数据（不在子组件请求：防止api请求泛滥）

      isEdit: false, // 由于弹窗是共用的，提交时，判断是编辑请求还是新增请求（默认为新增请求）

      // bug修复（数据类型导致组件报错问题）
      userDetail: {
        name: '', // 姓名
        classes: null, // 班级
        studentId: null, // 学号
        email: '', // 邮箱
        role: '' // 角色
      }, // 用户信息（用于传递给子组件）
      userId: '', // 用户的索引值（供编辑用户请求调用）

      showDialogNext: false // 是否展示角色弹窗
    }
  },
  created() {
    this.getUserListByQueryFn()
    this.handleRolesList()
  },

  methods: {
    // 每页显示的条数发生改变时触发
    handleSizeChange(newSize) {
      this.query.size = newSize
      this.getUserListByQueryFn()
    },

    // 当前页面发生改变时触发
    handleCurrentChange(newPage) {
      this.query.page = newPage
      this.getUserListByQueryFn()
    },

    // 表单内容位置调整
    contentClass() {
      return 'text-align: center'
    },

    // 表头调整
    headContentClass() {
      return 'text-align: center'
    },

    // 获取用户列表
    async getUserListByQueryFn() {
      const { data: res } = await getUserListAPI(this.query)
      // console.log(res)

      if (res.code !== 200) return this.$message.error(res.msg)

      this.userList = res.data
      this.total = res.total
    },

    // 添加用户按钮
    addUserBtnFn() {
      this.isEdit = false // 标明弹窗是新增角色状态

      // 先选编辑、后先新增--导致数据回显的bug修复
      this.userDetail = {
        name: '', // 姓名
        classes: null, // 班级
        studentId: null, // 学号
        email: '', // 邮箱
        role: '' // 角色
      }

      this.showDialog = true
    },

    // 1、删除用户按钮
    async delUserBtnFn(scope) {
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
      const { data: res } = await delUserAPI(id)

      if (res.code !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)

      this.getUserListByQueryFn()
    },

    // 2、编辑用户按钮
    async editUserBtnFn(scope) {
      this.isEdit = true // 标明弹窗是编辑请求状态

      const id = scope.$index
      this.userId = id // 供弹窗编辑请求时使用

      const { data: res } = await getUserDetailAPI(id)
      // console.log(res)
      if (res.code !== 200) return this.$message.error(res.msg)

      // 显示弹窗
      this.showDialog = true

      // 数据回显（注意编辑时解决数据回显问题）
      // 由于对子组件进行了销毁，不用担心this.userDetail拥有值的时机😭
      // this.$nextTick(() => {
      this.userDetail = res.data[0]
      // })
      // console.log(this.userDetail)
    },

    // 3、分配角色按钮
    assignRole(scope) {
      const id = scope.$index
      // console.log(id)
      this.userId = id // 供弹窗编辑请求时使用
      // console.log(this.userId)

      // 显示弹窗
      this.showDialogNext = true
    },

    // 表格单行双击事件
    handleRowDbClick(row) {
      this.$refs.usersTable.toggleRowSelection(row)
    },

    // 关于index分页时索引值问题
    nextPageIndex(index) {
      return index + 1 + (this.query.page - 1) * this.query.size
    },

    // 处理获取的rolesList列表
    async handleRolesList() {
      const { data: res } = await getRoleListAPI()
      // console.log(res)
      this.rolesList = res.data
    },

    // 添加用户确认后操作
    async userDataAddFn(val) {
      // console.log(val)
      const { data: res } = await addUserAPI(val)
      // console.log(res)

      if (res.code !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)

      this.getUserListByQueryFn()
    },

    // 编辑用户确认后操作
    async userDataEditFn(val) {
      // console.log(val)
      const data = {
        id: this.userId,
        userForm: val
      }

      const { data: res } = await editUserAPI(data)
      // console.log(res)

      if (res.code !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)

      this.getUserListByQueryFn()
    },

    // 更改角色确然操作
    async roleChangeFn(val) {
      // console.log(val)

      const data = {
        id: this.userId,
        role: val
      }
      // console.log(data)

      const { data: res } = await userRoleChangeAPI(data)
      // console.log(res)
      if (res.code !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)

      this.showDialogNext = false

      this.getUserListByQueryFn()
    },

    // 关闭用户弹窗时，清空表单👏
    dialogCloseFn() {
      // 防止新增用户在提交前被清空
      this.$refs.userDialog.$refs.userForm.resetFields()
    },

    // 关闭角色弹窗
    cancleDialog() {
      this.showDialogNext = false
    },

    // 导出Excel按钮-->点击事件
    downloadExcel() {
      import('@/utils/Export2Excel').then(async(excel) => {
        const header = ['姓名', '角色', '班级', '学号', '邮箱', 'UUid']

        // 1、list（获取所以用户信息--json数据）
        const { data: res } = await getUserListAllAPI()
        // console.log(res)
        if (res.code !== 200) return this.$message.error(res.msg)
        const list = res.data
        // 2、filterVal（待映射数据）
        const filterVal = ['name', 'role', 'classes', 'studentId', 'email', 'uuid']

        // json数据转换---二维数组
        const dataArr = list.map((v) =>
          filterVal.map((j) => {
            return v[j]
          })
        )
        // console.log(dataArr)

        excel.export_json_to_excel({
          header,
          data: dataArr,
          filename: '三体平台-用户名单',
          autoWidth: true, // 宽度自适应
          bookType: 'xlsx' // 生成文件类型
        })
      })
    },

    // 导入Excel安装-->点击事件
    uploadExcelBtnFn() {
      this.$router.push('/excel')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  background: #889aa4;
}
</style>
