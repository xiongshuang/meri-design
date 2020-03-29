<template>
  <div class="p-modal-main p-modal-main-full">
    <div class="p-modal-title">
      <div class="p-title-text">{{title}}</div>
      <div class="p-left-slot">
        <slot name="handle"/>
      </div>
      <i class="p-modal-title-icon">
        <Close @click="$emit('close')" />
      </i>
    </div>
    <div class="p-modal-content">
      <div class="p-modal-content-main" ref="modalContentMain">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script>
    import Close from '../../static/iconSvg/icon_close.svg';

    export default {
        name: 'Full',
        components: { Close },
        props: {
            title: {
                type: String,
                default: '',
                require: true
            }
        }
    }
</script>

<style lang="stylus">
  .p-modal-main-full
    .p-left-slot
      position absolute
      right 68px
      top 0
      display flex
      align-items center
      height 100%
    .p-modal-content
      height calc(100% - 57px)
      overflow-x hidden
      overflow-y auto

</style>
