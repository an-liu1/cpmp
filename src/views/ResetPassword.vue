<template>
  <div class="fullscreen">
    <div class="login-box">
      <div class="logo-box">
        <img src="../assets/logo.png" alt="logo" class="logo" />
      </div>
      <div v-if="login">
        <p class="text-tips">请输入邮箱重置密码！</p>
        <form action="" class="login-form">
          <div class="m-list-group">
            <div class="m-list-group-item">
              <input
                type="email"
                placeholder="邮箱"
                class="m-input"
                name="email"
                v-model="email"
              />
            </div>
          </div>

          <button
            class="m-btn sub select-none"
            @click.prevent="handleRequestRest"
            v-loading="isLoging"
          >
            发送
          </button>
        </form>
      </div>
      <div v-if="!login">
        <p class="text-tips">密码重置</p>
        <form action="" class="login-form">
          <div class="m-list-group">
            <div class="m-list-group-item">
              <input
                type="password"
                placeholder="密码"
                class="m-input"
                name="password"
                v-model="Spassword"
              />
            </div>
            <div class="m-list-group-item">
              <input
                type="password"
                placeholder="确认密码"
                class="m-input"
                name="comfirmPassword"
                v-model="ScomfirmPassword"
              />
            </div>
          </div>
          <button
            class="m-btn sub select-none"
            @click.prevent="handleRestPassword"
            v-loading="isLoging"
          >
            确认
          </button>
        </form>
      </div>
      <div style="margin-top: 50px;"></div>
      <p class="text-tips">
        <i class="fa fa-meetup" style="color: #29abe2;"></i>&nbsp;
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
      Spassword: "",
      ScomfirmPassword: "",
      isLoging: false,
      author: "Andy",
      version: "v0.1.0",
      appName: "Ai FreePMO",
    };
  },
  mounted() {
    if (this.$route.params.reset) {
      this.login = false;
    }
  },
  methods: {
    handleRequestRest() {
      this.isLoging = true;
      this.$store
        .dispatch("requestReset", { email: this.email })
        .then(() => {
          this.$router.push("/login");
          this.$msg.success(
            "密码重置请求发送成功，请登录邮箱查看邮件并充值密码!"
          );
          this.isLoging = false;
        })
        .catch(() => {
          this.isLoging = false;
        });
    },
    handleRestPassword() {
      if (this.Spassword !== this.ScomfirmPassword) {
        this.$msg.warning("密码不匹配！");
      } else {
        this.isLoging = true;

        this.$store
          .dispatch("resetPassword", {
            email: this.$route.params.email,
            password: this.Spassword,
          })
          .then(() => {
            this.$msg.success("密码修改成功, 请登录！");
            this.$router.push("/login");
            this.isLoging = false;
          })
          .catch(() => {
            this.isLoging = false;
          });
      }
    },
  },
};
</script>
<style scoped>
.text-t {
  text-align: center;
  color: #2db7f5;
  font-size: 0.875em;
  padding-top: 5px;
}
.text-t:hover {
  cursor: pointer;
  color: white;
}
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
