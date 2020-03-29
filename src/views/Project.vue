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
          :importData="minderData.goal"
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
          :importData="minderData.stakehold"
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
        :importData="minderData.task"
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
      <h1>成功修改, 点击查看</h1>
    </div>
  </div>
</template>

<script>
import mindercomponent from "@/components/Minder.vue";
export default {
  components: {
    mindercomponent
  },
  data() {
    return {
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
    }
  },
  mounted() {
    this.active = parseInt(localStorage.getItem("active")) || 0;
    this.$store.dispatch("getMinderChart", this.$route.params.id);
  },
  methods: {
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
      let minderData = {
        goal: data.root,
        minderId: this.$route.params.id
      };
      this.$store.dispatch("updateMinderChart", minderData);
    },
    updateStakehold(data) {
      let minderData = {
        stakehold: data.root,
        minderId: this.$route.params.id
      };
      this.$store.dispatch("updateMinderChart", minderData);
    },
    updateTask(data) {
      let minderData = {
        task: data.root,
        minderId: this.$route.params.id
      };
      this.$store.dispatch("updateMinderChart", minderData);
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
