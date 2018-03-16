<template>
  <div :id="id">
    <v-app>
      <navigation v-if="!isLogin"></navigation>
      <top-bar v-if="!isLogin"></top-bar>
      <v-content :class="theme.background">
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
        <div style="width: 100%;height: 52px;"></div>
      </v-content>
      <mfooter></mfooter>
    </v-app>
    <toast></toast>
  </div>
</template>

<script>

  import Toast from './components/Toast.vue';
  import TopBar from './components/layouts/TopBar.vue';
  import Navigation from './components/layouts/Navigation.vue';
  import Mfooter from './components/layouts/Footer.vue';
  import {LOGIN_PATH} from './constant';
  const mapGetters = Vuex.mapGetters;
  export default {
    name: 'App',
    data () {
      return {
        msg: 'hello',
        id: window.id
      }
    },
    components: {Toast, TopBar, Navigation, Mfooter},
    computed:{
      isLogin() {
        return this.$route.path === LOGIN_PATH;
      },
      ...mapGetters({
        theme: 'theme'
      })
    },
    mounted () {
    }
  }
</script>

<style>

</style>
