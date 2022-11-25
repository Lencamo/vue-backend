<template>
  <!-- 使用自己的全局Excel组件 -->
  <div class="excel-container">
    <!-- 文件上传区域 -->
    <div class="upload-box">
      <upload-excel :on-success="handleSuccess" :before-upload="beforeUpload" />
    </div>

    <!-- 数据展示区域 -->
    <el-table
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px; background-color: #dcdddf"
    >
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script>
import { addMoreUserAPI } from '@/api'

export default {
  name: 'Excel',
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    // 上传之前的函数
    beforeUpload(file) {
      // 如判断文件的大小是否大于 1 兆
      const isLt1M = file.size / 1024 / 1024 < 1

      // 若大于 1 兆则停止解析并提示错误信息。
      if (isLt1M) {
        return true
      }

      this.$message({
        message: '请不要上传大于1m的文件！',
        type: 'warning'
      })
      return false
    },

    // 导入成功以后的回调函数
    async handleSuccess({ results, header }) {
      // console.log(results)
      // console.log(header)

      // 1、展示数据
      this.tableData = results
      this.tableHeader = header

      // 2、数据上传
      const arr = this.transExcel(results)
      // console.log(arr)

      const { data: res } = await addMoreUserAPI(arr)
      // console.log(res)

      if (res.code !== 200) return this.$message.error(res.msg)
      this.$message.success(res.msg)
    },

    // 将表格中的数据进行格式化
    transExcel(results) {
      const userRelations = {
        姓名: 'name',
        角色: 'role',
        班级: 'classes',
        学号: 'studentId',
        邮箱: 'email',
        UUid: 'uuid'
      }

      return results.map((item) => {
        const obj = {}

        // key值映射处理
        // 1、提取
        const contentKeys = Object.keys(item)
        // console.log(contentKeys)

        // 2、映射
        contentKeys.forEach((key) => {
          const transKey = userRelations[key]
          obj[transKey] = item[key]
        })

        return obj
      })
    }
  }
}
</script>

<style>
.excel-container {
  padding: 20px;
  background-color: white;
}
.upload-box {
  padding: 20px;
  border-radius: 20px;
}
</style>
