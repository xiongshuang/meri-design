<template>
	 <transition :name="position?'selectDownUpExtend':'selectDownUpExtendTop'">
		<div class="p-area-select-panel"
				v-show="transferShow"
				@mouseenter="boxEnter"
				@mouseleave="boxLeave"
				@wheel.stop
		>
			<TransferMini
					ref="transferMini"
					:data="data"
					:linkage="linkage"
					:lastStage="lastStage"
					:notNull="notNull"
					:height="height"
					:searchValue="searchValue"
					:width="width"
					:showChoseData="showChoseData"
					@changeValue="changeValue"
					@cancel="transferCancel"
					@confirm="transferConfirm"
			/>
		</div>
	</transition>
</template>
<script>
import TransferMini from './TransferMini'
export default {
	name: 'AreaSelect',
	components: {
		TransferMini,
	},
	data() {
		return {
			treeData: [],
		}
	},
	methods: {
		// 输入的值改变
		changeValue(v) {
			this.searchValue=v;
		},
		boxEnter() {
			this.$emit('modalStatus', false)
		},
		boxLeave() {
			this.$emit('modalStatus', true)
		},
		/**
		 * 穿梭框取消回调-关闭弹窗
		 */
		transferCancel() {
			this.$emit('cancelModal', false)
			this.transferShow=false;
		},
		/**
		 * 穿梭框确定函数
		 * @param ids 选中的id
		 * @param sd 选中的数据
		 */
		transferConfirm(ids, sd) {
			this.transferShow=false;
			this.$emit('confirm', {ids, sd});
		},
	}
}
</script>
<style lang='stylus' >
.p-area-select-panel
	position absolute
	border: 1px solid $grey-300
	z-index 1100
	min-width 180px
	max-width 600px
	outline none
</style>