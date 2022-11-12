<template>
  <div class="setting-container">
    <div class="app-container">
      <!-- 卡片组件 -->
      <el-card class="box-card">
        <!-- 使用 Tabs 组件完成标签页布局 -->
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first" class="tab-pane">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button icon="el-icon-plus" size="small" type="primary">新增角色</el-button>
            </el-row>
            <!-- 使用 Table 组件实现用户角色的渲染 -->
            <el-table :data="rolesList" border style="width: 100%">
              <el-table-column type="index" label="序号" width="120" />
              <el-table-column prop="role" label="角色名" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="success" @click="setRoles(scope.row)"
                    >分配权限</el-button
                  >
                  <el-button size="small" type="primary" @click="editRoles(scope.row)"
                    >编辑</el-button
                  >
                  <el-button size="small" type="danger" @click="delRoles(scope.row)"
                    >删除</el-button
                  >
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
    </div>
  </div>
</template>

<script>
import { getRoleListAllAPI } from '@/api'

export default {
  data() {
    return {
      activeName: 'first',
      query: {
        page: 1, // 当前页面
        size: 5 // 页面显示的条数
      },
      rolesList: [], // 角色列表
      total: 0 // 角色数据总条数
    }
  },

  created() {
    this.getRoleListAllAFn()
  },
  methods: {
    // 每页显示的条数发生改变时触发
    handleSizeChange() {},

    // 当前页面发生改变时触发
    handleCurrentChange() {},

    // 获取角色列表
    async getRoleListAllAFn() {
      const { data: res } = await getRoleListAllAPI(this.query)
      console.log(res)

      if (res.code !== 200) return this.$message.error(res.message)

      this.rolesList = res.data
      this.total = res.total
    },

    // 设置角色
    setRoles() {},

    // 编辑角色
    editRoles() {},

    // 删除角色
    delRoles() {}
  }
}
</script>

<style lang="scss" scoped>
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
