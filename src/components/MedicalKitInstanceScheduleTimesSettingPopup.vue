<template>
<div class="container">
    <h4 class="title">请选择提醒时间</h4>
    <div class="periods">
        <div class="period" v-for="period in periods">
            <p class="period-text">{{period.name}}：</p>
            <div class="period_times">
                <span class="label label-default" v-bind:class="{selected: is_include_time(time)}" v-for="time in period.times" @click="toggle_time(time)">{{time}}</span>
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="btn submit-btn" @click="hide_schedule_times_setting_popup">确定</div>
    </div>
</div>
</template>
<script>
import {
    mapState
} from 'vuex'
import * as types from 'store/mutation_types'
export default {
    props: ['hide_schedule_times_setting_popup'],
    computed: {
        ...mapState({
            periods: state => state.periods,
            schedule_times: state => state.medical_kit_instance.schedule_times
        })
    },
    methods: {
        is_include_time(time) {
            return ~this.schedule_times.indexOf(time)
        },
        toggle_time(time) {
            if (this.is_include_time(time)) {
                this.$store.commit(types.REMOVE_MEDICAL_INSTANCE_SCHEDULE_TIME, {
                    time: time
                })
            } else {
                this.$store.commit(types.ADD_MEDICAL_INSTANCE_SCHEDULE_TIME, {
                    time: time
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    background-color: #fff;
    .title {
        text-align: center;
        font-weight: normal;
        padding: 12px 0;
    }
    .periods {
        .period {
            border-bottom: 1px solid #ccc;
            padding: 0 5px 15px;
            .period-text {
                margin: 8px 0;
            }
            .period_times {
                .label {
                    margin-right: 5px;
                }
                .label.selected {
                    color: #fff;
                    background-color: #5bc0de;
                }
            }
        }
    }
    .footer {
        .submit-btn {
            width: 100%;
            background-color: #5bc0de;
            border-color: #5bc0de;
            color: #fff;
        }
    }
}
</style>
