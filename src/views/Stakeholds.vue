<template>
  <div class="row">
    <div class="stepBar col-2">
      <el-steps direction="vertical" :active="active1">
        <el-step
          @click.native="stepClick(item.index)"
          v-for="item in stepData"
          :key="item.index"
          :title="item.title"
          :description="item.description"
          class="step"
        ></el-step>
      </el-steps>
    </div>
    <div class="col-10">
      <transition appear name="m-page" mode="out-in">
        <router-view />
      </transition>
      <el-button type="primary" class="float-right mr-5" @click="next"
        >下一步</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      active1: 0,
      stepData: [
        { index: 0, title: "客户", description: "点击编辑" },
        { index: 1, title: "直接领导", description: "点击编辑" },
        { index: 2, title: "项目团队核心成员", description: "点击编辑" },
        { index: 3, title: "政府，媒体等", description: "点击编辑" },
        { index: 4, title: "其他", description: "点击编辑" }
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
    $route: "getReload"
  },
  methods: {
    getActive() {
      this.active1 = parseInt(localStorage.getItem("active1"));
      switch (this.active1) {
        case 0:
          this.$router.push("/stakeholds");
          break;
        case 1:
          this.$router.push("/stakeholds/leader");
          break;
        case 2:
          this.$router.push("/stakeholds/member");
          break;
        case 3:
          this.$router.push("/stakeholds/media");
          break;
        case 4:
          this.$router.push("/stakeholds/other");
          break;
      }
    },
    getReload() {
      this.reload();
    },
    stepClick(val) {
      localStorage.setItem("active1", val);
      this.getActive();
    },
    next() {
      localStorage.setItem("active", "2");
      this.$router.push("/tasks");
    }
  }
};
</script>

<style lang="scss" scoped>
.stepBar {
  height: 70vh;
  margin-top: 5vh;
  .step {
    cursor: pointer;
  }
}
</style>
