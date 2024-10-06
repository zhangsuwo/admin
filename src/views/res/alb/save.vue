<template>
  <el-dialog v-model="visible" :title="titleMap[mode]" size="70%" destroy-on-close @closed="$emit('closed')">
    <el-form ref="dialogForm" :model="form" :rules="rules" :disabled="mode == 'show'" label-width="9rem" label-position="center">
      <el-form-item prop="name" label="名称">
        <el-input v-model="form.name" placeholder="名称" clearable></el-input>
      </el-form-item>
      <el-form-item prop="desc" label="描述">
        <el-input v-model="form.desc" placeholder="描述" clearable></el-input>
      </el-form-item>
      <el-form-item prop="useType" label="使用类型">
        <el-select v-model="form.useType" placeholder="请选择使用类型" clearable filterable style="width: 50%">
          <el-option v-for="(value, key) in useType" :key="key" :label="value" :value="parseInt(key)"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="resType" label="资源类型">
        <el-select v-model="form.resType" placeholder="请选择资源类型" clearable filterable style="width: 50%">
          <el-option v-for="(value, key) in resType" :key="key" :label="value" :value="parseInt(key)"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="ipVersion" label="IP版本">
        <el-select v-model="form.ipVersion" placeholder="请选择IP版本" clearable filterable style="width: 50%">
          <el-option v-for="(value, key) in ipVersion" :key="key" :label="value" :value="parseInt(key)"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="bandWidth" label="带宽">
        <el-input v-model.number="form.bandWidth" placeholder="带宽" clearable></el-input>
      </el-form-item>
      <el-form-item prop="lanAddr" label="内网地址">
        <el-input v-model="form.lanAddr" placeholder="lanAddr" clearable></el-input>
      </el-form-item>
      <el-form-item prop="wanAddr" label="外网地址">
        <el-input v-model="form.wanAddr" placeholder="wanAddr" clearable></el-input>
      </el-form-item>
      <el-form-item prop="port" label="监听端口">
        <el-input v-model.number="form.port" placeholder="port" clearable></el-input>
      </el-form-item>
      <el-form-item prop="isEnable" label="是否有效">
        <el-switch v-model="form.isEnable"></el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取 消</el-button>
      <el-button v-if="mode !== 'show'" type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
    </template>
  </el-dialog>
</template>

<script>
import enums from '@/config/enums'

export default {
  name: 'servers-save',
  emits: ['success', 'closed'],
  components: {},
  data() {
    return {
      mode: 'add',
      titleMap: {
        add: '新增',
        edit: '编辑',
        show: '查看',
      },
      visible: false,
      isSaveing: false,
      useType: enums.useType,
      resType: enums.resType,
      ipVersion: enums.ipVersion,
      //表单数据
      form: {
        id: 0,
        name: '',
        desc: '',
        useType: 0,
        resType: 0,
        ipVersion: 0,
        lanAddr: '',
        wanAddr: '',
        bandWidth: 100,
        port: 80,
        isEnable: true,
      },
      //验证规则
      rules: {
        name: [{ required: true, message: '请输入名称' }],
        useType: [{ required: true, message: '请选择用途' }],
        resType: [{ required: true, message: '请选择资源类型' }],
        lanAddr: [{ required: true, message: '请输入内网地址（IP或域名）' }],
        wanAddr: [{ required: true, message: '请输入外网地址（IP或域名）' }],
        port: [{ required: true, message: '请输入服务端口' }],
      },
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    //显示
    open(mode = 'add') {
      this.mode = mode
      this.visible = true
      return this
    },
    //表单提交方法
    submit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          this.isSaveing = true
          var res
          if (this.mode === 'add') {
            res = await this.$API.res.alb.add.post(this.form)
          } else if (this.mode === 'edit') {
            res = await this.$API.res.alb.update.post(this.form)
          }

          this.isSaveing = false
          if (res.code === 0) {
            this.$emit('success', this.form, this.mode)
            this.visible = false
            this.$message.success('操作成功')
          } else {
            this.$alert(res.message, '提示', { type: 'error' })
          }
        }
      })
    },
    //表单注入数据
    setData(data) {
      this.form.id = data.id
      this.form.name = data['name']
      this.form.desc = data['desc']
      this.form.useType = data['useType']
      this.form.resType = data['resType']
      this.form.ipVersion = data['ipVersion']
      this.form.lanAddr = data['lanAddr']
      this.form.wanAddr = data['wanAddr']
      this.form.bandWidth = data['bandWidth']
      this.form.port = data['port']
      this.form.isEnable = data.isEnable
    },
    formatJson(cellValue) {
      return JSON.stringify(cellValue, null, 2)
      // return JSON.stringify(cellValue)
    },
    async getData() {},
  },
}
</script>

<style></style>
