<template>
	<div class="selectSearchBox">
		<div class="type-box">
			<h2 style="font-size: 18px;margin-bottom: 12px">一、单选</h2>
			<div style="padding-left: 24px">
				<h3 style="font-size: 16px;margin-bottom: 8px">1.单选-tree</h3>
				<TreeSelect width="280"  :data="dataTreeSingle" :lastStage='true' />
				<h3 style="font-size: 16px;margin-bottom: 8px">1.2.单选-tree</h3>
				<TreeSelect width="240" v-model="selectId" placeholder="请选择0000" :data="dataTree" :disabled="true" />
			</div>
		</div>
		<div class="type-box">
			<h2 style="font-size: 18px;margin-bottom: 12px">二、多选</h2>
			<div style="padding-left: 24px">
				<h3 style="font-size: 16px;margin: 28px 0 8px 0">2.1.多选-tree-联动</h3>
				<TreeSelect
					title="已选项"
					unit="个"
					placeholder="请选择111111"
					tipPlace="top"
					:multiple="true"
					width="280"
					:selectedIds="selectedIds"
					:data="dataTreeMultiple"
					@change="selectChange"
				/>
				<h3 style="font-size: 16px;margin: 28px 0 8px 0">2.1.1.多选-tree-联动 禁用</h3>
				<TreeSelect
					title="已选项"
					unit="个"
					placeholder="请选择"
					tipPlace="top"
					:multiple="true"
					width="280"
					:data="dataTreeMultiple"
					@change="selectChange"
					:disabled="true"
				/>
				<h3 style="font-size: 16px;margin: 28px 0 8px 0">2.2.多选-tree-联动-返回半选的数据</h3>
				<TreeSelect
					title="已选项"
					unit="个"
					placeholder="请选择"
					tipPlace="top"
					:multiple="true"
					:notNull="true"
					width="240"
					:data="dataTreeMultiple1"
					@change="selectChange"
				/>
				<h3 style="font-size: 16px;margin: 28px 0 8px 0">2.3.多选-tree-不联动</h3>
				<TreeSelect
					title="已选项"
					unit="个"
					placeholder="请选择"
					tipPlace="top"
					:multiple="true"
					:linkage="false"
					width="240"
					:data="dataTreeMultiple2"
					@change="selectChange"
				/>
				<h3 style="font-size: 16px;margin: 28px 0 8px 0">2.3.多选-tree-只能选择末级</h3>
				<TreeSelect
					title="已选项"
					unit="个"
					placeholder="请选择"
					tipPlace="top"
					:multiple="true"
					:linkage="false"
					:lastStage='true'
					width="240"
					height='50'
					:data="dataTreeMultiple3"
					@change="selectChange"
				/>
			</div>
		</div>
		<div class="type-box">
			<h2 style="font-size: 18px;margin-bottom: 12px">三、多选带选择区域</h2>
			<h3 style="font-size: 16px;margin: 28px 0 8px 0">3.1.联动选择</h3>
			<TreeSelect
				title="已选项"
				unit="个"
				placeholder="请选择222"
				tipPlace="top"
				width='400'
				height="300"
				:selectedIds="selectedIds"
				:choseArea="true"
				:data="dataTreeMultiple"
				@change="treeConfirm"
			/>
			<h3 style="font-size: 16px;margin: 28px 0 8px 0">3.1.1.联动选择 禁用</h3>
			<TreeSelect
				title="已选项"
				unit="个"
				placeholder="请选择"
				tipPlace="top"
				height="300"
				:choseArea="true"
				:data="dataTreeMultiple4"
				@change="treeConfirm"
				:disabled="true"
			/>
			<h3 style="font-size: 16px;margin: 28px 0 8px 0">3.1.联动选择半选</h3>
			<TreeSelect
				title="已选项"
				unit="个"
				placeholder="请选择"
				tipPlace="top"
				height="300"
				:notNull='true'
				:choseArea="true"
				:data="dataTreeMultiple5"
				@change="treeConfirm"
			/>
			<h3 style="font-size: 16px;margin: 28px 0 8px 0">3.1.上下级不联动</h3>
			<TreeSelect
				title="已选项"
				unit="个"
				placeholder="请选择"
				tipPlace="top"
				height="300"
				:linkage="false"
				:choseArea="true"
				:data="dataTreeMultiple6"
				@change="treeConfirm"
			/>
			<h3 style="font-size: 16px;margin: 28px 0 8px 0">3.2.只能选择末级</h3>
			<TreeSelect
				title="已选项"
				unit="个"
				placeholder="请选择"
				tipPlace="top"
				width="300"
				height="50"
				:lastStage='true'
				:linkage='false'
				:choseArea="true"
				:data="dataTreeMultiple7"
				@change="treeConfirm"
			/>
		</div>
	</div>
