<template>
    <div :class="['p-checkbox', disabled&&'p-checkbox-disabled',]">
        <i :class="['p-checkbox-box', 'p-checkbox-'+checked]" @click="handleChange" />
        <span class="p-checkbox-text" v-if="Object.keys($slots).length"><slot /></span>
    </div>
</template>

<script>
    export default {
        name: "Checkbox",
        props: {
            /**
             * checked-选中
             * uncheck-未选中
             * notNull-半选
             */
            checked: {
                type: String,
                default: 'uncheck'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handleChange(e) {
                if (this.disabled) return;
                const dataset=e.target.parentNode.dataset;
                if (this.checked === 'checked') this.$emit('change', 'uncheck', dataset);
                else this.$emit('change', 'checked', dataset);
            }
        }
    }
</script>

<style lang="stylus">
.p-checkbox
    display inline-block
    height 16px
    cursor pointer
    &+.p-checkbox
        margin-left 8px
    .p-checkbox-box
        position relative
        display inline-block
        vertical-align middle
        margin-right 4px
        border-width 1px
        border-style solid
        border-color transparent
        border-radius 2px
        width 16px
        height @width
        transition all .3s
        &:hover
            box-shadow 0 0 4px 0 rgba(78,131,253,.4)
        &::after
            position absolute
            background none
            transition transform .2s ease-in-out
            transform rotate(0) scale(0)
            z-index 1
            content ''
    .p-checkbox-uncheck
        background-color #fff
        border-color $grey-400
        &:hover
            border-color $blue-500
    .p-checkbox-checked
       background-color $blue-500
       border-color $blue-500
       &::after
           top 2px
           left 5px
           border-right 2px solid #fff
           border-bottom 2px solid #fff
           width 4px
           height 8px
           transform rotate(45deg) scale(1)
    .p-checkbox-notNull
       background-color $blue-500
       border-color $blue-500
       &::after
           top 6px
           left 3px
           background-color #fff
           width 8px
           height 2px
           transform scale(1)
    .p-checkbox-text
        vertical-align middle
        color $grey-900
        font-size 14px
        user-select none
.p-checkbox-disabled
    cursor not-allowed
    > i
        pointer-events none
    .p-checkbox-uncheck
        background-color $grey-300
    .p-checkbox-checked
        background-color $grey-400
        border-color $grey-400
    .p-checkbox-notNull
        background-color $grey-400
        border-color $grey-400

</style>