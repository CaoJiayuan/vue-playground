<template>
    <v-toolbar :dense="theme.dense" app :color="theme.color" :dark="theme.dark" fixed>
        <v-toolbar-side-icon @click="mini = !mini"></v-toolbar-side-icon>
        <v-toolbar-title>{{ user.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-avatar size="36px" class="grey lighten-4">
            <img :src="user.avatar" alt="avatar">
        </v-avatar>
        <v-btn ripple @click="logout" flat>登出</v-btn>
    </v-toolbar>
</template>

<script>
    const mapGetters = Vuex.mapGetters;

    import UserApi from '../../apis/UserApi';
    import {LOGIN_PATH} from '../../constant';

    export default {
        data() {
            return {
            }
        },
        computed  : {
            mini: {
                get(){
                    return this.nav.mini
                },
                set(now){
                    this.$store.commit('miniNavigation', {mini: now})
                }
            },
            ...mapGetters({
                user: 'user',
                nav: 'navigation',
                theme:'theme'
            })
        },
        components: {},
        methods   : {
            logout(){
                UserApi.logout().then(res => {
                    this.$router.push(LOGIN_PATH)
                })
            }
        },
        mounted() {
            this.$store.dispatch('loadUser')
        },
        created() {

        },
        watch     : {
            mini(now) {
                this.$store.commit('miniNavigation', {mini: now})
            }
        }
    }
</script>
