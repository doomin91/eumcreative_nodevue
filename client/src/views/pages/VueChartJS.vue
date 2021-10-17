<template>
  <section class="container">

    <h1>vue-chartjs</h1>


   <LineChart/>


  </section>

</template>


<script>
import LineChart from "../../components/Chart/LineChart.vue"

export default {
  name: "VueChartJS",
  components: {
    LineChart
  },
  data() {
    return {
      chartData: {
        Books: 24,
        Magazine: 30,
        Newspapers: 10
      }
    };
  }
};
</script>

