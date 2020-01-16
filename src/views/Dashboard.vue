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
        <el-steps
          v-if="showStep"
          :active="active"
          finish-status="success"
          simple
        >
          <el-step title="目标和团队"></el-step>
          <el-step title="项目干系人"></el-step>
          <el-step title="工作任务"></el-step>
          <el-step title="项目计划"></el-step>
        </el-steps>
        <el-button
          v-if="showStep"
          style="margin: 10px 0;float: right;"
          @click="next"
          ref="finishbtn"
          >下一步</el-button
        >
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
  components: { Header, Aside },
  data() {
    return {
      active: parseInt(localStorage.getItem('active'))
    };
  },
  computed: {
    showStep() {
      return this.$store.state.showStep;
    }
  },
  methods: {
    next() {
      this.active > 3 ? 4 : (this.active++ && localStorage.setItem('active', this.active));
      console.log(this.active);
      switch (this.active) {
        case 0:
          this.$router.push("/goal");
          break;
        case 1:
          this.$router.push("/stakeholds");
          break;
        case 2:
          this.$router.push("/tasks");
          break;
        case 3:
          this.$router.push("/plans");
          break;
        case 4:
         this.$refs.finishbtn.$el.innerText = '完成'
          break;
      }
    }
  }
};
</script>
<style lang="scss">
.el-header {
  padding: 0;
}
.el-aside {
  height: 100vh;
  background-color: #545c64;
}
.logo {
  width: 100%;
  img {
    width: 60%;
    margin: 30px auto;
    display: block;
  }
}
</style>
