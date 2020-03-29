<template>
	<div class="image-upload">
		<h1>ImageUploadView组件</h1>
		<div class="component component-padding">
			<h2>图片上传组件</h2>
			<div class="upload">
				<section class="list">
					<ImageUpload
						@change="changeFile"
						hosts="http://47.95.122.141:8209/domita/backend"
						action="/base/attachment/uploadX"
						:defaultFileList='defaultFileList'
						:previewMode='false'
						:multiple='true'
					/>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
		name: "ImageUploadView",
		data() {
			return {
				defaultFileList: [
					{
						id: "/base/attachment/upload/id/66",
						status: 'done',
						name: "defaultImage.png",
						suffix: "image/png",
						size: 189554,
						url: "/base/attachment/upload/id/66",
					}
				]
			}
		},
		methods: {
			changeFile(data) {
				console.log(data)
			}
		}
    }
</script>

<style lang="stylus" scoped>
.image-upload
	.upload
		display flex
		margin-top 20px
		.list
			width 500px
</style>
