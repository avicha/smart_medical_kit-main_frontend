<template>
<div id="root">
    <ProductInstanceInfoHeader />

</div>
</template>

<script>
import ProductInstanceInfoHeader from 'components/ProductInstanceInfoHeader'
export default {
    name: 'ProductInstanceSettingPage',
    components: {
        ProductInstanceInfoHeader,
    },
    mounted() {
        this.$store.dispatch('product_instance_detail', {
            product_instance_code: this.$route.query.product_instance_code
        })
    }
}
</script>

<style lang="scss">@import "~scss/global.scss";</style>
<style lang="scss" scoped>
#root {
    padding: 5px;
}
</style>
