<template>
	<div class="p-select-input">
		<div
			:class="['p-select-input-content', triangle&&'p-select-input-content-active', disabled&&'p-select-search-box-disabled']"
			@mouseenter="setTipStatus"
			@mouseleave="setTipStatus"
		>
			<section class="p-select-input-section">
				<span
					v-show="fieldStatus"
					:class="['p-select-input-place', (!triangle&&data.length)&&'p-select-input-place-selected']"
					v-html="titleText"
				/>
				<input
					ref="inputField"
					class="p-select-input-input"
					type="text"
					v-model="inputValue"
					:disabled='disabled'
					@input="searchInput"
					@focus="inputFocus"
					@blur="inputBlur"
				/>
				<TriangleSvg :class="['p-select-input-svg', !triangle&&'p-select-input-rotate']" />
			</section>
		</div>
		<transition v-if="tipPlace" :name="'slide'+tipPlace">
			<div
				v-show="tipShow"
				:class="['p-select-input-tip', 'p-select-input-tip-'+tipPlace]"
				:style="selectedTipStyle"
			>
				<section
					ref="selectedTipItem"
					:class="['p-select-input-tip-item', (tipHeight>66)&&'p-select-input-tip-overflow']"
				>{{tipText}}</section>
			</div>
		</transition>
	</div>
</template>

<script>
    import TriangleSvg from '../../static/iconSvg/triangle.svg';

    export default {
        name: "SelectInput",
        components: { TriangleSvg },
        props: {
            value: {
                type: String,
                default: ''
            },
            // 选择内容后的title
            title: {
                type: String,
                default: ''
            },
            // 占位符
            placeholder: {
                type: String,
                default: '请选择'
            },
            // 单位
            unit: {
                type: String,
                default: '个'
            },
            // 选中的数据
            data: {
                type: Array,
                default: () => []
            },
            // 三角形方向
            triangle: {
                type: Boolean,
                default: false
            },
            // 是否可关闭弹窗
            activeClose: {
                type: Boolean,
                default: false
            },
            // 提示框位置
            tipPlace: {
                type: String,
                default: ''
			},
			disabled: {
				type: Boolean,
				default: false
			}
        },
        data() {
            return {
                tipWidth: 0, // 文字(宽度)是否超出
                tipHeight: 0, // 文字(高度)是否超出
                tipStyle: '0-0', // 文字(宽-高度)是否超出
                selectedTipStyle: { bottom: 0, left: 0 },
                tipShow: false, // 提示信息显示
                inputValue: '', // 输入框输入的值
                fieldStatus: true // 控制占位符是否显示
            }
        },
        computed: {
            // 占位符是否显示
            placeholderStatus() {
                return this.data.length === 0
            },
            // 设置按钮显示占位内容
            titleText() {
                const sd=this.data;
                if (sd && sd.length) {
                    const num=this.triangle?`<span style="padding-left:4px;padding-right:4px;">${sd.length}</span>`:`<span style="padding-left:4px;padding-right:4px;color: #0091ff;">${sd.length}</span>`;
                    return this.title+num+this.unit;
                } else {
                    return this.placeholder;
                }
            },
            // 提示框数据
            tipText() {
                const data=JSON.parse(JSON.stringify(this.data));
                const len=data.length-1;
                let text='';
                data.forEach((d, i) => {
                    if (i<len) {
                        text+=d.name+'、';
                    } else {
                        text+=d.name;
                    }
                });
                return text;
            }
        },
        watch: {
            // 监听value改变
            value(n, o) {
                if (n === o) return;
                this.inputValue=n;
            },
            tipStyle(n, o) {
                const [ws, hs]=n.split('-');
                const w=Number(ws);
                const h=Number(hs);
                switch (this.tipPlace) {
                    case 'top':
                        this.selectedTipStyle={
                            top: -((h>=66?108:(h+42)))+'px',
                            // top: -(h+(h>=66?20:42))+'px',
                            left: 0
                        };
                        break;
                    case 'bottom':
                        this.selectedTipStyle={
                            bottom: -((h>=66?108:(h+42)))+'px',
                            left: 0
                        };
                        break;
                    case 'left':
                        this.selectedTipStyle={
                            top: -((h >= 66)?36:(h/2+4))+'px',
                            left: -(w+50)+'px'
                        };
                        break;
                    case 'right':
                        this.selectedTipStyle={
                            top: -((h >= 66)?36:(h/2+4))+'px',
                            right: -(w+50)+'px'
                        };
                        break;
                    default:
                        this.selectedTipStyle={
                            bottom: '-36px',
                            left: 0
                        };
                        break;
                }
            },
            // 监听提示框可显示状态改变
            tipModal(n, o) {
                if (n === o) return;
                if (!n) this.tipShow=false;
            },
            // 监听文字输入
            inputValue(n, o) {
				if (n === o) return;
				this.fieldStatus = !n;
                this.$emit('changeValue', n);
            },
            // 监听弹窗是否关闭
            triangle(n, o) {
                if (n === o) return;
				if (n) this.tipShow=false;
				else this.inputValue = ''
            },
            // 监听是否可关闭弹窗
            activeClose(n, o) {
                if (n === o) return;
                if (n && this.triangle) this.$refs.inputField.focus();
            }
        },
        methods: {
            // 设置tip显示状态
            setTipStatus() {
                if (this.triangle) return;
                if (this.tipShow) {
                    this.tipShow=false;
                } else {
                    if (!this.tipPlace) return;
                    const sd=this.data;
                    if (sd && sd.length) {
                        this.tipShow=true;
                        this.$nextTick(() => {
                            const { scrollWidth, scrollHeight }=this.$refs.selectedTipItem;
                            this.tipHeight=scrollHeight;
                            this.tipStyle=scrollWidth+'-'+scrollHeight;
                        });
                    }
                }
            },
            // 输入框获取焦点-弹窗显示
            inputFocus() {
                if (this.triangle) return;
                this.$emit('changeTriangle', true);
            },
            // 输入框有值关闭占位符
            searchInput(e) {
                const v=e.data || e.target.value;
                this.fieldStatus = !v;
            },
            // 关闭选择框
            inputBlur() {
                setTimeout(() => {
                    if (!this.activeClose) return;
                    this.$emit('changeTriangle', false);
                }, 0);
            }
        }
    }
