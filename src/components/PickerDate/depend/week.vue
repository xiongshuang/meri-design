<template>
    <div class="p-picker-box-content p-picker-week-content">
        <div class="p-picker-day-select">
            <section
                    :class="[
                        'p-picker-weeks-list',
                        'p-picker-weeks-list-'+weeks.flag,
                        'p-picker-weeks-list-'+weeks.multiple,
                        'p-picker-weeks-list-'+weeks.selected,
                        'p-picker-weeks-list-'+weeks.disabled
                    ]"
                    v-for="(weeks, i) in weeksArray" :key="'weeks'+i"
                    @click="weekClick(weeks)"
                    @mouseenter="weekEnter(weeks)"
            >
                <article class="p-picker-weeks-list-text">
                    第<span>{{weeks.th}}</span>周
                </article>
                <article
                        :class="['p-picker-day-text', 'p-picker-day-text-'+ww.flag]"
                        v-for="(ww, wi) in weeks.weeks"
                        :key="'week-'+ww.th+wi"
                >
                    <span>{{ww.day}}</span>
                </article>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Week",
        props: {
            weeksArray: {
                type: Array,
                default: () => []
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            weekClick(weeks) {
                if (weeks.disabled) return;
                this.$emit('change', weeks)
            },
            weekEnter(weeks) {
                if (!this.multiple || weeks.disabled) return;
                this.$emit('enter', weeks);
            }
        }
    }
</script>

<style lang="stylus">

.p-picker-week-content
    .p-picker-day-select
        .p-picker-weeks-list
            position relative
            display flex
            flex-wrap wrap
            margin-bottom 8px
            border-radius 4px
            width 100%
            cursor pointer
            transition background-color .3s
            &:hover
                background-color $grey-200
                .p-picker-weeks-list-text
                    top -24px
                    opacity 1
            &.p-picker-weeks-list-multiple
                background-color $grey-200
            &.p-picker-weeks-list-selected
                background-color $blue-500
                .p-picker-day-text
                    span
                        color $white
            .p-picker-weeks-list-text
                position absolute
                top -12px
                left 50%
                padding-top 4px
                padding-bottom 4px
                background-color $white
                box-shadow $box-shadow-bottom
                border-radius 4px
                transform translateX(-36px)
                opacity 0
                width 72px
                text-align center
                color $grey-900
                font-size 14px
                z-index 11
                transition all .3s
                user-select none
                &:after
                    display inline-block
                    position absolute
                    left 50%
                    bottom 0
                    border-style solid
                    border-width 4px
                    width 0
                    height 0
                    border-color $white $white transparent transparent
                    box-shadow $box-shadow-min-bottom
                    transform rotate(135deg) translateX(5.5px)
                    pointer-events none
                    content ''
                span
                    padding-left 4px
                    padding-right 4px
                    color $blue-500
            &.p-picker-weeks-list-disabled
                cursor not-allowed
                .p-picker-day-text
                    span
                        color $grey-400
                .p-picker-day-text
                    span
                        color $grey-400
                .p-picker-weeks-list-text
                    display none
        .p-picker-day-text
            display flex
            align-items center
            justify-content center
            margin-right 16px
            margin-bottom 0
            //border-width 1px
            //border-style solid
            //border-color transparent
            border-radius 4px
            width 24px
            height 24px
            text-align center
            transition background-color .3s
            &:nth-of-type(8n)
                margin-right 0
            span
                position relative
                line-height 24px
                color $grey-900
                font-size 14px
                transition color .3s
                user-select none
                z-index 10
            &.p-picker-day-text-p,
            &.p-picker-day-text-f
                span
                    color $grey-400
        .p-picker-weeks-list-f, .p-picker-weeks-list-p
            pointer-events none

</style>