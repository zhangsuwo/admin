<template>
  <el-dialog v-model="visible" :title="titleMap[mode]" size="100%" destroy-on-close @closed="$emit('closed')">
    <sc-code-editor ref="editor" v-model="form.content" mode="application/json" :height="600"></sc-code-editor>
    <template #footer>
      <el-button @click="visible = false">取 消</el-button>
      <el-button v-if="mode !== 'show'" type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'
const scCodeEditor = defineAsyncComponent(() => import('@/components/scCodeEditor'))

export default {
  name: 'fewshot-save',
  emits: ['success', 'closed'],
  components: {
    scCodeEditor,
  },
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
        isEnable: true,
        content: '',
      },
      //验证规则
      rules: {
        content: [{ required: true, message: '请输入角色名称' }],
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
    async submit() {
      var val = this.$refs.editor.coder.getValue()
      this.isSaveing = true
      var res
      if (this.mode === 'add') {
        res = await this.$API.fewshots.add.post(this.form)
      } else if (this.mode === 'edit') {
        res = await this.$API.fewshots.update.post(this.form)
      }

      this.isSaveing = false
      if (res.code === 0) {
        this.$emit('success', val, this.mode)
        this.visible = false
        this.$message.success('操作成功')
      } else {
        this.$alert(res.message, '提示', { type: 'error' })
      }
    },
    //表单注入数据
    setData(data) {
      this.form.id = data.id
      this.form.isEnable = data.isEnable
      this.form.content = this.formatJson(JSON.parse(data.content), null, 2)
      //可以和上面一样单个注入，也可以像下面一样直接合并进去
      //Object.assign(this.form, data)
    },
    formatJson(cellValue) {
      return JSON.stringify(cellValue, null, 2)
    },
    async getData() {},
  },
}
</script>

<style></style>
