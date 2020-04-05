<template>
  <div class="row">
    <div class="col-12">
      <h3>更换头像:</h3>
      <el-upload
        class="avatar-uploaded text-center p-2"
        action
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :http-request="saveImages"
      >
        <img v-if="avatar" :src="avatar" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <hr />
    </div>
    <div class="row col-12">
      <h3 class="col-12 mb-3">用户信息：</h3>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm col-12 mx-auto row"
      >
        <el-form-item label="用户名" prop="username" class="col-12 col-md-6">
          <el-input v-model.number="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" class="col-12 col-md-6">
          <el-input
            type="email"
            v-model="ruleForm.email"
            disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" class="col-12 col-md-6">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" class="col-12 col-md-6">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="注册时间" prop="createdAt" class="col-12 col-md-6">
          <el-input v-model="ruleForm.createdAt" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item class="col-12 mt-3">
          <el-button class="float-right" @click="resetForm('ruleForm')"
            >重置</el-button
          >
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            class="float-right mr-3"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mainDomain } from "@/MainAPI.js";
export default {
  inject: ["reload"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      imageUrl: "",
      ruleForm: {
        username: "",
        email: "",
        pass: "********",
        checkPass: "",
        createdAt: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  computed: {
    userInfo: function () {
      return this.$store.state.userInfo;
    },
    avatar: function () {
      return mainDomain + this.userInfo.avatar;
    },
  },
  mounted() {
    this.ruleForm.username = this.userInfo.username;
    this.ruleForm.email = this.userInfo.email;
    this.ruleForm.createdAt = this.userInfo.createdAt;
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    },
    saveImages(file) {
      this.imageUrl = URL.createObjectURL(file.file);
      this.getBase64(file.file).then((res) => {
        this.$store.dispatch("avatarUpload", { avatar: res }).then(() => {
          this.$msg.success("头像上传成功!");
          this.reload();
        });
      });
    },
    beforeAvatarUpload(file) {
      const imgAccept = ["image/gif", "image/jpeg", "image/jpg", "image/png"];

      const isLt1M = file.size / 1024 / 1024 < 2;

      if (imgAccept.indexOf(file.type) == -1) {
        this.$message.error("只支持上传 PNG, GIF, JPEG, 或 JPG 格式图片.");
      }
      if (!isLt1M) {
        this.$message.error("请上传小于 2 MB 的图片.!");
      }
      return file.type && isLt1M;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let updateUserInfoData = {
            _id: this.userInfo._id,
            user_id: this.userInfo.user_id,
            username: this.ruleForm.username,
            password: this.ruleForm.pass,
          };
          this.$store
            .dispatch("updateUserInfo", updateUserInfoData)
            .then(() => {
              this.$msg.success("用户信息修改成功！");
              this.reload();
            });
        } else {
          this.$msg.error("用户信息提交错误！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border-radius: 50% 50%;
}
</style>
