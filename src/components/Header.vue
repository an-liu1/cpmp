<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true"
  >
    <el-submenu index="1" class="float-right">
      <template slot="title">
        <el-avatar class="mr-1" :src="avatar"></el-avatar>
        {{ userInfo.username }}</template
      >
      <el-menu-item
        index="1-1"
        class="text-center"
        @click="$router.push('/myinfo')"
        >我的信息</el-menu-item
      >
      <!-- <el-menu-item index="1-2" class="text-center">修改密码</el-menu-item> -->
      <el-menu-item index="/login" @click="logout" class="text-center"
        >退出登录</el-menu-item
      >
    </el-submenu>
  </el-menu>
</template>

<script>
import { ref, onMounted, computed } from "@vue/composition-api";
import { mainDomain } from "@/MainAPI.js";
export default {
  name: "Header",
  setup(props, { root: { $store } }) {
    onMounted(() => {
      $store.dispatch("getUserInfo");
    });
    const activeIndex = ref("1");
    const userInfo = computed(() => {
      return $store.state.userInfo;
    });

    const avatar = computed(() => {
      return mainDomain + userInfo.value.avatar;
    });

    function handleSelect(key, keyPath) {
      key, keyPath;
    }

    const logout = () => {
      localStorage.clear();
    };
    return {
      activeIndex,
      handleSelect,
      logout,
      userInfo,
      avatar,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-submenu {
  display: block;
}
</style>