</template>

<script>
    const dataTree=[
        {
            id: '0', name: '顶级顶级', open: true, checked: 'uncheck',
            children: [
                {
                    id: '1',  name: '一级1', open: false, checked: 'uncheck',
                    children: [
                        {id: '12', name: '测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测',  checked: 'uncheck'},
                        {id: '121', name: '二级3111',  checked: 'uncheck'},
                        {id: '122', name: '二级4',  checked: 'uncheck'},
                        {
                            id: '1321', name: '二级1', open: false, checked: 'uncheck',
                            children: [
								{id: '1333', name: '三级2', checked: 'uncheck'},
                                {id: '1313', name: '三级3', checked: 'uncheck'},
                                {id: '1323', name: '三级4', checked: 'uncheck'},
                            ]
                        }
                    ]
                },
                {
                    id: '2', name: '一级2', open: false, checked: 'uncheck',
                    children: [
                        {id: '222', name: '二级20', checked: 'uncheck', isleaf: true},
                        {id: '2221', name: '二级21', checked: 'uncheck', isleaf: true},
                        {id: '2222', name: '二级22',checked: 'uncheck', isleaf: true}
                    ]
                },
                {
                    id: '3', name: '一级3', open: false, checked: 'uncheck',
                    children: [
                        {id: '322', name: '二级30', checked: 'uncheck', isleaf: true},
                        {id: '3220', name: '二级31', checked: 'uncheck', isleaf: true},
                        {id: '3221', name: '二级32', checked: 'uncheck', isleaf: true}
                    ]
                },
                {
					id: '4', name: '测试末级配置不可选',  checked: 'uncheck', isleaf: false
                }
            ]
        }
    ];

    export default {
        name: "TreeSelectView",
        data() {
            return {
                selectId: '121',
                // 多选选中的id
				selectedIds: ['322', '12'],
				dataTree: dataTree,
                dataTreeSingle: JSON.parse(JSON.stringify(dataTree)),
                dataTreeMultiple: null,
                dataTreeMultiple1: JSON.parse(JSON.stringify(dataTree)),
                dataTreeMultiple2: JSON.parse(JSON.stringify(dataTree)),
                dataTreeMultiple3: JSON.parse(JSON.stringify(dataTree)),
                dataTreeMultiple4: JSON.parse(JSON.stringify(dataTree)),
                dataTreeMultiple5: JSON.parse(JSON.stringify(dataTree)),
                dataTreeMultiple6: JSON.parse(JSON.stringify(dataTree)),
                dataTreeMultiple7: JSON.parse(JSON.stringify(dataTree)),
            }
        },
        watch: {
            selectId(n) {
                console.log('单选选中的项：', n);
            }
		},
		mounted() {
			dataTree[0].children.splice(1, 1)
			this.dataTreeMultiple = dataTree
			this.selectId = '122'
			this.selectedIds = ['121', '122']
		},
        methods: {
            // 多选返回的id组
            selectChange(ids) {
                console.log('多选返回的id组:::', ids);
                this.selectedIds=ids;
			},
			treeConfirm(data) {
				console.log(data)
			}
        }
    }
</script>

<style lang="stylus">
.selectSearchBox
	display: flex
	padding: 16px
	.p-modal-content
		display flex
		justify-content center
		align-items flex-end
.type-box
	margin-right: 20px
</style>