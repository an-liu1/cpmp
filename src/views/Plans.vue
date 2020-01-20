<template>
  <div>
    Project Plan
    <!-- <el-button type="primary" round @click="finish">完成</el-button> -->
  </div>
</template>
<script>
export default {
  methods: {
    finish() {
      localStorage.setItem("active", 4);
    }
  }
};
</script>
