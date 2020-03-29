<template>
  <div class="row">
    <div class="col-4" v-for="(minder, index) in exampleMinder" :key="index">
      <img
        class="d-block mx-auto"
        src="../assets/newProject.svg"
        alt="newProject"
      />
      <h3 class="text-center">{{ minder.projectName }}</h3>
      <div class="text-center">
        <el-button type="primary" @click="moreDetail(minder._id)">
          查看
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    moreDetail(id) {
      localStorage.setItem("active", 0);
      this.$router.push(`/project/${id}`);
      this.$msg.success("点击保存，保存项目至本地！");
    }
  },
  mounted() {
    this.$store.dispatch("getExampleMinderChart");
  },
  computed: {
    exampleMinder: function() {
      return this.$store.state.exampleMinder;
    }
  }
};
</script>
<style lang="scss" scoped></style>
