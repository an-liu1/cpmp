<template>
  <minder
    ref="minder"
    @exportData="exportData"
    scope="jm"
    :importData="importData"
    @saveData="saveData"
    @planData="planData"
  ></minder>
</template>
<script>
export default {
  props: ["importData"],
  data() {
    return {};
  },
  methods: {
    exportData(data) {
      this.$emit("updateData", data);
    },
    saveData(data) {
      this.$emit("saveData", data);
      // this.$msg.success("项目脑图保存成功！");
    },
    planData(data) {
      for (var i = 0; i < data.length; i++) {
        for (var j = i + 1; j < data.length; j++) {
          if (data[i] == data[j]) {
            data.splice(j, 1);
            j--;
          }
        }
      }
      this.$emit("planData", data);
    }

    // unique(songs) {
    //   let result = {};
    //   let finalResult = [];
    //   for (let i = 0; i < songs.length; i++) {
    //     result[songs[i].name] = songs[i];
    //     //因为songs[i].name不能重复,达到去重效果,且这里必须知晓"name"或是其他键名
    //   }
    //   //console.log(result);{"羽根":{name:"羽根",artist:"air"},"晴天":{name:"晴天",artist:"周杰伦"}}
    //   //现在result内部都是不重复的对象了，只需要将其键值取出来转为数组即可
    //   for (item in result) {
    //     finalResult.push(result[item]);
    //   }
    //   //console.log(finalResult);[{name:"羽根",artist:"air"},{name:"晴天",artist:"周杰伦"}]
    //   return finalResult;
    // }
  }
};
</script>
