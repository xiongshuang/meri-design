 <template>
    <transition name="fadeDownUpUi">
        <div  class="p-tooltip-box">
        </div>
    </transition>
</template>
<script>
export default {
    data () {
        return {
        }
    }
}
</script>
<style lang="stylus">
    @import "../static/stylus/animate/fadeDownUpUi.styl"
    .p-tooltip-box
        position:fixed
        padding:8px 12px
        white-space:nowrap
        border:1px solid $grey-300
        border-radius: 4px
        box-shadow:0 2px 10px 0 rgba(31, 35, 41, .1)
        background-color:white
        color:$grey-900
        font-size:12px
        pointer-events: none

</style>
