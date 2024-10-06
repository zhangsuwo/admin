<template>
  <el-container>
    <el-header class="header-tabs">
      <el-tabs v-model="tabID" type="card" @tab-change="tabChange">
        <el-tab-pane label="一级分类" name="1"></el-tab-pane>
        <el-tab-pane label="二级分类" name="2"></el-tab-pane>
        <el-tab-pane label="三级分类" name="3"></el-tab-pane>
        <el-tab-pane label="Type" name="4"></el-tab-pane>
      </el-tabs>
    </el-header>
    <el-header>
      <div class="left-panel">
        <!-- <el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length == 0" @click="batch_del"></el-button> -->
      </div>
      <div class="right-panel">
        <div class="right-panel-search">
          <el-button type="primary" icon="el-icon-search" @click="upsearch">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
          <!-- <el-input v-model="search.keyword" placeholder="名称" clearable></el-input> -->
        </div>
      </div>
    </el-header>
    <el-main class="nopadding">
      <scTable ref="table" :apiObj="tableData.apiObj" :params="tableData.query" row-key="id" stripe highlightCurrentRow @selection-change="selectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="ID" prop="id" width="100"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="类型" prop="type" width="100"></el-table-column>
        <el-table-column label="状态" prop="isEnable" width="100">
          <template #default="scope">
            <el-switch v-model="scope.row.isEnable" disabled="true"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="生成时间" prop="createdAt" width="150">
          <template #default="scope">
            {{ formatDate(scope.row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="right" width="170">
          <template #default="scope">
            <el-button-group>
              <el-button text type="primary" size="small" @click="table_show(scope.row, scope.$index)">查看</el-button>
              <el-button text type="primary" size="small" @click="table_edit(scope.row, scope.$index)">编辑</el-button>
              <el-popconfirm title="确定删除吗？" @confirm="table_del(scope.row, scope.$index)">
                <template #reference>
                  <el-button text type="primary" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </el-button-group>
          </template>
        </el-table-column>
      </scTable>
    </el-main>
  </el-container>
  <save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSaveSuccess" @closed="dialog.save = false"></save-dialog>
</template>

<script>
import saveDialog from './save'
import tool from '@/utils/tool'

export default {
  name: 'category',
  components: {
    saveDialog,
  },
  data() {
    return {
      dialog: {
        save: false,
      },
      tableData: {
        apiObj: this.$API.category.list,
        query: {
          type: 1,
        },
      },
      selection: [],
      search: {
        keyword: null,
      },
      tabID: '1',
    }
  },
  mounted() {},
  methods: {
    //添加
    add() {
      this.dialog.save = true
      this.$nextTick(() => {
        this.$refs.saveDialog.open()
      })
    },
    //编辑
    table_edit(row) {
      this.dialog.save = true
      this.$nextTick(() => {
        this.$refs.saveDialog.open('edit').setData(row)
      })
    },
    //查看
    table_show(row) {
      this.dialog.save = true
      this.$nextTick(() => {
        this.$refs.saveDialog.open('show').setData(row)
      })
    },
    //删除
    async table_del(row) {
      var reqData = { id: row.id }
      var res = await this.$API.category.delete.post(reqData)
      if (res.code === 0) {
        this.$refs.table.refresh()
        this.$message.success('删除成功')
      } else {
        this.$alert(res.message, '提示', { type: 'error' })
      }
    },
    //批量删除
    async batch_del() {
      this.$confirm(`确定删除选中的 ${this.selection.length} 项吗？如果删除项中含有子集将会被一并删除`, '提示', {
        type: 'warning',
      })
        .then(() => {
          const loading = this.$loading()
          this.$refs.table.refresh()
          loading.close()
          this.$message.success('操作成功')
        })
        .catch(() => {})
    },
    //表格选择后回调事件
    selectionChange(selection) {
      this.selection = selection
    },
    //搜索
    upsearch() {
      this.$refs.table.refresh()
    },
    //本地更新数据
    handleSaveSuccess(data, mode) {
      if (mode === 'add') {
        this.$refs.table.refresh()
      } else if (mode === 'edit') {
        this.$refs.table.refresh()
      }
    },
    //标签切换
    tabChange(name) {
      this.tableData.query.type = parseInt(name)
      this.$refs.table.reload(this.tableData.query)
    },
    //日期格式化
    formatDate(date) {
      return tool.dateFormat(date)
    },
  },
}
</script>

<style></style>
