<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-submenu index="1" class="float-right">
      <template slot="title">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        Andy Liu</template
      >
      <el-menu-item index="1-1" class="text-center">我的信息</el-menu-item>
      <el-menu-item index="1-2" class="text-center">修改密码</el-menu-item>
      <el-menu-item index="1-3" class="text-center">退出登录</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { ref } from "@vue/composition-api";
export default {
  name: "Header",
  setup() {
    const activeIndex = ref("1");

    function handleSelect(key, keyPath) {
      key, keyPath;
    }
    return {
      activeIndex,
      handleSelect
    };
  }
};
</script>

<style lang="scss" scoped>
.el-submenu {
  display: block;
}
</style>
