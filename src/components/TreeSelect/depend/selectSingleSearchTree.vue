<template>
	<div ref="SelectSingleTree" class="p-select-search" :style="{width: width+'px'}">
		<div
			:class="['p-select-search-box', boxFocus&&'p-select-search-box-focus', disabled&&'p-select-search-box-disabled']"
			@click="searchBoxClick"
			@mouseenter="enterTrigger"
			@mouseleave="leaveTrigger"
		>
			<section
				v-show="fieldStatus"
				:class="[
                     'p-select-search-field-text',
                     choicedName&& !boxFocus && 'p-select-choice-name'
                    ]"
				:title="choicedName"
			>{{choicedName || placeholder}}</section>
			<section class="p-select-search-field">
				<article class="p-select-field-item">
					<input
						type="text"
						class="p-select-search-input"
						:disabled="disabled"
						v-model="inputValue"
						@input="searchInput"
						@blur="inputBlur"
						ref="inputField"
						:style="{width: inputWidth+'px'}"
					/>
				</article>
			</section>
			<span class="p-select-search-triangle">
				<TriangleSvg :class="[!dropDownShow&&'p-select-search-triangle-rotate']" />
			</span>
		</div>
	</div>
</template>

<script>
    import TriangleSvg from '../../static/iconSvg/triangle.svg';
	import TreeSinglePanel from '../TreeSinglePanel';

    import {FilterTool, PackageTool, TileTool} from '../../static/utils/TreeTool';
    export default {
        name: "selectSingleSearchTree",
        components: { TriangleSvg },
        props: {
            // 选中项的id
            selectedId: {
                type: String,
                default: ''
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
                default: 360
            },
            // 传入的数据
            data: {
                type: Array,
                default: []
			},
			lastStage: {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: ''
			}
        },
        data() {
            return {
				pleaseSelect: '请选择', // 请搜索占位符
				choicedName: '',
                searchPlaceHolder: false, // 控制文字颜色
                fieldStatus: true, // 控制占位符是否显示
                boxFocus: false, // box-focus是否获取焦点
                inputValue: '', // 输入框输入的值
                inputWidth: 10, // 输入框的宽度
                // 下拉框是否显示
                dropDownShow: false,
                // 树形结构数据
                treeData: [],
                // 搜索的数据
                searchData: [],
                // 激活关闭
                closeDrop: false,
                // 搜索无内容
				notFound: false,
				targetVm: null
            }
        },
        watch: {
            // 监听文字输入
            inputValue(n, o) {
                if (n === o) return;
                this.notFound=this.treeData.length===0;
				this.targetVm.inputValue = n
                if (n) {
                    this.setInputWidth(n, this.$refs.inputField);
                } else {
                    this.inputWidth=10;
                }
			},
			notFound(n, o) {
				if(n === o) return;
				this.targetVm.notFound = n
			},
			searchData(n, o) {
				if(n === o) return;
				this.targetVm.searchData = n
			},
			data(n, o) {
				if(n === o) return
				if(n && n.length) {
					this.setChoseData()
				}
			},
			selectedId(n, o) {
				if(n !== o) {
					if(this.data && this.data.length) {
						this.setChoseData()
					}
				}
			}
        },
        created() {
			// 设置option数据
			if(this.data && this.data.length) {
				this.setChoseData()
			}
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
		beforeDestroy() {
			if(this.targetVm) TreeSinglePanel.remove(this.targetVm)
			window.removeEventListener('mousewheel', this.hidePanel)
		},
        methods: {
			enterTrigger() {
				this.closeDrop = false
			},
			leaveTrigger() {
				this.closeDrop = true
			},
			hidePanel() {
				this.dropDownShow = false
				if(this.targetVm) {
					this.targetVm.dropDownShow = false
					this.$refs.inputField.blur();
					this.boxFocus=false;
				}
			},
			setChoseData() {
				if(this.selectedId) {
					let checkedData = null
					let setChecked = (data) => {
						data.forEach((item) => {
							if(this.lastStage) {
								if(item.hasOwnProperty('children')) {
									setChecked(item.children)
								} else {
									if(item.id === this.selectedId) {
										item.checked = 'checked'
										checkedData = item
									} else {
										item.checked = 'uncheck'
									}
								}
							} else {
								if(item.id === this.selectedId) {
									item.checked = 'checked'
									checkedData = item
								} else {
									item.checked = 'uncheck'
									if(item.hasOwnProperty('children')) {
										setChecked(item.children)
									}
								}
							}
						})
					}
					setChecked(this.data)
					this.treeData = this.data
					this.notFound = this.treeData.length===0;
					this.choicedName = checkedData ? checkedData.name : '';
					this.searchPlaceHolder= checkedData ? true : false;
				} else {
					this.treeData = this.data
					this.notFound = this.treeData.length===0;
				}
			},
            // 点击p-select-search-box使输入框获取焦点
            searchBoxClick() {
				let _this = this
				_this.$refs.inputField.focus();
				if (this.disabled || this.dropDownShow) return;
				if(this.targetVm) {
					TreeSinglePanel.renderPosition(this.targetVm)
					this.targetVm.dropDownShow = true
					this.targetVm.treeData = this.treeData
				} else {
					this.targetVm = TreeSinglePanel({
						tag: this.$refs.SelectSingleTree,
						params: {
							data: this.data,
							dropDownShow: this.dropDownShow,
							notFound: this.notFound,
							inputValue: this.inputValue,
							selectedId: this.selectedId,
							searchData: this.searchData,
							treeData: this.treeData,
							height: this.height,
							lastStage: this.lastStage,
							width: this.calcWidth
						}
					}).$on('changeChose', (data) => {
						_this.$emit('change', data.id);
						_this.setDataNow(data.name.replace(/<[^<>]+>/g, ''));
					}).$on('close', (data) => {
						if(_this.dropDownShow) {
							_this.closeDrop = data;
							if(data) _this.$refs.inputField.focus();
						}
					})
					this.targetVm.$nextTick(() => {
						_this.targetVm.dropDownShow = true
						_this.dropDownShow=true;
					})
				}
				this.dropDownShow = true
				this.$refs.inputField.focus();
				this.boxFocus=true;
				this.closeDrop = false;
            },

            /**
             * 筛选搜索的收据
             * @param v 搜索框输入的值
             * @param dom dom对象
             */
            setInputWidth(v, dom) {
                if (v) {
                    this.fieldStatus=false;
                    const { scrollWidth }=dom;
                    if (scrollWidth < this.width-24) this.inputWidth=scrollWidth;
                    else this.inputWidth=this.width-24;
                    this.filterSelect(v);
                } else {
                    this.fieldStatus=true;
                }
            },
            // 输入框有值关闭占位符
            searchInput(e) {
                const v=e.data;
                this.fieldStatus = !v;
                if (v) this.setInputWidth(v, e.target);
				else this.treeData=this.data,this.notFound=false;
            },
            /**
             * 筛选搜索的收据
             * @param v 搜索框输入的值
             */
            filterSelect(v) {
                const data=JSON.parse(JSON.stringify(this.data));
				let tileData=TileTool([], data, '-1'); // 平铺树形结构
				if(this.lastStage) {
					tileData = tileData.filter(item => item.lastNode && item.isleaf)
				}
                const re=new RegExp(v, 'g');
                // 筛选出包涵有搜索字符的数据
                const fData=tileData.filter(d => {
                    if (d.name.includes(v)) {
                        d.name=d.name.replace(re, `<span style="color: #0091ff;font-size: 14px;">${v}</span>`);
                        return d;
                    }
                });
                // 得到筛选后的数据 一维数据列表
                const tData=FilterTool(tileData, fData);
                this.searchData=tData;
                this.notFound=tData.length===0;
            },
            // 关闭选择框
            inputBlur() {
				if (!this.closeDrop) return;
                setTimeout(() => {
					if (!this.dropDownShow) return;
					this.targetVm.dropDownShow = false
                    this.boxFocus=false;
                    this.dropDownShow=false;
					this.searchPlaceHolder=true;
					this.fieldStatus=true;
					this.inputValue='';
                }, 0);
            },
            /**
             * 设置选中的数据
             * @param name 当前选中的name
             * @param time 延迟时间
             */
            setDataNow(name, time=0) {
				this.$refs.inputField.blur()
				this.targetVm.dropDownShow = false
				this.dropDownShow = false
                this.searchPlaceHolder=true;
                this.fieldStatus=true;
				this.choicedName=name;
				this.boxFocus=false;
                setTimeout(() => this.inputValue='', time);
            }           
        }
    }
</script>

<style lang="stylus"></style>