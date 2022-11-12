<template>
  <div class="employees-container">
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
          <el-button type="primary" size="small">新增用户</el-button>
        </template>
      </page-tools>

      <!-- 二、主体内容区域 -->
      <el-card style="margin-top: 10px">
        <el-table ref="usersTable" border :data="userList" @row-dblclick="handleRowDbClick">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="role" label="角色" width="100" align="center" />
          <el-table-column prop="name" label="姓名" width="120" align="center" />
          <el-table-column prop="classes" label="班级" width="180" align="center" />
          <el-table-column prop="studentId" label="学号" width="180" align="center" />
          <el-table-column prop="email" label="邮箱" width="180" align="center" />
          <el-table-column prop="uuid" label="uuid" width="180" align="center" />
          <el-table-column fixed="right" label="操作" min-width="260" align="center">
            <template>
              <el-button type="warning" icon="el-icon-edit-outline" size="mini" plain></el-button>
              <el-button type="primary" size="mini" plain>分配角色</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
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
  </div>
</template>

<script>
import { getUserListAllAPI } from '@/api'
export default {
  name: 'Employees',
  data() {
    return {
      query: {
        page: 1, // 页码
        size: 5 // 每页条数
      },
      total: 0, // 数据总条数
      userList: [] // 用户列表数据
    }
  },
  created() {
    this.getUserListAllFn()
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
      console.log(res)

      if (res.code !== 200) return this.$message.error(res.message)

      this.userList = res.data
      this.total = res.total
    },

    // 表格单行双击事件
    handleRowDbClick(row) {
      this.$refs.usersTable.toggleRowSelection(row)
    }
  }
}
</script>

<style lang="scss" scoped></style>
