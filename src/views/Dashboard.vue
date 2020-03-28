<template>
  <el-container>
    <el-aside>
      <div class="logo">
        <img src="../assets/logo.png" alt="logo" />
      </div>
      <Aside />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <transition appear name="m-page" mode="out-in">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "@/components/Header";
import Aside from "@/components/Aside";
export default {
  components: { Header, Aside }
};
</script>
<style lang="scss">
.el-header {
  padding: 0;
}
.el-aside {
  height: 100vh;
  background-color: #545c64;
  // background: linear-gradient(to top, #f7fafd, #76b9ff);
}
.el-aside::-webkit-scrollbar {
  width: 0;
}
.logo {
  width: 300px;
  img {
    width: 90%;
    margin: 30px auto;
    display: block;
  }
}
</style>
