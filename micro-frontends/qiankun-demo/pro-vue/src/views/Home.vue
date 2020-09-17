<template>
  <div class="home">
    <div v-if="!isLogin">
      <input type="text" v-model="username" placeholder="请输入用户名" />
      &nbsp;&nbsp;
      <input type="text" v-model="password" placeholder="请输入密码" />
      &nbsp;&nbsp;
      <button @click="handleLogin">login</button>
    </div>
    <div v-else>{{ username }}，欢迎登录</div>
  </div>
</template>

<script>
  // import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'Home',
    data() {
      return {
        username: '',
        password: '',
        isLogin: false
      }
    },
    components: {
      // HelloWorld
    },
    mounted() {},
    methods: {
      handleLogin() {
        console.log(this.$actions)
        let params = { username: this.username, password: this.password }
        this.$actions.setGlobalState(params)
        this.isLogin = true
      }
    }
  }
</script>
