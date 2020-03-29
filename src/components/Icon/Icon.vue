<template>
	<div class="p-icon">
		<component :is="handleName" :style="{width: height+'px', height: height+'px'}" />
	</div>
</template>

<script>
	import iconSvg from './iconHandler'
    export default {
		name: 'Icon',
		components: {
			...iconSvg
		},
        props: {
            /**
             * icon名称
             */
            name: {
				type: String,
				default: '',
				require: true
			},
			// 颜色
			color: {
            	type: String,
				default: ''
			},
			width: {
            	type: [String, Number],
				default: '16'
			},
			height: {
            	type: [String, Number],
				default: '16'
			}
		},
		computed: {
			/**
			 * 处理icon组件名字
			 */
			handleName() {
				let _string = this.name;
				return 'Icon' + _string
			}
		},
		watch: {
			color(n, o) {
				if (n === o) return;
				this.changeColor();
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.changeColor();
			})
		},
		methods: {
			// 修改颜色
			changeColor() {
				if (this.name.includes('_')) return;
				const path=this.$el.querySelectorAll('path');
				path.forEach(d => {
					d.style.fill=this.color;
				})
			}
		}
	}
</script>

<style lang="stylus">
.p-icon
	display: inline-block
	width: 24px
	height: @width
	line-height: @width
	overflow: hidden
	text-align: center
	cursor: pointer
	font-size: 0

</style>
