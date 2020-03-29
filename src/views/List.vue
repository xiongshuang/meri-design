<template>
    <div class="s-list">
        <router-link v-for="(item, index) in data" :key="index" :to="item.url?item.url:''" class="s-list-item">
            <article class="s-item-left">{{item.title}}</article>
            <article class="s-item-right"><span>{{item.more}}</span><i>›</i></article>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "List",
        props: {
            data: {
                type: Array,
                default: () => [],
                require: true
            }
        }
    }
</script>

<style lang="stylus">

    .s-list
        width 100%

    .s-list-item
        display flex
        justify-content space-between
        align-items center
        border-bottom 1px solid $grey-300
        &:last-child
            border-bottom 0
        article
            padding 10px
        .s-item-left
            font-size 18px
            color $grey-900
        .s-item-right
            padding-top 2px
            color $grey-600
            span
                font-size 14px
            i
                padding-left 4px
                font-style normal
                font-size 20px

</style>
