<template>
  <div :id="id">
  </div>
</template>

<script>

  export default {
    name: 'App',
    data () {
      return {
        msg: 'hello',
        id: window.id
      }
    },
    components: {},
    mounted () {
    }
  }
</script>

<style>

</style>
