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
