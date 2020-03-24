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
        <!-- <p>点击进行下一步</p> -->
        <el-steps
          v-if="showStep"
          :active="active"
          finish-status="success"
          simple
        >
          <el-step
            :title="item.title"
            @click.native="stepClick(item.index)"
            v-for="item in stepData"
            :key="item.index"
            type="primary"
          ></el-step>
        </el-steps>
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
      active: 0,
      stepData: [
        { index: 0, title: "目标和团队" },
        { index: 1, title: "项目干系人" },
        { index: 2, title: "工作任务" },
        { index: 4, title: "项目计划" }
      ]
    };
  },
  computed: {
    showStep() {
      return this.$store.state.showStep;
    }
  },
  mounted() {
    this.getActive();
  },
  watch: {
    $route: "getActive"
  },
  methods: {
    getActive() {
      this.active = parseInt(localStorage.getItem("active"));
    },
    stepClick(val) {
      localStorage.setItem("active", val);
      this.active = parseInt(localStorage.getItem("active"));
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
        case 4:
          this.$router.push("/plans");
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
.el-steps--simple {
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
