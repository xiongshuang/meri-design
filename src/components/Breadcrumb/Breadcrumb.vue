<template>
    <div class="p-breadcrumb">
        <section class="p-breadcrumb-item" v-for="(item, i) in data" :key="item.id">
            <article
                    :class="[
                        'p-breadcrumb-item-text',
                        (value?value===item.id:i===data.length-1)&&'p-breadcrumb-item-active',
                        (i>0&&i<data.length-1)&&'p-breadcrumb-item-width',
                        (i===data.length-1)&&'p-breadcrumb-item-max-width'
                    ]"
                    @click="breadcrumbClick(item.id)"
            >{{item.name}}</article>
            <article class="p-breadcrumb-arrow" v-if="i<data.length-1">
                <ArrowRight />
            </article>
        </section>
    </div>
</template>

<script>
    import ArrowRight from '../static/iconSvg/arrow_right.svg';
    export default {
        name: "Breadcrumb",
        components: { ArrowRight },
        props: {
            /**
             * 数据列表
             */
            data: {
                type: Array,
                default: () => []
            },
            /**
             * 当前高亮显示的id
             */
            value: {
                type: String,
                default: ''
            }
        },
        methods: {
            /**
             * 点击某项执行的钩子
             * @param id
             */
            breadcrumbClick(id) {
                if (this.value) this.$emit('input', id);
            }
        }
    }
</script>

<style lang="stylus">
    .p-breadcrumb
        display flex
        align-items center
        .p-breadcrumb-item
            display inline-flex
            align-content center
            .p-breadcrumb-item-text
                display ruby
                height 24px
                line-height @height
                color $grey-500
                font-size 14px
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                cursor pointer
            .p-breadcrumb-item-active
                color $grey-900
            .p-breadcrumb-item-width
                width 44px
            .p-breadcrumb-item-max-width
                max-width 100px
            .p-breadcrumb-arrow
                margin-left 4px
                margin-right 4px
                padding-top 5px
                width 8px
                height 14px

</style>