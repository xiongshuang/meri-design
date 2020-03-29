<template>
	<div ref="TransferSelectTree" :style="{width: width+'px'}" class="p-transfer-select">
		<SelectInput
			:title="title"
			:unit="unit"
			:placeholder="placeholder"
			:triangle="transferShow"
			:data="selectedData"
			:tipPlace="tipPlace"
			:activeClose="activeClose"
			:disabled='disabled'
			v-model="searchValue"
			@changeValue="changeValue"
			@changeTriangle="changeTriangle"
		/>
	</div>
</template>

<script>
    import SelectInput from './SelectInput';
	import AreaSelect from '../AreaSelect';
	import {PackageTool, TileTool} from '../../static/utils/TreeTool';
    export default {
        name: "TransferSelectTree",
        components: { SelectInput },
        props: {
            // 选择内容后的title
            title: {
                type: String,
                default: ''
            },
            // 单位
            unit: {
                type: String,
                default: ''
            },
            // 占位符
            placeholder: {
                type: String,
                default: '请选择'
            },
            // 提示框位置
            tipPlace: {
                type: String,
                default: 'bottom'
            },
            /*穿梭框数据*/
            data: {
                type: Array,
                default: () => []
            },
            // 上下级联动
            linkage: {
                type: Boolean,
                default: true
            },
            // 只能选择末级
            lastStage: {
                type: Boolean,
                default: false
			},
			// 盒子宽度
            width: {
                type: [String, Number],
                default: 240
			},
            /**
             * 是否返回半选状态的id
             */
            notNull: {
                type: Boolean,
                default: false
            },
            // 高度
            height: {
                type: [String, Number],
                default: 360
			},
			disabled: {
				type: Boolean,
				default: false
			},
			selectedIds: {
				type: Array,
				default: []
			}
        },
        data() {
            return {
                searchValue: '', // 输入的值
                transferShow: false, // 穿梭框显示
                tipModal: true, // 选择框是否可显示提示
                selectedData: [], // 选中的数据
				activeClose: false, // 是否可关闭弹窗
				targetVm: null,
				treeData: [],
            }
		},
		watch: {
			// 监听数据改变
            data(n, o) {
				if (n === o) return;
				if(n && n.length) {
					this.setData(n);
				}
			},
		},
		created() {
			if(this.data && this.data.length) {
				this.setData(this.data);
			}
		},
		beforeDestroy() {
			if(this.targetVm) AreaSelect.remove(this.targetVm)
			window.removeEventListener('mousewheel', this.hidePanel)
		},
		mounted() {
			window.addEventListener('mousewheel', this.hidePanel, false)
		},
		computed: {
			calcWidth() {
				let _width
				_width = this.width > 600 ? 600 : (this.width < 180 ? 180 : this.width)
				return _width
			}
		},
        methods: {
			setData(data) {
				if(this.selectedIds.length) {
					const d=JSON.parse(JSON.stringify(data));
					let findParent = (parentId) => {
						let parent = tileData.find(item => item.id === parentId)
						if(parent) {
							parent.checked = 'notNull'
							findParent(parent.parentId)
						} else {
							return false
						}
					}
					const tileData=TileTool([], d, '-1');
					tileData.forEach(item => {
						let _index = this.selectedIds.findIndex(id => id === item.id)
						if(_index !== -1) {
							if(this.linkage) {
								findParent(item.parentId)
							}
							item.checked = 'checked'
							this.selectedData.push({
								id: item.id,
								name: item.name
							})
						}
					})
					this.treeData=PackageTool(tileData);
				} else {
					const d=JSON.parse(JSON.stringify(data));
					const tileData=TileTool([], d, '-1');
					this.treeData=PackageTool(tileData);
				}
			},
			hidePanel() {
				if(this.targetVm) {
					this.targetVm.transferShow = false
				}
				this.transferShow = false
				if(this.$refs.selectInput) {
					this.$refs.selectInput.$refs.inputField.blur()
				}
			},
            // 点击改变 三角形方向/弹窗显示状态
            changeTriangle(status) {
				let _this = this
				if(this.targetVm) {
					if(status) {
						AreaSelect.renderPosition(this.targetVm)
					}
					this.targetVm.data = this.treeData
					this.targetVm.showChoseData = JSON.parse(JSON.stringify(this.selectedData))
					this.targetVm.transferShow = status
				} else {
					this.targetVm = AreaSelect({
						tag: this.$refs.TransferSelectTree,
						params: {
							transferShow: this.transferShow,
							data: this.treeData,
							linkage: this.linkage,
							lastStage: this.lastStage,
							notNull: this.notNull,
							height: this.height,
							width: this.calcWidth,
							searchValue: this.searchValue,
							showChoseData: JSON.parse(JSON.stringify(this.selectedData))
						}
					}).$on('confirm', (data) => {
						_this.transferShow = false
						const {ids, sd} = data
						_this.selectedData=sd;
						_this.$emit('confirm', ids)
					}).$on('modalStatus', (flag) => {
						_this.activeClose = flag
					}).$on('cancelModal', (flag) => {
						this.$emit('cancelModal')
						_this.transferShow = flag
					})
					this.targetVm.$nextTick(() => {
						this.targetVm.transferShow = status
					})
				}
				this.transferShow = status
				this.activeClose = status
				if(!status) _this.targetVm.$refs.transferMini.handleCancel();
			},
			changeValue(v) {
				this.targetVm.searchValue = v
				this.searchValue=v;
			},
            
        }
    }
</script>

<style lang="stylus">
.p-transfer-select
	position: relative
	display: inline-block
	outline: none
	width: 100%
</style>
