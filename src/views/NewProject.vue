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
          :importData="minderChartBack.goal || exampleMinder.goal"
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
          :importData="
            !minderChartBack.stakehold
              ? exampleMinder.stakehold
              : Object.keys(this.minderChartBack.stakehold).length === 1
              ? exampleMinder.stakehold
              : minderChartBack.stakehold
          "
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
        :importData="
          !minderChartBack.stakehold
            ? {}
            : Object.keys(this.minderChartBack.task).length === 1
            ? minderChartBack.stakehold
            : minderChartBack.task
        "
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
      <div class="container1">
        <div class="right-container">
          <div class="gantt-selected-info">
            <div v-if="selectedTask">
              <h2>{{ selectedTask.text }}</h2>
              <span><b>ID: </b>{{ selectedTask.id }}</span
              ><br />
              <span
                ><b>完成度: </b>{{ selectedTask.progress | toPercent }}%</span
              ><br />
              <span
                ><b>开始时间: </b>{{ selectedTask.start_date | niceDate }}</span
              ><br />
              <span
                ><b>结束时间: </b>{{ selectedTask.end_date | niceDate }}</span
              ><br />
            </div>
            <div v-else class="select-task-prompt">
              <h2>点击查看任务详情</h2>
            </div>
          </div>
          <ul class="gantt-messages">
            <li
              class="gantt-message"
              v-for="(message, index) in messages"
              :key="index"
            >
              {{ message }}
            </li>
          </ul>
        </div>
        <gantt
          class="left-container"
          :tasks="
            !minderChartBack.plan.tasks
              ? tasks
              : Object.keys(this.minderChartBack.plan.tasks).length === 1
              ? tasks
              : minderChartBack.plan.tasks
          "
          @task-updated="logTaskUpdate"
          @link-updated="logLinkUpdate"
          @task-selected="selectTask"
        ></gantt>
      </div>
      <el-button type="primary" class="float-right mt-2 mr-5" @click="nextS"
        >完成</el-button
      >
      <el-button type="primary" class="float-right mt-2 mr-5" @click="preS"
        >上一步</el-button
      >
    </div>

    <!-- 项目完成，点击查看 -->
    <div class="finish" v-else-if="active === 4">
      <h1 @click="$router.push('/myprojects')">项目完成，点击查看</h1>
    </div>
  </div>
</template>

