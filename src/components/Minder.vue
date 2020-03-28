<template>
  <minder
    ref="minder"
    @exportData="exportData"
    scope="jm"
    :importData="importData"
    @saveData="saveData"
  ></minder>
</template>
<script>
export default {
  props: ["importData"],
  data() {
    return {
    };
  },
  methods: {
    exportData(data) {
      this.$emit("updateData", data);
    },
    saveData(data) {
      this.$emit("saveData", data);
      // this.$msg.success("项目脑图保存成功！");
    }
  }
};
</script>