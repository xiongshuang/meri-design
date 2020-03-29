<template>
    <section class="p-picker-tab">
        <article
                :class="['p-picker-tab-item', value===tab.key&&'p-picker-tab-active']"
                v-for="tab in tabData"
                :key="tab.key"
                @click="tabHandle(tab.key)"
        >{{tab.name}}</article>
    </section>
</template>

<script>
    export default {
        name: "TabDate",
        props: {
            value: {
                type: String,
                default: 'day'
            }
        },
        computed: {
            // 日周月年tab
            tabData() {
                return [
                    {key: 'day', name: '日'},
                    {key: 'week', name: '周'},
                    {key: 'month', name: '月'},
                    {key: 'year', name: '年'}
                ]
            }
        },
        methods: {
            tabHandle(key) {
                this.$emit('input', key)
            }
        }
    }
</script>

<style lang="stylus">
    .p-picker-tab
        display flex
        user-select none
        .p-picker-tab-item
            margin-left -1px
            border 1px solid $grey-400
            width 38px
            height 32px
            line-height 30px
            text-align center
            color $grey-900
            font-size 14px
            cursor pointer
            transition color.3s, border .3s
            &:first-child
                border-top-left-radius 4px
                border-bottom-left-radius 4px
            &:last-child
                border-top-right-radius 4px
                border-bottom-right-radius 4px
            &:hover
                color $blue-500
        .p-picker-tab-active
            border-color $blue-500
            color $blue-500
            z-index 1

</style>