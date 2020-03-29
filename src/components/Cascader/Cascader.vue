<template>
<div>
    <div :class="['p-cascader']" ref="cascader"  :style="widthStyle"  v-clickoutside="handleClose">
        <div :class="[ 'p-cascader-header', isFocused ? 'p-cascader-focused' : '']" @click.capture="handleOpen" > 
            <Triangle :class="classes"></Triangle>
            <span class="p-cascader-caption" v-if="caption">{{caption}}</span>
            <div class="p-cascader-fake-input">
                <input 
                    class='p-cascader-input' 
                    v-model="inputText" 
                    @focus.stop="handleFocus" 
                    @blur="handleBlur"
                    @input="handleInput" />
                <section :style="inputStyle"  v-show="showPlaceholder" class="p-cascader-placeholder">{{fakePlaceholder}}</section>
                <section :style="inputStyle" :title="fakeInputText"  v-show="showInputText" class="p-cascader-placeholder p-cascader-placeholder-input">{{fakeInputText}}</section>
            </div>
        </div>
    </div>
</div>

</template>
<script>
import clickoutside from './clickoutside'
import Triangle from '../static/iconSvg/triangle.svg'
import Options from './dropdown'
import Checkbox from '../Checkbox/Checkbox'
import {cloneDeep} from './utils'
export default {
    name:'Cascader',
    data () {
        return {
            showCascader:false,
            inputText:'',
            flatData:[],
            query:'',
            isFocused:false,
            dropInstance:null,
            fakePlaceholder:'请选择',
            fakeInputText:'',
            showPlaceholder:true,
            showInputText:false,
            selectIds:'',
            checked:'checked',
            recursionData:[],
            storeQueryData:[],
            cascaPanel: null,
            handleData: [],
            depth:1,
            storeSelectData:[]
        }
    },
    computed:{
        classes (){
           return ['p-cascader-triangle',this.dropInstance && this.dropInstance.showCascader ? 'p-cascader-triangle-up' : 'p-cascader-triangle-down']
        },
        widthStyle () {
            return {
                width: this.width + 'px'
            }
        },
        inputStyle () {
            return {
                width: this.caption ? (this.width - (this.caption.length*14 + 16 +28)) + 'px' : (this.width - 32) + 'px'
            }
        } 
    },
    components:{Triangle,Checkbox},
    props:{
        value:{
            type:Array,
            default: () => []
        },
        data:{
            type:Array,
            default: () =>[]
        },
        showLast:{
            type:Boolean,
            default:false
        },
        width:{
            type:[String, Number],
            default:200
        },
        loadData: {
            type: Function
        },
        multiple:{
            type:Boolean
        },
        showPanel:{
            type:Boolean
        },
        caption:{
            type:String
        },
        placeholder:{
            type:String
        },
        /**
         * normal: 常规 子父级联动 父级有半选状态
         * independent: 父级和子级都可以选择，且互不干
         * final:只有子级节点可以选择，此时的父级节不能选择
         * forbidden: 选择了父级，子级勾选，且不可操作
         */
        type :{
            type:String,
            // default:'normal',
            validator:(val) => {
                return  ['normal','independent','final','forbidden']
            }
        },
        all:{
            type:Boolean,
            default:false
        },
        trigger: {
            validator (value) {
                return  ['click', 'hover'].indexOf(value) > -1
            },
            default: 'click'
        },
    },
    directives:{
        'clickoutside':clickoutside
    },
    created () {
        this.fakePlaceholder = this.placeholder
    },
    mounted () {
        if (this.value && Array.isArray(this.value) && this.value.length  ) {
            if (!this.multiple) {
                this.createPath()
            } else {
                let find = this.flatData.find(item => {return item.id === this.value[this.value.length - 1]})
                if (find) {
                    this.showPlaceholder = false
                    this.showInputText = true
                    this.fakeInputText = `已选择1项`
                }
            }
        }
    },
    watch:{
        data:{
            handler(n, o) {
                if (n !== o ) {
                    this.handleData = cloneDeep(this.data)
                    this.createFlatData()
                    this.createRecursionData()
                }
            },
            deep:true,
            immediate:true
        },
        value:{
            handler(n, o) {
                if (n !== o ) {
                    this.selectIds = n
                    if (this.dropInstance) {
                        this.dropInstance.selectIds = n
                    }
                }
            },
            immediate:true
        }
    },
    methods:{
        createRecursionData () {
            let selections = []
            getSelections(this.handleData)
            function getSelections (arr, title, id) {
                for (let i = 0; i < arr.length; i++) {
                    let item = arr[i];
                    item._title = title ? title+'/'+item.title : item.title;
                    item._ids = id ? id + '/'+ item.id: item.id 
                    item.display = item._title
                    if (item.children && item.children.length) {
                        getSelections(item.children, item._title, item._ids );
                    } else {
                        selections.push(Object.assign({},item,{query:true}));
                    }
                }
            }
           
            this.recursionData = selections
          
            
        },
        createFlatData () {
            let vm=this
            let flatData =[]
            let key = -1
            let getByFunction
            this.loadData && typeof this.loadData === 'function' ? getByFunction = true  : getByFunction = false
            function flatDeepData (node, parent) {
                key++
                node.nodekey = key
                flatData[key] = node
                if (parent) {
                    flatData[key].parentId = parent.nodekey
                    node.parentId = parent.nodekey
                }
                if (vm.type) {
                    vm.$set(node,'checked', 'uncheck') 
                    vm.$set(node,'active', false)     
                }  
                if (getByFunction) { 
                    vm.$set(node,'loading', false)
                }
                if (vm.type ==='forbidden') {
                    vm.$set(node,'forbidden', false)
                }
                if (node.children && node.children.length) {
                    if (vm.type === 'final') { 
                        vm.$set(node,'selectCheckbox', false) 
                    }
                    node.children.forEach(item => {
                        flatDeepData(item, node)
                    })
                } else {
                    if (vm.type === 'final') { 
                        vm.$set(node,'selectCheckbox', true) 
                    }
                }
            }
            this.handleData.forEach(child => {
                child.parentId = -1
                if (this.type) {
                    vm.$set(child,'checked', 'uncheck')
                    vm.$set(child,'active', false) 
                }
                if (vm.type ==='forbidden') {
                    vm.$set(child,'forbidden', false)
                }
                if (getByFunction) {
                    vm.$set(child,'loading', false)
                }
                if (vm.type === 'final') {
                    if (child.children && child.children.length) {
                        vm.$set(child,'selectCheckbox', false) 
                    } else {
                        vm.$set(child,'selectCheckbox', true) 
                    }
                }
                flatDeepData(child)
            })
       
            this.flatData = flatData
        },
        createPath () {
            let index = -1
            let path = []
            createPath(this.handleData, this.value)
            this.showPlaceholder = false
            this.showInputText =true
            this.fakeInputText = path.join('/')
            this.query = ''
            function createPath (data, arr) {
                index++
                for (let i=0 ; i < data.length; i++) {
                    let item = data[i]
                    if (item.id === arr[index]) {
                        path.push(item.title)
                        if (item.children) {
                            createPath(item.children, arr)
                        }  
                    } 
                }
            }
        },
        handleClose () {
            if (this.dropInstance) {
                this.dropInstance.showCascader = false
                if (!this.multiple) {
                    if (this.fakeInputText) {
                        this.showInputText = true
                        this.showPlaceholder = false
                    }
                    if (this.query) {
                        this.showInputText = false
                        this.showPlaceholder = true
                        this.dropInstance.query = ''
                        this.inputText=''
                        this.fakeInputText = ''
                        this.dropInstance.queryItems = []
                        this.dropInstance.selectIds=[]
                    } 
                } else {
                    if (this.dropInstance.query || this.dropInstance.confirmedData.length) { //  用户正在搜索
                        if (this.dropInstance.confirmedData.length) {
                            this.reShowSelectedNum(this.dropInstance.confirmedData)
                        } else {
                            this.reShowPlaceholder()
                        }
                    }
                }
            }
        },
        handleFocus () {
            this.isFocused = true
            if (this.dropInstance) {
                if (this.dropInstance.query && this.dropInstance.confirmedData.length) {
                    return
                }
            }
            if (this.fakeInputText) {
                this.showPlaceholder = true
                this.showInputText = false
                this.inputText = ''
                this.fakePlaceholder = this.fakeInputText
            }
            
        },
        handleBlur () {
            this.isFocused = false
        },
        resetPanelPosition () {
            let add = this.showPanel ? 1 : 0
            let trueWidth = 0
            if (this.width > 600) {
                trueWidth = 600
            } else if (this.width < 180) {
                trueWidth = 180
            } else {
                trueWidth = this.width
            }
            this.$nextTick(()=>{
                Options.resetPosition(this.dropInstance, this.$refs.cascader, document.body, (this.depth + add) * trueWidth)
            })
        },
        handleOpen (event) {
            if (this.dropInstance) {
                this.dropInstance.showCascader = true
                this.dropInstance.data = this.handleData
                this.resetPanelPosition()
            } else {
                // 初始化实例
                this.dropInstance=Options({
                    tag: this.$refs.cascader ,
                    props:{
                        query: this.query, 
                        data: this.handleData, 
                        loadData: this.loadData, 
                        selectIds: this.selectIds, 
                        flatData: this.flatData,
                        type: this.type,
                        multiple: this.multiple,
                        showPanel: this.showPanel,
                        trigger: this.trigger,
                        recursionData: this.recursionData,
                        all: this.all
                    }
                }).$on('change', (option) => {
                    if (this.multiple) {
                        if (!option.length) {
                            this.showPlaceholder = true
                            this.showInputText = false
                            this.query = ''
                            this.inputText = ''
                            this.reShowPlaceholder()
                        } else {
                            this.reShowSelectedNum(option)
                        } 
                    } else {
                        this.change(option)
                    }
                }).$on('select',( item ) => {
                    if(!this.multiple) {
                        this.showInputText = true
                        this.showPlaceholder = false
                        this.inputText = ''
                        this.query = ''
                        this.fakeInputText=item._title
                        this.dropInstance.queryItems = []
                        this.dropInstance.query = ''
                        this.dropInstance.showCascader = false
                    } else {

                    }
                }).$on('confirm', (items) =>{
                    this.storeSelectData =  items
                    if (!items.length){
                        this.reShowPlaceholder()
                    } else {
                        this.reShowSelectedNum(items)
                    }
                    let ids = []
                    items.forEach(item=>{
                        ids.push(item.id)
                    })
                    this.$emit('confirm', items)
                    this.$emit('input', ids)
                }).$on('checkWidth', (depth) => {
                    this.depth = depth
                    this.resetPanelPosition()
                })
                this.dropInstance.$nextTick(() => {
                    this.dropInstance.showCascader=true;
                })
            }
        },
        reShowSelectedNum (items) {
            this.inputText = ''
            this.showPlaceholder = false
            this.showInputText = true
            this.fakeInputText = `已选择${items.length}项`
            this.dropInstance.queryItems = []
            this.dropInstance.query = ''
        },
        reShowPlaceholder () {
            this.inputText = ''
            this.showPlaceholder = true
            this.showInputText = false
            this.fakePlaceholder = this.placeholder
            this.dropInstance.query = ''
            this.dropInstance.queryItems = []
        },
        change (item) {
            this.showPlaceholder = false
            let path = [item.title]
            let ids = [item.id]
            let emitData = [{
                id:item.id,
                title:item.title
            }]
            let createPath= (target)=>{
                if (target.parentId || target.parentId===-1) {
                    let node = null
                    let index = this.flatData.findIndex(item => {
                        return item.nodekey == target.parentId
                    })
                    if (index > -1) {
                        node = this.flatData[index]
                        path.push(node.title)
                        ids.push(node.id)
                        emitData.push({
                            id:node.id,
                            title:node.title
                        })
                        createPath(node)
                    } 
                }  
            }
            createPath (item)
            path = path.reverse().join('/')
            emitData = emitData.reverse()
            ids = ids.reverse()
            this.fakeInputText = path
            this.query = ''
            this.showInputText = true
            this.showPlaceholder = false
            this.$emit('change', emitData)
            this.$emit('input', ids)
            if (!item.children || !item.children.length) {
                this.dropInstance.showCascader = false
            }
        },
        handleInput (event) {
            this.showPlaceholder = false
            this.showInputText = false
            this.query = event.target.value || event.data || ''
            if (this.dropInstance){
                this.dropInstance.query = this.query
                if (this.query) {
                    this.searchContent()
                } else {
                    this.dropInstance.queryItems = []
                    this.dropInstance.data=this.handleData
                    this.showPlaceholder = true
                }
            }
        },
        searchContent () {
            
            this.createRecursionData()
            let findItems = this.recursionData.filter(item => {
                return item._title ? item._title.indexOf(this.query) > -1 : false;
            }).map(item => {
                item.display = item.display.replace(new RegExp(this.query, 'g'), `<span style="color:#0091FF">${this.query}</span>`);
                return item;
            })
            this.dropInstance.selectedItems.forEach(item => {
                findItems.forEach(option=>{
                    if (option.id === item.id) {
                        option.checked = item.checked
                    }
                })
            })
            
            // findItems.forEach(item => {
            //     let find =this.storeSelectData.find(option => {return option.id === item.id})
            //     if (find) {
            //         item.checked = 'checked'
            //     } else {
            //         item.checked = 'uncheck'
            //     }
            // })
            this.dropInstance.queryItems = findItems
        },
    },
    beforeDestroy () {
        Options.remove(this.dropInstance)
    }
}
</script>
<style lang="stylus">


