 ### Cascader 级联选择器

<template>
    <div>
        <div class="cascader-display-panel">
            <div >
                <h5>单选-hover</h5>
                <Cascader  placeholder="测试placeholder" trigger='hover' v-model="model1"  :data="cascaderData1"  width="300"></Cascader>
            </div>
            <div>
                <h5>单选-带请求-click</h5>
                <Cascader placeholder="测试placeholder" trigger='click' :load-data="loadData2"  :data="cascaderData2"  width="300"></Cascader>
            </div>
        </div>
        <div class="cascader-display-panel">
            <div>
                <h5>多选-子父级联动-半选也计算在内-带面板-hover</h5>
                <Cascader  placeholder="测试placeholder"   trigger='hover' multiple  all  :data="cascaderData3" caption="选择部门"  @confirm="testConfirm" type="normal" showPanel width="300"></Cascader>
            </div>
            <div>
                <h5>多选-子父级联动-半选不计算在内-带面板-click</h5>
                <Cascader  placeholder="测试placeholder"   trigger='click' multiple :data="cascaderData3" caption="选择部门"  @confirm="testConfirm" type="normal" showPanel width="300"></Cascader>
            </div>
        </div>
        <div class="cascader-display-panel">
            <div>
                <h5>多选-子级禁用，子父级不联动-带面板-click</h5>
                <Cascader placeholder="测试placeholder"  trigger='click' multiple :data="cascaderData4" type="forbidden" showPanel width="300"></Cascader>
            </div>
            <div>
                <h5>多选-子父级不联动-不带面板-click</h5>
                <Cascader placeholder="测试placeholder"  trigger='click' multiple :data="cascaderData5" type="independent"   width="300"></Cascader>
            </div>
        </div>
        <div class="cascader-display-panel">
            <div>
                <h5>多选-只能选末级-带面板-hover</h5>
                <Cascader placeholder="测试placeholder" trigger='hover' multiple :data="cascaderData6" type="final"   width="300"></Cascader>
            </div>
            <div>
                <h5>多选-只能选末级-带面板-click</h5>
                <Cascader placeholder="测试placeholder"  multiple :data="cascaderData6" type="final"   width="300"></Cascader>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'CascaderView',
    watch:{
        model1(n,o){
           
        }
    },
    data () {
        return {
            model1:['id1','id3'],
            cascaderData1:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    disabled: true,
                    children:[
                        {id:'id2',title:'London', disabled: true},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    disabled: true,
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia',disabled: true},
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            cascaderData2:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    children:[
                        {id:'id2',title:'London', disabled: true},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia',disabled: true},
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            cascaderData3:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    disabled: true,
                    children:[
                        {id:'id2',title:'London', disabled: true},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia',disabled: true},
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            cascaderData4:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    children:[
                        {id:'id2',title:'London', disabled: true},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia',disabled: true},
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            cascaderData5:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    children:[
                        {id:'id2',title:'London', disabled: true},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia',disabled: true},
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            cascaderData6:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    children:[
                        {id:'id2',title:'London', disabled: true},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia',disabled: true},
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            cascaderData7:[
                {
                    title:'United Kingdom',
                    id:'id1'
                },
                {
                    title:'AMERICAN',
                    id:'id2'
                },
                {
                    title:'CHINA',
                    id:'id3'
                },
            ],
        }
    },
    methods:{
        testConfirm (data) {
            console.log(data)
        },
        loadData2 (item, callback) {
                item.loading = true;
                setTimeout(() => {
                    if (item.title === 'United Kingdom') {
                        item.children = [
                            {
                                title: 'UK1'
                            },
                            {
                                title: 'UK2',
                            },
                            {
                                title: 'UK3'
                            }
                        ]
                    }else if (item.title === 'AMERICAN') {
                        item.children = [
                            {
                                title: 'AMERICAN1'
                            },
                            {
                                title: 'AMERICAN2',
                            },
                            {
                                title: 'AMERICAN3'
                            }
                        ]
                    }else if (item.title === 'CHINA') {
                        item.children = [
                            {
                                title: 'CHINA1'
                            },
                            {
                                title: 'CHINA2',
                            },
                            {
                                title: 'CHINA3'
                            }
                        ]
                    }  
                    item.loading = false;
                    callback()
                }, 1000);
           
        },
    }
}
</script>

<style lang="stylus">
.cascader-display-panel
    display flex
    justify-content space-between
    width 800px
    margin-top 120px
    margin-left 40px
    div
        h5
            margin-bottom 12px
</style>


```vue
<template>
    <div>
        <div class="cascader-display-panel">
            <div >
                <h5>单选-hover</h5>
                <Cascader  placeholder="测试placeholder" trigger='hover' v-model="model1"  :data="cascaderData1"  width="300"></Cascader>
            </div>
            <div>
                <h5>单选-带请求-click</h5>
                <Cascader placeholder="测试placeholder" trigger='click' :load-data="loadData2"  :data="cascaderData2"  width="300"></Cascader>
            </div>
        </div>
        <div class="cascader-display-panel">
            <div>
                <h5>多选-子父级联动-半选也计算在内-带面板-hover</h5>
                <Cascader  placeholder="测试placeholder"   trigger='hover' multiple  all  :data="cascaderData3" caption="选择部门"  @confirm="testConfirm" type="normal" showPanel width="300"></Cascader>
            </div>
            <div>
                <h5>多选-子父级联动-半选不计算在内-带面板-click</h5>
                <Cascader  placeholder="测试placeholder"   trigger='click' multiple :data="cascaderData3" caption="选择部门"  @confirm="testConfirm" type="normal" showPanel width="300"></Cascader>
            </div>
        </div>
        <div class="cascader-display-panel">
            <div>
                <h5>多选-子级禁用，子父级不联动-带面板-click</h5>
                <Cascader placeholder="测试placeholder"  trigger='click' multiple :data="cascaderData4" type="forbidden" showPanel width="300"></Cascader>
            </div>
            <div>
                <h5>多选-子父级不联动-不带面板-click</h5>
                <Cascader placeholder="测试placeholder"  trigger='click' multiple :data="cascaderData5" type="independent"   width="300"></Cascader>
            </div>
        </div>
        <div class="cascader-display-panel">
            <div>
                <h5>多选-只能选末级-带面板-hover</h5>
                <Cascader placeholder="测试placeholder" trigger='hover' multiple :data="cascaderData6" type="final"   width="300"></Cascader>
            </div>
            <div>
                <h5>多选-只能选末级-带面板-click</h5>
                <Cascader placeholder="测试placeholder"  multiple :data="cascaderData6" type="final"   width="300"></Cascader>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'CascaderView',
    watch:{
        model1(n,o){
           
        }
    },
    data () {
        return {
            model1:['id1','id3'],
            cascaderData1:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    disabled: true,
                    children:[
                        {id:'id2',title:'London', disabled: true},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    disabled: true,
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia',disabled: true},
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            cascaderData2:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    children:[
                        {id:'id2',title:'London', disabled: true},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia',disabled: true},
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            cascaderData3:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    disabled: true,
                    children:[
                        {id:'id2',title:'London', disabled: true},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia',disabled: true},
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            cascaderData4:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    children:[
                        {id:'id2',title:'London', disabled: true},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia',disabled: true},
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            cascaderData5:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    children:[
                        {id:'id2',title:'London', disabled: true},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia',disabled: true},
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            cascaderData6:[
                {
                    title:'United Kingdom',
                    id:'id1',
                    children:[
                        {id:'id2',title:'London', disabled: true},
                        {id:'id3',title:'Edinburgh'},
                        {id:'id4',title:'Cardiff'},
                        {id:'id5',title:'Birmingham'},
                        {id:'id6',title:'Liverpool'},
                        {id:'id7',title:'Oxford'},
                        {id:'id8',title:'Plymouth'},
                    ]
                },
                {
                    title:'AMERICAN',
                    id:'id9',
                    children:[
                        {id:'id10',title:'Chicago'},
                        {id:'id11',title:'Philadelphia',disabled: true},
                        {id:'id12',title:'Boston'},
                        {id:'id13',title:'Houston'},
                        {id:'id14',title:'Atlanta'},
                        {id:'id15',title:'San Francisco'},
                    ]
                },
                {
                    title:'CHINA',
                    id:'id16',
                    children:[
                        {id:'id17',title:'BeiJing'},
                        {id:'id18',title:'ShangHAI'},
                        { 
                            title:'GuiYang',
                            id:'id19',
                            children:[
                                {id:'id20',title:'Qingyan'},
                                {id:'id21',title:'Guian'},
                            ]    
                        },
                        {id:'id22',title:'ZunYi'},
                    ]
                }, 
                {
                    title:'韩国',
                    id:'id23',
                    children:[
                        {id:'id24',title:'首尔'},
                        {id:'id25',title:'仁川'},
                        {id:'id26',title:'釜山'},
                        {id:'id27',title:'蔚山'}
                    ]
                }
            ],
            cascaderData7:[
                {
                    title:'United Kingdom',
                    id:'id1'
                },
                {
                    title:'AMERICAN',
                    id:'id2'
                },
                {
                    title:'CHINA',
                    id:'id3'
                },
            ],
        }
    },
    methods:{
        testConfirm (data) {
            console.log(data)
        },
        loadData2 (item, callback) {
                item.loading = true;
                setTimeout(() => {
                    if (item.title === 'United Kingdom') {
                        item.children = [
                            {
                                title: 'UK1'
                            },
                            {
                                title: 'UK2',
                            },
                            {
                                title: 'UK3'
                            }
                        ]
                    }else if (item.title === 'AMERICAN') {
                        item.children = [
                            {
                                title: 'AMERICAN1'
                            },
                            {
                                title: 'AMERICAN2',
                            },
                            {
                                title: 'AMERICAN3'
                            }
                        ]
                    }else if (item.title === 'CHINA') {
                        item.children = [
                            {
                                title: 'CHINA1'
                            },
                            {
                                title: 'CHINA2',
                            },
                            {
                                title: 'CHINA3'
                            }
                        ]
                    }  
                    item.loading = false;
                    callback()
                }, 1000);
           
        },
    }
}
</script>

<style lang="stylus">
.cascader-display-panel
    display flex
    justify-content space-between
    width 800px
    margin-top 120px
    margin-left 40px
    div
        h5
            margin-bottom 12px
</style>
 

```

 

### Attributes

| 参数     |   说明      | 类型    | 默认值  | 必须    |  可选值  |
| -------  |   ----     | ------ | ------- | ------ |   |
| data     | 绑定的数据  | Array  |    []   | yes    |   |
| v-model  | 默认选中值  | Array  |    []   | no    |     |
| width    | 组件宽度    | Number |    200   | no    |    |
| load-data| 异步获取数据| function | 无 | no    |    |
| caption  | 异步获取数据| function | 无 | no    |    |
| multiple | 是否多选    | Boolean | false | no    |   |
| trigger  |次级菜单展开方式| String | click | yes    | click/hover  |
| showPanel| 是否显示筛选面板 | Boolean | false | no  |   |
|   type   | 多选情况下的展示类型 | String | 'normal' | no  | normal / independent /  final / forbidden|

### props
| 参数     |   说明      | 类型    | 默认值  | 必须    | 
| -------  |   ----     | ------ | ------- | ------ |   
| disabled | 是否禁用  | boolean  |  false  | no    |   


### type
| 参数         |   说明      | 
| -------      |   ----     | 
| normal       | 常规 子父级联动 父级有半选状态  | 
| independent  | 父级和子级都可以选择，且互不干  | 
| final        | 只有末级节点可以选择，此时的父级节不能选择 | 
| forbidden    | 选择了父级，子级勾选，且不可操作 | 


### Events

| 事件名称  |   说明      | 返回数据    |  
| -------  |   ----     | ------ | 
| change   |单击某一项触发  |    当前值  | 
| confirm  | 多选情况下点击确认按钮触发  | 选中值  |    
    