<template>
    <section class="p-select-option" v-show="data&&data.length">
        <article
                :class="['p-select-option-item', selectedId===item.id&&'p-select-option-item-selected']"
                v-for="item in data"
                :key="item.id"
                @click="optionClick(item.id)"
                @mouseenter="optionEnter"
                v-html="item.name"
        />
    </section>
</template>

<script>
    export default {
        name: "SelectOption",
        props: {
            /**
             * 绑定的v-model值
             */
            selectedId: {
                type: String,
                default: ''
            },
            /**
             * 下拉列表数据
             */
            data: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            // 提交当前选择的值
            optionClick(id) {
                this.$emit('click', id);
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
        &.p-select-option-item-selected
            color $blue-500
            background-color $blue-100

</style>