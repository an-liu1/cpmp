<template>
  <div class="about">
    <minder
      class="minder"
      ref="minder"
      @exportData="exportData"
      scope="jm"
      :importData="importData"
      @saveData="saveData"
    ></minder>
    <el-button type="primary" class="float-right mr-5" @click="next">下一步</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      importData: {
        //数据结构
        data: { text: "项目名称", id: 2 },
        children: [
          {
            data: { text: "项目目标", id: 3, priority: "6" },
            children: [
              {
                data: { text: "完成什么", id: 4 },
                children: [
                  { data: { text: "收费学员>200人", id: 5 } },
                  { data: { text: "入驻企业工会>2家", id: 5 } }
                ]
              },
              {
                data: { text: "考核标准", id: 5 },
                children: [{ data: { text: "200人，2家", id: 5 } }]
              },
              {
                data: { text: "时间限制", id: 5 },
                children: [{ data: { text: "3个月", id: 5 } }]
              }
            ]
          },
          {
            data: { text: "项目团队", id: 3, progress: "5" },
            children: [
              {
                data: { text: "负责人1", id: 4 },
                children: [{ data: { text: "人员1", id: 5 } }]
              },
              {
                data: { text: "负责人2", id: 5 },
                children: [
                  { data: { text: "人员1", id: 5 } },
                  { data: { text: "人员2", id: 5 } },
                  { data: { text: "人员3", id: 5 } }
                ]
              },
              {
                data: { text: "负责人3", id: 5 },
                children: [
                  { data: { text: "人员1", id: 5 } },
                  { data: { text: "人员2", id: 5 } }
                ]
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    exportData(data) {
      //变化时返回数据
      return data;
    },
    saveData(data) {
      console.log(data);
    },
    next() {
      localStorage.setItem("active", "1");
      this.$router.push("/stakeholds");
    }
  }
};
</script>
