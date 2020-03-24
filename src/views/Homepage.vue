<template>
  <div class="createpro row">
    <div class="newproject" @click="$router.push('/goal')">
      <img src="../assets/newProject.svg" alt="newProject" />
      <div>
        <el-button type="primary">新建项目</el-button>
      </div>
    </div>
    <div class="projects" @click="$router.push('/projects')">
      <img src="../assets/projects.png" alt="Projects" />
      <div>
        <el-button type="primary">查看项目</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {}
};
</script>
<style lang="scss" scoped>
.createpro {
  width: 500px;
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
