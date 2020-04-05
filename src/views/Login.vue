<template>
  <div class="fullscreen">
    <div class="login-box">
      <div class="logo-box">
        <img src="../assets/logo.png" alt="logo" class="logo" />
      </div>
      <div v-if="login">
        <p class="text-tips">你好，欢迎登录</p>
        <form action="" class="login-form">
          <div class="m-list-group">
            <div class="m-list-group-item">
              <input
                type="email"
                placeholder="Email"
                class="m-input"
                name="email"
                v-model="email"
              />
            </div>
            <div class="m-list-group-item">
              <input
                type="password"
                placeholder="Password"
                class="m-input"
                name="password"
                v-model="password"
              />
            </div>
          </div>
          <!-- <p class="text-tips">免密码，点击登录按钮进入</p> -->
          <el-row :gutter="20">
            <el-col :span="12"
              ><button
                class="m-btn sub select-none"
                @click.prevent="handleLogin"
                v-loading="isLoging"
              >
                登录
              </button></el-col
            >
            <el-col :span="12"
              ><button class="m-btn sub select-none" @click="login = !login">
                注册
              </button></el-col
            >
          </el-row>
        </form>
      </div>
      <div v-if="!login">
        <p class="text-tips">用户注册</p>
        <form action="" class="login-form">
          <div class="m-list-group">
            <div class="m-list-group-item">
              <input
                type="text"
                placeholder="Username"
                class="m-input"
                name="username"
                v-model="Susername"
              />
            </div>
            <div class="m-list-group-item">
              <input
                type="email"
                placeholder="Email"
                class="m-input"
                name="email"
                v-model="Semail"
                required
              />
            </div>
            <div class="m-list-group-item">
              <input
                type="password"
                placeholder="Password"
                class="m-input"
                name="password"
                v-model="Spassword"
              />
            </div>
            <div class="m-list-group-item">
              <input
                type="password"
                placeholder="Comfirm Password"
                class="m-input"
                name="comfirmPassword"
                v-model="ScomfirmPassword"
              />
            </div>
          </div>
          <p class="text-tips fff" @click.prevent="login = !login">
            已有账户？点击登录
          </p>
          <button
            class="m-btn sub select-none"
            @click.prevent="handleSignUp"
            v-loading="isLoging"
          >
            注册
          </button>
        </form>
      </div>
      <div style="margin-top: 50px"></div>
      <p class="text-tips">
        <i class="fa fa-meetup" style="color: #29ABE2"></i>&nbsp;
        <span class="footer-text"
          >{{ appName }} &nbsp;<el-tag size="mini">{{ version }}</el-tag>
          <br />©make by
          <a
            href="https://www.github.com/an-liu1"
            target="_blank"
            class="m-link-effect"
            >{{ author }}</a
          >
        </span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      login: true,
      email: "",
      username: "",
      password: "",
      Semail: "",
      Susername: "",
      Spassword: "",
      ScomfirmPassword: "",
      isLoging: false,
      author: "Andy",
      version: "v0.1.0",
      appName: "Ai FreePMO"
    };
  },
  methods: {
    handleLogin() {
      if (!this.email || !this.password) {
        return this.$msg.warning("用户名和密码不能为空！");
      }
      this.isLoging = true;

      let data = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("login", data)
        .then(() => {
          this.$router.push("/dashboard");
          this.$msg.success("登录成功!");
          this.isLoging = false;
        })
        .catch(() => {
          // this.$msg.error(this.$store.state.message);
          this.isLoging = false;
        });
    },
    handleSignUp() {
      let re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (
        !this.Semail ||
        !this.Susername ||
        !this.Spassword ||
        !this.ScomfirmPassword
      ) {
        this.$msg.warning("请输入账号密码！");
      } else if (this.Spassword !== this.ScomfirmPassword) {
        this.$msg.warning("密码不匹配！");
      } else if (!re.test(this.Semail)) {
        this.$msg.warning("邮箱格式不对！");
      } else {
        this.isLoging = true;

        let data = {
          email: this.Semail,
          username: this.Susername,
          password: this.Spassword
        };

        this.$store
          .dispatch("signup", data)
          .then(() => {
            this.$msg.success("注册成功, 请登录邮箱激活用户！");
            this.isLoging = false;
            this.login = true;
          })
          .catch(() => {
            this.login = false;
            this.isLoging = false;
          });
      }
    }
  }
};
</script>
<style scoped>
.fff:hover {
  cursor: pointer;
}
.m-list-group {
  border-radius: 3px;
  padding: 0;
  margin: 0 0 20px;
}
.m-list-group .m-list-group-item {
  position: relative;
  display: block;
  padding: 6px 10px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid #e7ecee;
}
.m-list-group .m-list-group-item:first-child {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.m-list-group .m-list-group-item:last-child {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.fullscreen {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #f7fafd, #76b9ff);
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  position: relative;
  width: 330px;
  margin: 0 auto;
  padding: 0px 15px;
}
.logo-box {
  text-align: center;
}
.login-box .logo {
  /* max-width: 80%; */
  width: 300px;
  margin-bottom: 30px;
  text-align: center;
  display: inline-block;
  color: #36c1fa;
}
.login-box .text-tips {
  text-align: center;
  color: #909db7;
}
.login-box .m-input {
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
  box-sizing: border-box;
}
.login-box .m-btn {
  font-size: 18px;
  width: 100%;
  color: #fff;
  background-color: #36c1fa;
  display: inline-block;
  padding: 10px 12px;
  margin-bottom: 5px;
  line-height: 1.42857143;
  text-align: center;
  cursor: pointer;
  outline: none;
  border-radius: 2px;
  border: 1px solid #36c1fa;
  box-sizing: border-box;
  text-decoration: none;
}
.login-box .m-btn.m-btn-text {
  background: #fff;
  color: #36c1fa;
}
.login-box .m-btn:hover {
  background-color: #2db7f5;
}
.login-box .m-btn.m-btn-text:hover {
  background-color: #f4f5f5;
}
.login-box .m-btn:active {
  opacity: 0.8;
}
@media (max-width: 768px) {
  .login-box {
    width: auto;
  }
}
</style>
