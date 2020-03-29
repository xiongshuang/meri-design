import Vue from 'vue';
import O from './depend/Options';
const OptionsExtend=Vue.extend(O); // 继承Vue

let OptionsVm=null; // 当前实例

/**
 * @param options
 * tag 基于当前点击的dom对象或点击的根对象
 * params 动态组件相关数据
 */
const Options=(options) => {
    const {tag, param}=options;
    const {top, left, height}=tag.getBoundingClientRect(); // 根据当前点击的dom对象获取位置
    const dom=document.body;

    OptionsVm=new OptionsExtend({data: param}); // 实例化
    OptionsVm=OptionsVm.$mount(); // 挂载

    // 设置位置
    OptionsVm.$el.style.top=top+(height-2)+'px';
    OptionsVm.$el.style.left=left+'px';

    dom.appendChild(OptionsVm.$el); // 插入dom

    return OptionsVm;
};

export default Options;