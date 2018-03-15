<template>
  <div :id="id">
    <hello></hello>
  </div>
</template>

<script>
  import Hello from '@/components/Hello'

  export default {
    name: 'App',
    data () {
      return {
        msg: 'hello',
        id: window.id
      }
    },
    components: {Hello},
    mounted () {
    }
  }
</script>

<style>

</style>