<script>
import mindercomponent from "@/components/Minder.vue";
import Gantt from "@/components/Gantt.vue";
import { diffString } from "json-diff";
export default {
  inject: ["reload"],
  components: {
    mindercomponent,
    Gantt,
  },
  data() {
    return {
      tasks: {
        data: [
          // {
          //   id: 1,
          //   text: "Task #1",
          //   start_date: "2020-01-17",
          //   duration: 3,
          //   progress: 0.6
          // },
          // {
          //   id: 2,
          //   text: "Task #2",
          //   start_date: "2020-01-20",
          //   duration: 3,
          //   progress: 0.4
          // },
          // {
          //   duration: 1,
          //   end_date: "2020-01-21",
          //   id: 1585501735302,
          //   parent: "2",
          //   progress: 0,
          //   start_date: "2020-01-20",
          //   text: "新任務"
          // }
        ],
        links: [],
      },
      messages: [],
      selectedTask: null,
      active: 0,
      stepData: [
        { index: 0, title: "目标和团队" },
        { index: 1, title: "项目干系人及需求" },
        { index: 2, title: "工作任务" },
        { index: 3, title: "项目计划" },
      ],
      projectName: "",
    };
  },
  computed: {
    exampleMinder: function () {
      return this.$store.state.exampleMinder[0];
    },
    minderChartBack: function () {
      return this.$store.state.minderChartBack;
    },
  },
  filters: {
    toPercent(val) {
      if (!val) return "0";
      return Math.round(+val * 100);
    },
    niceDate(obj) {
      return `${obj.getFullYear()} / ${obj.getMonth() + 1} / ${obj.getDate()}`;
    },
  },
  mounted() {
    this.active = parseInt(localStorage.getItem("active")) || 0;
    this.$store.dispatch("getExampleMinderChart");
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
      if (this.active === 1) {
        this.exampleMinder.stakehold.children[2].children = this.minderChartBack.goal.children[1].children;
      } else if (this.active === 3) {
        // console.log(
        //   diff(this.minderChartBack.stakehold, this.minderChartBack.task)
        // );
        Date.prototype.addDays = function (days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
        // if (this.minderChartBack.plan.tasks.data.length === 0) {
        let planDataList = {
          tasks: {
            data: [],
          },
        };
        diffString(this.minderChartBack.stakehold, this.minderChartBack.task)
          .split("text")
          .map((i, key) => {
            if (key !== 0) {
              i.split('"').map((y, k) => {
                if (k === 1) {
                  planDataList.tasks.data.push({
                    duration: 1,
                    end_date: new Date().addDays(1),
                    progress: 0.1,
                    start_date: new Date(),
                    text: y,
                  });
                }
              });
            }
          });
        if (
          this.minderChartBack.plan.tasks.data.length !==
          planDataList.tasks.data.length
        ) {
          let minderData = {
            plan: planDataList,
            minderId: this.minderChartBack._id,
          };
          this.$store.dispatch("updateMinderChart", minderData);
          this.$router.go(0);
          // this.reload();
        }
        // }
        // this.reload();
        this.$router.go(0);
      }
    },
    preS() {
      let s = parseInt(localStorage.getItem("active"));
      localStorage.setItem("active", s - 1);
      this.active = parseInt(localStorage.getItem("active"));
    },
    updateGoal(data) {
      if (this.projectName || this.minderChartBack._id) {
        let minderData = {
          goal: data.root,
          minderId: this.minderChartBack._id,
        };
        this.$store.dispatch("updateMinderChart", minderData);
      } else {
        let minderData = {
          goal: data.root,
          projectName: data.root.data.text,
          type: "userProject",
        };
        this.$store.dispatch("setMinderChart", minderData).then(() => {
          this.projectName = data.root.data.text;
        });
      }
    },
    updateStakehold(data) {
      if (this.projectName || this.minderChartBack._id) {
        let minderData = {
          stakehold: data.root,
          minderId: this.minderChartBack._id,
        };
        this.$store.dispatch("updateMinderChart", minderData);
      } else {
        this.$msg.error("请先创建一个项目！");
        localStorage.setItem("active", 0);
        this.active = parseInt(localStorage.getItem("active"));
      }
    },
    updateTask(data) {
      if (this.projectName || this.minderChartBack._id) {
        let minderData = {
          task: data.root,
          minderId: this.minderChartBack._id,
        };
        this.$store.dispatch("updateMinderChart", minderData);
      } else {
        this.$msg.error("请先创建一个项目！");
        localStorage.setItem("active", 0);
        this.active = parseInt(localStorage.getItem("active"));
      }
    },
    // planData(data) {
    //   if (this.active == 2) {
    //     Date.prototype.addDays = function (days) {
    //       var date = new Date(this.valueOf());
    //       date.setDate(date.getDate() + days);
    //       return date;
    //     };
    //     let planDataList = {
    //       tasks: {
    //         data: data.map((i) => {
    //           return {
    //             duration: 1,
    //             end_date: new Date().addDays(1),
    //             progress: 0.1,
    //             start_date: new Date(),
    //             text: i,
    //           };
    //         }),
    //       },
    //     };
    //     let minderData = {
    //       plan: planDataList,
    //       minderId: this.minderChartBack._id,
    //     };
    //     this.$store.dispatch("updateMinderChart", minderData);
    //   }
    // },
    addMessage(message) {
      this.messages.unshift(message);
      if (this.messages.length > 40) {
        this.messages.pop();
      }
    },
    logTaskUpdate(id, mode, task) {
      let text = task && task.text ? ` (${task.text})` : "";
      switch (mode) {
        case "update":
          mode = "更新";
          break;
        case "create":
          mode = "创建";
          break;
        case "delete":
          mode = "删除";
          break;
      }
      let time = this.moment().format("YYYY-MM-DD,h:mm:ss");
      let message = `工作任务${mode}: ${text}, ${time}`;
      this.addMessage(message);
      if (task["!nativeeditor_status"] == "inserted") {
        this.minderDataList.plan.tasks.data.push(task);
        let minderData = {
          plan: {
            tasks: {
              data: this.minderDataList.plan.tasks.data,
              links: this.minderDataList.plan.tasks.links,
            },
            messages: this.messages,
          },
          minderId: this.$route.params.id,
        };
        this.$store.dispatch("updateMinderChart", minderData);
      } else if (task["!nativeeditor_status"] == "updated") {
        let taskData = this.minderDataList.plan.tasks.data.map((i) => {
          if (i.id == task.id) {
            return (i = task);
          } else {
            return i;
          }
        });
        let minderData = {
          plan: {
            tasks: {
              data: taskData,
              links: this.minderDataList.plan.tasks.links,
            },
            messages: this.messages,
          },
          minderId: this.$route.params.id,
        };
        this.$store.dispatch("updateMinderChart", minderData);
      } else if (task["!nativeeditor_status"] == "deleted") {
        let minderData = {
          plan: {
            tasks: {
              data: this.minderDataList.plan.tasks.data.filter(
                (i) => i.id !== task.id
              ),
              links: this.minderDataList.plan.tasks.links,
            },
            messages: this.messages,
          },
          minderId: this.$route.params.id,
        };
        this.$store.dispatch("updateMinderChart", minderData);
      }
    },
    logLinkUpdate(id, mode, link) {
      switch (mode) {
        case "update":
          mode = "更新";
          break;
        case "create":
          mode = "创建";
          break;
        case "delete":
          mode = "删除";
          break;
      }
      let time = this.moment().format("YYYY-MM-DD,h:mm:ss");
      let message = `工作链${mode}:`;
      if (link) {
        this.minderDataList.plan.tasks.data.map((i) => {
          if (i.id == link.source) {
            return (link.sourceName = i.text);
          } else if (i.id == link.target) {
            return (link.targetName = i.text);
          }
        });
        message += ` 源: ${link.sourceName}, 目标: ${link.targetName}.  ${time}`;
      }
      this.addMessage(message);
      if (link["!nativeeditor_status"] == "inserted") {
        this.minderDataList.plan.tasks.links.push(link);
        let minderData = {
          plan: {
            tasks: {
              data: this.minderDataList.plan.tasks.data,
              links: this.minderDataList.plan.tasks.links,
            },
            messages: this.messages,
          },
          minderId: this.$route.params.id,
        };
        this.$store.dispatch("updateMinderChart", minderData);
      } else if (link["!nativeeditor_status"] == "deleted") {
        let linkData = this.minderDataList.plan.tasks.links.filter(
          (i) => i.id != link.id
        );
        let minderData = {
          plan: {
            tasks: {
              data: this.minderDataList.plan.tasks.data,
              links: linkData,
            },
            messages: this.messages,
          },
          minderId: this.$route.params.id,
        };
        this.$store.dispatch("updateMinderChart", minderData);
      }
    },
    selectTask: function (task) {
      this.selectedTask = task;
    },
  },
};
</script>

