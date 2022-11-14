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
              <el-table-column prop="title" label="菜单名称" width="180"> </el-table-column>
              <el-table-column prop="icon" label="图标名称" width="180"> </el-table-column>
              <el-table-column prop="roles" label="权限标识"> </el-table-column>
              <el-table-column prop="path" label="组件路径"> </el-table-column>
              <el-table-column
                prop="operate"
                label="操作"
                align="center"
                style="background: #ffffff"
              >
                <template slot-scope="scope">
                  <el-button
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
export default {
  created() {
    // console.log(this.$router.options.routes)
    // 路由处理
  },

  data() {
    return {
      activeName: 'first', // 头部的tabs
      router: this.$router.options.routes, // 获取路由信息
      tableData: [
        {
          id: 1,
          title: '权限管理',
          icon: 'form',
          // roles: ['super-admin', 'root'],
          roles: 'root',
          path: '/power',
          children: [
            {
              id: 11,
              title: '用户管理',
              icon: 'user',
              // roles: ['super-admin', 'root'],
              roles: 'root',
              path: 'userControl'
            },
            {
              id: 12,
              title: '角色管理',
              icon: 'nested',
              // roles: ['super-admin', 'root'],
              roles: 'root',
              path: 'roleControl'
            },
            {
              id: 13,
              title: '菜单管理',
              icon: 'example',
              // roles: ['super-admin'],
              roles: 'root',
              path: 'menuControl'
            }
          ]
        },
        {
          id: 2,
          title: '教学管理',
          icon: 'form',
          // roles: ['super-admin', 'root'],
          roles: 'root',
          path: '/teaching',
          children: [
            {
              id: 21,
              title: '班级管理',
              icon: 'example',
              // roles: ['super-admin', 'root'],
              roles: 'root',
              path: 'classSide'
            },
            {
              id: 22,
              title: '教师管理',
              icon: 'user',
              // roles: ['super-admin', 'root'],
              roles: 'root',
              path: 'teacherSide'
            }
          ]
        },
        {
          id: 3,
          title: '其他模块',
          icon: 'form',
          roles: ['super-admin', 'root', 'user'],
          path: '/other',
          children: [
            {
              id: 31,
              title: '其他模块',
              icon: 'nested',
              roles: ['super-admin', 'root', 'user'],
              path: 'other'
            }
          ]
        }
      ]
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
    }
    // 对路由表进行处理，生成表格数据
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
