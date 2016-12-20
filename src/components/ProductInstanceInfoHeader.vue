<template>
<header>
    <h4 class="product_name"><img class="product_image" src="~images/default_sku_image.png" :title="product_instance.product_name"/>{{product_instance.product_name}}（<span v-for="prop in product_instance.sku_props">{{prop.k}}：{{prop.v}}; </span>）</h4>
    <table>
        <tr v-for="prop in product_instance.product_props">
            <td>{{prop.k}}</td>
            <td>{{prop.v}}</td>
        </tr>
    </table>
</header>
</template>
<script>
import {
    mapState
} from 'vuex'
export default {
    computed: {...mapState({
            product_instance: state => state.product_instance.detail
        })
    },
}
</script>
<style lang="scss" scoped>
.product_name {
    overflow: hidden;
    line-height: 30px;
    .product_image {
        display: block;
        width: 30px;
        height: 30px;
        float: left;
        margin-right: 10px;
    }
}
</style>
