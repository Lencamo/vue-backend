<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { setToken } from './utils/auth'
export default {
  name: 'App',
  created() {
    setToken(window.name)
  }
}
</script>
