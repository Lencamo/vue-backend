<template>
  <div class="employees-container">
    <div class="app-container">
      <!-- 一、头部组件引入 -->
      <page-tools>
        <!-- 插槽一 -->
        <template #slot-left>
          <span>共 19 条记录</span>
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
        <el-table border>
          <el-table-column label="序号" />
          <el-table-column label="姓名" />
          <el-table-column label="头像" />
          <el-table-column label="手机号" />
          <el-table-column label="工号" />
          <el-table-column label="聘用形式" />
          <el-table-column label="部门" />
          <el-table-column label="入职时间" />
          <el-table-column label="操作" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <!-- 分页区域 -->
          <el-pagination
            :current-page="query.page"
            :page-sizes="[10, 15, 20, 25]"
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
export default {
  name: 'Employees',
  data() {
    return {
      query: {
        page: 1, // 页码
        size: 10 // 每页条数
      },
      employeesList: [], // 员工列表
      total: 0 // 数据总条数
    }
  },

  methods: {
    // 每页显示的条数发生改变时触发
    handleSizeChange(newSize) {},

    // 当前页面发生改变时触发
    handleCurrentChange(newPage) {}
  }
}
</script>

<style lang="scss" scoped></style>
