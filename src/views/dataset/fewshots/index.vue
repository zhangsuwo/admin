<template>
  <el-container>
    <el-header>
      <div class="left-panel"></div>
      <div class="right-panel">
        <el-button type="primary" icon="el-icon-search" @click="upsearch">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
        <!-- <el-button type="primary" icon="el-icon-upload">上传</el-button> -->
        <sc-file-import :apiObj="$API.common.uploadFile" @success="success"></sc-file-import>
        <el-button type="primary" icon="el-icon-download">下载</el-button>
      </div>
    </el-header>
    <el-main class="nopadding">
      <scTable ref="table" :apiObj="list.apiObj" :params="list.query" row-key="id" stripe highlightCurrentRow @selection-change="selectionChange">
        <el-table-column label="id" prop="id" width="100">
          <template #default="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="内容" prop="content" width="900">
          <template #default="scope">
            {{ scope.row.content }}
          </template>
        </el-table-column>
        <el-table-column label="生成时间" prop="createdAt">
          <template #default="scope">
            {{ formatDate(scope.row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="170">
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
import scFileImport from '@/components/scFileImport'

export default {
  name: 'fewshots',
  components: {
    saveDialog,
    scFileImport,
  },
  data() {
    return {
      dialog: {
        save: false,
      },
      list: {
        apiObj: this.$API.fewshots.list,
        query: {},
      },
      tableData: [],
      selection: [],
    }
  },
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
      var res = await this.$API.fewshots.delete.post(reqData)
      if (res.code === 0) {
        this.$refs.table.refresh()
        this.$message.success('删除成功')
      } else {
        this.$alert(res.message, '提示', { type: 'error' })
      }
    },
    //搜索
    upsearch() {
      this.$refs.table.reload(this.list.query)
    },
    //表格选择后回调事件
    selectionChange(selection) {
      this.selection = selection
    },
    //本地更新数据
    handleSaveSuccess(data, mode) {
      if (mode === 'add') {
        this.$refs.table.refresh()
      } else if (mode === 'edit') {
        this.$refs.table.refresh()
      }
    },
    success(res, close) {
      if (res.code === 0) {
        this.$alert('导入返回成功后，可后续操作，比如刷新表格等。执行回调函数close()可关闭上传窗口。', '导入成功', {
          type: 'success',
          showClose: false,
          center: true,
        })
        close()
      } else {
        //返回失败后的自定义操作，这里演示显示错误的条目
        this.$alert('导入失败', '导入失败', {
          type: 'error',
          showClose: false,
          center: true,
        })
      }
    },
    //日期格式化
    formatDate(date) {
      return tool.dateFormat(date)
    },
  },
}
</script>

<style></style>
