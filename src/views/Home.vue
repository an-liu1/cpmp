<template>
  <div class="home-page">
    <div class="box">
      <img src="../assets/logo.png" alt="logo" class="home-logo">
      <h1 class="title">Welcome to AI FreePMO</h1>
      <p></p>
      <div>
        <button class="rc-button rc-button-green rc-button-round link-button" style="width: 200px; height: 48px;" @click="$router.push('/login')">进入平台</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .home-page {
    height: 100vh;
    background: linear-gradient(to top, #f7fafd, #76b9ff);
    display: flex;
    align-items: center;
    justify-content: center;

    .box {
      width: 800px;
      text-align: center;
      margin: 0 auto;
      margin-top: -200px;
    }
    .title {
      color: #394d63;
      margin-top: 50px;
      font-size: 1.8rem;
      font-weight: lighter;
    }
    .home-logo {
      max-width: 200px;
      color: #fff;
    }

    .rc-button {
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      cursor: pointer;
      color: #fff;
      background-color: #6F76D9;
      outline: none;
      transition: all 0.3s ease;
      display: inline-block;

      &:hover {
        background-color: #484DA0;
      }

      & + & {
        margin-left: 10px;
      }

      &.rc-button-round {
        border-radius: 100px;
      }
      &.rc-button-green {
        background-color: #01ABC3;
        background: linear-gradient(70deg, #1ad7f9, #5eece4);

        &:hover {
          background: linear-gradient(40deg, #20cdff, #2dfff3);
          box-shadow: 0 10px 20px #54f3ff;
        }
      }
    }

    .link-button {
      margin-top: 30px;
    }
  }
</style>
