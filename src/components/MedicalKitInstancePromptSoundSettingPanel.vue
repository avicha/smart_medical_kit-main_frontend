<template>
<div>
    <p class="tips">2. 设置提醒声音，10s以内</P>
    <div class="prompt-sound-container">
        <button class="prompt-sound-btn" @touchend="playVoice"></button>
        <div class="sound-bar" :class="{active: is_sound_bar_active}" @touchstart="startRecord" @touchend="stopRecord">{{sound_bar_text}}</div>
    </div>
</div>
</template>
<script>
import {
    mapState
} from 'vuex'
import wx from 'wx'
import * as types from 'store/mutation_types'
export default {
    data() {
        return {
            sound: null,
            is_sound_bar_active: false,
            sound_bar_text: '按住录音'
        }
    },
    computed: { ...mapState({
            setting: state => state.medical_kit_instance.detail.setting
        })
    },
    methods: {
        startRecord() {
            this.is_sound_bar_active = true
            this.sound_bar_text = '正在录音'
            wx.startRecord()
        },
        stopRecord() {
            this.is_sound_bar_active = false
            this.sound_bar_text = '按住录音'
            wx.stopRecord({
                success: res => {
                    this.$store.commit(types.SET_MEDICAL_INSTANCE_BOX_PROMPT_SOUND, 'local ' + res.localId)
                }
            })
        },
        playVoice() {
            if (this.setting && this.setting.prompt_sound) {
                let tmp = this.setting.prompt_sound.split(' ')
                let type = tmp[0].trim()
                let content = tmp[1].trim()
                switch (type) {
                    case 'src':
                        this.sound && this.sound.play()
                        break
                    case 'local':
                        wx.playVoice({
                            localId: content
                        })
                        break;
                }
            }
        }
    },
    watch: {
        setting() {
            if (this.setting && this.setting.prompt_sound) {
                let tmp = this.setting.prompt_sound.split(' ')
                let type = tmp[0].trim()
                let content = tmp[1].trim()
                switch (type) {
                    case 'src':
                        let audio = new Audio()
                        audio.addEventListener('canplaythrough', () => {
                            this.sound = audio
                        })
                        audio.src = content
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.tips {
    margin: 10px 15px;
}
.prompt-sound-container {
    overflow: hidden;
    .prompt-sound-btn {
        float: right;
        width: 36px;
        height: 36px;
        background-image: url("~images/prompt_sound.jpg");
        background-size: contain;
        vertical-align: middle;
    }
    .sound-bar {
        user-select: none;
        text-align: center;
        background-color: #ccc;
        color: #555;
        border-radius: 3px;
        margin-right: 20px;
        font-size: 12px;
        line-height: 36px;
        &:active {
            background-color: #f0ad4e;
        }
    }
}
</style>
