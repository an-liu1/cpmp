<template>
  <div>
    <el-button type="primary" @click="jump">新建项目</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    jump() {
      this.$router.push("/goal");
    }
  }
};
</script>
