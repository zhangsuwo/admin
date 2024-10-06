<template>
  <el-container>
    <el-aside width="200px">
      <el-container>
        <el-main class="nopadding">
          <el-tree ref="group" class="menu" node-key="id" :data="groupData" :current-node-key="''" :highlight-current="true" :expand-on-click-node="false" :filter-node-method="groupFilterNode" @node-click="groupClick"></el-tree>
        </el-main>
      </el-container>
    </el-aside>
    <el-container>
      <el-header>
        <div class="left-panel">
          <!-- <scSelect v-model="tableData.query.fc" placeholder="一级分类" style="margin-right: 10px" :apiObj="categorySelect.apiObj" :params="categorySelect.fc" :objValueType="true" clearable filterable> </scSelect> -->
          <!-- <scSelect v-model="tableData.query.sc" placeholder="二级分类" style="margin-right: 10px" :apiObj="categorySelect.apiObj" :params="categorySelect.sc" :objValueType="true" clearable filterable> </scSelect> -->
          <scSelect v-model="tableData.query.tc" placeholder="三级分类" style="margin-right: 10px" :apiObj="categorySelect.apiObj" :params="categorySelect.tc" :objValueType="true" clearable filterable> </scSelect>
          <scSelect v-model="tableData.query.type" placeholder="选择Type" style="margin-right: 10px" :apiObj="categorySelect.apiObj" :params="categorySelect.type" :objValueType="true" clearable filterable> </scSelect>
          <el-button type="primary" icon="el-icon-search" @click="upsearch">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
          <sc-file-import :apiObj="$API.question.import" @success="handleImportSuccess"></sc-file-import>
          <el-button type="success" icon="el-icon-download">下载</el-button>
          <el-button type="success" icon="el-icon-download">模板下载</el-button>
        </div>
      </el-header>
      <el-main class="nopadding">
        <scTable ref="table" :apiObj="tableData.apiObj" :params="tableData.query" row-key="id" stripe highlightCurrentRow @selection-change="selectionChange">
          <el-table-column fixed label="id" prop="id" width="100"></el-table-column>
          <el-table-column fixed label="一级分类" prop="fc" width="100" show-overflow-tooltip>
            <template #default="scope">
              {{ scope.row.fc }}
            </template>
          </el-table-column>
          <el-table-column fixed label="二级分类" prop="sc" width="100" show-overflow-tooltip>
            <template #default="scope">
              {{ scope.row.sc }}
            </template>
          </el-table-column>
          <el-table-column label="三级分类" prop="tc" width="100" show-overflow-tooltip>
            <template #default="scope">
              {{ scope.row.tc }}
            </template>
          </el-table-column>
          <el-table-column label="类型" prop="type" show-overflow-tooltip>
            <template #default="scope">
              {{ scope.row.type }}
            </template>
          </el-table-column>
          <el-table-column label="问题" prop="question" width="300" show-overflow-tooltip>
            <template #default="scope">
              {{ scope.row.question }}
            </template>
          </el-table-column>
          <el-table-column label="选项" prop="options" width="200" show-overflow-tooltip>
            <template #default="scope">
              {{ scope.row.options }}
            </template>
          </el-table-column>
          <el-table-column label="答案" prop="answer" width="200" show-overflow-tooltip>
            <template #default="scope">
              {{ scope.row.answer }}
            </template>
          </el-table-column>
          <el-table-column label="解析" prop="explain" width="200" show-overflow-tooltip>
            <template #default="scope">
              {{ scope.row.explain }}
            </template>
          </el-table-column>
          <el-table-column label="扩展" prop="extend" width="200" show-overflow-tooltip>
            <template #default="scope">
              {{ scope.row.extend }}
            </template>
          </el-table-column>
          <el-table-column label="生成时间" prop="createdAt" width="150">
            <template #default="scope">
              {{ formatDate(scope.row.createdAt) }}
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="isEnable">
            <template #default="scope">
              <el-switch v-model="scope.row.isEnable" disabled="true"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" align="right" width="160">
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
  </el-container>
</template>

<script>
import saveDialog from './save'
import tool from '@/utils/tool'
import scFileImport from '@/components/scFileImport'

export default {
  name: 'question',
  components: {
    saveDialog,
    scFileImport,
  },
  data() {
    return {
      dialog: {
        save: false,
      },
      tableData: {
        apiObj: this.$API.question.list,
        query: {
          fc: '',
          sc: '',
          tc: '',
          type: '',
          name: '',
        },
      },
      categorySelect: {
        apiObj: this.$API.common.query.queryKeyValueList,
        fc: {
          firstField: '0',
          secondField: 'fc',
          tableName: 'questions',
          conditions: 'fc is not null and fc <> ""',
        },
        sc: {
          firstField: '0',
          secondField: 'sc',
          tableName: 'questions',
          conditions: 'sc is not null and sc <> ""',
        },
        tc: {
          firstField: '0',
          secondField: 'tc',
          tableName: 'questions',
          conditions: 'tc is not null and tc <> ""',
        },
        type: {
          firstField: '0',
          secondField: 'type',
          tableName: 'questions',
          conditions: 'type is not null and type <> ""',
        },
      },
      selection: [],
      groupFilterText: '',
      groupData: [],
    }
  },
  mounted() {
    this.getGroupData()
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
      var res = await this.$API.question.delete.post(reqData)
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
    //表格内开关
    changeSwitch(val, row) {
      row.status = row.status === 1 ? '0' : '1'
      row.$switch_status = true
      setTimeout(() => {
        delete row.$switch_status
        row.status = val
        this.$message.success('操作成功')
      }, 500)
    },
    //搜索
    upsearch() {
      this.$refs.table.reload(this.tableData.query)
      this.getGroupData()
    },
    //本地更新数据
    handleSaveSuccess(data, mode) {
      if (mode === 'add') {
        this.$refs.table.refresh()
      } else if (mode === 'edit') {
        this.$refs.table.refresh()
      }
    },
    //导入数据成功
    handleImportSuccess(res, close) {
      if (res.code === 0) {
        this.$alert('共' + res.data.length + '条数据，导入成功' + res.data.offset + '条数据', '导入成功', {
          type: 'success',
          showClose: false,
          center: true,
        })
        close()
      } else {
        //返回失败后的自定义操作，这里演示显示错误的条目
        this.$alert('共' + res.data.length + '条数据，导入成功' + res.data.offset + '条数据', '导入失败', {
          type: 'error',
          showClose: false,
          center: true,
        })
      }
    },
    async getGroupData() {
      console.log(this.categorySelect)
      var res = await this.categorySelect.apiObj.get(this.categorySelect.fc)
      if (res.code === 0) {
        this.groupData = res.data
      } else {
        this.$alert(res.message, '提示', { type: 'error' })
      }
    },
    //树过滤
    groupFilterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    //树点击事件
    groupClick(data) {
      this.tableData.query.fc = data.label
      this.$refs.table.reload(this.tableData.query)
    },
    //日期格式化
    formatDate(date) {
      return tool.dateFormat(date)
    },
  },
}
</script>

<style lang="scss">
/*修改show-overflow-tooltip默认width*/
.el-popper {
  max-width: 50% !important;
}
</style>
