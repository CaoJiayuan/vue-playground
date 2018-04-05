<template>
  <v-footer app inset fixed :color="theme.color" :dark="theme.dark">
    <div :style="{color:color}">&nbsp;&nbsp; admin.test ©{{ new Date().getFullYear() }}</div>
    <v-spacer></v-spacer>
    <v-btn v-for="(t, index) in themes" :key="index" :color="t.color" :dark="t.dark"
           small bottom right fab
           @click="changeTheme({color: t.color, dark : t.dark, background: t.background})">
    </v-btn>
  </v-footer>
</template>

<script>
  const mapMutations = Vuex.mapMutations
  const mapGetters = Vuex.mapGetters
  export default {
    data () {
      return {}
    },
    computed: {
      color () {
        return this.theme.color !== 'white' ? 'white' : 'black'
      },
      ...mapGetters({
        theme: 'theme',
        themes: 'themes',
      })
    },
    components: {},
    methods: {
      ...mapMutations({
        changeTheme: 'changeTheme'
      })
    },
    mounted () {

    },
    created () {

    },

  }
</script>
