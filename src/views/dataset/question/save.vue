<template>
  <el-dialog v-model="visible" :title="titleMap[mode]" size="70%" destroy-on-close @closed="$emit('closed')">
    <el-form ref="dialogForm" :model="form" :rules="rules" :disabled="mode == 'show'" label-width="7.25rem" label-position="left">
      <el-form-item prop="fc" label="一级分类">
        <scSelect v-model="form.fc" :apiObj="categorySelect.apiObj" :params="categorySelect.fc" :objValueType="true" clearable filterable> </scSelect>
      </el-form-item>
      <el-form-item prop="sc" label="二级分类">
        <scSelect v-model="form.sc" :apiObj="categorySelect.apiObj" :params="categorySelect.sc" :objValueType="true" clearable filterable> </scSelect>
      </el-form-item>
      <el-form-item prop="tc" label="三级分类">
        <scSelect v-model="form.tc" :apiObj="categorySelect.apiObj" :params="categorySelect.tc" :objValueType="true" clearable filterable> </scSelect>
      </el-form-item>
      <el-form-item prop="type" label="Type">
        <scSelect v-model="form.type" :apiObj="categorySelect.apiObj" :params="categorySelect.type" :objValueType="true" clearable filterable> </scSelect>
      </el-form-item>
      <el-form-item prop="question" label="Question">
        <el-input v-model="form.question" placeholder="Question" clearable type="textarea" :rows="6"></el-input>
      </el-form-item>
      <el-form-item prop="options" label="Options">
        <el-input v-model="form.options" placeholder="Options" clearable type="textarea" :rows="6"></el-input>
      </el-form-item>
      <el-form-item prop="answer" label="Answer">
        <el-input v-model="form.answer" placeholder="Answer" clearable type="textarea" :rows="3"></el-input>
      </el-form-item>
      <el-form-item prop="explain" label="Explain">
        <el-input v-model="form.explain" placeholder="Explain" clearable type="textarea" :rows="6"></el-input>
      </el-form-item>
      <el-form-item prop="extend" label="Extend">
        <el-input v-model="form.extend" placeholder="Extend" clearable type="textarea" :rows="3"></el-input>
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
export default {
  name: 'question-save',
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
      //表单数据
      form: {
        id: 0,
        fc: '',
        sc: '',
        tc: '',
        type: '',
        question: '',
        options: '',
        answer: '',
        explain: '',
        extend: '',
        isEnable: true,
      },
      categorySelect: {
        apiObj: this.$API.common.query.queryKeyValueList,
        fc: {
          firstField: 'id',
          secondField: 'name',
          tableName: 'category',
          conditions: 'type = 1',
        },
        sc: {
          firstField: 'id',
          secondField: 'name',
          tableName: 'category',
          conditions: 'type = 2',
        },
        tc: {
          firstField: 'id',
          secondField: 'name',
          tableName: 'category',
          conditions: 'type = 3',
        },
        type: {
          firstField: 'id',
          secondField: 'name',
          tableName: 'category',
          conditions: 'type = 4',
        },
      },
      //验证规则
      rules: {
        fc: [{ required: true, message: '请选择一级分类' }],
        sc: [{ required: true, message: '请选择二级分类' }],
        question: [{ required: true, message: '请输入question' }],
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
            res = await this.$API.question.add.post(this.form)
          } else if (this.mode === 'edit') {
            res = await this.$API.question.update.post(this.form)
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
      this.form.fc = data['fc']
      this.form.sc = data['sc']
      this.form.tc = data['tc']
      this.form.type = data['type']
      this.form.question = data['question']
      this.form.options = data['options']
      this.form.answer = data['answer']
      this.form.explain = data['explain']
      this.form.extend = data['extend']
      this.form.isEnable = data.isEnable
      // this.form.explain = tool.isObjectField(data, 'explain') ? this.formatJson(data['explain']) : data['explain']
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
