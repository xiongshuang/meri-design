<template>
	<div class="p-select-search-component">
		<template v-if="choseArea">
			<TransferSelectTree 
				:title="title"
				:unit="unit"
				:placeholder="placeholder"
				:tipPlace="tipPlace"
				:disabled="disabled"
				:lastStage='lastStage'
				:linkage='linkage'
				:notNull='notNull'
				:height="calcHeight"
				:selectedIds="selectedIds"
				:width="width"
				:data="treeData"
				@change="optionClickSelectArea"
			/>
		</template>
		<template v-else>
			<SelectMultipleSearchTree
				v-if="multiple"
				:title="title"
				:unit="unit"
				:placeholder="placeholder"
				:tipPlace="tipPlace"
				:linkage="linkage"
				:selectedIds="selectedIds"
				:disabled="disabled"
				:notNull="notNull"
				:lastStage='lastStage'
				:width="width"
				:height="calcHeight"
				:data="treeData"
				@change="optionClickMultiple"
			/>
			<SelectSingleSearchTree
				v-else
				:selectedId="value"
				:placeholder="placeholder"
				:disabled="disabled"
				:width="width"
				:height="calcHeight"
				:data="treeData"
				:lastStage="lastStage"
				@change="optionClickSingle"
			/>
		</template>
	</div>
</template>

<script>
    import SelectMultipleSearchTree from './depend/selectMultipleSearchTree';
    import SelectSingleSearchTree from './depend/selectSingleSearchTree';
	import TransferSelectTree from './depend/TransferSelectTree';
	import { initTreeData } from '../static/utils/TreeTool';
    export default {
        name: "TreeSelect",
        components: { SelectMultipleSearchTree, SelectSingleSearchTree, TransferSelectTree },
        props: {
			// 选择内容后的title
            title: {
                type: String,
                default: '已选项'
            },
            // 单位
            unit: {
                type: String,
                default: '个'
            },
            // 占位符
            placeholder: {
                type: String,
                default: '请选择'
            },
            // 提示框位置
            tipPlace: {
                type: String,
                default: 'top'
            },
            // 是否禁用
            disabled: {
                type: Boolean,
                default: false
            },
            // 盒子宽度
            width: {
                type: [String, Number],
                default: 240
            },
			// 高度
			height: {
				type: [String, Number],
				default: 360
			},
			// 传入的数据
			data: {
				type: Array,
				default: []
			},
			/* 单选模式相关数据 -s*/
			// v-model绑定的值
			value: {
				type: String,
				default: ''
			},
            /**
			 * 是否开启多选
			 */
            multiple: {
                type: Boolean,
                default: false
            },
            // 联动
            linkage: {
                type: Boolean,
                default: true
            },
            /**
             * 是否返回半选状态的id
             */
            notNull: {
                type: Boolean,
                default: false
            },
            // 选中的id组
            selectedIds: {
                type: Array,
                default: () => []
			},
			// 是否带选择区域
			choseArea: {
				type: Boolean,
				default: false
			},
			// 只可选最后一级
			lastStage: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				treeData: []
			}
		},
		computed: {
			calcHeight() {
				return Number(this.height) < 360 ? 360 : this.height
			},
		},
		watch: {
			data: {
				handler(n, o) {
					this.treeData = initTreeData(n)
				},
				deep: true,
				immediate: true
			}
		},
        methods: {
            // 提交当前选择的值-多选
            optionClickMultiple(ids) {
                this.$emit('change', ids);
            },
            // 提交当前选择的值-单选
            optionClickSingle(id) {
				this.$emit('input', id);
			},
			// 带选择区域的树选择回调事件
			optionClickSelectArea(data) {
                this.$emit('change', data);
			}
        }
    }
</script>

<style lang="stylus">
@import '../static/stylus/animate/selectDownUpExtend.styl'
.p-select-search-component
	display: inline
.p-select-search
	position: relative
	display: inline-block
	.p-select-search-box
		padding-left: 12px
		padding-right: @padding-left
		background-color: #fff
		border: 1px solid $grey-400
		border-radius: 4px
		width: 100%
		min-height: 32px
		overflow: hidden
		cursor: pointer
		transition: all 0.3s
		&:hover
			border-color: $blue-500
		&.p-select-search-box-focus
			border-color: $blue-500
			box-shadow: $box-shadow-blue
		&.p-select-search-box-disabled
			background-color: $grey-200
			cursor: not-allowed
			.p-select-choice-name
				color: $grey-400 !important
			.p-select-search-field-text
				font-size: 14px
			.p-select-search-triangle
				display: none
			&:hover
				border-color: $grey-400
		.p-select-search-field-text
			position: absolute
			left: 0
			top: 0
			padding-left: 12px
			width: calc(100% - 15px)
			height: 32px
			line-height: @height
			color: $grey-400
			font-size: 14px
			z-index: 1
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			&.p-select-choice-name
				color: $grey-900
		.p-select-search-field
			&.p-select-search-field-accept
				max-width: 93%
				max-height: 96px
				overflow-y: auto
			.p-select-field-item
				position: relative
				display: inline-block
				vertical-align: top
				z-index: 2
				.p-select-choice
					display: inline-block
					margin-top: 3px
					margin-right: 4px
					padding-left: 8px
					padding-right: 28px
					background-color: $grey-200
					border-radius: 2px
					max-width: 120px
					height: 24px
					line-height: @height
					font-size: 14px
					color: $grey-900
					white-space: nowrap
					text-overflow: ellipsis
					overflow: hidden
					&.p-select-choice-more
						padding-right: 8px
				.p-select-choice-name
					padding-left: 0
					padding-right: 0
					background: none
				.p-select-choice-clear
					position: absolute
					top: 8px
					right: 12px
					z-index: 5
					cursor: pointer
					svg
						&:hover
							path
								transition: fill 0.3s
								fill: $blue-500
				.p-select-search-input
					outline: none
					border: 0
					background: none
					width: 0.75em
					max-width: 100%
					height: 30px
					line-height: @height
					font-size: 14px
		.p-select-search-triangle
			position: absolute
			top: 8px
			right: 8px
			width 16px
			svg
				transition: transform 0.3s
			.p-select-search-triangle-rotate
				transform: rotate(180deg)

</style>