<template>
<header>
    <h4 class="name">{{medical_kit_instance.name}}</h4>
    <img class="image" src="~images/default_medical_kit_image.png" :title="medical_kit_instance.name" />
</header>
</template>
<script>
import {
    mapState
} from 'vuex'
export default {
    computed: {...mapState({
            medical_kit_instance: state => state.medical_kit_instance.detail
        })
    },
}
</script>
<style lang="scss" scoped>
.name {
    line-height: 30px;
    text-align: center;
}
.image {
    display: block;
    width: 100%;
}
</style>
