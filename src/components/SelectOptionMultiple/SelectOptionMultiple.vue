<template>
    <section class="p-select-option" v-show="data&&data.length">
        <article
                :class="[
                'p-select-option-item',
                item.selected&&'p-select-option-item-selected-multiple',
                ]"
                v-for="item in selectData"
                :key="item.id"
                v-show="!item.isHide"
                @click="optionClick(item.id)"
                @mouseenter="optionEnter"
                v-html="item.name"
        />
    </section>
</template>

<script>
    export default {
        name: "SelectOptionMultiple",
        props: {
            /**
             * 下拉列表数据
             */
            data: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            selectData: {
                get() {
                    return this.data;
                },
                set(newData) {
                    return newData
                }
            }
        },
        methods: {
            // 移除某一个选中的
            removeOption(id) {
                this.selectData=this.selectData.map(d => {
                    if (d.id === id) d.selected=false;
                    return d;
                });
            },
            // 提交当前选择的值
            optionClick(id) {
                let selectedData={}, unselectData={};
                this.selectData=this.selectData.map(d => {
                    if (d.id === id) {
                        d.selected=!d.selected;
                        if (d.selected) selectedData=d;
                        else unselectData=d;
                    }
                    return d;
                });
                this.$emit('change', selectedData, unselectData);
            },
            // 子项鼠标移入
            optionEnter(e) {
                const target=e.target;
                const {clientWidth, scrollWidth, title}=target;
                if (!title && scrollWidth > clientWidth) target.title=target.innerText;
            }
        }
    }
</script>

<style lang="stylus">

@import "../static/stylus/select/selectOption.styl"

.p-select-option
    .p-select-option-item
        position relative
        &::after
            position absolute
            top 12px
            right 12px
            display block
            border-left 2px solid $blue-500
            border-bottom 2px solid $blue-500
            width 10px
            height 5px
            content ''
            transition transform .3s
            transform rotate(0) scale(0)
        &.p-select-option-item-selected-multiple
            &::after
                transform rotate(-45deg) scale(1)

</style>