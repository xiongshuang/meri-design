<template>
    <div :class="classes" :style="tagStyle">
        <div :class="[this.prefixCls + '-wrapper']">
            <span v-if="showDot" :class="[this.prefixCls + '-dot-icon']" :style="dotStyle"/>
            <span v-if="showIcon" :class="iconClass" >
                <Icon width=12 height=12 :name="name"/>
            </span>
            <span :class="[this.prefixCls + '-text']">
                <slot/>
            </span>
        </div>
    </div>
</template>

<script>
import Icon from '../Icon'
export default {
    name: "Tag",
    components:{Icon},
    data () {
        return {
            prefixCls:'p-tag',
            tagText:'',
        }
    },
    props: {
        size: {
            type: String,
            validator(value){
                return    ['big', 'small'].findIndex(item =>{return item === value} ) > -1
            },
            default: 'big'
        },
        type: {
            type: String,
            validator(value){
                return   ['circular', 'dot'].findIndex(item => {return item === value} ) > -1
            }
        },
        color: {
            type: String,
            default:'#E1F2FF'
        },
        name: {
            type: String
        }
    },
    methods:{
        oneOf (value, checkList){
            return checkList.includes(value)
        },
        findColorIndex (color, colorList){
            return colorList.indexOf(color)
        }
    },
    computed:{
        tagBgColors () {
            return ['#E1F2FF' , '#D5F6F2', '#D9F5D6', '#FAF1D1', '#FEEAD2', '#FDE3E2', '#FDDDEF', '#ECE2FE' ,'#B2E6F2', '#EFF0F1']
        },
        tagTextColors () {
            return ['#0065B3', '#078372', '#237B19', '#AA7803', '#B26206', '#AC2F28', '#8C218C', '#4E1BA7', '#161FA2', '#373C43']
        },
        dotBgColors () {
            return ['#0091FF','#F54E45','#34C724','#F58300','#8D9399']
        },
        classes () {
            return [
                `${this.prefixCls}`,
                {
                    [`${this.prefixCls}-${this.size}`]: !this.type ,
                    [`${this.prefixCls}-${this.type}`]: !!this.type,
                }
            ]
        },
        showDot () {
            return !!this.type && this.type === 'dot' 
        },
        dotStyle () {
            return {backgroundColor: this.color}
        },
        showIcon () {
            return !!this.type && this.type === 'circular'
        },
        iconClass () {
            let colorPos = this.findColorIndex(this.color, this.tagBgColors)
            return ['p-tag-icon', `p-tag-icon-${colorPos + 1}`]
        },
        tagStyle () {
            let color =''
            let backgroundColor = ''
            let height=''
            if (this.size==='big') {
                height = 22
            }
            if (this.size === 'small') {
                height = 18
            }
            if (this.type === 'circular') {
                height = 24
            }
            if (this.type === 'dot') {
                height = 18
            }
            if (this.type === 'dot'){
                color = '#2B2F36'
            } else {
                let colorPos = this.findColorIndex(this.color, this.tagBgColors)
                if (colorPos < 0) {
                    return {}
                } else {
                    color = this.tagTextColors[colorPos]
                    backgroundColor = this.color
                }
            }
            return {color, backgroundColor,height:height + 'px'}
        },
    }
}
</script>

<style lang="stylus">
.p-tag
    display inline-block
    font-size 14px
    .p-tag-wrapper
        display flex
        justify-content center
        align-items center
        box-sizing border-box
        .p-tag-text
            font-size 14px
            line-height 1 
.p-tag-big
    min-width 40px
    margin-right 8px
    padding 4px 8px
.p-tag-small
    height 18px
    margin-right 4px
    font-size 12px
    padding 2px 8px
.p-tag-circular
    margin-right 12px
    border-radius 12px
    padding 6px 12px
    .p-tag-icon
        width 12px
        height 12px
        margin-right 4px
        .p-icon
            svg 
                width 12px
                height 12px
                margin-right 4px
                transform: translateX(-4px);
    .p-tag-icon-1
        svg 
            path 
                fill #0065B3
    .p-tag-icon-2
        svg 
            path 
                fill #078372
    .p-tag-icon-3
        svg 
            path 
                fill #237B19
    .p-tag-icon-4
        svg 
            path 
                fill #AA7803
    .p-tag-icon-5
        svg 
            path 
                fill #B26206
    .p-tag-icon-6
        svg 
            path 
                fill #AC2F28
    .p-tag-icon-7
        svg 
            path 
                fill #8C218C
    .p-tag-icon-8
        svg 
            path 
                fill #4E1BA7
    .p-tag-icon-9
        svg 
            path 
                fill #161FA2
    .p-tag-icon-10
        svg 
            path 
                fill #373C43
.p-tag-dot
    .p-tag-dot-icon
        width 6px
        height 6px
        border-radius 50%
        margin 0 8px

</style>

