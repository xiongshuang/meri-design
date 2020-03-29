<template>
	<section tabindex="-1" ref="popover" @blur="hidePopover" :class="['p-popover']">
		<div
			class="p-popover-tag"
			@mouseenter="showPopover"
			@mouseleave="leavePopover"
			@click="clickShowPopover"
		>
			<slot></slot>
		</div>
	</section>
</template>

<script>
import Button from '../Button'
import PopoverExtend from './modalPopover'
export default {
	name: 'Popover',
	components: {
		Button
	},
	props: {
		/**
		 * 类型可选【base confirm】
		 */
		type: {
			type: String,
			default: 'base'
		},
		/**
		 * popover框title文字
		 */
		titleText: {
			type: String,
			default: ''
		},
		/**
		 * 确认按钮提示文字
		 */
		confirmText: {
			type: String,
			default: '确认'
		},
		/**
		 * 取消按钮提示文字
		 */
		cancelText: {
			type: String,
			default: '取消'
		},
		/**
		 * popover框的对齐位置
		 * 默认居中
		 * 可选【top-center，top-left，top-right，bottom-left，bottom-center，bottom-right】
		 */
		placement: {
			type: String,
			default: 'top-center'
		}
	},
	data() {
		return {
			popoverStatus: false,			// popover显示状态
			targetVm: null,
			timer: null,
		}
	},
	mounted() {
		window.addEventListener('mousewheel', this.hidePopover, false)
	},
	beforeDestroy() {
		if(this.targetVm) PopoverExtend.remove(this.targetVm)
		window.removeEventListener('mousewheel', this.hidePopover)
	},
	watch: {
		popoverStatus(newVal, oldVal) {
			if (newVal) {
				if(this.targetVm) {
					this.targetVm.selfVm = PopoverExtend
					this.targetVm.popoverStatus = true
				} else {
					this.targetVm = PopoverExtend({
						tag: this.$refs.popover,
						params: {
							triggerDom: this.$refs.popover,
							type: this.type,
							titleText: this.titleText,
							confirmText: this.confirmText,
							cancelText: this.cancelText,
							placement: this.placement,
							slot: this.$slots,
							closePanel: false
						}
					}).$on('cancelEvent', (data) => {
						this.$emit('cancelEvent',data)
						this.popoverStatus = false
					}).$on('confirmEvent', (data) => {
						this.$emit('confirmEvent',data)
						this.popoverStatus = false
					}).$on('popoverLeave', (data) => {
						this.timer = setTimeout(() => {
							this.hidePopover()
						}, 1000)
					}).$on('test', (data) => {
						clearTimeout(this.timer)
					})
					this.targetVm.$nextTick(() => {
						this.targetVm.selfVm = PopoverExtend
						this.targetVm.popoverStatus = true
					})
				}
			} else {
				if(this.targetVm) {
					this.targetVm.popoverStatus = false
				}
			}
		}
	},
	methods: {
		hidePopover() {
			this.popoverStatus = false
		},
		// 点击显示popover
		clickShowPopover() {
			if(this.type === 'base') return false
			this.popoverStatus = true
		},
		// 触发器hover显示popover
		showPopover() {
			if(this.type === 'confirm') return false
			this.$refs['popover'].focus()
			if(this.popoverStatus) {
				clearTimeout(this.timer)
			} else {
				this.popoverStatus = true
			} 
		},
		// 离开触发器
		leavePopover() {
			if(this.type === 'confirm') return false
			this.timer = setTimeout(() => {
				this.hidePopover()
			}, 200)
		},
	}
}
</script>

<style lang="stylus">
.p-popover
	display: inline-block
	outline: none
	border-top: 12px solid transparent
</style>
