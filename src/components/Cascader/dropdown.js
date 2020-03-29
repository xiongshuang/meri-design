import Vue from 'vue';
import O from './Drop';
import CalcTargetPosition from '../static/utils/CalcTargetPosition'
const OptionsExtend=Vue.extend(O); // 继承Vue

let OptionsVm=null; // 当前实例
let domWidth = null
 
/**
 * @param options
 * tag 基于当前点击的dom对象或点击的根对象
 * params 动态组件相关数据
 */
const Options=(options) => {
    let {tag, props}=options;
    let {width}=tag.getBoundingClientRect(); // 根据当前点击的dom对象获取位置
    if (width>600) {
        width = 600
    } 
    if (width<180) {
        width = 180
    }
    props.width = width
    const dom=document.body;
    OptionsVm=new OptionsExtend({propsData:props}); // 实例化
    OptionsVm=OptionsVm.$mount(); // 挂载
    console.log(width)
    let add = props.showPanel ? 2 : 1
    let {X,Y} = CalcTargetPosition(tag, dom, 282, width * add)
    console.log(X)
    domWidth = width
    // 设置位置
    OptionsVm.$el.style.top= Y +'px';
    OptionsVm.$el.style.left= X+'px';
    OptionsVm.$el.style.zIndex=1000;
    OptionsVm.$el.childNodes.forEach(node => {
        if (node.nodeType === 1 && node.className === 'p-cascader-no-found') {
            node.style.width = width + 'px'
        }
    })
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
Options.resetPosition = (vm, tag, dom, width = domWidth ) => {
    if (!vm) return;
    let {X,Y} = CalcTargetPosition(tag, dom, 282, width)
    vm.$el.style.top= Y +'px';
    vm.$el.style.left= X+'px';
}

export default Options