<style lang="scss" scoped>
.finish {
  h1:hover {
    cursor: pointer;
  }
}
.el-steps--simple {
  cursor: pointer;
  margin-bottom: 20px;
}
.container1 {
  height: 75vh;
  width: 100%;
}
.left-container {
  overflow: hidden;
  position: relative;
  height: 100%;
}
.right-container {
  border-right: 1px solid #cecece;
  float: right;
  height: 100%;
  width: 340px;
  box-shadow: 0 0 5px 2px #aaa;
  position: relative;
  z-index: 2;
}
.gantt-messages {
  list-style-type: none;
  height: 50%;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding-left: 5px;
}
.gantt-messages > .gantt-message {
  background-color: #f4f4f4;
  box-shadow: inset 5px 0 #d69000;
  font-family: Geneva, Arial, Helvetica, sans-serif;
  font-size: 14px;
  margin: 5px 0;
  padding: 8px 0 8px 10px;
}
.gantt-selected-info {
  border-bottom: 1px solid #cecece;
  box-sizing: border-box;
  font-family: Geneva, Arial, Helvetica, sans-serif;
  height: 50%;
  line-height: 28px;
  padding: 10px;
}
.gantt-selected-info h2 {
  border-bottom: 1px solid #cecece;
}
.select-task-prompt h2 {
  color: #d9d9d9;
}
</style>
