<template>
    <div  v-clickoutside="handleClose" :class="classes" :style="{cursor: disabled? 'not-allowed': 'pointer'}" ref='pSelect'>
        <div  
            :disabled="disabled"
            :class="headerClass" 
            @click.capture="handleOpen"
            :style="headerStyle" >
            <span class="p-select-title" ref="caption" v-if="caption && !multiple" >{{caption}}</span>
            <span class="p-select-count" v-if="showCount && multiple && confirmedItems.length" >已选择<span class="p-select-count-active">{{confirmedItems.length}}</span>项</span>
            <span class="p-select-selected-box" v-show="!showCount || !confirmedItems.length">
                <input 
                    :class="[this.prefixCls + '-input']"
                    :style="inputStyle"
                    :title="fakePlaceholder"
                    @blur="handleBlur"
                    @input="handleInput"
                    @focus.stop="handleFocus"
                    type="text"
                    ref="input"
                    autocomplete="off"
                    spellcheck="false"
                    v-model="selectedItem"
                />
                <span class="p-select-fakePlaceholder" v-show="showPlaceholder" v-html="fakePlaceholder">{{fakePlaceholder}}</span>
                <span class="p-select-fakePlaceholder p-select-input-fakePlaceholder" v-show="showInputText" v-html="fakePlaceholder">{{fakePlaceholder}}</span>
            </span>
            <Triangle :class="triangleClass"></Triangle>
        </div>
    </div>
</template>
<script>
import Drop from './Drop.vue'
import Triangle from '../static/iconSvg/triangle.svg'
import iconClose from '../static/iconSvg/icon_close.svg'
import clickoutside from './clickoutside.js'
import Options from './dropdown'
import {zIndexIncrease, zIndex} from './dispatchZindex'

