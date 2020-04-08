<template>
    <div class="wrapper">
        <br/>
        <span>
            <apexchart v-if="loaded == true" type="donut" height="300" :options="instancesChartOptions" :series="instancesSeries"/>
            <p/>
            <apexchart v-if="loaded == true" type="donut" height="300" :options="coresChartOptions" :series="coresSeries"/>
            <p/>
            <apexchart v-if="loaded == true" type="donut" height="300" :options="ramChartOptions" :series="ramSeries"/>
            <p/>
            <apexchart v-if="loaded == true" type="donut" height="300" :options="serverGroupsChartOptions" :series="serverGroupsSeries"/>
        </span>
    </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts';
export default {
    components: {
        apexchart: VueApexCharts
    },
    data: function() {
        return {
            loaded: false,
            instancesSeries: [],
            instancesChartOptions: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                labels: ["Instances Left", "Instances in Use"],
                title: {
                    text: 'Instances',
                    align: 'center'
                }
            },
            coresSeries: [],
            coresChartOptions: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                labels: ["Cores Left", "Cores in Use"],
                title: {
                    text: 'Cores',
                    align: 'center'
                }
            },
            ramSeries: [],
            ramChartOptions: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                labels: ["RAM Left", "RAM in Use"],
                title: {
                    text: 'RAM',
                    align: 'center'
                }
            },
            serverGroupsSeries: [],
            serverGroupsChartOptions: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                labels: ["Server Groups Left", "Server Groups in Use"],
                title: {
                    text: 'Server Groups',
                    align: 'center'
                }
            },
        };
    },
    methods: {
        loadGraphs: function(){
            var axiosLimits = this.axios.create({
                headers: {
                    'x-auth-token': this.$store.state.token,
                }
            })

            axiosLimits.get("/compute/v2.1/limits")
            .then(response => {
                console.log(response.data.limits.absolute)

                this.limits = response.data.limits.absolute;

                this.instancesSeries[0] = (this.limits.maxTotalInstances - this.limits.totalInstancesUsed);
                this.instancesSeries[1] = this.limits.totalInstancesUsed;

                this.coresSeries[0] = (this.limits.maxTotalCores - this.limits.totalCoresUsed);
                this.coresSeries[1] = this.limits.totalCoresUsed;

                this.ramSeries[0] = (this.limits.maxTotalRAMSize - this.limits.totalRAMUsed);
                this.ramSeries[1] = this.limits.totalRAMUsed;

                this.serverGroupsSeries[0] = (this.limits.maxServerGroups - this.limits.totalServerGroupsUsed);
                this.serverGroupsSeries[1] = this.limits.totalServerGroupsUsed;

                
                this.loaded = true;
            })
            .catch(error => {
                console.log("Failed to load Instances:")
                console.log(error)
            })
        }
    },
    created(){
        this.loadGraphs();
    }
}
</script>