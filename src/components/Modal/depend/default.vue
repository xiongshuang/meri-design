<template>
    <div
            class="p-modal-main p-modal-main-default"
            :style="{left: modalMainLeft+'px', top: modalMainTop+'px'}"
    >
        <div class="p-modal-title">
            <section class="p-title-text">{{title}}</section>
			<i class="p-modal-title-icon" @click="$emit('close')">
				<Close />
			</i>
        </div>
        <div
                :class="['p-modal-content', contentHeight>77&&'p-modal-content-max']"
                :style="{height: contentHeight>77?(contentHeight+'px'):'auto'}"
        >
            <div class="p-modal-content-main" ref="modalContentMain">
                <slot name="default" />
            </div>
        </div>
        <div :class="['p-modal-handle', handleShadow&&'p-modal-handle-shadow']">
            <slot name="handle" />
        </div>
    </div>
</template>

<script>
    import Close from '../../static/iconSvg/icon_close.svg';

    export default {
        name: 'Default',
        components: { Close },
        props: {
            title: {
                type: String,
                default: '',
                require: true
            }
        },
        data() {
            return {
                modalMainLeft: 0 // 内容距离左边位置
                ,modalMainTop: 120 // 内容距离顶部位置
                ,contentHeight: 77 // 内容是否达到最大高度
                ,handleShadow: false // 操作区按钮投影
            }
        },
        mounted() {
            this.countPos();
            window.addEventListener('resize', this.countPos);
        },
        methods: {
            // 动态计算弹窗
            countPos() {
                const bodyWidth=window.innerWidth;
                const bodyHeight=window.innerHeight;
                this.$nextTick(() => {
                    const mc=this.$refs.modalContentMain;
                    if (!mc) return;
                    const modalContentWidth=mc.clientWidth;
                    const modalContentHeight=mc.clientHeight;
                    this.modalMainLeft=(bodyWidth - modalContentWidth-64)/2;
                    const top=(bodyHeight-modalContentHeight-161)/2;
                    if (top>60 && top<120) this.modalMainTop=top;
                    else if (top<=60) this.modalMainTop=60;
                    else this.modalMainTop=120;

                    if (bodyHeight - modalContentHeight - 209 < 0) {
                        this.contentHeight=bodyHeight-249;
                        this.handleShadow=true;
                    } else {
                        this.contentHeight=77;
                        this.handleShadow=false;
                    }
                });
            }
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.countPos);
        }
    }
</script>

<style lang="stylus">
.p-modal-main-default
  border-radius 4px
  min-width 420px
  max-width 1260px
  min-height 206px

</style>