export default {
    name: "pSelect",
    inheritAttrs: false,
    directives: { 
        'clickoutside':clickoutside,
    },
    components: { Triangle, Drop, iconClose},
    computed:{
        classes () {    
            return [
                `${this.prefixCls}`,
                {
                    [`${this.prefixCls}-multiple`]: this.multiple, 
                    
                }
            ];
        },
        headerStyle () {
            return {
                width : this.width + 'px',
                borderRadius: !!this.radius ? '16px' : '4px',
                backgroundColor: this.disabled ? '#EFF0F1' :'white',
                cursor: this.disabled ? 'not-allowed' :'pointer',
                pointerEvents:this.disabled ? 'none': 'auto',
            }
        },
        triangleClass () {
            return [ 'p-select-triangle', this.dropInstance &&  this.dropInstance.dropVisible ? 'p-select-triangle-up' : 'p-select-triangle-down']
        },
        headerClass () {
            return ['p-select-header', this.radius&&'p-select-header-radius', this.focused ? 'p-select-header-focused' : '' ]
        },
        inputStyle () {
            return {
                cursor:this.disabled ? 'not-allowed': 'pointer',
            }
        }
    },
    watch : {
        /**
         * 下拉列表数据
         */
        selectdata:{
            handler (n, o) {
                if (n !== o) {
                    if (this.dropInstance) {
                        this.dropInstance.data = n
                    }
                }
            },
            deep:true,
            immediate: true
        },
        /**
         * 默认选中项
         */
        value:{
            handler(n, o) {
                if (n !== o && n) {
                    this.defaultSelect()
                    if (this.dropInstance) {
                        this.dropInstance.value=n
                    }
                }
            },
            immediate:true
        },
    },
    props: {
        placeholder:{
            type:String,
            default:''
        },
        /**
         * 是否多选
         */
        multiple:{
            type: Boolean,
            default: false
        },
        count:{
            type: Boolean,
            default: false
        },
        /**
         * 绑定的v-model值
         */
        value: {
            type: [String, Number, Array],
        },
        /**
         * 下拉列表数据
         */
        selectdata: {
            type: Array,
            default: () => []
        },
        /**
         * 宽度
         */
        width: {
            type: [String, Number],
            default: '200'
        },
        /**
         * 是否设置圆角
         */
        radius: {
            type: Boolean,
            default: false
        },
        /**是否设置标题 */
        caption:{
            type: String,
            default: ''
        },
        /**是否是禁止选中 */
        disabled:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            prefixCls:'p-select',
            selectedItems:[],  // 多选条件下被选项集合
            selectedItem:'',   // 单选条件下被选选
            selectedItemsText:'',  // 多选条件下已选项提示框
            dropVisible:false, // 控制下拉列表的显示隐藏,
            getScroll:null,
            queryItems:[],   // 搜索下拉框
            query:'', // 搜索项
            showPlaceholder: true,  // 是否显示占位符
            showInputText:false, //控制输入文字的显示隐藏
            showCount:false, // 控制显示隐藏已选项的提示文本
            dropData:[],  // 下拉框绑定数据
            dropInstance:null,  // 下拉框实例
            currentSelectedItem: null,
            confirmedItems: [],   // 点击确认所提交的数据
            focused:false,   // 判断当前是否处于获取焦点的状态
            storeInput: '',
            storePlaceholder:'',
            fakePlaceholder:''
        }
    },
    created(){
        this.storePlaceholder = this.placeholder
        this.fakePlaceholder = this.placeholder
        if (!this.multiple &&  this.currentSelectedItem) {
            this.fakePlaceholder = this.currentSelectedItem.name
        }
    },
    mounted () {
        document.addEventListener('mousewheel', this.addListenter , false);
    },
    methods: {
        addListenter () {
            this.$refs.input.blur()
            if (this.dropInstance) {
                this.dropInstance.dropVisible = false
            }
        },
        defaultSelect () {
            if (this.multiple) {
                if (Array.isArray(this.value) && this.value.length) {
                    this.confirmedItems = []
                    this.selectedItems= []
                    this.value.forEach(val => {
                        let index = this.selectdata.findIndex(item => {return item.id === val})
                        if (index > -1) {
                            this.confirmedItems.push(this.selectdata[index])
                            this.selectedItems.push(this.selectdata[index])
                        }
                    })
                    this.showPlaceholder = false
                    this.showCount = true
                    this.showInputText = false
                }
            } else {
                if (this.value.toString().trim()) {
                    this.selectdata.forEach(item => {
                        if (item.id === this.value.toString().trim()) {
                            this.currentSelectedItem = item
                        }
                    })
                    this.showInputText = true
                    this.showPlaceholder = false
                    this.fakePlaceholder = this.currentSelectedItem.name
                    this.selectSingleItem()
                }
            }
        },
        /**
         * description 深度克隆对象
         * params obj 需要克隆的对象
         */
        cloneDeep(obj) {
            if (typeof obj !=='object' || obj === null) {
                return obj
            }
            let newObj = Array.isArray(obj) ? [] : {}
            for (let key in obj) {
                if (typeof obj[key] === 'object') {
                    newObj[key]  = this.cloneDeep(obj[key] )
                } else {
                    newObj[key] = obj[key]
                }
            }
            return newObj
        },
        /**
        * description 处理用户输入事件
        * params event事件对象
        */
        handleInput (event) {
            this.query = event.target.value || event.data || ''
            if (!this.dropInstance) return
            if (this.query) {
                this.showPlaceholder = false
                if(!this.multiple) {   // 单选状态下 输入状态下占位符合输入文字都不能显示
                    this.showInputText= false
                    this.showPlaceholder = false
                }
                this.dropInstance.query = this.query
                this.dropInstance.data = this.findSelectedItem()
            } else {
                if (this.multiple) {
                    if (this.confirmedItems.length) {
                        this.selectConfirmData(this.confirmedItems)
                    } else {
                        this.selectConfirmData(this.selectedItems)
                    }
                } else {
                    this.fakePlaceholder =this.storePlaceholder
                    this.showInputText = false
                    this.showPlaceholder = true
                    this.selectSingleItem()
                } 
            } 
        },
        selectSingleItem () {
            if (this.currentSelectedItem) {
                this.selectdata.forEach(item => { 
                    delete item.display
                    if (item.id === this.currentSelectedItem.id) {
                        item.selected = true
                    } else {
                        item.selected = false
                    }
                })
            } else {
                this.selectdata.forEach(item => { 
                    delete item.display
                    item.selected = false
                })  
            }
            if ( this.dropInstance) {
                this.dropInstance.data = this.selectdata
            }
        },
        /**
        * description 处理点击事件
        * params option 选中项
        */
        optionClick (option) {
            if (option.disabled) return
            if (this.multiple) {
                option.selected = !option.selected
                if (option.selected) {
                    this.selectedItems.push(option)
                } else {
                    let index = this.selectedItems.findIndex((item) => {return item.id===option.id})
                    if (index > -1) {
                        this.selectedItems.splice(index,1)
                        if (!this.selectedItems.length ) {
                            if (!this.confirmedItems.length) {
                                // this.dropInstance.data= this.selectdata
                            }
                        }
                    }
                }
                let emitData = this.cloneDeep(this.selectedItems)
                emitData.forEach(item=>{
                    delete item.index
                    delete item.selected
                })
                this.$emit('chang', emitData)
                this.disableConfirmBtn()
            } else {
                if (!this.dropInstance) return
                this.currentSelectedItem = option
                this.query = ''
                this.fakePlaceholder = option.name
                if (this.query) {
                    this.showInputText = true
                    this.showPlaceholder = false
                    this.selectedItem = ''
                } else {
                    this.showInputText = true
                    this.showPlaceholder = false
                }
                this.selectSingleItem()
                this.dropInstance.data = this.selectdata
                this.dropInstance.dropVisible = false
                let emitData = this.cloneDeep(option)
                delete emitData.index
                delete emitData.selected
                this.$emit('input', emitData.id)
                this.$emit('change', emitData)
            }
        },
         /**
         * description 根据输入内容筛选匹配项
         */
        findSelectedItem () {
            let selections = []
            this.selectdata.forEach(item => {
                item.display = item.name
                selections.push(item)
            })
            let foundItems = selections.filter(item => {
                return item.name ? item.name.indexOf(this.query) > -1 : false
            }).map(item => {
                item.display = item.display.replace(new RegExp(this.query, 'g'), `<span style="color:#0091FF">${this.query}</span>`)
                return item
            })
            if(foundItems.length ) {
                foundItems.forEach(item => {
                    let index = this.selectedItems.findIndex(option => {return item.id === option.id})
                    if (index > -1) {
                        item.selected = true
                    }
                })
            }
            return foundItems
        },
       
        /**
         * description 下拉框在打开和合上之间切换状态
         */
        handleOpen () { 
            if (this.dropInstance) {
                if (this.multiple && this.confirmedItems.length) {
                    this.selectConfirmData(this.confirmedItems)
                    this.disableConfirmBtn()
                }
                this.dropInstance.dropVisible=true
                Options.resetPos(this.dropInstance, this.$refs.pSelect, document.body )
            } else {
                zIndexIncrease()
                const data=this.dropData, value=this.value, multiple = this.multiple
                // 初始化实例
                this.dropInstance=Options({
                    tag: this.$refs.pSelect, data:{value, zIndex}, props:{multiple, query: this.query, value, data}
                }).$on('change', (option) => {
                    this.optionClick(option)
                }).$on('cancel' ,() => {
                    this.emitCancel()
                }).$on('confirm' ,() => {
                    this.emitConfirm()
                })
                if (this.multiple && this.confirmedItems.length) {
                    this.selectConfirmData(this.confirmedItems)
                } else {
                    this.selectSingleItem()
                }
                this.dropInstance.$nextTick(() => {
                    this.dropInstance.dropVisible=true;
                })
            }
        },
        /**
         * description 处理获取焦点的事件
         */
        handleFocus () {
            this.focused = true
            if (this.multiple) {
                if (!this.query) {
                    this.showPlaceholder = true
                    this.showInputText = false
                    this.showCount = false
                }
                if(this.confirmedItems.length) {
                    this.selectConfirmData(this.confirmedItems)
                    this.disableConfirmBtn()
                }
            } else {
                if (!this.query) {
                    this.showPlaceholder = true
                    this.showInputText = false
                }
            }
        },
        /**
         *description 输入框失去焦点的事件
        */
        handleBlur () {
            this.focused = false
            if (this.multiple) {
                
                if (this.confirmedItems.length) {
                    this.showPlaceholder =  false
                    this.showCount = true
                } else {
                    if (!this.query) {
                        this.showPlaceholder =  true
                        this.fakePlaceholder = this.storePlaceholder
                    }
                }
            } else {
                if (this.query) {
                    this.showPlaceholder = true
                    this.showInputText = false
                    this.selectedItem = ''
                    this.fakePlaceholder = this.storePlaceholder
                   
                } else {
                    this.fakePlaceholder = this.storePlaceholder
                    this.showPlaceholder = true
                    this.showInputText = false
                }
                if (this.currentSelectedItem) {
                    this.showPlaceholder = false
                    this.showInputText = true
                    this.fakePlaceholder = this.currentSelectedItem.name
                }
            }
        },
        /**
         * description 向父组件传递取消并关闭下拉框
         */
        emitCancel () {
            if(this.dropInstance){
                this.dropInstance.dropVisible = false
                this.selectConfirmData(this.confirmedItems)
                this.disableConfirmBtn()
                this.$emit('cancel')
            }
        },
        /**
         * description 向父组件传递确认事件并关闭下拉框
         */
        emitConfirm () {
            if (this.dropInstance) {
                this.dropInstance.dropVisible = false
                this.confirmedItems = this.cloneDeep(this.selectedItems)
                if (this.multiple) {
                    if (!this.confirmedItems.length ) {
                        this.showPlaceholder = true
                        this.showInputText = false
                        this.fakePlaceholder = this.storePlaceholder
                        this.selectedItem = ''
                    } else {
                        this.showCount = true
                    }
                    let emitData = this.cloneDeep(this.selectedItems)
                    let ids = []
                    emitData.forEach(item=>{
                        delete item.index
                        delete item.selected
                        ids.push(item.id)
                    })
                    this.$emit('input', ids)
                    this.$emit('confirm', emitData)
                }
            }
        },
        /**
         * description 关闭下拉列表
         */
        handleClose () {
            if (this.dropInstance) {
                this.dropInstance.dropVisible = false
                if (this.multiple) {
                    this.selectConfirmData(this.confirmedItems)
                    this.disableConfirmBtn()
                    if (this.confirmedItems.length) {
                        this.showPlaceholder =  false
                        this.showCount = true
                    } else {
                        this.showPlaceholder =  true
                        this.fakePlaceholder = this.storePlaceholder
                    }
                } else {
                    this.$nextTick(() => {
                        this.selectSingleItem()
                    })
                }  
            }
        },
        /**
         * 
         */
        selectConfirmData (data) {
            if (!this.dropInstance) return
            this.selectdata.forEach(option => {
                let index = data.findIndex((item) => {return item.id===option.id})
                if (index > -1) {
                    option.selected = true  
                } else {
                    option.selected = false
                }
                delete option.display
            })
            if (this.confirmedItems.length) {
                this.selectedItems = this.cloneDeep(this.confirmedItems)
            }
            this.selectedItem = ''
            this.dropInstance.data = this.selectdata
            this.showPlaceholder = true
            if (this.confirmedItems.length) {
                this.fakePlaceholder = `已选择<span style="margin:0 4px">${this.confirmedItems.length}</span>项`
                this.showCount = false
            } else {
                this.fakePlaceholder = this.storePlaceholder
            }
        },
        disableConfirmBtn () {
            if (!this.dropInstance) return
            if( (this.confirmedItems.length !== this.selectedItems.length) ) {
                this.dropInstance.disableConfirm = false
            } else {
                let flag = this.confirmedItems.every((item) => {
                    return this.selectedItems.findIndex(option => { return option.id === item.id}) > -1
                })
                if (!this.confirmedItems.length && this.selectedItems.length) {
                    flag = false
                }
                if (!this.confirmedItems.length && !this.selectedItems.length) {
                    flag = true
                }
                if (flag) {
                    this.dropInstance.disableConfirm = true
                } else {
                    this.dropInstance.disableConfirm = false
                }
            }
        },
    },
    /**
     * description 组件销毁
     */
    beforeDestroy() {
        if (this.dropInstance) {
            this.dropInstance.dropVisible = false
            Options.remove(this.dropInstance)
        }
        document.removeEventListener('mousewheel',this.addListenter)
    }
}
</script>
<style lang="stylus">
    @import "../static/stylus/animate/selectDownUp.styl"
    .p-select
        position relative
        display inline-block
        vertical-align middle
        cursor pointer
        outline none
        .p-select-drop-down
            position fixed;
            .p-select-not-found 
                height 54px
                padding 16px 0 16px 12px
                border 1px solid $grey-300
                border-radius 4px
                line-height 22px
                font-size 14px
                color $grey-400
                background:$white
                box-shadow $box-shadow-bottom
                box-sizing border-box
        .p-select-header
            position relative
            display flex
            min-height 32px
            height 32px
            width 100%
            box-sizing border-box
            border 1px solid $grey-300
            border-radius 4 px
            overflow hidden
            cursor pointer
            .p-select-count
                color $grey-900
                font-size 14px
                line-height 30px
                padding-left 12px
                .p-select-count-active
                    color $blue-500
                    margin 0 4px
            .p-select-title
                display inline-block
                padding 0 0 0 12px
                height 30px
                line-height 30px
                font-size 14px
                flex-shrink 0
                pointer-events none
            .p-select-selected-box
                position relative
                flex-shrink 1
                display inline-block
                width 100%
                box-sizing border-box
                color $grey-900
                font-size 14px
                .p-select-input, .p-select-fakePlaceholder
                    display inline-block
                    position absolute
                    left 0 
                    top 0
                    padding-left 12px
                    line-height 32px
                    width 100%
                    font-size 14px
                    border none
                    outline none
                .p-select-fakePlaceholder
                    z-index 99
                    pointer-events none
                    color $grey-400
                    line-height 31px
                    padding-right 32px
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap  
                .p-select-input
                    z-index 1
                    line-height 32px
                    padding-right 32px
                .p-select-input-fakePlaceholder
                    color $grey-900
            .p-select-triangle
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
            .p-select-triangle-up
                transform rotate(0deg)
            .p-select-triangle-down
                transform rotate(180deg)
            &:hover
                border 1px solid $blue-500
                transition 0.3s
        .p-select-header-radius
            border 1px solid $grey-400
            border-radius 12px
        .p-select-header-focused
            border 1px solid $blue-500
            box-shadow $box-shadow-blue
            transition 0.3s
</style>
