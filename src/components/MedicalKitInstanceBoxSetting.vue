<template>
<div class="medical_kit_instance_box_setting">
    <p class="tips">扫描药盒条形码，可快速录入</P>
    <ul class="list-group">
        <li class="list-group-item" v-for="(box_setting, index) in box_settings">
            <div class="medical">
                <span class="index">{{box_setting.box_index}}.</span>
                <input class="medical_name" v-model="box_setting.medical_name" placeholder="" />
                <button class="scan-btn" @click="scanQRCode(index)"></button>
                <button class="schedule-btn" @click="show_schedule_times_setting(index)"></button>
            </div>
            <div class="schedule-info">
                <span class="label label-info" v-for="time in box_setting.schedule_times">{{time}}</span>
                <span class="piece_per_time">每次{{box_setting.piece_per_time}}{{box_setting.unit}}</span>
            </div>
        </li>
    </ul>
</div>
</template>
<script>
import wx from 'wx'
import {
    mapState
} from 'vuex'
import * as types from 'store/mutation_types'
export default {
    props: ['show_schedule_times_setting'],
    computed: { ...mapState({
            box_settings: state => state.medical_kit_instance.detail.box_settings,
            medical_kit_instance: state => state.medical_kit_instance.detail
        })
    },
    methods: {
        scanQRCode(index) {
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: res => {
                    let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    let barcode = result.split(',')[1]
                    this.$store.dispatch('medical_scan', {
                        barcode
                    }).then(({
                        errcode,
                        result
                    }) => {
                        if (!errcode) {
                            if (/一次[^，]*?\d+[粒,片,丸,袋,支,包]/.test(result.amount_desc)) {
                                let piece_per_time = result.amount_desc.match(/一次[^，]*?(\d+)[粒,片,丸,袋,支,包]/)[1]
                                let unit = result.amount_desc.match(/一次[^，]*?\d+([粒,片,丸,袋,支,包])/)[1]
                            } else {
                                let piece_per_time = 1
                                let unit = '粒'
                            }
                            if (/每日[^，]*?(\d+)次/.test(result.amount_desc)) {
                                let times_per_day = window.parseInt(result.amount_desc.match(/每日[^，]*?(\d+)次/)[1])
                                let schedule_times = []
                                switch (times_per_day) {
                                    case 1:
                                        schedule_times = ['08:00'];
                                        break;
                                    case 2:
                                        schedule_times = ['08:00', '20:00'];
                                        break;
                                    case 3:
                                        schedule_times = ['08:00', '14:00', '20:00'];
                                        break;
                                    case 4:
                                        schedule_times = ['08:00', '12:00', '16:00', '20:00'];
                                        break;
                                }
                            } else {
                                let schedule_times = []
                            }
                            this.$store.commit(types.SET_MEDICAL_INSTANCE_BOX_MEDICAL, {
                                index: index,
                                medical: {
                                    medical_name: result.name,
                                    medical_barcode: result.barcode,
                                    schedule_times: schedule_times,
                                    piece_per_time: piece_per_time,
                                    unit: unit
                                },
                                times_per_day: times_per_day
                            })
                        }
                    })
                },
                fail: res => {
                    alert(res.errMsg);
                }
            });
        }
    }
}
</script>
<style lang="scss">
.tips {
    margin: 10px 15px;
}
.medical {
    padding-bottom: 5px;
    .index {
        padding-right: 5px;
    }
    .medical_name {
        padding: 3px 6px;
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        border: 1px solid #ccc;
        background-color: #fff;
        border-radius: 4px;
        width: 75%;
        vertical-align: middle;
    }
    .scan-btn {
        width: 20px;
        height: 20px;
        background-image: url("~images/scan.png");
        background-size: contain;
        vertical-align: middle;
    }
    .schedule-btn {
        width: 20px;
        height: 20px;
        background-image: url("~images/schedule.jpg");
        background-size: contain;
        vertical-align: middle;
    }
}
.schedule-info {
    overflow: hidden;
    .label {
        margin-right: 5px;
    }
    .piece_per_time {
        float: right;
        font-size: 12px;
        padding: 0.2em 0.6em 0.3em;
    }
}
</style>
style>
