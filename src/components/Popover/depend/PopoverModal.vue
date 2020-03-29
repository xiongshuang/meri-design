<template>
	<transition :name="position === 'bottom' ? 'selectDownUpExtend' : 'selectDownUpExtendTop'">
		<div
			:class="['p-popover-wrap', `p-popover-wrap-${type}`, `p-popover-wrap-${placement}`]"
			ref="popoverWrap"
			@mouseleave="popoverLeave"
			@mouseenter="popoverEnter"
			v-show="popoverStatus"
			@wheel.stop
		>
			<div class="p-popover-content">
				<div v-if="titleText !== ''" class="p-popover-title">{{titleText}}</div>
				<div :class="['p-popover-arrow', `p-popover-arrow-${placement}`]"></div>
				<slot name="content" />
			</div>
			<div class="p-popover-button" v-if="type === 'confirm'">
				<Button type="default" @click.native="cancelEvent" size="small">{{cancelText}}</Button>
				<Button type="primary" @click.native="confirmEvent" size="small">{{confirmText}}</Button>
			</div>
		</div>
	</transition>
</template>
<script>
export default {
	name: 'PopoverModal',
	data() {
		return {
			popoverStatus: false
		}
	},
	watch: {
		popoverStatus(n, o) {
			if(n) {
				this.$nextTick(() => {
					this.selfVm.renderPosition(this)
				})
			}
		}
	},
	computed: {
		position() {
			return this.placement.split('-')[0]
		}
	},
	mounted() {
		this.$slots = this.$data.slot
	},
	methods: {
		popoverEnter() {
			if(this.type === 'base') {
				if(this.popoverStatus) {
					this.$emit('test', true)
				}
			}
		},
		popoverLeave(event) {
			if(this.type === 'base') {
				this.$emit('popoverLeave', true)
			}
		},
		// 取消按钮点击
		cancelEvent(e) {
			this.$emit('cancelEvent',e)
		},
		// 确定按钮点击
		confirmEvent(e) {
			this.$emit('confirmEvent',e)
		},
	}
}
</script>
<style lang="stylus">
$bottomShadow = 3px 3px 7px rgba(31,35,41,0.1)
$bottomBorder = transparent $white $white transparent
.p-popover-wrap
	position: absolute
	width: auto
	background: $white
	box-shadow: $box-shadow-bottom
	border: 1px solid $grey-300
	border-radius: 4px
	transition-property: top,bottom,opacity
	transition-duration: 0.3s
	z-index: 1000
	&::after
		content: ''
		position: absolute
		bottom: -15px
		left: 0
		display: inline-block
		width: 100%
		height: 14px
		z-index: -1
	&::before
		content: ''
		position: absolute
		top: -15px
		left: 0
		display: inline-block
		width: 100%
		height: 14px
		z-index: -1
	.p-popover-content
		width: auto
		min-width: 246px
		max-width: 370px
		max-height: 394px
		overflow-y: auto
		color: $grey-600
		line-height: 22px
		.p-popover-title
			display: inline-block
			margin-bottom: 4px
			font-size: 14px
			font-weight: 600
			color: $grey-900
			line-height: 22px
		.p-popover-arrow
			position: absolute
			width: 8px
			height: @width
			box-shadow: -2px -2px 5px rgba(31,35,41,0.1)
			border-color: $white transparent transparent $white
			border-width: 4px
			background: $white
			transform: rotate(45deg)
		.p-popover-arrow-bottom-center
			left: 50%
			top: -4px
		.p-popover-arrow-bottom-left
			left: 13%
			top: -4px
		.p-popover-arrow-bottom-right
			right: 13%
			top: -4px
		.p-popover-arrow-top-center
			left: 50%
			bottom: -4px
			box-shadow: $bottomShadow
			border-color: $bottomBorder
		.p-popover-arrow-top-left
			left: 13%
			bottom: -4px
			box-shadow: $bottomShadow
			border-color: $bottomBorder
		.p-popover-arrow-top-right
			right: 13%
			bottom: -4px
			box-shadow: $bottomShadow
			border-color: $bottomBorder
	.p-popover-button
		display: flex
		justify-content: flex-end
		margin-top: 16px
.p-popover-wrap-base
	padding: 12px 16px
.p-popover-wrap-confirm
	padding: 20px 24px
</style>