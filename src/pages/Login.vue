<template>
  <div class="wrap" id="WrapBlock">
    <div class="LoginBlock">
      <p class="TextAlignL">您好！欢迎来到能臣系统</p>
      <span class="Line"></span>
      <div class="InputBlock">
        <div class="InputItem">
          <el-input
            placeholder="用户名"
            prefix-icon="if-icons if-iconuser"
            v-model="Form.accountName">
          </el-input>
        </div>
        <div class="InputItem">
          <el-input
            placeholder="密码"
            type="password"
            prefix-icon="if-icons if-iconpsd"
            v-model="Form.accountPsd">
          </el-input>
        </div>
        <button type="primary" :loading="btLoading" clasS="BtButton CursorPointer" @click="Login('Form')">登 陆</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import {setCookie} from '../util/utils'
import CryptoJS from 'crypto-js'
export default {
  name: 'Login',
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePsd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      realCode: '', // 随机验证码
      Form: {
        accountName: '', // SC08A013
        accountPsd: '', // 123456
        code: ''
      },
      rules: {
        accountName: [
          { validator: validateName, trigger: 'change' }
        ],
        accountPsd: [
          { validator: validatePsd, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }

    }
  },
  computed: {
    ...mapState({
      btLoading: state => state.btLoading
    })
  },
  created () {
    this.createCode()
  },
  methods: {
    ...mapActions([
      'unitUserInfo',
      'toggleLoadingBt'
    ]),
    enterEvent () {
      let keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode
      if (keyCode === 13) {
        this.Login('Form')
      }
    },
    Login (formName) {
      if (!this.Form.accountName) {
        this.$message({
          message: '请输入用户名!',
          type: 'warning'
        })
        return false
      }
      if (!this.Form.accountPsd) {
        this.$message({
          message: '请输入密码!',
          type: 'warning'
        })
        return false
      }
      this.sureLogin()
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     if (this.Form.code.toUpperCase() === this.realCode.toUpperCase()) {
      //       this.sureLogin()
      //     } else {
      //       this.$message({
      //         message: '输入的验证码不正确!',
      //         type: 'warning'
      //       })
      //       // 刷新验证码
      //       this.createCode()
      //       return false
      //     }
      //   } else {
      //     this.$message({
      //       message: '请将信息填写完整!',
      //       type: 'warning'
      //     })
      //     return false
      //   }
      // })
    },
    // 登陆
    sureLogin () {
      this.toggleLoadingBt(true)
      this.Http.post('userLogin?username=' + this.Form.accountName + '&password=' + this.Form.accountPsd, {username: this.Form.accountName, password: this.Form.accountPsd}
      ).then(res => {
        switch (res.data.code) {
          case 1:
            let cookieStr = CryptoJS.HmacSHA256((this.Form.accountName + this.Form.accountPsd).toString(), '14a808c40bba58c2c')
            setCookie('Fs_14a808c40bba58c2c', cookieStr, 6)
            let Info = res.data.memberInfo
            this.unitUserInfo({name: Info.username, id: Info.id, fcode: Info.fcode})
            this.$router.push({name: 'Home'})
            this.toggleLoadingBt(false)
            break
          default:
            this.$message({
              message: res.data.message + '!',
              type: 'error'
            })
            this.toggleLoadingBt(false)
            // 刷新验证码
            this.createCode()
        }
      }).catch((error) => {
        this.toggleLoadingBt(false)
        console.log(error)
      })
    },
    createCode () {
      let code = ''
      let codeLength = 4
      let random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      // let random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      for (var i = 0; i < codeLength; i++) {
        var index = Math.floor(Math.random() * 10)
        code += random[index]
      }
      this.realCode = code
    }
  }
}
</script>
<style lang="less" scoped>
.wrap{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #102b6a;
  background: url('../../static/images/loginBg.jpg') no-repeat center/cover;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  .LoginBlock{
    width: 27%;
    min-width: 320px;
    padding: 50px 30px;
    background: #fff;
    position: absolute;
    left: 55%;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 15px;
    p{
      font-size: 18px;
      font-weight: bold;
    }
    .Line{
      width: 50px;
      height: 2px;
      background: #028bff;
      float: left;
      margin-top: 10px;
    }
    .InputBlock{
      margin-top: 40px;
      .InputItem{
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #f7f7f7;
        margin-top: 20px;
      }
      .BtButton{
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #fff;
        border-radius: 50px;
        margin-top: 40px;
        background: url('../../static/images/loginBt.png') no-repeat center/cover;
        box-shadow: 0px 7px 10px 0px rgba(185,223,255,1);
        border: 0px solid red;
        overflow: hidden;
      }
    }
  }
}
@media screen and (max-width: 1423px) {
  .LoginBlock{
    width: 27%;
    padding: 45px 25px !important;
    p{
      font-size: 16px !important;
    }
    .InputItem{
        height: 45px !important;
        line-height: 45px !important;
      }
      .BtButton{
        height: 45px !important;
        line-height: 45px !important;
        margin-top: 30px !important;
      }
  }
}
@media screen and (max-width: 1366px) {
  .LoginBlock{
    width: 27%;
    padding: 40px 20px !important;
    p{
      font-size: 15px !important;
    }
    .InputItem{
        height: 40px !important;
        line-height: 40px !important;
      }
      .BtButton{
        height: 40px !important;
        line-height: 40px !important;
        margin-top: 30px !important;
      }
  }
}
</style>
