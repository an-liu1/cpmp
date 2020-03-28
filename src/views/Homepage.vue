<template>
  <div class="createpro row">
    <div class="newproject" @click="newProject">
      <img src="../assets/newProject.svg" alt="newProject" />
      <div>
        <el-button type="primary">新建项目</el-button>
      </div>
    </div>
    <div class="newproject" @click="$router.push('/exampleproject')">
      <img src="../assets/newProject.svg" alt="newProject" />
      <div>
        <el-button type="primary">示例项目</el-button>
      </div>
    </div>
    <div class="projects" @click="$router.push('/myprojects')">
      <img src="../assets/projects.png" alt="Projects" />
      <div>
        <el-button type="primary">我的项目</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    newProject() {
      localStorage.setItem("active", 0);
      this.$router.push("/newproject");
      sessionStorage.clear();
    }
  }
};
</script>
<style lang="scss" scoped>
.createpro {
  width: 800px;
  margin: 0 auto;
  margin-top: 250px;
  .newproject,
  .projects {
    margin-right: 50px;
    cursor: pointer;
  }
  img {
    width: 200px;
    height: 200px;
  }
  .el-button {
    display: block;
    margin: 0 auto;
  }
}
</style>