.p-cascader
    height 32px
    width 400px
    min-height 32px
    cursor pointer
    .p-cascader-header
        width 100%
        height 32px
        position relative
        border 1px solid #ccc
        border-radius 4px
        .p-cascader-caption
            display inline-block
            height 30px
            line-height 30px
            font-size 14px
            padding-left 12px
            float left
            color $grey-900
        .p-cascader-fake-input
            position relative
            display inline-block
            float left
            .p-cascader-placeholder, .p-cascader-input
                position absolute
                left 0
                top 0
                z-index 10
                height 30px
                line-height 30px
                color $grey-400
                padding-left 12px
                font-size 14px
                white-space: nowrap
                overflow hidden
                text-overflow ellipsis
            .p-cascader-placeholder-input
                color $grey-900
            .p-cascader-input
                border none
                outline none
                z-index 100
                color $grey-900
                background transparent
                cursor pointer
        .p-cascader-triangle
            position absolute
            z-index 999
            top 8px
            right 10px
            width 16px
            height 16px
            transform-origin center center
            transform rotate(180deg)
            transition 0.3s ease-in-out
            will-change rotate
        .p-cascader-triangle-up
            transform rotate(0deg)
        .p-cascader-triangle-down
            transform rotate(180deg)
        &:hover
            border 1px solid #0091FF
            transition 0.3s
    .p-cascader-focused
        border 1px solid #0091FF
        box-shadow 0 0 0 2px rgba(0, 145, 255, .2)
        transition 0.3s

</style>