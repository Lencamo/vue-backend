<template>
  <div class="employees-container">
    <div class="app-container">
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
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
