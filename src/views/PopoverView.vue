<template>
	<div class="Popover">
		<h3>hover显示</h3>
		<div class="popover-box">
			<Popover titleText="我是标题" type="base" placement="top-right">
				<template slot="content">
					<article>
						我是第一行内容<br>
						我是第二行内容<br>
						我是第三行内容<br>
						我是第四行内容<br>
					</article>
				</template>
				<Input />
			</Popover>
		</div>
		<h3>click点击显示</h3>
		<div class="popover-click">
			<div class="popover-top">
				<Popover  type="confirm" placement="top-left" @cancelEvent="cancel" @confirmEvent="confirm">
					<template slot="content">
						<p>测试点击显示popover 11111111111111111111111111111111</p>
					</template>
					<Button type="primary" size="large">top-left</Button>
				</Popover>
				<Popover  type="confirm" placement="top-center">
					<template slot="content">
						<p>测试点击显示popover</p>
					</template>
					<Button type="primary" size="large">top-center</Button>
				</Popover>
				<Popover  type="confirm" placement="top-right">
					<template slot="content">
						<p>测试点击显示popover</p>
					</template>
					<Button type="primary" size="large">top-right</Button>
				</Popover>
			</div>
			<div class="popover-bottom">
				<Popover  type="confirm" placement="bottom-left">
					<template slot="content">
						<p>测试点击显示popover</p>
					</template>
					<Button type="primary" size="large">bottom-left</Button>
				</Popover>
				<Popover  type="confirm" placement="bottom-center">
					<template slot="content">
						<p>测试点击显示popover</p>
					</template>
					<Button type="primary" size="large">bottom-center</Button>
				</Popover>
				<Popover  type="confirm" placement="bottom-right">
					<template slot="content">
						<p>测试点击显示popover</p>
					</template>
					<Button type="primary" size="large">bottom-right</Button>
				</Popover>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
		name: "PopoverView",
		methods: {
			confirm(e) {
				console.log(e)
			},
			cancel(e) {
				console.log(e)
			},
		}
    }
</script>

<style lang="stylus" scoped>
.Popover
	width: 100%
	padding 50px
	.popover-box
		margin 50px
		display flex
		align-items center
	.popover-click
		width 40%
		padding 50px
		>div
			display flex
			justify-content space-between
			margin-bottom 50px
</style>