</script>

<style lang="stylus">
.p-select-input
	position: relative
	display: inline-block
	width: 100%
	.p-select-input-content
		display: flex
		align-items: center
		justify-content: space-between
		background-color: #fff
		border: 1px solid $grey-400
		border-radius: 4px
		width: 100%
		height: 32px
		font-size: 14px
		cursor: pointer
		transition: border 0.3s,box-shadow 0.3s
		&:hover
			border-color: $blue-500
		&:active
			border-color: $blue-600
		svg
			transition: transform 0.3s
		&.p-select-input-content-active
			border-color: $blue-500
			box-shadow: 0 0 0 2px rgba(0,145,255,0.2)
	.p-select-search-box-disabled
		background-color: $grey-200
		cursor: not-allowed
		.p-select-input-section
			font-size: 14px
			.p-select-input-input
				cursor not-allowed
		.p-select-input-svg
			display: none
		&:hover
			border-color: $grey-400
	.p-select-input-section
		position: relative
		width: 100%
		height: 100%
		overflow: hidden
		.p-select-input-place
			padding-left: 12px
			padding-right: 8px
			line-height: 30px
			color: $grey-400
			&.p-select-input-place-selected
				color: $grey-900
		.p-select-input-input
			position: absolute
			left: 0
			top: 0
			border: 0
			outline: none
			background: none
			padding-left: 12px
			padding-right: 24px
			width: 100%
			height: 100%
			font-size: 14px
			color: $grey-900
			cursor: pointer
			z-index: 11
		.p-select-input-svg
			position: absolute
			right: 8px
			top: 7px
			width: 16px
			z-index: 10
		.p-select-input-rotate
			transform: rotate(180deg)
	.p-select-input-tip
		position: absolute
		padding: 16px 20px
		background-color: #fff
		border-radius: 4px
		pointer-events: none
		max-width: 280px
		max-height: 104px
		z-index: 100
		&:after
			position: absolute
			display: inline-block
			border-style: solid
			border-width: 4px
			width: 0
			height: 0
			transform: rotate(-45deg)
			z-index: 0
			content: ''
		.p-select-input-tip-item
			position: relative
			overflow: hidden
			max-height: 66px
			line-height: 22px
			font-size: 14px
			word-wrap: break-word
			word-break: break-all
		.p-select-input-tip-overflow
			&:after
				position: absolute
				right: 0
				bottom: 0
				display: inline-block
				width: 20px
				height: 22px
				background-color: #fff
				content: '...'
	.p-select-input-tip-top
		box-shadow: $box-shadow-bottom
		&:after
			bottom: -4px
			left: 32px
			border-color: transparent transparent #fff #fff
			box-shadow: $box-shadow-min-top
			z-index: -1
	.p-select-input-tip-bottom
		box-shadow: $box-shadow-left
		&:after
			top: -4px
			left: 32px
			border-color: #fff #fff transparent transparent
			box-shadow: $box-shadow-min-bottom
	.p-select-input-tip-left
		box-shadow: $box-shadow-right
		&:after
			top: 49%
			right: -4px
			border-color: transparent #fff #fff transparent
			box-shadow: $box-shadow-min-right
	.p-select-input-tip-right
		box-shadow: $box-shadow-top
		&:after
			top: 49%
			left: -4px
			border-color: #fff transparent transparent #fff
			box-shadow: $box-shadow-min-left
@keyframes slidetop
	from
		opacity: 0
		transform: translateY(32px)
	to
		opacity: 1
		transform: translateY(0)
.slidetop-enter-active
	animation: slidetop 0.3s
.slidetop-leave-active
	animation: slidetop 0.3s reverse
@keyframes slidebottom
	from
		opacity: 0
		transform: translateY(-32px)
	to
		opacity: 1
		transform: translateY(0)
.slidebottom-enter-active
	animation: slidebottom 0.3s
.slidebottom-leave-active
	animation: slidebottom 0.3s reverse
@keyframes slideleft
	from
		opacity: 0
		transform: translateX(32px)
	to
		opacity: 1
		transform: translateX(0)
.slideleft-enter-active
	animation: slideleft 0.3s
.slideleft-leave-active
	animation: slideleft 0.3s reverse
@keyframes slideright
	from
		opacity: 0
		transform: translateX(-32px)
	to
		opacity: 1
		transform: translateX(0)
.slideright-enter-active
	animation: slideright 0.3s
.slideright-leave-active
	animation: slideright 0.3s reverse
</style>
