<template>
<div id="root">
    <video width="320" height="320" autoplay ref="video">
    </video>
    <canvas width="320" height="320" ref="canvas"></canvas>
</div>
</template>

<script>
export default {
    name: 'IndexPage',
    components: {

    },
    mounted() {
        let canvas = this.$refs.canvas
        let context = canvas.getContext('2d')
        let video = this.$refs.video
        let capture_interval = -1
        if (navigator.getUserMedia) {
            navigator.getUserMedia({
                video: true
            }, stream => {
                video.src = stream
                video.play()
            }, error => {
                console.log("Video capture error: ", error);
            })
        } else {
            if (navigator.webkitGetUserMedia) {
                navigator.webkitGetUserMedia({
                    video: true
                }, stream => {
                    video.src = window.webkitURL.createObjectURL(stream)
                    video.play()
                }, error => {
                    console.log("Video capture error: ", error);
                })
            }
        }
        capture_interval = window.setInterval(() => {
            context.drawImage(video, 0, 0, 320, 320);
        }, 100)
    }
}
</script>

<style lang="scss">@import "~scss/global.scss"</style>
