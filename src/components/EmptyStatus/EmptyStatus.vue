<template>
    <div class="p-empty">
        <link ref="preload" as="image" :href="`http://47.95.122.141:8200/persagy_ui_kit/empty/${item}.png`" v-for="item in typeArr" :key="item" />
        <img class="p-empty-img" v-if="type" :src="`http://47.95.122.141:8200/persagy_ui_kit/empty/${type}.png`" alt="" />
        <section class="p-empty-text">
            <slot name="title" v-if="$slots.title" />
            <slot name="text" v-if="$slots.text" />
            <slot name="button" v-if="$slots.button" />
        </section>
    </div>
</template>

<script>
export default {
    name:'EmptyStatus',
    props: {
        type:{
            type: String,
            default: ''
        }
    },
    computed: {
        typeArr() {
            return ['404','500','administration','collect','completed','content','data','download','graph','load','login','message','network','picture','remark','search','statement','table','waitting']
        }
    }
}
</script>

<style lang='stylus'>
.p-empty
    display inline-block
    width 100%
    text-align center
    font-size 0
    .p-empty-img
        width 120px
        height @width
    .p-empty-text
        margin-top 12px
        text-align center

</style>