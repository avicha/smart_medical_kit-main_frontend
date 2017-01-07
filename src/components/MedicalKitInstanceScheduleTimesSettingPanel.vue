<template>
<div>
    <p class="tips">1. 设置提醒时间<button class="schedule-btn" @click="show_schedule_times_setting_popup"></button></P>
    <div class="schedule-info">
        <span class="label label-info" v-for="time in schedule_times">{{time|map_period(periods)}}{{time}}</span>
    </div>
</div>
</template>
<script>
import {
    mapState
} from 'vuex'
import * as types from 'store/mutation_types'
export default {
    props: ['show_schedule_times_setting_popup'],
    computed: { ...mapState({
            periods: state => state.periods,
            schedule_times: state => state.medical_kit_instance.schedule_times
        })
    }
}
</script>
<style lang="scss" scoped>
.tips {
    margin: 10px 15px;
}
.schedule-btn {
    width: 20px;
    height: 20px;
    margin-left: 20px;
    background-image: url("~images/schedule.jpg");
    background-size: contain;
    vertical-align: middle;
}
.schedule-info {
    overflow: hidden;
    .label {
        margin-right: 5px;
    }
}
</style>
