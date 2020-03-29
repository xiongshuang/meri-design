import Vue from 'vue';
import O from './Drop';
import CalcTargetPosition from '../static/utils/CalcTargetPosition'
const OptionsExtend=Vue.extend(O); // 继承Vue

let OptionsVm=null; // 当前实例
let domHeight = null
let domWidth = null

/**
 * @param options
 * tag 基于当前点击的dom对象或点击的根对象
 * params 动态组件相关数据
 */
const Options=(options) => {
 
    const {tag, data, props}=options;
    const {top, left, height, width}=tag.getBoundingClientRect(); // 根据当前点击的dom对象获取位置
    
    let H 
    if (props.data.length) {
        let item = props.data[0]
        if (item.src &&　item.sub) {   // 有图片 有副标题
            H = 58
        } else if (item.src &&!item.sub) { // 有图片 没有副标题
            H = 52
        } else if (item.label ){  // 有标签
            H = 40
        } else if (!item.sub && !item.src && !item.label) { // 只有主标题
            H = 40
        } else if (item.sub && !item.src && !item.label) {  // 有副标题  没有图片 没有标签
            H = 58
        }
    }
    let totalH = 0
    if (props.multiple) {
        totalH =  H * props.data.length + 16 + 46    
    } else {
        totalH =  H * props.data.length + 16
    }
    if (totalH > 300) totalH = 300
    if (!props.data.length) {
        totalH = 56
    }
    domHeight = totalH
    domWidth = width
    const dom=document.body;
    const {X,Y} = CalcTargetPosition(tag,dom,totalH,width)
    props.width = width
    OptionsVm=new OptionsExtend({data, propsData : props}); // 实例化
    OptionsVm=OptionsVm.$mount(); // 挂载
   
    // 设置位置
    OptionsVm.$el.style.top=Y + 'px';
    OptionsVm.$el.style.left=X + 'px';
    OptionsVm.$el.style.width=width+'px';
    OptionsVm.$el.style.zIndex=data.zIndex;
    dom.appendChild(OptionsVm.$el); // 插入dom
    return OptionsVm;
}

Options.remove=(vm) => {
    if (!vm) return;
    if (vm._isDestroyed) return;
    vm.$destroy();
    const dom=vm.$el;
    if (dom) dom.parentNode.removeChild(dom);
}
Options.resetPos=(vm, tag,dom) => {
    const {X,Y} = CalcTargetPosition(tag, dom, domHeight, domWidth)
    vm.$el.style.top=Y + 'px';
    vm.$el.style.left=X + 'px';
}

export default Options;