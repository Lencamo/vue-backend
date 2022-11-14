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
          <el-button type="danger" size="small">导入excel</el-button>
          <el-button type="success" size="small">导出excel</el-button>
          <el-button type="primary" size="small" @click="addUserBtnFn">新增用户</el-button>
        </template>
      </page-tools>

      <!-- 二、主体内容区域 -->
      <el-card style="margin-top: 10px">
        <el-table ref="usersTable" border :data="userList" @row-dblclick="handleRowDbClick">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            :index="nextPageIndex"
            type="index"
            label="序号"
            width="60"
            align="center"
          />
          <el-table-column prop="role" label="角色" width="100" align="center" />
          <el-table-column prop="name" label="姓名" width="120" align="center" />
          <el-table-column prop="classes" label="班级" width="180" align="center" />
          <el-table-column prop="studentId" label="学号" width="180" align="center" />
          <el-table-column prop="email" label="邮箱" width="180" align="center" />
          <el-table-column prop="uuid" label="uuid" width="180" align="center" />
          <el-table-column fixed="right" label="操作" min-width="260" align="center">
            <template slot-scope="scope">
              <el-button
                @click="editUserBtnFn(scope)"
                type="warning"
                icon="el-icon-edit-outline"
                size="mini"
                plain
              ></el-button>
              <el-button type="primary" size="mini" plain>分配角色</el-button>
              <el-button
                @click="delUserBtnFn(scope)"
                type="danger"
                icon="el-icon-delete"
                size="mini"
                plain
              ></el-button>
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
      :title="isEdit ? '编辑用户' : '新增用户'"
      :visible.sync="showDialog"
      @close="dialogCloseFn"
    >
      <user-dialog
        ref="userDialog"
        :is-dialog.sync="showDialog"
        :rolesList="rolesList"
        :userDetail="userDetail"
        :isEdit="isEdit"
        @userDataAdd="userDataAddFn"
        @userDataEdit="userDataEditFn"
      ></user-dialog>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserListAllAPI,
  getRoleListAPI,
  addUserAPI,
  delUserAPI,
  getUserDetailAPI,
  editUserAPI
} from '@/api'

import userDialog from './components/userDialog.vue'
export default {
  name: 'Employees',
  components: {
    userDialog
  },
  data() {
    return {
      query: {
        page: 1, // 页码
        size: 5 // 每页条数
      },
      total: 0, // 数据总条数
      userList: [], // 用户列表数据

      showDialog: false, // 是否暂时弹窗

      rolesList: [], // 用于传递给弹窗子组件的数据（不在子组件请求：防止api请求泛滥）

      isEdit: false, // 由于弹窗是共用的，提交时，判断是编辑请求还是新增请求（默认为新增请求）
      userDetail: '', // 用户信息（用于传递给子组件）
      userId: '' // 用户的索引值（供编辑用户请求调用）
    }
  },
  created() {
    this.getUserListAllFn()
    this.handleRolesList()
  },

  methods: {
    // 每页显示的条数发生改变时触发
    handleSizeChange(newSize) {
      this.query.size = newSize
      this.getUserListAllFn()
    },

    // 当前页面发生改变时触发
    handleCurrentChange(newPage) {
      this.query.page = newPage
      this.getUserListAllFn()
    },

    // 获取用户列表
    async getUserListAllFn() {
      const { data: res } = await getUserListAllAPI(this.query)
      // console.log(res)

      if (res.code !== 200) return this.$message.error(res.msg)

      this.userList = res.data
      this.total = res.total
    },

    // 添加用户按钮
    addUserBtnFn() {
      this.isEdit = false // 标明弹窗是新增角色状态
      this.showDialog = true
    },

    // 删除用户按钮
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

      this.getUserListAllFn()
    },

    // 编辑用户按钮
    async editUserBtnFn(scope) {
      this.isEdit = true // 标明弹窗是编辑请求状态

      const id = scope.$index
      this.userId = id // 供编辑请求时使用

      const { data: res } = await getUserDetailAPI(id)
      // console.log(res)
      if (res.code !== 200) return this.$message.error(res.msg)

      // 显示弹窗
      this.showDialog = true

      // 数据回显（注意编辑时解决数据回显问题）
      this.userDetail = res.data[0]
      // console.log(this.userDetail)
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

      this.getUserListAllFn()
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

      this.getUserListAllFn()
    },

    // 关闭弹窗时，清空表单👏
    dialogCloseFn() {
      // 防止新增用户在提交前被清空
      this.$nextTick(() => {
        this.$refs.userDialog.$refs.userForm.resetFields()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  background: #889aa4;
}
</style>
