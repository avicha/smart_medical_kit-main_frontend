<template>
<div class="container">
    <h4 class="title">请选择提醒时间</h4>
    <div class="period_times">
        <span class="label label-default" v-bind:class="{selected: is_include_time(time)}" v-for="time in schedule_times" @click="toggle_time(time)">{{time}}</span>
    </div>
    <div class="footer">
        <div class="piece-container">
            每次<em class="minus" @click="minus_piece()">﹣</em>{{box_settings[box_setting_index] && box_settings[box_setting_index].piece_per_time}}<em class="plus" @click="add_piece()">﹢</em><span class="unit">{{box_settings[box_setting_index] && box_settings[box_setting_index].unit}}</span>
        </div>
        <div class="btn submit-btn" @click="hide_box_schedule_times_setting_popup">确定</div>
    </div>
</div>
</template>
<script>
import {
    mapState
} from 'vuex'
import * as types from 'store/mutation_types'
export default {
    props: ['hide_box_schedule_times_setting_popup'],
    computed: {
        ...mapState({
            schedule_times: state => state.medical_kit_instance.schedule_times,
            box_settings: state => state.medical_kit_instance.detail.box_settings,
            box_setting_index: state => state.medical_kit_instance.box_setting_index
        })
    },
    methods: {
        is_include_time(time) {
            let box_setting = this.box_settings[this.box_setting_index]
            return box_setting && ~box_setting.schedule_times.indexOf(time)
        },
        toggle_time(time) {
            if (this.is_include_time(time)) {
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
<style lang="scss" scoped>
.container {
    background-color: #fff;
    .title {
        text-align: center;
        font-weight: normal;
        padding: 12px 0;
    }
    .period_times {
        border-bottom: 1px solid #ccc;
        padding: 0 5px 15px;
        .label {
            margin-right: 5px;
        }
        .label.selected {
            color: #fff;
            background-color: #5bc0de;
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
