<template>
  <el-form ref="loginForm" :model="form" :rules="rules" label-width="0" size="large" style="height: 340px" @keyup.enter="login">
    <el-form-item prop="user">
      <el-input v-model="form.user" prefix-icon="el-icon-user" clearable :placeholder="$t('login.userPlaceholder')">
        <!-- <template #append>
          <el-select v-model="userType" style="width: 130px">
            <el-option :label="$t('login.admin')" value="admin"></el-option>
            <el-option :label="$t('login.user')" value="user"></el-option>
          </el-select>
        </template> -->
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="form.password" prefix-icon="el-icon-lock" clearable show-password :placeholder="$t('login.PWPlaceholder')"></el-input>
    </el-form-item>
    <el-form-item style="margin-bottom: 10px">
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-input v-model="form.captcha" prefix-icon="el-icon-key" clearable :placeholder="$t('login.captchaPlaceholder')"></el-input>
        </el-col>
        <el-col :span="12">
          <div class="vPic">
            <img v-if="picPath" :src="picPath" width="100%" height="100%" alt="请输入验证码" @click="loginVefify()" />
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item style="margin-bottom: 10px">
      <el-col :span="12">
        <el-checkbox v-model="form.autologin" :label="$t('login.rememberMe')"></el-checkbox>
      </el-col>
      <!-- <el-col :span="12" class="login-forgot">
        <router-link to="/reset_password">{{ $t('login.forgetPassword') }}？</router-link>
      </el-col> -->
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width: 100%" :loading="islogin" round @click="login1">{{ $t('login.signIn') }}</el-button>
    </el-form-item>
    <!-- <div class="login-reg">
      {{ $t('login.noAccount') }} <router-link to="/user_register">{{ $t('login.createAccount') }}</router-link>
    </div> -->
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      logVerify: '',
      picPath: '', // 验证码图片
      form: {
        user: '',
        password: '',
        autologin: false,
        captcha: '',
        captchaId: '',
      },
      rules: {
        user: [{ required: true, message: this.$t('login.userError'), trigger: 'blur' }],
        password: [{ required: true, message: this.$t('login.PWError'), trigger: 'blur' }],
      },
      islogin: false,
    }
  },
  watch: {},
  mounted() {
    this.loginVefify()
  },
  methods: {
    async login() {
      var validate = await this.$refs.loginForm.validate().catch(() => {})
      if (!validate) {
        return false
      }

      this.islogin = true
      var data = {
        username: this.form.user,
        //this.$TOOL.crypto.MD5(this.form.password),
        password: this.form.password,
        captcha: this.form.captcha,
        captchaId: this.form.captchaId,
      }
      //获取token
      var userRes = await this.$API.model.user.login.post(data)
      console.log(userRes)
      if (userRes.code === 0) {
        this.$TOOL.data.set('TOKEN', userRes.data.token, this.form.autologin ? 24 * 60 * 60 : 0)
        this.$TOOL.data.set('USER_INFO', userRes.data, this.form.autologin ? 24 * 60 * 60 : 0)
        // var menuRes = await this.$API.menu.auth.get()
        // if (menuRes.code === 0) {
        //   this.$TOOL.data.set('MENU', menuRes.data, this.form.autologin ? 24 * 60 * 60 : 0)
        // }
      } else {
        this.islogin = false
        this.$message.warning(userRes.message)
        this.loginVefify()
        return false
      }
      this.$router.replace({ path: '/' })
      this.$message.success('Login Success')
      this.islogin = false
    },
    login1() {
      this.$TOOL.data.set('USER_INFO', { role: 'user' }, this.form.autologin ? 24 * 60 * 60 : 0)
      this.$TOOL.data.set('TOKEN', '111', this.form.autologin ? 24 * 60 * 60 : 0)
      this.$router.replace({ path: '/' })
      this.$message.success('Login Success')
      this.islogin = false
    },
    //获取验证码
    loginVefify() {
      this.$API.model.user.captcha.post().then((ele) => {
        // console.log(ele)
        this.picPath = ele.data.picPath
        this.form.captchaId = ele.data.captchaId
        this.form.captcha = ele.data.answer
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.vPic {
  width: 98%;
  height: 39.5px;
  float: right !important;
  background: #ccc;

  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>
