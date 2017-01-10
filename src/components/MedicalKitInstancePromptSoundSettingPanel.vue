<template>
<div>
    <p class="tips">2. 设置提醒声音，10s以内</P>
    <div class="prompt-sound-container">
        <button class="prompt-sound-btn" @touchend="playVoice"></button>
        <div class="sound-bar" @touchstart="startRecord" @touchend="stopRecord">按住录音</div>
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
            sound: null
        }
    },
    computed: { ...mapState({
            setting: state => state.medical_kit_instance.detail.setting
        })
    },
    methods: {
        startRecord() {
            wx.startRecord();
        },
        stopRecord() {
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
                        this.sound.play()
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
    mounted() {
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
</script>
<style lang="scss" scoped>
.tips {
    margin: 10px 15px;
}
.prompt-sound-container {
    overflow: hidden;
    .prompt-sound-btn {
        float: right;
        width: 20px;
        height: 20px;
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
        line-height: 20px;
    }
}
</style>
