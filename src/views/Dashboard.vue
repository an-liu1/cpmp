<template>
  <el-container>
    <el-header>
      <p>fdsfndskfhsdofhkdlsjfhnkdlsfds</p>
    </el-header>
    <el-main>
      <transition appear name="m-page" mode="out-in">
        <router-view />
      </transition>
    </el-main>
  </el-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
