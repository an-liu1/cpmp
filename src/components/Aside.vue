<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1">
      <a href="/#/dashboard">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </a>
    </el-menu-item>

    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-s-data"></i>
        <span>目标与团队</span>
      </template>
      <el-menu-item index="2-1">辅助流程</el-menu-item>
      <el-menu-item-group>
        <template slot="title">目标</template>
        <el-menu-item index="2-2">项目目标确定</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="团队">
        <el-menu-item index="2-3">组建项目团队</el-menu-item>
        <el-menu-item index="2-4">团队管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-user-solid"></i>
        <span>项目干系人</span>
      </template>
      <el-menu-item index="3-1">辅助流程</el-menu-item>
      <el-menu-item-group>
        <template slot="title">干系人</template>
        <el-menu-item index="3-2">项目沟通计划</el-menu-item>
        <el-menu-item index="3-3">确定干系人</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="需求">
        <el-menu-item index="3-4">获取需求</el-menu-item>
        <el-menu-item index="3-5">需求批准</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>工作任务</span>
      </template>
      <el-menu-item index="4-1">辅助流程</el-menu-item>
      <el-menu-item index="4-2">工作任务属性</el-menu-item>
      <el-menu-item index="4-3">任务的估算</el-menu-item>
    </el-submenu>

    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-date"></i>
        <span>项目计划</span>
      </template>
      <el-menu-item index="5-1">辅助流程</el-menu-item>
      <el-menu-item-group>
        <template slot="title">计划</template>
        <el-menu-item index="5-2">任务的排序</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="管理">
        <el-menu-item index="5-3">质量管理</el-menu-item>
        <el-menu-item index="5-4">干系人管理</el-menu-item>
        <el-menu-item index="5-5">变化管理</el-menu-item>
        <el-menu-item index="5-6">风险管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="6">
      <template slot="title">
        <i class="el-icon-set-up"></i>
        <span>管理工具</span>
      </template>
      <el-menu-item index="6-1">各种会议</el-menu-item>
      <el-menu-item index="6-2">风险识别工具</el-menu-item>
      <el-menu-item index="6-3">时间管理工具</el-menu-item>
    </el-submenu>

    <el-menu-item index="7">
      <i class="el-icon-phone-outline"></i>
      <span slot="title">AI专家</span>
    </el-menu-item>

    <el-menu-item index="8">
      <i class="el-icon-setting"></i>
      <span slot="title">设置</span>
    </el-menu-item>

    <el-menu-item index="9">
      <i class="el-icon-switch-button"></i>
      <span slot="title">退出登录</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-menu {
  width: 100%;
}
.el-menu-item {
  a {
    display: block;
    text-decoration: none;
    color: #ffffff;
  }
}
</style>
