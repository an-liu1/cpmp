<template>
  <div ref="gantt"></div>
</template>

<script>
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/locale/locale_cn.js";
export default {
  name: "gantt",
  props: {
    tasks: {
      type: Object,
      default() {
        return { data: [], links: [] };
      },
    },
  },

  mounted: function () {
    gantt.config.xml_date = "%Y-%m-%d";

    gantt.init(this.$refs.gantt);
    gantt.createDataProcessor((entity, action, data, id) => {
      this.$emit(`${entity}-updated`, id, action, data);
    });
    gantt.attachEvent("onTaskSelected", (id) => {
      let task = gantt.getTask(id);
      this.$emit("task-selected", task);
    });
    gantt.attachEvent("onTaskIdChange", (id, new_id) => {
      if (gantt.getSelectedId() == new_id) {
        let task = gantt.getTask(new_id);
        this.$emit("task-selected", task);
      }
    });
    gantt.parse(this.$props.tasks);
  },
};
</script>

<style>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>
