<template>
  <div>
    <minder
      class="minder"
      ref="minder"
      @exportData="exportData"
      scope="jm"
      :importData="importData"
      @saveData="saveData"
    ></minder>
  </div>
</template>
<script>
export default {
  props:["importData"],
  data() {
    return {
      // importData: {
      //   //数据结构
      //   data: { text: "客户", id: 1 }
      // }
    };
  },
  methods: {
    exportData(data) {
      //变化时返回数据
      return data;
    },
    saveData(data) {
      console.log(data);
    }
  }
};
</script>
<style lang="scss" scoped>
.minder {
  clear: both;
}
</style>
