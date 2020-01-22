<template>
  <div>
    Project Plan
    <!-- <el-button type="primary" round @click="finish">完成</el-button> -->
    <gantt-elastic :tasks="tasks" :options="options">
      <gantt-elastic-header slot="header"></gantt-elastic-header>
      <gantt-elastic-footer slot="footer"></gantt-elastic-footer>
    </gantt-elastic>
  </div>
</template>
<script>
import GanttElastic from "gantt-elastic";
export default {
  components: {
    ganttElasticHeader: { template: `<span>your header</span>` }, // or Header
    ganttElastic: GanttElastic,
    ganttElasticFooter: { template: `<span>your footer</span>` }
  },
  data() {
    return {
      tasks: [
        {
          id: 1,
          label: "Make some noise",
          user:
            '<a href="https://www.google.com/search?q=John+Doe" target="_blank" style="color:#0077c0;">John Doe</a>',
          start: new Date(-24 * 5),
          duration: 15 * 24 * 60 * 60 * 1000,
          progress: 85,
          type: "project"
          // collapsed: true,
        },
        {
          id: 2,
          label: "With great power comes great responsibility",
          user:
            '<a href="https://www.google.com/search?q=Peter+Parker" target="_blank" style="color:#0077c0;">Peter Parker</a>',
          parentId: 1,
          start: new Date(-24 * 4),
          duration: 4 * 24 * 60 * 60 * 1000,
          progress: 50,
          type: "milestone",
          collapsed: true,
          style: {
            base: {
              fill: "#1EBC61",
              stroke: "#0EAC51"
            }
            /*'tree-row-bar': {
              fill: '#1EBC61',
              stroke: '#0EAC51'
            },
            'tree-row-bar-polygon': {
              stroke: '#0EAC51'
            }*/
          }
        }
      ],
      options: {
        maxRows: 100,
        maxHeight: 300,
        title: {
          label: "Your project title as html (link or whatever...)",
          html: false
        },
        row: {
          height: 24
        },
        calendar: {
          hour: {
            display: false
          }
        },
        chart: {
          progress: {
            bar: false
          },
          expander: {
            display: true
          }
        },
        taskList: {
          expander: {
            straight: false
          },
          columns: [
            {
              id: 1,
              label: "ID",
              value: "id",
              width: 40
            },
            {
              id: 2,
              label: "Description",
              value: "label",
              width: 200,
              expander: true,
              html: true,
              events: {
                click({ data }) {
                  alert("description clicked!\n" + data.label);
                }
              }
            },
            {
              id: 3,
              label: "Assigned to",
              value: "user",
              width: 130,
              html: true
            },
            {
              id: 3,
              label: "Start",
              value: new Date(),
              width: 78
            },
            {
              id: 4,
              label: "Type",
              value: "type",
              width: 68
            },
            {
              id: 5,
              label: "%",
              value: "progress",
              width: 35,
              style: {
                "task-list-header-label": {
                  "text-align": "center",
                  width: "100%"
                },
                "task-list-item-value-container": {
                  "text-align": "center",
                  width: "100%"
                }
              }
            }
          ]
        }
      }
    };
  },
  methods: {
    finish() {
      localStorage.setItem("active", 4);
    }
  }
};
</script>
