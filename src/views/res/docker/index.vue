<template>
  <el-container>
    <el-header>
      <div class="left-panel">
        <el-select v-model="query.useType" placeholder="请选择使用类型" clearable filterable style="margin-right: 10px">
          <el-option v-for="(value, key) in useType" :key="key" :label="value" :value="parseInt(key)"></el-option>
        </el-select>
        <el-select v-model="query.dockerStatus" placeholder="请选择Docker状态" clearable filterable style="margin-right: 10px">
          <el-option v-for="(value, key) in dockerStatus" :key="key" :label="value" :value="parseInt(key)"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="upsearch">查询</el-button>
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
        <el-table-column fixed label="Docker版本" prop="version"></el-table-column>
        <el-table-column label="Node版本" prop="nodeVersion" show-overflow-tooltip> </el-table-column>
        <el-table-column label="端口" prop="port" show-overflow-tooltip> </el-table-column>
        <el-table-column label="设备ID" prop="deviceID" show-overflow-tooltip> </el-table-column>
        <el-table-column fixed label="Docker状态" prop="dockerStatus" show-overflow-tooltip>
          <template #default="scope">
            {{ dockerStatus[scope.row.status] }}
          </template>
        </el-table-column>
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
              <el-button text type="primary" size="small" @click="table_edit(scope.row, scope.$index)">编辑</el-button>
              <el-button text type="primary" size="small" @click="queryDocker(scope.row, scope.$index)">查看Docker</el-button>
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
</template>

<script>
import enums from '@/config/enums'
import tool from '@/utils/tool'

export default {
  name: 'server',
  components: {},
  data() {
    return {
      dialog: {
        save: false,
        dockers: false,
      },
      query: {
        useType: 0,
        dockerStatus: 0,
        deviceID: '',
      },
      apiObj: this.$API.res.docker.list,
      useType: enums.useType,
      dockerStatus: enums.dockerStatus,
      tableData: [],
    }
  },
  mounted() {
    this.upsearch()
  },
  methods: {
    //编辑
    table_edit(row) {
      this.dialog.save = true
      this.$nextTick(() => {
        this.$refs.saveDialog.open('edit').setData(row)
      })
    },
    //删除
    async table_del(row) {
      var reqData = { id: row.id }
      var res = await this.$API.res.docker.delete.post(reqData)
      if (res.code === 0) {
        this.$refs.table.refresh()
        this.$message.success('删除成功')
      } else {
        this.$alert(res.message, '提示', { type: 'error' })
      }
    },
    //生成Docker
    async queryDocker(row) {},
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
  },
}
</script>

<style lang="scss">
/*修改show-overflow-tooltip默认width*/
.el-popper {
  max-width: 50% !important;
}
</style>
