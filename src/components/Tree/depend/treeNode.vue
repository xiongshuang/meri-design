<template>
	<div class="p-tree-node">
		<div
			:class="['p-tree-node-content', !multiple&&treeItem.checked==='checked'&&'p-tree-node-content-checked', treeItem.disabled&&'p-tree-node-content-disabled']"
			:style="{paddingLeft: paddingLeft+'px'}"
		>
			<section class="p-tree-svg" @click="openChild" >
				<ArrowTriangle
					:class="['p-tree-icon-svg', (treeItem.open)&&'p-tree-icon-rotate']"
					v-if="triangleShow"
				/>
			</section>
			<div class="p-tree-node-check" @click="handleCheck(treeItem, index)">
				<Checkbox
					:checked="treeItem.disabled ? 'uncheck' : treeItem.checked"
					:disabled="treeItem.disabled"
					v-if="checkboxShow"
				/>
					<!-- v-if="multiple&&(!lastStage||!triangleShow)" -->
				<section class="p-tree-node-title">
					<article class="p-tree-node-name" @mouseenter="treeItemEnter" v-html="treeItem.name" />
				</section>
			</div>
		</div>
		<div class="p-tree-child" v-if="triangleShow" v-show="treeItem.open">
			<TreeNode
				:multiple="multiple"
				:linkage="linkage"
				:lastStage="lastStage"
				v-for="(item, ind) in treeItem.children"
				:key="item.id+'-'+ind"
				:treeItem="item"
				:triangleShow="!!(item.children&&item.children.length)"
				:index="`${index}-${ind}`"
				:change="change"
			/>
		</div>
	</div>
</template>

<script>
    import ArrowTriangle from '../../static/iconSvg/arrow_triangle.svg';
    import Checkbox from '../../Checkbox';

    export default {
        name: 'TreeNode',
        components: { ArrowTriangle, Checkbox },
        props: {
            /**
             * 是否开启多选
             */
            multiple: {
                type: Boolean,
                default: false
            },
            /**
             * 是否联动选择
             */
            linkage: {
                type: Boolean,
                default: true
            },
            /**
             * 只能选择末级
             */
            lastStage: {
                type: Boolean,
                default: false
            },
            /**
             * 树形结构子项数据列表
             */
            treeItem: {
                type: Object,
                default: {}
            },
            /**
             * 点击某项
             */
            change: {
                type: Function,
                default: () => false
            },
            /**
             * 下拉三角形是否显示
             */
            triangleShow: {
                type: Boolean,
                default: false
            },
            /**
             * 索引
             */
            index: {
                type: String,
                default: ''
			}
        },
        computed: {
            // 左边内边距
            paddingLeft() {
                return (this.index.split('-').length-1)*24+8;
			},

			checkboxShow() {
				let item = this.treeItem
				let flag = item.hasOwnProperty('isleaf') ? item.isleaf : true
				return this.multiple && (!this.triangleShow || !this.lastStage) && flag
			}
		},
        methods: {
            // 展开/收起
            openChild() {
                // if (!this.disabledOpen && this.treeItem.disabled ) return
                this.treeItem.open=!this.treeItem.open
            },
            // 鼠标hover
            treeItemEnter(e) {
                const target=e.target;
                const {clientWidth, scrollWidth, title}=target;
                if (!title && scrollWidth > clientWidth) target.title=target.innerText;
            },
            // 选择
            handleCheck(obj, index) {
                if (obj.disabled) return;
                if (this.multiple) {
					if(this.checkboxShow) {
						let status='';
						const treeItem=this.treeItem;
						const {checked, children}=treeItem;
	
						if (checked === 'checked') {
							status='uncheck';
						} else {
							//  if (checked === 'uncheck' || checked === 'notNull')
							status='checked';
						}
	
						if (this.linkage) {
							// 上下级联动
							if (children && children.length) treeItem.children=this.setCheckedStatus(children, status);
	
							treeItem.checked=status;
							this.treeItem=treeItem;
							this.change(obj, index);
						} else {
							// 上下级不联动 this.lastStage为true-表示只能选择末级节点
							if (this.lastStage && children && children.length) return;
							this.treeItem=treeItem;
							treeItem.checked=status;
	
							this.change(obj, index);
						}
					}
                } else {
					let notLastNode = obj.hasOwnProperty('children') || (obj.hasOwnProperty('isleaf') ? !obj.isleaf : false)
					if(this.lastStage && notLastNode) return
                    // 执行父级的函数
                    this.change(obj, index);
                }
            },
            // 设置checked状态
            setCheckedStatus(data, status) {
                return data.map(d => {
                    d.checked=status;
                    if (d.children && d.children.length)
                        d.children=this.setCheckedStatus(d.children, status);
                    return d;
                })
            }
        }
    }
</script>
