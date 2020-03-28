<template>
  <div class="row">
    <div class="col-4" v-for="(minder, index) in exampleMinder" :key="index">
      <img
        class="d-block mx-auto"
        src="../assets/newProject.svg"
        alt="newProject"
      />
      <h3 class="text-center">{{ minder.projectName }}</h3>
      <button class="d-block mx-auto" @click="moreDetail(minder.projectName)">
        了解更多
      </button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    moreDetail(id) {
      this.$store.dispatch("getMinderChart", id);
    }
  },
  mounted() {
    this.$store.dispatch("getExampleMinderChart", {
      minderName: "goalexample",
      projectName: "projectexample"
    });
  },
  computed: {
    exampleMinder: function() {
      return this.$store.state.exampleMinder;
    }
  }
};
</script>
<style lang="scss" scoped></style>
