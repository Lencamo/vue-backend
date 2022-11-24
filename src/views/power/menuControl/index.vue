<template>
  <div class="menuControl-container">
    <div class="app-container">
      <!-- 卡片组件 -->
      <el-card class="box-card">
        <!-- 使用 Tabs 组件完成标签页布局 -->
        <el-tabs v-model="activeName">
          <el-tab-pane label="菜单管理" name="first" class="tab-pane">
            <el-table
              :data="tableData"
              style="width: 100%; margin-bottom: 20px"
              row-key="id"
              border
              default-expand-all
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              :cell-style="cellStyle"
            >
              <el-table-column prop="title" label="菜单名称" width="180"></el-table-column>
              <el-table-column prop="icon" label="图标名称" width="130" align="center">
                <!-- <template>
                  // 图标的动态展示：待解决（icon-class不能进行属性的动态绑定😭--下一个版本查看源码看看）
                  <svg-icon
                    :icon-class="tableData.icon ? tableData.icon : tableData.children.icon"
                  />
                </template> -->
              </el-table-column>
              <el-table-column prop="roles" label="权限标识" align="center">
                <template slot-scope="scope">
                  <!-- <el-tag
                    @click="text(scope)"
                    :effect="scope.row.children ? 'dark' : 'plain'"
                    size="small"
                    :type="scope.row.children ? 'success' : 'info'"
                    >{{ scope.row.roles }}</el-tag -->
                  <span v-for="item in scope.row.roles || scope.row.children.roles" :key="item">
                    <el-tag
                      @click="text(scope)"
                      :effect="scope.row.children ? 'dark' : 'plain'"
                      size="small"
                      :type="scope.row.children ? 'success' : 'info'"
                      >{{ item }}
                    </el-tag>
                    <span style="margin: 0px 2px"></span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="path" label="组件路径" align="center"> </el-table-column>
              <el-table-column
                prop="operate"
                label="操作"
                align="center"
                style="background: #ffffff"
              >
                <template slot-scope="scope">
                  <el-button
                    disabled
                    icon="el-icon-edit-outline"
                    size="mini"
                    plain
                    type="primary"
                    @click="editRolesFn(scope)"
                    >编辑</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getMenuListAllAPI } from '@/api'

export default {
  created() {
    // 查看路由信息
    // console.log(this.$router.options.routes)
    // console.log(this.$router.options.routes.meta.icon)
    // 路由处理
    this.getMenuListAllAPIFn()
  },

  data() {
    return {
      activeName: 'first', // 头部的tabs
      router: this.$router.options.routes, // 获取路由信息
      tableData: []
    }
  },
  methods: {
    // 特殊位置单个cell背景处理
    cellStyle(row) {
      // console.log(row)
      if (row.row.children !== undefined && row.columnIndex === 4) {
        return 'background-color: #ffffff'
      } else if (row.row.children !== undefined && row.columnIndex >= 0 && row.columnIndex <= 3) {
        return 'background-color: #e8ebed'
      }
    },

    // 权限标识优化测试
    // text(scope) {
    //   console.log(scope)
    // }

    // 对路由表进行处理，生成表格数据
    async getMenuListAllAPIFn() {
      const { data: res } = await getMenuListAllAPI()
      this.tableData = res.data
    }
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
