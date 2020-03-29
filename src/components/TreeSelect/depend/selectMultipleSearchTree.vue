<template>
	<div
		class="p-select-search"
		ref="selectMultipleTree"
		:style="{width: width+'px'}"
	>
		<SelectInput
			:title="title"
			:unit="unit"
			:placeholder="placeholder"
			tipPlace="top"
			height="300"
			ref="selectInput"
			:triangle="dropDownShow"
			:data="choiceData"
			:activeClose="activeClose"
			v-model="inputValue"
			:disabled="disabled"
			@changeTriangle="changeTriangle"
			@changeValue="changeValue"
		/>
	</div>
</template>

<script>
	import SelectInput from './SelectInput';
	import TreeMultiplePanel from '../TreeMultiplePanel'
    import {FilterTool, PackageTool, TileTool, Unique, ChangeStatus} from '../../static/utils/TreeTool';

    export default {
        name: "selectMultipleSearchTree",
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
            // 联动
            linkage: {
                type: Boolean,
                default: true
			},
			/**
			 * 是否只能选择最后节点
			 */
			lastStage: {
				type: Boolean,
				default: false
			},
            /**
             * 是否返回半选状态的id
             */
            notNull: {
                type: Boolean,
                default: false
            },
            // 选中项的id
            selectedIds: {
                type: Array,
                default: []
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
			// 盒子高度
            height: {
                type: [String, Number],
                default: 240
            },
            // 传入的数据
            data: {
                type: Array,
                default: []
			},
			placeholder: {
				type: String,
				default: ''
			}
        },
        data() {
            return {
                pleaseSelect: 'Please select', // 请搜索占位符
                searchPlaceHolder: false, // 控制文字颜色
                fieldStatus: true, // 控制占位符是否显示
                boxFocus: false, // box-focus是否获取焦点
                inputValue: '', // 输入框输入的值
                inputWidth: 10, // 输入框的宽度
                // 下拉框是否显示
                dropDownShow: false,
                // 平铺的数据
                tileData: [],
                // 树形结构数据
                treeData: [],
                // 搜索的数据
                searchData: [],
                // 选中的数据
                choiceData: [],
                // 激活关闭
                closeDrop: false,
                // 搜索无内容
				notFound: false,
				// 新增popover类型的触发器所需要数据
				activeClose: true,
				confirmBtnType: 'disabled',
				targetVm: null
            }
        },
        computed: {
            calcWidth() {
				let _width
				_width = this.width > 600 ? 600 : (this.width < 180 ? 180 : this.width)
				return _width
			}
        },
        watch: {
            // 监听文字输入
            inputValue(n, o) {
                if (n === o) return;
                this.setInputWidth(n);
				this.targetVm.inputValue = n
				if(n === '') {
					this.notFound = false
					this.targetVm.notFound = false
				}
            },
            // 监听数据改变
            data(n, o) {
				if (n === o) return;
				if(n && n.length) {
					this.setData(n);
				}
            }
        },
        created() {
			if(this.data && this.data.length) {
				this.setData(this.data);
			}
		},
		mounted() {
			window.addEventListener('mousewheel', this.hidePanel, false)
		},
		beforeDestroy() {
			if(this.targetVm) TreeMultiplePanel.remove(this.targetVm)
			window.removeEventListener('mousewheel',  this.hidePanel)
		},
        methods: {
			hidePanel() {
				if(this.$refs.selectInput) {
					this.$refs.selectInput.$refs.inputField.blur()
				}
				this.dropDownShow = false
				if(this.targetVm) {
					this.targetVm.dropDownShow = false
				}
			},
			// 点击改变 三角形方向/弹窗显示状态
            changeTriangle(status) {
				let _this = this
				if(this.targetVm) {
					this.targetVm.dropDownShow = status
					this.targetVm.notFound = false
					if(status) {
						TreeMultiplePanel.renderPosition(this.targetVm)
					}
					if(!status) {
						this.targetVm.cancelTreeData()
					}
				} else {
					this.targetVm = TreeMultiplePanel({
						tag: this.$refs.selectMultipleTree,
						params: {
							dropDownShow: this.dropDownShow,
							notFound: false,
							inputValue: this.inputValue,
							selectedIds: this.selectedIds,
							lastStage:this.lastStage,
							searchData: this.searchData,
							linkage: this.linkage,
							notNull: this.notNull,
							treeData: this.treeData,
							choiceData: this.choiceData,
							tileData: this.tileData,
							height: this.height,
							width: this.calcWidth,
						}
					}).$on('close', (flag) => {
						_this.activeClose = flag
					}).$on('change', (data) => {
						this.dropDownShow = false
						_this.choiceData = data
						let choseId = data.map(item => item.id)
						_this.$emit('change', choseId)
					}).$on('cancel', (flag) => {
						this.dropDownShow = false
					})
					this.targetVm.$nextTick(() => {
						_this.targetVm.dropDownShow = status
					})
				}
				this.dropDownShow=status;
				this.activeClose= status;
			},
            // 输入的值改变
            changeValue(v) {
				this.inputValue = v
            },
            // 初始化数据
            setData(data) {
				if(this.selectedIds.length) {
					const d=JSON.parse(JSON.stringify(data));
					const tileData=TileTool([], d, '-1');
					let findParent = (parentId) => {
						let parent = tileData.find(item => item.id === parentId)
						if(parent) {
							parent.checked = 'notNull'
							findParent(parent.parentId)
						} else {
							return false
						}
					}
					tileData.forEach(item => {
						let _index = this.selectedIds.findIndex(id => id === item.id)
						if(_index !== -1) {
							if(this.linkage) {
								findParent(item.parentId)
							}
							item.checked = 'checked'
							this.choiceData.push({
								id: item.id,
								name: item.name
							})
						}
					})
					this.tileData=tileData;
					this.treeData=PackageTool(tileData);
					this.notFound=this.treeData.length===0;
				} else {
					const d=JSON.parse(JSON.stringify(data));
					const tileData=TileTool([], d, '-1');
					this.tileData=tileData;
					this.treeData=PackageTool(tileData);
					this.notFound=this.treeData.length===0;
				}
            },
            /**
             * 筛选搜索的收据
             * @param v 搜索框输入的值
             * @param dom dom对象
             */
            setInputWidth(v) {
                if (v) {
                    this.fieldStatus=false;
                    this.filterSelect(v);
                } else {
                    this.fieldStatus=true;
                }
            },
            /**
             * 筛选搜索的收据
             * @param v 搜索框输入的值
             */
            filterSelect(v) {
				let tileData=JSON.parse(JSON.stringify(this.tileData)); // 平铺树形结构
				// if(this.lastStage) {
				// 	tileData = tileData.filter(item => item.lastNode && item.isleaf)
				// }
                const re=new RegExp(v, 'g');
                // 筛选出包涵有搜索字符的数据
                const fData=tileData.filter(d => {
					if(d.isleaf) {
						if (d.name.includes(v)) {
							d.name=d.name.replace(re, `<span style="color: #0091ff;font-size: 14px;">${v}</span>`);
							return d;
						}
					}
                });
                // 得到筛选后的数据 一维数据列表
                const tData=FilterTool(tileData, fData);
                this.searchData=tData;
				this.notFound=tData.length===0;
				this.targetVm.notFound = this.notFound
				this.targetVm.searchData = tData
            },            
        }
    }
</script>

<style lang="stylus"></style>