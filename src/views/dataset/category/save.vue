<template>
  <el-dialog v-model="visible" :title="titleMap[mode]" :width="500" destroy-on-close @closed="$emit('closed')">
    <el-form ref="dialogForm" :model="form" :rules="rules" :disabled="mode == 'show'">
      <el-form-item prop="type">
        <el-select v-model="form.type" placeholder="请选择类型" clearable filterable style="width: 100%">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="form.name" placeholder="请输入名称" clearable></el-input>
      </el-form-item>
      <el-form-item prop="isEnable">
        <el-switch v-model="form.isEnable" :active-value="true" :inactive-value="false" active-text="有效" inactive-text="无效" inline-prompt></el-switch>
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
  name: 'category-save',
  emits: ['success', 'closed'],
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
      //表单数据
      form: {
        id: 0,
        type: '',
        name: '',
        isEnable: true,
      },
      //验证规则
      rules: {
        type: [{ required: true, message: '请选择分类' }],
        name: [{ required: true, message: '请输入名称' }],
      },
      //所需数据选项
      options: enums.categoryType,
    }
  },
  mounted() {},
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
            res = await this.$API.category.add.get(this.form)
          } else if (this.mode === 'edit') {
            res = await this.$API.category.update.get(this.form)
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
      this.form.type = data.type
      this.form.name = data.name
      this.form.isEnable = data.isEnable
    },
  },
}
</script>

<style></style>
