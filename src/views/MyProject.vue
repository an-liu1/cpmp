<template>
  <div class="row">
    <div class="col-4" v-for="(minder, index) in allMinderData" :key="index">
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
        <el-button type="danger" @click="handleDelete(minder._id)"
          >删除</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  methods: {
    getReload() {
      this.reload();
    },
    moreDetail(id) {
      localStorage.setItem("active", 0);
      this.$router.push(`/project/${id}`);
    },
    handleDelete(id) {
      this.$confirm("确认删除此项目？", "确认信息", {
        confirmButtonText: "删除",
        cancelButtonText: "放弃删除"
      })
        .then(() => {
          this.$store.dispatch("deleteMinderChart", id);
          this.$msg.success("删除成功！");
          this.getReload();
        })
        .catch(() => {
          this.$msg.info("放弃删除");
        });
    }
  },
  mounted() {
    this.$store.dispatch("getAllMinders");
  },
  computed: {
    allMinderData: function() {
      return this.$store.state.allMinderData;
    }
  }
};
</script>
<style lang="scss" scoped></style>
