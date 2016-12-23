<template>
<div class="schedule_times">
    <h4 class="title">请选择提醒时间</h4>
    <div class="periods">
        <div class="period" v-for="period in periods">
            <p class="period-text">{{period.name}}：</p>
            <div class="period_times">
                <span class="label label-default" v-bind:class="{selected: include_time(time)}" v-for="time in period.times" @click="toggle_time(time)">{{time}}</span>
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="piece-container">
            每次<em class="minus" @click="minus_piece()">﹣</em>{{box_settings[box_setting_index] && box_settings[box_setting_index].piece_per_time || 1}}<em class="plus" @click="add_piece()">﹢</em><span class="unit">粒</span>
        </div>
        <div class="btn submit-btn" @click="hide_schedule_times_setting">确定</div>
    </div>
</div>
</template>
<script>
import {
    mapState
} from 'vuex'
import * as types from 'store/mutation_types'
export default {
    props: ['hide_schedule_times_setting'],
    data() {
        return {
            box_setting_index: 0,
            periods: [{
                name: '早上',
                times: ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00']
            }, {
                name: '中午',
                times: ['11:00', '11:30', '12:00', '12:30', '13:00']
            }, {
                name: '下午',
                times: ['16:00', '16:30', '17:00', '17:30', '18:00']
            }, {
                name: '晚上',
                times: ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']
            }, ]
        }
    },
    computed: {
        ...mapState({
            box_settings: state => state.medical_kit_instance.box_settings,
        })
    },
    methods: {
        include_time(time) {
            let box_setting = this.box_settings[this.box_setting_index]
            return box_setting && ~box_setting.schedule_times.indexOf(time)
        },
        toggle_time(time) {
            if (this.include_time(time)) {
                this.$store.commit(types.REMOVE_MEDICAL_INSTANCE_BOX_SCHEDULE_TIME, {
                    index: this.box_setting_index,
                    time: time
                })
            } else {
                this.$store.commit(types.ADD_MEDICAL_INSTANCE_BOX_SCHEDULE_TIME, {
                    index: this.box_setting_index,
                    time: time
                })
            }
        },
        add_piece() {
            this.$store.commit(types.ADD_MEDICAL_INSTANCE_BOX_PIECE_PER_TIME, {
                index: this.box_setting_index,
            })
        },
        minus_piece() {
            this.$store.commit(types.MINUS_MEDICAL_INSTANCE_BOX_PIECE_PER_TIME, {
                index: this.box_setting_index,
            })
        }
    }
}
</script>
<style lang="scss">
.schedule_times {
    background-color: #fff;
    .label {
        margin-right: 5px;
    }
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
                .label.selected {
                    color: #fff;
                    background-color: #5bc0de;
                }
            }
        }
    }
    .footer {
        overflow: hidden;
        .piece-container {
            float: left;
            width: 60%;
            height: 36px;
            padding: 5px;
            line-height: 26px;
            border-right: 1px solid #ccc;
            .minus,
            .plus {
                display: inline-block;
                width: 26px;
                height: 26px;
                font-style: normal;
                text-align: center;
                font-size: 26px;
                line-height: 26px;
                vertical-align: top;
            }
        }
        .submit-btn {
            float: right;
            width: 40%;

        }
    }
}
</style>
