<template>
  <el-container>
    <el-header>
      <div class="left-panel">
        <el-select v-model="query.useType" placeholder="请选择使用类型" clearable filterable style="margin-right: 10px">
          <el-option v-for="(value, key) in useType" :key="key" :label="value" :value="parseInt(key)"></el-option>
        </el-select>
        <el-select v-model="query.resType" placeholder="请选择资源类型" clearable filterable style="margin-right: 10px">
          <el-option v-for="(value, key) in resType" :key="key" :label="value" :value="parseInt(key)"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="upsearch">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      </div>
    </el-header>
    <el-main class="nopadding">
      <scTable ref="table" :apiObj="apiObj" :params="query" row-key="id" stripe highlightCurrentRow>
        <el-table-column fixed label="ID" prop="id"></el-table-column>
        <el-table-column fixed label="名称" prop="name"></el-table-column>
        <el-table-column fixed label="描述" prop="name"></el-table-column>
        <el-table-column fixed label="使用类型" prop="useType" show-overflow-tooltip>
          <template #default="scope">
            {{ useType[scope.row.useType] }}
          </template>
        </el-table-column>
        <el-table-column fixed label="资源类型" prop="resType" show-overflow-tooltip>
          <template #default="scope">
            {{ resType[scope.row.resType] }}
          </template>
        </el-table-column>
        <el-table-column fixed label="IP版本" prop="ipVersion">
          <template #default="scope">
            {{ ipVersion[scope.row.ipVersion] }}
          </template>
        </el-table-column>
        <el-table-column fixed label="带宽" prop="bandWidth"></el-table-column>
        <el-table-column label="内网地址" prop="lanAddr" show-overflow-tooltip> </el-table-column>
        <el-table-column label="外网地址" prop="wanAddr" show-overflow-tooltip> </el-table-column>
        <el-table-column label="端口" prop="port" show-overflow-tooltip> </el-table-column>
        <el-table-column label="协议类型" prop="protocol" show-overflow-tooltip> </el-table-column>
        <el-table-column label="生成时间" prop="createdAt">
          <template #default="scope">
            {{ formatDate(scope.row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column label="修改时间" prop="updatedAt">
          <template #default="scope">
            {{ formatDate(scope.row.updatedAt) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="isEnable">
          <template #default="scope">
            <el-switch v-model="scope.row.isEnable" disabled="true"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template #default="scope">
            <el-button-group>
              <!-- <el-button text type="primary" size="small" @click="table_show(scope.row, scope.$index)">查看</el-button> -->
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
import enums from '@/config/enums'
import tool from '@/utils/tool'

export default {
  name: 'alb',
  components: {
    saveDialog,
  },
  data() {
    return {
      dialog: {
        save: false,
        dockers: false,
      },
      query: {
        useType: 0,
        resType: 0,
      },
      apiObj: this.$API.res.alb.list,
      useType: enums.useType,
      resType: enums.resType,
      ipVersion: enums.ipVersion,
      tableData: [],
    }
  },
  mounted() {
    this.upsearch()
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
      var res = await this.$API.resource.delete.post(reqData)
      if (res.code === 0) {
        this.$refs.table.refresh()
        this.$message.success('删除成功')
      } else {
        this.$alert(res.message, '提示', { type: 'error' })
      }
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
      this.$refs.table.reload(this.query)
    },
    //本地更新数据
    handleSaveSuccess(data, mode) {
      if (mode === 'add') {
        this.$refs.table.refresh()
      } else if (mode === 'edit') {
        this.$refs.table.refresh()
      }
    },
    //日期格式化
    formatDate(date) {
      return tool.dateFormat(date)
    },
    //日期枚举
    formatLabel(data, value) {
      return enums.getLabelByValue(data, value)
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
