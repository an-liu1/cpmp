<template>
  <div class="wholeProject">
    <el-steps :active="active" finish-status="success" simple>
      <el-step
        :title="item.title"
        @click.native="stepClick(item.index)"
        v-for="item in stepData"
        :key="item.index"
        type="primary"
      ></el-step>
    </el-steps>

    <!-- 目标和团队 -->
    <div class="goal" v-if="active === 0">
      <div>
        <mindercomponent
          @updateData="updateGoal"
          @saveData="updateGoal"
          :importData="newProjectImportData"
        />
      </div>

      <el-button type="primary" class="float-right mr-5" @click="nextS"
        >下一步</el-button
      >
    </div>

    <!-- 项目干系人 -->
    <div class="stakeholds" v-else-if="active === 1">
      <section>
        <mindercomponent
          @updateData="updateStakehold"
          @saveData="updateStakehold"
          :importData="stakeholdImportData"
        />
      </section>
      <el-button type="primary" class="float-right mr-5" @click="nextS"
        >下一步</el-button
      >
      <el-button type="primary" class="float-right mr-5" @click="preS"
        >上一步</el-button
      >
    </div>

    <!-- 工作任务 -->
    <div class="tasks" v-else-if="active === 2">
      <mindercomponent
        @updateData="updateTask"
        @saveData="updateTask"
        :importData="taskImportData"
      />
      <el-button type="primary" class="float-right mr-5" @click="nextS"
        >下一步</el-button
      >
      <el-button type="primary" class="float-right mr-5" @click="preS"
        >上一步</el-button
      >
    </div>

    <!-- 项目计划 -->
    <div class="plan" v-else-if="active === 3">
      <el-button type="primary" class="float-right mt-5 mr-5" @click="nextS"
        >完成</el-button
      >
      <el-button type="primary" class="float-right mt-5 mr-5" @click="preS"
        >上一步</el-button
      >
    </div>

    <!-- 项目完成，点击查看 -->
    <div class="finish" v-else-if="active === 4">
      <h1>项目完成，点击查看</h1>
    </div>
  </div>
</template>

<script>
import mindercomponent from "@/components/Minder.vue";
export default {
  inject: ["reload"],
  components: {
    mindercomponent
  },
  data() {
    return {
      newProjectImportData: {},
      stakeholdImportData: {},
      taskImportData: {},
      projectName: "",
      active: 0,
      stepData: [
        { index: 0, title: "目标和团队" },
        { index: 1, title: "项目干系人及需求" },
        { index: 2, title: "工作任务" },
        { index: 3, title: "项目计划" }
      ]
    };
  },
  computed: {
    minderData: function() {
      return this.$store.state.minderData;
    },
    exampleMinder: function() {
      return this.$store.state.exampleMinder;
    },
    minderChartId: function() {
      return this.$store.state.minderChartId;
    }
  },
  mounted() {
    this.active = parseInt(localStorage.getItem("active")) || 0;
    if (this.active === 0) {
      this.$store
        .dispatch("getExampleMinderChart", {
          minderName: "goalexample",
          projectName: "projectexample"
        })
        .then(() => {
          this.newProjectImportData = this.exampleMinder[0];
        });
    }
  },
  watch: {
    active: function(newVal) {
      if (!this.projectName) {
        switch (newVal) {
          case 0:
            this.$store
              .dispatch("getExampleMinderChart", {
                minderName: "goalexample",
                projectName: "projectexample"
              })
              .then(() => {
                this.newProjectImportData = this.exampleMinder[0];
              });
            break;
          case 1:
            this.$store
              .dispatch("getExampleMinderChart", {
                minderName: "stakeholdexample",
                projectName: "projectexample"
              })
              .then(() => {
                this.stakeholdImportData = this.exampleMinder[0];
              });
            break;
          case 2:
            this.$store
              .dispatch("getMinderChart", {
                minderName: "stakehold",
                projectName: this.projectName
              })
              .then(() => {
                this.taskImportData = this.minderData;
              });
            break;
        }
      }
    }
  },
  methods: {
    getReload() {
      this.reload();
    },
    stepClick(val) {
      localStorage.setItem("active", val);
      this.active = parseInt(localStorage.getItem("active"));
    },
    nextS() {
      let s = parseInt(localStorage.getItem("active"));
      localStorage.setItem("active", s + 1);
      this.active = parseInt(localStorage.getItem("active"));
    },
    preS() {
      let s = parseInt(localStorage.getItem("active"));
      localStorage.setItem("active", s - 1);
      this.active = parseInt(localStorage.getItem("active"));
    },
    updateGoal(data) {
      if (this.minderChartId) {
        data.root.minderName = "goal";
        data.root.minderId = this.minderChartId;
        data.root.projectName = data.root.data.text;
        this.projectName = data.root.data.text;
        this.$store.dispatch("updateMinderChart", data.root);
      } else {
        data.root.minderName = "goal";
        data.root.projectName = data.root.data.text;
        this.$store.dispatch("setMinderChart", data.root);
      }
    },
    updateStakehold(data) {
      if (this.minderChartId) {
        data.root.minderName = "stakehold";
        data.root.minderId = this.minderChartId;
        data.root.projectName = this.projectName;
        this.$store.dispatch("updateMinderChart", data.root);
      } else {
        data.root.minderName = "stakehold";
        data.root.projectName = this.projectName;
        this.$store.dispatch("setMinderChart", data.root);
      }
    },
    updateTask(data) {
      console.log(data);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-steps--simple {
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
