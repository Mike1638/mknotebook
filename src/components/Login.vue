<template>
  <div id="login">
    <h1>{{ msg }}</h1>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main"></div>
          <div class="from">
            <h3>创建账户</h3>
            <div v-show="ture" class="register">
              <input type="text" placeholder="用户名" />
              <input type="text" placeholder="密码" />
              <span>创建账号后，请记住用户名和密码</span>
              <button>创建账号</button>
            </div>
            <h3>登录</h3>
            <div v-show="false" class="login">
              <input type="text" placeholder="输入用户名" />
              <input type="text" placeholder="输入密码" />
              <span>输入用户名和密码</span>
              <button>登录</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      msg: "This is login page",
    };
  },
};
</script>

<style scoped>
h1 {
  color: red;
}
</style>