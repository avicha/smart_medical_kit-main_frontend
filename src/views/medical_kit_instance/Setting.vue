<template>
<div id="root">
    <MedicalKitInstanceInfoHeader />
    <MedicalKitInstanceBoxSetting :show_schedule_times_setting="show_schedule_times_setting" v-show="!is_schedule_times_setting_shown" />
    <YiMask v-show="is_schedule_times_setting_shown" />
    <MedicalKitInstanceBoxScheduleTimesSetting v-show="is_schedule_times_setting_shown" ref="medical_kit_instance_schedule_times_setting" :hide_schedule_times_setting="hide_schedule_times_setting" />
    <button class="btn set-btn" v-show="!is_schedule_times_setting_shown">设置</button>
</div>
</template>

<script>
import Vue from 'vue'
import wx from 'wx'
import MedicalKitInstanceInfoHeader from 'components/MedicalKitInstanceInfoHeader'
import MedicalKitInstanceBoxSetting from 'components/MedicalKitInstanceBoxSetting'
import YiMask from 'components/Mask'
import MedicalKitInstanceBoxScheduleTimesSetting from 'components/MedicalKitInstanceBoxScheduleTimesSetting'
export default {
    name: 'MedicalKitInstanceSettingPage',
    components: {
        MedicalKitInstanceInfoHeader,
        MedicalKitInstanceBoxSetting,
        YiMask,
        MedicalKitInstanceBoxScheduleTimesSetting
    },
    data() {
        return {
            is_schedule_times_setting_shown: false
        }
    },
    mounted() {
        this.$store.dispatch('medical_kit_instance_detail', {
            medical_kit_instance_id: this.$route.query.medical_kit_instance_id
        })
        this.$store.dispatch('get_weixin_jsapi_params').then(json => {
            if (!json.errcode) {
                let result = json.result
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: result.appId, // 必填，公众号的唯一标识
                    timestamp: result.timestamp, // 必填，生成签名的时间戳
                    nonceStr: result.nonceStr, // 必填，生成签名的随机串
                    signature: result.signature, // 必填，签名，见附录1
                    jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function() {
                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                });
                wx.error(function(res) {
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                    console.error(res)
                });
            }
        })
    },
    methods: {
        show_schedule_times_setting(index) {
            this.is_schedule_times_setting_shown = true
            this.$refs.medical_kit_instance_schedule_times_setting.$data.box_setting_index = index
        },
        hide_schedule_times_setting() {
            this.is_schedule_times_setting_shown = false
        }
    }
}
</script>
<style lang="scss">@import "~scss/global.scss";
#root {
    padding: 5px;
}
.medical_kit_instance_box_setting {
    padding-bottom: 20px;
    margin-bottom: 36px;
}
.schedule_times {
    @extend .bottom-fixed;
    z-index: 100;
}
.set-btn {
    @extend .bottom-fixed;
    z-index: 10;
    height: 36px;
    width: 100%;
    background-color: #5bc0de;
    border-color: #5bc0de;
    color: #fff;
}
</style>
