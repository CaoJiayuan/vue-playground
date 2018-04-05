<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card >
          <v-toolbar flat color="gray" dense>
            <v-toolbar-title>Random summary</v-toolbar-title>
          </v-toolbar>
          <v-layout row wrap>
            <v-flex xs8>
              <line-demo></line-demo>
            </v-flex>
            <v-flex xs4>
              <pie-demo></pie-demo>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import PieDemo from "./charts/pie/index";
  import LineDemo from "./charts/line/index";
  import Charts from "../../components/charts/index";
  import option from './charts/map/option'
  export default {
    data () {
      return {
        mapOption : option
      }
    },
    components: {
      Charts,
      LineDemo,
      PieDemo
    },
    methods: {},
    mounted () {

    },
    created () {

    }
  }
</script>
