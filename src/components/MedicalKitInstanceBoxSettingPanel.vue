<template>
<div>
    <p class="tips">3. 设置药品，更可以提示吃药分量哦（ps.扫描药盒条形码，可快速录入＾－＾）</p>
    <ul class="list-group">
        <li class="list-group-item" v-for="(box_setting, index) in box_settings">
            <div class="medical">
                <span class="index">{{box_setting.box_index}}.</span>
                <input class="medical_name" v-model="box_setting.medical_name" placeholder="" />
                <button class="scan-btn" @click="scanQRCode(index)"></button>
                <button class="schedule-btn" @click="show_box_schedule_times_setting_popup(index)"></button>
            </div>
            <div class="schedule-info">
                <span class="label label-info" v-for="time in box_setting.schedule_times">{{time|map_period(periods)}}{{time}}</span>
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
import slice from 'lodash/slice'
import first from 'lodash/first'
import last from 'lodash/last'
import compact from 'lodash/compact'
export default {
    props: ['show_box_schedule_times_setting_popup'],
    computed: { ...mapState({
            schedule_times: state => state.medical_kit_instance.schedule_times,
            periods: state => state.periods,
            box_settings: state => state.medical_kit_instance.detail.box_settings,
        })
    },
    methods: {
        get_medical_by_barcode(index, barcode) {
            this.$store.dispatch('medical_scan', {
                barcode
            }).then(({
                errcode,
                result
            }) => {
                if (!errcode) {
                    let piece_per_time = 1
                    let unit = '粒'
                    let schedule_times = []
                    let box_setting = this.box_settings[index]
                    if (/次[^，]*?\d+[粒,片,丸,袋,支,包,贴,毫升,毫克,mg]/.test(result.amount_desc)) {
                        piece_per_time = window.parseInt(result.amount_desc.match(/次[^，]*?(\d+)[粒,片,丸,袋,支,包,贴,毫升,毫克,mg]/)[1])
                        let units = ['粒', '片', '丸', '袋', '支', '包', '贴', '毫升', '毫克', 'mg']
                        for (let i = 0, l = units.length; i < l; i++) {
                            if (~result.amount_desc.indexOf(units[i])) {
                                unit = units[i]
                                break;
                            }
                        }
                    }
                    if (/日[^，]*?(\d+)次/.test(result.amount_desc)) {
                        let times_per_day = window.parseInt(result.amount_desc.match(/日[^，]*?(\d+)次/)[1])
                        switch (times_per_day) {
                            case 1:
                                //一日一次
                                schedule_times = compact([first(this.schedule_times)])
                                break;
                            case 2:
                                //一日两次
                                schedule_times = compact([first(this.schedule_times), last(this.schedule_times)])
                                break;
                            case 3:
                                schedule_times = slice(this.schedule_times, 0, 3)
                                break;
                            case 4:
                                schedule_times = slice(this.schedule_times, 0, 4)
                                break;
                        }
                    }
                    let medical = {
                        medical_name: result.name,
                        medical_barcode: result.barcode,
                        unit: unit
                    }
                    if (window.confirm('药品《' + result.name + '》的服用时间为：\n' + schedule_times.join('  ') + '，每次' + piece_per_time + unit + '，是否确认？')) {
                        medical.schedule_times = schedule_times
                        medical.piece_per_time = piece_per_time
                    }
                    this.$store.commit(types.SET_MEDICAL_INSTANCE_BOX_MEDICAL, {
                        index,
                        medical
                    })
                }
            })
        },
        scanQRCode(index) {
            let ua = navigator.userAgent.toLowerCase()
            let is_weixin_browser = ua.indexOf('micromessenger') != -1
            if (is_weixin_browser) {
                wx.scanQRCode({
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: res => {
                        let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        let barcode = result.split(',')[1]
                        this.get_medical_by_barcode(index, barCode)
                    },
                    fail: res => {
                        alert(res.errMsg);
                    }
                });
            } else {
                //仅供测试
                this.get_medical_by_barcode(index, '6953460846432')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
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
